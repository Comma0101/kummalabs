import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let locales = ["en", "zh"];

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return "en";
  
  if (acceptLanguage.includes("zh")) {
    return "zh";
  }
  return "en";
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  
  // Exclude static files, api routes, and icons
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes("favicon.ico") ||
    pathname.includes("icon") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".png")
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};