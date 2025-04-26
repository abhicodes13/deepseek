import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

const ChatLabel = ({ openMenu, setOpenMenu, id, name }) => {
  const { user } = useAppContext();
  if (!user) return null;
  const { fetchUserChats, chats, setSelectedChat } = useAppContext();

  const selectChat = () => {
    const chatData = chats.find((chat) => chat._id === id);
    setSelectedChat(chatData);
    console.log(chatData);
  };

  const renameChat = async () => {
    try {
      const newName = prompt("Enter new chat name");
      if (!newName) return;
      const { data } = await axios.post("/api/chat/rename", {
        chatId: id,
        name: newName,
      });
      if (data.success) {
        fetchUserChats();
        setOpenMenu({ id: 0, open: false });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error renaming chat:", error.message);
    }
  };

  const deleteChat = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this chat?"
      );
      if (!confirm) return;
      const { data } = await axios.post("/api/chat/delete", { chatId: id });
      if (data.success) {
        fetchUserChats();
        setOpenMenu({ id: 0, open: false });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting chat:", error.message);
    }
  };

  return (
    <div
      onClick={selectChat}
      className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer"
    >
      <p className="group-hover:max-w-5/6 truncate">{name}</p>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenu({ id: id, open: !openMenu, open });
        }}
        className="group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg "
      >
        <Image
          src={assets.three_dots}
          alt=""
          className={`w-4 ${
            openMenu.id === id && openMenu.open ? "" : "hidden"
          } group-hover:block`}
        />
        <div
          className={`absolute ${
            openMenu.id === id && openMenu.open ? "block" : "hidden"
          } -right-36 top-6 bg-gray-700 rounded-3xl w-max p-2`}
        >
          <div
            onClick={renameChat}
            className="flex items-center gap-3 px-3  hover:bg-white/10 rounded-lg py-2  cursor-pointer"
          >
            <Image src={assets.pencil_icon} className="w-4" alt="" />
            <p>Rename</p>
          </div>
          <div
            onClick={deleteChat}
            className="flex items-center gap-3 px-3  hover:bg-white/10 rounded-lg py-2  cursor-pointer"
          >
            <Image src={assets.delete_icon} className="w-4" alt="" />
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLabel;
