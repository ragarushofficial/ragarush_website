import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, createSessionToken } from "@/lib/admin-session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    const password = typeof body.password === "string" ? body.password : "";
    const adminPass = process.env.ADMIN_PASSWORD;
    if (!adminPass || password !== adminPass) {
      return NextResponse.json({ success: false }, { status: 401 });
    }
    const token = createSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
