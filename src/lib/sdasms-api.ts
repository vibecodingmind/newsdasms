import { NextResponse } from "next/server";

/**
 * SDASMS API Configuration
 * The API token is read from the SDASMS_API_TOKEN environment variable
 * with a fallback default for development.
 */
export const SDASMS_API_TOKEN =
  process.env.SDASMS_API_TOKEN ?? "158|uXKGmvYYrvKBaw0pr9in439L8qxkAzkfqhzjbv0G32c3bb88";

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
 * Limits to 3 requests per hour per IP for SMS sending.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 3;

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // Reset the window
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(ip, { count: 1, resetAt });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetAt };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - entry.count, resetAt: entry.resetAt };
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
    NextResponse.json(data, { status })
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
