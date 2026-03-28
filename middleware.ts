/**
 * middleware.ts — Edge security layer for HAVEN
 *
 * 1. Adds X-Request-Id for tracing
 * 2. Blocks known scanner/scraper user-agents on API routes
 * 3. Adds security headers to all responses
 * 4. Sets CORS to same-origin on API routes
 */

import { NextRequest, NextResponse } from "next/server";

const BAD_UA_RE = [
  /sqlmap/i,
  /nikto/i,
  /nessus/i,
  /masscan/i,
  /zgrab/i,
  /go-http-client\/1\.1$/i,
  /python-requests\/[01]\./i,
  /curl\/[0-6]\./i,
  /scrapy/i,
  /semrush/i,
  /ahrefsbot/i,
  /dotbot/i,
  /mj12bot/i,
  /serpstatbot/i,
];

const API_PATHS = ["/api/"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") ?? "";

  // Block known scanners on API routes
  if (API_PATHS.some((p) => pathname.startsWith(p))) {
    if (BAD_UA_RE.some((re) => re.test(ua))) {
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
      console.warn(`[haven/security] bot_block ip=${ip} path=${pathname} ua=${ua.slice(0, 120)}`);
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  const requestId = crypto.randomUUID();
  const response = NextResponse.next({
    request: {
      headers: new Headers({
        ...Object.fromEntries(request.headers),
        "x-request-id": requestId,
      }),
    },
  });

  response.headers.set("X-Request-Id", requestId);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)");

  const isDev = process.env.NODE_ENV === "development";
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data:",
      "connect-src 'self' https://va.vercel-scripts.com",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ")
  );

  // CORS: API routes are same-origin only
  if (API_PATHS.some((p) => pathname.startsWith(p))) {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    const isLocalDev = isDev && (origin?.includes("localhost") || origin?.includes("127.0.0.1"));
    const isSameOrigin = origin && host && origin.includes(host.split(":")[0]);

    if (origin && !isLocalDev && !isSameOrigin) {
      return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|icons).*)" ],
};
