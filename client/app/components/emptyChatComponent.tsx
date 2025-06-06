import { MessageSquare } from "lucide-react";
import React from "react";

const LoadingChat = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen flex-col">
      <div className="rounded-full bg-muted/40 h-16 w-16 flex items-center justify-center">
        <MessageSquare />
      </div>
      <div className="text-black pt-4 pb-4 font-semibold text-2xl">
        <span>Upload PDF To start Chatting</span>
      </div>
      <div className="text-black ">
        <div className="flex flex-col justify-center items-center font-regular text-regular">
          <span>Upload a PDF Document using the panel on the left . Once</span>
          <span>uploaded, you can ask questions about its contents.</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingChat;
