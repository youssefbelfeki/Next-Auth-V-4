import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth:middleware } = NextAuth(authConfig) 
const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/profile"];

export default middleware((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;
  const isUserLoggedIn: boolean = Boolean(req.auth);

  if (authRoutes.includes(path) && isUserLoggedIn) {
    return NextResponse.redirect(new URL("/profile", nextUrl));
  }
  if (protectedRoutes.includes(path) && !isUserLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
});

export const config = {
  matcher: ["/login", "/register", "/profile"],
};
