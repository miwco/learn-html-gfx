# Unit 9 - Making It Real (full lesson plans)

**Unit goal:** produce and deliver the four real templates, and understand the
operator's world they live in. The capstones ARE the checkpoint.
**Promise:** after this unit you can deliver four working templates to a real SPX
rundown.
**Prerequisites:** Units 0-8 (Checkpoint 8 passed).
**Format note:** capstone lessons are longer than regular lessons (10-15 min) and are
the course's flagship web/tablet builds; on phone each degrades to a guided
block-assembly of the same template, clearly labeled "assisted build". Every capstone
is built from a written brief, like a real job - no scaffolded code beyond the empty
skeleton.

**Path through the unit (per the progression model):** 9.1 -> 9.2 -> **Capstone A
(mandatory first - it is the canonical no-scaffold build)** -> Capstones B/C/D in any
order -> 9.7 -> 9.8. Graduation = all four capstones pass the 9.7 checklist. 9.9 is
optional and gates nothing.

## Conventions used in these plans

- Regular lessons (9.1, 9.2, 9.7, 9.8, 9.9) follow the unit-01 conventions: render /
  code slice / task zones, PLAY/STOP always live, exercise ladder as before.
- **Capstone anatomy:** the brief -> the reference solution (the checker's model
  answer - grading is by *checks*, never by diffing against it; any template that
  passes all graded checks is accepted) -> the staged build path (the app's build
  stages; each stage's checker gates the next) -> the checklist items graded ->
  common failure modes -> phone assisted-build notes -> duration.
- **Returned with notes:** a capstone that fails checklist items is handed back with
  the failing items named, any number of times - mirroring real delivery. No lockouts.
- **The empty skeleton** every capstone starts from (the only given code besides
  blocks explicitly marked GIVEN):

  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title></title>
    <style>
      body { margin: 0; }   /* the frame starts at 0,0 - no browser default margin */
    </style>
    <script src="./js/gsap.min.js"></script>
    <script>
      window.SPXGCTemplateDefinition = {
        "description": "",
        "playserver": "OVERLAY",
        "playchannel": "1",
        "playlayer": "",
        "webplayout": "",
        "out": "manual",
        "steps": "1",
        "DataFields": []
      };
    </script>
  </head>
  <body>

    <script>
      // your contract functions go here
    </script>
  </body>
  </html>
  ```

- **The capstone asset drawer** (all paths relative - the 9.8 payoff is planted):
  `./images/nn-logo.png`, `./fonts/nn-sans.woff2`, `./js/gsap.min.js`.
- **Title-safe numbers used by every checker:** 96 px side margins, 54 px top/bottom
  (5% of 1920x1080, from 4.5).
- During the capstones the delivery checklist already runs silently as the grader;
  lesson 9.7 then puts the same list in the student's own hands as a habit.

---

## Lesson 9.1 - The operator's desk

- **New concept:** the rundown workflow - how a graphics operator actually works a
  show: templates are added to a rundown, each item's fields are filled, and each item
  is driven with Play / Continue / Stop; layers keep the bug up while straps come and
  go.
- **Learner-facing explanation:** "You've been playing one template at a time. A real
  show is a *rundown*: a list of graphic items, each one a template plus tonight's
  field values. The operator walks the list - fill, play, stop, next item - while
  long-running graphics like the bug sit on their own layer and never blink. You are
  about to build for this desk."
- **Context:** the simulated SPX client grows into a full rundown view. The student
  runs a prepared 3-item news block (strap, full-screen, strap) against a program
  clip, with the NN bug parked on layer 19 the whole time.
- **Recycles:** the operator (1.2), fields and the definition (7.8), layer stacking
  (4.6), steps/Continue (8.6).

**Exercises**

1. **Observe (interactive).** "Run the block: play item 1 (the strap), stop it, play
   item 2 (the Election full-screen), stop it, play item 3 (the second strap). Watch
   the corner bug the whole time." Then: "The bug never flinched while three graphics
   came and went. Why?"
   - A) It sits on its own layer, played once and left alone. **(correct)**
   - B) It's burned into the video clip. -> "Nothing here is in the video - every
     graphic is a template on a layer. Stop the bug's layer and it's gone."
   - C) It secretly re-plays between items. -> "No - it never re-plays. Played once onto
     its own layer, it simply holds there, all show long." (No "breathing" cue here: the
     9.1 desk bug is static; the breathing idle is introduced later, in Capstone B / 9.4.)
2. **Predict.** "The bug is on layer 19, the strap on layer 7 - can both be on air at
   once?"
   - A) Yes - layers are independent; higher numbers just sit closer to the camera.
     **(correct)** - "Exactly the stacking rule from 4.6, now at playout scale."
   - B) No - playing one stops the other. -> "Only two items on the *same* layer
     replace each other. 19 and 7 live in different slots of the stack."
   - C) Only if they don't overlap on screen. -> "Overlap is fine - that's what
     stacking order is for. The bug rides above everything below layer 19."
3. **Task-run (kernel).** A producer's note flashes up: "*Tonight's guest got promoted
   - she's 'Chief Political Editor' now. Fix it.*" The rundown view is open; so is a
   file tab with the template's code. "Fix it the way the operator would - without
   touching the template file."
   - Correct: open the rundown *item*, edit its Title field, watch the preview update.
   - Opening the template file and editing the definition's `value` -> "That edits the
     template's *default* for every future show. Tonight's value lives in the rundown
     item's fields - the operator's territory. The template file is the developer's."
   - Editing the element text in the body -> "That text is overwritten by update() the
     moment the item plays - Unit 7 taught you the pipeline. Rundown fields are where
     tonight's words live."
4. **Predict.** "In the rundown, the Continue button is greyed out for the strap but
   active for the Election full-screen. Why?"
   - A) The full-screen's definition says `"steps": "2"` - Continue means 'next
     phase'. **(correct)** (8.6 recycled.)
   - B) The strap is broken. -> "Nothing's broken - a one-step graphic simply has no
     next phase to continue to."
   - C) Continue only works on full-screens. -> "It works on any template whose
     definition declares 2 or more steps - the graphic's *type* is irrelevant."
5. **Predict (true/false round - who does what).**
   "The operator changes what the strap *says* tonight." -> True.
   "The operator changes how *fast* the strap animates." -> False - "Speed lives in
   the template's timelines. That's the developer's side of the desk - yours."
   "The template decides what PLAY actually *does*." -> True - "As it has since 1.2:
   SPX calls, your code answers."

- **Success criteria:** at least 4/5, and ex. 3 (the kernel) done without opening the
  template file - if the file was touched, a fresh variant (new guest, new field) is
  re-run at the end.
- **Common wrong answers:** conflating the rundown item's fields with the template
  file (ex. 3 - the headline misconception, hit from both sides); believing one play
  stops everything else (ex. 2B).
- **Duration:** 4-5 min.

---

## Lesson 9.2 - Better controls

- **New concept:** the wider ftype toolbox at use level - `dropdown` (with its `items`
  list of text/value pairs, and a `value` that must equal one item's value), `number`,
  and `checkbox` (value `"0"`/`"1"`) - plus the courtesy rules: sensible defaults,
  operator-readable titles, most-important-first (the first two fields are the rundown
  preview).
- **Learner-facing explanation:** "A textfield can't say 'pick one of these' or
  'on/off'. The definition has more control types: a `dropdown` offers a fixed list
  (each item has a `text` the operator reads and a `value` your code receives), a
  `number` takes digits, a `checkbox` arrives as `\"1\"` or `\"0\"`. The panel you
  define is a UI a colleague will use under studio pressure - design it like one."
- **Context:** the Nightly News strap's definition grows up: a dropdown for strap
  style and a checkbox to show/hide the logo. Every edit rebuilds the simulated panel
  live, as in 7.8.
- **Recycles:** DataFields (7.8), update wiring (7.7), classList (8.4 - the checkbox
  toggles a class), the color field (8.5, in ex. 5).

**Code slice (the grown definition):**
```js
"DataFields": [
  { "field": "f0", "ftype": "textfield", "title": "Name",  "value": "Maria Kranz" },
  { "field": "f1", "ftype": "textfield", "title": "Title", "value": "News Anchor" },
  { "field": "f2", "ftype": "dropdown",  "title": "Strap style", "value": "left",
    "items": [ { "text": "Left align", "value": "left" },
               { "text": "Centered",   "value": "center" } ] },
  { "field": "f3", "ftype": "checkbox",  "title": "Show logo", "value": "1" }
]
```
(The strap's `update()` reads `d.f2` and switches a style class, 8.4-style; `d.f3`
drives the logo's `hidden` class.)

**Exercises**

1. **Observe.** "Add a third choice to the style dropdown:
   `{ "text": "Boxed", "value": "boxed" }` - then open the operator panel." The panel
   rebuilds with a three-entry dropdown. "Which word does the operator see?"
   - Correct: *Boxed* - "`text` is for the human, `value` is for your code. Two
     audiences, two spellings."
2. **Predict.** A field reads:
   `{ "field": "f2", "ftype": "dropdown", "title": "Strap style", "value": "Left align", "items": [ { "text": "Left align", "value": "left" }, { "text": "Centered", "value": "center" } ] }`
   "What's wrong with it?"
   - A) The default is broken: `value` must exactly equal one of the items'
     *values* - here `"left"` - not the visible text. **(correct)**
   - B) Nothing - 'Left align' is in the list. -> "It's in the list as a `text`. The
     field's `value` must match an item's `value` - the machine-side spelling."
   - C) Dropdowns can't have defaults. -> "They can and should - by naming one of the
     items' values as the field's value."
