// Tiny storage layer on a private Vercel Blob store (used by the attention map).
import { put, get, BlobPreconditionFailedError } from "@vercel/blob";

const ACCESS = { access: "private" };
const mem = globalThis.__gbMem || (globalThis.__gbMem = new Map()); // local tests only

const useMem = () => process.env.GUESTBOOK_MOCK === "1";

export async function readJSON(path, fallback) {
  if (useMem()) {
    const hit = mem.get(path);
    return hit ? { data: JSON.parse(hit.body), etag: hit.etag } : { data: fallback, etag: null };
  }
  const res = await get(path, { ...ACCESS, useCache: false });
  if (!res || res.statusCode !== 200) return { data: fallback, etag: null };
  const text = await new Response(res.stream).text();
  return { data: JSON.parse(text), etag: res.blob.etag };
}

export async function writeJSON(path, data, etag) {
  const body = JSON.stringify(data);
  if (useMem()) {
    const hit = mem.get(path);
    if (etag !== undefined && (hit ? hit.etag : null) !== etag) throw new BlobPreconditionFailedError();
    mem.set(path, { body, etag: String(Math.random()) });
    return;
  }
  const opts = { ...ACCESS, contentType: "application/json", addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60 };
  if (etag) opts.ifMatch = etag;
  await put(path, body, opts);
}

// Read-modify-write on one JSON file, retrying if two people write at once
export async function update(path, fallback, change) {
  for (let i = 0; i < 4; i++) {
    const { data, etag } = await readJSON(path, fallback);
    const next = change(data) || data;
    try {
      await writeJSON(path, next, etag || undefined);
      return next;
    } catch (err) {
      if (!(err instanceof BlobPreconditionFailedError) || i === 3) throw err;
    }
  }
}

export async function body(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch { return {}; } }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); } catch { return {}; }
}

export function send(res, status, data, headers = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
  res.end(JSON.stringify(data));
}
