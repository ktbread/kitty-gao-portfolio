/* Guestbook: a wall of notes, one-tap stamps, and private notes that only Kitty reads */
const GB_ICON = {"heart": "<path d=\"M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z\"/>", "heartFill": "<path d=\"M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z\"/>", "paw": "<path d=\"M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z\"/>", "sparkle": "<path d=\"M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z\"/>"};
(() => {
  const wall = document.getElementById("gb-wall");
  if (!wall) return;
  const empty = document.getElementById("gb-empty");
  const flash = document.getElementById("gb-flash");
  const dialog = document.getElementById("gb-dialog");
  const form = document.getElementById("gb-form");
  const text = document.getElementById("gb-text");
  const count = document.getElementById("gb-count");
  const hint = document.getElementById("gb-hint");
  const send = document.getElementById("gb-send");
  const errorEl = document.getElementById("gb-error");
  const canvas = document.getElementById("gb-canvas");
  const svg = (k, s = 16) => `<svg class="icon" viewBox="0 0 256 256" width="${s}" height="${s}" aria-hidden="true" fill="currentColor">${GB_ICON[k]}</svg>`;
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  let notes = [];
  let openedAt = 0;
  let drew = false;

  function noteEl(n, mine) {
    const fig = document.createElement("figure");
    fig.className = `gb-note c-${n.color || "paper"}${mine ? " is-pending" : ""}${n.stamp ? " is-stamp" : ""}`;
    fig.style.setProperty("--r", `${(((parseInt(n.id.slice(-3), 36) || 7) % 7) - 3) * 0.7}deg`);
    if (mine) {
      const cat = document.createElement("img");
      cat.className = "gb-sitcat"; cat.src = "assets/icon.svg"; cat.alt = ""; cat.width = 44; cat.height = 44;
      fig.append(cat);
      const tag = document.createElement("span");
      tag.className = "gb-tag"; tag.textContent = "Yours, pinning soon";
      fig.append(tag);
    }
    if (n.stamp) {
      const s = document.createElement("span");
      s.className = "gb-stamp-ic"; s.innerHTML = svg(n.stamp === "day" ? "sparkle" : "paw", 22);
      fig.append(s);
    }
    if (n.doodle) {
      const img = document.createElement("img");
      img.className = "gb-doodle"; img.src = n.doodle; img.alt = "A doodle left with this note"; img.loading = "lazy";
      fig.append(img);
    }
    const q = document.createElement("blockquote");
    q.textContent = n.text;
    fig.append(q);
    const cap = document.createElement("figcaption");
    const who = document.createElement("span");
    who.textContent = n.stamp ? "a visitor, by stamp" : (n.name || "a visitor");
    cap.append(who);
    if (!mine) {
      const hearted = store.get("gb-hearts", []).includes(n.id);
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "gb-heart";
      btn.setAttribute("aria-pressed", String(hearted));
      btn.setAttribute("aria-label", `Heart this note${n.hearts ? `, ${n.hearts} so far` : ""}`);
      btn.innerHTML = `${svg(hearted ? "heartFill" : "heart", 16)}<span>${n.hearts || ""}</span>`;
      btn.addEventListener("click", () => toggleHeart(n, btn));
      cap.append(btn);
    }
    fig.append(cap);
    return fig;
  }

  function render() {
    wall.replaceChildren(...notes.slice(0, 12).map((n) => noteEl(n, false)));
    empty.hidden = wall.children.length > 0;
    const moreBtn = document.getElementById("gb-more-notes");
    moreBtn.hidden = wall.children.length <= 4 || wall.classList.contains("all");
    moreBtn.onclick = () => { wall.classList.add("all"); moreBtn.hidden = true; };
  }

  async function load() {
    try {
      const r = await fetch("/api/notes", { headers: { Accept: "application/json" } });
      if (!r.ok) throw new Error();
      notes = (await r.json()).notes || [];
    } catch { notes = []; }
    render();
  }

  function say(msg) {
    flash.textContent = msg; flash.hidden = false;
    clearTimeout(say.t); say.t = setTimeout(() => { flash.hidden = true; }, 5000);
  }

  async function toggleHeart(n, btn) {
    const set = new Set(store.get("gb-hearts", []));
    const undo = set.has(n.id);
    undo ? set.delete(n.id) : set.add(n.id);
    store.set("gb-hearts", [...set]);
    n.hearts = Math.max(0, (n.hearts || 0) + (undo ? -1 : 1));
    btn.setAttribute("aria-pressed", String(!undo));
    btn.innerHTML = `${svg(undo ? "heart" : "heartFill", 16)}<span>${n.hearts || ""}</span>`;
    btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop");
    try { await fetch("/api/heart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: n.id, undo }) }); } catch {}
  }

  // One-tap stamps
  document.querySelectorAll(".gb-stamp[data-stamp]").forEach((b) => {
    b.addEventListener("click", async () => {
      const used = store.get("gb-stamps", []);
      if (used.includes(b.dataset.stamp)) { say("You already left that stamp. Thank you!"); return; }
      b.disabled = true;
      try {
        const r = await fetch("/api/notes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ stamp: b.dataset.stamp, elapsed: 9999 }) });
        const d = await r.json();
        if (!r.ok) throw new Error(d.error);
        store.set("gb-stamps", [...used, b.dataset.stamp]);
        notes.unshift(d.note); render();
        say("Stamped. Thank you!");
      } catch (e) { say(e.message || "That didn’t go through. Try again?"); }
      b.disabled = false;
    });
  });
  document.querySelectorAll(".gb-stamp[data-ask]").forEach((b) => {
    b.addEventListener("click", () => openComposer({
      private: true,
      text: "Let’s chat!",
      email: true
    }));
  });

  // Composer
  function setMore(key, on) {
    const btn = form.querySelector(`[data-add="${key}"]`);
    const panel = form.querySelector(`[data-more="${key}"]`);
    panel.hidden = !on; btn.setAttribute("aria-expanded", String(on)); btn.classList.toggle("on", on);
  }
  function syncWho() {
    const priv = form.elements.visibility.value === "private";
    hint.textContent = priv ? "Private notes come only to me. No name needed." : "Wall notes are pinned right away for everyone to see.";
    send.textContent = priv ? "Send to Kitty" : "Pin it";
    const emailBtn = form.querySelector('[data-add="email"]');
    emailBtn.hidden = !priv;
    if (!priv) setMore("email", false);
  }
  form.querySelectorAll('input[name="visibility"]').forEach((r) => r.addEventListener("change", syncWho));
  form.querySelectorAll("[data-add]").forEach((btn) => btn.addEventListener("click", () => {
    const on = btn.getAttribute("aria-expanded") !== "true";
    setMore(btn.dataset.add, on);
    if (on) form.querySelector(`[data-more="${btn.dataset.add}"] input, [data-more="${btn.dataset.add}"] canvas`)?.focus();
  }));
  text.addEventListener("input", () => { count.textContent = `${text.value.length} / 280`; });

  function openComposer(opts = {}) {
    form.reset(); clearPad(); errorEl.hidden = true;
    ["name", "color", "doodle", "email"].forEach((k) => setMore(k, false));
    if (opts.private) form.querySelector('input[name="visibility"][value="private"]').checked = true;
    syncWho();
    if (opts.text) text.value = opts.text;
    if (opts.email) setMore("email", true);
    count.textContent = `${text.value.length} / 280`;
    openedAt = Date.now();
    dialog.showModal();
    text.focus();
    text.setSelectionRange(text.value.length, text.value.length);
  }
  document.getElementById("gb-write").addEventListener("click", () => openComposer());
  document.getElementById("gb-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.hidden = true;
    if (!text.value.trim()) { errorEl.textContent = "Write a little something first."; errorEl.hidden = false; text.focus(); return; }
    const payload = {
      text: text.value,
      visibility: form.elements.visibility.value,
      name: form.elements.name.value,
      color: form.elements.color.value,
      email: form.elements.email.value,
      website: form.elements.website.value,
      doodle: drew && !form.querySelector('[data-more="doodle"]').hidden ? exportPad() : null,
      elapsed: Date.now() - openedAt
    };
    send.disabled = true;
    try {
      const r = await fetch("/api/notes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "That didn’t go through. Try again?");
      dialog.close();
      if (d.status === "private") say("Sent. Only I will see it, thank you!");
      else {
        if (d.note) { notes.unshift(d.note); store.set("gb-mine-ids", [d.note.id, ...store.get("gb-mine-ids", [])]); }
        render();
        say("Pinned! Thank you for the note.");
        wall.firstElementChild?.classList.add("just-pinned");
      }
    } catch (err) {
      errorEl.textContent = err.message; errorEl.hidden = false;
    }
    send.disabled = false;
  });

  // Doodle pad
  const ctx = canvas.getContext("2d");
  function clearPad() { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height); drew = false; }
  function exportPad() {
    const out = document.createElement("canvas");
    out.width = 280; out.height = 110;
    const o = out.getContext("2d");
    o.drawImage(canvas, 0, 0, out.width, out.height);
    return out.toDataURL("image/png");
  }
  let drawing = false, last = null;
  const pos = (e) => { const r = canvas.getBoundingClientRect(); return [(e.clientX - r.left) * canvas.width / r.width, (e.clientY - r.top) * canvas.height / r.height]; };
  canvas.addEventListener("pointerdown", (e) => { drawing = true; last = pos(e); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", (e) => {
    if (!drawing) return;
    const p = pos(e);
    ctx.strokeStyle = "#002FA7"; ctx.lineWidth = 6; ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(...last); ctx.lineTo(...p); ctx.stroke();
    last = p; drew = true;
  });
  ["pointerup", "pointercancel"].forEach((t) => canvas.addEventListener(t, () => { drawing = false; }));
  document.getElementById("gb-clear").addEventListener("click", clearPad);
  clearPad();

  load();

  // Arriving from the homepage cat: open the note box, or point at the stamps
  const params = new URLSearchParams(location.search);
  if (params.has("write")) setTimeout(() => openComposer(), 300);
  if (params.has("stamp")) {
    const row = document.querySelector(".gb-stamps");
    row.scrollIntoView({ block: "center" });
    row.classList.add("nudge");
  }
})();

/* Phones: the menu folds into one button */
(() => {
  const toggle = document.getElementById("nav-toggle");
  const header = document.querySelector(".site-header");
  if (!toggle || !header) return;
  const set = (open) => {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector("span").textContent = open ? "Close" : "Menu";
  };
  toggle.addEventListener("click", () => set(!header.classList.contains("menu-open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
})();

/* Over-scrolling past the end shows the footer's colour; past the top, the page's cream */
(() => {
  const root = document.documentElement;
  const sync = () => root.classList.toggle("near-end", window.scrollY > (root.scrollHeight - window.innerHeight) / 2);
  window.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  sync();
})();
