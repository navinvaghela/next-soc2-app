
import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const dashPrefix = "/dashboard/";
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const role = req?.cookies?.get("role")?.value;

  if (url.pathname === "/auth/login" && role) {
    const res = NextResponse.next();
    res.cookies.set("role", "", { path: "/" });
    return res;
  }

  if (pathname === "/" || pathname.startsWith("/auth") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }


  if (!role) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith(dashPrefix)) {
    const requestedRole = pathname.slice(dashPrefix.length).split("/")[0]?.trim();
    if (requestedRole && requestedRole !== role) {
      url.pathname = `/dashboard/${role}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
