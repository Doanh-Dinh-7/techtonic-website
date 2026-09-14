-- Chatbot conversation logging with RLS (insert-only from client).
-- UI history should remain in localStorage; client must NOT be able to SELECT from DB.
--
-- How to use:
-- 1) Run supabase/schema.sql first
-- 2) Run this file in Supabase SQL Editor

-- Conversations (1 row per session, storing full messages JSON in metadata)
create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client_conversation_id text not null unique,
  page_path text null,
  user_agent text null,
  metadata jsonb not null default '{}'::jsonb
);

-- Messages/events
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_conversation_id text not null,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  page_path text null,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists chat_messages_created_at_idx on public.chat_messages (created_at desc);
create index if not exists chat_messages_conversation_id_idx on public.chat_messages (client_conversation_id);

-- Enable RLS
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;

-- IMPORTANT: Do NOT create SELECT policies.
-- With RLS enabled and no SELECT policy, all selects from anon/authenticated are denied by default.

-- Allow INSERT only (anon + authenticated).
create policy "chat_conversations_insert_only"
on public.chat_conversations
for insert
to anon, authenticated
with check (
  length(client_conversation_id) between 8 and 128
);

create policy "chat_messages_insert_only"
on public.chat_messages
for insert
to anon, authenticated
with check (
  length(client_conversation_id) between 8 and 128
  and length(content) between 1 and 4000
);

-- Explicitly do not allow updates/deletes from client roles
create policy "chat_conversations_no_update"
on public.chat_conversations
for update
to anon, authenticated
using (false);

create policy "chat_conversations_no_delete"
on public.chat_conversations
for delete
to anon, authenticated
using (false);

create policy "chat_messages_no_update"
on public.chat_messages
for update
to anon, authenticated
using (false);

create policy "chat_messages_no_delete"
on public.chat_messages
for delete
to anon, authenticated
using (false);

-- Notes:
-- - This is "insert-only" logging, not a conversation store for UI.
-- - For anti-spam, consider adding edge rate limiting at /api endpoints, or a CAPTCHA gate.
