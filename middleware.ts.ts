import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  url.pathname = "/";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/:path*",
};
