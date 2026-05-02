-- TechTonic Chatbot RAG schema (Supabase Postgres)
-- Run this in Supabase SQL Editor (or via migrations if you use Supabase CLI later).

-- 1) Extensions
create extension if not exists vector;

-- 2) Documents table (RAG chunks)
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector(3072) not null,
  created_at timestamptz not null default now()
);

-- Helpful indexes for filtering/debugging (vector index can be added later once you have enough rows)
create index if not exists documents_created_at_idx on public.documents (created_at desc);
create index if not exists documents_metadata_gin_idx on public.documents using gin (metadata);

-- 3) Similarity search RPC
create or replace function public.match_documents(
  query_embedding vector(3072),
  match_count int default 5
) returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql
stable
as $$
  select
    d.id,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) as similarity
  from public.documents d
  order by d.embedding <=> query_embedding
  limit match_count;
$$;

-- 4) Leads table (email/facebook collection)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text null,
  facebook text null,
  consent boolean not null default false,
  conversation_id text null,
  last_question text null,
  page_path text null,
  utm jsonb null
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_conversation_id_idx on public.leads (conversation_id);

-- Notes:
-- - This repo uses server-only API routes for Supabase writes, so you can keep RLS enabled/disabled
--   depending on your preference. If you enable RLS, create policies that allow only service role
--   (or a trusted auth role) to insert/select.
