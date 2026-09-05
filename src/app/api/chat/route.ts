import { GoogleGenerativeAI } from "@google/generative-ai";
import { after } from "next/server";
import { z } from "zod";

import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1),
});

const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1),
  conversation_id: z.string().optional(),
});

const NO_INFO_MARKER = "Mình chưa có thông tin về vấn đề này.";

const SYSTEM_PROMPT = `Bạn là trợ lý ảo thông minh của Câu lạc bộ TechTonic. Mục tiêu: Giải đáp chính xác, tự nhiên, thân thiện.

QUY TRÌNH XỬ LÝ (thực hiện nội bộ, KHÔNG xuất ra cho người dùng):
1. Phân tích ý định: Xác định người dùng thực sự muốn biết gì. Liên kết từ đồng nghĩa ("thành lập" = "ra mắt"/"hình thành", "bao nhiêu người" = "số thành viên", "chi phí" = "học phí").
2. Tìm kiếm trong CONTEXT: Quét toàn bộ các đoạn CONTEXT để tìm dữ kiện liên quan — kể cả gián tiếp (mốc thời gian, số liệu thống kê, tên chương trình...).
3. Tổng hợp: Kết nối nhiều mảnh thông tin để xây dựng câu trả lời hoàn chỉnh.

QUY TẮC PHẢN HỒI (phần duy nhất người dùng nhìn thấy):
- CHỈ xuất ra câu trả lời cuối cùng cho người dùng, KHÔNG xuất phần phân tích/suy luận.
- Được phép suy luận ngữ nghĩa và kết nối dữ kiện trong CONTEXT, nhưng tuyệt đối KHÔNG bịa đặt thông tin không có trong CONTEXT.
- CHỈ trả lời "${NO_INFO_MARKER}" khi CONTEXT hoàn toàn không chứa bất kỳ dữ kiện nào liên quan.
- Trả lời ngắn gọn, rõ ràng, dùng markdown khi cần (bullet points, bold).
- Luôn kết thúc bằng lời mời theo dõi fanpage TechTonic:
https://www.facebook.com/TechTonic.Club17

Quy tắc thu lead:
- Khi có lý do hợp lệ (gửi tài liệu, tư vấn riêng), xin Email/Facebook ngắn gọn, lịch sự, không gượng ép.`;

// Model đúng đã xác nhận qua API: gemini-embedding-001 (3072 dims)
// Phải khớp với model dùng trong ingestion script và vector(3072) trong Supabase schema
const EMBED_MODEL = process.env.GEMINI_EMBED_MODEL ?? "gemini-embedding-001";
const CHAT_MODEL = process.env.GEMINI_CHAT_MODEL ?? "gemini-2.5-flash-lite";

function sseFormat(event: string, data: unknown) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function extractLastUserMessage(messages: { role: string; content: string }[]) {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i]?.role === "user") return messages[i]!.content;
  }
  return messages[messages.length - 1]!.content;
}

function saveConversationLog(
  sb: ReturnType<typeof createSupabaseAdmin>,
  conversationId: string | undefined,
  messages: { role: string; content: string }[],
  assistantAnswer: string,
  req: Request
) {
  if (!conversationId) return;

  const userAgent = req.headers.get("user-agent") ?? undefined;
  const referer = req.headers.get("referer") ?? undefined;
  const fullMessages = [...messages, { role: "assistant", content: assistantAnswer }];

  after(async () => {
    try {
      await sb.from("chat_conversations").upsert(
        {
          client_conversation_id: conversationId,
          user_agent: userAgent,
          page_path: referer,
          updated_at: new Date().toISOString(),
          metadata: {
            messages: fullMessages,
            message_count: fullMessages.length,
            last_activity: new Date().toISOString(),
          },
        },
        { onConflict: "client_conversation_id" }
      );
    } catch (e: unknown) {
      console.error("[chat/route] Failed to log conversation:", (e as Error)?.message);
    }
  });
}

