/* A refresh always starts at the very top (links with #section still work on a fresh visit) */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const navEntry = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
const isReload = navEntry ? navEntry.type === "reload" : false;
if (isReload || !location.hash) {
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  window.scrollTo(0, 0);
  window.addEventListener("load", () => window.scrollTo(0, 0));
}

/* =========================================================
   EDIT YOUR CONTENT HERE
   - Put poster images in assets/posters/ and set `image`
     (and `draft` if you have an early version).
   - Hotspot x / y are percentages from the top-left of the poster.
   ========================================================= */

const POSTERS = [
  {
    title: "Color Quest: Autumn Picnic",
    kicker: "EmpowerCHANGE Western · Event poster · 2026",
    image: "assets/posters/autumn-picnic.jpg",
    draft: "",
    goal: "Get students out to a free Sunday picnic with games and prizes.",
    audience: "Western students looking for a low-pressure way to make friends.",
    result: "[ADD RESULT, e.g. number of people who came]",
    hotspots: [
      { x: 50, y: 12, title: "A date that feels like a doodle", text: "The date is handwritten between two bold words, so it reads as part of the fun instead of a line of admin." },
      { x: 30, y: 25, title: "Details at a glance", text: "Time, place and the free-food line sit in one tidy block, so nobody has to hunt for the basics." },
      { x: 62, y: 55, title: "A path for the eye", text: "The wavy edge pulls your eye from the details down into the picnic basket." },
      { x: 76, y: 85, title: "The name you leave with", text: "“Autumn Picnic” is the last thing you see, so it’s the name that sticks." }
    ]
  },
  {
    title: "Puppy Therapy",
    kicker: "解聆人 EmpowerCHANGE · Event poster · 2023",
    image: "assets/posters/puppy-therapy.jpg",
    draft: "",
    goal: "Promote a stress-relief puppy session during exam season.",
    audience: "All Western students, especially anyone feeling exam stress.",
    result: "[ADD RESULT]",
    hotspots: [
      { x: 50, y: 22, title: "A headline that bounces", text: "Uneven, playful letters set a relaxed mood before you read a single detail." },
      { x: 10, y: 55, title: "Every dog looks inward", text: "The dogs around the edges face the centre, quietly pointing your eyes to the date and place." },
      { x: 50, y: 58, title: "Calm in the middle", text: "The details get plenty of empty space, so they stay easy to read despite all the puppies." }
    ]
  },
  {
    title: "Club Recruitment",
    kicker: "EmpowerCHANGE Western · Recruitment poster · 2025-26",
    image: "assets/posters/club-recruitment-zh.jpg",
    ratio: "4 / 5",
    draft: "",
    translation: "“Club recruitment”: 解聆人 (EmpowerCHANGE) Western is hiring Admin, Events, Marketing and Listening Program executives. Contact on WeChat or Xiaohongshu; applications open year-round.",
    goal: "Recruit new executives for a peer-listening mental health club.",
    audience: "Chinese-speaking students at Western, reached on WeChat and Xiaohongshu.",
    result: "40+ applicants.",
    highlight: "40+ applicants",
    hotspots: [
      { x: 50, y: 26, title: "One big, warm word", text: "The headline is huge and sunny yellow, so it reads from across a feed in a split second." },
      { x: 50, y: 52, title: "A hug that makes a heart", text: "The club is about listening and support, so the picture says “you belong here” before any words do." },
      { x: 28, y: 85, title: "Roles in English", text: "Job titles stay in English, the language members use for them on campus and on resumes." },
      { x: 72, y: 82, title: "Where the audience already is", text: "Contact points are WeChat and Xiaohongshu, the apps this audience actually opens." }
    ]
  },
  {
    title: "Now Hiring: Consultants",
    kicker: "Viridian Management Consulting · Instagram carousel · 2026",
    image: "assets/posters/viridian-hiring-1.jpg",
    pages: [
      "assets/posters/viridian-hiring-1.jpg",
      "assets/posters/viridian-hiring-2.jpg",
      "assets/posters/viridian-hiring-3.jpg"
    ],
    ratio: "4 / 5",
    draft: "",
    goal: "Drive applications for the 2026-27 consultant cohort.",
    audience: "Canadian undergraduates interested in consulting.",
    result: "Part of the recruitment rollout that brought in 60+ qualified applicants.",
    hotspots: [
      { page: 1, x: 30, y: 42, title: "A line that leads in", text: "The thin mint rule and small caps set up the headline like a magazine label." },
      { page: 1, x: 36, y: 50, title: "Serif italic, on purpose", text: "An editorial italic makes a student organization feel established and premium." },
      { page: 1, x: 85, y: 92, title: "Swipe cue", text: "The dots tell you there’s more, which nudges people to swipe through to the roles." },
      { page: 2, x: 8, y: 46, title: "Easy to skim", text: "Two short lists under bold italic headings, so the whole role reads in a few seconds." },
      { page: 3, x: 50, y: 52, title: "One job per slide", text: "The last slide only asks you to act: a big “Apply now” and the deadline, nothing else." }
    ]
  }
];

