// "Where did your eye go first?" taps on the Autumn Picnic poster.
// GET returns every tap so far; POST adds one. Taps are stored as whole-number percents.
import { readJSON, update, body, send } from "./_store.js";

const FILE = "attention-autumn-picnic.json";
const LIMIT = 3000; // keep the newest taps only

const pct = (v) => (typeof v === "number" && isFinite(v) && v >= 0 && v <= 100 ? Math.round(v) : null);

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { data } = await readJSON(FILE, { taps: [] });
      return send(res, 200, { taps: data.taps }, { "Cache-Control": "no-store" });
    }
    if (req.method === "POST") {
      const b = await body(req);
      const x = pct(b.x), y = pct(b.y);
      if (x === null || y === null) return send(res, 400, { error: "bad tap" });
      const next = await update(FILE, { taps: [] }, (d) => {
        d.taps.push([x, y]);
        if (d.taps.length > LIMIT) d.taps = d.taps.slice(-LIMIT);
        return d;
      });
      return send(res, 200, { taps: next.taps });
    }
    res.setHeader("Allow", "GET, POST");
    return send(res, 405, { error: "method" });
  } catch (err) {
    console.error(err);
    return send(res, 500, { error: "server" });
  }
}
