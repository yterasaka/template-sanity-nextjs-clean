import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define supported languages
const supportedLanguages = ["en", "fr", "ja", "es"];
const defaultLanguage = "en";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /blog, /about)
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already has a supported language prefix
  const pathnameHasLanguage = supportedLanguages.some(
    (language) =>
      pathname.startsWith(`/${language}/`) || pathname === `/${language}`
  );

  if (pathnameHasLanguage) return;

  // Check if there is a preferred language in the cookies
  const preferredLanguage =
    request.cookies.get("NEXT_LOCALE")?.value || defaultLanguage;

  // Redirect to the path with the preferred language
  return NextResponse.redirect(
    new URL(
      `/${preferredLanguage}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
      request.url
    )
  );
}

export const config = {
  // Skip all internal paths
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|static).*)"],
};
