# Portfolio v3 — Complete Engineering Plan
### Tanmay — AI Product Engineer

> **Status**: All decisions locked. Zero code until you say "go."
> **Last audited**: Full deep-read of taste-skill, impeccable, brand.md, frontend-design, algorithmic-art, ui-ux-pro-max, awesome-design-md/linear.

---

## 0. DESIGN READ (Required per taste-skill §0.B)

> *"Reading this as: developer portfolio for senior engineering recruiters and CTOs who assess AI capability on first glance, with a Linear-style technical-minimalist language, leaning toward native HTML/CSS/JS + CSS custom properties + IntersectionObserver — no framework, no build step, maximum load speed."*

**Physical scene** (required per impeccable before picking theme):
> A CTO opens this site at 11pm on a MacBook Pro, dark OS theme, 1440px screen, evaluating whether Tanmay should lead their AI agent infrastructure. The site must signal "senior engineer" in under 3 seconds.

That forces: **dark mode, left-aligned dense content, zero decorative fluff, instant credibility.**

---

## 1. THREE DIALS (Locked — taste-skill §1.B Developer Portfolio preset)

| Dial | Value | Reasoning |
|---|---|---|
| `DESIGN_VARIANCE` | **6** | Technical audience, not agency/Awwwards. Offset layouts, not chaotic. |
| `MOTION_INTENSITY` | **5** | Fluid CSS transitions + IntersectionObserver reveals. No scroll-hijack. |
| `VISUAL_DENSITY` | **4** | Daily-app density. Standard section gaps (`py-24`), dense inside cards. |

**Every layout, animation, and spacing decision is gated by these values. No overrides without reason.**

---

## 2. COLOR STRATEGY — Restrained

**Strategy**: `Restrained` — tinted neutrals + one accent used at ≤10% surface area. (Linear palette, per `awesome-design-md/linear.app/DESIGN.md`.)

### Color Tokens (exact values, no deviation)

| CSS Variable | Hex | Usage |
|---|---|---|
| `--canvas` | `#010102` | Page background. Near-black, faint blue tint. |
| `--surface-1` | `#0f1011` | Cards, panels, project tiles |
| `--surface-2` | `#141516` | Hovered cards, featured lift |
| `--surface-3` | `#18191a` | Sub-panels inside cards, inputs, skill bar track |
| `--hairline` | `#23252a` | All 1px borders |
| `--hairline-strong` | `#34343a` | Focus rings, emphasized separators |
| `--ink` | `#f7f8f8` | Headlines, primary text |
| `--ink-muted` | `#d0d6e0` | Secondary text, card subtitles |
| `--ink-subtle` | `#8a8f98` | Timestamps, meta, footer, tags |
| `--ink-tertiary` | `#62666d` | Disabled states, footnotes |
| `--accent` | `#5e6ad2` | Brand mark, primary CTA, focus rings. ONLY chromatic accent. |
| `--accent-hover` | `#828fff` | Hover state of accent elements |
| `--accent-focus` | `#5e69d1` | Focus-ring tint at 50% opacity |
| `--success` | `#27a644` | Open-to-work status dot |

**Color Consistency Lock**: `--accent` appears on: logo mark, primary CTA, skill bar fill, timeline dots, filter pill active state, focus rings. Nowhere else. Not on card borders, not on section headers.

**One palette. No warm/cool drift between sections.**

---

## 3. TYPOGRAPHY

### Font Stack (2 families — hard maximum per impeccable §skill-typo-font-count)

| Role | Font | Weight | Why |
|---|---|---|---|
| Display/Headlines | **Geist Sans** | 500–700 | Linear's documented substitute. NOT Inter, NOT Space Grotesk, NOT Outfit (all on reflex-reject list). Technical, dark-IDE native. |
| Body/UI | **Geist Sans** | 400 | Same family, lighter weight — single continuous voice. |
| Mono/Terminal | **Geist Mono** | 400 | Terminal widget, code tags, skill IDs, mono labels. |

> Load via CDN: `https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400&display=swap`
> Or self-host with `@font-face` + `font-display: swap`.

### Type Scale (fluid clamp-based)

| CSS Variable | Value | Letter-spacing | Usage |
|---|---|---|---|
| `--display-xl` | `clamp(2.5rem, 6vw, 5rem)` | `-0.03em` | H1 hero |
| `--display-lg` | `clamp(2rem, 4vw, 3.5rem)` | `-0.025em` | Section H2 |
| `--display-md` | `clamp(1.5rem, 3vw, 2.5rem)` | `-0.02em` | Sub-section heads |
| `--headline` | `1.75rem` | `-0.015em` | Card titles, large labels |
| `--card-title` | `1.375rem` | `-0.01em` | Project card H3 |
| `--body-lg` | `1.125rem` | `-0.005em` | Hero subhead |
| `--body` | `1rem` | `0` | Main body, descriptions |
| `--body-sm` | `0.875rem` | `0` | Tags, meta, footer |
| `--mono` | `0.8125rem` | `0` | Terminal, code labels |

**Rules locked from impeccable:**
- Hero clamp max = `5rem`. Never `8rem`, `10rem` (comically loud).
- Letter-spacing floor = `-0.03em`. Never tighter than `-0.04em` (letters touch).
- `text-wrap: balance` on H1–H3.
- Body line length cap: `max-width: 65ch`.
- Line-height on dark bg: +0.05–0.1 (light text reads lighter, needs breathing room).

---

## 4. SPACING, RADIUS, Z-INDEX

### Spacing (4px base grid)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96px`

Section padding: `py-24` (96px) desktop, `py-16` (64px) mobile.
Max content width: `max-width: 1280px; margin: 0 auto; padding: 0 24px`.

### Border Radius (HARD CAPS per impeccable)

| Token | Value | Usage |
|---|---|---|
| `--r-xs` | `4px` | Status badges, chips |
| `--r-sm` | `6px` | Skill pills, inline tags |
| `--r-md` | `8px` | Buttons, inputs |
| `--r-lg` | `12px` | **Project cards — HARD MAX** |
| `--r-xl` | `16px` | Terminal panel, featured tiles |
| `--r-pill` | `9999px` | Filter toggles, status pill |

