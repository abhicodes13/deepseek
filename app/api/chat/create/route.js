import dbConnect from "@/config/db";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    console.log("post route hit");
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Proceed with the chat creation if the rate limit check passes
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
