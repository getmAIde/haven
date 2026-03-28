"use client";

import { useState, useRef } from "react";
import { NJ_TENANT_RIGHTS, type RightsEntry } from "@/lib/nj-rights";
import { NJ_WAITLISTS, type WaitlistEntry } from "@/lib/waitlist-data";
import { formatFMR, type FMRResult } from "@/lib/hud-api";
import { ERA_PROGRAMS, ERA_FACTS, type ERAProgram } from "@/lib/era-data";
import { PILOT_EXPLAINER, PILOT_QUESTIONS, CAMDEN_PILOTS, CAMDEN_AMI_CONTEXT } from "@/lib/pilot-data";

// ── Types ─────────────────────────────────────────────────────────────────

interface DecodeResult {
  documentType: string;
  whatItMeans: string;
  urgency: "high" | "medium" | "low";
  deadline: string | null;
  yourRights: string;
  whatToDoNext: string;
  redFlags: string | null;
  scenario: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────

const URGENCY_COLOR: Record<string, string> = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

const URGENCY_LABEL: Record<string, string> = {
  high: "Act now",
  medium: "Act soon",
  low: "Low urgency",
};

const EXAMPLE_DOCUMENTS = [
  { label: "Notice to Quit", text: "NOTICE TO QUIT\n\nTo the tenant(s) of the premises located at 142 Birch Street, Camden, NJ 08103:\n\nYou are hereby notified to quit and surrender the premises within 30 days from the date of this notice due to non-payment of rent. The amount owed is $1,450.00 for the months of January and February 2026.\n\nFailure to vacate will result in legal proceedings.\n\n/s/ Property Management LLC" },
  { label: "Rent increase letter", text: "Dear Tenant,\n\nEffective May 1, 2026, your monthly rent will increase from $875.00 to $975.00, an increase of $100.00 per month. Please ensure your new monthly payment is received by the 1st of each month.\n\nThank you for your tenancy." },
  { label: "Describe a situation", text: "My landlord filed eviction papers against me. I got a court date 8 days from now. My heat has been broken for 2 months and I told my landlord 3 times but they never fixed it. I'm in Camden NJ." },
];

function parseList(text: string): string[] {
  return text
    .split(/\n/)
    .map((l) => l.replace(/^[-•*\d.]+\s*/, "").trim())
    .filter(Boolean);
}

// ── Components ────────────────────────────────────────────────────────────

function DecodeCard({ result }: { result: DecodeResult }) {
  const urgencyColor = URGENCY_COLOR[result.urgency] ?? "#94a3b8";
  const rights = parseList(result.yourRights);
  const steps = parseList(result.whatToDoNext);
  const matchedRights: RightsEntry | undefined = NJ_TENANT_RIGHTS.find(
    (r) => r.scenario === result.scenario
  );

  return (
    <div className="space-y-4 mt-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-2 self-stretch rounded-full"
          style={{ background: urgencyColor }}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-white">{result.documentType}</h2>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${urgencyColor}22`, color: urgencyColor, border: `1px solid ${urgencyColor}44` }}
            >
              {URGENCY_LABEL[result.urgency] ?? result.urgency}
            </span>
          </div>
        </div>
      </div>

      {/* What it means */}
      <div className="rounded-xl p-4" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent-light)" }}>What this means</p>
        <p className="text-slate-200 leading-relaxed">{result.whatItMeans}</p>
      </div>

      {/* Deadline — prominent if exists */}
      {result.deadline && (
        <div
          className="rounded-xl p-4 flex gap-3"
          style={{ background: `${urgencyColor}11`, border: `1px solid ${urgencyColor}33` }}
        >
          <span className="text-xl flex-shrink-0">⏰</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: urgencyColor }}>Deadline</p>
            <p className="font-semibold" style={{ color: urgencyColor }}>{result.deadline}</p>
          </div>
        </div>
      )}

      {/* Your rights */}
      {rights.length > 0 && (
        <div className="rounded-xl p-4" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-emerald-400">Your rights</p>
          <ul className="space-y-2">
            {rights.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                <span className="text-slate-200 text-sm leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What to do next */}
      {steps.length > 0 && (
        <div className="rounded-xl p-4" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-blue-400">What to do right now</p>
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "var(--accent)" }}
                >
                  {i + 1}
                </span>
                <span className="text-slate-200 text-sm leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Red flags */}
      {result.redFlags && (
        <div className="rounded-xl p-4" style={{ background: "#7f1d1d22", border: "1px solid #ef444433" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-red-400">Red flags</p>
          <p className="text-red-200 text-sm leading-relaxed">{result.redFlags}</p>
        </div>
      )}

      {/* Camden-specific note */}
      {matchedRights?.camdenNote && (
        <div className="rounded-xl p-4" style={{ background: "#1a4a4a33", border: "1px solid #2d808044" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--accent-light)" }}>Camden, NJ specifically</p>
          <p className="text-sm leading-relaxed text-slate-200">{matchedRights.camdenNote}</p>
        </div>
      )}

      {/* Contacts */}
      {matchedRights?.contacts && matchedRights.contacts.length > 0 && (
        <div className="rounded-xl p-4" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-slate-400">Get help</p>
          <div className="space-y-2">
            {matchedRights.contacts.map((c) => (
              <div key={c.url} className="flex items-center justify-between gap-2">
                <span className="text-sm text-slate-300">{c.name}</span>
                <div className="flex items-center gap-2">
                  {c.phone && <span className="text-xs font-mono text-slate-400">{c.phone}</span>}
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-1 rounded"
                    style={{ background: "var(--accent)22", color: "var(--accent-light)" }}
                  >
                    Visit →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WaitlistBadge({ entry }: { entry: WaitlistEntry }) {
  const statusColor =
    entry.status === "open" ? "#22c55e"
    : entry.status === "lottery" ? "#f59e0b"
    : entry.status === "closed" ? "#ef4444"
    : "#94a3b8";
  const statusLabel =
    entry.status === "open" ? "Open"
    : entry.status === "lottery" ? "Lottery"
    : entry.status === "closed" ? "Closed"
    : "Unknown";

  return (
    <div
      className="rounded-xl p-4 flex items-start gap-3"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
    >
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm leading-snug">{entry.pha}</p>
        <p className="text-xs text-slate-400 mt-0.5">{entry.program} · {entry.county} County</p>
        {entry.notes && <p className="text-xs text-slate-500 mt-1 leading-relaxed">{entry.notes}</p>}
        {entry.lastOpened && entry.status === "closed" && (
          <p className="text-xs text-slate-500 mt-1">Last opened: {entry.lastOpened}</p>
        )}
      </div>
      <div className="flex-shrink-0 flex flex-col items-end gap-2">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${statusColor}22`, color: statusColor, border: `1px solid ${statusColor}44` }}
        >
          {statusLabel}
        </span>
        {entry.applyUrl && (
          <a
            href={entry.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
            style={{ color: "var(--accent-light)" }}
          >
            {entry.status === "open" ? "Apply →" : "More info →"}
          </a>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default function Home() {
  const [mode, setMode] = useState<"decode" | "waitlist" | "fmr" | "rights" | "help">("decode");
  const [helpSection, setHelpSection] = useState<"era" | "pilot">("era");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [result, setResult] = useState<DecodeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // FMR state
  const [fmrZip, setFmrZip] = useState("");
  const [fmrResult, setFmrResult] = useState<FMRResult | null>(null);
  const [fmrError, setFmrError] = useState<string | null>(null);
  const [fmrLoading, setFmrLoading] = useState(false);

  // Waitlist state
  const [waitlistCounty, setWaitlistCounty] = useState("Camden");
  const [waitlistResults, setWaitlistResults] = useState<WaitlistEntry[]>(
    NJ_WAITLISTS.filter((w) => w.county.toLowerCase().includes("camden"))
  );

  const resultRef = useRef<HTMLDivElement>(null);

  async function handleDecode() {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    setStatus("Analyzing your document…");

    try {
      const res = await fetch("/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = JSON.parse(line.slice(6));
          if (data.status) setStatus(data.status);
          if (data.error) { setError(data.error); setStatus(null); }
          if (data.result) {
            setResult(data.result);
            setStatus(null);
            setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
          }
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      setStatus(null);
    }
  }

  async function handleFMRLookup() {
    if (!/^\d{5}$/.test(fmrZip)) return;
    setFmrLoading(true);
    setFmrResult(null);
    setFmrError(null);
    try {
      const res = await fetch(`/api/fmr?zip=${fmrZip}`);
      const data = await res.json() as FMRResult & { error?: string };
      if (data.error) setFmrError(data.error);
      else setFmrResult(data);
    } catch {
      setFmrError("Could not retrieve Fair Market Rents. Try again.");
    } finally {
      setFmrLoading(false);
    }
  }

  function handleWaitlistSearch() {
    const q = waitlistCounty.toLowerCase().trim();
    setWaitlistResults(
      NJ_WAITLISTS.filter((w) =>
        w.county.toLowerCase().includes(q) ||
        w.city.toLowerCase().includes(q) ||
        w.pha.toLowerCase().includes(q)
      )
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <h1 className="text-xl font-bold text-white tracking-tight">HAVEN</h1>
          </div>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Know your housing rights</p>
        </div>
        <div className="text-xs px-2 py-1 rounded" style={{ background: "#1a4a4a55", color: "var(--accent-light)", border: "1px solid #2d808044" }}>
          NJ · Free
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-16">
        {/* Mission kicker */}
        <p className="text-xs font-semibold uppercase tracking-widest text-center mb-4" style={{ color: "var(--muted)" }}>
          For the people the housing system forgot to explain itself to
        </p>

        {/* Mode tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          {(["decode", "waitlist", "fmr", "rights", "help"] as const).map((m) => {
            const labels: Record<string, string> = {
              decode: "📄 Decode",
              waitlist: "🔑 Section 8",
              fmr: "💰 FMR",
              rights: "⚖️ Rights",
              help: "🆘 Get help",
            };
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 text-xs py-2 px-1 rounded-lg font-medium transition-all duration-200"
                style={
                  mode === m
                    ? { background: "var(--accent)", color: "white" }
                    : { color: "var(--muted)" }
                }
              >
                {labels[m]}
              </button>
            );
          })}
        </div>

        {/* ── DECODE MODE ── */}
        {mode === "decode" && (
          <div>
            {/* Example chips */}
            <div className="flex flex-wrap gap-2 mb-3">
              {EXAMPLE_DOCUMENTS.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => setInput(ex.text)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-all"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  Try: {ex.label}
                </button>
              ))}
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-accent)", background: "var(--card-bg)" }}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste a Notice to Quit, eviction complaint, lease, rent increase letter, or just describe your situation in plain English…"
                rows={7}
                className="w-full p-4 text-sm bg-transparent text-white placeholder-slate-500 resize-none focus:outline-none"
              />
              <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {input.length > 0 ? `${input.length} characters` : "Paste any housing document — or describe your situation"}
                </p>
                <button
                  onClick={handleDecode}
                  disabled={loading || !input.trim()}
                  className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-40"
                  style={{ background: loading ? "#1a4a4a" : "var(--accent)" }}
                >
                  {loading ? "Analyzing…" : "Decode →"}
                </button>
              </div>
            </div>

            {/* Status */}
            {status && (
              <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: "var(--accent-light)" }}>
                <span className="animate-spin">⟳</span>
                {status}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 p-4 rounded-xl text-sm text-red-300" style={{ background: "#7f1d1d22", border: "1px solid #ef444433" }}>
                {error}
              </div>
            )}

            {/* Result */}
            <div ref={resultRef}>
              {result && <DecodeCard result={result} />}
            </div>
          </div>
        )}

        {/* ── WAITLIST MODE ── */}
        {mode === "waitlist" && (
          <div className="space-y-4">
            <div className="rounded-xl p-4" style={{ background: "#7f1d1d22", border: "1px solid #ef444433" }}>
              <p className="text-sm text-red-200 leading-relaxed">
                <strong className="text-red-300">Camden County has 0 open Section 8 waiting lists</strong> as of March 2026.
                The Housing Authority of the City of Camden&apos;s waitlist opened and closed on the same day in March 2025.
                Sign up for alerts so you don&apos;t miss the next opening.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={waitlistCounty}
                onChange={(e) => setWaitlistCounty(e.target.value)}
                placeholder="County or city (e.g. Camden, Essex, Hudson)"
                className="flex-1 rounded-lg px-4 py-2.5 text-sm bg-transparent text-white placeholder-slate-500 focus:outline-none"
                style={{ border: "1px solid var(--border)" }}
                onKeyDown={(e) => e.key === "Enter" && handleWaitlistSearch()}
              />
              <button
                onClick={handleWaitlistSearch}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{ background: "var(--accent)" }}
              >
                Search
              </button>
            </div>

            <div className="space-y-3">
              {waitlistResults.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">No waitlists found for that location.</p>
              ) : (
                waitlistResults.map((w) => <WaitlistBadge key={w.id} entry={w} />)
              )}
            </div>

            <div className="rounded-xl p-4 text-sm" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <p className="font-semibold text-white mb-1">Get notified when a waitlist opens</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                Housing authorities rarely announce openings far in advance. The best way to stay informed is to check directly with your local housing authority and sign up for their email alerts.
              </p>
              <a
                href="https://www.nj.gov/dca/divisions/dhcr/programs/hcv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs"
                style={{ color: "var(--accent-light)" }}
              >
                NJ DCA Section 8 program →
              </a>
            </div>
          </div>
        )}

        {/* ── FMR MODE ── */}
        {mode === "fmr" && (
          <div className="space-y-4">
            <div className="rounded-xl p-4 text-sm" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <p className="text-white font-semibold mb-1">What is a Fair Market Rent?</p>
              <p className="text-slate-400 leading-relaxed text-xs">
                HUD publishes Fair Market Rents (FMRs) for every ZIP code — the government&apos;s estimate of what modest, decent housing should cost in your area. Section 8 payment standards are based on these numbers. If your landlord is charging more than the FMR, that&apos;s worth knowing.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={fmrZip}
                onChange={(e) => setFmrZip(e.target.value.slice(0, 5))}
                placeholder="ZIP code (e.g. 08103)"
                className="flex-1 rounded-lg px-4 py-2.5 text-sm bg-transparent text-white placeholder-slate-500 focus:outline-none font-mono tracking-wider"
                style={{ border: "1px solid var(--border)" }}
                maxLength={5}
                onKeyDown={(e) => e.key === "Enter" && handleFMRLookup()}
              />
              <button
                onClick={handleFMRLookup}
                disabled={fmrLoading || fmrZip.length !== 5}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
                style={{ background: "var(--accent)" }}
              >
                {fmrLoading ? "…" : "Look up"}
              </button>
            </div>

            {/* Quick Camden button */}
            <button
              onClick={() => { setFmrZip("08103"); setTimeout(handleFMRLookup, 50); }}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--muted)" }}
            >
              Try: 08103 (Camden, NJ)
            </button>

            {fmrError && (
              <div className="p-4 rounded-xl text-sm text-red-300" style={{ background: "#7f1d1d22", border: "1px solid #ef444433" }}>
                {fmrError}
              </div>
            )}

            {fmrResult && (
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-accent)" }}>
                <div className="px-4 py-3" style={{ background: "#1a4a4a55" }}>
                  <p className="font-bold text-white">{fmrResult.countyName}, {fmrResult.stateName}</p>
                  <p className="text-xs text-slate-400">HUD Fair Market Rents · FY {fmrResult.year}</p>
                </div>
                <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {([
                    ["Studio", fmrResult.fmr.efficiency],
                    ["1 Bedroom", fmrResult.fmr.oneBedroom],
                    ["2 Bedrooms", fmrResult.fmr.twoBedroom],
                    ["3 Bedrooms", fmrResult.fmr.threeBedroom],
                    ["4 Bedrooms", fmrResult.fmr.fourBedroom],
                  ] as [string, number][]).map(([label, amount]) => (
                    <div key={label} className="flex items-center justify-between px-4 py-3" style={{ background: "var(--card-bg)" }}>
                      <span className="text-sm text-slate-300">{label}</span>
                      <span className="font-bold text-white font-mono">{formatFMR(amount)}<span className="text-xs font-normal text-slate-400">/mo</span></span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 text-xs text-slate-400" style={{ background: "var(--card-bg)", borderTop: "1px solid var(--border)" }}>
                  If your rent is above these amounts and you have a Section 8 voucher, contact your housing authority. These are the numbers your payment standard is based on.
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── RIGHTS MODE ── */}
        {mode === "rights" && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 mb-4">Tap any situation to see your rights under New Jersey law, with Camden-specific notes where they apply.</p>
            {NJ_TENANT_RIGHTS.map((entry) => {
              const labels: Record<string, string> = {
                eviction_notice: "⚠️ I got an eviction notice",
                summary_dispossess: "🏛️ I got a court summons (Summary Dispossess)",
                habitability: "🔥 My landlord won't fix problems in my unit",
                rent_increase: "💸 My rent just went up",
                section_8_voucher: "🔑 I have a Section 8 voucher",
                security_deposit: "🔒 My landlord kept my security deposit",
              };
              return (
                <details key={entry.scenario} className="rounded-xl overflow-hidden group" style={{ border: "1px solid var(--border)" }}>
                  <summary
                    className="px-4 py-3 cursor-pointer font-semibold text-sm text-white flex items-center justify-between select-none"
                    style={{ background: "var(--card-bg)", listStyle: "none" }}
                  >
                    <span>{labels[entry.scenario] ?? entry.scenario}</span>
                    <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 py-4 space-y-3" style={{ background: "#0d1a2a" }}>
                    <p className="text-sm text-slate-200 leading-relaxed">{entry.plain}</p>
                    {entry.deadline && (
                      <div className="text-xs px-3 py-2 rounded-lg font-semibold text-amber-300" style={{ background: "#92400e22", border: "1px solid #f59e0b44" }}>
                        ⏰ {entry.deadline}
                      </div>
                    )}
                    {entry.camdenNote && (
                      <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "#1a4a4a33", border: "1px solid #2d808044", color: "var(--haven-300)" }}>
                        📍 Camden specifically: {entry.camdenNote}
                      </div>
                    )}
                    <div className="space-y-2 pt-1">
                      {entry.contacts.map((c) => (
                        <div key={c.url} className="flex items-center justify-between gap-2">
                          <span className="text-xs text-slate-400">{c.name}{c.phone && ` · ${c.phone}`}</span>
                          <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: "var(--accent-light)" }}>
                            Visit →
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        )}

        {/* ── HELP MODE ── */}
        {mode === "help" && (
          <div className="space-y-4">
            {/* Sub-nav */}
            <div className="flex gap-2">
              {(["era", "pilot"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setHelpSection(s)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={
                    helpSection === s
                      ? { background: "var(--accent)", color: "white" }
                      : { background: "var(--card-bg)", color: "var(--muted)", border: "1px solid var(--border)" }
                  }
                >
                  {s === "era" ? "🆘 Emergency rental help" : "🏦 PILOT agreements"}
                </button>
              ))}
            </div>

            {/* ── ERA SECTION ── */}
            {helpSection === "era" && (
              <div className="space-y-4">
                <div className="rounded-xl p-4 text-sm" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                  <p className="font-semibold text-white mb-1">Can't pay rent and facing eviction?</p>
                  <p className="text-slate-400 leading-relaxed">
                    Emergency rental assistance (ERA) can pay your back rent and stop an eviction — even one that&apos;s already in court. The key: apply now and tell the court you have a pending application. Judges routinely grant continuances for ERA applicants. Do not wait.
                  </p>
                </div>

                {/* Programs */}
                <div className="space-y-3">
                  {ERA_PROGRAMS.map((p: ERAProgram) => (
                    <div key={p.id} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                      <div className="px-4 py-3 flex items-center justify-between" style={{ background: p.camdenSpecific ? "#1a4a4a55" : "var(--card-bg)" }}>
                        <div>
                          <p className="font-semibold text-white text-sm">{p.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{p.who}{p.camdenSpecific ? " · Camden" : " · NJ statewide"}</p>
                        </div>
                        {p.phone && (
                          <a href={`tel:${p.phone.replace(/[^0-9]/g, "")}`} className="text-sm font-bold flex-shrink-0 ml-3" style={{ color: "var(--accent-light)" }}>
                            {p.phone}
                          </a>
                        )}
                      </div>
                      <div className="px-4 py-3 space-y-2" style={{ background: "#0d1420" }}>
                        <div>
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Who qualifies</span>
                          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{p.eligibility}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">What it covers</span>
                          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{p.maxHelp}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">How to apply</span>
                          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{p.howToApply}</p>
                        </div>
                        <div className="flex items-start gap-2 pt-1">
                          <span className="text-amber-400 text-xs flex-shrink-0">⏱</span>
                          <p className="text-xs text-amber-300 leading-relaxed">{p.timeToFunds}</p>
                        </div>
                        {p.notes && (
                          <p className="text-xs text-slate-500 leading-relaxed border-t pt-2" style={{ borderColor: "var(--border)" }}>{p.notes}</p>
                        )}
                        {p.url && (
                          <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs block mt-1" style={{ color: "var(--accent-light)" }}>
                            Learn more →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ERA Q&A */}
                <div className="rounded-xl p-4 text-sm" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                  <p className="font-semibold text-white mb-3">Common questions</p>
                  <div className="space-y-4">
                    {ERA_FACTS.map((f, i) => (
                      <details key={i} className="group">
                        <summary className="cursor-pointer font-medium text-slate-300 text-sm flex items-center justify-between select-none list-none">
                          <span>{f.q}</span>
                          <span className="text-slate-600 ml-2 flex-shrink-0 group-open:rotate-180 transition-transform text-xs">▼</span>
                        </summary>
                        <p className="text-slate-400 text-xs leading-relaxed mt-2 pl-2 border-l-2" style={{ borderColor: "var(--accent)" }}>{f.a}</p>
                      </details>
                    ))}
                  </div>
                </div>

                {/* Right to counsel note */}
                <div className="rounded-xl p-4 text-sm" style={{ background: "#1a4a4a33", border: "1px solid #2d808044" }}>
                  <p className="font-semibold mb-1" style={{ color: "var(--accent-light)" }}>Right to Counsel — NJ</p>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    New Jersey has been expanding right-to-counsel programs for tenants in eviction proceedings. Income-eligible tenants may be entitled to free legal representation in court. Ask Legal Services of NJ (1-888-576-5529) whether your county is covered.
                  </p>
                </div>
              </div>
            )}

            {/* ── PILOT SECTION ── */}
            {helpSection === "pilot" && (
              <div className="space-y-4">
                {/* Explainer */}
                <div className="rounded-xl p-4 text-sm" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                  <p className="font-semibold text-white mb-2">What is a PILOT?</p>
                  <p className="text-slate-400 leading-relaxed text-xs mb-3">{PILOT_EXPLAINER.what}</p>
                  <p className="text-slate-400 leading-relaxed text-xs mb-3">{PILOT_EXPLAINER.catch}</p>
                  <p className="text-slate-400 leading-relaxed text-xs">{PILOT_EXPLAINER.camdenContext}</p>
                </div>

                {/* AMI gap card */}
                <div className="rounded-xl p-4" style={{ background: "#7f1d1d22", border: "1px solid #ef444433" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-red-400">The affordability gap</p>
                  <p className="text-red-200 text-xs leading-relaxed">{CAMDEN_AMI_CONTEXT.note}</p>
                  <p className="text-red-300 text-xs leading-relaxed mt-2 font-medium">{CAMDEN_AMI_CONTEXT.implication}</p>
                </div>

                {/* Camden PILOT inventory */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-slate-500">Known Camden PILOT projects</p>
                  <div className="space-y-3">
                    {CAMDEN_PILOTS.map((p) => (
                      <div key={p.id} className="rounded-xl p-4 text-xs" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="font-semibold text-white text-sm">{p.name}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)22", color: "var(--accent-light)", border: "1px solid var(--accent)44" }}>
                            {p.termYears}yr PILOT
                          </span>
                        </div>
                        <p className="text-slate-400 mb-1">{p.developer} · {p.location}</p>
                        {p.amiLevel && (
                          <p className="text-amber-300 mb-1">
                            <span className="font-semibold">Affordable definition:</span> {p.amiLevel} · {p.camdenAMI2025}
                          </p>
                        )}
                        <p className="text-slate-500 leading-relaxed mt-1">{p.notes}</p>
                        <p className="text-slate-600 mt-1 italic">Source: {p.source}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Questions to ask */}
                <div className="rounded-xl p-4" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-slate-400">Questions to ask about any PILOT</p>
                  <div className="space-y-4">
                    {PILOT_QUESTIONS.map((q, i) => (
                      <details key={i} className="group">
                        <summary className="cursor-pointer font-medium text-slate-300 text-sm flex items-center justify-between select-none list-none">
                          <span>{q.q}</span>
                          <span className="text-slate-600 ml-2 flex-shrink-0 group-open:rotate-180 transition-transform text-xs">▼</span>
                        </summary>
                        <p className="text-slate-400 text-xs leading-relaxed mt-2 pl-2 border-l-2" style={{ borderColor: "var(--accent)" }}>{q.a}</p>
                      </details>
                    ))}
                  </div>
                </div>

                {/* Access records CTA */}
                <div className="rounded-xl p-4 text-sm" style={{ background: "#1a4a4a33", border: "1px solid #2d808044" }}>
                  <p className="font-semibold mb-1" style={{ color: "var(--accent-light)" }}>Access PILOT records</p>
                  <p className="text-slate-300 text-xs leading-relaxed mb-2">
                    PILOT agreements are public records. File an OPRA request with the Camden City Clerk or the CRDA. Free, must be answered within 7 business days.
                  </p>
                  <div className="flex gap-3">
                    <a href="https://crda.org" target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: "var(--accent-light)" }}>CRDA →</a>
                    <a href="https://www.camdennj.gov" target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: "var(--accent-light)" }}>Camden City →</a>
                  </div>
                </div>

                {/* Paste & decode */}
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-accent)", background: "var(--card-bg)" }}>
                  <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                    <p className="text-sm font-semibold text-white">Decode a PILOT agreement</p>
                    <p className="text-xs text-slate-400 mt-0.5">Paste any PILOT text — Haven will extract the affordable housing commitments and flag the gaps.</p>
                  </div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste PILOT agreement text here…"
                    rows={5}
                    className="w-full p-4 text-sm bg-transparent text-white placeholder-slate-500 resize-none focus:outline-none"
                  />
                  <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
                    <p className="text-xs text-slate-500">Decodes via AI — same engine as the document decoder</p>
                    <button
                      onClick={() => {
                        if (input.trim()) {
                          setMode("decode");
                          setTimeout(handleDecode, 50);
                        }
                      }}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40 transition-all"
                      style={{ background: "var(--accent)" }}
                    >
                      Decode →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 text-center text-xs text-slate-600" style={{ borderTop: "1px solid var(--border)" }}>
          <p>HAVEN is a free tool. It is not legal advice.</p>
          <p className="mt-1">
            For free legal help in NJ:{" "}
            <a href="https://www.lsnj.org" target="_blank" rel="noopener noreferrer" className="underline">
              Legal Services of NJ
            </a>{" "}
            · 1-888-576-5529
          </p>
          <p className="mt-2 text-slate-700">A wAI product · <a href="https://legisplain.org" target="_blank" rel="noopener noreferrer" className="underline">LegisPlain</a></p>
        </div>
      </main>
    </div>
  );
}
