# Whole-Course Consistency Audit

Scope: all 10 units - lesson plans (`lessons/unit-0N.md`) and app content
(`app/content/unit0N.js`) - checked against the concept ledger
(`tools/concept-ledger.md`). Method: a deterministic scanner
(`tools/audit_scan.js`), direct read-only inspection, the schema validator
(`tools/validate_content.js`), the full 425/425 browser drive, and parallel
semantic auditors.

## Verdict

**Ship-ready.** No blockers. The course is internally consistent: the token
timeline holds, every "trust it for now" seal opens where promised, SPX facts are
correct, and the cast/colors/ids/GSAP-subset are consistent. Only cosmetic nits
found, listed below.

## Dimensions checked and results

| Dimension | Method | Result |
|---|---|---|
| Schema conformance (425 exercises) | validate_content.js | 0 problems, 0 warnings |
| Playability (all 85 lessons) | full browser auto-drive | 425/425 pass, 0 JS errors, 7/7 operate |
| GSAP-subset conformance | scanner (exhaustive) | clean - no method/ease outside the shim |
| Encoding (ASCII/plain dashes) | scanner + grep | clean in content; 1 stray `section` char fixed in gamification-plan |
| Brand-color exactness | scanner (near-miss) | clean - no off-by-one hex near #0a3d91 / #e8b90c |
| Unit 5 is CSS-only (no JS shown) | scanner + inspection | clean |
| Unit 6 is calls-only (no defs shown) | scanner + inspection | clean - defs live only in hidden stage boilerplate |
| Unit 7 id migration (name/title -> f0/f1 at 7.7) | inspection | clean - boundary exactly at 7.7, incl. hand-authored 7.6-cp7 |
| Seal payoffs (4 major seals) | plan inspection | clean - all open where promised; explicit unseal map in unit-07 |
| SPX facts (definition last-in-head, JSON string, steps/next, ftypes) | plan inspection | clean |
| One-new-concept invariant | grep count | clean - reviews/capstones carry no new concept |
| Per-exercise token ordering (Units 0-9) | semantic auditors | see agent findings (appended below) |
| Recycling / dead-end skills | semantic auditor | see agent findings (appended below) |

## Findings and fixes

**Real issues found: 4. All fixed.**

1. **FIXED (MINOR) - Unit 0 lesson 0.2 had a `fill` exercise**, breaking Unit 0's
   observe-only rule. Converted to a `predict` (same three choices/feedback).
2. **FIXED (MAJOR, SPX fact) - Unit 9.5 called f2 a "dropdown" but implemented it as
   free hex entry** (color ftype). Added real `<select>` support to the operator panel
   (engine.js) and made f2 a genuine dropdown with preset color items (NN Blue /
   Result Red / Neutral Grey). This also gives the 9.2 dropdown ftype a real capstone
   payoff. Verified: the panel renders a select; the drive passes.
