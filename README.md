# K Shamanth Kumar — Portfolio v2

React + Vite + Tailwind. Light/dark theme, Apple-style motion, data-driven content.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → /dist
```

---

## Where everything lives

```
src/
├── config/site.js        ← your name, email, socials, résumé link, nav
├── content/
│   ├── projects.js       ← add projects here
│   ├── posts.js          ← add blog posts here
│   ├── courses.js        ← add certificates here
│   ├── skills.js         ← add skills here
│   └── index.js          ← sorting/filtering helpers (don't edit to add content)
├── components/           ← reusable UI (cards, nav, theme toggle, hero canvas)
├── pages/                ← one file per route
└── index.css             ← design tokens: every colour in the site is defined here
```

**Rule of thumb: to change content, you only ever touch `src/config/` and `src/content/`.**

---

## Adding things

### A project
Open `src/content/projects.js`, copy a block, change the values. The card, the filter
tag, and the detail page at `/projects/<slug>` all appear automatically.

```js
{
  slug: 'my-new-project',          // becomes the URL — must be unique
  title: 'My New Project',
  summary: 'One or two sentences on what it does and why it was hard.',
  tags: ['Python', 'FastAPI'],     // shows as chips + adds to the filter bar
  year: 2026,
  status: 'Shipped',               // 'Shipped' | 'In progress' | 'Research'
  featured: true,                  // shows on the home page
  cover: '/images/my-project.jpg', // or any remote image URL
  github: 'https://github.com/...',
  demo: 'https://...',
  metrics: [{ value: '92%', label: 'Accuracy' }],   // optional
  stack: ['FastAPI', 'Postgres'],                    // optional, shown in the sidebar
  body: ['A paragraph.', 'Another paragraph.'],      // optional case study
}
```

### A blog post
Open `src/content/posts.js`. `body` is an array of blocks:

```js
body: [
  { type: 'p',     text: 'A paragraph.' },
  { type: 'h2',    text: 'A section heading' },
  { type: 'ul',    items: ['A point', 'Another point'] },
  { type: 'code',  code: 'print("hello")' },
  { type: 'quote', text: 'A pull quote.' },
]
```
Omit `body` entirely and the post still lists — the detail page shows an
"in progress" note instead of breaking.

### A certificate
Open `src/content/courses.js`. `completed` is `YYYY-MM`; the page sorts newest-first
and recalculates the stats bar for you.

### Images
Drop files in `public/images/` and reference them as `/images/name.jpg`. The demo
content uses Unsplash URLs — swap them for real screenshots of your projects, that is
the single highest-impact change you can make to this site.

---

## Theming

Every colour is a CSS variable in `src/index.css`. Light values live in `:root`,
dark values in `.dark`. Change the accent in two places and the whole site
re-tints — buttons, links, the hero canvas, focus rings, everything.

```css
:root { --accent: #4f46e5; }   /* light */
.dark { --accent: #8f8cff; }   /* dark  */
```

Theme is stored in `localStorage`, falls back to the OS preference, and is applied
before first paint (inline script in `index.html`) so there is no flash.

---

## Contact form

1. Create a free account at [emailjs.com](https://emailjs.com), add a service + template.
2. Copy `.env.example` to `.env` and fill in the three keys.
3. For deploys, add the same three as GitHub Actions secrets (already wired in the workflow).

Until keys exist, the form tells the visitor to email you directly instead of failing silently.

---

## Résumé

Replace `public/resume.pdf` with your actual PDF.

---

## About page

Your whole story lives in one place: the `about` object in `src/config/site.js`.
Edit the text there — no JSX to touch. Fields:

- `lede` — the big opening line
- `story` — array of `{ heading, text }` sections (add/remove freely)
- `facts` — the "At a glance" sidebar
- `interests` — the "Outside the terminal" list
- `goal` — your long-term goal (the closing note)

**Your photo:** drop a real image at `public/images/shamanth.jpg`, then change
`photo:` in the `about` object back to `'/images/shamanth.jpg'`. A placeholder
graphic ships until you do. Portrait crop (3:4) looks best.

A short teaser (`site.aboutTeaser`) shows on the home page and links through to `/about`.