const POSTS = [
  {
    tag: "World Mental Health Day",
    title: "Heard, not just spoken",
    long: "Today is World Mental Health Day. Why lived experience counts even when it doesn’t fit a textbook definition, and why being heard matters more than being invited to speak.",
    short: "Real support isn’t an awareness post. It’s funding, active listening, and attention that lasts past one day.",
    url: "https://medium.com/@slightlyburnt/heard-not-just-spoken-d53e521a1b76"
  },
  {
    tag: "Burnout",
    title: "You’re not lazy. You’re burnt out.",
    long: "You sleep eight hours. You wake up exhausted. What burnout actually is, how it builds while you keep telling yourself you’re fine, and why recovery means doing less.",
    short: "Burnout isn’t laziness. It’s exhaustion, cynicism and feeling ineffective, and rest alone won’t fix it.",
    url: "https://medium.com/@slightlyburnt/youre-not-lazy-you-re-burnt-out-473b2beb0050"
  },
  {
    tag: "Neuroscience",
    title: "Rejection doesn’t just hurt your feelings. It hurts your brain.",
    long: "Remember that feeling in your chest when you’re the last one picked for a team? Why rejection lights up the same parts of the brain as physical pain.",
    short: "Your brain treats rejection like pain. Read it as information about fit, not proof you failed.",
    url: "https://medium.com/@slightlyburnt/rejection-doesnt-just-hurt-your-feelings-it-hurts-your-brain-8920b331d2b8"
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

/* Poster index: titles on the left, the active one previews on the right */
const list = document.getElementById("poster-list");
const preview = document.getElementById("poster-preview");
const previewImgs = POSTERS.map((poster, i) => {
  const img = el("img", { src: poster.image, alt: "", loading: i ? "lazy" : "eager" });
  if (i === 0) img.classList.add("on");
  preview.append(img);
  return img;
});
function setPreview(i) {
  previewImgs.forEach((img, j) => img.classList.toggle("on", i === j));
  list.querySelectorAll(".poster-row").forEach((row, j) => row.classList.toggle("active", i === j));
}
POSTERS.forEach((poster, i) => {
  const [org, type, year] = poster.kicker.split(" · ");
  const pages = poster.pages && poster.pages.length > 1 ? `${poster.pages.length} slides` : "";
  const meta = el("span", { class: "row-meta" }, [document.createTextNode(`${type} for ${org}`)]);
  if (poster.highlight) meta.append(document.createTextNode(", "), el("b", { text: poster.highlight }));
  else if (pages) meta.append(document.createTextNode(", " + pages));
  const row = el("button", { class: "poster-row" + (i === 0 ? " active" : ""), type: "button", "aria-haspopup": "dialog" }, [
    el("span", { class: "row-thumb" }, [el("img", { src: poster.image, alt: "", loading: "lazy" })]),
    el("span", { class: "row-title", text: poster.title }),
    el("span", { class: "row-year", text: year }),
    meta
  ]);
  row.setAttribute("aria-label", `${poster.title}, ${type}, ${year}. Open case study`);
  row.addEventListener("mouseenter", () => setPreview(i));
  row.addEventListener("focus", () => setPreview(i));
  row.addEventListener("click", () => openCase(i));
  list.append(el("li", {}, [row]));
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
  const [kOrg, kType, kYear] = p.kicker.split(" · ");
  document.getElementById("case-kicker").textContent = `${kType} for ${kOrg}, ${kYear}`;
  document.getElementById("case-title").textContent = p.title;

  const facts = document.getElementById("case-facts");
  facts.replaceChildren();
  const rows = [["Goal", p.goal], ["Audience", p.audience], ["Result", p.result]];
  if (p.translation) rows.unshift(["What it says", p.translation]);
  rows.forEach(([k, v]) => {
    facts.append(el("div", {}, [el("dt", { text: k }), el("dd", { text: v })]));
  });

  stage.style.aspectRatio = p.ratio || "3 / 4";
  currentPoster = p;
  casePage = 1;
  finalLayer.dataset.poster = "";
  (p.pages || []).forEach(src => { const pre = new Image(); pre.src = src; });
  pageNav.hidden = !(p.pages && p.pages.length > 1);
  showCasePage();
  draftLayer.replaceChildren(p.draft ? posterVisual(p.draft, p.title + ", first draft") : "");
  draftControl.hidden = !p.draft;
  draftRange.value = 100;
  updateDraft();

  squint.checked = false;
  stage.classList.remove("squint");

  note.innerHTML = DEFAULT_NOTE;

  dialog.showModal();
}

let currentPoster = null;
let casePage = 1;
const pageNav = document.getElementById("page-nav");
function showCasePage() {
  const p = currentPoster;
  const pages = p.pages || [p.image];
  const src = pages[casePage - 1];
  const label = pages.length > 1 ? `${p.title}, page ${casePage} of ${pages.length}` : p.title;
  const samePoster = finalLayer.dataset.poster === p.title && finalLayer.querySelector("img");
  finalLayer.dataset.poster = p.title;
  if (!samePoster || !src) {
    finalLayer.replaceChildren(posterVisual(src, label));
  } else {
    // Cross-fade: the new page fades in on top of the old one, so there's never a blank frame.
    const img = el("img", { src, alt: label, class: "entering" });
    finalLayer.append(img);
    const reveal = () => {
      requestAnimationFrame(() => requestAnimationFrame(() => img.classList.remove("entering")));
      setTimeout(() => { [...finalLayer.children].forEach(c => { if (c !== img) c.remove(); }); }, 420);
    };
    if (img.complete) reveal(); else img.addEventListener("load", reveal, { once: true });
  }
  document.getElementById("page-count").textContent = `${casePage} / ${pages.length}`;
  hotspotLayer.replaceChildren();
  p.hotspots.filter(h => (h.page || 1) === casePage).forEach((h) => {
    const n = p.hotspots.indexOf(h);
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
}
function turnPage(step) {
  const total = (currentPoster.pages || [currentPoster.image]).length;
  casePage = ((casePage - 1 + step + total) % total) + 1;
  showCasePage();
}
document.getElementById("page-prev").addEventListener("click", () => turnPage(-1));
document.getElementById("page-next").addEventListener("click", () => turnPage(1));

function updateDraft() {
  // slider at 0 = full draft, 100 = full final
  const shown = 100 - Number(draftRange.value);
  draftLayer.style.clipPath = `inset(0 ${100 - shown}% 0 0)`;
}

draftRange.addEventListener("input", updateDraft);
const SQUINT_NOTE = "<strong>Squint test</strong>Blurred, the details disappear and only the strongest shapes and colours are left. Whatever you still notice first is what people will notice when they walk past.";
squint.addEventListener("change", () => {
  stage.classList.toggle("squint", squint.checked);
  hotspotLayer.querySelectorAll(".hotspot").forEach(d => d.setAttribute("aria-pressed", "false"));
  note.innerHTML = squint.checked ? SQUINT_NOTE : DEFAULT_NOTE;
});
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
function closeCase() {
  if (!dialog.open || dialog.classList.contains("closing")) return;
  if (reduceMotion.matches) { dialog.close(); return; }
  dialog.classList.add("closing");
  dialog.addEventListener("animationend", () => {
    dialog.classList.remove("closing");
    dialog.close();
  }, { once: true });
}
dialog.addEventListener("click", (e) => {
  if (e.target === dialog || e.target.hasAttribute("data-close")) closeCase();
});
dialog.addEventListener("cancel", (e) => { e.preventDefault(); closeCase(); });

/* Logo: click to wink */
document.querySelectorAll(".brand").forEach((brand) => {
  brand.addEventListener("click", () => {
    brand.classList.add("winking");
    clearTimeout(brand._wink);
    brand._wink = setTimeout(() => brand.classList.remove("winking"), 1200);
  });
});

/* How my logo was made */
const STORY = [
  {
    title: "1. Brainstorm",
    copy: "A page of ideas: KG monograms, a K with an ear, a paw dotting the i, whiskers between my initials, cat heads tested at tiny sizes. The one that stuck was the “o” in Gao with ears and a tail.",
    layout: "sketch",
    images: [["assets/story/brainstorm.svg", "Pencil brainstorm page of KG, kitty and gao logo ideas with cat ears, paws and whiskers"]]
  },
  {
    title: "2. A pencil sketch",
    copy: "Next, a cleaner sketch on graph paper: what if the “o” in Gao could quietly become a cat? Two ears, a curl of a tail, and the rest of my name left alone.",
    layout: "sketch",
    images: [["assets/story/sketch.svg", "Pencil sketch of the kitty gao wordmark with cat ears and a tail on the o"]]
  },
  {
    title: "3. Thirty-odd variations",
    copy: "I explored pointed ears, soft ears, a winking face and a single-line cat, and judged every one both at full size and as a tiny browser-tab icon.",
    layout: "grid4",
    images: [
      ["assets/story/explore-pointy.svg", "Variation with pointed blue ears"],
      ["assets/story/explore-soft.svg", "Variation with soft rounded ears"],
      ["assets/story/explore-face.svg", "Variation with a winking face"],
      ["assets/story/explore-line.svg", "Single-line cat variation with a tail"]
    ]
  },
  {
    title: "4. Spot the problem",
    copy: "Tall, pointed ears on a small round letter read as devil horns, not a cat. Wider, shorter ears and a curled tail changed what the shape was saying.",
    layout: "single",
    images: [["assets/story/explore-pointy.svg", "The pointed-ear version that looked like devil horns"]]
  },
  {
    title: "5. Make it one shape",
    copy: "I rebuilt the cat on the typeface’s own “o”, so its thick-and-thin strokes match the other letters, and let the ears flow into the letter instead of sitting on top.",
    layout: "single",
    images: [["assets/story/joined.svg", "The cat o with ears joined into the letter and a curled tail"]]
  },
  {
    title: "6. The final mark",
    copy: "The finished wordmark, plus the cat on its own as an icon. Hover over the logo at the top of the page. It moves.",
    layout: "pair",
    images: [["assets/logo.svg", "Final kitty gao wordmark"], ["assets/icon.svg", "Cat icon"]]
  }
];

const storyStage = document.getElementById("story-stage");
const storySteps = document.getElementById("story-steps");
const storyRange = document.getElementById("story-range");
const frames = STORY.map((step, i) => {
  const frame = el("div", { class: `story-frame ${step.layout}`, "aria-hidden": "true" },
    step.images.map(([src, alt]) => el("img", { src, alt, loading: "lazy" })));
  storyStage.append(frame);
  const btn = el("button", { type: "button", "aria-label": step.title, text: String(i + 1) });
  btn.addEventListener("click", () => showStep(i));
  storySteps.append(el("li", {}, btn));
  return frame;
});
function showStep(i) {
  frames.forEach((f, n) => {
    f.classList.toggle("active", n === i);
    f.setAttribute("aria-hidden", String(n !== i));
  });
  storySteps.querySelectorAll("button").forEach((b, n) => {
    if (n === i) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
  });
  storyRange.value = i + 1;
  document.getElementById("story-title-step").textContent = STORY[i].title;
  document.getElementById("story-copy").textContent = STORY[i].copy;
}
storyRange.addEventListener("input", () => showStep(Number(storyRange.value) - 1));
showStep(0);

/* A/B test */
const AB_VERDICTS = {
  A: "You picked A.",
  B: "You picked B."
};
document.querySelectorAll(".ab-option").forEach((opt) => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".ab-option").forEach(o => o.setAttribute("aria-pressed", String(o === opt)));
    document.getElementById("ab-verdict").textContent = AB_VERDICTS[opt.dataset.choice];
    document.getElementById("ab-result").hidden = false;
    document.getElementById("ab-prompt").hidden = true;
  });
});

/* Writing-into-design carousel, with a 中文 / EN toggle */
const track = document.getElementById("carousel-track");
const CAROUSEL = {
  zh: [1, 2, 3, 4, 5, 6, 7].map(i => ({
    src: `assets/carousel/mh-pros-${i}.jpg`,
    alt: `Slide ${i} of 7 of a Mandarin carousel comparing mental health professionals in Ontario`,
    pair: i
  })),
  en: [1, 2, 3, 4, 5, 6, 7].map(i => ({
    src: `assets/carousel/mh-pros-en-${i}.jpg`,
    alt: `Slide ${i} of 7 of the English adaptation: Ontario's 4 mental health pros explained`,
    pair: i
  }))
};
let lang = "zh";
let slide = 0;
function buildCarousel() {
  track.style.transition = "none";
  track.replaceChildren(...CAROUSEL[lang].map((s, i) =>
    el("img", { src: s.src, alt: s.alt, loading: i === 0 ? "eager" : "lazy", lang: lang === "zh" ? "zh" : "en" })));
  void track.offsetWidth;
  track.style.transition = "";
}
function goSlide(n) {
  const total = CAROUSEL[lang].length;
  slide = (n + total) % total;
  track.style.transform = `translateX(-${slide * 100}%)`;
  document.getElementById("car-count").textContent = `${slide + 1} / ${total}`;
  const single = total < 2;
  document.getElementById("car-prev").disabled = single;
  document.getElementById("car-next").disabled = single;
}
function setLang(next) {
  if (next === lang) return;
  const pair = CAROUSEL[lang][slide].pair;
  lang = next;
  buildCarousel();
  const match = CAROUSEL[lang].findIndex(s => s.pair === pair);
  track.style.transition = "none";
  goSlide(match >= 0 ? match : 0);
  void track.offsetWidth;
  track.style.transition = "";
  document.querySelectorAll(".lang-btn").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  const title = document.getElementById("feature-title");
  title.textContent = lang === "zh" ? "一文读懂安省四大心理健康专家区别" : "Explained: Ontario’s 4 Mental Health Pros";
  title.setAttribute("lang", lang === "zh" ? "zh" : "en");
  document.getElementById("carousel").classList.add("swapping");
  setTimeout(() => document.getElementById("carousel").classList.remove("swapping"), 350);
}
buildCarousel();
goSlide(0);
document.getElementById("car-prev").addEventListener("click", () => goSlide(slide - 1));
document.getElementById("car-next").addEventListener("click", () => goSlide(slide + 1));
document.querySelectorAll(".lang-btn").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
let touchX = null;
track.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
track.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) goSlide(slide + (dx < 0 ? 1 : -1));
  touchX = null;
});