export async function POST(req: Request) {
  const parsed = ChatRequestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { messages, conversation_id } = parsed.data;
  const userText = extractLastUserMessage(messages);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return Response.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });

  const genAI = new GoogleGenerativeAI(apiKey);

  // Embed câu hỏi — dùng đúng model đã xác nhận
  let queryEmbedding: number[];
  try {
    const embedModel = genAI.getGenerativeModel({ model: EMBED_MODEL });
    const embedResp = await embedModel.embedContent(userText);
    queryEmbedding = embedResp.embedding.values;
  } catch (error: unknown) {
    const e = error as Error;
    console.error("[chat/route] Embedding failed:", e?.message);
    return Response.json({ error: "Embedding failed", detail: e?.message }, { status: 500 });
  }

  const sb = createSupabaseAdmin();

  // 1) Check Semantic QA Cache first
  try {
    const { data: cacheMatches } = await sb.rpc("match_qa_cache", {
      query_embedding: queryEmbedding,
      match_threshold: 0.92,
      match_count: 1,
    });

    if (cacheMatches && cacheMatches.length > 0 && cacheMatches[0]?.answer) {
      const cached = cacheMatches[0];

      saveConversationLog(sb, conversation_id, messages, cached.answer, req);

      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(sseFormat("meta", { ok: true, cached: true })));
          controller.enqueue(encoder.encode(sseFormat("token", { text: cached.answer })));
          controller.enqueue(encoder.encode(sseFormat("done", {})));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }
  } catch (error: unknown) {
    console.warn("[chat/route] QA Cache check skipped:", (error as Error)?.message);
  }

  // 2) Cache miss — Retrieve context từ Supabase RAG
  const { data: matches, error: matchError } = await sb.rpc("match_documents", {
    query_embedding: queryEmbedding,
    match_count: 10,
  });
  if (matchError) {
    console.error("[chat/route] Supabase RPC error:", matchError);
    return Response.json({ error: "Supabase retrieval failed" }, { status: 500 });
  }

  const context = (matches ?? [])
    .map((m: { metadata?: unknown; similarity?: number; content?: string }) => {
      const source = (m.metadata as Record<string, string>)?.source ?? "";
      return `---\n[Source: ${source}] (similarity: ${m.similarity})\n${m.content}\n`;
    })
    .join("\n");

  const model = genAI.getGenerativeModel({ model: CHAT_MODEL });
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      const abort = () => {
        try {
          controller.close();
        } catch {}
      };
      req.signal.addEventListener("abort", abort);

      controller.enqueue(encoder.encode(sseFormat("meta", { ok: true })));

      // Build conversation history (last 6 turns max) for multi-turn context
      const recentHistory = messages
        .slice(-6)
        .map((m) => `${m.role === "user" ? "USER" : "ASSISTANT"}: ${m.content}`)
        .join("\n");

      const prompt = `${SYSTEM_PROMPT}\n\nCONTEXT:\n${context || "(không có dữ liệu)"}\n\nLỊCH SỬ HỘI THOẠI:\n${recentHistory || "(cuộc trò chuyện mới)"}\n\nCÂU HỎI HIỆN TẠI:\n${userText}\n\nTRẢ LỜI:`;

      let fullAnswer = "";
      try {
        const result = await model.generateContentStream(prompt);
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            fullAnswer += text;
            controller.enqueue(encoder.encode(sseFormat("token", { text })));
          }
        }
        controller.enqueue(encoder.encode(sseFormat("done", {})));
        controller.close();

        // Always save conversation log
        if (fullAnswer.trim().length > 0) {
          saveConversationLog(sb, conversation_id, messages, fullAnswer, req);
        }

        // Only cache successful answers (skip "no info" responses)
        const isNoInfo = fullAnswer.includes(NO_INFO_MARKER);
        if (fullAnswer.trim().length > 10 && !isNoInfo) {
          void sb
            .from("qa_cache")
            .insert({
              question: userText,
              answer: fullAnswer,
              embedding: queryEmbedding,
            })
            .then(({ error }) => {
              if (error) console.error("[chat/route] Failed to save to qa_cache:", error.message);
            });
        }

        // Save unanswered questions for admin review
        if (isNoInfo) {
          void sb
            .from("unanswered_questions")
            .insert({
              question: userText,
              embedding: queryEmbedding,
              conversation_id: conversation_id ?? null,
              page_path: req.headers.get("referer") ?? null,
            })
            .then(({ error }) => {
              if (error) console.error("[chat/route] Failed to save unanswered:", error.message);
            });
        }
      } catch (error: unknown) {
        const e = error as Error;
        console.error("[chat/route] Generation failed:", e?.message);
        controller.enqueue(
          encoder.encode(sseFormat("error", { message: e?.message ?? "Generation failed" }))
        );
        controller.close();
      } finally {
        req.signal.removeEventListener("abort", abort);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
