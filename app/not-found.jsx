import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#212122] text-white">
      <Image
        className={` h-30 mb-4 w-36 `}
        src={assets.logo_icon} // assets.logo_icon}
        alt=""
      />
      <h2 className="text-xl ">The page you are looking for does not exist.</h2>
      <div
        className="flex  w-[200px] 
       h-[20px] items-center justify-center mt-4"
      ></div>

      <Link
        href="/"
        className="bg-black  hover:bg-primary text-white px-4 py-2 rounded "
      >
        Return Home
      </Link>
    </div>
  );
}