> Cards: `12px` absolute max. `24/32/40px` is the single biggest "AI made this" tell. Banned.

### Z-Index Scale (semantic, no magic numbers)

```
--z-canvas:   1      particle canvas — behind everything
--z-content:  10     page content
--z-sticky:   100    nav bar
--z-dropdown: 200    mobile hamburger drawer
--z-toast:    400    copy-to-clipboard tooltip
--z-tooltip:  500    hover tooltips
```

---

## 5. TECH STACK (Locked)

| Layer | Technology | Version | Reason |
|---|---|---|---|
| **Framework** | Next.js | 15 (App Router) | RSC, SSG, Vercel-native, SEO out of the box |
| **Language** | TypeScript | Latest, strict mode | Type-safe, professional signal to recruiters |
| **Styling** | Tailwind CSS | v4 | CSS-first `@theme` maps directly to our design tokens |
| **Animations** | Framer Motion | Latest | React-declarative, handles all reveals + micro-interactions |
| **UI Primitives** | shadcn/ui | Latest | Accessible headless components — form, button, input |
| **Premium Components** | Magic UI | Latest | Bento grid, particle background, animated components |
| **Canvas FX** | Raw HTML5 Canvas API | — | Neural Mesh particle system, zero lib overhead |
| **Fonts** | Geist Sans + Geist Mono | — | Built into Next.js/Vercel, zero external CDN call |
| **Deployment** | Vercel | — | Zero-config, automatic preview URLs, edge network |

---

## 6. FILE STRUCTURE

```
Portfoliov3/
├── app/
│   ├── layout.tsx              # Root layout: metadata, fonts, global providers
│   ├── page.tsx                # Assembles all sections in order
│   └── globals.css             # Tailwind v4 @theme tokens + base reset
│
├── components/
│   ├── layout/
│   │   ├── nav.tsx             # Fixed sticky nav, active section tracking
│   │   └── footer.tsx          # Two-column footer
│   ├── sections/
│   │   ├── hero.tsx            # Asymmetric split: text left, terminal right
│   │   ├── projects.tsx        # Bento grid + filter bar + rotating badge
│   │   ├── skills.tsx          # Competency bars + tool pills + ticker
│   │   ├── timeline.tsx        # Vertical changelog
│   │   └── contact.tsx         # Two-column form + copy button
│   ├── shared/
│   │   ├── canvas-background.tsx   # Neural Mesh — raw Canvas 2D API
│   │   ├── terminal-widget.tsx     # Typewriter boot sequence
│   │   ├── project-card.tsx        # Bento card with unique inner widget
│   │   ├── skill-bar.tsx           # Animated progress bar
│   │   ├── status-pill.tsx         # Green availability dot
│   │   ├── rotating-badge.tsx      # clip-path slide-up badge
│   │   └── copy-button.tsx         # Clipboard copy with fallback
│   └── ui/                     # shadcn/ui primitives (button, input, textarea)
│
├── lib/
│   ├── utils.ts                # cn() class merger + helpers
│   └── hooks/
│       ├── use-intersection.ts     # Typed IntersectionObserver hook
│       └── use-reduced-motion.ts   # prefers-reduced-motion gate
│
├── portfolio.config.ts         # ALL data: projects, skills, timeline, links
│                               # Single source of truth — edit once, updates everywhere
├── public/
│   └── resume.pdf
│
├── next.config.ts
├── tailwind.config.ts          # Minimal — v4 handles most via globals.css
├── tsconfig.json               # strict: true
└── package.json
```

**`portfolio.config.ts` — the professional pattern:**
All content lives here. Projects, skills, timeline entries, social links. No hunting through components to update a GitHub URL.

```typescript
// portfolio.config.ts
export const CONFIG = {
  name: 'Tanmay Gemini',
  title: 'AI Product Engineer',
  email: 'tanmay8506@gmail.com',
  github: 'https://github.com/tanmay8506',
  linkedin: 'https://linkedin.com/in/tanmay-gemini-864005273',
  location: 'New Delhi',
  projects: [ /* ... */ ],
  skills: [ /* ... */ ],
  timeline: [ /* ... */ ],
} as const;
```

---

## 6. SECTION ARCHITECTURE

**Seven sections. Four distinct layout families. Zero repeated families.**

| # | Section | Layout Family | H2 / Eyebrow |
|---|---|---|---|
| 1 | Nav | Fixed sticky bar | — |
| 2 | Hero | Asymmetric Split (text left, terminal right) | No eyebrow |
| 3 | Projects | Asymmetric Bento Grid | H2 only |
| 4 | Skills | Two-column competency table | H2 only |
| 5 | Timeline | Vertical changelog | H2 only |
| 6 | Contact | Two-column form layout | H2 only |
| 7 | Footer | Standard two-column footer | — |

**Eyebrow count**: 0 out of 7 sections. (Max allowed = ceil(7/3) = 3. We use 0 — identity comes from H2 scale and position alone.)

**Section-Layout-Repetition check**: Split, Bento, Table, Changelog, Form = 5 different families. Passes.

---

### Section 1 — Navigation Bar

```
[T]          Work  Skills  Timeline  Contact        [Resume ↓]  [Hire Me]
```

- `position: fixed`, height `56px`, `--canvas` bg + `1px` bottom `--hairline`.
- Left: **T** monogram — inline SVG letterform in `--accent`.
- Center: `Work · Skills · Timeline · Contact` in `--body-sm`, `--ink-subtle`, hover → `--ink`. `transition: color 150ms ease-out`.
- Right: `Resume ↓` (secondary, `--surface-1` bg) + `Hire Me` (`--accent` bg). Both `--r-md`.
- Active section link: tracked by `IntersectionObserver`, not `scroll` event listener. (Hard ban: `window.addEventListener('scroll')` is BANNED.)
- Mobile `<768px`: hamburger icon → slide-in drawer from right at `--z-dropdown: 200`.

**Error prevention:**
- `padding-top: 56px` on `<main>` — nav never overlaps content.
- Drawer `--z-dropdown: 200` > canvas `--z-canvas: 1` — drawer always clears background.
- `aria-label="Tanmay — Home"` on logo anchor.
- Nav renders on ONE line at 1024px+. Nav height ≤ 56px (under the 80px maximum cap).
- CTA labels: "Resume" and "Hire Me" — one label per intent, no duplicates.

