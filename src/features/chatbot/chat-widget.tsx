"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, User, Bot, Minus, Maximize2, Minimize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { GlassCard } from "@/shared/ui-v2/glass-card";
import { NeonButton } from "@/shared/ui-v2/neon-button";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils";
import {
  uid,
  STORAGE_KEY,
  shouldAskLead,
  loadRateLimit,
  incrementQuestion,
  markHasLead,
  isRateLimited,
  getCooldownMinutes,
  type RateLimitState,
} from "./utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type LeadState = {
  asked: boolean;
  consent: boolean;
  email: string;
  facebook: string;
  submitted: boolean;
};

export function ChatWidget() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showChat, setShowChat] = useState(!isHome);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);

  const [conversationId] = useState(() => `c_${uid()}`);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Chào bạn! Mình là trợ lý AI của TechTonic. Mình có thể giúp gì cho bạn hôm nay?",
    },
  ]);
  const [lead, setLead] = useState<LeadState>({
    asked: false,
    consent: false,
    email: "",
    facebook: "",
    submitted: false,
  });
  const [, setRateLimit] = useState<RateLimitState>(() => loadRateLimit());

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isHome) {
      setShowChat(true);
      return;
    }
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.7;
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
      if (Array.isArray(data?.messages) && data.messages.length > 0) setMessages(data.messages);
      if (data?.lead) setLead((prev) => ({ ...prev, ...data.lead }));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, lead }));
    } catch {
      // ignore
    }
  }, [messages, lead]);

  useEffect(() => {
    if (!open || minimized) return;
    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });
  }, [messages, open, minimized]);

  const showLeadCard = useMemo(() => {
    if (lead.submitted) return false;
    if (lead.asked) return true;
    if (shouldAskLead(messages)) return true;
    return false;
  }, [lead.asked, lead.submitted, messages]);

  async function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text || streaming) return;

    // Check rate limit (reload fresh state in case cooldown passed)
    const freshRL = loadRateLimit();
    setRateLimit(freshRL);
    if (isRateLimited(freshRL)) {
      const cooldownMsg = freshRL.hasLead
        ? `Bạn đã đạt giới hạn ${7} câu hỏi. Vui lòng quay lại sau khoảng **${getCooldownMinutes(freshRL)} phút** để tiếp tục trò chuyện nhé!`
        : `Bạn đã đạt giới hạn ${7} câu hỏi cho phiên ẩn danh. Hãy **để lại thông tin liên hệ** bên dưới để được mở thêm ${7} lượt hỏi đáp nhé! 👇`;
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "user", content: text },
        { id: uid(), role: "assistant", content: cooldownMsg },
      ]);
      // Show lead card if anonymous and not yet submitted
      if (!freshRL.hasLead && !lead.submitted) {
        setLead((p) => ({ ...p, asked: true }));
      }
      setInput("");
      return;
    }

    setInput("");
    const userMsg: ChatMessage = { id: uid(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    // Increment question count
    const updatedRL = incrementQuestion(freshRL);
    setRateLimit(updatedRL);

    const assistantId = uid();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: conversationId,
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
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

        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const frame of parts) {
          const lines = frame.split("\n");
          const eventLine = lines.find((l) => l.startsWith("event:"));
          const dataLine = lines.find((l) => l.startsWith("data:"));
          const event = eventLine?.slice("event:".length).trim();
          const dataStr = dataLine?.slice("data:".length).trim() ?? "{}";
          let data: Record<string, unknown> = {};
          try {
            data = JSON.parse(dataStr);
          } catch {
            data = {};
          }
          if (event === "token" && typeof data.text === "string") {
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + data.text } : m))
            );
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau." }
            : m
        )
      );
    } finally {
      setStreaming(false);
      setLead((p) => ({ ...p, asked: p.asked || shouldAskLead(messages) }));
    }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (lead.submitted || streaming) return;
    if (!lead.email.trim() && !lead.facebook.trim()) return;

    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? null;
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: lead.email.trim(),
        facebook: lead.facebook.trim(),
        consent: lead.consent,
        conversation_id: conversationId,
        last_question: lastUser,
        page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
      }),
    }).catch(() => {});

    setLead((p) => ({ ...p, submitted: true }));

    // Reset rate limit — grant 7 more questions with shorter cooldown
    const newRL = markHasLead();
    setRateLimit(newRL);

    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: "assistant",
        content:
          "Cảm ơn bạn! TechTonic đã ghi nhận thông tin. Bạn được mở thêm **7 lượt hỏi đáp** — hãy tiếp tục trò chuyện nhé! 🎉",
      },
    ]);
  }

  return (
    <AnimatePresence>
      {showChat && (
        <motion.div
          key="chat-widget"
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-4 right-4 z-[100] sm:bottom-6 sm:right-6 md:right-8 flex flex-col items-end"
        >
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.div
                key="fab"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative group"
              >
                <div className="absolute -inset-1 rounded-full bg-cyan-500/20 blur-md transition-all duration-300 group-hover:bg-cyan-500/40" />
                <button
                  onClick={() => {
                    setOpen(true);
                    setMinimized(false);
                  }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--v2-glass-surface)] border border-[var(--v2-glass-border)] text-cyan-400 backdrop-blur-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="h-7 w-7" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="panel"
                data-lenis-prevent
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={cn(
                  "max-w-[calc(100vw-2rem)] origin-bottom-right overflow-hidden transition-all duration-300 ease-out",
                  expanded
                    ? "w-[calc(100vw-2rem)] sm:w-[600px]"
                    : "w-[calc(100vw-2rem)] sm:w-[380px]"
                )}
              >
                <GlassCard
                  glow="cyan"
                  className="flex flex-col shadow-2xl overflow-hidden w-full max-w-full"
                >
                  {minimized ? (
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer"
                      onClick={() => setMinimized(false)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300">
                          <Bot className="h-4 w-4" />
                        </div>
                        <span className="font-semibold text-sm">TechTonic AI</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpen(false);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Header */}
                      <div className="flex items-center justify-between border-b border-white/5 p-4 bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                            <Bot className="h-5 w-5 text-cyan-300" />
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">TechTonic AI</h3>
                            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                              </span>
                              Online
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hidden sm:inline-flex"
                            onClick={() => setExpanded((p) => !p)}
                            title={expanded ? "Thu nhỏ" : "Phóng to"}
                          >
                            {expanded ? (
                              <Minimize2 className="h-4 w-4" />
                            ) : (
                              <Maximize2 className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                            onClick={() => setMinimized(true)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                            onClick={() => setOpen(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Chat List */}
                      <div
                        data-lenis-prevent
                        className={cn(
                          "overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4 scroll-smooth overscroll-contain w-full transition-all duration-300",
                          expanded ? "h-[600px] max-h-[80vh]" : "h-[400px] max-h-[60vh]"
                        )}
                        ref={listRef}
                      >
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={cn(
                              "flex w-full min-w-0",
                              msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                          >
                            <div
                              className={cn(
                                "flex max-w-[88%] min-w-0 gap-2",
                                msg.role === "user" ? "flex-row-reverse" : "flex-row"
                              )}
                            >
                              <div
                                className={cn(
                                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                                  msg.role === "user"
                                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                                    : "bg-white/5 border-white/10 text-muted-foreground"
                                )}
                              >
                                {msg.role === "user" ? (
                                  <User className="h-4 w-4" />
                                ) : (
                                  <Bot className="h-4 w-4" />
                                )}
                              </div>
                              <div
                                className={cn(
                                  "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm break-words min-w-0 overflow-hidden",
                                  msg.role === "user"
                                    ? "bg-cyan-500/20 text-cyan-50 rounded-tr-sm border border-cyan-500/20 whitespace-pre-wrap"
                                    : "bg-white/5 text-foreground rounded-tl-sm border border-white/5"
                                )}
                              >
                                {msg.role === "user" ? (
                                  msg.content
                                ) : (
                                  <div className="prose prose-invert max-w-none text-sm leading-relaxed text-foreground [&_a]:text-cyan-400 [&_a]:underline [&_a]:break-all [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:my-1.5 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_code]:bg-black/30 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-cyan-300 [&_pre]:bg-black/40 [&_pre]:p-2 border-none">
                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                  </div>
                                )}
                                {streaming && msg.id === messages[messages.length - 1].id && (
                                  <span className="inline-block w-1 h-4 ml-1 bg-cyan-400 animate-pulse align-middle" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {showLeadCard && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="max-w-[90%] rounded-2xl bg-white/5 border border-cyan-500/20 p-4 shadow-lg">
                              <h4 className="font-medium text-sm text-cyan-100 mb-2">
                                Để lại thông tin liên hệ
                              </h4>
                              <p className="text-xs text-muted-foreground mb-4">
                                Bạn muốn được tư vấn chi tiết hơn? Vui lòng để lại email hoặc
                                Facebook.
                              </p>
                              <form onSubmit={submitLead} className="space-y-3">
                                <Input
                                  size={1}
                                  placeholder="Email của bạn"
                                  type="email"
                                  className="h-9 text-xs bg-black/20 border-white/10 focus-visible:ring-cyan-500/50"
                                  value={lead.email}
                                  onChange={(e) => setLead({ ...lead, email: e.target.value })}
                                />
                                <Input
                                  size={1}
                                  placeholder="Link Facebook (tuỳ chọn)"
                                  className="h-9 text-xs bg-black/20 border-white/10 focus-visible:ring-cyan-500/50"
                                  value={lead.facebook}
                                  onChange={(e) => setLead({ ...lead, facebook: e.target.value })}
                                />
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="consent"
                                    className="rounded border-white/20 bg-black/20 text-cyan-500 focus:ring-cyan-500/50"
                                    checked={lead.consent}
                                    onChange={(e) =>
                                      setLead({ ...lead, consent: e.target.checked })
                                    }
                                  />
                                  <label
                                    htmlFor="consent"
                                    className="text-[10px] text-muted-foreground leading-tight"
                                  >
                                    Tôi đồng ý để TechTonic liên hệ.
                                  </label>
                                </div>
                                <NeonButton
                                  type="submit"
                                  variant="cyan"
                                  className="w-full h-9 text-xs py-0"
                                  disabled={!lead.consent || (!lead.email && !lead.facebook)}
                                >
                                  Gửi thông tin
                                </NeonButton>
                              </form>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Input Area */}
                      <form
                        onSubmit={sendMessage}
                        className="p-3 border-t border-white/5 bg-white/[0.02]"
                      >
                        <div className="relative flex items-center">
                          <Input
                            placeholder="Nhập tin nhắn..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={streaming}
                            className="pr-12 h-11 bg-black/20 border-white/10 rounded-full focus-visible:ring-cyan-500/30 placeholder:text-muted-foreground/50"
                          />
                          <Button
                            type="submit"
                            size="icon"
                            disabled={!input.trim() || streaming}
                            className="absolute right-1.5 h-8 w-8 rounded-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 hover:text-cyan-100 disabled:bg-white/5 disabled:text-white/20"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </form>
                    </>
                  )}
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