/* Scroll progress cat */
const scrollFill = document.getElementById("scroll-fill");
const scrollCat = document.getElementById("scroll-cat");
let walkTimer;
function updateScrollCat() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  scrollFill.style.transform = `scaleX(${p})`;
  scrollCat.style.left = `calc(${p * 100}% - ${p * 34}px)`;
  scrollCat.classList.add("walking");
  clearTimeout(walkTimer);
  walkTimer = setTimeout(() => scrollCat.classList.remove("walking"), 180);
}
window.addEventListener("scroll", updateScrollCat, { passive: true });
window.addEventListener("resize", updateScrollCat);
updateScrollCat();

/* Sketchbook drawer: drag the pieces around, click one to see it up close */
const SKETCHES = [
  { thumb: "assets/art/apple-thumb.jpg", full: "assets/art/apple.jpg", caption: "Apple, coloured pencil", alt: "Coloured pencil drawing of a red and yellow apple with its stem and a soft shadow" },
  { thumb: "assets/art/pear-thumb.jpg", full: "assets/art/pear.jpg", caption: "Pear and shadow, coloured pencil", alt: "Coloured pencil drawing of a green pear seen from above, casting a long blue shadow" },
  { thumb: "assets/art/studio-art-thumb.jpg", full: "assets/art/studio-art.jpg", caption: "Studio Art 1601, ink and wash", alt: "Ink and wash still life of draped fabric, a masked figure, a bouquet, a maple leaf and a Studio Art 1601 sketchbook" },
  { thumb: "assets/art/portrait-thumb.jpg", full: "assets/art/portrait.jpg", caption: "Portrait, digital", alt: "Digital charcoal-style portrait of a person in a face mask looking to the side" }
];
const board = document.getElementById("sketch-board");
const pull = document.getElementById("drawer-pull");
const sketchbook = document.getElementById("sketchbook");
const SPOTS = [[4, 8, -6], [28, 2, 4], [52, 12, -3], [75, 4, 6]];
let topZ = 10;

