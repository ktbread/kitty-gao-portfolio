// Kitty's moderation desk: approve or reject wall notes, read and delete private ones.
import { readJSON, remove, listJSON, updateWall, body, send, WALL_LIMIT, WALL } from "./_store.js";

function authed(req) {
  const key = process.env.GUESTBOOK_ADMIN_KEY;
  return Boolean(key) && req.headers["x-admin-key"] === key;
}

export default async function handler(req, res) {
  if (!authed(req)) return send(res, 401, { error: "Wrong password." });
  try {
    if (req.method === "GET") {
      const [priv, wall] = await Promise.all([listJSON("private/"), readJSON(WALL, { notes: [] })]);
      return send(res, 200, { private: priv, wall: wall.data.notes }, { "Cache-Control": "no-store" });
    }
    if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });
    const { action, id } = await body(req);
    if (!/^[a-z0-9]+$/.test(String(id || ""))) return send(res, 400, { error: "Bad id." });
    if (action === "approve") {
      const { data } = await readJSON(`pending/${id}.json`, null);
      if (!data) return send(res, 404, { error: "Already handled." });
      await updateWall((w) => { if (!w.notes.some((n) => n.id === id)) w.notes.unshift(data); w.notes = w.notes.slice(0, WALL_LIMIT * 2); });
      await remove(`pending/${id}.json`);
    } else if (action === "reject") {
      await remove(`pending/${id}.json`);
    } else if (action === "delete-private") {
      await remove(`private/${id}.json`);
    } else if (action === "unpin") {
      await updateWall((w) => { w.notes = w.notes.filter((n) => n.id !== id); });
    } else {
      return send(res, 400, { error: "Unknown action." });
    }
    return send(res, 200, { ok: true });
  } catch (err) {
    console.error(err);
    return send(res, 500, { error: "Something went wrong." });
  }
}
