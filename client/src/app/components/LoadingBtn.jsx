import React from "react";

const LoadingBtn = () => {
  return (
    <div class="flex space-x-1 justify-center items-center">
      <span class="sr-only">Loading...</span>
      <div class="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.2s]"></div>
      <div class="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div class="h-2 w-2 bg-white rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingBtn;
