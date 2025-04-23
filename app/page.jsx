"use client";

import { assets } from "@/assets/assets";
import SideBar from "@/components/SideBar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="flex h-screen">
        <SideBar expand={expand} setExpand={setExpand} />
        <div className="flex-1 flex flex-col justify-center items-center bg-[#292a2d] px-4 pb-8 text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex justify-between items-center w-full">
            <Image
              className="rotate-180"
              src={assets.menu_icon}
              alt="menu"
              onClick={() => setExpand(!expand)}
            ></Image>
            <Image
              className="opacity-70"
              src={assets.chat_icon}
              alt="chat"
            ></Image>
          </div>
          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image src={assets.logo_icon} alt="" className="h-16 "></Image>
                <p className="text-2xl font-medium">Hi, I'm Deepseek</p>
              </div>
              <p className="text-sm mt-2">How can I help you today ?</p>
            </>
          ) : (
            <div></div>
          )}
          <p className="text-xs absolute bottom-1 text-gray-500">
            AI generated for reference only
          </p>
        </div>
      </div>
    </div>
  );
}
