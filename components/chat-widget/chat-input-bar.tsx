"use client";

import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatInputBarProps = {
  input: string;
  streaming: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
};

export function ChatInputBar({
  input,
  streaming,
  onInputChange,
  onSend,
}: ChatInputBarProps) {
  return (
    <div className="flex flex-col gap-2 border-t p-3 sm:flex-row">
      <Textarea
        className="min-h-[40px] resize-none border-blue-300 focus:border-blue-500 sm:min-h-[40px]"
        placeholder="Nhập câu hỏi..."
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSend();
          }
        }}
      />
      <Button
        size="icon"
        onClick={onSend}
        disabled={streaming || !input.trim()}
        className="h-10 w-full bg-gradient-to-r from-[#3756a6] to-[#667ee4] text-white hover:opacity-95 sm:h-9 sm:w-9"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
