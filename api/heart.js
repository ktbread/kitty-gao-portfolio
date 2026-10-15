import { updateWall, body, send } from "./_store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });
  try {
    const { id, undo } = await body(req);
    let hearts = null;
    await updateWall((w) => {
      const n = w.notes.find((x) => x.id === id);
      if (n) { n.hearts = Math.max(0, (n.hearts || 0) + (undo ? -1 : 1)); hearts = n.hearts; }
    });
    if (hearts === null) return send(res, 404, { error: "Note not found." });
    return send(res, 200, { ok: true, hearts });
  } catch (err) {
    console.error(err);
    return send(res, 500, { error: "Couldn’t save that heart." });
  }
}
