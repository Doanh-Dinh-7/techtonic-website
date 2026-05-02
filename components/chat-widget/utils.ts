import type { ChatMessage } from "@/components/chat-widget/types";

export const STORAGE_KEY = "techtonic_chat_v1";

export function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function shouldAskLead(messages: ChatMessage[]) {
  const lastAssistant = [...messages]
    .reverse()
    .find((message) => message.role === "assistant");
  if (!lastAssistant) return false;

  const text = lastAssistant.content.toLowerCase();
  return (
    text.includes("theo dõi fanpage") ||
    text.includes("email") ||
    text.includes("facebook") ||
    text.includes("mình chưa có thông tin")
  );
}
