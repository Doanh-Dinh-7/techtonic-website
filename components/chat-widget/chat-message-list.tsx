"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessage } from "@/components/chat-widget/types";

type ChatMessageListProps = {
  messages: ChatMessage[];
  streaming: boolean;
};

export function ChatMessageList({ messages, streaming }: ChatMessageListProps) {
  return (
    <div className="flex flex-col gap-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className={
            message.role === "user"
              ? "ml-auto max-w-[85%] rounded-2xl bg-gradient-to-r from-[#3756a6] to-[#667ee4] px-3 py-2 text-sm text-white"
              : "mr-auto max-w-[85%] rounded-2xl border bg-muted/60 px-3 py-2 text-sm leading-relaxed"
          }
        >
          {message.role === "assistant" ? (
            message.content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3756a6] underline decoration-[#3756a6]/70 underline-offset-2 transition-colors hover:text-[#667ee4]"
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p {...props} className="mb-2 last:mb-0" />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul {...props} className="mb-2 list-disc pl-5 last:mb-0" />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol {...props} className="mb-2 list-decimal pl-5 last:mb-0" />
                  ),
                  code: ({ node, children, ...props }) => (
                    <code
                      {...props}
                      className="rounded bg-black/5 px-1 py-0.5 font-mono text-[0.85em]"
                    >
                      {children}
                    </code>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : streaming ? (
              "..."
            ) : (
              ""
            )
          ) : (
            message.content
          )}
        </div>
      ))}
    </div>
  );
}