---

### Section 2 — Hero (Asymmetric Split)

**Anti-center-bias rule applies** (DESIGN_VARIANCE = 6). Centered hero avoided. Left-aligned content, right visual asset.

```
[Nav — 56px fixed]
[Canvas — absolute, full-screen, z-1]

Left column (55%)                    Right column (45%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
● Available for opportunities

Building AI Agents                   ┌────────────────────┐
That Actually Work.                  │ agent@algogenie ~$ │
                                     │ > loading tools... │
Python + LangGraph + AutoGen.        │ > 12 tools active  │
Multi-agent systems shipped          │ > 3 agents online  │
to production, not demos.            │ > session ready ✓  │
                                     └────────────────────┘
[View My Work]  [Resume →]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**No scroll cue.** (Explicitly banned by taste-skill §9.F: "`Scroll`, `↓ scroll`, `Scroll to explore`" — banned.)

**Status pill**: `● Available for opportunities`
- `--success` green dot (8px circle), `--r-pill`, `--surface-1` bg, `--hairline` border.
- NOT an eyebrow. A live semantic state indicator.
- `href="#contact"` — clicking it scrolls to contact and auto-focuses the name field.

**H1**: `"Building AI Agents / That Actually Work."` Max 2 lines. `var(--display-xl)`. `letter-spacing: -0.03em`. `text-wrap: balance`. `font-weight: 600`.

**Subhead** (exactly 15 words, zero buzzwords): `"Python + LangGraph + AutoGen. Multi-agent systems shipped to production, not demos."`
- `var(--body-lg)`, `--ink-muted`, `max-width: 52ch`, `line-height: 1.6`.

**CTAs** (one primary, one secondary — no duplicate intent):
- Primary: `"View My Work"` → `#projects`. `--accent` bg, `--r-md`, padding `10px 20px`.
- Secondary: `"Resume →"` → `assets/resume.pdf` download. `--surface-1` bg, `--hairline` border, `--r-md`.

**Hero Stack Discipline check**: status pill + H1 + subhead + CTAs = 4 elements. Hard limit met. No tagline below CTAs. No trust strip in hero.

**Terminal Widget** (right column — this is a REAL animated component, NOT a fake screenshot):
- `--surface-1` panel, `--r-xl: 16px`, `1px --hairline` border, padding `20px`.
- Window chrome: 3 traffic-light dots (`#ef4444 / #f59e0b / #22c55e`) + `agent@algogenie ~` title bar in `--mono`.
- Content: Live typewriter streams actual AlgoGenie boot sequence:
  ```
  agent@algogenie ~ $ init
  > loading tools...        [40ms/char delay]
  > 12 tools registered     
  > 3 agents spawned        
  > session ready ✓         [green --success]
  ```
- Lines appear sequentially via JS typewriter. Loop pauses 3s at completion, then restarts.
- This is a LIVE component (genuinely animated, not a static div). Classified as: real component preview.
- Hidden below `768px` (becomes noise on mobile). `display: none` at `<768px`.

