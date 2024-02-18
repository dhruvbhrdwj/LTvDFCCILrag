"use client";

import { useEffect, useRef } from "react";
import ChatItem from "./chat-item";

export interface Message {
  id: string;
  content: string;
  role: string;
}

export default function ChatMessages({
  messages,
  isLoading,
  reload,
  stop,
  onQuestionClick,
}: {
  messages: Message[];
  isLoading?: boolean;
  stop?: () => void;
  reload?: () => void;
  onQuestionClick?: (questionText: string) => void;
}) {
  const scrollableChatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollableChatContainerRef.current) {
      scrollableChatContainerRef.current.scrollTop =
        scrollableChatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  return (
    <div className="w-full max-w-9xl p-4 bg-white rounded-xl shadow-xl">
      <div
        className="flex flex-col gap-5 divide-y h-[50vh] overflow-auto"
        ref={scrollableChatContainerRef}
      >
        {messages.map((m: Message) => (
          <ChatItem key={m.id} {...m} />
        ))}
      </div>
      {messages.length === 0 && !isLoading && (
        <div className="mt-auto w-full">
          <div className="flex flex-col justify-center items-start p-4 space-y-2">
          <p className="p-2 mb-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer">Sample Questions</p>
          <div className=" bg-gray-50 rounded p-2 mb-2 hover:bg-gray-100 cursor-pointer">Find some contradictions in the Respondants statement</div>
          <div className=" bg-gray-50 rounded p-2 mb-2 hover:bg-gray-100 cursor-pointer">What are the key points Mr. Anurag mentioned regarding the Claimants performance and execution?</div>
          {/* <div className=" bg-gray-50 rounded p-2 mb-2 hover:bg-gray-100 cursor-pointer">Summarize the key points in the Contract Agreement</div> */}
        </div>
        </div>
      )}
    </div>
  );
}
