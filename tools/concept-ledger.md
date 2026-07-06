# Concept Ledger (audit reference)

The authoritative timeline of what each lesson may use. Source: unit-plans.md + each
unit's lesson plan. The **no-untaught-tokens rule**: any code a student SEES or EDITS in
lesson N may contain only tokens introduced at or before lesson N (earlier lessons in the
same unit count as "before"). Exception: tokens explicitly sealed as "trust it for now"
(listed under Seals) may appear as fixed, unexplained boilerplate.

## Vocabulary timeline (cumulative - each lesson ADDS its token[s])

**Unit 0 (no code written; observe-only cockpit tour):** graphic-type vocabulary
(lower third, corner bug, ticker, full-screen); "it's a web page / .html / template";
HTML vs CSS vs JS by sight only. No editable code.

**Unit 1 (HTML content):**
- 1.1 code<->screen correspondence (observe only)
- 1.2 PLAY/STOP as operator commands (buttons real; mechanism sealed)
- 1.3 the 1920x1080 transparent canvas / keying
- 1.4 element = opening tag + content + closing tag; `<div>`
- 1.5 editing text content
- 1.6 `<span>` (inline) vs `<div>` (block)

**Unit 2 (structure):**
- 2.1 nesting (parent/child)
- 2.2 reading the tree / closing-tag matching / indentation
- 2.3 `id="..."`
- 2.4 `class="..."`
- 2.5 `<img src="...">` (void element)
- 2.6 the skeleton: `<head>`/`<body>`/`<style>`/`<script>` RECOGNIZE-ONLY (sealed)
- 2.7 review (no new token)

**Unit 3 (CSS look) - opens the `<style>` seal:**
- 3.1 CSS rule anatomy `selector { property: value; }` in `<style>`
- 3.2 element/tag selectors
- 3.3 `.class` and `#id` selectors
- 3.4 `color`, `background-color` with NAMED colors
- 3.5 hex colors `#0a3d91` (recognize-and-tweak)
- 3.6 `font-family` (+ fallback list)
- 3.7 `font-size` (px), `font-weight`
- 3.8 `padding`
- 3.9 review (no new token)
- WITHIN-UNIT ORDER: named colors only until 3.5; NO font props until 3.6; NO sizes
  until 3.7; NO padding until 3.8.

**Unit 4 (positioning):**
- 4.1 the 1920x1080 pixel grid, y grows downward (concept; no new CSS)
- 4.2 `position: absolute` + `top`/`left`
- 4.3 `right`/`bottom`
- 4.4 `margin` (vs padding)
- 4.5 safe areas (concept; standard positions)
- 4.6 stacking / `z-index` (recognize)
- 4.7 `opacity`
- 4.8 review (no new token)

