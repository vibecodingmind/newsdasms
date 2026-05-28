import { NextRequest } from "next/server";
import {
  SDASMS_API_TOKEN,
  SDASMS_CONTACTS_BASE_URL,
  SDASMS_HEADERS,
  errorResponse,
  successResponse,
  validateRequired,
} from "@/lib/sdasms-api";

interface RouteParams {
  params: Promise<{ groupId: string }>;
}

export async function OPTIONS() {
  const { NextResponse } = await import("next/server");
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    // Guard: reject if API token is not configured on the server
    if (!SDASMS_API_TOKEN) {
      return errorResponse("Service not configured. Please contact support.", 503);
    }

    const { groupId } = await params;

    if (!groupId) {
      return errorResponse("Group ID is required");
    }

    const body = await request.json();
    const { PHONE, FIRST_NAME, LAST_NAME, ...customFields } = body;

    // Validate required fields
    const validation = validateRequired({ PHONE }, ["PHONE"]);
    if (!validation.valid) {
      return errorResponse(`Missing required fields: ${validation.missing.join(", ")}`);
    }

    // Validate phone number format
    const phoneStr = String(PHONE).replace(/\s/g, "");
    if (!/^\d{6,15}$/.test(phoneStr)) {
      return errorResponse("Invalid phone number format. Must be digits only with country code");
    }

    // Build the payload with api_token and all provided fields
    const payload = {
      api_token: SDASMS_API_TOKEN,
      PHONE: phoneStr,
      ...(FIRST_NAME && { FIRST_NAME: String(FIRST_NAME) }),
      ...(LAST_NAME && { LAST_NAME: String(LAST_NAME) }),
      ...customFields,
    };

    const apiUrl = `${SDASMS_CONTACTS_BASE_URL}/${groupId}/store`;
    const apiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: SDASMS_HEADERS,
      body: JSON.stringify(payload),
    });

    const responseData = await apiResponse.json();
    return successResponse(responseData, apiResponse.status);
  } catch (error) {
    console.error("[contacts/store] Error:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Failed to create contact. Please try again later.",
      500
    );
  }
}
