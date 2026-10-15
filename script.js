/* Feature flag: the short portfolio is the default. ?full in the link, or the
   "See the full portfolio" button, switches on the extra sections. */
const params = new URLSearchParams(location.search);
if (params.has("full")) document.body.classList.add("full");
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
    result: "23 participants.",
    highlight: "23 participants",
    hotspots: [
      { x: 50, y: 12, title: "A date that feels like a doodle", text: "The date is handwritten between two bold words, so it reads as part of the fun instead of a line of admin." },
      { x: 30, y: 25, title: "Details at a glance", text: "Time, place and the free-food line sit in one tidy block, so nobody has to hunt for the basics." },
      { x: 62, y: 55, title: "A path for the eye", text: "The wavy edge pulls your eye from the details down into the picnic basket." },
      { x: 76, y: 85, title: "The name you leave with", text: "“Autumn Picnic” is the last thing you see, so it’s the name that sticks." }
    ]
  },
  {
    title: "Puppy Therapy",
    kicker: "EmpowerCHANGE Western · Event poster · 2023",
    image: "assets/posters/puppy-therapy.jpg",
    draft: "",
    goal: "Promote a stress-relief puppy session during exam season.",
    audience: "All Western students, especially anyone feeling exam stress.",
    result: "31 participants.",
    highlight: "31 participants",
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
    highlight: "60+ applicants",
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
  const row = el("button", { class: "poster-row" + (i === 0 ? " active" : ""), type: "button", "aria-haspopup": "dialog" }, [
    el("span", { class: "row-thumb" }, [el("img", { src: poster.image, alt: "", loading: "lazy" })]),
    el("span", { class: "row-title", text: poster.title }),
    el("span", { class: "row-num", text: poster.highlight || year })
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
    copy: "First I listed the cat elements I could borrow: ears, whiskers, a tail and a paw. Then I tried them on my name: ears on the k, whiskers around it, a paw over the i, a tail on the y, and ears on the “o” in Gao. That last one stuck.",
    layout: "sketch",
    images: [["assets/story/brainstorm.jpg", "Brainstorm page: a list of cat elements (ears, whiskers, tail, paw), KG and 高 monograms, a k with cat ears and whiskers, and kitty gao written with ears on the o, a paw over the i and a tail on the y"]]
  },
  {
    title: "2. Sketch the chosen idea",
    copy: "Next, a detailed sketch of the chosen design on a grid: what if the “o” in Gao could quietly become a cat? Two ears, a curl of a tail, and the rest of my name left alone.",
    layout: "sketch",
    images: [["assets/story/sketch.jpg", "Outlined sketch of the kitty gao wordmark on grid paper, with blue cat ears and a curled tail added to the o"]]
  },
  {
    title: "3. Explore the options",
    copy: "I explored pointed ears, soft ears, a winking face and a single-line cat, and judged every one both at full size and as a tiny browser-tab icon.",
    layout: "grid4",
    images: [
      ["assets/story/explore-pointy.svg?v=2", "Variation with pointed blue ears"],
      ["assets/story/explore-soft.svg?v=2", "Variation with soft rounded ears"],
      ["assets/story/explore-face.svg?v=2", "Variation with a winking face"],
      ["assets/story/explore-line.svg", "Single-line cat variation with a tail"]
    ]
  },
  {
    title: "4. Spot the problem",
    copy: "Tall, pointed ears on a small round letter read as devil horns, not a cat. Wider, shorter ears and a curled tail changed what the shape was saying.",
    layout: "single",
    images: [["assets/story/explore-pointy.svg?v=2", "The pointed-ear version that looked like devil horns"]]
  },
  {
    title: "5. Make it one shape",
    copy: "I rebuilt the cat on the typeface’s own “o”, so its thick-and-thin strokes match the other letters, and let the ears flow into the letter instead of sitting on top.",
    layout: "sketch",
    images: [["assets/story/illustrator.jpg", "Illustrator mid-edit at 600%: the cat o selected with the Direct Selection tool, anchor points and one curve handle showing, guides at the baseline and x-height, and layers for tail, cat-o and kitty ga"]]
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

/* The six steps stay tucked away until someone asks for them */
const storyPull = document.getElementById("story-pull");
const storyDrawer = document.getElementById("story-drawer");
const storyPreview = document.getElementById("story-preview");
storyPull.addEventListener("click", () => {
  const open = storyDrawer.classList.toggle("open");
  storyPreview.classList.toggle("tucked", open);
  storyPull.setAttribute("aria-expanded", String(open));
  storyDrawer.setAttribute("aria-hidden", String(!open));
  storyDrawer.inert = !open;
  storyPull.querySelector("span").textContent = open ? "Hide the steps" : "See how I got there";
  if (open) showStep(0);
});

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
    src: `assets/carousel/mh-pros-en-${i}.jpg?v=2`,
    alt: `Slide ${i} of 7 of the English adaptation: Ontario's 4 mental health professionals explained`,
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
  title.textContent = lang === "zh" ? "一文读懂安省四大心理健康专家区别" : "Explained: Ontario’s 4 Mental Health Professionals";
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
POSTS.forEach((post, i) => {
  const body = el("p", { class: "post-body", text: post.long });
  let brief = false;
  const toggle = el("button", { class: "link-btn", type: "button", "aria-pressed": "false", text: "30-second version" });
  toggle.addEventListener("click", () => {
    brief = !brief;
    body.textContent = brief ? post.short : post.long;
    toggle.textContent = brief ? "Full intro" : "30-second version";
    toggle.setAttribute("aria-pressed", String(brief));
  });
  const card = el("article", { class: i === 0 ? "post post-featured" : "post" }, [
    el("h3", { text: post.title }),
    el("p", { class: "post-meta", text: post.tag }),
    body,
    el("div", { class: "post-actions" }, [
      toggle,
      el("a", { href: post.url, target: "_blank", rel: "noopener", text: "Read on the blog ↗" })
    ])
  ]);
  if (i > 0) card.dataset.flag = "full";
  writing.append(card);
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

const showFull = document.getElementById("show-full");
if (showFull) showFull.addEventListener("click", () => {
  document.body.classList.add("full");
  const extras = document.querySelectorAll('[data-flag="full"]:not(#more *)');
  extras.forEach((el) => el.classList.add("just-shown"));
  const url = new URL(location.href); url.searchParams.set("full", ""); 
  history.replaceState(null, "", url.pathname + "?full" + url.hash);
  const first = document.getElementById("abtest");
  window.scrollTo({ top: first.getBoundingClientRect().top + window.scrollY - headerOffset(), behavior: reduceMotion.matches ? "auto" : "smooth" });
  if (typeof updateInk === "function") updateInk();
});

const showShort = document.getElementById("show-short");
if (showShort) showShort.addEventListener("click", () => {
  // Keep the bottom section where it is on screen while the extras disappear above it.
  const more = document.getElementById("more");
  const before = more.getBoundingClientRect().top;
  document.body.classList.remove("full");
  document.querySelectorAll(".just-shown").forEach((el) => el.classList.remove("just-shown"));
  const url = new URL(location.href); url.searchParams.delete("full");
  history.replaceState(null, "", url.pathname + url.search + url.hash);
  const html = document.documentElement, prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, more.getBoundingClientRect().top + window.scrollY - before);
  html.style.scrollBehavior = prev;
  if (typeof updateInk === "function") updateInk();
  if (typeof updateNav === "function") updateNav();
  document.getElementById("show-full").focus({ preventScroll: true });
});

/* Experience roles that link to their case study */
document.querySelectorAll(".role-link").forEach((btn) => {
  btn.addEventListener("click", () => openCase(Number(btn.dataset.case)));
});

/* Phones: the menu folds into one button */
const navToggle = document.getElementById("nav-toggle");
const siteHeader = document.querySelector(".site-header");
function setMenu(open) {
  siteHeader.classList.toggle("menu-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.querySelector("span").textContent = open ? "Close" : "Menu";
}
navToggle.addEventListener("click", () => setMenu(!siteHeader.classList.contains("menu-open")));
document.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && siteHeader.classList.contains("menu-open")) { setMenu(false); navToggle.focus(); } });

/* The progress cat only shows while you scroll, so it never sits on top of what you're reading */
let catIdle;
window.addEventListener("scroll", () => {
  scrollCat.classList.add("awake");
  clearTimeout(catIdle);
  catIdle = setTimeout(() => scrollCat.classList.remove("awake"), 900);
}, { passive: true });

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
    const mine = store.get("gb-mine", []).filter((m) => !notes.some((n) => n.id === m.id) && Date.now() - m.at < 1000 * 60 * 60 * 24 * 14);
    store.set("gb-mine", mine);
    wall.replaceChildren(...mine.map((m) => noteEl(m, true)), ...notes.slice(0, 12).map((n) => noteEl(n, false)));
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
      text: b.dataset.ask === "hiring" ? "We’re hiring, and I’d love to talk." : "Let’s chat!",
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
    hint.textContent = priv ? "Private notes come only to me. No name needed." : "Wall notes show up once I’ve read them.";
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
        if (d.note) store.set("gb-mine", [d.note, ...store.get("gb-mine", [])]);
        render();
        say("Thank you! Your note will be pinned once I’ve read it.");
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
})();
