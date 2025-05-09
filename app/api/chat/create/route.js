import dbConnect from "@/config/db";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// ✅ Setup Upstash Redis & Rate Limiter
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "1m"), // 5 requests per 30 seconds
  analytics: true,
});

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    const { success, reset } = await ratelimit.limit(userId);

    if (!success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait before sending more messages.",
          reset, // optional: send reset time to UI
        },
        { status: 429 }
      );
    }
    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
    };

    await dbConnect();
    await Chat.create(chatData);
    return NextResponse.json({ message: "Chat created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { message: "Error creating chat" },
      { status: 500 }
    );
  }
}
