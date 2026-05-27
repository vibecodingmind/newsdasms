import { NextRequest, NextResponse } from "next/server";
import {
  SDASMS_API_TOKEN,
  SDASMS_SMS_SEND_URL,
  SDASMS_HEADERS,
  checkRateLimit,
  errorResponse,
  successResponse,
  validateRequired,
} from "@/lib/sdasms-api";

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export async function POST(request: NextRequest) {
  try {
    // Guard: reject if API token is not configured on the server
    if (!SDASMS_API_TOKEN) {
      return errorResponse("Service not configured. Please contact support.", 503);
    }

    // Rate limiting check
    const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
    const rateLimitResult = checkRateLimit(ip);

    if (!rateLimitResult.allowed) {
      return errorResponse(
        `Rate limit exceeded. Maximum 3 SMS per hour. Try again after ${new Date(rateLimitResult.resetAt).toISOString()}`,
        429
      );
    }

    // Parse request body
    const body = await request.json();
    const { senderId, phoneNumber, message } = body;

    // Validate required fields
    const validation = validateRequired({ senderId, phoneNumber, message }, [
      "senderId",
      "phoneNumber",
      "message",
    ]);

    if (!validation.valid) {
      return errorResponse(`Missing required fields: ${validation.missing.join(", ")}`);
    }

    // Validate phone number format (should include country code)
    const phoneStr = String(phoneNumber).replace(/\s/g, "");
    if (!/^\d{6,15}$/.test(phoneStr)) {
      return errorResponse(
        "Invalid phone number format. Must be digits only with country code (e.g., 255712345678)"
      );
    }

    // Validate message length
    const messageStr = String(message);
    if (messageStr.length === 0) {
      return errorResponse("Message cannot be empty");
    }
    if (messageStr.length > 1600) {
      return errorResponse("Message too long. Maximum 1600 characters allowed");
    }

    // Try v3 API first (OAuth 2.0 Bearer token), then fallback to HTTP API
    let apiResponse: Response;
    let usedEndpoint = "v3";

    // --- Attempt 1: v3 REST API (Bearer Auth) ---
    try {
      apiResponse = await fetch("https://my.sdasms.com/api/v3/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${SDASMS_API_TOKEN}`,
        },
        body: JSON.stringify({
          sender_id: String(senderId),
          type: "plain",
          recipient: phoneStr,
          message: messageStr,
        }),
      });

      const responseData = await apiResponse.json();

      // If v3 returns a plan/auth error that's not a field validation error, try HTTP API
      if (
        responseData.status === "error" &&
        (responseData.message?.includes("sending server") ||
          responseData.message?.includes("Unauthenticated") ||
          responseData.message?.includes("plan"))
      ) {
        usedEndpoint = "http";
        // --- Attempt 2: HTTP API (api_token in body) ---
        apiResponse = await fetch(SDASMS_SMS_SEND_URL, {
          method: "POST",
          headers: SDASMS_HEADERS,
          body: JSON.stringify({
            api_token: SDASMS_API_TOKEN,
            sender: String(senderId),
            recipient: phoneStr,
            message: messageStr,
          }),
        });

        const httpData = await apiResponse.json();
        return successResponse(
          {
            ...httpData,
            rateLimit: {
              remaining: rateLimitResult.remaining,
              resetAt: new Date(rateLimitResult.resetAt).toISOString(),
            },
          },
          apiResponse.status
        );
      }

      // v3 succeeded or returned a field validation error
      return successResponse(
        {
          ...responseData,
          rateLimit: {
            remaining: rateLimitResult.remaining,
            resetAt: new Date(rateLimitResult.resetAt).toISOString(),
          },
        },
        apiResponse.status
      );
    } catch {
      // v3 fetch failed entirely, fallback to HTTP API
      usedEndpoint = "http";
      apiResponse = await fetch(SDASMS_SMS_SEND_URL, {
        method: "POST",
        headers: SDASMS_HEADERS,
        body: JSON.stringify({
          api_token: SDASMS_API_TOKEN,
          sender: String(senderId),
          recipient: phoneStr,
          message: messageStr,
        }),
      });

      const httpData = await apiResponse.json();
      return successResponse(
        {
          ...httpData,
          rateLimit: {
            remaining: rateLimitResult.remaining,
            resetAt: new Date(rateLimitResult.resetAt).toISOString(),
          },
        },
        apiResponse.status
      );
    }
  } catch (error) {
    console.error("[send-sms] Error:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Failed to send SMS. Please try again later.",
      500
    );
  }
}