3. **Fill (word bank).** "The operator should be able to pick *Centered*, and your
   update() switches on the string `center`. Complete the item:
   `{ "text": "Centered", "value": "____" }`" Bank: `center` **(correct)**,
   `Centered`, `f2`.
   - `Centered` -> "That's the human-facing text again. The value is what lands in
     `d.f2` - and your code is listening for `center`."
   - `f2` -> "f2 is the field's *name*, not one of its choices."
4. **Fix (kernel).** QA reports a backwards "Show logo" checkbox: with it ticked the
   logo hides, and unticking it makes the logo appear. (A fix exercise - the operator
   panel doesn't run on this stage, so nothing toggles live; the QA report is the
   symptom to reason from.) The update() slice:
   ```js
   if (d.f3 == "1") {
     document.getElementById("logo").classList.add("hidden");
   } else {
     document.getElementById("logo").classList.remove("hidden");
   }
   ```
   "Checked means SHOW. Read the logic and fix it."
   - Correct: swap `add` and `remove` (or swap the branches).
   - Editing the definition's `value` to `"0"` -> "That changes the *default tick*,
     not the wiring - the box would still do the opposite of its label. Fix what the
     code does with `\"1\"`."
   - Changing `"1"` to `"true"` -> "Checkboxes arrive as the strings `\"1\"` and
     `\"0\"` - the comparison was right; the *actions* are crossed."
5. **Arrange.** A colleague's definition, in this order: panel color (`ftype:
   "color"`), Name, Title, Show logo. The rundown row preview shows
   `rgba(10,61,145,1)` - a color code. "Reorder the fields so the rundown preview
   shows tonight's name and title." Correct: Name, Title first (any order of the
   rest).
   - Leaving the color field first -> "The first two fields *are* the rundown
     preview. An operator scanning 40 items needs 'Maria Kranz - News Anchor', not a
     color code."
6. **Predict (quick tap).** "The producer wants a field for *how many seconds the
   sponsor message stays up*. Which ftype?"
   - `number` **(correct)** / `textfield` -> "It would accept 'ten-ish'. Digits
     deserve a digits-only control." / `checkbox` -> "That's an on/off. You need an
     amount."

- **Success criteria:** at least 5/6, and ex. 4 (the kernel) correct - if missed, a
  fresh backwards-switch variant (day/night on the weather panel) is asked at the end.
- **Common wrong answers:** text/value confusion (ex. 1, 2, 3 - three angles on the
  same discrimination); treating field design as an afterthought (ex. 5 - the lesson's
  headline misconception: the panel is UI *you* design for a colleague).
- **Duration:** 5-6 min.

---

## Lesson 9.3 - Capstone A: Lower third

**Format:** capstone build-from-brief. Web/tablet: free build on the empty skeleton.
Phone: assisted build (below). **Mandatory first capstone** - this is Checkpoint 7's
strap rebuilt *without training wheels*: same target, no scaffold. That is itself the
mastery statement; nothing in this build is new.

**The brief (shown as a producer's job card):**

> **Job: News lower third.**
> Fields: name, title. NN brand card applied (panel `#0a3d91`, accent `#e8b90c`,
> NN Sans with a plain fallback). Sits in the title-safe lower-left.
> In: slide + fade, decelerating, the two lines staggered, whole entrance under 0.6s.
> Out: faster than the in, accelerating.
> The operator's rundown preview must show name + title.

