# Personal Portfolio — K Shamanth Kumar

A fast, animated portfolio for an AI/ML engineer. Light and dark themes, smooth
Apple-style motion, an interactive hero, and a fully data-driven content layer — add a
project or blog post by editing a single file, no components to touch.

**Live site:** _add your URL here_

---

## Highlights

- **Light / dark theme** — remembers your choice, follows your OS by default, no flash on load.
- **Interactive hero** — an ambient vector-field canvas that reacts to the cursor and re-tints with the theme.
- **Data-driven content** — projects, posts, courses and skills all live in plain JS files.
- **Project & blog detail pages** — routed automatically from a `slug`; blog posts can render on-site or link out to Medium.
- **Contact form** via EmailJS, with keys kept out of the source.
- **Responsive & accessible** — mobile-first, keyboard focus states, and `prefers-reduced-motion` respected throughout.

---

## Tech stack

| | |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 (CSS-variable theming) |
| Animation | Framer Motion |
| Routing | React Router 6 |
| Deploy | Netlify (GitHub Actions CI/CD) |

---

## Getting started

Requires **Node.js 18+**.

```bash
git clone https://github.com/batman7090/<your-repo>.git
cd <your-repo>
npm install

npm run dev       # dev server → http://localhost:5173
npm run build     # production build → /dist
npm run preview   # preview the production build locally
```

---

## Project structure

```
src/
├── config/site.js      Your name, links, resume, nav, and About-page content
├── content/            The stuff that changes often:
│   ├── projects.js       – projects (each becomes /projects/<slug>)
│   ├── posts.js          – blog posts (each becomes /blog/<slug>)
│   ├── courses.js        – certificates
│   ├── skills.js         – skill groups
│   └── index.js          – sorting/filtering helpers (no content here)
├── components/         Reusable UI: nav, footer, cards, theme toggle, hero canvas
├── pages/              One file per route
├── hooks/              Theme + reduced-motion hooks
└── index.css           Design tokens — every colour in the site
public/
└── images/             Photos, project covers, resume.pdf
```

**Rule of thumb:** to change *content*, you only ever edit `src/config/` and `src/content/`.

---


## License

© K Shamanth Kumar. All rights reserved.