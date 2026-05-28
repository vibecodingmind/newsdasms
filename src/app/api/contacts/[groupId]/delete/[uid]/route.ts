import { NextRequest } from "next/server";
import {
  SDASMS_API_TOKEN,
  SDASMS_CONTACTS_BASE_URL,
  SDASMS_HEADERS,
  errorResponse,
  successResponse,
} from "@/lib/sdasms-api";

interface RouteParams {
  params: Promise<{ groupId: string; uid: string }>;
}

export async function OPTIONS() {
  const { NextResponse } = await import("next/server");
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Guard: reject if API token is not configured on the server
    if (!SDASMS_API_TOKEN) {
      return errorResponse("Service not configured. Please contact support.", 503);
    }

    const { groupId, uid } = await params;

    if (!groupId) {
      return errorResponse("Group ID is required");
    }

    if (!uid) {
      return errorResponse("Contact UID is required");
    }

    const payload = {
      api_token: SDASMS_API_TOKEN,
    };

    const apiUrl = `${SDASMS_CONTACTS_BASE_URL}/${groupId}/delete/${uid}`;
    const apiResponse = await fetch(apiUrl, {
      method: "DELETE",
      headers: SDASMS_HEADERS,
      body: JSON.stringify(payload),
    });

    const responseData = await apiResponse.json();
    return successResponse(responseData, apiResponse.status);
  } catch (error) {
    console.error("[contacts/delete] Error:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Failed to delete contact. Please try again later.",
      500
    );
  }
}
