"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { useAppDispatch } from "@/app/redux/hooks";
import { actionMsg } from "@/app/redux/features/message/MessageSlice";

const MessageBox = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const message = useAppSelector((state) => state.messageReducer.value);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        dispatch(actionMsg(""));
      }, 3000); // Show for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div>
      {isVisible && (
        <div className="fixed top-[100px] left-[100px] mb-4 mr-4 p-3 bg-gray-600 text-white rounded-md shadow-md transition-opacity duration-1000 opacity-100">
          {message}
        </div>
      )}
    </div>
  );
};

export default MessageBox;
