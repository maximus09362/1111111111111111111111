import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Permitir archivos estáticos (imagen de mantenimiento, etc.)
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/mantenimiento.png") ||
    url.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Redirigir todo al inicio
  url.pathname = "/";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: "/:path*",
};
