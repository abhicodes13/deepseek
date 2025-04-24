import dbConnect from "@/config/db";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const { chatId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }
    await dbConnect();
    await Chat.deleteOne({ _id: chatId, userId });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error renaming chat:", error);
    return NextResponse.json(
      { message: "Error renaming chat" },
      { status: 500 }
    );
  }
}
