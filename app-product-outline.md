# App / Product Outline (Deliverable 6, Phase 3)

## Context

The pedagogy (Deliverables 1-4) and gamification plan (Deliverable 5) are approved, and
a **working prototype of the whole course is built and verified** (`app/`): 10 units, 85
lessons, 425 exercises, all playable, a full clean-slate auto-drive passing 425/425 with
the SPX operator panel working. So this document is not a proposal to be proven - most of
it already runs. Its job is to (1) state the platform recommendation, (2) document the
proven exercise-player architecture as the reference design, (3) describe the content
pipeline, and (4) lay out the concrete path from this prototype to a production product,
being honest about what the prototype deliberately does not yet do.

The guiding constraint from the course's own world carries into the product: **local,
offline-friendly, no mandatory server, GDPR-light.** The course teaches "no server
anything"; the app should embody the same restraint until a feature genuinely requires a
backend.

---

## 1. Platform recommendation: an offline-first PWA

**Recommendation: a Progressive Web App (installable, responsive web + service-worker
offline), not native, not Electron.**

The prototype is already dependency-free HTML/CSS/JS that runs from a static file server.
A PWA is the smallest honest step from there to a real product, and it fits every
constraint the brief set:

| Requirement | Why PWA fits |
|---|---|
| Mobile and/or web, one codebase | One responsive web app installs to a phone home screen and runs in a desktop browser - no fork. |
| Short 5-15 min sessions between classes | Installed PWA launches instantly, works on flaky classroom wifi via a cached service worker. |
| Offline / GDPR-light | All content ships as static assets; progress lives in the browser (localStorage/IndexedDB). No account needed to learn. |
| The live-code sandbox | The sandboxed iframe renderer is a web primitive; it is the reason a native rewrite would cost more and gain nothing. |
| Classroom use | A URL a teacher can hand out; installable per device; no app-store gatekeeping or update lag. |

**Why not the alternatives:**

- **Native (iOS/Android):** the app needs no device APIs the web lacks (no camera, GPS,
  push beyond web push). Native would double the codebase and fragment the content
  pipeline for zero pedagogical gain. The one thing native "buys" - app-store presence -
  is not worth a second renderer for a live-HTML sandbox.
- **Electron / desktop:** the course is explicitly light-weight and classroom-mobile;
  a desktop binary is the wrong shape for "drill on your phone between classes."
- **Plain responsive web (no PWA):** fine as the baseline, but installability and offline
  caching are exactly what the "short sessions, classroom wifi" use case needs, and they
  cost only a manifest plus a service worker.

**What making it a PWA takes (small):** a `manifest.webmanifest` (name, icons, standalone
display), a service worker that precaches the app shell + content bundles for offline, and
a caching strategy (cache-first for content, network-first for any future sync). The app
shell already has no external dependencies, so precaching is straightforward.

---

## 2. Exercise-player architecture (the proven design)

This is built and documented in `app/SCHEMA.md`; summarized here as the reference
architecture.

```
                          index.html (app shell)
                                  |
        +-------------------------+--------------------------+
        |                         |                          |
   content/unitNN.js         engine.js                  renderer.js
   (exercises as DATA)   (generic player + path       (sandboxed 1920x1080
                          + progression + panel)        stage, GSAP shim)
                                  |                          ^
                                  |   postMessage protocol   |
                                  +--------------------------+
                                     (load / cmd / update / probe)
```

**Exercises as data.** Every lesson and exercise is a plain object (see `SCHEMA.md`): a
`type` from a fixed ladder (observe / predict / fill / fix / arrange / type / build /
operate), the prompt, the code the student sees, the answer, and per-wrong-answer
feedback. Authoring a lesson is authoring data, never touching engine code. This is what
let the whole course scale to 425 exercises and be validated mechanically.

**A generic engine.** `engine.js` renders whatever type each step declares, owns the
course path (unit/lesson unlocking, per the progression model), persists progress, and
hosts the simulated SPX operator panel. It knows nothing about any specific lesson.

**A safe sandboxed renderer.** `renderer.js` is a 1920x1080 stage delivered as an iframe
`srcdoc` with `sandbox="allow-scripts"` - an **isolated origin**, so exercise HTML/CSS/JS
runs where it can never touch the app or the network. The app talks to it only through a
small `postMessage` protocol:

