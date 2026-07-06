# Learn HTML Broadcast Graphics - Course Map (Deliverable 1, APPROVED)

A Duolingo-style course teaching complete beginners to build HTML broadcast graphics
for SPX Graphics / CasparCG. Pedagogy first; gamification and app design come later.

## Locked decisions

1. **Template-first from day 1.** Every exercise lives inside a real (hidden-boilerplate)
   SPX template with a PLAY/STOP button. Students absorb "graphics are templates that get
   played" from lesson 1; the contract internals are formally taught in Unit 7.
2. **Phone for lessons, web for builds.** All regular lessons fully completable on a
   phone; checkpoint/capstone Build exercises assume web/tablet, with guided
   block-assembly fallbacks on phone.
3. **Simulated SPX operator panel in-app**, plus one optional final lesson on real
   SPX/CasparCG playout.
4. **Scale: 10 units (0-9), ~75 lessons + checkpoints** (12-18 hours of learner time).
5. **SPX dialect taught: classic globals** (`play()`, `stop()`, `update(data)` with a JSON
   string, `next()`, one element `id="fN"` per field). The `spxData`/`spxRenderer` dialect
   is covered at recognition level only, in Unit 8.

## The arc

| # | Unit | New territory | Checkpoint project |
|---|------|--------------|--------------------|
| 0 | **Welcome to On-Air** | Mindset opener, no code written: the four everyday graphics by name (lower third, bug, ticker, full-screen); the revelation that broadcast graphics are web pages (SPX/CasparCG plays them out); HTML/CSS/JS as three languages with three jobs | "Graphics spotter": name every graphic in a broadcast segment + which language does what |
| 1 | **Hello, Graphic** | What a template is; text on a transparent 1920x1080 canvas; tag anatomy; `<div>`, `<span>`; PLAY/STOP as trusted boilerplate | Change a name strap's text and play it out |
| 2 | **Naming the Parts** | Nesting; reading the tree; `id`; `class`; `<img>` + `src`; the document skeleton | Rebuild a two-line lower third's structure from shuffled blocks |
| 3 | **House Style** | CSS rule anatomy; element/class/id selectors; color; hex; fonts; padding | Restyle a plain lower third to a given channel brand |
| 4 | **On the Canvas** | The 1920x1080 coordinate space; `position: absolute` + offsets; margin; safe areas; layering; `opacity`; keying | Place a corner bug and a lower third exactly where broadcast expects them |
| 5 | **Making It Move** | `transform: translate/scale`; `transition`; easing taste; delay/stagger; `@keyframes` + looping | A lower third that slides in on PLAY and fades out on STOP |
| 6 | **Moving with GSAP** | Calling a function (first JS); the settings object; ease names; `from`/`fromTo`; timelines; overlap | Re-animate the Unit 5 lower third with a GSAP timeline |
| 7 | **Making It Live** | Defining functions; `play()`/`stop()`; `getElementById`; `.textContent`/`.src`; objects; `JSON.parse`; `update(data)`; `fN` <-> `id="fN"`; `SPXGCTemplateDefinition` + DataFields | Wire the lower third so the (simulated) operator can retitle and play it |
| 8 | **Other People's Templates** | Reading strategy; CSS variables; `@font-face`; `classList`; `.style` + the color field; `steps`/`next()`; debugging "why didn't it change?" | Take an unfamiliar template and make three requested changes |
| 9 | **Making It Real** | The rundown workflow; more field types; the delivery checklist; export; optional real playout | The four capstones: lower third, corner bug, full-screen title, ticker |

## One-line promises ("After this unit you can ...")

0. ... name the graphics you see on TV, and say which language makes the words, the look, and the motion.
1. ... read a tiny template and point at the code that makes each thing appear on screen.
2. ... change any text or image in a template and know exactly which element you touched.
3. ... restyle a lower third to match any channel's brand.
4. ... put a bug in the corner and a lower third in the lower third - exactly where broadcast expects them.
5. ... animate a graphic on and off air so it feels professional, not PowerPoint.
6. ... read and adjust the GSAP animation in any template you're handed.
7. ... wire a template so an operator can retitle and play it without touching code.
8. ... open a template you've never seen - from the internet or an AI - find your way around, and change it with confidence.
9. ... deliver four working templates to a real SPX rundown.

## Design notes

- Unit 0 is a pure orientation unit: gallery, revelation ("it's a web page - if you can
  build a web page, you can build TV graphics"), and the three-languages mental model.
  Real code appears only as a labeled, observe-only cockpit tour; the
  no-untaught-tokens rule starts applying in Unit 1, where reading and editing begin.
- "Making it look right" is split (House Style / On the Canvas): visual styling and
  coordinate-space positioning are separate mental models.
- "Making it move" is split (CSS motion / GSAP): GSAP doubles as the gentle on-ramp to
  JavaScript, so function *calls* are learned a full unit before function *definitions*.
- A dedicated reading-fluency unit (8), because the course's stated real-world job is
  small-edit confidence with templates written by others or by AI.
- Broadcast context (keying, safe areas, the operator) is woven in from Unit 1 via the
  template-first framing and the ever-present PLAY/STOP button.
- Every unit's lessons recycle 2+ earlier concepts in new contexts; each unit ends with
  one mixed-review lesson plus the checkpoint.
