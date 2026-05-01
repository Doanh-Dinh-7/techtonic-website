"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageSquare, Minus, Send, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type LeadState = {
  asked: boolean;
  consent: boolean;
  email: string;
  facebook: string;
  submitted: boolean;
};

const STORAGE_KEY = "techtonic_chat_v1";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function shouldAskLead(messages: ChatMessage[]) {
  const lastAssistant = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");
  if (!lastAssistant) return false;
  const t = lastAssistant.content.toLowerCase();
  return (
    t.includes("theo dõi fanpage") ||
    t.includes("email") ||
    t.includes("facebook") ||
    t.includes("mình chưa có thông tin")
  );
}

export function ChatWidget() {
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
    <div className="fixed bottom-24 right-6 z-40 md:right-8">
      {!open ? (
        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-gradient-to-r from-[#3756a6] to-[#667ee4] text-white shadow-lg hover:opacity-95"
          aria-label="Mở chat TechTonic"
          onClick={() => {
            setOpen(true);
            setMinimized(false);
          }}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      ) : (
        <div className="w-[360px] max-w-[calc(100vw-32px)]">
          {minimized ? (
            <Button
              className="w-full justify-between rounded-full bg-gradient-to-r from-[#3756a6] to-[#667ee4] text-white shadow-lg"
              onClick={() => setMinimized(false)}
              aria-label="Mở lại chat"
            >
              <span>Chat TechTonic</span>
              <span className="text-xs opacity-80">Mở lại</span>
            </Button>
          ) : (
            <Card className="border-border/80 bg-card/95 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-card/90">
              <CardHeader className="py-4 border-b">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    Chat TechTonic
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Thu nhỏ"
                      onClick={() => setMinimized(true)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="Đóng"
                      onClick={() => setOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div
                  ref={listRef}
                  className="max-h-[420px] overflow-auto px-4 pb-4 pt-2"
                >
                  {messages.length === 0 ? (
                    <div className="py-3 text-sm text-muted-foreground">
                      Bạn có thể hỏi về TechTonic (sự kiện, tuyển thành viên,
                      ban chuyên môn...).
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={
                          m.role === "user"
                            ? "ml-auto max-w-[85%] rounded-2xl bg-gradient-to-r from-[#3756a6] to-[#667ee4] px-3 py-2 text-sm text-white"
                            : "mr-auto max-w-[85%] rounded-2xl border bg-muted/60 px-3 py-2 text-sm"
                        }
                      >
                        {m.content ||
                          (m.role === "assistant" && streaming ? "..." : "")}
                      </div>
                    ))}
                  </div>

                  {showLeadCard ? (
                    <div className="mt-4 rounded-lg border bg-background/80 p-3">
                      <div className="text-sm font-medium">
                        Nhận thêm thông tin?
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        TechTonic chỉ dùng để liên hệ về yêu cầu này, không spam
                        và không chia sẻ bên thứ ba.
                      </div>

                      <div className="mt-3 grid gap-2">
                        <Input
                          placeholder="Email (tuỳ chọn)"
                          value={lead.email}
                          onChange={(e) =>
                            setLead((p) => ({ ...p, email: e.target.value }))
                          }
                        />
                        <Input
                          placeholder="Facebook (link/username, tuỳ chọn)"
                          value={lead.facebook}
                          onChange={(e) =>
                            setLead((p) => ({ ...p, facebook: e.target.value }))
                          }
                        />
                        <label className="flex items-center gap-2 text-xs">
                          <input
                            type="checkbox"
                            checked={lead.consent}
                            onChange={(e) =>
                              setLead((p) => ({
                                ...p,
                                consent: e.target.checked,
                              }))
                            }
                          />
                          Mình đồng ý để TechTonic lưu thông tin để liên hệ về
                          yêu cầu này.
                        </label>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            onClick={submitLead}
                            disabled={
                              !lead.consent ||
                              (!lead.email.trim() && !lead.facebook.trim())
                            }
                          >
                            Gửi thông tin
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() =>
                              setLead((p) => ({ ...p, asked: true }))
                            }
                          >
                            Bỏ qua
                          </Button>
                        </div>
                      </div>
                    </div>
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
              </CardContent>

              <CardFooter className="flex gap-2 border-t p-3">
                <Textarea
                  className="min-h-[40px] resize-none border-blue-300 focus:border-blue-500"
                  placeholder="Nhập câu hỏi..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void sendMessage();
                    }
                  }}
                />
                <Button
                  size="icon"
                  onClick={sendMessage}
                  disabled={streaming || !input.trim()}
                  className="bg-gradient-to-r from-[#3756a6] to-[#667ee4] text-white hover:opacity-95"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
