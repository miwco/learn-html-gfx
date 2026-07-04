# CLAUDE.md

Guidance for AI agents working in this repo. Keep it accurate — update it when the curriculum is
planned and the app architecture is chosen.

## What this is

A **Duolingo/Memrise-style mobile & web learning app** that teaches complete beginners how to
build **HTML broadcast graphics** for **SPX Graphics / CasparCG** (lower thirds, bugs, tickers,
full-screens), one small step at a time.

Sibling project: **[`HTML-GFX-Builder`](https://github.com/miwco/HTML-GFX-Builder)** is the
AI-assisted SPX template builder these students graduate into. This app is not a builder — it
teaches the HTML/CSS/JS-for-graphics fundamentals and the SPX contract so students can read a
template someone (or something) else wrote and make small, correct edits with confidence, as well
as build the basics from scratch.

**The pillars (keep every planning and implementation decision true to these):**
- **Learning first, gamified second.** Pedagogy (course map, unit plans, lesson plans, mastery
  model) is designed and approved *before* any gamification or app-architecture work. Gamification
  must decorate the learning path, never distort it.
- **Really small steps.** One new concept per lesson. Nothing appears in an exercise before it has
  been explicitly taught (or flagged as "boilerplate, explained later").
- **Only what graphics need.** This is not a general web-dev course. Teach the minimal HTML/CSS/JS
  subset required for simple SPX broadcast templates — nothing else. See
  `docs/COURSE_PLANNING_PROMPT.md` §3 for the exact in-scope/out-of-scope list.
- **Basic templates only.** The graduation target is ordinary, clean templates (lower third,
  corner bug, full-screen title, basic ticker) — not clever or unusual ones.
- **Real output.** Capstone projects are working SPX templates that actually play out, per
  `docs/reference/SPX_TEMPLATE_FORMAT.md`.
- **Broadcast-real examples.** No `foo`/`bar` — presenter names, scores, weather, headlines.

## Current phase: curriculum planning

No tech stack or app code exists yet. The active work is planning the curriculum using
**[`docs/COURSE_PLANNING_PROMPT.md`](docs/COURSE_PLANNING_PROMPT.md)** — a paste-ready brief that
walks through: course map → unit plans → lesson-by-lesson plans → progression/mastery model →
(only after those are approved) gamification plan → app/product outline.

If you are asked to continue curriculum planning, follow that prompt's process and ordering:
**one deliverable at a time, pausing for approval**, never skipping ahead to gamification or app
architecture before the pedagogy is signed off.

## Reference docs (carried over from `HTML-GFX-Builder`)

- **`docs/reference/SPX_TEMPLATE_FORMAT.md`** — the SPX HTML template contract. This is the
  technical ceiling of what the course teaches: `window.SPXGCTemplateDefinition`, the
  `play()/stop()/update(data)/next(data)` lifecycle, and the `fN` → `id="fN"` field convention.
  Any lesson example claiming to be a valid SPX template must follow this.
- **`docs/reference/DESIGN_LANGUAGE.md`** — the taste + code-style rulebook from the builder
  project (typography, color, spacing, motion, and the commented, teachable code style). Example
  templates written for lessons should look and read like code the builder itself would generate,
  so what students learn here transfers directly.

Both are copies for reference; treat `HTML-GFX-Builder` as the source of truth if they drift
(e.g. if SPX's contract changes there, sync the copy here).

## Once the curriculum is planned

Update this file with: the chosen platform (native/PWA/responsive-web), the exercise-player
architecture, the content authoring format for lessons, and dev commands — mirroring the level of
detail in `HTML-GFX-Builder/CLAUDE.md`.

## Git

- Repo default branch is `main`. No branching convention set yet beyond what the user requests per
  task — ask if unclear.