**Canvas particle system — "Neural Mesh"** (algorithmic-art philosophy):
- Philosophy: agent nodes communicating via weighted connections. Every node pulse = a thought. Every line = a handoff.
- Implementation: Vanilla HTML5 Canvas API (NOT p5.js — CDN overkill, raw canvas = zero cost).
- `~80` particles desktop, `~40` tablet, `~25` if `navigator.hardwareConcurrency < 4`.
- Each particle: radius `1.5–3px`, `--ink` fill at `15–25%` opacity, Perlin-noise drift.
- Connection lines: when `dist(a,b) < 120px`, opacity = `(1 - dist/120) * 0.12`, 1px stroke.
- Mouse proximity (150px): soft repel, force `0.3`, smooth vector math. No snap, no jump.
- Fixed seed: `const SEED = 8506` (Tanmay's own number — makes it reproducible).
- `requestAnimationFrame` loop.
- `prefers-reduced-motion: reduce` → canvas freezes after first render (static snapshot).
- Canvas: `position: absolute`, `z-index: var(--z-canvas)`, `pointer-events: none`.
- Max canvas opacity: `0.35` — atmosphere, not foreground.

**Error prevention:**
- Debounce resize 150ms, re-init particle positions only (no full teardown).
- `document.visibilityState` check — pause typewriter on hidden tab.
- `min-height: 100dvh` on hero section (NOT `height: 100vh` — iOS Safari address bar bug).
- Hero top padding max `pt-24` (6rem) — content does not float halfway down.

---

### Section 3 — Projects (Asymmetric Bento Grid)

**Zero identical card templates.** Each card gets unique inner treatment. No 3-column equal grid (banned).

**6 projects with real tech stacks:**

| Project | Stack | Category |
|---|---|---|
| **AlgoGenie** | AutoGen, Python, Docker, asyncio | Agentic AI |
| **LitRev** | AutoGen, Groq/Llama-3.3, arXiv API, Streamlit | Agentic AI |
| **PersonaBot** | Groq, Python, Gradio, WhatsApp/Instagram parser | Agentic AI |
| **Visionary** | React, Express.js, PostgreSQL, JWT, Knex, bcrypt | Full-Stack |
| **HR Absenteeism Predictor** | FastAPI, Scikit-learn, SQLite, Pandas, Tableau | ML + Data |
| **StudyAI** | Python, NLP, PDF parsing, DU question papers | ML + Data |

**Bento Grid Layout (CSS Grid named areas):**

```
Desktop (1280px+):
┌────────────────────┬─────────────┬──────────────┐
│  AlgoGenie         │  LitRev     │  Visionary   │
│  (wide — 2 cols)   │  (tall)     │  (tall)      │
├────────────────────┤             │              │
│  PersonaBot        ├─────────────┤              │
│  (mid)             │ HR Absent.  │              │
│                    │ (short)     │              │
├────────────────────┴─────────────┴──────────────┤
│  StudyAI (full-width short)                     │
└──────────────────────────────────────────────────┘

Tablet (768–1280px): 2 columns
Mobile (<768px): 1 column
```

**Unique inner treatment per card (pure HTML/CSS/JS, zero images):**

| Project | Card Shape | Inner Visual |
|---|---|---|
| **AlgoGenie** | Wide hero (2-col span) | Animated agent conversation: `[Coder] > Writing solution... [Executor] > Running in Docker... ✓` |
| **LitRev** | Tall | Three-step flow: `[User Topic] → [Search Agent/arXiv] → [Summarizer/Groq] → [Review.md]` in mono |
| **PersonaBot** | Mid | Two-bubble chat mockup: uploaded chat style → bot reply style in different ink |
| **Visionary** | Tall | HTTP request/response status strip: `POST /predict → 200 OK · 12ms` |
| **HR Absenteeism** | Short | Single accuracy stat: `76.43%` large, `Logistic Regression · 700 records` below in mono |
| **StudyAI** | Full-width short | Tag cloud: `NEP/UGCF 2022 · DU Papers · NLP · PDF → Notes` arranged naturally |

**Filter bar (above grid):**
```
[All]  [Agentic AI]  [Full-Stack]  [ML + Data]
```
- Pill toggles, `--r-pill`. Selected: `--surface-2` bg + `--ink`. Unselected: `--canvas` bg + `--ink-subtle`.
- Filter via `dataset.category` on each card.
- Animation: filtered-out cards → `opacity: 0; pointer-events: none`. NOT `display: none` (breaks CSS transitions).
- Enter transition: `opacity + translateY(8px → 0)`, `200ms ease-out`.

**"Currently Building" rotating badge** (above filter bar):
```
[ Currently building → AlgoGenie v2 ]
```
Text rotates through 2 items with `clip-path: inset(0 0 100% 0)` → `inset(0)` slide-up, `3s` interval. Specific, live, memorable.

**Card anatomy (impeccable §ghost-card ban enforced):**
- `--surface-1` bg, `1px --hairline` border, `--r-lg: 12px`.
- Hover: bg → `--surface-2`, border → `--hairline-strong`. `transition: background 200ms ease-out, border-color 200ms ease-out`.
- ZERO `box-shadow` on cards. ZERO shadow + border pairing (ghost-card ban).
- ZERO image scale on hover.
- Tag pills: `--r-sm`, `--surface-3`, `--ink-subtle`, `--body-sm`.
- Footer row: GitHub icon link + live demo link. No duplicate CTAs.

**Bento Cell Count check**: 6 items → 6 cells. Zero empty cells. Passes.
**Bento Background Diversity**: AlgoGenie (animated mono text on dark), HR Absenteeism (large number with `--accent` tint), full-width StudyAI (tag cloud). 3 cells with real visual variation. Passes.

---

### Section 4 — Skills (Two-Column Competency Table)

NOT an icon grid. NOT 3-column equal cards (banned). Feels like a technical spec sheet.

**Left Column — Competency Map with CSS Progress Bars:**

```
AI Orchestration       ███████████░  Expert
Multi-Agent Systems    ████████████  Expert
LangGraph              ██████████░░  Advanced
Python                 ████████████  Expert
JavaScript/TS          ██████████░░  Advanced
FastAPI/Flask          █████████░░░  Advanced
PostgreSQL/SQL         █████████░░░  Advanced
Docker/Redis           ████████░░░░  Proficient
```

- Bars: 100% CSS. `--accent` fill on `--surface-3` track. `border-radius: 2px`.
- Labels: `Expert · Advanced · Proficient` — NOT percentages (meaningless on a portfolio).
- Animate `width: 0 → final` on scroll via `IntersectionObserver` threshold `0.3`.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-quart). Duration `800ms` staggered.
- `aria-label="Expert"` on bar. `aria-hidden="true"` on visual element.

**Right Column — Tool Tags:**

`AutoGen · LangGraph · Pydantic AI · Ollama · Groq · React · FastAPI · Docker · Redis · SQLite · Playwright · Tableau · Scikit-Learn · TensorFlow · Asyncio · Knex`

- `--r-pill`, `--surface-2` bg, `1px --hairline` border, `--ink-subtle` text, `--body-sm`.
- Hover: border → `--accent`, text → `--ink`. `transition: 150ms ease-out`.

**Agent Status Ticker** (below skill bars, 1 line):
```
◉  12 tools registered  ·  3 agents online  ·  Session active
```
Numbers count up `0 → final` in `800ms` with `easeOutQuart` on section reveal. `--mono` font. `--ink-subtle` text. Thematic and memorable.

---

### Section 5 — Timeline (Vertical Changelog)

Reads like a product changelog. NOT a numbered list (banned). NOT `border-left` side-stripe (banned).

```
●── 2024  Udemy — "AI Agents in Python" Certificate
│         LangGraph, AutoGen, Multi-Agent Orchestration
│
●── 2024  Acharya Narendra Dev College — B.Sc. (Hons) Computer Science
│         Data Structures · OS · DBMS · Web Technologies · Python
│
●── 2023  Started building AI-first products full-time
│         AlgoGenie, LitRev, PersonaBot — shipped to GitHub
│
●── 2022  First Python project. Started with 100 days of code.
```

- Vertical line: `2px --hairline`, left-aligned, `--r-pill`.
- Dot: `8px --accent` filled circle. NOT a border-left side-stripe on the card.
- Year: `--mono`, `--ink-subtle`.
- Title: `--headline`, `--ink`, `font-weight: 600`.
- Description: `--body-sm`, `--ink-muted`.
- Staggered entrance: `opacity + translateX(-12px → 0)` via `IntersectionObserver`.
- **Reveal safety**: all content visible by default at `opacity: 1`. Animation is additive enhancement. Headless renders and hidden-tab pauses never gate content.

---

### Section 6 — Contact (Two-Column Form)

**Left column** — copy block + quick-contact links.

```
Want to build something?

tanmay8506@gmail.com  [Copy]

GitHub → github.com/tanmay8506
LinkedIn → linkedin.com/in/tanmay-gemini-864005273
```

