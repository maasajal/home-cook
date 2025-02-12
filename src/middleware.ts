import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");

  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};

// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: "/auth", // Redirect to login if user is unauthenticated
//   },
// });

// // Apply the middleware to protect only specific routes (e.g., /dashboard)
// export const config = {
//   matcher: ["/dashboard/:path*"],
// };