3. **FIXED (MAJOR, untaught tokens) - Unit 9.6 had the student edit `.split()`/
   `.join()`/`+`** in a capstone fill; none are taught (capstones are scoped to
   Units 0-8 + 9.2 ftypes). Converted to a reading-comprehension `predict` that frames
   the split/join as given boilerplate (matching the plan's intent); the actual
   splitting runs as hidden render.js support in the operate drive.
4. **FIXED (NIT) - unit-05.md 5.6 "Recycles" cited "4.4 ex. 6"** (only 5 exercises
   exist); corrected to "4.4 ex. 2".
5. **FIXED (NIT) - one non-ASCII `section` sign** in gamification-plan.md, replaced.

## Deliberate design decisions (not defects)

- **Unit 5.4 shows `ease-in` before 5.5 formally teaches it.** The approved plan does
  this on purpose: 5.4 ("entrances ease out") uses ease-in as the felt "creeps off then
  slams" contrast, always with its consequence shown, and 5.5 formalizes it for exits.
  Content matches the plan; the token is explained where shown. Kept as-is.
- **Name-swap demos (1.1, 7.4)** transiently show Tomas Berg (Sports Reporter) under a
  "News Anchor" title because the lesson changes only the name line. Intentional; the
  role is paired correctly elsewhere. Kept as-is.

## Accepted MINOR gaps (documented, not fixed - covered elsewhere)

- **`number` ftype (9.2)** is the one wider ftype never used in a capstone. It is
  recognize-level and analogous to textfield; low-stakes. Left as-is.
- **Checkpoint 5** exercises 5 of 7 unit-5 kernels; `scale` (5.2) and `@keyframes`
  (5.7) are tested in the 5.8 review remix and recur in Units 6/9, not at the
  checkpoint itself. Left as-is (changing the approved checkpoint spec is more invasive
  than the gap warrants).

## Semantic auditor findings

### Units 0-2 (exhaustive, 78 exercises)
- **FIXED - MINOR: Unit 0 lesson 0.2 contained a `fill` exercise**, violating Unit 0's
  "observe-only, no editable code" rule (the token `.html` was fine; the interaction
  type was not). Converted to a `predict` with the same three choices and feedback.
- unit01: CLEAN (32 exercises) - tag anatomy only manipulated from 1.4; span from 1.6;
  cp1's wrapper div is the triaged intentional soft-preview (student edits text only).
- unit02: CLEAN (30 exercises) - no `id=` before 2.3, no `class=` before 2.4, no
  `<img>` before 2.5; skeleton tokens in 2.6 are recognize-only.

### Units 3-6 (exhaustive)
- unit03: CLEAN (all lessons; property ordering named->hex->font->size->padding holds).
- unit04: CLEAN (position/right/margin/z-index/opacity each first at their lesson).
- unit05: CLEAN except the deliberate 5.4 ease-in contrast (see design decisions).
- unit06: CLEAN (GSAP subset respected; no function definitions in student-facing code;
  settings-object shown as an opaque unit at 6.1 as designed).

### Units 7-9 (exhaustive)
- unit07: CLEAN (44 exercises) - id migration name/title->f0/f1 lands exactly at 7.7,
  incl. the separately-authored 7.6-cp7; SPX facts correct; JSON.stringify confined to
  hidden harnesses.
- unit08: CLEAN (42 exercises) - 8.9 spxData dialect is recognition-only (never
  runnable/edited); ordering and SPX facts hold.
- unit09: 2 issues found and FIXED (9.5 dropdown, 9.6 split/join - see Findings above);
  remaining lessons clean.

### Recycling / seals deep-dive
- All four major seals open where promised; explicit progressive-unseal map in unit-07.
- No load-bearing skill is a dead-end (z-index, @font-face, margin, scale, and the
  dropdown/checkbox/textarea ftypes all recur in later lessons/capstones).
- one-new-concept invariant holds (reviews and the 4 capstones carry no single new concept).
- Findings: the `number`-ftype and Checkpoint-5 MINORs above; the 5.6 recycles NIT (fixed).

## Post-fix verification

- Schema validator: 0 problems, 0 warnings across all 10 units.
- Canon scanner: clean (only the triaged intentional name-swap demos).
- Full browser auto-drive after fixes: **425/425 exercises pass, 0 JS errors, 7/7
  operator-panel drives** (including 9.5 driven through the new dropdown widget).

## Graphic-consistency pass ("what you see = what you say")

Follow-up pass, prompted by classroom feedback on Unit 0: every exercise that *names*
a graphic type (lower third / corner bug / ticker / full-screen) must *show* that
graphic on the stage - never a blank stage, and never a lower-third strap while the
prompt talks about a bug. Root cause: the house renderer could only draw a lower
third, and exercises without a `render` showed nothing.

**Infrastructure.** Added three graphic *kinds* to the house renderer (`renderer.js`):
`kind: "bug"` (small channel mark, top-right title-safe corner, matching the Unit 4/9
convention), `kind: "ticker"` (full-width band
on the bottom edge), `kind: "fullscreen"` (fills the 1920x1080 frame); default stays
the lower-third strap. The house stylesheet is now always injected (scoped to
`#content .gfx`), so custom-CSS renders can compose several graphics at once by writing
`.gfx` / `.gfx bug` markup (used for the Unit 0 checkpoint's bug-plus-score scene).
Engine passes `render.kind` through; schema doc (`app/SCHEMA.md`) updated. Verified each
kind's exact geometry through the real renderer.

**Content fixes (all fixed):**
1. **Unit 0 (reported unit) - rebuilt for consistency.** 0.1 now shows each of the four
   graphics as it is named (lower third, bug, full-screen, ticker) instead of leaving
   the stage blank for three of four. 0.2/0.3 keep the running strap on stage for every
   exercise instead of going blank. 0.3 ("three languages") rewritten to state each
   language's job plainly (HTML = content, CSS = looks, JS = motion) before the
   CSS-off payoff. cp0's corner-bug question now renders the *actual* described scene -
   the NN corner bug plus the HIFK score strap - instead of a lone lower third.
2. **Unit 1 - "score bug" mislabels (1.1 ex4, 1.5 ex5):** the graphic shown is a
   multi-line lower-third strap, so renamed to "score strap" (a corner bug is the small
   top-corner mark, per Unit 0).
3. **Unit 1 (1.3 ex3):** "a designer fills the background with dark blue" had no visible
   payoff; added an `applyOnAnswer` that covers the whole frame in dark blue with the
   strap on top, so the student sees the consequence they predicted.
4. **Unit 1 (1.2 ex3):** reworded so the corner-bug / full-screen are clearly framed as
   Unit-0 recall ("think back to Unit 0..."), anchored on the strap actually on stage.
5. **Unit 8 (8.3 ex5):** blank stage while discussing "the strap" - added the NN Sans
   strap render, matching the other four exercises in the lesson.
6. **Unit 9 (9.1 ex1):** wrong-answer feedback told the student to "watch its breathing"
   on a bug render that has no breathe animation; reworded to drop the false cue.

**Coverage.** Units 2, 3, 4, 5, 6, 7 audited clean (their graphics are custom-CSS and
already match their prompts). Post-fix: validator 0/0, exercise count unchanged at
425/425, and an automated named-vs-shown scan across all house-mode renders is clean
(the one remaining hit, 1.2 ex3, is the reviewed Unit-0 recall question above).