**Click-to-copy email:**
- Click → `navigator.clipboard.writeText()`.
- Button label swaps to `Copied ✓` for 2000ms. Reverts.
- Tooltip: simple `--surface-2` pill, `--ink-subtle` text. ZERO `backdrop-filter` (glassmorphism ban).
- `try/catch` fallback using `document.execCommand('copy')` for HTTP contexts.

**Right column — Contact Form:**
- Fields: Name · Email · Message.
- `--surface-1` inputs, `--r-md`, `1px --hairline` border.
- Focus: `2px --accent-focus` outline at `50%` opacity.
- ZERO glassmorphism on form panel (`--surface-1` solid, no `backdrop-filter`).
- Submit button: `--accent` bg, label `"Send Message"` (verb + object per impeccable copy rules).
- Form action: `mailto:tanmay8506@gmail.com` fallback for no-JS.

---

### Section 7 — Footer

```
[T]                           Work  Skills  Timeline  Contact
Tanmay — AI Product Engineer  GitHub  LinkedIn
                              © 2026 Tanmay. Built with care.
```

- `--canvas` bg, `--hairline` top border, `--ink-subtle` text, `--body-sm`.
- Two columns: left = **T** monogram + tagline. Right = nav links + socials.
- Period, not dash, not em dash in copyright line.
- ZERO background decoration, ZERO gradient stripe, ZERO `repeating-linear-gradient` (banned).

---

## 7. CREATIVE DIFFERENTIATORS (No Holds Barred)

### 1. Agent Status Ticker (Hero + Skills)
Real-looking live system status. Numbers count up on load. Thematic to AI orchestration.

### 2. Per-Section Unique Reveal Animations (motivated, not uniform)
Per taste-skill §skill-motion-no-section-fade — each section reveal fits what it reveals:
- **Hero**: Already visible. No entrance gate.
- **Projects**: Cards stagger `translateY(20px → 0)` + `opacity`. Justification: hierarchy — draws eye top-left to bottom-right.
- **Skills**: Bars fill `width: 0 → final`. Justification: storytelling — simulates real-time assessment.
- **Timeline**: Items slide `translateX(-12px → 0)`. Justification: narrative — items arrive left-to-right as in a changelog.
- **Contact**: Fade only (`opacity: 0 → 1`). No transform — it's a form, not a hero.

### 3. Project Card Micro-Preview Inner Widgets
Each project card has a bespoke live inner visual built from pure HTML/CSS/JS. Not a screenshot. Not a div rectangle. A real animated/interactive component. See Section 6, Projects.

### 4. Keyboard Navigation
```
G then H   → scroll to Hero (top)
G then P   → scroll to Projects
G then S   → scroll to Skills
G then C   → scroll to Contact
```
GitHub-style chord navigation. 5% of visitors find it. 100% remember it.

### 5. "Available" Pill Links to Contact
`href="#contact"` — click auto-focuses the name field and populates subject with `"Let's collaborate"` via URLSearchParams.

### 6. "Currently Building" Rotating Badge
`clip-path` slide-up animation cycles through AlgoGenie v2 and LitRev v2. Specific, live, not generic.

### 7. Directional Hover Fill on CTAs
Primary CTA fill enters from the LEFT of the cursor's actual position. Uses `::before` pseudo-element with `transform: translateX(-100%) → 0`. No JS, pure CSS.

---

## 8. MOTION RULES (taste-skill §4 + impeccable §motion)

All motion in this project uses **pure CSS transitions + IntersectionObserver + requestAnimationFrame** (no GSAP, no Motion library — pure HTML/CSS/JS project).

| Motion | Trigger | Property | Duration | Easing | Justification |
|---|---|---|---|---|---|
| Nav link active | IntersectionObserver | `color` | `150ms` | `ease-out` | State feedback |
| Card hover lift | `:hover` | `background-color`, `border-color` | `200ms` | `ease-out` | Interactive affordance |
| Filter card exit | JS class toggle | `opacity`, `transform` | `200ms` | `ease-out` | State transition |
| Skill bar fill | IntersectionObserver | `width` | `800ms` staggered | `cubic-bezier(0.16,1,0.3,1)` | Storytelling |
| Project card enter | IntersectionObserver | `opacity`, `translateY` | `600ms` staggered | `cubic-bezier(0.16,1,0.3,1)` | Hierarchy |
| Timeline item enter | IntersectionObserver | `opacity`, `translateX` | `500ms` staggered | `cubic-bezier(0.16,1,0.3,1)` | Narrative |
| Contact fade | IntersectionObserver | `opacity` | `400ms` | `ease-out` | Reveal |
| Counter animation | `requestAnimationFrame` | DOM `.textContent` | `800ms` | `easeOutQuart` | Feedback |
| Typewriter | `setInterval` | DOM `.textContent` | `40ms/char` | — | Identity/theme |
| Canvas particles | `requestAnimationFrame` | Canvas 2D | 60fps | — | Atmosphere/identity |

**Hard bans (no exceptions):**
- `window.addEventListener('scroll', ...)` — banned. Use `IntersectionObserver`.
- Animating `top`, `left`, `width`, `height` — banned. Only `transform` and `opacity` (GPU-accelerated).
- `prefers-reduced-motion: reduce` → ALL animations collapse to static/instant. Every rule.