- `__gfxLoad {html, css, js, mode, overlay, autoplay}` - (re)load a template
- `__gfxCmd "play"|"stop"|"next"` - lifecycle buttons
- `__gfxUpdate {f0,...}` - the operator panel sends `update(JSON.stringify(...))`
- `__gfxProbe {queries}` -> `__gfxProbeResult` - read rendered text / computed styles

**Automated grading via the probe protocol.** Build and operate exercises are graded by
probing the live stage (does `#f0` read "Priya Nair"? is `#panel` background
`rgb(138,21,38)`?), not by string-matching source. This is what makes checkpoint pass
criteria trustworthy and is the seed of the mastery-gate model.

**The GSAP shim.** Rather than vendor GSAP, the stage ships a ~100-line shim covering
exactly the course subset (`to/from/fromTo/timeline`, the taught props and eases). Student
code is therefore *real GSAP syntax* that transfers 1:1 to actual templates, while staying
tiny and offline. (Production decision below on whether to keep the shim or vendor GSAP.)

**Security properties worth preserving in production:**
- The stage origin is isolated (`allow-scripts` only); never add `allow-same-origin` to
  the shipped iframe.
- No exercise code can reach the network (no `allow-forms`, no external fetch).
- The engine never `eval`s student input in the app context; all execution is inside the
  sandbox.

---

## 3. Content pipeline

The pipeline that produced the course, and that production should formalize:

```
lessons/unit-NN.md        the PEDAGOGY source of truth (human-authored, reviewed)
        |  (encode per SCHEMA.md)
        v
app/content/unitNN.js     the PLAYABLE artifact (data modules the engine loads)
        |
        +--> tools/validate_content.js   schema + GSAP-subset conformance (CI gate)
        +--> tools/audit_scan.js         canon/token/encoding scan (CI gate)
        +--> tools/concept-ledger.md     the what-is-taught-when reference the audits use
```

- **Lesson plans (`.md`) stay the source of truth for pedagogy.** They carry the *why*
  (concept, misconception, recycles, checkpoint remediation) and are where changes are
  reasoned about and reviewed.
- **Content modules (`.js`) are the compiled, versionable artifact** the engine plays.
  Everything is plain data, diffable in git, one file per unit.
- **The validators are CI gates.** `validate_content.js` (schema + shim) and
  `audit_scan.js` (canon/encoding/token) run in seconds and should block any content PR
  that regresses. This is what makes a 425-exercise course maintainable by more than one
  author.

**Production hardening of the pipeline:**
- Add a small build step that bundles the ten content modules (and, later, splits them for
  lazy-loading per unit so a phone downloads Unit 3 only when reached).
- Consider promoting the content format from JS modules to **JSON** once authoring
  stabilizes - it removes the last chance of a syntax error and makes a future web-based
  lesson editor trivial. (JS modules were the right call for hand-authoring; JSON is the
  right call for a tool-assisted pipeline.)
- Keep `concept-ledger.md` current: it is the spine both the human review and the
  automated audit check against.

**Localization (the brief asked for localizable lesson text).** All learner-facing prose
(prompts, options, feedback, explanations) is already separated from logic as data, and
the *code* inside exercises is language-neutral (HTML/CSS/JS is the same in every locale).
To localize: extract the prose strings to per-locale bundles keyed by exercise, translate,
and leave the code untouched. No engine change required - the separation is already there.

---

## 4. State, persistence, and when a backend is justified

**Now (solo learner): local-first.** Progress lives in `localStorage` under one key
(`gfx_progress_v1`): per-lesson passed / attempts / first-try accuracy / kernel-first-try.
No account, no server, nothing leaves the device - matching the GDPR-light ethos.

**Design the schema sync-ready.** The progress record is already a flat, serializable
object keyed by lesson id. Keep it that way so that, if and when sync is needed, it maps
cleanly to a per-user document without a migration. Move from `localStorage` to
**IndexedDB** before adding review-scheduling data (the warm-up deck's per-skill intervals
are more than localStorage should hold comfortably).

**A backend becomes justified only at two specific features, both from later phases:**
1. **The teacher dashboard** (gamification Phase 2, §8) - a teacher needs to see a *class*,
   which means per-student progress leaving the device. This is the first real backend
   requirement.
2. **Cross-device continuity / leagues** - optional; only if learners want their streak on
   both phone and laptop.

Until then, do not build a backend. When it is built, it should be thin: an auth layer and
a progress-sync document store, with the app still fully functional offline and syncing
opportunistically. Anonymized-by-default; a teacher's class is opt-in per the gamification
plan's governance model.

