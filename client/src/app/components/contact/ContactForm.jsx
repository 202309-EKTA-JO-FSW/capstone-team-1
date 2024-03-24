"use client";
import React from "react";
import Btn from "../Btn";
import { useRouter } from "next/navigation";

const ContactForm = () => {
  const route = useRouter();

  const handleSubmit = () => {
    route.refresh();
  };
  return (
    <div className="flex flex-col items-center justify-center relative top-20 left-2">
      <h1 className="font-bold text-[24px] p-3">Conact Form</h1>
      <form
        action="https://formsubmit.co/team1.recoder@gmail.com"
        method="POST"
        onSubmit={handleSubmit}
        className="w-full max-w-md"
      >
        <div className=" flex flex-col  p-2 ">
          {/* Name */}
          <input
            type="Name"
            name="Name"
            placeholder="Name"
            className="w-full field "
            autoComplete="name"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            className="w-full field  "
            autoComplete="email"
          />

          {/* Message */}

          <textarea
            type="message"
            name="message"
            placeholder="Message"
            className="w-full p-6 field h-32 "
          />
        </div>
        <div className="flex items-center justify-center">
          <Btn type="submit" text={"Submit Form"} />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
