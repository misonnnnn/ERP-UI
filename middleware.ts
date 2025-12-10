import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyJWT(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET); 
    return await jwtVerify(token, secret);
  } catch (err) {
    return null; // expired, invalid, malformed
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  let validToken = null;
  if (token) validToken = await verifyJWT(token);

  if (pathname === "/login") {
    if (validToken) {
      return NextResponse.redirect(new URL("/hris", req.url));
    }
  }

  if (pathname.startsWith("/hris") || pathname.startsWith("/dms")) {
    if (!validToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hris/:path*", "/dms/:path*", "/login"],
};
