import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/admin-session";

export async function GET() {
  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get(COOKIE_NAME)?.value)) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const backend = process.env.BACKEND_URL ?? "http://localhost:5000";
  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminPass) {
    return NextResponse.json(
      { success: false, errors: [{ message: "ADMIN_PASSWORD not configured" }] },
      { status: 503 }
    );
  }
  const res = await fetch(`${backend}/api/admin/orders`, {
    headers: { Authorization: `Bearer ${adminPass}` },
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as unknown;
  return NextResponse.json(data, { status: res.status });
}
