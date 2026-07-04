# Learn HTML Gfx

A Duolingo/Memrise-style learning app that teaches complete beginners how to build **HTML
broadcast graphics** — the kind played out by **SPX Graphics / CasparCG** (lower thirds, bugs,
tickers, full-screens) — in small, gamified, spaced-repetition steps.

Sibling project: [`HTML-GFX-Builder`](https://github.com/miwco/HTML-GFX-Builder) is the AI-assisted
SPX template builder these students graduate into. This app teaches the reading fluency and
small-edit confidence to use that tool (or any AI/template) well; it isn't a builder itself.

## Status

Pre-planning. No tech stack or code yet — see below.

## Where to start

1. Read **[`docs/COURSE_PLANNING_PROMPT.md`](docs/COURSE_PLANNING_PROMPT.md)** — the paste-ready
   brief for planning the full curriculum (course map → units → lesson-by-lesson plans →
   progression/mastery model → gamification → app architecture, in that order, learning-first).
2. Reference docs carried over from the builder project, needed to keep lesson content technically
   accurate:
   - **[`docs/reference/SPX_TEMPLATE_FORMAT.md`](docs/reference/SPX_TEMPLATE_FORMAT.md)** — the
     SPX HTML template contract (`SPXGCTemplateDefinition`, `play()/stop()/update()`, field → DOM
     convention). This is the ceiling of what the course teaches.
   - **[`docs/reference/DESIGN_LANGUAGE.md`](docs/reference/DESIGN_LANGUAGE.md)** — the taste and
     code-style rulebook from the builder project, so example templates in lessons read the same
     way a gfx-builder-generated template would.

Once the curriculum (course map + unit/lesson plans) is planned and approved, this README and
`CLAUDE.md` should be updated with the chosen platform, architecture, and dev commands.