**Reference solution** (the checker's model - any template passing all graded checks
is accepted):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>NN Lower Third</title>

  <style>
    body { margin: 0; }

    /* the brand font travels with the template (8.3; packed in 9.8) */
    @font-face {
      font-family: 'nn-sans';
      src: url('./fonts/nn-sans.woff2');
    }

    /* the strap: pinned in the title-safe lower-left (4.2, 4.5) */
    #strap {
      position: absolute;
      left: 96px;                    /* title-safe side margin */
      bottom: 96px;                  /* the standard lower-third height */
      background-color: #0a3d91;     /* NN panel blue */
      padding: 18px 32px;            /* room inside the panel (3.8) */
      font-family: 'nn-sans', Arial, sans-serif;
      opacity: 0;                    /* invisible until play() runs (4.7) */
    }

    #f0 {                            /* the name line */
      color: #ffffff;
      font-size: 44px;
      font-weight: 700;
    }

    #f1 {                            /* the title line */
      color: #e8b90c;                /* NN accent gold */
      font-size: 28px;
      font-weight: 400;
      margin: 6px 0 0 0;             /* a small gap under the name (4.4) */
    }
  </style>

  <script src="./js/gsap.min.js"></script>

  <!-- the definition: always the LAST thing in the head (7.8) -->
  <script>
    window.SPXGCTemplateDefinition = {
      "description": "NN Lower Third",
      "playserver": "OVERLAY",
      "playchannel": "1",
      "playlayer": "7",
      "webplayout": "7",
      "out": "manual",
      "steps": "1",
      "DataFields": [
        { "field": "f0", "ftype": "textfield", "title": "Name",  "value": "Maria Kranz" },
        { "field": "f1", "ftype": "textfield", "title": "Title", "value": "News Anchor" }
      ]
    };
  </script>
</head>
<body>

  <div id="strap">
    <div id="f0">Maria Kranz</div>
    <div id="f1">News Anchor</div>
  </div>

  <script>
    // SPX calls update whenever the operator edits a field (7.6)
    function update(data) {
      var d = JSON.parse(data);
      document.getElementById("f0").textContent = d.f0;   // the f0 handshake (7.7)
      document.getElementById("f1").textContent = d.f1;
    }

    // SPX calls play when the operator takes the strap on air (7.2)
    function play() {
      var tl = gsap.timeline();
      // panel slides in and fades up, decelerating (5.4 taste, 6.3 spelling)
      tl.fromTo("#strap",
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
      // the lines land one beat apart, overlapping the panel move (6.7)
      tl.fromTo("#f0",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
      tl.fromTo("#f1",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");
      // fromTo states both ends, so a second play starts clean (6.5)
      // total entrance: 0.6s - inside the brief
    }

    // SPX calls stop to take the strap off air (7.2)
    function stop() {
      // out: faster than the in, accelerating away (5.5)
      gsap.to("#strap", { x: -40, opacity: 0, duration: 0.3, ease: "power2.in" });
    }
  </script>

</body>
</html>
```

**Staged build path** (each stage's checker gates the next; the student assembles in
this order):

1. **Structure** (U1-U2): a wrapper `div id="strap"` containing two line divs with
   ids `f0` and `f1` - the handshake ids chosen *before* any wiring exists. *Checked:*
   skeleton intact; both ids present, unique, nested inside the wrapper.
2. **Style** (U3): the brand card applied. *Checked:* panel background `#0a3d91`;
   name line white, bold, visibly larger than the title line; title line `#e8b90c`;
   a font-family naming the brand font with a fallback; padding on the panel.
3. **Position** (U4): pinned lower-left. *Checked:* `position: absolute`; left and
   bottom offsets inside title-safe (left >= 96, bottom >= 54); resting `opacity: 0`
   so nothing is on air before play.
4. **Motion** (U5-U6): the in and out timelines, run on the stage rig (temporary
   TEST IN / TEST OUT buttons execute them before the contract exists). *Checked:*
   entrance total <= 0.6s; decelerating eases on the in, accelerating on the out; out
   shorter than the in; lines staggered/overlapped; the entrance uses `fromTo`.
5. **Contract** (U7): the timelines move under `function play()` / `function stop()`;
   `update()` written (parse + two handshake writes). *Checked:* the exact names
   `play`/`stop`/`update`; `JSON.parse` present; both `f0`/`f1` written; the TEST
   buttons retire and the real PLAY/STOP take over.
6. **Fields** (7.8/9.2): the definition. *Checked:* two textfields `f0`/`f1`;
   operator-readable titles; non-empty, presentable defaults; Name and Title are the
   first two fields.

**Checklist items graded** (the full nine from 9.7 - Capstone A is the canonical
all-items delivery):
contract intact; plays/stops clean twice in a row; easing directions right; out
faster than in; title-safe respected; keyed over bright and dark video (the checker
swaps the program clip behind the strap); operator-readable field titles; sensible
defaults; preview fields first.

**Common failure modes** (returned with notes):

- *Strap visible before PLAY* (no resting opacity 0) -> "Load the template fresh: the
  strap is on air before anyone pressed PLAY. Graphics arrive by invitation only -
  start it invisible and let play() bring it in. (See: See-through, 4.7.)"
- *Second play starts dirty* (entrance written with `to`) -> "Play, stop, play again:
  the strap enters from wherever the out left it. State both ends - `fromTo`. (See:
  Full control, 6.5.)"
- *Eases swapped* -> "Your entrance accelerates and your out decelerates - backwards.
  Ins land softly (`power2.out`), outs leave in a hurry (`power2.in`). (See: 5.4/5.5.)"
- *Out slower than in* -> "The goodbye takes longer than the hello. Outs run shorter.
  (See: Exits ease in, and faster, 5.5.)"
- *Renamed contract function* (e.g. `playStrap()`) -> "PLAY does nothing: SPX calls
  the exact name `play`. The contract is a name agreement. (See: 7.2, and the
  do-not-rename list, 8.8.)"
- *Hash in getElementById* (`"#f0"`) -> "The name never updates - suspect 1 from 8.7:
  getElementById wants the name alone, no hash."
- *Strap hugging the frame edge* (left < 96) -> "Part of your strap lives outside
  title-safe - on some sets it's off the glass. (See: Safe areas, 4.5.)"
- *Preview fields wrong / defaults empty* -> "The rundown row shows nothing useful.
  Name and Title first, with presentable defaults - courtesy is graded. (See: 9.2.)"

**Phone "assisted build":** the same six stages become guided block-assembly - each
stage is 2-3 Arrange/Fill exercises over the reference solution's blocks (with
distractor blocks, Checkpoint-2 style), and the identical stage checkers and feedback
run. The lesson is labeled "assisted build" on the progress record; the app offers
(never requires) an unassisted web re-run before graduation.

**Duration:** 12-15 min.

---

## Lesson 9.4 - Capstone B: Corner bug

**Format:** capstone build-from-brief (available after Capstone A; B/C/D in any
order).

**The brief:**

> **Job: Channel bug.**
> The NN logo, pinned top-right, inside title-safe. Fields: sponsor line (text), and
> a checkbox to show/hide it. A subtle looping idle animation (breathing scale - felt,
> not seen). It sits on a high layer and must survive a full show: the out setting
> must suit an always-on graphic.

**Reference solution:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>NN Corner Bug</title>

  <style>
    body { margin: 0; }

    @font-face {
      font-family: 'nn-sans';
      src: url('./fonts/nn-sans.woff2');
    }

    /* pinned to the title-safe top-right corner (4.3, 4.5) */
    #bug {
      position: absolute;
      top: 54px;                       /* title-safe top margin */
      right: 96px;                     /* title-safe side margin */
      opacity: 0;                      /* invisible until play() (4.7) */
      font-family: 'nn-sans', Arial, sans-serif;
    }

    /* the idle breathing - subtle on purpose (5.7) */
    @keyframes breathe {
      0%   { transform: scale(1); }
      50%  { transform: scale(1.03); }   /* keep it under 1.05: it's a bug, not a beacon */
      100% { transform: scale(1); }
    }
    /* the breathing lives on the logo; the in/out lives on the wrapper -
       two motions, two elements, no fighting over transform */
    #logo {
      animation: breathe 4s ease-in-out infinite;
    }

    #f0 {                              /* the sponsor line */
      color: #ffffff;
      font-size: 20px;
      font-weight: 400;
      margin: 6px 0 0 0;
      transition: opacity 0.3s;        /* show/hide fades, never snaps (5.3) */
    }

    /* the checkbox switches this class on and off (8.4) */
    .hidden {
      opacity: 0;
    }
  </style>

  <script src="./js/gsap.min.js"></script>

  <script>
    window.SPXGCTemplateDefinition = {
      "description": "NN Corner Bug",
      "playserver": "OVERLAY",
      "playchannel": "1",
      "playlayer": "19",     // high layer: the bug rides above the straps (9.1)
      "webplayout": "19",
      "out": "manual",       // the operator takes it out at the end - never a timer
      "steps": "1",
      "DataFields": [
        { "field": "f0", "ftype": "textfield", "title": "Sponsor line", "value": "with NN Weather" },
        { "field": "f1", "ftype": "checkbox",  "title": "Show sponsor line", "value": "1" }
      ]
    };
  </script>