**Unit 5 (CSS motion) - PLAY applies a state class (sealed: "Unit 7 opens buttons,
Unit 8 shows the switch"):**
- 5.1 `transform: translate(x, y)`
- 5.2 `transform: scale()`
- 5.3 `transition`; the `.on` state class; multi-class attribute
- 5.4 `ease-out` (entrances)
- 5.5 `ease-in` + faster (exits)
- 5.6 `transition-delay` / stagger
- 5.7 `@keyframes` + `animation-*` + `infinite`
- 5.8 review (no new token)

**Unit 6 (GSAP - first JS, CALLS only) - GSAP is loaded boilerplate (sealed):**
- 6.1 calling a function `gsap.to("#strap", {...})`
- 6.2 the settings object `{ x, y, scale, opacity }`
- 6.3 `duration`, `ease` ("power2.out"/"power2.in"/"none")
- 6.4 `gsap.from(...)`
- 6.5 `gsap.fromTo(...)`
- 6.6 `gsap.timeline()` + chained `.to`
- 6.7 position parameter `"-=0.2"`, `stagger`
- 6.8 review (no new token)
- GSAP SUBSET (canon - nothing outside this exists): targets are id strings "#x";
  props x, y (px), scale, opacity, duration, delay, ease, stagger; eases "none",
  "power1.out/in", "power2.out/in", "power2.inOut", "back.out"; timeline + position param.
- NO function DEFINITIONS in Unit 6 (those are 7.1).

**Unit 7 (the SPX contract) - opens PLAY-magic seal (7.2) and definition seal (7.8):**
- 7.1 DEFINING a function `function name() { ... }`
- 7.2 the play()/stop() lifecycle contract (SPX calls them)
- 7.3 `document.getElementById("id")` (id ALONE, no hash)
- 7.4 `.textContent`, `.src`
- 7.5 objects `data.f0`
- 7.6 `update(data)` + `JSON.parse(data)` + `|| ""` safety net
- 7.7 the fN<->id="fN" handshake; ids migrate name/title -> f0/f1
- 7.8 `window.SPXGCTemplateDefinition` + `DataFields` (field/ftype:"textfield"/title/value); last in `<head>`; first two fields = rundown preview
- 7.9 review (no new token)

**Unit 8 (reading unfamiliar templates) - opens the PLAY-state-class seal (8.4):**
- 8.1 the four-landmark skim (definition/body/styles/functions)
- 8.2 CSS variables `:root { --accent }` + `var(--accent)`
- 8.3 `@font-face` (recognize-and-edit)
- 8.4 `classList.add`/`remove`
- 8.5 `element.style.<camelCase>` + the `color` ftype
- 8.6 `steps` >= 2 + `next()` (Continue)
- 8.7 the four-suspect debugging method
- 8.8 do-not-rename list + one-change-then-play
- 8.9 (optional) the spxData/spxRenderer dialect - RECOGNITION ONLY, never executed

**Unit 9 (capstones):**
- 9.1 the rundown workflow (context)
- 9.2 wider ftypes: `dropdown`+`items`, `number`, `checkbox` ("0"/"1"), `textarea`
- 9.3-9.6 capstones (use only Units 0-8 toolkit + 9.2 ftypes)
- 9.7 delivery checklist (9 items)
- 9.8 folder convention + relative paths
- 9.9 (optional) real SPX

## Seals (trust-it-for-now) and their promised openings

| Seal placed | Opened |
|---|---|
| PLAY/STOP buttons "magic" (1.2) | mechanism glimpsed 5.3 (state class), contract 7.2, the class-switch 8.4 |
| the skeleton `<head>`/`<body>`/`<style>`/`<script>` (2.6) | `<style>` in 3.1; the definition in 7.8 |
| PLAY applies a state class (5.3) | 7.2 (buttons) / 8.4 (classList switch) |
| GSAP is loaded (6.1) | stays boilerplate (never "opened" - correct) |

## Canon (must be consistent everywhere)

- **Cast:** channel NN; presenters Maria Kranz (News Anchor), Tomas Berg (Sports
  Reporter), Alexandra Rivera (Weather), James Okafor (Political Correspondent), Priya
  Nair (Economics Editor, checkpoint 7); scores HIFK 3 - 2 TPS; Election Night full-screen.
- **Brand colors:** primary `#0a3d91` (blue), accent `#e8b90c` (amber).
- **Ids:** strap wrapper `#strap`; lines `name`/`title` until the 7.7 migration, then
  `f0`/`f1`; corner bug `#bug`; logo file `nn-logo.png`.
- **SPX facts:** classic-globals dialect (play/stop/update(JSON string)/next); definition
  last in `<head>`; first two DataFields = rundown preview; steps>=2 enables Continue/next();
  out = manual/none/ms; ftypes textfield/dropdown+items/number/checkbox("0"/"1")/textarea/color.
- **Punctuation:** plain dashes only (no em dashes); ASCII only.

## Recycling rule

Every skill should reappear in >= 2 later lessons in >= 1 other unit (the "Recycles"
lines are the contract). Units 8 and 9 are structurally whole-course recycling.
