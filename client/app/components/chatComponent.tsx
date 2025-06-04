"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import ChatBubble from "./chatbubble"; // Adjust path if needed

interface Doc {
  pageContent?: string;
  metadata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}

interface ChatReplies {
  role: "assistant" | "user";
  content?: string;
  documents?: Doc[];
}

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatReplies[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleChat = async () => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");

    const res = await fetch(`http://localhost:8080/chat?message=${message}`);
    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data?.message,
        documents: data?.docs,
      },
    ]);
  };

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat scroll container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 ml-8 border mr-8 mt-4 mb-22 border-black shadow-2xl rounded-xl"
      > 
        {messages.map((msg, index) => (
          <ChatBubble key={index} role={msg.role} content={msg.content} />
        ))}
      </div>

      {/* Input section */}
      <div className="flex justify-center items-center mt-1">
        <div className="w-100 border-t text-gray bg-white p-2 flex gap-2 fixed bottom-0 rounded-xl mb-5 shadow-xl">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 text-black"
          />
          <Button onClick={handleChat} disabled={!message.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