const artView = document.getElementById("art-view");
const artImg = document.getElementById("art-view-img");
const artCap = document.getElementById("art-view-cap");
let artAt = 0;
function showArt(i) {
  artAt = (i + SKETCHES.length) % SKETCHES.length;
  const s = SKETCHES[artAt];
  artImg.src = s.full;
  artImg.alt = s.alt;
  artCap.textContent = `${s.caption} (${artAt + 1} of ${SKETCHES.length})`;
}
function openArt(i) {
  showArt(i);
  if (!artView.open) artView.showModal();
}
document.getElementById("art-prev").addEventListener("click", () => showArt(artAt - 1));
document.getElementById("art-next").addEventListener("click", () => showArt(artAt + 1));
document.getElementById("art-close").addEventListener("click", () => artView.close());
artView.addEventListener("click", (e) => { if (e.target === artView) artView.close(); });
artView.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") showArt(artAt - 1);
  if (e.key === "ArrowRight") showArt(artAt + 1);
});

SKETCHES.forEach((s, i) => {
  const [x, y, r] = SPOTS[i % SPOTS.length];
  const card = el("figure", { class: "polaroid", tabindex: "0", role: "button", "aria-label": `${s.caption}. Open larger` }, [
    el("img", { src: s.thumb, alt: "", draggable: "false", loading: "lazy" }),
    el("figcaption", { text: s.caption })
  ]);
  card.style.left = x + "%";
  card.style.top = y + "%";
  card.style.setProperty("--r", r + "deg");
  card.style.setProperty("--d", i * 70 + "ms");
  let start = null;
  let moved = 0;
  card.addEventListener("pointerdown", (e) => {
    card.setPointerCapture(e.pointerId);
    card.style.zIndex = ++topZ;
    card.classList.add("lifted");
    moved = 0;
    start = { x: e.clientX, y: e.clientY, left: card.offsetLeft, top: card.offsetTop };
  });
  card.addEventListener("pointermove", (e) => {
    if (!start) return;
    moved = Math.max(moved, Math.hypot(e.clientX - start.x, e.clientY - start.y));
    const maxX = board.clientWidth - card.offsetWidth;
    const maxY = board.clientHeight - card.offsetHeight;
    card.style.left = Math.min(maxX, Math.max(0, start.left + e.clientX - start.x)) + "px";
    card.style.top = Math.min(maxY, Math.max(0, start.top + e.clientY - start.y)) + "px";
  });
  const drop = (open) => {
    if (start && open && moved < 6) openArt(i);
    start = null;
    card.classList.remove("lifted");
  };
  card.addEventListener("pointerup", () => drop(true));
  card.addEventListener("pointercancel", () => drop(false));
  card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openArt(i); } });
  board.append(card);
});
pull.addEventListener("click", () => {
  const open = sketchbook.classList.toggle("open");
  pull.setAttribute("aria-expanded", String(open));
  sketchbook.setAttribute("aria-hidden", String(!open));
  pull.querySelector("span").textContent = open ? "Close my sketchbook" : "Open my sketchbook";
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
    el("h3", { text: post.title }),
    el("p", { class: "post-meta", text: post.tag }),
    body,
    el("div", { class: "post-actions" }, [
      toggle,
      el("a", { href: post.url, target: "_blank", rel: "noopener", text: "Read on the blog ↗" })
    ])
  ]));
});

