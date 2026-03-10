import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8787";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (!path.startsWith("/app")) {
    return NextResponse.next();
  }

  const cookie = request.headers.get("cookie") ?? "";
  const res = await fetch(`${API_BASE}/auth/session`, {
    headers: {
      cookie,
    },
    cache: "no-store",
  }).catch(() => null);

  if (!res || !res.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
