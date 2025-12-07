import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // read cookie
  const { pathname } = req.nextUrl;
  if (pathname == '/login') {
    if (token) {
      const dashboardUrl = new URL("/hris", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (pathname.startsWith('/hris') || pathname.startsWith('/dms')) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

 

  return NextResponse.next();
}

export const config = {
  matcher: ["/hris", "/login", "/dms"],
};
