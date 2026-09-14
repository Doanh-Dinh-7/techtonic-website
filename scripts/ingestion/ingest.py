import argparse
import hashlib
import os
import re
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import urlparse

from bs4 import BeautifulSoup, Tag
from docx import Document as DocxDocument
from pypdf import PdfReader
from supabase import create_client

import google.generativeai as genai


# ---------------------------------------------------------------------------
# Text utilities
# ---------------------------------------------------------------------------

def approx_tokenize(text: str) -> List[str]:
    text = normalize_text(text)
    if not text:
        return []
    words = re.findall(r"\S+", text)
    if len(words) >= 20:
        return words
    return list(text)


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def normalize_text(text: str) -> str:
    text = text.replace("\u00a0", " ")
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]{2,}", " ", text)
    return text.strip()


def token_len(text: str) -> int:
    return len(approx_tokenize(text))


def chunk_text(text: str, *, target_tokens: int = 400, overlap_tokens: int = 50) -> List[str]:
    """
    Chunk theo paragraph trước, fallback sang token window nếu paragraph quá dài.
    Đảm bảo mỗi chunk có đủ ngữ nghĩa.
    """
    text = normalize_text(text)
    if not text:
        return []

    # Tách theo paragraph (2 newline)
    paragraphs = [p.strip() for p in re.split(r'\n\n+', text) if p.strip()]

    chunks: List[str] = []
    current: List[str] = []
    current_tokens = 0

    for para in paragraphs:
        para_tokens = token_len(para)

        # Paragraph quá dài → token-window chunk riêng
        if para_tokens > target_tokens:
            # Flush current buffer trước
            if current:
                chunks.append("\n\n".join(current))
                current, current_tokens = [], 0
            # Token-window chunk paragraph dài
            words = approx_tokenize(para)
            step = max(1, target_tokens - overlap_tokens)
            for i in range(0, len(words), step):
                chunk = " ".join(words[i:i + target_tokens]).strip()
                if chunk:
                    chunks.append(chunk)
            continue

        # Paragraph vừa → gộp vào buffer
        if current_tokens + para_tokens > target_tokens and current:
            chunks.append("\n\n".join(current))
            # Giữ overlap: lấy paragraph cuối làm overlap
            overlap = [current[-1]] if current else []
            current = overlap + [para]
            current_tokens = token_len("\n\n".join(current))
        else:
            current.append(para)
            current_tokens += para_tokens

    if current:
        chunks.append("\n\n".join(current))

    # Lọc chunk quá ngắn (< 20 words) — thường là nav/footer noise
    chunks = [c for c in chunks if token_len(c) >= 20]
    return chunks


def sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


# ---------------------------------------------------------------------------
# Env loader
# ---------------------------------------------------------------------------

def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


# ---------------------------------------------------------------------------
# HTML → clean text (full-page, không dùng heading-based)
# ---------------------------------------------------------------------------

# Tags chứa noise, không có giá trị ngữ nghĩa
_NOISE_TAGS = {"script", "style", "noscript", "nav", "footer", "head",
               "meta", "link", "button", "svg", "img"}

# Block tags dùng để thêm newline
_BLOCK_TAGS = {"p", "div", "section", "article", "li", "h1", "h2", "h3",
               "h4", "h5", "h6", "tr", "br", "blockquote", "pre"}


def extract_text_from_html(html: str) -> str:
    """
    Lấy toàn bộ visible text từ HTML, giữ cấu trúc paragraph.
    Bỏ nav/footer/script. Thêm newline tại block elements.
    """
    soup = BeautifulSoup(html, "html.parser")

    # Xóa noise tags
    for tag in soup(_NOISE_TAGS):
        tag.decompose()

    # Ưu tiên <main>, fallback <body>
    root = soup.find("main") or soup.body or soup

    def _walk(node) -> str:
        if isinstance(node, str):
            return node
        if not isinstance(node, Tag):
            return ""
        if node.name in _NOISE_TAGS:
            return ""

        children_text = "".join(_walk(c) for c in node.children)

        if node.name in _BLOCK_TAGS:
            return f"\n{children_text}\n"
        return children_text

    raw = _walk(root)

    # Normalize whitespace nhưng giữ paragraph breaks
    lines = []
    for line in raw.splitlines():
        line = re.sub(r"[ \t]+", " ", line).strip()
        if line:
            lines.append(line)

    # Gộp lines thành paragraphs (dòng trống = paragraph break)
    text = "\n".join(lines)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return normalize_text(text)


# ---------------------------------------------------------------------------
# File parsers
# ---------------------------------------------------------------------------

