// import { authMiddleware } from "@clerk/nextjs";
// See https://clerk.com/docs/references/nextjs/auth-middleware

import { NextRequest, NextResponse } from "next/server";

export default async function authMiddleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  console.log("pathname", path);

  // Define public paths that don't require authentication
  const publicPaths = ["/", "/verifyemail"];

  // Check if the current path is public
  const isPublicPath = publicPaths.includes(path);

  let token = req.cookies.get("token")?.value || "";

  console.log("token", token);

  if (isPublicPath && token) {
    
    console.log("both are same  ");
    // If user is logged in and tries to access a public page, redirect to homepage
    return NextResponse.redirect(new URL("/homepage", req.nextUrl));
  } else if (isPublicPath && !token) {
    // If user is not logged in and tries to access a public page, redirect to login

    console.log("token naii haii ");

    return NextResponse.redirect(new URL("/signin", req.nextUrl));

  }
  
}

// Define paths where this middleware should be applied
export const config = {
  // List all the public paths
  publicRoutes: ["/", "/login", "/signup", "/verifyemail"]

};


