"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full mt-[22%] flex flex-col justify-center items-center text-3xl text-main-green">
      <h2>Not Found :( </h2>
      <Link href="/" className="text-gray-400 hover:text-main-green text-xl">
        Return Home
      </Link>
    </div>
  );
}