def extract_text_from_pdf(path: Path) -> str:
    reader = PdfReader(str(path))
    parts: List[str] = []
    for page in reader.pages:
        parts.append(page.extract_text() or "")
    return normalize_text("\n\n".join(parts))


def extract_text_from_docx(path: Path) -> str:
    doc = DocxDocument(str(path))
    parts: List[str] = [p.text for p in doc.paragraphs if p.text]
    return normalize_text("\n".join(parts))


# ---------------------------------------------------------------------------
# Web crawler (Playwright)
# ---------------------------------------------------------------------------

def crawl_site(start_url: str, *, max_pages: int = 30, timeout_s: float = 30.0) -> Dict[str, str]:
    """
    Crawl toàn bộ internal links từ start_url dùng Playwright.
    Trả về dict {url: html_content}.
    """
    from playwright.sync_api import sync_playwright

    parsed_base = urlparse(start_url)
    visited: set = set()
    queue: list = [start_url]
    results: Dict[str, str] = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        while queue and len(visited) < max_pages:
            url = queue.pop(0)
            if url in visited:
                continue
            visited.add(url)

            print(f"  Crawling: {url}")
            try:
                page = browser.new_page()
                page.goto(url, wait_until="networkidle", timeout=int(timeout_s * 1000))
                page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                page.wait_for_timeout(1500)

                html = page.content()
                results[url] = html

                links = page.eval_on_selector_all("a[href]", "els => els.map(e => e.href)")
                for link in links:
                    parsed = urlparse(link)
                    clean = f"{parsed.scheme}://{parsed.netloc}{parsed.path}".rstrip("/")
                    if (
                        parsed.netloc == parsed_base.netloc
                        and clean not in visited
                        and clean not in queue
                        and not any(clean.endswith(ext) for ext in [".pdf", ".png", ".jpg", ".svg", ".ico"])
                    ):
                        queue.append(clean)

                page.close()
            except Exception as e:
                print(f"  ⚠ Skipped {url}: {e}")

        browser.close()

    print(f"  → Crawled {len(results)} pages total")
    return results


# ---------------------------------------------------------------------------
# SourceDoc + loaders
# ---------------------------------------------------------------------------

@dataclass
class SourceDoc:
    source_id: str
    content: str
    metadata: Dict[str, Any]


def load_website_urls(urls: List[str], max_pages: int = 30) -> List[SourceDoc]:
    docs: List[SourceDoc] = []
    for start_url in urls:
        print(f"  Starting crawl from {start_url} (max {max_pages} pages) ...")
        pages = crawl_site(start_url, max_pages=max_pages)

        for page_url, html in pages.items():
            # Dùng full-page text extraction
            content = extract_text_from_html(html)

            if not content or token_len(content) < 20:
                print(f"    ⚠ Skipped {page_url} (too short: {token_len(content)} tokens)")
                continue

            print(f"    ✓ {page_url} → {token_len(content)} tokens")
            docs.append(
                SourceDoc(
                    source_id=f"url:{page_url}",
                    content=content,
                    metadata={
                        "source": "web",
                        "source_url": page_url,
                        "fetched_at": _now_iso(),
                        "chunk_strategy": "full_page_paragraph",
                    },
                )
            )
    return docs


def load_files(paths: List[Path]) -> List[SourceDoc]:
    docs: List[SourceDoc] = []
    for p in paths:
        if not p.exists():
            raise FileNotFoundError(str(p))
        ext = p.suffix.lower()
        if ext == ".pdf":
            content = extract_text_from_pdf(p)
            doc_type = "pdf"
        elif ext == ".docx":
            content = extract_text_from_docx(p)
            doc_type = "docx"
        elif ext in (".md", ".txt"):
            content = normalize_text(p.read_text(encoding="utf-8"))
            doc_type = ext.lstrip(".")
        else:
            raise ValueError(f"Unsupported file type: {p}")

        print(f"  Loaded {p.name} ({doc_type}), {token_len(content)} tokens")
        docs.append(
            SourceDoc(
                source_id=f"file:{p.as_posix()}",
                content=content,
                metadata={
                    "source": "file",
                    "doc_type": doc_type,
                    "file_path": str(p),
                    "ingested_at": _now_iso(),
                },
            )
        )
    return docs


# ---------------------------------------------------------------------------
# Embedding — gemini-embedding-001 → 3072 dims
# ---------------------------------------------------------------------------

EMBED_MODEL_DEFAULT = "models/gemini-embedding-001"  # 3072 dims


