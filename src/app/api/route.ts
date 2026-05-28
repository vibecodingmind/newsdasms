import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "SDASMS Landing Page - Cron Monitor Active",
    monitoredUrl: "https://sdasms.com",
    lastChecked: new Date().toISOString(),
  });
}
