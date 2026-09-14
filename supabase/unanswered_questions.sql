-- Bảng lưu câu hỏi mà chatbot chưa trả lời được
-- Quản trị viên có thể vào Supabase Dashboard để xem và bổ sung câu trả lời (cột `answer`).
-- Khi cột `answer` được cập nhật, trigger sẽ tự động:
--   1. Copy sang bảng `qa_cache` để chatbot sử dụng cho các lần hỏi tiếp theo.
--   2. Đánh dấu trạng thái `status = 'answered'`.

-- 1) Tạo bảng unanswered_questions
create table if not exists public.unanswered_questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text null,                            -- Admin điền vào đây
  embedding vector(3072) not null,
  status text not null default 'pending',      -- 'pending' | 'answered' | 'ignored'
  conversation_id text null,
  page_path text null,
  created_at timestamptz not null default now(),
  answered_at timestamptz null
);

create index if not exists unanswered_status_idx on public.unanswered_questions (status);
create index if not exists unanswered_created_at_idx on public.unanswered_questions (created_at desc);

-- 2) Trigger: Khi admin cập nhật answer → tự động copy sang qa_cache
create or replace function public.on_unanswered_answered()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Chỉ xử lý khi answer được cập nhật từ NULL sang có giá trị
  if NEW.answer is not null and (OLD.answer is null or OLD.answer <> NEW.answer) then
    NEW.status := 'answered';
    NEW.answered_at := now();

    -- Insert vào qa_cache (nếu chưa có câu hỏi tương tự)
    insert into public.qa_cache (question, answer, embedding)
    values (NEW.question, NEW.answer, NEW.embedding)
    on conflict do nothing;
  end if;

  return NEW;
end;
$$;

-- Gắn trigger
drop trigger if exists trg_unanswered_answered on public.unanswered_questions;
create trigger trg_unanswered_answered
  before update on public.unanswered_questions
  for each row
  execute function public.on_unanswered_answered();

-- 3) View tiện lợi để admin xem nhanh các câu chưa trả lời
create or replace view public.v_pending_questions as
  select
    id,
    question,
    conversation_id,
    page_path,
    created_at
  from public.unanswered_questions
  where status = 'pending'
  order by created_at desc;
