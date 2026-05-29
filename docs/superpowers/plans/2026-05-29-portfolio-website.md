# Portfolio Website — Luis Fu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page portfolio for Luis Fu — centered glassmorphism card on a purple gradient, sections: About, Skills, Contact.

**Architecture:** Next.js 15 App Router, single `app/page.tsx`. No routing, no data fetching, no backend. Vercel detects Next.js automatically — no special export config needed. Tests via Jest + React Testing Library confirm content renders correctly.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, TypeScript, Jest, @testing-library/react

---

### File Map

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout — sets HTML metadata (title, description) |
| `app/page.tsx` | The entire portfolio — hero name, about, skills, contact button |
| `app/globals.css` | Tailwind directives only — all visual styling lives in page.tsx |
| `app/__tests__/page.test.tsx` | Jest tests verifying name, title, skills, and email link render |
| `jest.config.ts` | Jest config wired to Next.js transformer |
| `jest.setup.ts` | Imports @testing-library/jest-dom matchers |

---

### Task 1: Scaffold Next.js project

**Files:**
- Creates: entire project structure via `create-next-app`

- [ ] **Step 1: Scaffold into the existing directory**

The directory already has `.claude/` and `docs/` — answer `y` if prompted about non-empty directory.

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --yes
```

Expected output ends with: `Success! Created your Next.js app`

- [ ] **Step 2: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:3000 — default Next.js page should appear. Stop with Ctrl+C.

- [ ] **Step 3: Commit scaffold**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js + Tailwind project"
```

---

### Task 2: Set up Jest + React Testing Library

**Files:**
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Modify: `package.json` (scripts block)

- [ ] **Step 1: Install test dependencies**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest
```

- [ ] **Step 2: Create jest.config.ts**

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 3: Create jest.setup.ts**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Add test scripts to package.json**

In `package.json`, add to the `"scripts"` object:

```json
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage"
```

- [ ] **Step 5: Verify Jest runs**

```bash
npm test -- --passWithNoTests
```

Expected: passes with zero tests.

- [ ] **Step 6: Commit**

```bash
git add jest.config.ts jest.setup.ts package.json package-lock.json
git commit -m "chore: add jest and react testing library"
```

---

### Task 3: Write failing tests for the portfolio page

**Files:**
- Create: `app/__tests__/page.test.tsx`

- [ ] **Step 1: Create the test file**

```tsx
import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('Portfolio page', () => {
  it('displays full name as heading', () => {
    render(<Page />)
    expect(screen.getByRole('heading', { name: /luis fu/i })).toBeInTheDocument()
  })

  it('displays job title', () => {
    render(<Page />)
    expect(screen.getByText(/software developer/i)).toBeInTheDocument()
  })

  it('displays all five skills', () => {
    render(<Page />)
    ;['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS'].forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })
  })

  it('has a get in touch link pointing to the correct email', () => {
    render(<Page />)
    const link = screen.getByRole('link', { name: /get in touch/i })
    expect(link).toHaveAttribute('href', 'mailto:webfroot@hotmail.com')
  })
})
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npm test
```

Expected: 4 failures — tests can't find "Luis Fu" in the default Next.js placeholder page.

---

### Task 4: Update layout.tsx with metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luis Fu — Software Developer',
  description: 'Software developer specialising in React, Node.js, Python, PostgreSQL and AWS.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add page metadata"
```

---

### Task 5: Strip globals.css boilerplate

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Check which Tailwind version was scaffolded**

Open `app/globals.css`. Replace the entire file contents with one of the following:

If it has `@tailwind base;` lines (Tailwind v3):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

If it has `@import "tailwindcss";` (Tailwind v4):
```css
@import "tailwindcss";
```

Remove all `:root` variables, `body` overrides, and any other default CSS.

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "chore: strip globals.css boilerplate"
```

---

### Task 6: Build the portfolio page

**Files:**
- Modify: `app/page.tsx` (replace entirely)

- [ ] **Step 1: Replace page.tsx**

```tsx
const SKILLS = ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS']

export default function Page() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] flex items-center justify-center p-6">
      <div className="bg-white/[0.13] backdrop-blur-xl border border-white/25 rounded-3xl p-12 w-full max-w-lg shadow-2xl">

        <h1 className="text-5xl font-extrabold text-white tracking-tight leading-none mb-1">
          Luis Fu
        </h1>
        <p className="text-sm font-medium text-white/70 uppercase tracking-[0.2em] mb-7">
          Software Developer
        </p>

        <div className="h-px bg-white/20 mb-6" aria-hidden="true" />

        <p className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.15em] mb-2">
          About
        </p>
        <p className="text-[15px] text-white/85 leading-relaxed mb-7">
          I build robust web applications and APIs. Passionate about clean code,
          great developer experience, and shipping things that actually work.
        </p>

        <p className="text-[10px] font-semibold text-white/50 uppercase tracking-[0.15em] mb-3">
          Skills
        </p>
        <ul className="flex flex-wrap gap-2 mb-7" aria-label="Skills">
          {SKILLS.map((skill) => (
            <li
              key={skill}
              className="bg-white/[0.18] border border-white/25 rounded-full px-4 py-1.5 text-sm font-medium text-white"
            >
              {skill}
            </li>
          ))}
        </ul>

        <a
          href="mailto:webfroot@hotmail.com"
          className="inline-flex items-center gap-2 bg-white text-[#764ba2] text-sm font-bold px-7 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-150"
        >
          ✉ Get in touch
        </a>

      </div>
    </main>
  )
}
```

- [ ] **Step 2: Run tests — all 4 should pass**

```bash
npm test
```

Expected: 4 tests pass.

- [ ] **Step 3: Verify visually**

```bash
npm run dev
```

Open http://localhost:3000. Confirm: purple gradient fills viewport, card is centered, name/skills/button visible. Stop server (Ctrl+C).

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build portfolio page"
```

---

### Task 7: Build check + deploy to Vercel

- [ ] **Step 1: Run full checks**

```bash
npm test && npm run lint && npm run build
```

All three must pass before deploying.

- [ ] **Step 2: Push to GitHub**

```bash
gh repo create luis-portfolio --public --source=. --remote=origin --push
```

- [ ] **Step 3: Deploy to Vercel (luiswebfroots-projects team)**

```bash
npx vercel --yes --scope luiswebfroots-projects
```

- [ ] **Step 4: Add custom domain froot.co.nz in Vercel dashboard**

1. Go to vercel.com → your project → Settings → Domains
2. Add `froot.co.nz`
3. Vercel will show DNS records to add at your domain registrar
4. Add those records (A record or CNAME) at wherever froot.co.nz is registered
5. Wait for DNS propagation (usually a few minutes)

- [ ] **Step 5: Confirm live site**

Open https://froot.co.nz — verify purple gradient, card, skills, and contact button all appear.
