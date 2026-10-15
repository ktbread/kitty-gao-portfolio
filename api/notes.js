import { isRude } from "./_filter.js";
import { readJSON, writeJSON, updateWall, newId, body, send, publicNote, WALL_LIMIT, WALL } from "./_store.js";

const COLORS = ["paper", "sky", "stone", "ink"];
const STAMPS = { posters: "Loved the posters", day: "Made my day" };
const clean = (s, max) => String(s || "").replace(/\s+/g, " ").trim().slice(0, max);

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { data } = await readJSON(WALL, { notes: [] });
      return send(res, 200, { notes: data.notes.slice(0, WALL_LIMIT).map(publicNote) }, { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=120" });
    }
    if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });

    const b = await body(req);
    if (b.website) return send(res, 200, { ok: true, status: "pinned" }); // honeypot: pretend it worked
    if (typeof b.elapsed === "number" && b.elapsed < 1500) return send(res, 429, { error: "Too fast. Take a breath and try again." });

    // One-tap stamps go straight onto the wall: the text is fixed, so there is nothing to moderate
    if (b.stamp) {
      if (!STAMPS[b.stamp]) return send(res, 400, { error: "Unknown stamp." });
      const note = { id: newId(), text: STAMPS[b.stamp], name: "", color: "paper", stamp: b.stamp, hearts: 0, at: Date.now() };
      await updateWall((w) => { w.notes.unshift(note); w.notes = w.notes.slice(0, WALL_LIMIT * 2); });
      return send(res, 200, { ok: true, status: "pinned", note: publicNote(note) });
    }

    const text = clean(b.text, 280);
    if (!text) return send(res, 400, { error: "Write a little something first." });
    const name = clean(b.name, 40);
    const color = COLORS.includes(b.color) ? b.color : "paper";
    let doodle = null;
    if (typeof b.doodle === "string" && b.doodle) {
      if (!b.doodle.startsWith("data:image/png;base64,") || b.doodle.length > 40000) return send(res, 400, { error: "That doodle is too big. Try a simpler one." });
      doodle = b.doodle;
    }
    if (isRude(text, name)) return send(res, 400, { error: "Let’s keep the board friendly. Could you reword that?" });
    const isPrivate = b.visibility === "private";
    const email = isPrivate ? clean(b.email, 120) : "";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return send(res, 400, { error: "That email doesn’t look quite right." });

    const note = { id: newId(), text, name, color, doodle, hearts: 0, at: Date.now() };
    if (isPrivate) {
      await writeJSON(`private/${note.id}.json`, { ...note, email });
      return send(res, 200, { ok: true, status: "private" });
    }
    // Wall notes pin straight away; Kitty can take any of them down from /admin.html
    await updateWall((w) => { w.notes.unshift(note); w.notes = w.notes.slice(0, WALL_LIMIT * 2); });
    return send(res, 200, { ok: true, status: "pinned", note: publicNote(note) });
  } catch (err) {
    console.error(err);
    return send(res, 500, { error: "Something went wrong. Please try again in a minute." });
  }
}
