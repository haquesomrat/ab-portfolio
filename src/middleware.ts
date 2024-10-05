import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  const token = request.cookies.get(
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token"
  );
  // access api without token
  const pathname = request.nextUrl.pathname;
  if (pathname.includes("api")) {
    return NextResponse.next();
  }
  // redirecting to login page if no token
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*"],
};
