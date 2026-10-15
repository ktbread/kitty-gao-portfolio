// Tiny storage layer for the guestbook, on a private Vercel Blob store.
// wall.json holds the notes everyone can see; pending/ and private/ hold one file per note.
import { put, get, del, list, BlobPreconditionFailedError } from "@vercel/blob";

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

export async function remove(path) {
  if (useMem()) { mem.delete(path); return; }
  await del(path);
}

export async function listJSON(prefix) {
  if (useMem()) {
    return [...mem.keys()].filter((k) => k.startsWith(prefix)).map((k) => JSON.parse(mem.get(k).body));
  }
  const out = [];
  let cursor;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    for (const b of page.blobs) {
      const { data } = await readJSON(b.pathname, null);
      if (data) out.push(data);
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return out.sort((a, b) => b.at - a.at);
}

// Read-modify-write on wall.json with a retry if two people write at once
export async function updateWall(change) {
  for (let i = 0; i < 4; i++) {
    const { data, etag } = await readJSON(WALL, { notes: [] });
    const next = change(data) || data;
    try {
      await writeJSON(WALL, next, etag || undefined);
      return next;
    } catch (err) {
      if (!(err instanceof BlobPreconditionFailedError) || i === 3) throw err;
    }
  }
}

export const WALL_LIMIT = 80;
export const WALL = "wall-v2.json"; // started fresh on Oct 14, 2026

export function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
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

// What visitors are allowed to see about a note
export function publicNote(n) {
  return { id: n.id, text: n.text, name: n.name, color: n.color, doodle: n.doodle || null, stamp: n.stamp || null, hearts: n.hearts || 0, at: n.at };
}
