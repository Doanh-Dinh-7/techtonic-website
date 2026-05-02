"use client";

import type { RefObject } from "react";

import { ChatLeadCard } from "@/components/chat-widget/chat-lead-card";
import { ChatMessageList } from "@/components/chat-widget/chat-message-list";
import type { ChatMessage, LeadState } from "@/components/chat-widget/types";

type ChatContentProps = {
  listRef: RefObject<HTMLDivElement>;
  messages: ChatMessage[];
  streaming: boolean;
  showLeadCard: boolean;
  lead: LeadState;
  onLeadChange: (updater: (prev: LeadState) => LeadState) => void;
  onLeadSubmit: () => void;
};

export function ChatContent({
  listRef,
  messages,
  streaming,
  showLeadCard,
  lead,
  onLeadChange,
  onLeadSubmit,
}: ChatContentProps) {
  return (
    <div
      ref={listRef}
      className="max-h-[min(52vh,420px)] overflow-auto px-3 pb-3 pt-2 sm:px-4 sm:pb-4"
    >
      {messages.length === 0 ? (
        <div className="py-3 text-sm text-muted-foreground">
          Bạn có thể hỏi về TechTonic (sự kiện, tuyển thành viên, ban chuyên
          môn...).
        </div>
      ) : null}

      <ChatMessageList messages={messages} streaming={streaming} />

      {showLeadCard ? (
        <ChatLeadCard lead={lead} onChange={onLeadChange} onSubmit={onLeadSubmit} />
      ) : null}

      <div className="mt-3 text-xs text-muted-foreground">
        Theo dõi fanpage:{" "}
        <a
          className="underline hover:text-foreground"
          href="https://www.facebook.com/TechTonic.Club17"
          target="_blank"
          rel="noreferrer"
        >
          TechTonicClub
        </a>
      </div>
    </div>
  );
}