</head>
<body>

  <div id="bug">
    <img id="logo" src="./images/nn-logo.png">
    <div id="f0">with NN Weather</div>
  </div>

  <script>
    function update(data) {
      var d = JSON.parse(data);
      var sponsor = document.getElementById("f0");
      sponsor.textContent = d.f0;
      // the checkbox arrives as "1" (checked) or "0" (unchecked) (9.2)
      if (d.f1 == "1") {
        sponsor.classList.remove("hidden");
      } else {
        sponsor.classList.add("hidden");
      }
    }

    function play() {
      // pop in: scale up from nothing, decelerating (5.2 idea, 6.3 spelling)
      gsap.fromTo("#bug",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
    }

    function stop() {
      // out: quicker, accelerating (5.5)
      gsap.to("#bug", { scale: 0.8, opacity: 0, duration: 0.25, ease: "power2.in" });
    }
  </script>

</body>
</html>
```

**Staged build path:**

1. **Structure:** wrapper `div id="bug"` holding `img id="logo"` (src from the asset
   drawer) and `div id="f0"` for the sponsor line. *Checked:* nesting, ids, the img
   src spelled against the drawer (2.5's habit).
2. **Style:** sponsor line styled small and white; brand font; the `.hidden` class
   defined; a transition so show/hide fades. *Checked:* `.hidden` exists and only
   changes opacity; transition present on the sponsor line.
3. **Position:** pinned with `top`/`right` inside title-safe; resting opacity 0.
   *Checked:* right/bottom-style pinning used (4.3 - not a magic-number `left`);
   top >= 54, right >= 96; nothing on air before play.
4. **Motion:** the breathing keyframes on the logo + the pop in / quick out on the
   wrapper, on the stage rig. *Checked:* `infinite` loop present; **amplitude at or
   under 1.05 - taste, codified: the checker flags anything bigger**; the loop and
   the in/out animate *different elements*; out shorter than in, eases correct.
5. **Contract:** play/stop wired; update writes the sponsor text and switches
   `.hidden` from the checkbox. *Checked:* exact names; JSON.parse; the `"1"`/`"0"`
   comparison drives the class the right way round (9.2's kernel, live).
6. **Fields:** textfield + checkbox; the **out setting**. *Checked:* checkbox default
   `"1"`; titles readable; `out` is `"manual"` - the stage asks one recognize-level
   question first: "`out: \"manual\"` vs `\"none\"` vs `\"4000\"` - which suits a
   graphic that must survive a full show, and what would the other two do?" (STOP
   animates out / play-only, no out / auto-out after 4000 ms.)

**Checklist items graded:** all nine, with capstone-specific readings - title-safe =
the top-right pin; keyed over bright and dark = the transparent-PNG logo is checked
over the white ice of the HIFK-TPS clip *and* a night-news clip; plus the extra
amplitude check (<= 1.05) from stage 4.

**Common failure modes:**

- *The bug does jumping jacks* (amplitude > 1.05) -> "Idle motion on an always-on
  graphic should be felt, not seen. Halve the scale change. (Taste, codified - see
  5.7 and the brief.)"
- *In/out fights the breathing* (both on the same element) -> "Two drivers, one
  steering wheel: your GSAP in/out and the CSS breathing both animate the logo's
  transform, so one of them loses. Breathe the logo, fly the wrapper."
- *Checkbox wired backwards* -> "Ticked hides, unticked shows - 9.2's classic, in the
  wild. Read what your code does with `\"1\"`."
- *`out` set to `"4000"`* -> "Your bug clocked out four seconds into the show:
  a millisecond `out` auto-stops the layer. An always-on graphic wants `\"manual\"`."
- *Bug outside title-safe* (top < 54) -> "On a cropped consumer set your logo kisses
  the bezel. Title-safe applies to corners most of all. (See 4.5.)"