**Reduced motion implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```
Plus JS: `const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches` — skip all JS animations if true.

---

## 9. ABSOLUTE DESIGN BANS CHECKLIST

Sourced from `impeccable-main/SKILL.src.md` + `taste-skill/SKILL.md §9`. These are match-and-refuse. Zero tolerance.

**Structural bans:**
- [ ] ZERO `border-left/right > 1px` as colored accent (side-stripes on cards, timeline items)
- [ ] ZERO `background-clip: text` + gradient (gradient text)
- [ ] ZERO `backdrop-filter` used decoratively (glassmorphism default). Only where meaningful.
- [ ] ZERO hero-metric template (big number + stat + gradient = SaaS cliché)
- [ ] ZERO identical icon+heading+text card grid repeated
- [ ] ZERO uppercase tracking eyebrows on any section header
- [ ] ZERO `01/02/03` numbered section markers
- [ ] ZERO text overflow at any breakpoint (test at 360px, 768px, 1280px)
- [ ] ZERO `border: 1px + box-shadow (blur > 8px)` on same element (ghost-card)
- [ ] ZERO `border-radius > 16px` on any card or panel
- [ ] ZERO hand-drawn/sketchy SVG illustrations (no `feTurbulence`, no "doodle" paths)
- [ ] ZERO `repeating-linear-gradient` stripe backgrounds
- [ ] ZERO `h-screen` — use `min-h-[100dvh]` for hero
- [ ] ZERO 3-column equal feature cards
- [ ] ZERO custom mouse cursor / cursor trail (taste-skill §9.A: "Outdated, accessibility-hostile, perf-hostile.")
- [ ] ZERO scroll cue text (`Scroll`, `↓ scroll`, `Scroll to explore`) — banned taste-skill §9.F
- [ ] ZERO decorative status dots (except the open-to-work pill which carries real semantic state)
- [ ] ZERO locale/city/time/weather strips in header/footer
- [ ] ZERO version labels in hero (BETA, ALPHA, V0.6)
- [ ] ZERO section-number eyebrows (`00 / INDEX`, `001 · Capabilities`)
- [ ] ZERO middle-dot (`·`) used more than once per line in meta strips
- [ ] ZERO `border-t + border-b` on every row of lists
- [ ] ZERO floating top-right sub-text in section headings (Split-Header Ban)
- [ ] ZERO decoration text strip at hero bottom (`BRAND. MOTION. SPATIAL.`)
- [ ] ZERO pills/labels overlaid on images
- [ ] ZERO photo-credit captions as decoration

**Copy bans:**
- [ ] ZERO em dashes (`—`) anywhere. Headlines, body, pills, attribution, captions. ZERO.
- [ ] ZERO marketing buzzwords: seamless, robust, cutting-edge, leverage, empower, supercharge, next-gen, world-class, enterprise-grade, revolutionize
- [ ] ZERO aphoristic-cadence body copy ("Not just a developer. A builder.")
- [ ] ZERO fake-precise invented numbers (do not write `92%` unless it's the real model accuracy)
- [ ] ZERO "X theater" / "actually X" copy patterns
- [ ] ZERO placeholder names like "John Doe", "Sarah Chan"
- [ ] ZERO duplicate CTA intent (only one "contact" CTA across the entire page)

**Font bans:**
- [ ] ZERO Inter (reflex-reject list). We use Geist Sans.
- [ ] ZERO Space Grotesk, Outfit, DM Sans, Fraunces, Instrument Serif (all reflex-reject)

---

## 10. COMPLETE PRE-FLIGHT CHECKLIST

(taste-skill §14 — every box mandatory before declaring done)

**Design foundations:**
- [ ] Design read declared (Section 0)
- [ ] Dial values explicit and reasoned (Section 1): 6 / 5 / 4
- [ ] Aesthetic labeled honestly: Linear-style native CSS (no real design system installed)
- [ ] ZERO em-dashes anywhere on the page (Section 9)
- [ ] Page Theme Lock: ONE dark theme. No section flips to light mid-page
- [ ] Color Consistency Lock: `--accent` used identically across all sections
- [ ] Shape Consistency Lock: one corner-radius system applied everywhere (see §4)

**Accessibility and contrast:**
- [ ] Button Contrast: every CTA text readable against bg (WCAG AA 4.5:1)
- [ ] CTA Button Wrap: no CTA label wraps to 2+ lines at desktop
- [ ] Form Contrast: inputs, placeholders, focus rings, labels all pass WCAG AA
- [ ] `aria-label` on logo anchor, skill bars, interactive elements
- [ ] `aria-hidden="true"` on purely decorative elements
- [ ] Tab order logical through all interactive elements
- [ ] Focus rings visible at 2px `--accent-focus`

**Typography:**
- [ ] Font count: Geist Sans + Geist Mono = 2. Under max of 3. Passes.
- [ ] No Fraunces, no Instrument Serif, no Inter, no Space Grotesk
- [ ] Hero: `clamp()` max ≤ 5rem. Compliant.
- [ ] Letter-spacing floor: `-0.03em`. Compliant.
- [ ] Body line length: `max-width: 65ch`. Compliant.
- [ ] `text-wrap: balance` on H1–H3

**Hero:**
- [ ] Hero fits viewport: headline ≤ 2 lines, subhead ≤ 20 words, CTA visible without scroll
- [ ] Hero top padding ≤ `pt-24` (6rem). Hero content does not float halfway down.
- [ ] Hero stack: 4 elements only (status pill, H1, subhead, CTAs). No tagline below CTAs.
- [ ] Left-aligned hero (DESIGN_VARIANCE = 6, anti-center bias applied)
- [ ] No "Used by / Trusted by" logo wall in hero

**Layout and sections:**
- [ ] Eyebrow count: 0/7 sections. Max allowed = 3. Passes.
- [ ] Navigation on ONE line at 1024px+. Height = 56px (under 80px max). Passes.
- [ ] Section-Layout-Repetition: 5 distinct families used. Passes.
- [ ] Zigzag Alternation Cap: no 3+ consecutive image+text-split sections
- [ ] No Duplicate CTA Intent: "View My Work" (project) + "Hire Me" (nav) — different intents. "Send Message" only in contact. Passes.
- [ ] Bento: 6 items → 6 cells. Zero empty cells.
- [ ] Bento Background Diversity: 3+ cells with visual variation (not all same-bg text)
- [ ] Mobile collapse explicit for every multi-column layout

**Motion:**
- [ ] Every animation motivated in one sentence (see §8 table)
- [ ] ZERO `window.addEventListener('scroll')` — using IntersectionObserver only
- [ ] Reduced motion: all animations collapse with `prefers-reduced-motion: reduce`
- [ ] Canvas pauses on `document.visibilityState === 'hidden'`
- [ ] `min-h-[100dvh]` on hero, not `height: 100vh`
- [ ] Reveal safety: content visible by default; animations additive only

**Performance:**
- [ ] Canvas particle cap: `hardwareConcurrency < 4` → drop to 25 particles
- [ ] Resize debounced 150ms
- [ ] `will-change: transform` only on actively animating elements, removed after
- [ ] No animating `top/left/width/height` — `transform` and `opacity` only (GPU compositing)

**Copy quality:**
- [ ] Every visible string re-read. No grammatically-broken or AI-hallucinated phrases
- [ ] Subhead exactly 15 words, zero buzzwords
- [ ] Button labels: verb + object (`Send Message`, `View My Work`, `Hire Me`, `Resume`)
- [ ] Real accuracy numbers: 76.43% (from actual HR Absenteeism README, real data)
- [ ] No fake-precise invented numbers

**Correctness:**
- [ ] `<form action="mailto:tanmay8506@gmail.com">` as no-JS fallback
- [ ] `navigator.clipboard` with `try/catch` + `execCommand` fallback for HTTP
- [ ] No text overflow at 360px, 768px, 1280px (Playwright automated check)

---

## 11. PROJECT DATA (Complete, sourced from README files)

### AlgoGenie
- **Stack**: AutoGen (`autogen_agentchat`), Python, Docker, asyncio, `RoundRobinGroupChat`
- **What it does**: Multi-agent DSA team (Coder + Executor agents). Coder writes Python. Executor runs it in a Docker sandbox. Streams results back.
- **Card inner visual**: Animated agent dialogue stream: `[Coder] Writing solution... → [Executor] Running in Docker... → ✓ Passed`
- **Tags**: `AutoGen · Python · Docker · asyncio`
- **Category**: `Agentic AI`

### LitRev
- **Stack**: AutoGen (`RoundRobinGroupChat`), Groq API (Llama-3.3-70b-versatile), arXiv API, Streamlit, Pydantic, asyncio
- **What it does**: 2-agent literature reviewer. Search Agent queries arXiv autonomously. Summarizer Agent synthesizes structured Markdown review. Streams agent-to-agent dialogue to Streamlit.
- **Card inner visual**: Pipeline flow in mono: `[User Topic] → [Search Agent/arXiv] → [Summarizer/Groq] → [Review.md]`
- **Tags**: `AutoGen · Groq · arXiv · Streamlit`
- **Category**: `Agentic AI`

### PersonaBot
- **Stack**: Groq (LLM backend), Python, Gradio/browser (port 7860), WhatsApp `.txt` parser, Instagram/Messenger HTML parser
- **What it does**: Upload a WhatsApp or HTML chat export. Talk to a digital clone of anyone in it. System prompt built from detected message style.
- **Card inner visual**: Two-bubble chat: `[User] Hey, you there? → [Clone] Yeah what up, saw ur msg earlier lol`
- **Tags**: `Groq · Python · NLP · Gradio`
- **Category**: `Agentic AI`

### Visionary
- **Stack**: React, Express.js, PostgreSQL, JWT (jsonwebtoken), bcrypt, Knex.js (query builder), dotenv
- **What it does**: Full-stack web app with user authentication, protected routes, PostgreSQL persistence. Register/Login/Profile flow with JWT tokens (7-day expiry).
- **Card inner visual**: HTTP status strip: `POST /register → 201 Created · POST /signin → 200 OK · GET /profile → 401 Unauthorized`
- **Tags**: `React · Express · PostgreSQL · JWT`
- **Category**: `Full-Stack`

### HR Absenteeism Predictor
- **Stack**: Python, Scikit-learn (Logistic Regression), FastAPI, SQLite, SQLAlchemy, Pandas, NumPy, Tableau Public
- **What it does**: End-to-end ML pipeline on 700 HR records. Predicts binary absenteeism. FastAPI REST API with Pydantic input validation, batch predictions, SQLite persistence, Tableau export.
- **Real accuracy**: 76.43% (from actual model output)
- **Card inner visual**: `76.43%` large in `--ink`, `Logistic Regression · 700 records` in mono below. One clean number.
- **Tags**: `FastAPI · Scikit-learn · SQLite · Tableau`
- **Category**: `ML + Data`

### StudyAI
- **Stack**: Python, PDF parsing, NLP, DU/NEP/UGCF 2022 question papers
- **What it does**: Generates structured study notes from past exam papers for Delhi University B.Sc. NEP/UGCF 2022.
- **Card inner visual**: Tag cloud: `NEP/UGCF 2022 · DU Papers · PDF Parser · NLP · Notes Generator`
- **Tags**: `Python · NLP · PDF · DU`
- **Category**: `ML + Data`

---

## 12. BUILD ORDER (when you say "go")

```
Step 1: Scaffold
  └── npx create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir=no
  └── Install: framer-motion, shadcn/ui (init), magic-ui components
  └── Configure tsconfig.json strict mode
  └── Set up next.config.ts (output: 'export' for static, image optimization)

