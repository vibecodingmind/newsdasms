import "server-only"; // Prevents client-side import — throws at build time if accidentally imported in a client component
import { NextResponse } from "next/server";

/**
 * SDASMS API Configuration
 * The API token is read EXCLUSIVELY from the SDASMS_API_TOKEN environment variable.
 * Never hardcode tokens — even server-side bundles can be inspected.
 * The "server-only" import above ensures this module can NEVER be bundled into client code.
 */
const _token = process.env.SDASMS_API_TOKEN;
if (!_token) {
  console.error(
    "[sdasms-api] FATAL: SDASMS_API_TOKEN environment variable is not set. " +
    "All API requests will fail. Set it in your .env file."
  );
}
export const SDASMS_API_TOKEN = _token ?? "";

export const SDASMS_HTTP_API_URL = "https://my.sdasms.com/api/http";
export const SDASMS_SMS_SEND_URL = "https://my.sdasms.com/api/http/sms/send";
export const SDASMS_CONTACTS_BASE_URL = `${SDASMS_HTTP_API_URL}/contacts`;

/**
 * Common headers for SDASMS API requests
 */
export const SDASMS_HEADERS: Record<string, string> = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

/**
 * Rate limiting: track requests per IP in memory.
 * Limits to 3 requests per 72 hours per IP for SMS sending.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 72 * 60 * 60 * 1000; // 72 hours
const RATE_LIMIT_MAX_REQUESTS = 3;

export function checkRateLimit(ip: string, fingerprint?: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();

  // Use composite key: IP + fingerprint for anti-bypass
  const compositeKey = fingerprint ? `${ip}::${fingerprint}` : ip;

  // Also check fingerprint-only key to catch VPN/IP changes
  const fingerprintKey = fingerprint ? `fp::${fingerprint}` : null;
  const ipKey = `ip::${ip}`;

  // Check all relevant keys and find the most restrictive
  const keysToCheck = [compositeKey, ipKey]
  if (fingerprintKey) keysToCheck.push(fingerprintKey)

  let mostRestrictiveEntry: { count: number; resetAt: number } | null = null

  for (const key of keysToCheck) {
    const entry = rateLimitMap.get(key)
    if (entry && now <= entry.resetAt) {
      if (!mostRestrictiveEntry || entry.count > mostRestrictiveEntry.count) {
        mostRestrictiveEntry = entry
      }
    }
  }

  // If any key is rate-limited, deny the request
  if (mostRestrictiveEntry && mostRestrictiveEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: mostRestrictiveEntry.resetAt };
  }

  // Increment count on all relevant keys
  for (const key of keysToCheck) {
    const entry = rateLimitMap.get(key)
    if (entry && now <= entry.resetAt) {
      entry.count += 1
    } else {
      rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    }
  }

  // Get the updated count from the composite key
  const updatedEntry = rateLimitMap.get(compositeKey)
  const currentCount = updatedEntry?.count ?? 1

  return { allowed: true, remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - currentCount), resetAt };
}

/**
 * Add CORS headers to a NextResponse
 */
export function withCors(response: NextResponse): NextResponse {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

/**
 * Create a JSON error response with CORS headers
 */
export function errorResponse(message: string, status: number = 400): NextResponse {
  return withCors(
    NextResponse.json(
      { success: false, message },
      { status }
    )
  );
}

/**
 * Create a JSON success response with CORS headers
 */
export function successResponse(data: unknown, status: number = 200): NextResponse {
  return withCors(
    NextResponse.json({ success: true, data }, { status })
  );
}

/**
 * Validate that required fields are present in the request body
 */
export function validateRequired(
  body: Record<string, unknown>,
  fields: string[]
): { valid: boolean; missing: string[] } {
  const missing = fields.filter(
    (field) => body[field] === undefined || body[field] === null || body[field] === ""
  );
  return { valid: missing.length === 0, missing };
}
