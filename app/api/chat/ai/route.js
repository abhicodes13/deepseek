export const maxDuration = 60;

import dbConnect from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1m"), // 5 requests per minute
  analytics: true,
});

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com/",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { chatId, prompt } = await req.json();

    if (!userId) {
      return new Response("Invalid user", { status: 400 });
    }

    const { success } = await ratelimit.limit(userId);

    if (!success) {
      return new Response(
        JSON.stringify({
          error:
            "Too many requests. Please wait before sending another message.",
        }),
        { status: 429 }
      );
    }

    await dbConnect();

    const data = await Chat.findOne({ userId, _id: chatId });

    const userPrompt = {
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };

    data.messages.push(userPrompt);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "deepseek-chat",
      store: true,
    });

    const message = completion.choices[0].message;

    message.timestamp = Date.now();
    data.messages.push(message);
    data.save();

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
