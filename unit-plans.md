# Unit Plans (Deliverable 2)

For each unit: goal, prerequisites, the ordered lesson list (each lesson = exactly one
new concept), the earlier concepts it deliberately recycles for spaced review, and the
checkpoint project. Lesson durations target 3-7 minutes; "review" lessons introduce
nothing new. Every lesson renders a live visual result; every exercise set mixes 2-4
types from the ladder (Observe / Predict / Fill-the-blank / Fix-the-bug / Arrange /
Type-it / Build).

Running example graphics, reused across units so context stays broadcast-real:
- **"Nightly News" name strap** - the course's pet lower third (name + title lines).
- **"NN" corner bug** - channel logo, top right.
- **"Election Night" full-screen** - title card over a color panel.
- **"Sports ticker"** - scrolling results bar.

All template code follows the SPX classic-globals contract; the PLAY/STOP buttons in
every exercise are real `play()`/`stop()` calls into the hidden boilerplate ("trust it
for now - opened in Unit 7").

Counts: 75 lessons (incl. 8 review lessons and 1 optional) + 9 checkpoints + 4 capstones.

---

## Unit 0 - Welcome to On-Air (3 lessons + checkpoint)

**Goal:** set the mindset before any code: know the everyday graphics by name,
understand that broadcast graphics are web pages ("if you can build a web page, you can
build TV graphics"), and know what HTML, CSS, and JS each do - by sight, not by skill.
No code is written or edited in this unit; real code appears only as a labeled,
observe-only cockpit tour.
**Prerequisites:** none. **Recycles:** n/a (orientation).

| # | Lesson | The one new concept |
|---|--------|--------------------|
| 0.1 | The graphics you already know | The four everyday broadcast graphics and their names and jobs: lower third, corner bug, ticker, full-screen. |
| 0.2 | It's a web page | Broadcast graphics are built with the same technology as websites; a playout system (SPX/CasparCG) plays the page out over video; a *template* is a page with changeable parts. |
| 0.3 | Three languages, three jobs | HTML says what's there; CSS says how it looks; JS says what it does (motion + live data). Layer-switch demo; tell-tale signs of each language by sight. |

**Checkpoint 0 - "Graphics spotter":** watch a simulated broadcast segment; name each
graphic as it appears; answer three which-language questions in broadcast wording.

---

## Unit 1 - Hello, Graphic (6 lessons + checkpoint)

**Goal:** demystify "a graphic is code": students can look at a tiny template and its
rendered output and point at which code makes what, and make their first text edit.
**Prerequisites:** Unit 0. **Recycles:** the graphic-type vocabulary (0.1), the
it's-a-web-page revelation (0.2), the three-jobs model (0.3 - Unit 1 is "HTML says
what's there", made real).

| # | Lesson | The one new concept |
|---|--------|--------------------|
| 1.1 | Graphics are code | What's on screen is produced by a text file; each visible thing corresponds to a line of code. (Observe/tap only.) |
| 1.2 | PLAY and STOP | Graphics don't just appear - an operator *plays* them in and out; the template responds to PLAY/STOP. (Broadcast context; buttons are real.) |
| 1.3 | The empty stage | The canvas is a fixed 1920x1080 frame with a transparent background, because the graphic sits *over* the video (keying). |
| 1.4 | Tag anatomy | An element = opening tag + content + closing tag: `<div>Maria Kranz</div>`. |
| 1.5 | Change the words | The text between the tags is exactly what shows on screen - change it, and the screen changes. (First edit.) |
| 1.6 | div and span | `<div>` is a line/box of its own; `<span>` marks a piece *inside* a line (e.g. the away team's score). |

**Checkpoint 1 - "Retitle the strap":** given the complete Nightly News strap, change
the presenter's name and title, press PLAY, and confirm the on-air result. (Phone-friendly:
word-bank text entry.)

---

## Unit 2 - Naming the Parts (6 lessons + review + checkpoint)

**Goal:** navigate a template's structure confidently - know which element is which,
and target the right one.
**Prerequisites:** Unit 1.
**Recycles:** tag anatomy, text editing, div/span (all lessons); keying context (2.5 logo
with transparent PNG).

| # | Lesson | The one new concept |
|---|--------|--------------------|
| 2.1 | Boxes inside boxes | Nesting: the strap div *contains* the name div and the title div; children move with their parent. |
| 2.2 | Reading the tree | Which closing tag closes what; indentation mirrors nesting and is your reading aid. |
| 2.3 | The id | `id="name"` gives one element a unique name; ids appear once per template. |
| 2.4 | The class | `class="line"` is a shared label many elements can carry. |
| 2.5 | Pictures | `<img src="nn-logo.png">` shows an image from a file; no closing tag; transparent PNGs key cleanly. |
| 2.6 | The skeleton | Every template has the same frame: `<head>` (settings: `<style>`, the definition) and `<body>` (what's on screen, then `<script>`). Recognize-only; contents opened in Units 3 and 7. |
| 2.7 | Review remix | No new concept. Mixed drill: tap-the-element by id, fix a wrong closing tag, arrange a nested strap. |

**Checkpoint 2 - "Rebuild the strap":** arrange shuffled blocks into a two-line lower
third (strap > name + title + logo img) with the ids in the right places.

---

## Unit 3 - House Style (8 lessons + review + checkpoint)

**Goal:** restyle any graphic's colors, type, and spacing to match a brand.
**Prerequisites:** Units 1-2 (ids/classes become selector targets).
**Recycles:** id/class (3.3 selectors reuse them by name), nesting (inherited font color),
text editing, the skeleton (`<style>` is now opened).

| # | Lesson | The one new concept |
|---|--------|--------------------|
| 3.1 | A rule of style | CSS rule anatomy: `selector { property: value; }` - "who, then what". Lives in `<style>`. |
| 3.2 | Styling by tag | Element selectors: `div { ... }` styles every div. |
| 3.3 | Dot and hash | `.line` targets a class, `#name` targets an id - the names from Unit 2, reused. |
| 3.4 | Paint it | `color` (the text) vs `background-color` (the box), with named colors. |
| 3.5 | Brand colors | Hex codes `#0a3d91` at recognize-and-tweak level; every channel has exact brand colors. |
| 3.6 | The channel's typeface | `font-family` (and why fallbacks are listed). |
| 3.7 | Size and weight | `font-size` in px on the 1080p canvas; `font-weight` for the name vs the title line. |
| 3.8 | Breathing room | `padding` - space *inside* the strap, between the box edge and the text. |
| 3.9 | Review remix | No new concept. Predict-the-render drills mixing selectors, colors, type; fix a rule that targets the wrong id. |

**Checkpoint 3 - "Rebrand it":** given the plain strap and a brand card (two hex colors,
a font, weights), restyle the lower third to match, pixel-checked against the target.

---

## Unit 4 - On the Canvas (7 lessons + review + checkpoint)

**Goal:** place graphics precisely on the 1920x1080 frame the way broadcast expects.
**Prerequisites:** Unit 3 (CSS rules carry the new properties).
**Recycles:** CSS rule anatomy + selectors (every lesson), padding (vs margin
discrimination in 4.4), hex/brand colors, the img bug from 2.5.

| # | Lesson | The one new concept |
|---|--------|--------------------|
| 4.1 | The grid you can trust | The canvas is always exactly 1920x1080; positions are plain pixel numbers from the top-left. (Why this is *easier* than normal web pages.) |
| 4.2 | Pin it down | `position: absolute` + `top`/`left`: put the strap exactly where you want it. |
| 4.3 | The other corners | `right`/`bottom` offsets - the natural way to pin a corner bug. |
| 4.4 | Space between | `margin` - space *outside* a box; the gap between the name line and the title line. (Padding vs margin, disambiguated.) |
| 4.5 | Safe areas | Title-safe margins: why nothing important sits at the very edge; the standard lower-third and bug positions. |
| 4.6 | Who's on top | When boxes overlap, later-in-code wins; `z-index` at recognize level. |
| 4.7 | See-through | `opacity` - the strap panel at 0.85 over video; 0 = invisible (the seed of animation). |
| 4.8 | Review remix - over video | No new concept. All placement skills exercised over moving footage; spot the graphic that breaks title-safe; keying revisited. |

**Checkpoint 4 - "Dress the frame":** position the NN bug top-right and the lower third
in the title-safe lower area over a news clip, matching a broadcast reference layout.

---

## Unit 5 - Making It Move (7 lessons + review + checkpoint)

**Goal:** animate a graphic on and off air with professional timing, in pure CSS.
**Prerequisites:** Unit 4 (positions/opacity are what gets animated).
**Recycles:** opacity, translate coordinates <- absolute positioning, selectors,
padding/margin (predict drills), PLAY/STOP (now *causing* the motion via a state class -
"trust it for now, explained in Unit 8").

| # | Lesson | The one new concept |
|---|--------|--------------------|
| 5.1 | Slide without breaking | `transform: translate` moves a box from its pinned spot without re-laying-out anything - the animation-safe way to move. |
| 5.2 | Grow and shrink | `transform: scale` - the bug pops from 0 to full size. |
| 5.3 | Smooth change | `transition: property duration` - a change animates instead of snapping. PLAY applies the "on" state; the transition does the rest. |
| 5.4 | Entrances ease out | Easing taste 1: real graphics decelerate in (`ease-out`); linear looks robotic. Predict-and-compare drills. |
| 5.5 | Exits ease in, and faster | Easing taste 2: outs accelerate away and run shorter than ins. STOP state. |
| 5.6 | One after another | `transition-delay` - the title line lands a beat after the name line (the stagger that reads "designed"). |
| 5.7 | Choreography | `@keyframes` + `animation`: multi-step motion (overshoot-and-settle), and `infinite` for looping (the ticker's engine). |
| 5.8 | Review remix | No new concept. Fix a lower third that snaps instead of sliding; reorder shuffled transition rules; predict which easing is which from two renders. |

**Checkpoint 5 - "On air, off air":** the branded strap slides in eased-out with a
staggered second line on PLAY, and fades out faster, eased-in, on STOP.

---

## Unit 6 - Moving with GSAP (7 lessons + review + checkpoint)

**Goal:** read, tweak, and write simple GSAP tweens and timelines - and meet JavaScript
gently, as *calls* only.
**Prerequisites:** Unit 5 (same motions, new tool; easing taste transfers).
**Recycles:** translate/scale/opacity (now as GSAP properties), easing taste, id
selectors (GSAP targets `"#name"`), duration/delay/stagger.

| # | Lesson | The one new concept |
|---|--------|--------------------|
| 6.1 | Asking a tool to move things | Calling a function: `gsap.to("#strap", {...})` is an *instruction* - a name, then inputs in parentheses. (First JavaScript; lives in `<script>`.) |
| 6.2 | The settings object | The `{ x: 0, opacity: 1 }` braces are a settings list: property-colon-value pairs, comma-separated - and `x`/`y`/`scale`/`opacity` map to the CSS you know. |
| 6.3 | How long, and how | `duration` and `ease` (`"power2.out"`, `"power2.in"`) inside the settings object - Unit 5's taste rules, spelled the GSAP way. |
| 6.4 | Enter from off-screen | `gsap.from(...)` - animate *from* a start you describe to where the CSS puts it: the standard entrance idiom. |
| 6.5 | Full control | `gsap.fromTo(...)` - state both ends explicitly; why templates prefer it for repeatable ins/outs. |
| 6.6 | The timeline | `gsap.timeline()` and chained `.to(...)` - tweens that run in order; one object animates the whole graphic in. |
| 6.7 | Overlap | The position parameter `"-=0.2"` (and `stagger`) - lines that overlap slightly read as one designed move, not a queue. |
| 6.8 | Review remix | No new concept. Given a pro template's timeline: make the entrance 20% faster, fix a wrong ease direction, predict the order of three tweens. |

**Checkpoint 6 - "The GSAP strap":** rebuild Checkpoint 5's in/out as two GSAP
timelines with correct easing and an overlapped second line.

---

## Unit 7 - Making It Live (8 lessons + review + checkpoint)

**Goal:** open the boilerplate at last: the SPX contract. Students wire a template so
an operator can change its content and play it - the course's biggest payoff.
**Prerequisites:** Unit 6 (function calls; script tag), Unit 2 (ids).
**Recycles:** ids (`getElementById`), the skeleton (definition goes *last in `<head>`*),
GSAP timelines (called from `play()`), text-content idea from 1.5 (now set from JS).

| # | Lesson | The one new concept |
|---|--------|--------------------|
| 7.1 | Writing the recipe | *Defining* a function: `function play() { ... }` - a named recipe that runs when called; you've been calling them since Unit 6. |
| 7.2 | SPX calls, you answer | The lifecycle contract: SPX calls *your* `play()` and `stop()`; your job is to run the in-timeline and the out-timeline. (The PLAY button's magic, finally explained.) |
| 7.3 | Grab the element | `document.getElementById("name")` - JS reaching the element by its Unit 2 id. |
| 7.4 | Change what it shows | `.textContent` (and its sibling `.src` for images) - setting an element's content from JS. |
| 7.5 | A labeled bundle | Objects: `data.f0` reads the value labeled `f0` out of a bundle of values. |
| 7.6 | Unpack the delivery | `update(data)` receives a JSON *string*; `JSON.parse(data)` turns it into the object you can read. |
| 7.7 | The f0 handshake | The convention that makes it all click: each operator field `fN` maps to one element `id="fN"`; `update()` writes each field into its element. |
| 7.8 | Describing the controls | `window.SPXGCTemplateDefinition` + `DataFields`: `field`/`ftype: "textfield"`/`title`/`value`. The operator panel appears in the app; the first two fields become the rundown preview. |
| 7.9 | Review remix | No new concept. Trace a value from operator panel -> update -> element; fix a template where `f1` never updates (id mismatch); arrange a scrambled `update()`. |

**Checkpoint 7 - "Operator-ready":** wire the branded, animated strap: a definition with
Name + Title textfields, `update()` writing them, `play()`/`stop()` running the
timelines - then drive it yourself from the simulated operator panel.

---

## Unit 8 - Other People's Templates (7 lessons + review + checkpoint, +1 optional)

**Goal:** the course's stated real-world job: open an unfamiliar template (from the
internet or an AI), find your way around, and make small changes safely.
**Prerequisites:** Unit 7 (the whole contract is now known).
**Recycles:** everything - this unit is structured recycling; specifically selectors,
hex colors, font-family, timelines, the fN handshake, the definition.

| # | Lesson | The one new concept |
|---|--------|--------------------|
| 8.1 | The anatomy map | A skim strategy for any template: find the definition, the elements, the styles, the functions - in that order. Four landmarks, always present. |
| 8.2 | The control panel at the top | CSS variables: `:root { --accent: #e8b90c; }` + `var(--accent)` - change one line, rebrand the whole template. |
| 8.3 | Bringing your own font | `@font-face` at recognize-and-edit level: spot it, swap the font file and name. |
| 8.4 | Flip the switch | `classList.add`/`remove` - JS switching a state class (this is what Unit 5's hidden PLAY machinery did). |
| 8.5 | Styling from data | `element.style.___ = ...` fed by a `color`-type field - the operator picks the strap color. |
| 8.6 | More than one step | `steps` >= 2 and `next()`: the Continue button advances multi-phase graphics (reading level). |
| 8.7 | Why didn't it change? | Systematic mismatch-hunting: wrong id, selector typo, missing px, wrong field number - the four usual suspects, in order. |
| 8.8 | Edit without breaking | The do-not-rename list (`play`, `stop`, `update`, `next`, `fN` ids, the definition) + the one-change-then-play habit. Doubles as review. |
| 8.9 | (Optional) The other dialect | Recognition only: some templates read `spxData.f0` and hook `spxRenderer` events instead of defining globals - same ideas, different spelling. Don't edit blindly; recognize which dialect you're in. |

**Checkpoint 8 - "The download":** an unfamiliar, realistically messy template + three
change requests (rebrand via the CSS variable, swap the logo, slow the entrance and fix
its easing direction). All three must play correctly.

---

## Unit 9 - Making It Real (9 lessons; the capstones ARE the checkpoint)

**Goal:** produce and deliver the four real templates, and understand the operator's
world they live in.
**Prerequisites:** Units 1-8 (Unit 8 checkpoint passed).
**Recycles:** everything, by construction - each capstone is specified to force spaced
retrieval (positioning, easing, the contract, fields, variables).

| # | Lesson | The one new concept |
|---|--------|--------------------|
| 9.1 | The operator's desk | The rundown workflow in the simulated SPX client: add a template, fill fields, Play / Continue / Stop, layers. (Context lesson - you build for this desk.) |
| 9.2 | Better controls | The wider `ftype` toolbox at use level: `dropdown` (with `items`), `number`, `checkbox` - give the operator good controls, sensible defaults, clear titles. |
| 9.3 | **Capstone A: Lower third** | Build from scratch (web build; guided block-assembly on phone): two textfields, branded, GSAP in/out, correct easing. |
| 9.4 | **Capstone B: Corner bug** | Build: image + optional text, pinned top-right inside title-safe, subtle looping idle animation, checkbox to show/hide text. |
| 9.5 | **Capstone C: Full-screen title** | Build: title + subtitle over a color panel, `steps: 2` with a `next()` reveal, dropdown for panel color via CSS variable. |
| 9.6 | **Capstone D: Ticker** | Build: continuously looping headline crawl from a textarea field, safe-area aware, `out: "none"`-style considerations discussed. |
| 9.7 | The delivery checklist | Professional QA as a habit: ease directions, out faster than in, title-safe, keying check over video, field titles an operator understands, defaults filled. |
| 9.8 | Shipping the file | What you actually hand over: the `.html` + relative assets, the `ASSETS/templates/...` folder convention, why paths are relative. |
| 9.9 | (Optional) The real thing | Point a real SPX at your template folder, add it to a rundown, play out via web playout; where CasparCG fits. The course ends outside the app - for those who can. |

**Graduation:** all four capstones pass their checklists and play correctly from the
simulated operator panel. The student leaves with four working SPX template files.

---

## Notes for Deliverable 3 (lesson-level detail)

- Units 1-2 will be written in full exercise-by-exercise detail first, per the brief.
- SPX specifics are grounded in the SPX template documentation (loaded in-session):
  classic-globals dialect confirmed as valid alongside `spxData`; definition placed last
  in `<head>`; first two DataFields feed the rundown preview; `steps`/Continue and `out`
  behaviors as documented.
- Counts are honest per unit (some units run 8-9 lessons where the map sketched 7-8);
  total stays inside the agreed 60-80 envelope. Cut-candidates if trimming is wanted:
  8.9 (other dialect), 4.6 (layering -> fold into 4.3), 6.5 (fromTo -> fold into 6.4).
