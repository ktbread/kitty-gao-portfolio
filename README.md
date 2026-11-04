# kitty gao: personal website

Kitty Gao's personal website (kitty-gao.vercel.app). Plain HTML, CSS and JavaScript, no build step. Hosted on Vercel.

**Deploying:** Vercel does not redeploy automatically from GitHub. After pushing to `main`, publish by hand (for example `vercel --prod`). When CSS or JS changes, bump the `?v=` string in index.html, hello.html and 404.html.

## Updating content

- **Posters and blog samples:** edit the `POSTERS` and `POSTS` lists at the top of `script.js`. Bracketed text like `[POSTER 1 TITLE]` is a placeholder to replace.
- **Poster images:** add them to `assets/posters/` and set `image` (and `draft`, for the draft-to-final slider) on each poster.
- **Hotspots:** each `{ x, y }` is a percentage from the top-left of the poster.
- **Resume:** save your PDF as `assets/KittyGao_Resume.pdf`.
- **Photo and bio:** edit the About section in `index.html`.

## Brand

- Colours: cream `#FAF8F3`, ink `#16202E`, Klein blue `#002FA7` (the only accent colour)
- Type: Newsreader (headings) and DM Sans (body); the logo letters are drawn from Fraunces
- Mobile-only styles live inside `@media (max-width: 820px)`
- Writing: no em or en dashes; plain, professional copy, with personality from the design and the letter (hello.html)
- Logo files: `assets/logo.svg`, `assets/logo-reversed.svg`, `assets/icon.svg`, `assets/favicon.svg`
