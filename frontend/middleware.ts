import type { SessionCookie } from "@local/shared-types";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let sessionId = request.cookies.get("auth_session")?.value;

  if (!sessionId) {
    NextResponse.redirect(new URL("/enter", request.url));
    return;
  }

  let response = NextResponse.next();

  let apiEndpoint = process.env.API_ENDPOINT;

  let authResponse = await fetch(`${apiEndpoint}/v1/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": process.env.API_TOKEN,
    },
    body: JSON.stringify({ sessionId }),
  });

  if (!authResponse.ok) {
    let redirectResp = NextResponse.redirect(new URL("/enter", request.url));
    // Clear the cookie
    redirectResp.cookies.set("auth_session", "", { maxAge: 0 });

    return redirectResp;
  }

  let body = await authResponse.json() as {
    state: "valid-refresh";
    sessionCookie: SessionCookie;
    user: { id: string; email: string };
  } | {
    state: "invalid";
  } | {
    state: "valid";
    user: { id: string; email: string };
  };

  if (body.state === "invalid") {
    let redirectResp = NextResponse.redirect(new URL("/", request.url));
    // Clear the cookie
    redirectResp.cookies.set("auth_session", "", { maxAge: 0 });
    return redirectResp;
  } else if (body.state === "valid-refresh") {
    response.cookies.set("auth_session", body.sessionCookie.value, body.sessionCookie.attributes);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths (under `/app`) except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico)app/.*)",
    "/(app.*)",
  ],
};