def gemini_embed(texts: List[str], *, model: str = EMBED_MODEL_DEFAULT) -> List[List[float]]:
    """Trả về embedding vectors (3072 dims) cho mỗi text."""
    vectors: List[List[float]] = []
    total = len(texts)
    for i, t in enumerate(texts, 1):
        if i % 10 == 0 or i == total:
            print(f"  Embedding {i}/{total} chunks ...")
        resp = genai.embed_content(model=model, content=t)
        vectors.append(resp["embedding"])
    return vectors


# ---------------------------------------------------------------------------
# Row builder + upsert
# ---------------------------------------------------------------------------

def build_rows(doc: SourceDoc, *, target_tokens: int, overlap_tokens: int) -> List[Dict[str, Any]]:
    chunks = chunk_text(doc.content, target_tokens=target_tokens, overlap_tokens=overlap_tokens)
    rows: List[Dict[str, Any]] = []
    for i, chunk in enumerate(chunks):
        metadata = dict(doc.metadata)
        metadata.update({
            "source_id": doc.source_id,
            "chunk_index": i,
            "content_hash": sha256(chunk),
            "token_count": token_len(chunk),
        })
        rows.append({"content": chunk, "metadata": metadata})
    return rows


def upsert_documents(rows: List[Dict[str, Any]], *, supabase_url: str, supabase_key: str) -> None:
    sb = create_client(supabase_url, supabase_key)
    batch_size = 100
    total = len(rows)
    for i in range(0, total, batch_size):
        batch = rows[i: i + batch_size]
        sb.table("documents").insert(batch).execute()
        print(f"  Upserted {min(i + batch_size, total)}/{total} rows ...")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description="Ingest TechTonic data into Supabase pgvector (documents table)."
    )
    parser.add_argument("--urls", nargs="*", default=[], help="Website URLs to crawl and ingest.")
    parser.add_argument("--max-pages", type=int, default=30, help="Max internal pages to crawl per URL (default: 30).")
    parser.add_argument("--files", nargs="*", default=[], help="PDF/DOCX/MD/TXT files to ingest.")
    parser.add_argument("--target-tokens", type=int, default=400,
                        help="Target tokens per chunk (default: 400).")
    parser.add_argument("--overlap-tokens", type=int, default=50,
                        help="Overlap tokens between chunks (default: 50).")
    parser.add_argument("--embed-model", type=str, default=EMBED_MODEL_DEFAULT,
                        help="Gemini embedding model (default: gemini-embedding-001, 3072 dims).")
    parser.add_argument("--env-file", type=str,
                        default=str(Path(__file__).resolve().parents[2] / ".env"),
                        help="Path to .env file.")

    args = parser.parse_args()
    load_env_file(Path(args.env_file))

    gemini_api_key = os.environ.get("GEMINI_API_KEY")
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

    if not gemini_api_key:
        print("ERROR: Missing GEMINI_API_KEY", file=sys.stderr); return 2
    if not supabase_url or not supabase_service_key:
        print("ERROR: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY", file=sys.stderr); return 2

    genai.configure(api_key=gemini_api_key)
    print(f"Using embedding model : {args.embed_model}")
    print(f"Chunk target/overlap  : {args.target_tokens}/{args.overlap_tokens} tokens")

    docs: List[SourceDoc] = []
    if args.urls:
        print(f"\n[1/4] Crawling {len(args.urls)} URL(s) ...")
        docs.extend(load_website_urls(args.urls, max_pages=args.max_pages))
    if args.files:
        print(f"\n[1/4] Loading {len(args.files)} file(s) ...")
        docs.extend(load_files([Path(p) for p in args.files]))

    if not docs:
        print("Nothing to ingest. Provide --urls and/or --files.", file=sys.stderr); return 2

    print(f"\n[2/4] Chunking {len(docs)} document(s) ...")
    all_rows: List[Dict[str, Any]] = []
    for doc in docs:
        rows = build_rows(doc, target_tokens=args.target_tokens, overlap_tokens=args.overlap_tokens)
        print(f"  {doc.source_id} → {len(rows)} chunks")
        all_rows.extend(rows)

    if not all_rows:
        print("No chunks produced. Check source content.", file=sys.stderr); return 2

    print(f"\n[3/4] Embedding {len(all_rows)} chunks ...")
    contents = [r["content"] for r in all_rows]
    vectors = gemini_embed(contents, model=args.embed_model)
    for r, v in zip(all_rows, vectors):
        r["embedding"] = v

    print(f"\n[4/4] Upserting {len(all_rows)} rows into Supabase ...")
    upsert_documents(all_rows, supabase_url=supabase_url, supabase_key=supabase_service_key)

    print(f"\n✓ Done! Inserted {len(all_rows)} chunks into documents table.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())