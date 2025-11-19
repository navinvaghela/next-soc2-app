import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { role } = await request.json();

  const res = NextResponse.json({ success: true });

  res.cookies.set("role", role, {
      sameSite: "strict",
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiry schedule
      path: "/",
    });

  return res;
}
