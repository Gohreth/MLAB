import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const currentUserResponse = await fetch(
    "http://localhost:3001/api/user/currentuser",
    {
      method: "GET",
      credentials: "include",
      headers: {
        cookie: req.headers.get("cookie")!,
      },
    }
  );

  const dataResponse = await currentUserResponse.json();

  const newHeaders = new Headers(req.headers);

  let userInfo = {};

  if (dataResponse.success) {
    userInfo = dataResponse.data.user;
  }

  newHeaders.set("x-my-profile", JSON.stringify(userInfo));

  if (req.nextUrl.pathname === "/") {
    if (dataResponse.success) {
      return NextResponse.redirect(new URL("/books", req.url), {
        headers: newHeaders,
      });
    }
  } else {
    if (!dataResponse.success) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next({ headers: newHeaders });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
