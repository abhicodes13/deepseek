import dbConnect from "@/config/db";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    const { chatId, name } = await req.json();
    await dbConnect();
    await Chat.findOneAndUpdate({ _id: chatId, userId }, { name });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error renaming chat:", error);
    return NextResponse.json(
      { message: "Error renaming chat" },
      { status: 500 }
    );
  }
}
