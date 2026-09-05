import { z } from "zod";

import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const LeadSchema = z.object({
  email: z.string().email().optional().or(z.literal("")),
  facebook: z.string().optional().or(z.literal("")),
  consent: z.boolean(),
  conversation_id: z.string().optional(),
  last_question: z.string().optional(),
  page_path: z.string().optional(),
  utm: z.record(z.any()).optional(),
});

function normalizeOptionalString(v: string | undefined) {
  const s = (v ?? "").trim();
  return s.length ? s : null;
}

export async function POST(req: Request) {
  const parsed = LeadSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const body = parsed.data;
  if (!body.consent) {
    return Response.json({ error: "Consent is required" }, { status: 400 });
  }

  const email = normalizeOptionalString(body.email);
  const facebook = normalizeOptionalString(body.facebook);
  if (!email && !facebook) {
    return Response.json({ error: "Provide at least email or Facebook" }, { status: 400 });
  }

  const sb = createSupabaseAdmin();
  const { error } = await sb.from("leads").insert({
    email,
    facebook,
    consent: true,
    conversation_id: normalizeOptionalString(body.conversation_id),
    last_question: normalizeOptionalString(body.last_question),
    page_path: normalizeOptionalString(body.page_path),
    utm: body.utm ?? null,
  });

  if (error) {
    return Response.json({ error: "Insert failed" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
