/* import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1m"),
  analytics: true,
});

const isPublicRoute = createRouteMatcher(["/", "/stack"]);

export default clerkMiddleware(async (auth, req) => {
  const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown";

  try {
    const result = await redis.ping();
    console.log("VERCEL REDIS:", result);
  } catch (error) {
    console.error("VERCEL REDIS ERROR:", error);
  }

  if (!success) {
    return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  return NextResponse.next();
});

console.log("URL exists:", !!process.env.UPSTASH_REDIS_REST_URL);
console.log("TOKEN exists:", !!process.env.UPSTASH_REDIS_REST_TOKEN);
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};*/
import { NextResponse } from "next/server";

export default function middleware(req) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
