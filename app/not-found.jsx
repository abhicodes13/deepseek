import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#292a2d] text-white">
      <h2 className="text-2xl">Page not found. Go back to chatbox </h2>

      <Link
        href="/"
        className="bg-black  hover:bg-gray-600 text-white px-4 py-2 rounded mt-4"
      >
        Return Home
      </Link>
    </div>
  );
}
