"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ChatContent } from "@/components/chat-widget/chat-content";
import { ChatFab } from "@/components/chat-widget/chat-fab";
import { ChatInputBar } from "@/components/chat-widget/chat-input-bar";
import { ChatMinimizedBar } from "@/components/chat-widget/chat-minimized-bar";
import { ChatPanel } from "@/components/chat-widget/chat-panel";
import type { ChatMessage, LeadState } from "@/components/chat-widget/types";
import { shouldAskLead, STORAGE_KEY, uid } from "@/components/chat-widget/utils";

export function ChatWidget() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showChat, setShowChat] = useState(!isHome);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);

  const [conversationId] = useState(() => `c_${uid()}`);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lead, setLead] = useState<LeadState>({
    asked: false,
    consent: false,
    email: "",
    facebook: "",
    submitted: false,
  });

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isHome) {
      setShowChat(true);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setShowChat(window.scrollY > heroHeight);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (!showChat) {
      setOpen(false);
      setMinimized(false);
    }
  }, [showChat]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (Array.isArray(data?.messages)) setMessages(data.messages);
      if (data?.lead) setLead((prev) => ({ ...prev, ...data.lead }));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          messages,
          lead,
        }),
      );
    } catch {
      // ignore
    }
  }, [messages, lead]);

  useEffect(() => {
    if (!open || minimized) return;
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages, open, minimized]);

  const showLeadCard = useMemo(() => {
    if (lead.submitted) return false;
    if (lead.asked) return true;
    if (shouldAskLead(messages)) return true;
    return false;
  }, [lead.asked, lead.submitted, messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || streaming) return;

    setInput("");
    const userMsg: ChatMessage = { id: uid(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    const assistantId = uid();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: conversationId,
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      if (!res.ok || !res.body) throw new Error("Chat request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Parse SSE frames (very small parser)
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const frame of parts) {
          const lines = frame.split("\n");
          const eventLine = lines.find((l) => l.startsWith("event:"));
          const dataLine = lines.find((l) => l.startsWith("data:"));
          const event = eventLine?.slice("event:".length).trim();
          const dataStr = dataLine?.slice("data:".length).trim() ?? "{}";
          let data: any = {};
          try {
            data = JSON.parse(dataStr);
          } catch {
            data = {};
          }
          if (event === "token" && typeof data.text === "string") {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: m.content + data.text }
                  : m,
              ),
            );
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  "Xin lỗi, mình gặp lỗi khi trả lời. Bạn thử lại giúp mình nhé.",
              }
            : m,
        ),
      );
    } finally {
      setStreaming(false);
      setLead((p) => ({ ...p, asked: p.asked || shouldAskLead(messages) }));
    }
  }

  async function submitLead() {
    if (lead.submitted || streaming) return;
    if (!lead.consent) return;
    if (!lead.email.trim() && !lead.facebook.trim()) return;

    const lastUser =
      [...messages].reverse().find((m) => m.role === "user")?.content ?? null;
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: lead.email.trim(),
        facebook: lead.facebook.trim(),
        consent: lead.consent,
        conversation_id: conversationId,
        last_question: lastUser,
        page_path:
          typeof window !== "undefined" ? window.location.pathname : undefined,
      }),
    }).catch(() => {});

    setLead((p) => ({ ...p, submitted: true }));
    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: "assistant",
        content:
          "Cảm ơn bạn. Mình đã ghi nhận thông tin để TechTonic liên hệ về yêu cầu này (không spam). Bạn có thể hỏi thêm bất cứ điều gì nhé.",
      },
    ]);
  }

  return (
    <AnimatePresence>
      {showChat && (
        <motion.div
          key="chat-widget"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-2 z-40 sm:bottom-24 sm:right-6 md:right-8"
        >
          <AnimatePresence mode="wait">
            {!open ? (
              <ChatFab
                onOpen={() => {
                  setOpen(true);
                  setMinimized(false);
                }}
              />
            ) : (
              <ChatPanel
                onMinimize={() => setMinimized(true)}
                onClose={() => setOpen(false)}
              >
                {minimized ? (
                  <div className="p-3">
                    <ChatMinimizedBar onRestore={() => setMinimized(false)} />
                  </div>
                ) : (
                  <>
                    <ChatContent
                      listRef={listRef}
                      messages={messages}
                      streaming={streaming}
                      showLeadCard={showLeadCard}
                      lead={lead}
                      onLeadChange={setLead}
                      onLeadSubmit={submitLead}
                    />
                    <ChatInputBar
                      input={input}
                      streaming={streaming}
                      onInputChange={setInput}
                      onSend={() => {
                        void sendMessage();
                      }}
                    />
                  </>
                )}
              </ChatPanel>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
