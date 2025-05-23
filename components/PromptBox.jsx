import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";

import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const PromptBox = ({ setIsLoading, isLoading }) => {
  const [prompt, setPrompt] = useState("");
  const { user, chats, setChats, setSelectedChat, selectedChat } =
    useAppContext();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt(e);
    }
  };
  const sendPrompt = async (e) => {
    const promptCopy = prompt;
    try {
      e.preventDefault();
      if (!user) return toast.error("Please login to use this feature");

      if (isLoading)
        return toast.error("Please wait for the previous response");

      setIsLoading(true);
      setPrompt("");

      const userPrompt = {
        role: "user",
        content: prompt,
        timestamp: Date.now(),
      };

      // Save user prompt in chat array
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === selectedChat._id
            ? { ...chat, messages: [...chat.messages, userPrompt] }
            : chat
        )
      );

      setSelectedChat((prev) => ({
        ...prev,
        messages: [...prev.messages, userPrompt],
      }));

      const { data } = await axios.post("/api/chat/ai", {
        chatId: selectedChat._id,
        prompt,
      });

      if (data.success) {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat._id === selectedChat._id
              ? { ...chat, messages: [...chat.messages, data.data] }
              : chat
          )
        );

        const message = data.data.content;
        const messageTokens = message.split(" ");

        let assistantMessage = {
          role: "assistant",
          content: "",
          timestamp: Date.now(),
        };

        setSelectedChat((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
        }));

        for (let i = 0; i < messageTokens.length; i++) {
          setTimeout(() => {
            assistantMessage.content = messageTokens.slice(0, i + 1).join(" ");

            setSelectedChat((prev) => {
              const updatedMessages = [
                ...prev.messages.slice(0, -1),
                assistantMessage,
              ];
              return { ...prev, messages: updatedMessages };
            });
          }, i * 100);
        }
      } else {
        toast.error(data.message);
        setPrompt(promptCopy);
      }
    } catch (error) {
      let fallbackMsg = "Something went wrong.";
      if (error.response?.status === 429) {
        try {
          const errorData =
            typeof error.response.data === "string"
              ? JSON.parse(error.response.data)
              : error.response.data;
          fallbackMsg = errorData.error || fallbackMsg;
        } catch {
          fallbackMsg = "Too many requests. Please wait a minute.";
        }
      } else {
        fallbackMsg =
          error.response?.data?.error ||
          error.message ||
          "Something went wrong.";
      }

      toast.error(fallbackMsg);
      setPrompt(promptCopy);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={sendPrompt}
      className={`w-full z-10 border-b-2 border-[#4d6afe] ${
        selectedChat?.messages.length > 0 ? "max-w-3xl" : "max-w-2xl"
      }  bg-[#19191a] rounded-3xl mt-4 p-4 transition-all `}
    >
      <textarea
        onKeyDown={handleKeyDown}
        className="outline-none overflow-hidden w-full resize-none break-words z-10 bg-transparent"
        rows={2}
        placeholder="Message Deepseek"
        required
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <p className="flex item-center gap-2 text-xs border-gray border-gray-500/30 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5" src={assets.deepthink_icon} alt="" />
            DeepThink (R1)
          </p>
          <p className="flex item-center gap-2 text-xs border-gray border-gray-500/30 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image className="h-5" src={assets.search_icon} alt="" />
            Search
          </p>
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <Image className="w-4 cursor-pointer" src={assets.pin_icon} alt="" />
          <button
            className={`${
              prompt ? "bg-primary" : "bg-[#71717a]"
            } rounded-full p-2 cursor-pointer`}
          >
            {" "}
            <Image
              className="w-3.5 aspect-square h-auto"
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              alt=""
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptBox;