/* Heading underlines draw with the scroll: the line grows as the heading
   rises from the bottom of the screen toward the middle */
const inkLines = [...document.querySelectorAll(".ink-line")];
function updateInk() {
  const vh = window.innerHeight;
  inkLines.forEach((line) => {
    const top = line.getBoundingClientRect().top;
    const p = reduceMotion.matches ? 1 : Math.min(1, Math.max(0, (vh * 0.92 - top) / (vh * 0.5)));
    line.style.setProperty("--draw", `${(p * 100).toFixed(1)}%`);
  });
}
window.addEventListener("scroll", updateInk, { passive: true });
window.addEventListener("resize", updateInk);
updateInk();

/* Hero cat-o travels into the header logo as you scroll (desktop, sticky header only) */
const heroCat = document.querySelector(".hero-cat svg");
const headerLogo = document.querySelector(".site-header .logo");
let heroNat = null;
function handoffEnabled() {
  return !reduceMotion.matches && heroCat && headerLogo && getComputedStyle(document.querySelector(".site-header")).position === "sticky";
}
function measureHero() {
  heroCat.style.transform = "";
  const r = heroCat.getBoundingClientRect();
  heroNat = { left: r.left, top: r.top + window.scrollY, size: r.width };
}
function updateHandoff() {
  if (!handoffEnabled()) {
    document.body.classList.remove("cat-travel", "cat-home");
    if (heroCat) heroCat.style.transform = "";
    return;
  }
  if (!heroNat) measureHero();
  const L = headerLogo.getBoundingClientRect();
  const k = L.height / 2020;
  const target = { left: L.left + 5838 * k, top: L.top + 145 * k, size: 1600 * k };
  const start = { left: heroNat.left, top: heroNat.top, size: heroNat.size };
  const distance = Math.max(200, heroNat.top + heroNat.size * 0.35);
  const p = Math.min(1, Math.max(0, window.scrollY / distance));
  const up = 1 - Math.pow(1 - p, 2);        // rise and shrink first
  const across = p * p;                      // then slide across
  const size = start.size + (target.size - start.size) * up;
  const top = start.top + (target.top - start.top) * up;
  const left = start.left + (target.left - start.left) * across;
  const naturalTop = heroNat.top - window.scrollY;
  heroCat.style.transform = `translate(${left - heroNat.left}px, ${top - naturalTop}px) scale(${size / heroNat.size})`;
  const fill = Math.min(1, Math.max(0, (p - 0.7) / 0.3));
  document.querySelector(".site-header").style.setProperty("--fill", fill.toFixed(3));
  document.body.classList.toggle("cat-home", p >= 1);
  document.body.classList.add("cat-travel");
}
if (heroCat) {
  window.addEventListener("scroll", updateHandoff, { passive: true });
  window.addEventListener("resize", () => { heroNat = null; updateHandoff(); });
  window.addEventListener("load", () => { heroNat = null; updateHandoff(); });
  updateHandoff();
}

