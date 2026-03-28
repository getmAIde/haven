/**
 * ratelimit.ts — Upstash Redis rate limiting for HAVEN (Edge runtime)
 *
 * Per-minute burst + per-hour sustained windows.
 * Fails open if Upstash is not configured (dev/local).
 */

export interface RateLimitResult {
  allowed: boolean;
  count: number;
  limit: number;
  retryAfter?: number;
}

export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

function upstashUrl(): string | null {
  return process.env.UPSTASH_REDIS_KV_REST_API_URL ?? null;
}

function upstashToken(): string | null {
  return process.env.UPSTASH_REDIS_KV_REST_API_TOKEN ?? null;
}

async function redisCommand(...args: (string | number)[]): Promise<unknown> {
  const url = upstashUrl();
  const token = upstashToken();
  if (!url || !token) return null;
  const res = await fetch(`${url}/${args.map(encodeURIComponent).join("/")}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash error: ${res.status}`);
  const json = await res.json() as { result: unknown };
  return json.result;
}

async function increment(key: string, windowSecs: number): Promise<number> {
  const count = await redisCommand("INCR", key) as number;
  if (count === 1) await redisCommand("EXPIRE", key, windowSecs);
  return count;
}

async function ttl(key: string): Promise<number> {
  return Math.max((await redisCommand("TTL", key) as number) ?? 0, 0);
}

const ROUTE_LIMITS: Record<string, { perMinute: number; perHour: number }> = {
  decode: { perMinute: 5, perHour: 20 },
  fmr:    { perMinute: 20, perHour: 100 },
};

const DEFAULT_LIMITS = { perMinute: 10, perHour: 60 };

export async function checkRateLimit(ip: string, route: string): Promise<RateLimitResult> {
  if (!upstashUrl() || !upstashToken()) {
    return { allowed: true, count: 0, limit: 999 };
  }

  const cfg = ROUTE_LIMITS[route] ?? DEFAULT_LIMITS;
  const minKey = `haven:rl:${ip}:${route}:min:${Math.floor(Date.now() / 60_000)}`;
  const hrKey  = `haven:rl:${ip}:${route}:hr:${Math.floor(Date.now() / 3_600_000)}`;

  try {
    const [minCount, hrCount] = await Promise.all([
      increment(minKey, 60),
      increment(hrKey, 3600),
    ]);

    if (minCount > cfg.perMinute) {
      return { allowed: false, count: minCount, limit: cfg.perMinute, retryAfter: await ttl(minKey) };
    }
    if (hrCount > cfg.perHour) {
      return { allowed: false, count: hrCount, limit: cfg.perHour, retryAfter: await ttl(hrKey) };
    }
    return { allowed: true, count: hrCount, limit: cfg.perHour };
  } catch (err) {
    // Upstash unavailable — fail open
    console.error("[haven/ratelimit] Upstash error, failing open:", err);
    return { allowed: true, count: 0, limit: cfg.perHour };
  }
}
