import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  errorResponse,
  successResponse,
  withCors,
} from "@/lib/sdasms-api";

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
    const fingerprint = request.nextUrl.searchParams.get("fp") ?? undefined;

    // Check rate limit without incrementing — just get current status
    const rateLimitResult = checkRateLimit(ip, fingerprint);

    return successResponse({
      remaining: rateLimitResult.remaining,
      maxSends: 3,
      resetAt: new Date(rateLimitResult.resetAt).toISOString(),
      windowHours: 72,
    });
  } catch (error) {
    console.error("[free-sends] Error:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Failed to check free sends status.",
      500
    );
  }
}
