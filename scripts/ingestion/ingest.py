import argparse
import hashlib
import os
import re
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import httpx
from bs4 import BeautifulSoup, Tag
from docx import Document as DocxDocument
from pypdf import PdfReader
from supabase import create_client

import google.generativeai as genai


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


def chunk_text(text: str, *, target_tokens: int = 500, overlap_tokens: int = 50) -> List[str]:
    text = normalize_text(text)
    if not text:
        return []

    ids = approx_tokenize(text)
    chunks: List[str] = []
    start = 0
    step = max(1, target_tokens - overlap_tokens)
    while start < len(ids):
        end = min(len(ids), start + target_tokens)
        if ids and isinstance(ids[0], str) and len(ids[0]) == 1 and len(ids) > 0:
            chunk = "".join(ids[start:end]).strip()
        else:
            chunk = " ".join(ids[start:end]).strip()
        if chunk:
            chunks.append(chunk)
        start += step
    return chunks


def sha256(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def fetch_html(url: str, *, timeout_s: float = 20.0) -> str:
    headers = {"User-Agent": "TechTonicBotIngest/1.0"}
    with httpx.Client(timeout=timeout_s, follow_redirects=True, headers=headers) as client:
        r = client.get(url)
        r.raise_for_status()
        return r.text


def _is_visible_text_tag(tag: Tag) -> bool:
    if not isinstance(tag, Tag):
        return False
    if tag.name in {"script", "style", "noscript"}:
        return False
    return True


def _collect_text_until_next_heading(start: Tag) -> str:
    parts: List[str] = []
    for sib in start.next_siblings:
        if isinstance(sib, Tag) and sib.name in {"h1", "h2", "h3"}:
            break
        if isinstance(sib, Tag) and _is_visible_text_tag(sib):
            t = sib.get_text("\n", strip=True)
            if t:
                parts.append(t)
    return normalize_text("\n".join(parts))


def extract_sections_from_html(html: str) -> List[Tuple[str, str]]:
    soup = BeautifulSoup(html, "html.parser")

    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    main = soup.find("main")
    root = main if main is not None else soup.body or soup

    headings = root.find_all(["h1", "h2", "h3"])
    if not headings:
        return [("Document", normalize_text(root.get_text("\n")))]

    current_h1: Optional[str] = None
    current_h2: Optional[str] = None
    sections: List[Tuple[str, str]] = []

    for h in headings:
        title = normalize_text(h.get_text(" ", strip=True))
        if not title:
            continue

        if h.name == "h1":
            current_h1, current_h2 = title, None
        elif h.name == "h2":
            current_h2 = title

        path_parts = [p for p in [current_h1, current_h2, title if h.name == "h3" else None] if p]
        section_path = " > ".join(path_parts) if path_parts else title
        section_text = _collect_text_until_next_heading(h)
        if section_text:
            sections.append((section_path, section_text))

    if not sections:
        return [("Document", normalize_text(root.get_text("\n")))]

    return sections


def extract_text_from_pdf(path: Path) -> str:
    reader = PdfReader(str(path))
    parts: List[str] = []
    for page in reader.pages:
        parts.append(page.extract_text() or "")
    return normalize_text("\n\n".join(parts))


def extract_text_from_docx(path: Path) -> str:
    doc = DocxDocument(str(path))
    parts: List[str] = []
    for p in doc.paragraphs:
        if p.text:
            parts.append(p.text)
    return normalize_text("\n".join(parts))


@dataclass
class SourceDoc:
    source_id: str
    content: str
    metadata: Dict[str, Any]


def load_website_urls(urls: List[str]) -> List[SourceDoc]:
    docs: List[SourceDoc] = []
    for url in urls:
        print(f"  Fetching {url} ...")
        html = fetch_html(url)
        sections = extract_sections_from_html(html)
        content = normalize_text("\n\n".join([f"# {p}\n{s}" for p, s in sections]))
        print(f"  → {len(sections)} sections extracted")
        docs.append(
            SourceDoc(
                source_id=f"url:{url}",
                content=content,
                metadata={
                    "source": "web",
                    "source_url": url,
                    "fetched_at": _now_iso(),
                    "chunk_strategy": "heading_based",
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
        elif ext in (".docx",):
            content = extract_text_from_docx(p)
            doc_type = "docx"
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
# Embedding — sử dụng models/gemini-embedding-001 (3072 dims, stable)
# Các model available đã xác nhận:
#   models/gemini-embedding-001       ← dùng model này (stable)
#   models/gemini-embedding-2-preview
#   models/gemini-embedding-2
# ---------------------------------------------------------------------------
EMBED_MODEL_DEFAULT = "models/gemini-embedding-001" # 3072 dims


def gemini_embed(texts: List[str], *, model: str = EMBED_MODEL_DEFAULT) -> List[List[float]]:
    """
    Trả về list embedding vectors cho mỗi text.
    Model gemini-embedding-001 trả về vector 768 chiều.
    """
    vectors: List[List[float]] = []
    total = len(texts)
    for i, t in enumerate(texts, 1):
        if i % 10 == 0 or i == total:
            print(f"  Embedding {i}/{total} chunks ...")
        resp = genai.embed_content(model=model, content=t)
        vectors.append(resp["embedding"])
    return vectors


def build_rows(doc: SourceDoc, *, target_tokens: int, overlap_tokens: int) -> List[Dict[str, Any]]:
    chunks = chunk_text(doc.content, target_tokens=target_tokens, overlap_tokens=overlap_tokens)
    rows: List[Dict[str, Any]] = []
    for i, chunk in enumerate(chunks):
        content_hash = sha256(chunk)
        metadata = dict(doc.metadata)
        metadata.update(
            {
                "source_id": doc.source_id,
                "chunk_index": i,
                "content_hash": content_hash,
                "token_count": token_len(chunk),
            }
        )
        rows.append(
            {
                "content": chunk,
                "metadata": metadata,
            }
        )
    return rows


def upsert_documents(rows: List[Dict[str, Any]], *, supabase_url: str, supabase_key: str) -> None:
    sb = create_client(supabase_url, supabase_key)
    batch_size = 100
    total = len(rows)
    for i in range(0, total, batch_size):
        batch = rows[i : i + batch_size]
        sb.table("documents").insert(batch).execute()
        print(f"  Upserted {min(i + batch_size, total)}/{total} rows ...")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Ingest TechTonic data into Supabase pgvector (documents table)."
    )
    parser.add_argument("--urls", nargs="*", default=[], help="List of website URLs to ingest.")
    parser.add_argument("--files", nargs="*", default=[], help="List of PDF/DOCX files to ingest.")
    parser.add_argument("--target-tokens", type=int, default=500)
    parser.add_argument("--overlap-tokens", type=int, default=50)
    parser.add_argument(
        "--embed-model",
        type=str,
        default=EMBED_MODEL_DEFAULT,
        help=(
            "Gemini embedding model. Available: "
            "models/gemini-embedding-001 (default, stable, 768d), "
            "models/gemini-embedding-2-preview, "
            "models/gemini-embedding-2"
        ),
    )
    parser.add_argument(
        "--env-file",
        type=str,
        default=str(Path(__file__).resolve().parents[2] / ".env"),
        help="Path to .env file (default: repo root .env).",
    )

    args = parser.parse_args()

    load_env_file(Path(args.env_file))

    gemini_api_key = os.environ.get("GEMINI_API_KEY")
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

    if not gemini_api_key:
        print("ERROR: Missing GEMINI_API_KEY in environment.", file=sys.stderr)
        return 2
    if not supabase_url or not supabase_service_key:
        print("ERROR: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.", file=sys.stderr)
        return 2

    genai.configure(api_key=gemini_api_key)

    print(f"Using embedding model: {args.embed_model}")

    docs: List[SourceDoc] = []
    if args.urls:
        print(f"\n[1/4] Fetching {len(args.urls)} URL(s) ...")
        docs.extend(load_website_urls(args.urls))
    if args.files:
        print(f"\n[1/4] Loading {len(args.files)} file(s) ...")
        docs.extend(load_files([Path(p) for p in args.files]))

    if not docs:
        print("Nothing to ingest. Provide --urls and/or --files.", file=sys.stderr)
        return 2

    print(f"\n[2/4] Chunking {len(docs)} document(s) ...")
    all_rows: List[Dict[str, Any]] = []
    for doc in docs:
        rows = build_rows(doc, target_tokens=args.target_tokens, overlap_tokens=args.overlap_tokens)
        print(f"  {doc.source_id} → {len(rows)} chunks")
        all_rows.extend(rows)

    print(f"\n[3/4] Embedding {len(all_rows)} chunks ...")
    contents = [r["content"] for r in all_rows]
    vectors = gemini_embed(contents, model=args.embed_model)
    for r, v in zip(all_rows, vectors):
        r["embedding"] = v

    print(f"\n[4/4] Upserting {len(all_rows)} rows into Supabase ...")
    upsert_documents(all_rows, supabase_url=supabase_url, supabase_key=supabase_service_key)

    print(f"\nDone! Inserted {len(all_rows)} chunks into documents table.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())