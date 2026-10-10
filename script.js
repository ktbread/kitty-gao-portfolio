/* =========================================================
   EDIT YOUR CONTENT HERE
   - Put poster images in assets/posters/ and set `image`
     (and `draft` if you have an early version).
   - Hotspot x / y are percentages from the top-left of the poster.
   ========================================================= */

const POSTERS = [
  {
    title: "[POSTER 1 TITLE]",
    kicker: "[CLIENT / CLUB · YEAR]",
    image: "",            // e.g. "assets/posters/poster-1.jpg"
    draft: "",            // e.g. "assets/posters/poster-1-draft.jpg"
    goal: "[What was this poster meant to do?]",
    audience: "[Who was it for?]",
    result: "[What happened — sign-ups, attendance, reach?]",
    hotspots: [
      { x: 50, y: 22, title: "[Design choice]", text: "[Why you made it — e.g. Von Restorff effect: the one blue element is the one people remember.]" },
      { x: 30, y: 60, title: "[Design choice]", text: "[Why you made it — e.g. Z-pattern layout guides the eye to the call to action.]" },
      { x: 70, y: 85, title: "[Design choice]", text: "[Why you made it.]" }
    ]
  },
  {
    title: "[POSTER 2 TITLE]",
    kicker: "[CLIENT / CLUB · YEAR]",
    image: "",
    draft: "",
    goal: "[What was this poster meant to do?]",
    audience: "[Who was it for?]",
    result: "[What happened?]",
    hotspots: [
      { x: 40, y: 30, title: "[Design choice]", text: "[Why you made it.]" },
      { x: 65, y: 70, title: "[Design choice]", text: "[Why you made it.]" }
    ]
  },
  {
    title: "[POSTER 3 TITLE]",
    kicker: "[CLIENT / CLUB · YEAR]",
    image: "",
    draft: "",
    goal: "[What was this poster meant to do?]",
    audience: "[Who was it for?]",
    result: "[What happened?]",
    hotspots: [
      { x: 50, y: 40, title: "[Design choice]", text: "[Why you made it.]" }
    ]
  },
  {
    title: "[POSTER 4 TITLE]",
    kicker: "[CLIENT / CLUB · YEAR]",
    image: "",
    draft: "",
    goal: "[What was this poster meant to do?]",
    audience: "[Who was it for?]",
    result: "[What happened?]",
    hotspots: [
      { x: 35, y: 25, title: "[Design choice]", text: "[Why you made it.]" },
      { x: 60, y: 80, title: "[Design choice]", text: "[Why you made it.]" }
    ]
  }
];

const POSTS = [
  {
    tag: "[TOPIC]",
    title: "[BLOG POST TITLE 1]",
    long: "[Two or three sentences introducing the post.]",
    short: "[The 30-second version: one sentence takeaway.]",
    url: "#"
  },
  {
    tag: "[TOPIC]",
    title: "[BLOG POST TITLE 2]",
    long: "[Two or three sentences introducing the post.]",
    short: "[The 30-second version: one sentence takeaway.]",
    url: "#"
  },
  {
    tag: "[TOPIC]",
    title: "[BLOG POST TITLE 3]",
    long: "[Two or three sentences introducing the post.]",
    short: "[The 30-second version: one sentence takeaway.]",
    url: "#"
  }
];

/* ========================================================= */

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "text") node.textContent = value;
    else if (key === "class") node.className = value;
    else node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) if (child) node.append(child);
  return node;
}

function posterVisual(src, label) {
  if (src) return el("img", { src, alt: label, loading: "lazy" });
  return el("div", { class: "placeholder", text: label });
}

/* Poster grid */
const grid = document.getElementById("poster-grid");
POSTERS.forEach((poster, i) => {
  const card = el("button", { class: "poster-card", type: "button", "aria-haspopup": "dialog" }, [
    el("div", { class: "poster-thumb" }, posterVisual(poster.image, poster.title)),
    el("h3", { text: poster.title }),
    el("p", { text: poster.kicker })
  ]);
  card.addEventListener("click", () => openCase(i));
  grid.append(card);
});

/* Case-study dialog */
const dialog = document.getElementById("case");
const stage = document.getElementById("poster-stage");
const finalLayer = document.getElementById("poster-final");
const draftLayer = document.getElementById("poster-draft");
const hotspotLayer = document.getElementById("hotspots");
const note = document.getElementById("case-note");
const squint = document.getElementById("squint");
const draftControl = document.getElementById("draft-control");
const draftRange = document.getElementById("draft-range");
const DEFAULT_NOTE = "<strong>Tap a numbered dot</strong>to see why that part of the poster looks the way it does.";

function openCase(i) {
  const p = POSTERS[i];
  document.getElementById("case-kicker").textContent = p.kicker;
  document.getElementById("case-title").textContent = p.title;

  const facts = document.getElementById("case-facts");
  facts.replaceChildren();
  [["Goal", p.goal], ["Audience", p.audience], ["Result", p.result]].forEach(([k, v]) => {
    facts.append(el("div", {}, [el("dt", { text: k }), el("dd", { text: v })]));
  });

  finalLayer.replaceChildren(posterVisual(p.image, p.title));
  draftLayer.replaceChildren(p.draft ? posterVisual(p.draft, p.title + " — first draft") : "");
  draftControl.hidden = !p.draft;
  draftRange.value = 100;
  updateDraft();

  squint.checked = false;
  stage.classList.remove("squint");

  hotspotLayer.replaceChildren();
  p.hotspots.forEach((h, n) => {
    const dot = el("button", {
      class: "hotspot", type: "button", "aria-pressed": "false",
      "aria-label": `Design note ${n + 1}: ${h.title}`, text: String(n + 1)
    });
    dot.style.left = h.x + "%";
    dot.style.top = h.y + "%";
    dot.addEventListener("click", () => {
      hotspotLayer.querySelectorAll(".hotspot").forEach(d => d.setAttribute("aria-pressed", "false"));
      dot.setAttribute("aria-pressed", "true");
      note.replaceChildren(el("strong", { text: h.title }), document.createTextNode(h.text));
    });
    hotspotLayer.append(dot);
  });
  note.innerHTML = DEFAULT_NOTE;

  dialog.showModal();
}

function updateDraft() {
  // slider at 0 = full draft, 100 = full final
  const shown = 100 - Number(draftRange.value);
  draftLayer.style.clipPath = `inset(0 ${100 - shown}% 0 0)`;
}

draftRange.addEventListener("input", updateDraft);
squint.addEventListener("change", () => stage.classList.toggle("squint", squint.checked));
dialog.addEventListener("click", (e) => {
  if (e.target === dialog || e.target.hasAttribute("data-close")) dialog.close();
});

/* Writing samples */
const writing = document.getElementById("writing-grid");
POSTS.forEach((post) => {
  const body = el("p", { class: "post-body", text: post.long });
  let brief = false;
  const toggle = el("button", { class: "link-btn", type: "button", "aria-pressed": "false", text: "30-second version" });
  toggle.addEventListener("click", () => {
    brief = !brief;
    body.textContent = brief ? post.short : post.long;
    toggle.textContent = brief ? "Full intro" : "30-second version";
    toggle.setAttribute("aria-pressed", String(brief));
  });
  writing.append(el("article", { class: "post" }, [
    el("p", { class: "tag", text: post.tag }),
    el("h3", { text: post.title }),
    body,
    el("div", { class: "post-actions" }, [
      toggle,
      el("a", { href: post.url, target: "_blank", rel: "noopener", text: "Read on the blog ↗" })
    ])
  ]));
});