Step 2: Design Foundation
  └── app/globals.css — Tailwind v4 @theme tokens (all CSS variables from §2, §3, §4)
  └── lib/utils.ts — cn() utility
  └── lib/hooks/use-reduced-motion.ts
  └── lib/hooks/use-intersection.ts

Step 3: Data Layer
  └── portfolio.config.ts — ALL content (projects, skills, timeline, links)
  └── Type definitions for Project, Skill, TimelineEntry

Step 4: Shared Components (bottom-up)
  └── components/ui/ — shadcn Button, Input, Textarea
  └── components/shared/canvas-background.tsx — Neural Mesh particle system
  └── components/shared/terminal-widget.tsx — Typewriter boot sequence
  └── components/shared/project-card.tsx — Bento card with inner widget
  └── components/shared/skill-bar.tsx — Animated progress bar
  └── components/shared/status-pill.tsx — Availability indicator
  └── components/shared/rotating-badge.tsx — clip-path cycle badge
  └── components/shared/copy-button.tsx — Clipboard with fallback

Step 5: Section Components
  └── components/layout/nav.tsx
  └── components/sections/hero.tsx
  └── components/sections/projects.tsx
  └── components/sections/skills.tsx
  └── components/sections/timeline.tsx
  └── components/sections/contact.tsx
  └── components/layout/footer.tsx

Step 6: Root App
  └── app/layout.tsx — metadata, Geist font, dark theme, providers
  └── app/page.tsx — assemble all sections

