# Hướng dẫn chạy Ingestion (RAG Documents → Supabase pgvector)

File chính: `scripts/ingestion/ingest.py`  
Mục tiêu: khi có **tài liệu mới** (URL/PDF/DOCX) thì chạy lại ingestion để **chunk → embed (Gemini) → insert vào bảng `documents`** trên Supabase.

> Lưu ý: UI chatbot vẫn lưu lịch sử hội thoại ở `localStorage`. Supabase `documents` chỉ lưu **knowledge base** để RAG truy hồi.

---

## 1) Chuẩn bị (1 lần)

### 1.1 Chạy SQL schema trên Supabase

Trong Supabase SQL Editor, chạy:

- `supabase/schema.sql`

(Tuỳ chọn) Nếu bạn muốn bật RLS cho log hội thoại insert-only (không select):

- `supabase/chat_rls.sql`

### 1.2 Tạo Python venv + cài dependencies

Tại root repo:

```bash
python -m venv .venv
.\.venv\Scripts\activate
pip install -r scripts/ingestion/requirements.txt
```

---

## 2) Cấu hình biến môi trường

Ingestion cần **3 biến** (không public):

- `GEMINI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### Tuỳ chọn A (khuyến nghị): đọc từ file `.env`

Mặc định script sẽ tự đọc file `.env` ở **root repo** (cùng cấp `package.json`). Bạn chỉ cần đặt 3 biến vào `.env`:

```bash
GEMINI_API_KEY=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Nếu `.env` nằm ở nơi khác, dùng thêm cờ `--env-file`:

```bash
python scripts/ingestion/ingest.py --env-file "D:\secrets\techtonic.env" --urls "https://example.com/about"
```

### Tuỳ chọn B: set trực tiếp trên terminal (PowerShell)

Ví dụ PowerShell:

```powershell
$env:GEMINI_API_KEY="YOUR_KEY"
$env:SUPABASE_URL="https://xxxx.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
```

---

## 3) Chạy ingestion khi có tài liệu mới

### 3.1 Nạp từ website (URL)

```bash
python scripts/ingestion/ingest.py --urls "https://example.com/about" "https://example.com/events"
```

### 3.2 Nạp từ file PDF/DOCX

```bash
python scripts/ingestion/ingest.py --files "D:\docs\gioi-thieu-techtonic.pdf" "D:\docs\quy-che.docx"
```

### 3.3 Nạp cả website + file cùng lúc

```bash
python scripts/ingestion/ingest.py --urls "https://example.com/recruitment" --files "D:\docs\faq.docx"
```

---

## 4) Tinh chỉnh chunking / embedding model

Mặc định:

- `--target-tokens 500`
- `--overlap-tokens 50`
- `--embed-model models/text-embedding-004`

Ví dụ:

```bash
python scripts/ingestion/ingest.py --urls "https://example.com/about" --target-tokens 650 --overlap-tokens 80
```

---

## 5) Gợi ý quy trình vận hành (khuyến nghị)

- **Khi thêm/sửa tài liệu**: chạy ingestion lại cho đúng URL/file vừa thay đổi.
- **Theo lịch** (tuỳ chọn): chạy hàng tuần/hàng tháng để đồng bộ nội dung website.

> Lưu ý hiện tại script đang **insert** vào `documents` (chưa “dedupe/upsert” theo `source_id + chunk_index`).  
> Nếu bạn muốn chạy nhiều lần mà không bị trùng dữ liệu, bước tiếp theo nên thêm unique key + upsert (on conflict) theo `metadata.source_id` và `metadata.chunk_index` (hoặc dùng `content_hash`).