/* Logo story: the page scrolls normally. Scrolling while the pointer is over the
   picture steps through the process instead; at the first or last step the
   scroll passes back to the page so nobody gets stuck. */
const storySection = document.getElementById("logo-story");
let wheelAcc = 0;
let wheelLock = 0;
storyStage.addEventListener("wheel", (e) => {
  const at = Number(storyRange.value) - 1;
  const dir = Math.sign(e.deltaY);
  if (!dir || (dir > 0 && at >= STORY.length - 1) || (dir < 0 && at <= 0)) { wheelAcc = 0; return; }
  e.preventDefault();
  if (Date.now() < wheelLock) return;
  wheelAcc += e.deltaY;
  if (Math.abs(wheelAcc) < 40) return;
  wheelAcc = 0;
  wheelLock = Date.now() + 380;
  showStep(at + dir);
}, { passive: false });
storyStage.addEventListener("mouseleave", () => { wheelAcc = 0; });

/* In-page links skip over the pinned logo story: if the trip would pass through it,
   fade out, jump straight there, and fade back in instead of scrolling every step */
const mainEl = document.getElementById("main");
function headerOffset() {
  const h = document.querySelector(".site-header");
  return getComputedStyle(h).position === "sticky" ? h.offsetHeight : 0;
}
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href").slice(1);
    const target = id === "top" ? document.body : document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const from = window.scrollY;
    const to = id === "top" ? 0 : Math.max(0, target.getBoundingClientRect().top + from - headerOffset());
    const sTop = storySection.getBoundingClientRect().top + from;
    const sBottom = sTop + storySection.offsetHeight;
    const lo = Math.min(from, to), hi = Math.max(from, to);
    const crossesStory = storySection.classList.contains("scrolly") && target !== storySection && lo < sBottom && hi > sTop;
    history.pushState(null, "", id === "top" ? location.pathname : `#${id}`);
    if (crossesStory && !reduceMotion.matches) {
      mainEl.classList.add("jumping");
      setTimeout(() => {
        window.scrollTo({ top: to, behavior: "instant" });
        requestAnimationFrame(() => mainEl.classList.remove("jumping"));
      }, 160);
    } else {
      window.scrollTo({ top: to, behavior: crossesStory || reduceMotion.matches ? "instant" : "smooth" });
    }
    if (id === "main") target.focus?.();
  });
});

/* Highlight the menu item for the section you're reading */
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const navSections = navLinks.map((a) => document.getElementById(a.getAttribute("href").slice(1)));
function updateNav() {
  const line = headerOffset() + window.innerHeight * 0.3;
  let current = -1;
  navSections.forEach((sec, i) => { if (sec && sec.getBoundingClientRect().top <= line) current = i; });
  navLinks.forEach((a, i) => { if (i === current) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
}
window.addEventListener("scroll", updateNav, { passive: true });
window.addEventListener("resize", updateNav);
updateNav();