Step 7: SEO & Meta
  └── generateMetadata() in layout.tsx — title, description, OG, canonical
  └── Inline SVG favicon via metadata.icons

Step 8: Verification
  └── npm run build — zero TypeScript errors, zero ESLint warnings
  └── npm run dev — visual review at localhost:3000
  └── Chrome DevTools: 60fps canvas, no layout shift
  └── Vercel deploy — production URL for final check
```

> **Bottom-up build** = shared components first, pages last. Zero broken imports.
> **Data layer first** = portfolio.config.ts populated before any component renders.

---

## 13. VERIFICATION PLAN

### Automated (Playwright)
1. `python -m http.server 3000` in `Portfoliov3/`
2. Screenshots at `360x780` (small mobile), `768x1024` (tablet), `1440x900` (MacBook)
3. Assert: all nav links scroll to correct sections (anchor IDs match)
4. Assert: email copy button → clipboard content = `tanmay8506@gmail.com`
5. Assert: tab order through all interactive elements → focus ring visible at each stop
6. Assert: no text overflow (`element.scrollWidth > element.offsetWidth`)
7. Assert: keyboard shortcuts `G P` → projects section in view
8. Axe accessibility scan → WCAG AA minimum

### Manual Checks
- Canvas particle system smooth at 60fps (DevTools Performance tab, no frame drops)
- Typewriter terminal timing feels natural (not too fast, not too slow)
- Skill bar animation fires correctly on first scroll into view
- Filter animations leave zero ghost layout holes
- Mobile hamburger open/close works, drawer overlays canvas correctly
- Contact form `mailto:` fallback works with JS disabled
- Both focus rings visible (keyboard navigation through entire page)
- Prefers-reduced-motion: disable all animations in OS accessibility settings, verify page is fully readable

---

## 14. SEO META (include in `<head>`)

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <title>Tanmay — AI Product Engineer | Multi-Agent Systems</title>
  <meta name="description" content="Tanmay builds multi-agent AI systems with Python, LangGraph, and AutoGen — shipped to production, not demos. Open to senior AI engineering roles.">
  <meta property="og:title" content="Tanmay — AI Product Engineer">
  <meta property="og:description" content="Multi-agent systems. Python + LangGraph + AutoGen. Production, not demos.">
  <meta property="og:type" content="website">
  <link rel="canonical" href="https://tanmay.dev">
  <!-- Favicon: inline SVG monogram in --accent #5e6ad2 -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%235e6ad2'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='sans-serif' font-weight='700' font-size='18' fill='%23fff'>T</text></svg>">
</head>
```

---

## 15. WHAT WAS CORRECTED FROM V1 PLAN

(Discipline log — these were skill violations found during deep audit)

| Issue in v1 | Correction | Source Rule |
|---|---|---|
| Centered hero | Left-aligned split hero (text left, terminal right) | taste-skill §4.3 Anti-Center Bias: VARIANCE=6 forces split |
| Cursor trail | REMOVED entirely | taste-skill §9.A: "NO custom mouse cursors. Outdated, accessibility-hostile, perf-hostile." |
| "↓ Scroll to explore" indicator | REMOVED entirely | taste-skill §9.F: Scroll cues are banned |
| Missing dial declaration | VARIANCE=6, MOTION=5, DENSITY=4 explicitly set | taste-skill §1 — required before any layout decision |
| Missing design read one-liner | Added to Section 0 | taste-skill §0.B — required before code |
| Terminal widget as "fake screenshot" risk | Specified as live animated component (not a screenshot mockup) | taste-skill §9.F: fake div terminals in hero are banned |
| Missing project detail (LitRev, PersonaBot, Visionary, HR) | Full stack + real descriptions added from README files | Plan accuracy |
| StudyAI description vague | `DU NEP/UGCF 2022 question papers → structured notes` | README scan |
| HR Absenteeism accuracy | `76.43%` from real model output | README (real data, not invented) |
| Missing reduced-motion JS gate | `window.matchMedia('(prefers-reduced-motion: reduce)')` check before all JS animations | taste-skill §6.B |
| Missing `min-h-[100dvh]` rule | Explicitly specified for hero | taste-skill §3.E: "NEVER use `h-screen`" |
| `window.scroll` listener (implicit risk) | Explicitly banned. IntersectionObserver only. | taste-skill §5.D: hard ban |

---

*Skill references used in building this plan:*
- *Linear tokens: [`SKILLS/awesome-design-md-main/design-md/linear.app/DESIGN.md`](file:///c:/Users/lenovo/tanmay-projects/Portfoliov3/SKILLS/awesome-design-md-main/design-md/linear.app/DESIGN.md)*
- *Design bans: [`SKILLS/impeccable-main/skill/SKILL.src.md`](file:///c:/Users/lenovo/tanmay-projects/Portfoliov3/SKILLS/impeccable-main/skill/SKILL.src.md)*
- *Brand register: [`SKILLS/impeccable-main/skill/reference/brand.md`](file:///c:/Users/lenovo/tanmay-projects/Portfoliov3/SKILLS/impeccable-main/skill/reference/brand.md)*
- *Layout/motion dials: [`SKILLS/taste-skill-main/skills/taste-skill/SKILL.md`](file:///c:/Users/lenovo/tanmay-projects/Portfoliov3/SKILLS/taste-skill-main/skills/taste-skill/SKILL.md)*
- *Frontend aesthetics: [`SKILLS/frontend-design/frontend.md`](file:///c:/Users/lenovo/tanmay-projects/Portfoliov3/SKILLS/frontend-design/frontend.md)*
- *Canvas philosophy: [`SKILLS/algorithmic-art/algorithmic-art.md`](file:///c:/Users/lenovo/tanmay-projects/Portfoliov3/SKILLS/algorithmic-art/algorithmic-art.md)*
- *UI design system: [`SKILLS/ui-ux-pro-max-skill-main/README.md`](file:///c:/Users/lenovo/tanmay-projects/Portfoliov3/SKILLS/ui-ux-pro-max-skill-main/README.md)*
- *Testing: [`SKILLS/webapp-testing/`](file:///c:/Users/lenovo/tanmay-projects/Portfoliov3/SKILLS/webapp-testing/)*