---

## 5. The MVP, and the pedagogy pilot

**The MVP the brief asked for is built** - "Unit 1 fully playable" is exceeded; the whole
course plays. The smallest slice that tests the pedagogy is **Units 0-1** (orientation +
first real code): together ~11 lessons, every exercise type represented, the live-render
payoff present from lesson 1.

**Run the pilot like this:**
- Put Units 0-1 in front of real media students on their own phones (the target device).
- Instrument the existing per-exercise first-try/miss data (already recorded) and log
  anonymized attempt events - *which exercises get missed first-try, where students retry,
  where they drop*. That map is the highest-value output of a pilot.
- Watch specifically: does the "one new concept per lesson" pace feel right, do the
  visible-consequence wrong answers land, is anything completable-on-phone actually
  awkward on a phone.
- Success signal: students finish Unit 1 in a few short sittings, can retitle and read a
  simple template unaided, and *want* Unit 2.

This is a pedagogy test, so it deliberately runs with gamification **off** (the app already
ships that way) - decorate only after the teaching is confirmed.

---

## 6. Production roadmap (prototype -> product)

Phased, each phase shippable:

**P0 - Harden the prototype into a PWA (small).** Manifest + service worker + offline
precache; IndexedDB progress; accessibility pass (keyboard nav, focus states, screen-reader
labels, `prefers-reduced-motion` - the renderer already respects it); lazy-load content per
unit. Outcome: an installable app a teacher can hand out by URL.

**P1 - Close the progression-model gaps.** The prototype implements gating and records the
signals but simplifies three things (documented in `app/README.md`): no variant pools
(retry repeats the same exercise), no expanding-interval warm-up deck, no test-out flow.
Building these makes the mastery model in Deliverable 4 real. Variant pools are the
highest-value: they turn "retry" into genuine spaced practice.

**P2 - Gamification (Deliverable 5).** Turn on the layer in the approved
distortion-safe order: badges + mastery ring, then XP + daily goal, then opt-in streaks +
cohort goals - each teacher-governable. Additive and reversible by design.

**P3 - Teacher layer + backend.** The dashboard (skills inventory, class-wide gap
detection, capstone review queue) and the thin sync backend it requires. This is the first
justified server.

**P4 - Real-SPX export.** A product feature the course already earns: let a student
download a capstone as a working `.html` template in the SPX folder shape (relative paths,
the definition, the wired contract). The course's promise is "you leave with four working
templates" - this makes that literal.

---

## 7. Open technical decisions (with recommendations)

- **GSAP shim vs. vendored GSAP.** The shim keeps the bundle tiny, offline, and matched to
  exactly what is taught. Recommendation: **keep the shim for the sandbox** through the
  pilot; if capstone fidelity to real GSAP easing becomes a concern, vendor the real
  `gsap.min.js` *inside the sandbox only* (it is ~70KB, offline-cacheable) and keep the
  authored subset as the teaching constraint. Either way, student code stays real GSAP
  syntax.
- **Content format: JS modules vs JSON.** Keep JS modules while authoring by hand; move to
  JSON when a lesson-editor tool arrives (see pipeline). Not urgent.
- **Rendering scale on low-end phones.** 425 exercises is trivial as data; the only runtime
  cost is the iframe stage. It is one reused iframe, re-`srcdoc`ed per exercise - cheap.
  Watch memory on very old devices; the mitigation (reuse one iframe, already done) is in
  place.
- **Analytics / privacy.** For the pilot, log anonymized attempt events locally and let the
  student/teacher export them, rather than phoning home. Only introduce server-side
  analytics with the P3 backend and explicit opt-in.
- **Accessibility as a first-class requirement**, not a P0 afterthought: the audience
  includes students who benefit from larger type and keyboard operation; the live stage
  must never be the only channel (every exercise also has text prompt + feedback, which it
  does).

---

## 8. Summary

The product is a **local-first, offline-capable PWA** wrapping the **already-built,
already-verified exercise player**: exercises as data, a sandboxed live-code stage, a
probe-based auto-grader, and a git-versionable content pipeline gated by fast validators.
The MVP exists and plays end to end; the next concrete step is P0 (PWA hardening) plus a
Units 0-1 pedagogy pilot on real phones. Everything after that - full mastery mechanics,
gamification, the teacher dashboard and its backend, real-SPX export - is phased,
shippable, and additive, and none of it requires abandoning the restraint that makes the
app match the world it teaches.
