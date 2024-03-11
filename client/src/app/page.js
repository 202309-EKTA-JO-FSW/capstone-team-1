"use client";
import { useEffect } from "react";

export default function Home() {
  // const [cookies, setCookie] = useCookies(["token"]);
  document.cookie = "testCookie=example";
  useEffect(() => {
    console.log("TOKEN: ", document.cookie);
  }, []);

  // console.log("TOKEN: ", Cookies.get("token"));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
}