- *White-boxed logo file* (picked a non-transparent decoy from the drawer) -> "That
  PNG carries its own white background - over video it's a white sticker. Use the
  transparent one. (See 2.5, keying 1.3.)"

**Phone "assisted build":** stages as block-assembly; stage 4's amplitude check
becomes a Predict ("which of these three breathing strengths belongs on air?") plus
a slider that live-previews the scale, before the blocks are placed.

**Duration:** 10-12 min.

---

## Lesson 9.5 - Capstone C: Full-screen title

**Format:** capstone build-from-brief (any order within B/C/D).

**The brief:**

> **Job: Election full-screen.**
> Fields: title, subtitle, panel color (dropdown driving a CSS variable).
> Two steps: Play reveals the title; Continue reveals the subtitle; Stop clears.
> The panel covers the frame - deliberately.

**Reference solution:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>NN Election Full-screen</title>

  <style>
    /* the dial at the top: the house default panel color (8.2) */
    :root {
      --panel: #0a3d91;
    }

    body { margin: 0; }

    @font-face {
      font-family: 'nn-sans';
      src: url('./fonts/nn-sans.woff2');
    }

    #full {
      opacity: 0;                      /* the whole graphic waits for play() */
      font-family: 'nn-sans', Arial, sans-serif;
    }

    /* pinned to all four edges = covers the frame on purpose (4.2, 4.3; 1.3 inverted knowingly) */
    #panel {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--panel);  /* the variable holds the default; the operator's pick overrides it */
    }

    #f0 {                              /* the title */
      position: absolute;
      left: 96px;                      /* text stays inside title-safe even when the panel doesn't */
      top: 420px;
      color: #ffffff;
      font-size: 96px;
      font-weight: 700;
    }

    #f1 {                              /* the subtitle */
      position: absolute;
      left: 96px;
      top: 560px;
      color: #e8b90c;
      font-size: 44px;
      font-weight: 400;
    }
  </style>

  <script src="./js/gsap.min.js"></script>

  <script>
    window.SPXGCTemplateDefinition = {
      "description": "NN Election Full-screen",
      "playserver": "OVERLAY",
      "playchannel": "1",
      "playlayer": "4",      // full-screens live behind the straps and the bug
      "webplayout": "4",
      "out": "manual",
      "steps": "2",          // enables the Continue button (8.6)
      "DataFields": [
        { "field": "f0", "ftype": "textfield", "title": "Title",    "value": "ELECTION NIGHT" },
        { "field": "f1", "ftype": "textfield", "title": "Subtitle", "value": "Live results from all 13 districts" },
        { "field": "f2", "ftype": "dropdown",  "title": "Panel color", "value": "#0a3d91",
          "items": [ { "text": "NN Blue",    "value": "#0a3d91" },
                     { "text": "Midnight",   "value": "#101828" },
                     { "text": "Result Red", "value": "#8a1526" } ] }
      ]
    };
  </script>
