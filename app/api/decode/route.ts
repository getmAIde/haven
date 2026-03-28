/**
 * HAVEN — Housing document decode
 * Streaming SSE route. Decodes any housing document into plain language.
 * NJ-first system prompt. Jurisdiction-aware.
 */

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/ratelimit";

export const runtime = "edge";
export const maxDuration = 60;

const client = new Anthropic();

const SYSTEM_PROMPT = `You are HAVEN, a housing document decoder. Your job is to translate housing documents into plain language that any tenant can understand — no legal training required.

You specialize in New Jersey landlord-tenant law but can handle documents from any US state.

When you receive a housing document or a description of a housing situation, you must output a structured response in this exact JSON format:

{
  "documentType": "Short name for what this document is (e.g. 'Notice to Quit', 'Lease Agreement', 'Eviction Complaint')",
  "whatItMeans": "2-3 sentences in plain language. What is this document? What is it asking or telling the person?",
  "urgency": "high | medium | low",
  "deadline": "Specific deadline if one exists, or null. Format as a plain English sentence, e.g. 'You must appear in court by [date]' or 'You have 30 days from receiving this to respond.'",
  "yourRights": "3-5 bullet points explaining the tenant's specific legal rights in this situation. Be specific to NJ law where applicable. Start each bullet with an action or right.",
  "whatToDoNext": "3-5 numbered steps the person should take, in order of urgency. Be concrete — name specific organizations, phone numbers, or actions.",
  "redFlags": "Any concerning clauses, missing required information, or potential violations of tenant rights. Or null if none.",
  "scenario": "The closest matching scenario code from: eviction_notice | summary_dispossess | habitability | rent_increase | section_8_voucher | security_deposit | lease | other"
}

Rules:
- Never use legal jargon without explaining it
- Always tell the person what their deadline is if one exists
- Always mention Legal Services of NJ (1-888-576-5529) as a free legal aid resource if the situation involves court
- If the document appears to be from New Jersey, apply NJ-specific law (Anti-Eviction Act, Truth in Renting Act, Hotel and Multiple Dwelling Law)
- If a Section 8 / HCV voucher is involved, mention HUD housing quality standards
- If the location is Camden NJ specifically, mention the Camden rent control ordinance and Office of Rent Regulations
- Be direct. These people may be facing eviction. Give them information they can act on.
- Do not add disclaimers like "I am not a lawyer" — HAVEN is a decode tool, not legal advice. Just give the information.
- If the input is a description rather than a document, decode the situation as if it were the relevant document type`;

// Scans Claude output for prompt injection attempts
function containsInjection(text: string): boolean {
  return /\[INST\]|<\|system\|>|ignore previous|disregard (all|your) (previous|prior|above)/i.test(text);
}

export async function POST(req: NextRequest) {
  // Cost circuit breaker
  if (process.env.DECODE_PAUSED === "true") {
    return new Response(JSON.stringify({ error: "HAVEN is temporarily paused for maintenance. Please try again shortly." }), { status: 503 });
  }

  // Rate limiting
  const ip = getClientIp(req);
  const rl = await checkRateLimit(ip, "decode");
  if (!rl.allowed) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-RateLimit-Limit": String(rl.limit),
      "X-RateLimit-Remaining": "0",
    };
    if (rl.retryAfter) headers["Retry-After"] = String(rl.retryAfter);
    return new Response(
      JSON.stringify({ error: `Too many requests. Please wait ${rl.retryAfter ?? 60} seconds before trying again.` }),
      { status: 429, headers }
    );
  }

  let input = "";
  try {
    const body = await req.json() as { input?: string; state?: string };
    input = (body.input ?? "").trim().slice(0, 4000);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
  }

  if (!input) {
    return new Response(JSON.stringify({ error: "No document or description provided" }), { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        send({ status: "Analyzing document…" });

        const anthropicStream = client.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 1500,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: "user",
              content: `<housing_document>\n${input}\n</housing_document>\n\nDecode this housing document or situation for the tenant. Output only the JSON object described in your instructions.`,
            },
          ],
        });

        let fullText = "";
        for await (const event of anthropicStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            fullText += event.delta.text;
          }
        }

        // Extract JSON from the response
        const jsonMatch = fullText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          send({ error: "Could not parse decode response. Try again." });
          controller.close();
          return;
        }

        // Scan output for prompt injection before sending
        if (containsInjection(fullText)) {
          console.warn("[haven/decode] injection detected in output, blocking");
          send({ error: "Could not safely decode this document. Try rephrasing." });
          controller.close();
          return;
        }

        const decoded = JSON.parse(jsonMatch[0]);
        send({ result: decoded });

        const usage = (await anthropicStream.finalMessage()).usage;
        console.log("[haven/decode] tokens:", usage.input_tokens, "+", usage.output_tokens);

      } catch (err) {
        console.error("[haven/decode] error:", err);
        send({ error: "Something went wrong. Please try again." });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
