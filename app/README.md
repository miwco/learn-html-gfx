# The app - full course, playable

The complete Duolingo-style player: all 10 units (0-9), the expanded stage renderer,
and the progression model's core. Dependency-free vanilla HTML/CSS/JS.

## Run it

```sh
cd learn-html-gfx
py -m http.server 8770
# open http://localhost:8770/app/   (phone-width first; works at any size)
```

## Architecture

| File | Role |
|---|---|
| `index.html` | shell: home path view + player view |
| `app.css` | broadcast identity (slate ground, amber tally-light, semantic green/red) |
| `renderer.js` | the sandboxed 1920x1080 stage: house style, custom CSS/JS layers, GSAP shim, grid + title-safe overlays, probe protocol |
| `engine.js` | generic exercise player (8 types), home path, progression + localStorage, SPX operator panel |
| `content/unitNN.js` | one file per unit - course content as pure data (see `SCHEMA.md`) |
| `SCHEMA.md` | the authoring contract between content and engine |

### The stage

A sandboxed iframe (`allow-scripts` only - template code runs in an isolated origin).
It accepts `{html, css, js}` layers: house style for Units 0-2, author CSS from Unit 3,
and template JS from Unit 6. PLAY calls the template's global `play()` if it defines
one, else toggles the `on` class on `#stage` (how all pure-CSS motion works). The
operator panel sends `update(JSON.stringify(fields))` - the real SPX classic-globals
contract. A probe protocol lets the engine check rendered text and computed styles for
automated pass criteria.

### The GSAP shim

Rather than vendoring GSAP, the stage ships a ~100-line shim covering exactly the
course subset: `gsap.to/from/fromTo` with `x, y, scale, opacity, duration, delay,
ease, stagger`, and `gsap.timeline()` with chained calls and the position parameter.
Offline, tiny, and it means student code is *real GSAP syntax* that transfers 1:1 to
actual templates.

### Progression (per progression-model.md)

- Lessons unlock sequentially; units gate on the previous unit's checkpoint.
- Per-lesson records in localStorage: passed, first-try accuracy, kernel-first-try.
- Kernel exercises are flagged in content (`kernel: true`).
- Everything passed stays replayable.

**Deliberate simplifications vs. the full model** (fine for the pilot, listed so they
are conscious): no variant pools yet (retry repeats the same exercise), no expanding-
interval warm-up deck, no test-out flow, and lesson pass = completion (first-try and
kernel stats are recorded but do not yet gate). The gamification layer is absent by
design (Phase 2 switches on only after pedagogy is validated).

## Content status

All 10 units encoded from the full lesson plans in `../lessons/`. The `.md` lesson
plans remain the source of truth for pedagogy; the `content/*.js` files are their
playable encoding. Where an exercise type had no app equivalent (drag-joysticks,
slow-motion replay, timed finds), the nearest predict/fill encoding preserving the
teaching point was used - flagged in the lesson plans where it matters.

## Verified

- **Scale:** 10 units, 85 lessons, 425 exercises. Type mix: 225 predict, 71 fill,
  50 fix, 30 observe, 29 arrange, 8 build, 5 type, 7 operate.
- **Full clean-slate auto-drive in the browser:** all 425 exercises reach correct
  completion, zero JavaScript errors; unit gating opens each unit only after the
  prior checkpoint passes; all 85 lessons record as passed.
- **All 7 `operate` (SPX operator-panel) drives pass** - the panel sends
  `update(JSON string)` into the template and the wired `f0`/`f1` handshake lands the
  values on air, confirmed by DOM probe.
- **Visually confirmed:** the Checkpoint 7 drive renders the branded lower third on
  air ("Priya Nair / Economics Editor") from the operator panel; the home path and
  lesson chrome render correctly.
- **Security:** the shipped stage iframe stays `sandbox="allow-scripts"` (isolated
  origin); template HTML/CSS/JS never touches the app.
- **Content validation:** `tools/validate_content.js` (run under Node) checks every
  unit/lesson/exercise against `SCHEMA.md` and the GSAP-shim subset - 0 problems.

Run the checks yourself:
```sh
node tools/validate_content.js     # schema + shim conformance
py -m http.server 8770             # then open http://localhost:8770/app/
```