</head>
<body>

  <div id="full">
    <div id="panel"></div>
    <div id="f0">ELECTION NIGHT</div>
    <div id="f1">Live results from all 13 districts</div>
  </div>

  <script>
    function update(data) {
      var d = JSON.parse(data);
      document.getElementById("f0").textContent = d.f0;
      document.getElementById("f1").textContent = d.f1;
      // the dropdown's value is a color string - write it onto the panel (8.5);
      // if the field is ever empty, the CSS variable's house default shows through
      document.getElementById("panel").style.backgroundColor = d.f2;
    }

    // step 1: Play reveals the panel and the title
    function play() {
      var tl = gsap.timeline();
      // zero-second tweens are just "set it now": wrapper on, subtitle hidden -
      // every run starts from the same clean state (the 6.5 lesson, at phase scale)
      tl.to("#full", { opacity: 1, duration: 0 });
      tl.to("#f1",   { opacity: 0, duration: 0 });
      tl.fromTo("#panel",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" });
      tl.fromTo("#f0",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");
    }

    // step 2: SPX calls next() when the operator presses Continue (8.6)
    function next() {
      gsap.fromTo("#f1",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    }

    // Stop clears the whole graphic at once
    function stop() {
      gsap.to("#full", { opacity: 0, duration: 0.4, ease: "power2.in" });
    }
  </script>

</body>
</html>
```

**Staged build path:**

1. **Structure:** wrapper `#full` holding `#panel`, `#f0`, `#f1`. *Checked:* the
   panel is a *separate* element from the text (so it can be colored and faded on its
   own); ids in place.
2. **Style:** `:root { --panel: ... }` + `var(--panel)` on the panel; title huge and
   white, subtitle gold. *Checked:* the variable is defined once and used (8.2 - the
   dial, not the wires); type sizes read from a couch.
3. **Position:** panel pinned to **all four edges**; text block inside title-safe.
   *Checked:* top/left/right/bottom all 0 on the panel (full coverage, no gaps);
   text left >= 96; wrapper resting opacity 0.
4. **Motion:** two coordinated timelines plus the reveal - play's timeline (panel,
   then title overlapped), next's subtitle reveal, stop's clear - on the stage rig,
   which gets a TEST CONTINUE button here. *Checked:* subtitle is NOT visible after
   the in; the full Play -> Continue -> Stop cycle leaves nothing behind; eases and
   out-faster-than-in as always.
5. **Contract:** `play()` / `next()` / `stop()` / `update()` under their exact names.
   *Checked:* all four present; `next` spelled `next` (not `continue` - see failure
   modes); update writes both texts and the panel color via `style.backgroundColor`
   (8.5).
6. **Fields:** two textfields + the dropdown. *Checked:* dropdown items carry
   text/value pairs; **the field's `value` equals one item's `value`** (9.2's rule);
   `"steps": "2"` set; Title and Subtitle are the first two fields.

**Checklist items graded:** all nine, with capstone-specific readings - item 2
(clean twice) becomes *the full three-button cycle clean twice*: Play -> Continue ->
Stop, run back to back, must leave no half-revealed subtitle or ghost panel; item 6
(keyed over bright and dark) inverts: the checker verifies the panel *fully covers*
both clips - a full-screen that leaks video at an edge fails; title-safe applies to
the text block.

**Common failure modes:**

- *Continue greyed out* (steps left at "1") -> "The operator can't reach your second
  phase: `\"steps\": \"2\"` is what enables Continue. (See 8.6.)"
- *Named the phase function `continue()`* -> "Two problems: SPX calls `next()`, and
  `continue` is a word JavaScript keeps for itself - the script dies before the show
  starts. The contract name is `next`."
- *Subtitle already up on Play* -> "Play, then look: phase 2 leaked into phase 1.
  play() must start the subtitle hidden - each phase reveals its own piece."
- *Second run dirty* (stop fades `#full`, play never restores it) -> "Play, stop,
  play: black screen. Whatever stop() hides, play() must bring back - the zero-second
  reset tween is the idiom."
- *Panel doesn't quite cover* (only top/left pinned) -> "There's live video peeking
  out of the bottom-right - this graphic covers the frame *on purpose*. Pin all four
  edges."
- *Dropdown default is the text* (`"value": "NN Blue"`) -> "9.2's rule: the field's
  value must equal one of the items' *values* - the hex string your code receives."
- *Color written to the text* (`f0.style.backgroundColor` or textContent) -> "The
  operator picked Midnight and got a hex code on air / a navy headline. The color
  belongs to the panel element. Trace the wire (7.7)."

**Phone "assisted build":** block-assembly per stage; stage 4 additionally has the
student *operate* their own half-built graphic (Play -> Continue -> Stop from the
simulated panel) between placements, so phase leakage is seen, not described.

**Duration:** 12-15 min.

---

## Lesson 9.6 - Capstone D: Ticker

**Format:** capstone build-from-brief (any order within B/C/D) - deliberately the
hardest, and the only one with GIVEN boilerplate blocks.

**The brief:**

> **Job: Bottom-of-frame news ticker.**
> Field: headlines (textarea, one per line).
> Continuous loop, readable speed, safe-area aware, panel opaque enough to read over
> anything. Updates may arrive mid-show - the ticker must not jump.

**Reference solution:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>NN News Ticker</title>

  <style>
    body { margin: 0; }

    @font-face {
      font-family: 'nn-sans';
      src: url('./fonts/nn-sans.woff2');
    }

    /* pinned to BOTH sides = the bar spans the full frame width (4.2 + 4.3);
       a ticker is a deliberate full-bleed strip, like the full-screen's cover -
       nothing STATIC may break the side margins, but the crawl passes through */
    #bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #0a3d91;   /* fully opaque: it must read over anything */
      padding: 16px 0;
      opacity: 0;                  /* invisible until play() (4.7) */
    }

    #crawl {
      color: #ffffff;
      font-family: 'nn-sans', Arial, sans-serif;
      font-size: 30px;
      white-space: nowrap;         /* GIVEN: keeps the whole crawl on one line */
    }
  </style>

  <script src="./js/gsap.min.js"></script>

  <script>
    window.SPXGCTemplateDefinition = {
      "description": "NN News Ticker",
      "playserver": "OVERLAY",
      "playchannel": "1",
      "playlayer": "5",
      "webplayout": "5",
      "out": "manual",     // stopped by the operator; "none" would make it play-only
      "steps": "1",
      "DataFields": [
        { "field": "f0", "ftype": "textarea", "title": "Headlines (one per line)",
          "value": "Storm warning issued for the west coast\nParliament votes on the budget tonight\nHIFK beats TPS 4 - 2 in the derby" }
      ]
    };
  </script>
</head>
<body>

  <div id="bar">
    <div id="crawl"></div>
  </div>

  <script>
    function update(data) {
      var d = JSON.parse(data);
      // GIVEN idiom: the textarea holds one headline per line - split on "\n"
      var items = d.f0.split("\n");
      // separators between every headline - and around the seam where the loop joins
      setHeadlines(" +++ " + items.join(" +++ ") + " +++ ");
    }

    function play() {
      gsap.fromTo("#bar",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    }

    function stop() {
      gsap.to("#bar", { y: 60, opacity: 0, duration: 0.3, ease: "power2.in" });
    }

    // ===== GIVEN: the crawl engine - boilerplate you can reuse in any ticker =====
    // New text is queued and swapped in ONLY at the loop point, while the crawl
    // is off-screen - so a mid-show update never jumps under the reader's eyes.
    var crawlTween = null;    // the running crawl
    var pendingText = "";     // headlines waiting for the next loop

    function setHeadlines(text) {
      pendingText = text;
      if (!crawlTween) { swapAndRestart(); }    // first delivery: start at once
    }

    function swapAndRestart() {
      var el = document.getElementById("crawl");
      el.textContent = pendingText;
      var width = el.offsetWidth;               // how wide the text really is
      if (crawlTween) { crawlTween.kill(); }
      // constant SPEED, whatever the length: 160 px per second reads comfortably
      // at this size - about two words a second past a fixed point
      crawlTween = gsap.fromTo(el,
        { x: 1920 },
        { x: -width,
          duration: (1920 + width) / 160,
          ease: "none",                         // a crawl runs linear - no easing
          repeat: -1,
          onRepeat: swapAndRestart });          // swap text only while off-screen
    }
    // ===== end of GIVEN block =====
  </script>

</body>
</html>
```

**Staged build path:**

1. **Structure:** `#bar` holding `#crawl`. *Checked:* two separate elements - the bar
   is the panel, the crawl is the moving text; the GIVEN engine block pasted in
   unmodified (the checker verifies it wasn't "improved").
2. **Style:** opaque NN-blue bar, white 30px crawl text, brand font, the GIVEN
   `white-space: nowrap` line in place. *Checked:* the bar's resting background is
   fully opaque; text size >= 24px (couch-readable).
3. **Position:** bar pinned `left: 0; right: 0; bottom: 0` - both sides pinned
   stretches it across the frame. *Checked:* full-width; resting opacity 0; nothing
   *static* (the bar carries no label in this build) breaks the side margins.
4. **Motion:** the bar's in/out on the stage rig, plus the crawl running from the
   GIVEN engine. *Checked:* in/out timing and eases as always; **crawl speed at or
   under ~3 words per second past a fixed point** (the broadcast readability
   guideline - the reference's 160 px/s is about 2); crawl ease is linear.
5. **Contract:** play/stop wired; `update()` = parse, split (`d.f0.split("\n")` -
   the GIVEN one-line idiom), join with separators, hand to `setHeadlines()`.
   *Checked:* exact names; new text routes through `setHeadlines`, never straight
   into the element; separators present including around the seam.
6. **Fields:** one textarea, titled so an operator knows the format. *Checked:*
   `ftype: "textarea"`; title mentions one-per-line; default carries three real
   headlines (the rundown preview shows the first field - here, the headlines
   themselves).
   Then the live-update drill: with the ticker running, the student edits the
   headlines in the panel mid-crawl and *verifies* the swap happens at the loop
   point, not under the reader's eyes.

**Checklist items graded:** all nine (title-safe read as stage 3's rule: the crawl
strip is a deliberate frame-edge element; static content must respect side margins),
plus two capstone-specific checks - readable speed (<= ~3 words/s) and the no-jump
live update (the checker edits the field mid-crawl and watches for a snap).

**Common failure modes:**

- *Unreadable speed* (SPEED constant cranked, or duration hand-set) -> "Your crawl
  passes seven words a second - nobody reads that under a headline. Aim for two to
  three. (The guideline is graded.)"
- *Mid-crawl jump* (update writes `el.textContent` directly) -> "The headline changed
  under the reader's eyes. Route new text through setHeadlines() - it swaps at the
  loop point, off-screen. That's the whole reason the GIVEN engine exists."
- *Split on the wrong thing* (`split(",")`) -> "The operator writes one headline per
  LINE - the textarea delivers them with `\\n` between. The given idiom splits on
  that."
- *Seam collision* (no leading/trailing separator) -> "Where the loop rejoins, the
  last headline crashes into the first: '...derbyStorm warning...'. The seam needs a
  separator too."
- *See-through bar* (resting opacity 0.6 "for style") -> "Over the white ice of the
  HIFK game your headlines vanish. The brief says opaque - animate the *entrance*,
  not the resting look. (Checklist item 6 catches this.)"
- *Eased crawl* (`power2.out` on the loop) -> "A crawl that speeds up and slows down
  is seasickness in text form. Loops run linear - `ease: \"none\"`."

**Phone "assisted build":** stages as block-assembly; the GIVEN engine arrives as a
single sealed block (like the old boilerplate seals - "reuse, don't rebuild"); the
stage-6 live-update verification is fully phone-doable and required.

**Duration:** 12-15 min.

---

## Lesson 9.7 - The delivery checklist

- **New concept:** professional QA as a habit - the written checklist a graphic must
  pass before it ships. During the capstones this list ran silently as the grader;
  now it moves into the student's own hands, for every template they'll ever ship.
- **Learner-facing explanation:** "Before a graphic goes to a real show, a
  professional runs the same short list, every time - because eyes forgive and
  checklists don't. From now on, this list is yours."
- **Context:** the student runs the checklist against their own four capstones - and
  against one planted-fault template that *looks* fine until item 4.
- **Recycles:** the entire course, as a habit rather than a test - 8.8's contract
  list, 6.5's double-play, 5.4/5.5's easing taste, 4.5's safe areas, 1.3's keying,
  7.8/9.2's field courtesy.

**The delivery checklist (course canon):**

1. **Contract intact** - `play`, `stop`, `update`, `next` (if stepped), the `fN` ids,
   and `SPXGCTemplateDefinition` all present and unrenamed (8.8's list).
2. **Plays and stops clean twice in a row** - the double-play test; both ends stated
   (6.5).
3. **Easing directions right** - entrances decelerate, exits accelerate (5.4/5.5).
4. **Out faster than in** (5.5).
5. **Title-safe respected** - nothing important outside the 96/54 margins (4.5).
6. **Keyed correctly over bright AND dark video** (1.3, 4.8).
7. **Field titles an operator can read** - "Name", not "f0 text" (7.8/9.2).
8. **Sensible defaults** - the template plays presentably before anyone types (9.2).
9. **Preview fields first** - the two fields the rundown row should show come first
   (7.8).

**Exercises**

1. **Checklist-run (kernel).** The planted-fault template: a handsome sports strap
   that passes items 1-3 - and fails item 4 (the out runs 0.9s against a 0.5s in).
   The student walks the list item by item, ticking or flagging, and must flag item 4.
   - Flagging nothing -> "It *looks* fine - that's the point. Don't watch the
     graphic; time it. What do items 3 and 4 make you actually measure?"
   - Flagging the right item -> "Your eye said fine; the list said no. That's why
     pros run it."
2. **Predict.** "A strap plays clean the first time, but the second play starts from
   half-off-screen. Which checklist item catches it?"
   - A) Item 2 - plays and stops clean twice in a row. **(correct)** - "And the fix
     is 6.5's: state both ends with fromTo."
   - B) Item 3. -> "Easing direction is about *feel*, not starting state. Dirty
     re-plays are exactly what the double-play test exists for."
   - C) Item 5. -> "Title-safe is about *where*, not *when*. Run it twice - that's
     the test that catches it."
3. **Rank (severity judgment).** "A colleague's template fails four items and there's
   time to fix only two before air. Which two first?"
   Failing: (a) out slower than in, (b) fields shown to the operator as raw
   `f0`/`f1`, (c) the name line sits outside title-safe, (d) second play starts
   dirty.
   - Correct: **(c) and (d)** - "What the *viewer* sees beats what the operator sees,
     and what breaks *every* play beats what merely looks unhurried. (a) and (b) get
     fixed after the show."
   - Picking (b) first -> "Ugly field names hurt the operator, not the audience.
     On-air damage first."
4. **Predict.** "A strap is white text with no panel. Over the night-news clip it
   looks perfect. Which item is still unchecked - and what will it find?"
   - A) Item 6 - over the bright hockey ice the text disappears; keying must be
     checked over bright AND dark. **(correct)**
   - B) Item 5 - it's off safe. -> "Position wasn't the issue - contrast is. One clip
     is not a keying check."
   - C) None - it played fine. -> "'It played once, it's done' is the exact
     misconception this lesson kills. One background is half a check."
