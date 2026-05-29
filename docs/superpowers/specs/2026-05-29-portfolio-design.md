# Portfolio Website Design — Luis Fu

**Date:** 2026-05-29

## Overview

Single-page portfolio website for Luis Fu, a software developer. Deployed on Vercel. Goals: job hunting, freelance clients, personal brand.

## Visual Style

- **Background:** Full-page gradient `135deg, #667eea → #764ba2` (purple)
- **Card:** Glassmorphism — `rgba(255,255,255,0.13)` background, `backdrop-filter: blur(20px)`, white border at 25% opacity, 24px border-radius
- **Typography:** System font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)
- **Color palette:** White text on gradient, purple accent (`#764ba2`) on white surfaces

## Layout

Single centered card — everything visible above the fold, no scrolling. Card max-width 520px, centered horizontally and vertically on the gradient background.

## Sections (top to bottom inside card)

1. **Header** — Name "Luis Fu" (42px, 800 weight), subtitle "Software Developer" (uppercase, spaced, 70% opacity)
2. **Divider** — 1px white at 20% opacity
3. **About** — Section label + 2–3 sentence bio paragraph
4. **Skills** — Section label + pill badges: React, Node.js, Python, PostgreSQL, AWS
5. **Contact** — White pill button "✉ Get in touch" → `mailto:webfroot@hotmail.com`

## Tech Stack

- **Framework:** Next.js (App Router) — static export for Vercel
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (no backend needed — static site)

## Files

```
/
├── app/
│   ├── layout.tsx       — root layout, metadata, font
│   └── page.tsx         — the single page
├── public/
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Content

- **Name:** Luis Fu
- **Title:** Software Developer
- **Bio:** Placeholder — Luis edits app/page.tsx to personalise
- **Skills:** React, Node.js, Python, PostgreSQL, AWS
- **Email:** webfroot@hotmail.com

## Non-Goals

- No blog, no projects section, no work experience
- No CMS, no database, no authentication
- No dark mode toggle (dark gradient is the design)
