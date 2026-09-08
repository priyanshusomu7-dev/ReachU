import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-pathname", pathname)

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login"
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value
    const session = sessionCookie ? await verifySessionToken(sessionCookie) : null

    // Unauthenticated user trying to access protected admin page
    if (!session && !isLoginPage) {
      const url = new URL("/admin/login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }

    // Authenticated user trying to visit /admin/login
    if (session && isLoginPage) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     * - uploads/ (uploaded media)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|uploads/).*)",
  ],
}