5. **Checklist-run (own work).** The student picks one of their four capstones and
   re-runs the full list on it by hand, ticking each item. (The app compares against
   its own graded results; disagreements open the relevant item's source lesson.)

- **Success criteria:** ex. 1 (the kernel) flags the correct item; at least 4/5
  overall.
- **Common wrong answers:** trusting the first clean play (ex. 2, 4 - "it played
  once, it's done" is the headline misconception); ranking operator comfort above
  on-air correctness (ex. 3).
- **Duration:** 5 min.

---

## Lesson 9.8 - Shipping the file

- **New concept:** what you actually hand over - the template `.html` plus its assets
  (images, fonts, libraries) in the SPX folder convention
  (`ASSETS/templates/<company>/<project>/`), and why every path in the file is
  *relative* (`./images/nn-logo.png`) so the folder survives the move to another
  machine.
- **Learner-facing explanation:** "A template isn't one file - it's a folder: the
  `.html` plus every image, font, and script it points at. Ship the folder, and keep
  every path *relative* (starting `./`), so the links hold wherever the folder lands.
  A path that starts `C:\` points at *your* machine - and dies on everyone else's.
  Paths that start with `/` are different again: they reach into the playout server's
  global asset pool (`/media/images/...`)."
- **Context:** the app's Export packs each capstone into a correctly-shaped folder;
  the student inspects the tree, then breaks-and-fixes one absolute path.
- **Recycles:** src (2.5), @font-face paths (8.3 - planted for exactly this moment),
  the capstone asset drawer.

**The packed tree (Observe target):**
```
ASSETS/templates/
  nn/
    news/
      LowerThird.html
      images/nn-logo.png
      fonts/nn-sans.woff2
      js/gsap.min.js
```

**Exercises**

1. **Observe.** The Export of Capstone A, shown as the tree above. "Tap the file the
   operator's rundown will actually point at." Correct: `LowerThird.html`.
   - Tapping an asset -> "That file is luggage. The template - the `.html` - is the
     passenger; SPX lists templates, and each template drags its folder along."
2. **Predict (kernel).** "This template moves to the playout machine. Which of its
   three image paths breaks?"
   - A) `src="C:\Users\mkranz\Desktop\nn-logo.png"` **(correct)** - "The classic
     handover killer: it names *your* disk. The playout machine has no mkranz."
   - B) `src="./images/nn-logo.png"` -> "Relative paths travel: './' means 'next to
     this very file', true on any machine the folder lands on."
   - C) `src="/media/images/bg/studio.png"` -> "A leading '/' reaches the playout
     server's own global asset pool - it's *meant* to resolve there, not here."
3. **Fill (word bank).** "Point the strap at its packed logo:
   `src="./images/____"`" Bank: `nn-logo.png` **(correct)**, `C:\nn-logo.png`,
   `images/nn-logo.png`.
   - `C:\nn-logo.png` -> "A drive letter in a shipped template is a time bomb. Stay
     inside the folder: relative."
   - `images/nn-logo.png` -> "Nearly - the convention starts relative paths with
     `./` ('from this file's folder'), and the packer checks for it."
4. **Fix.** Capstone A's @font-face reads
   `src: url('C:\Users\mkranz\fonts\nn-sans.woff2');` - it renders perfectly *here*.
   "It works on this machine only. Fix it so it works on every machine."
   - Correct: `./fonts/nn-sans.woff2`.
   - "But it works!" (a tempting 'looks fine' button is offered and rejected) ->
     "It works because *you* are mkranz. 'Works here' and 'works there' are different
     claims - only relative paths make them the same claim."
5. **Predict.** "In another template you find `src="/media/video/intro.mp4"`. What is
   that path saying?"
   - A) Fetch from the playout server's global media pool. **(correct)**
   - B) It's broken - no `./`. -> "Not broken - different: a leading `/` deliberately
     leaves the template folder for the server's shared assets."
   - C) Fetch from the template's own folder. -> "That would start `./`. A bare `/`
     goes to the *global* pool - shared across all templates on the server."

- **Success criteria:** at least 4/5, and ex. 2 (the kernel) correct - the
  works-here/works-there discrimination is what this lesson exists for.
- **Common wrong answers:** "it works here = it works there" (ex. 2, 4 - the headline
  misconception, given a visible temptation in ex. 4); reading global `/` paths as
  broken relatives (ex. 5).
- **Duration:** 5 min.

---

## Lesson 9.9 - (Optional) The real thing

- **New concept:** running your template in actual SPX - point SPX at a template
  folder, add the template to a real rundown, fill fields, play out via web playout
  in a browser window; where CasparCG sits when a real video mixer is involved
  (awareness level only).
- **Learner-facing explanation:** "Everything you built runs in the real SPX exactly
  as it ran in the simulator - same definition, same contract, same buttons. This
  lesson walks you through proving it. The app can't see your machine, so this one
  ends with a self-check, not a grade. Everyone graduates in-app; this is the bridge
  for those with SPX access."
- **Context:** a guided, screenshot-led walkthrough using Capstone A's exported
  folder from 9.8. Optional; gates nothing.
- **Recycles:** 9.8's folder shape, the whole contract (7.2/7.6/7.8), the operator's
  desk (9.1 - now for real).

**The walkthrough (screenshot-led steps):**

1. Install and launch SPX on your machine (link-out to the SPX site; the course
   stays out of installer weeds).
2. Copy your exported folder into SPX's assets so it sits at
   `ASSETS/templates/nn/news/` - the exact shape 9.8 packed.
3. Create a project and add `LowerThird.html` to a rundown. Recognize the moment:
   the panel that appears *is your 7.8 definition*, field for field.
4. Open **web playout** in a browser window - that browser page is the renderer,
   your 1920x1080 canvas from 1.3, live.
5. Fill the fields (tonight's name), press **Play**. Your strap, on a real rundown.
   Stop it. Play it again - item 2 of your own checklist, in the wild.
6. **Where CasparCG sits (awareness only):** when a real video mixer or SDI output
   is involved, SPX sends the same template to a CasparCG server behind it, which
   plays the page into the broadcast chain. Your template does not change - the
   renderer does.

**Self-check (ungraded - the app cannot verify this lesson):**

1. **Self-check (kernel).** "Did your strap play in SPX's web playout, with your
   fields driving it?" (Yes -> "Then you have shipped a working template to a real
   SPX rundown - the course's promise, kept outside the app.")
2. **Troubleshooting pointers** (each maps back to a lesson):
   - *Template not listed in SPX* -> the folder path/shape - re-walk 9.8's tree.
   - *Plays, but the strap is empty* -> field defaults and the handshake - 7.7/7.8;
     check the panel actually shows your fields.
   - *Plays in, never goes out* -> `stop()` missing or renamed - 7.2, 8.8's list.
   - *Logo or font missing on this machine* -> an absolute path survived - 9.8's
     fix, again.

- **Success criteria:** self-reported; nothing gates on it.
- **Common wrong answers:** n/a (self-checked) - the troubleshooting table stands in
  for feedback.
- **Duration:** 10-15 min, self-paced.

---

## Graduation

All four capstones pass the 9.7 checklist and play correctly from the simulated
rundown. The student leaves with four working SPX template files - lower third,
corner bug, full-screen title, ticker - exported in the 9.8 folder shape, each one
built from a brief on an empty skeleton. And, per the course's real mission, the
fluency to open any *fifth* template the internet or an AI hands them: find the four
landmarks, trace the wires, change it with confidence, and run the checklist before
it ships.

**Unit 9 total learner time:** ~75-95 min across 8 sessions (9.9 optional excluded;
the upper bound includes capstone returned-with-notes loops).
