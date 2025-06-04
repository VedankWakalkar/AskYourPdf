import { UserButton } from "@clerk/nextjs";
import { MessageSquare } from "lucide-react";

interface ChatBubbleProps {
  role: "assistant" | "user";
  content?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <>
      <div
        className={`w-fit px-4 py-2 rounded-xl shadow-sm whitespace-pre-wrap flex justify-center items-center ${
          isUser
            ? "bg-blue-500 text-white self-end ml-auto"
            : "bg-gray-100 text-gray-900 self-start"
        }`}
      >
        {isUser ? (
          <>
            <div className="pr-2 pt-1">
              <UserButton />
            </div>
          </>
        ) : (
          <>
            <div className="pr-2 pt-1">
              <MessageSquare />
            </div>
          </>
        )}
        {content}
      </div>
    </>
  );
};

export default ChatBubble;
