"use client";
//bg-[#292a2d
import { assets } from "@/assets/assets";

import SideBar from "@/components/SideBar";
import { useAppContext } from "@/context/AppContext";

import Image from "next/image";
import { useState, useRef } from "react";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { selectedChat, createNewChat } = useAppContext();
  const containerRef = useRef(null);

  return (
    <div>
      <div className="flex h-screen">
        <SideBar expand={expand} setExpand={setExpand} />

        <div className="flex-1 flex flex-col justify-center items-center bg-[#000000f2] px-4 pb-8 text-white relative">
          <div className="absolute w-80 h-70  bg-[#4d6afe]  rounded-[80%] -top-55 md:hidden  blur-[100px] mask-t-to-20%"></div>
          <div className="md:hidden absolute px-4 top-6 flex justify-between items-center w-full">
            <Image
              className="rotate-180"
              src={assets.menu_icon}
              alt="menu"
              onClick={() => setExpand(!expand)}
            ></Image>
            <Image
              onClick={() => createNewChat()}
              className="opacity-70"
              src={assets.chat_icon}
              alt="chat"
            ></Image>
          </div>
          <div className="flex flex-col m-2 p-10 md:p-40 overflow-y-scroll items-center gap-3">
            <div className="text-3xl tracking-tight ">How I built this</div>
            <div className="text-md text-center -tracking-tight mt-10">
              {" "}
              By combining modern full-stack tools to create a secure and
              scalable app. The frontend was developed using{" "}
              <span className="text-black bg-white px-1 font-semibold">
                Next.JS
              </span>{" "}
              and{" "}
              <span className="bg-[#58C4DC] text-black px-2 font-semibold">
                React
              </span>
              , providing a fast and dynamic user experience. For{" "}
              <span className="font-extrabold">
                authentication and user management{" "}
              </span>
              , I integrated{" "}
              <span className="bg-[#6C47FF] font-semibold  px-1">Clerk</span>,
              which handled sign-up, login, and user sessions seamlessly.{" "}
              <span className="font-extrabold"> On the backend </span> , I set
              up <span className="bg-[#6C47FF] font-semibold  px-1">Clerk</span>{" "}
              webhooks to listen for important authentication events (such as
              new user creation or user updates). These webhooks allowed my
              backend to securely react to user changes in real-time, such as
              initializing user data or logging analytics events. The chat
              interface itself closely mimicked the original Deepseek, with a
              clean, minimalist design. Messages were handled through API routes
              in{" "}
              <span className="text-black bg-white px-1 font-semibold">
                Next.JS
              </span>
              , communicating with the backend for storing conversations in
              <span className="bg-[#00ed63d5] font-semibold px-1 text-black">
                {" "}
                MONGODB
              </span>{" "}
              or interacting with AI models. Overall, the stack combined:{" "}
              <span className="text-black bg-white px-1 font-semibold">
                Next.JS
              </span>{" "}
              (frontend framework) React (component-based UI){" "}
              <span className="bg-[#6C47FF] font-semibold  px-1">Clerk</span>
              (authentication and user management) Clerk Webhooks (backend event
              handling) This setup made it easy to create a fully authenticated,
              real-time AI chat experience with modern development practices.
            </div>
          </div>
          <p className="text-xs absolute bottom-1 text-gray-500">
            AI generated for reference only
          </p>
        </div>
      </div>
    </div>
  );
}
