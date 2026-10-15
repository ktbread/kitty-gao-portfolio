// A simple bad-word filter for the guestbook. It catches common swears and slurs,
// including spaced-out, stretched or number-swapped spellings (f u c k, fuuuck, sh1t, b!tch).
const WHOLE = ["ass", "asses", "arse", "dick", "dicks", "cock", "cocks", "cum", "fag", "fags", "tit", "tits", "hoe", "hoes", "twat", "wank", "piss", "spic", "chink", "gook", "kike", "coon", "nazi", "rape", "raped", "rapist", "porn", "dyke", "tranny", "kys", "pedo", "stfu", "wtf"];
const INSIDE = ["fuck", "fuk", "fck", "shit", "bitch", "cunt", "nigg", "faggot", "retard", "whore", "slut", "bastard", "asshole", "dickhead", "motherf", "pussy", "dildo", "blowjob", "handjob", "jerkoff", "cumshot", "killyourself"];
const SAFE = ["scunthorpe", "shiitake", "therapist", "therapists", "cockburn", "cockpit", "peacock", "hancock", "passionate", "assassin", "bassist", "classic", "grasshopper"];
const SWAPS = { "0": "o", "1": "i", "!": "i", "|": "i", "3": "e", "4": "a", "@": "a", "5": "s", "$": "s", "7": "t", "8": "b", "9": "g", "+": "t" };
const squash = (w) => w.replace(/(.)\1+/g, "$1");

function words(text) {
  const lower = String(text || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[01!|3@45$789+]/g, (c) => SWAPS[c] || c);
  const raw = lower.split(/[^a-z]+/).filter(Boolean);
  // Re-join letters typed one at a time ("f u c k" becomes "fuck")
  const out = [];
  let run = "";
  for (const w of raw) {
    if (w.length === 1) { run += w; continue; }
    if (run.length > 1) out.push(run);
    else if (run) out.push(run);
    run = ""; out.push(w);
  }
  if (run) out.push(run);
  return out;
}

export function isRude(...fields) {
  for (const field of fields) {
    for (const w of words(field)) {
      if (SAFE.includes(w)) continue;
      const s = squash(w);
      if (WHOLE.includes(w) || WHOLE.includes(s)) return true;
      if (INSIDE.some((bad) => w.includes(bad) || s.includes(squash(bad)))) return true;
    }
  }
  return false;
}
