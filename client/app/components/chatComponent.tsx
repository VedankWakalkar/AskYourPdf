"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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

  const handleChat = async () => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    const res = await fetch(`http://localhost:8080/chat?message=${message}`);
    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data?.message,
        docs: data?.docs,
      },
    ]);
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <pre key={index}>{JSON.stringify(messages, null, 2)}</pre>
        ))}
      </div>
      <div className="p-4">
        <div className="flex fixed bottom-4 w-100 gap-3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type your query here"
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
