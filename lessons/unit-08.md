# Unit 8 - Other People's Templates (full lesson plans)

**Unit goal:** the course's stated real-world job: open an unfamiliar template - from
the internet or an AI - find your way around, and make small changes safely.
**Promise:** after this unit you can open a template you've never seen, find your way
around, and change it with confidence.
**Prerequisites:** Units 0-7 (the whole contract is known; this unit is structured
recycling plus the reading-fluency toolkit).
**Format note:** from here, most exercises use *unfamiliar* code the student has never
seen - realistic templates with unfamiliar naming, ordering, and styling choices. New
graphics rotate in (an esports scoreboard, a morning-show strap, a weather panel) so
nothing is recognizable from memory.

## Conventions used in these plans

- As in unit-01.md: every exercise screen has the render, the code slice, and the task;
  PLAY/STOP (and from 8.6, CONTINUE) are real calls into the template.
- **The unfamiliar-code rule:** every stranger's template is still built only from
  taught tokens (Units 0-7 plus this unit's own progression) - what's unfamiliar is the
  *author*: their names, their ordering, their comments, their habits. Anything genuinely
  untaught stays folded behind a `...` region the student never needs to open.
- New UI affordances this unit: **collapsible landmark regions** in the code panel
  (8.1 onward), the **console strip** returning from 7.3 (8.4), and a **diff view**
  (8.8).
- Rotating stranger templates, each with its own consistent authoring style:
  - **"ARENA CLASH" esports scoreboard** - camelCase ids (`bugRoot`, `teamsRow`),
    terse gamer comments (`/* arena clash scorebug :: rze :: v2 final FINAL */`).
  - **"Morning Light" morning-show strap** - snake_case (`ml_strap`, `ml_badge`),
    tidy design-token block at the top.
  - **"SKYWATCH" weather panel** - kebab-case ids (`w-panel`), verbose comments.

---

## Lesson 8.1 - The anatomy map

- **New concept:** a skim strategy that works on *any* template, in order: (1) the
  definition - what can the operator change? (2) the body - what elements exist?
  (3) the styles - what's the look? (4) the functions - what happens on
  play/update/stop? Four landmarks, always present, whatever the author's style.
- **Learner-facing explanation:** "You will spend your career reading templates other
  people wrote. Never read them like a book. Skim for the four landmarks every template
  has: the definition (what can the operator change?), the body (what's on screen?),
  the styles (what's the look?), the functions (what happens on play, update, stop?).
  Four stops, in that order - and any template opens up."
- **Context:** a stranger's ARENA CLASH esports scoreboard - at ~120 lines, longer and
  messier than anything the course has shown. The code panel gains collapsible landmark
  regions; folded regions show a one-line summary and a line count.
- **Recycles:** the skeleton (2.6 - head/body is the map's terrain), the contract
  (7.2 - the functions landmark is play/update/stop; 7.8 - the definition landmark).

**Code slice (folded map, used by ex. 1-3 and 5):**
```html
<html>
<head>
  <style>
    /* arena clash scorebug :: rze :: v2 final FINAL */
    ... 58 lines: colors, positions, the works ...
  </style>
  <script>
    window.SPXGCTemplateDefinition = {
      "description": "Arena Clash match bug",
      "DataFields": [
        { "field": "f0", "ftype": "textfield", "title": "Team left",  "value": "NOVA FIVE" },
        { "field": "f1", "ftype": "textfield", "title": "Team right", "value": "IRON WOLVES" },
        { "field": "f2", "ftype": "textfield", "title": "Maps left",  "value": "2" },
        { "field": "f3", "ftype": "textfield", "title": "Maps right", "value": "1" },
        { "field": "f4", "ftype": "textfield", "title": "Series label", "value": "GRAND FINAL - BEST OF 5" }
      ]
    };
  </script>
</head>
<body>
  <div id="bugRoot">
    ... 14 lines: team boxes, map scores, the series label ...
  </div>
  <script>
    function update(data) { ... 7 lines ... }
    function play() { ... 5 lines ... }
    function stop() { ... 3 lines ... }
  </script>
</body>
</html>
```

**Exercises**

1. **Observe (four taps, in order).** "Skim this stranger's template. Tap the four
   landmarks in skim order: the definition, the elements, the styles, the functions."
   - Correct: the definition `<script>` in the head -> `#bugRoot` in the body -> the
     `<style>` block -> the body `<script>` with play/update/stop.
   - Tapping the styles first: "Styles are stop three. Start where the operator starts:
     what can they change? That's the definition."
   - Tapping the body script first: "Functions are the *last* stop - what happens only
     makes sense once you know what exists and what the operator feeds it."
2. **Predict (kernel).** "You have unfolded nothing except the definition. How many
   fields will the operator panel show?"
   - A) 5 **(correct)** - "One landmark, one glance - and you already know the whole
     operator side of this template. That's why the skim starts here."
   - B) You can't know without reading update(). -> "You can - the definition alone
     *is* the operator panel. update() only says where the values land. Landmark 1
     answers operator questions by itself."
   - C) 2. -> "Two fields feed the rundown *preview* (Unit 7) - but count the
     DataFields entries: five fields on the panel."
3. **Observe (timed, 20 seconds).** "Find where the entrance animation lives. Tap the
   landmark region - 20 seconds."
   - Correct: `function play()` in the body script; unfolding it confirms:
     ```js
     function play() {
       var tl = gsap.timeline();
       tl.fromTo("#bugRoot", { y: -140, opacity: 0 },
                             { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" });
       tl.to("#seriesLabel", { opacity: 1, duration: 0.4 }, "-=0.2");
     }
     ```
   - Tapping `<style>`: "Styles *can* animate (Unit 5) - but this is a GSAP template,
     and in a GSAP template the entrance lives where SPX calls it: play(), landmark 4."
   - Timer expiring: "That's what line-by-line reading costs. Jump straight to
     landmark 4 - the functions - and try again."
4. **Fill (drag labels, transfer to a second template).** The SKYWATCH weather panel
   appears, folded, its regions in a different order of prominence (huge style block,
   tiny body). "Same map, different terrain: drag the labels *definition* / *elements*
   / *styles* / *functions* onto the four regions."
   - Wrong placement: "The author's style changed - the landmarks didn't. The
     definition is always the `SPXGCTemplateDefinition` script in the head, whoever
     wrote it."
5. **Predict.** "The producer asks: *'Can the operator change the series label, or is
   it hard-coded?'* Which landmark answers fastest?"
   - A) The definition. **(correct)** - "One glance: 'Series label' is field f4. If it
     weren't listed there, it would be hard-coded."
   - B) The body. -> "The body shows the element exists - but not whether the operator
     can *change* it. The definition lists exactly what they can touch."
   - C) The functions. -> "update() would tell you eventually - after reading code.
     The definition tells you at a glance. Skim order is answer order."

- **Success criteria:** at least 4/5, including the kernel (ex. 2); the timed find
  (ex. 3) completed within two attempts.
- **Common wrong answers:** reading top-to-bottom line-by-line like prose - the timed
  exercise makes the cost visible; starting the skim at the styles because they come
  first in the file (ex. 1 feedback re-anchors the *question order*, not file order).
- **Duration:** 5 min.

---

## Lesson 8.2 - The control panel at the top

- **New concept:** CSS variables - `:root { --accent: #f2a03d; }` defines a value
  once; `var(--accent)` uses it everywhere; well-made templates put their whole brand
  in one block at the top.
- **Learner-facing explanation:** "Good template authors put their brand in one place:
  `:root { --accent: #f2a03d; }` defines the value once, and `var(--accent)` uses it
  wherever it's needed. To rebrand, change the dial - not every wire."
- **Context:** the Morning Light strap (host and topic over a warm cream panel) uses
  `--accent` in six places: the badge, the topic line, the clock box, the two dots,
  the highlight span, and the accent bar. One edit rebrands all six.
- **Recycles:** hex/brand colors (3.5), rule anatomy (3.1 - a variable is set inside a
  rule, used inside a value), silent-failure instincts (3.2 onward - ex. 5).

**Code slice:**
```html
<style>
  /* morning light strap - design tokens up top */
  :root {
    --accent: #f2a03d;
    --ink: #232323;
    --paper: #fffdf7;
  }
  #ml_strap { background-color: var(--paper); color: var(--ink); }
  #ml_badge { background-color: var(--accent); color: #ffffff; }
  #ml_topic { color: var(--accent); font-weight: 700; }
  #ml_clock { background-color: var(--accent); }
  #ml_bar   { background-color: var(--accent); }
  .ml_dot   { background-color: var(--accent); }
  .ml_hi    { color: var(--accent); }
</style>
```

**Exercises**

1. **Observe.** "Change `--accent` from `#f2a03d` to `#3db4f2` and press PLAY."
   (Badge, topic, clock, bar, dots, and highlight all turn sky blue at once.)
   "How many lines did you edit?"
   - A) One. **(correct)** - "One dial, six wires. That's the whole point of a
     variable."
   - B) Six. -> "Look at your edit history: you touched one line. The other five
     followed because they *use* the variable instead of repeating the color."
2. **Predict (kernel).** "The producer wants the accent green everywhere. Where do you
   edit?"
   - A) The `--accent` line in `:root`. **(correct)** - "Change the dial. Every
     `var(--accent)` follows."
   - B) Every rule that contains `var(--accent)`. -> "That's six edits and six chances
     for a typo - and next month's rebrand costs six more. The variable exists so one
     edit does it."
   - C) Each element in the body. -> "Colors don't live in the body at all - that's
     Unit 3's oldest rule. And here they don't even live in six style rules: they live
     in one variable."
3. **Predict.** "We change `--accent` to green. Does the cream panel behind the text
   turn green too?"
   - A) No - it uses `var(--paper)`, a different variable. **(correct)** - "You had to
     *find* the var() uses to know. That hunt is the skill."
   - B) Yes, everything changes. -> "Only the wires connected to *this* dial. The
     panel reads `--paper` - a different dial."
   - C) No, because the panel is an id, not a class. -> "Ids and classes don't decide
     it - the *value* does. The panel's background says `var(--paper)`, so it follows
     `--paper`."
4. **Fill (word bank).** "The designer adds a navy panel variable. Complete the
   definition: `:root { --accent: #f2a03d; ____: #0a3d91; }`"
   - Bank: `--panel` **(correct)**, `panel`, `var(--panel)`.
   - `panel` -> "Variable names always start with the double dash: `--panel`. That's
     how CSS knows it's a dial, not a property."
   - `var(--panel)` -> "`var(...)` is for *using* a variable. Defining one is just
     `--panel: value;`."
5. **Fix.** The topic line has lost its orange - it renders in plain ink. Code:
   `#ml_topic { color: var(--acent); font-weight: 700; }`
   "No error appeared anywhere. Find out why the topic line went dark."
   - Correct: tap `--acent`; fix to `--accent` from a bank.
   - Tapping the `:root` block -> "The definition is spelled right. Compare it with the
     *use*, letter by letter - machines don't forgive typos, and a wrong variable name
     fails silently."

- **Success criteria:** at least 4/5, including the kernel (ex. 2); the Fix (ex. 5)
  found without revealing the answer.
- **Common wrong answers:** editing every use instead of the definition ("change the
  dial, not every wire" - ex. 1-2 both attack it); assuming *all* colors follow one
  variable (ex. 3); missing the silent failure of a misspelled variable (ex. 5 - this
  goes straight into 8.7's suspect list).
- **Duration:** 5 min.

---

## Lesson 8.3 - Bringing your own font

- **New concept:** `@font-face` at recognize-and-edit level - the block that loads a
  font *file* so `font-family` can name it; spot it, swap the file path, keep the two
  names in sync.
- **Learner-facing explanation:** "A channel's typeface isn't installed on the playout
  machine - it arrives as a *file*, like an image. `@font-face` loads the file and
  gives it a name; `font-family` then uses that name. Two jobs: point `src` at the
  right file, and keep the name identical in both places."
- **Context:** NN's rebrand ships a new brand typeface as `fonts/nn-sans.woff2`. The
  strap template - written by the channel's previous designer - still points its
  `@font-face` at the old file.
- **Recycles:** font-family + fallbacks (3.6 - ex. 2 is the fallback question in a new
  costume), `src` (2.5 - "src again, same job as images"), relative paths (planted for
  9.8).

**Code slice:**
```css
@font-face {
  font-family: "NN Sans";
  src: url("fonts/nn-sans-old.woff2");
}
#f0 { font-family: "NN Sans", sans-serif; font-weight: 700; }
#f1 { font-family: "NN Sans", sans-serif; }
```

**Exercises**

1. **Observe (two taps).** "The font's name must match in two places for the strap to
   render in NN Sans. Tap both."
   - Correct: `font-family: "NN Sans"` inside `@font-face`, and `"NN Sans"` in the
     `#f0`/`#f1` rules.
   - Tapping the `src` line -> "That's the *file*. The name handshake is between the
     `font-family` inside @font-face and the `font-family` that uses it."
2. **Predict.** "The playout machine can't find the font file at all. What does the
   strap render with?"
   - A) The fallback: `sans-serif`. **(correct)** - "Unit 3's fallback list, doing its
     real job. On air you'd see a generic font - readable, but off-brand. That's your
     cue to check the file."
   - B) No text at all. -> "The text always shows - fonts change how it's *drawn*, not
     whether it exists. The fallback steps in."
   - C) The file loads from the internet. -> "Broadcast machines are often offline on
     purpose. The file ships *with* the template - that's the whole reason @font-face
     exists."
3. **Fill (word bank).** "Point the template at the new brand file:
   `src: url("____");`"
   - Bank: `fonts/nn-sans.woff2` **(correct)**, `NN Sans`, `nn-sans`.
   - `NN Sans` -> "That's the font's *name*. `src` wants a file path - src, same job
     as an image's src."
   - `nn-sans` -> "Close - but the file lives in the `fonts/` folder and ends in
     `.woff2`. Check the asset drawer for the exact path."
4. **Fix (kernel).** The strap renders in the generic fallback even though the file
   is present. Code:
   ```css
   @font-face {
     font-family: "NN Sans";
     src: url("fonts/nn-sans.woff2");
   }
   #f0 { font-family: "NNSans", sans-serif; }
   ```
   "The file is fine. Find why the strap won't wear it."
   - Correct: tap `"NNSans"`; fix to `"NN Sans"`.
   - Tapping the src line -> "The path is right - the file loads. Compare the two
     names character by character: `NN Sans` vs `NNSans`. The handshake needs an exact
     match, spaces included."
5. **Predict.** "A colleague deletes the whole @font-face block but keeps
   `font-family: "NN Sans"`. On *their* laptop the strap still looks perfect. What
   happens on the playout machine?"
   - A) The fallback font - their laptop happens to have NN Sans installed; the
     playout machine doesn't. **(correct)** - "The *file* is the point. 'Works on my
     machine' is not a font strategy."
   - B) It looks perfect there too. -> "Only if that machine has the font installed -
     and you can't bet a broadcast on it. @font-face ships the file so every machine
     agrees."
   - C) The template crashes. -> "Missing fonts never crash anything - they fail
     *silently* into the fallback. Which is exactly why you must know this rule."

- **Success criteria:** at least 4/5; the kernel Fix (ex. 4) found, not just fixed.
- **Common wrong answers:** expecting a font *name* alone to work on machines that
  lack the font (ex. 5 - the headline misconception); confusing the file path with the
  font name (ex. 3); missing the exact-match rule on names (ex. 4).
- **Duration:** 4 min.

---

## Lesson 8.4 - Flip the switch

- **New concept:** `element.classList.add("on")` / `.remove("on")` - JS switching an
  element's class, which switches which CSS rules apply. And the reveal: this is
  *exactly* what Unit 5's hidden PLAY machinery did - the last "trust it" seal comes
  off.
- **Learner-facing explanation:** "JS can put a class on an element and take it off:
  `classList.add("night")`, `classList.remove("night")`. The element doesn't get new
  styles *from* JS - it gets a new *label*, and the CSS rules for that label wake up.
  One class, two looks. This is what the hidden PLAY machinery was doing to your strap
  since Unit 5."
- **Context:** the SKYWATCH weather panel has a day look and a night look - one class
  apart. The console strip returns so the student can flip it live; a checkbox field
  in the operator panel (a recognize-level preview of 9.2) drives the same switch,
  its deciding line shown folded.
- **Recycles:** classes (2.4), state styles + later-rule-wins (5.3/4.6), 
  getElementById (7.3).

**Code slice:**
```html
<style>
  /* skywatch panel -- base look is day; the night class flips it */
  .panel { background-color: #eaf6ff; color: #10233a; }
  .night { background-color: #101c30; color: #d7e8ff; }
</style>
...
<div id="w-panel" class="panel">
  <div id="f0">TAMPERE</div>
  <div id="f1">21</div>
  <div id="f2">Clear skies</div>
</div>
```

**Exercises**

1. **Observe (console strip).** "Run this line, watch the panel:
   `document.getElementById("w-panel").classList.add("night")` - then run the same
   with `.remove("night")`."
   (The panel flips dark, then light again; the element inspector shows
   `class="panel night"` gaining and losing the word.)
   "What did `add` actually change?"
   - A) The element's class list - the styles followed. **(correct)**
   - B) The element's colors directly. -> "Look at the inspector: JS wrote one *word*
     onto the element. The colors came from the `.night` rule that was sitting in the
     stylesheet all along, waiting."
   - C) The stylesheet. -> "The stylesheet never changed - both rules were always
     there. The element changed which rules it *matches*."
2. **Predict.** "`classList.add("night")` runs. Which CSS rule wakes up?"
   - A) `.night { background-color: #101c30; ... }` **(correct)**
   - B) `.panel { ... }` -> "That rule was already awake - the element has carried
     `panel` from the start. The *new* label is what changes the match."
   - C) No rule - classList paints the element itself. -> "classList never paints
     anything. It changes labels; the stylesheet does all the painting. No matching
     rule would mean no visible change at all - hold that thought for exercise 4."
3. **Fill (word bank).** "The panel must return to its day look when the graphic goes
   off air. Complete stop():
   `function stop() { document.getElementById("w-panel").classList.____("night"); }`"
   - Bank: `remove` **(correct)**, `add`, `delete`.
   - `add` -> "add would switch night ON. Off air we take the label away: remove."
   - `delete` -> "Good instinct, wrong word - classList's pair is add and remove."
4. **Fix (kernel).** A colleague added a "night" switch but the panel stays light.
   Code: `document.getElementById("w-panel").classList.add("nite");`
   "No error, nothing on screen. Walk the chain and find the break."
   - Correct: tap `"nite"`; fix to `"night"`.
   - Tapping `getElementById("w-panel")` -> "The grab is fine - the inspector shows
     the class *was* added. So the element now carries `nite`... search the stylesheet
     like 8.2 taught you: is there any `.nite` rule to wake up?"
   - Tapping the `.night` rule -> "The rule is spelled fine. It's waiting for an
     element labeled `night` - and this element got labeled something else. Silent, as
     always: a label no rule matches does nothing."
5. **Predict (the reveal).** "Unit 5: your strap slid in when PLAY 'applied the on
   state - trust it for now'. The seal comes off. What was the hidden machinery doing?"
   - A) `classList.add` on the strap inside play(), and `classList.remove` inside
     stop(). **(correct)** - "That's the whole trick. You've now seen every line of the
     boilerplate you spent four units trusting."
   - B) Rewriting the stylesheet on every PLAY. -> "Far simpler: the on-state rules
     were always in the stylesheet. PLAY just added the label that matches them."
   - C) GSAP. -> "In Unit 6 templates, yes - but Unit 5 had no JS you'd met. Its CSS
     transitions fired when a class arrived. classList was the finger on the switch."

- **Success criteria:** at least 4/5, and the kernel (ex. 4) solved with at most one
  hint.
- **Common wrong answers:** believing classList changes styles *directly* rather than
  changing which rules apply (ex. 1-2 both target it; ex. 4 makes the consequence
  concrete: a class no rule matches does nothing, silently).
- **Duration:** 5 min.

---

## Lesson 8.5 - Styling from data

- **New concept:** `element.style.backgroundColor = ...` - JS setting one style
  directly, the right tool when the *value* comes from the operator; paired with the
  `color`-type DataField, whose value arrives in update() like any other field. The
  camelCase rename is drilled: CSS's `background-color` becomes `style.backgroundColor`
  in JS.
- **Learner-facing explanation:** "When the *value* of a style comes from the operator
  - today's accent color, tonight's party color - a class can't help: you can't write
  a rule for a color you don't know yet. JS sets it directly:
  `element.style.backgroundColor = d.f2;`. One rename rule: CSS property names lose
  their hyphen in JS - the letter after it becomes a capital. background-color ->
  backgroundColor."
- **Context:** Morning Light's producer wants to pick the badge color per segment. A
  `color`-type field joins the definition; its value travels the same f-number
  pipeline as any text field, but lands on `.style`, not `.textContent`.
- **Recycles:** the f-number pipeline (7.6/7.7 - ex. 1 traces it end to end), color
  properties (3.4), DataFields (7.8), classList contrast (8.4 - when the look is
  *known*, use a class; when it *arrives as data*, use .style).

**Code slice:**
```js
window.SPXGCTemplateDefinition = {
  "description": "Morning Light topic strap",
  "DataFields": [
    { "field": "f0", "ftype": "textfield", "title": "Host",        "value": "Elif Demir" },
    { "field": "f1", "ftype": "textfield", "title": "Topic",       "value": "Sourdough for beginners" },
    { "field": "f2", "ftype": "color",     "title": "Strap colour", "value": "rgba(10,61,145,1)" }
  ]
};
```
```js
function update(data) {
  var d = JSON.parse(data);
  document.getElementById("f0").textContent = d.f0;
  document.getElementById("f1").textContent = d.f1;
  document.getElementById("ml_badge").style.backgroundColor = d.f2;
}
```

**Exercises**

1. **Observe.** "Open the operator panel - field f2 is a color *swatch*, not a text
   box (`"ftype": "color"` did that). Pick a deep red and watch the badge." (The wire
   diagram from 7.7 animates: swatch -> update -> the style line.)
   "Which function received the color?"
   - A) update() - like every field. **(correct)** - "A color field is still just a
     field: fN in, update() delivers."
   - B) play() -> "play() performs; it doesn't receive field edits. All field values -
     text or color - arrive through update()."
   - C) A special color function. -> "No special plumbing. Same pipeline, different
     ftype - only the *panel control* and where you write the value differ."
2. **Fill (kernel).** "Write the color onto the badge. Complete the line:
   `document.getElementById("ml_badge").style.____ = d.f2;`"
   - Bank: `backgroundColor` **(correct)**, `background-color`, `bgColor`.
   - `background-color` -> "In CSS, yes. In JS the hyphen is illegal in a name like
     this - the rename rule: drop the hyphen, capitalize the next letter.
     background-color -> backgroundColor."
   - `bgColor` -> "JS doesn't abbreviate - it renames. Take the CSS name, remove the
     hyphen, capitalize what followed it: backgroundColor."
3. **Fix.** The badge ignores the operator's color, and this time the app shows a
   *loud* red error. Code:
   `document.getElementById("ml_badge").style.background-color = d.f2;`
   "For once, the machine complained. Fix the line."
   - Correct: `background-color` -> `backgroundColor`.
   - Tapping `d.f2` -> "The value is fine - the error points at the property name. JS
     read `background-color` as 'background minus color'. Hyphens become capitals:
     backgroundColor."
4. **Predict.** "The operator picks red, but the template says
   `document.getElementById("ml_badge").textContent = d.f2;`. What shows on air?"
   - A) The badge displays the text `rgba(224,32,32,1)`. **(correct)** - "A color
     field's value is a *string*. Written to textContent, it shows as words - on air.
     Style values go to `.style`."
   - B) The badge turns red. -> "textContent puts text on screen - it never styles
     anything. To *use* the value as a color, write it to style.backgroundColor."
   - C) Nothing. -> "Something worse than nothing: the color's raw code, readable by
     every viewer. Play it and see - then you'll never forget the difference."
5. **Predict (tool choice, two quick taps).** "Day/night look, both designed in the
   stylesheet -> classList or .style?" -> classList. "A badge color the operator picks
   live -> classList or .style?" -> .style.
   - Wrong -> "Known looks live in rules - switch them with a class (8.4). Values that
     *arrive as data* can't have a ready-made rule - set them with .style."

- **Success criteria:** at least 4/5, and the kernel (ex. 2) correct - if missed, a
  fresh camelCase variant (`font-size` -> `fontSize` on the topic line) is asked at
  the end.
- **Common wrong answers:** the hyphen/camelCase trap (ex. 2-3 - once as a silent
  blank, once as a loud error, so both failure styles are seen); writing style values
  to textContent (ex. 4 - made visible, not just explained).
- **Duration:** 5 min.

---

## Lesson 8.6 - More than one step

- **New concept:** multi-phase graphics at reading level - `"steps": "2"` in the
  definition enables the operator's Continue button, and SPX calls your `next()` once
  per further phase: play() in, next() per phase, stop() out.
- **Learner-facing explanation:** "Some graphics land in beats: the panel first, the
  results on a second press. The definition declares it - `"steps": "2"` - and the
  operator gets a Continue button. SPX runs the contract in order: play() brings it
  in, each Continue calls next(), stop() takes it out. Two steps means Continue fires
  once: the arrival was step one."
- **Context:** the Election Night full-screen reveals its results in two beats. The
  student *operates* it first - Play, Continue, Stop, watching each function name
  light up in the code - and only then reads the code that made it.
- **Recycles:** the contract (7.2 - next() joins the family), the definition (7.8),
  timelines (6.6 - each phase is one).

**Code slice:**
```js
window.SPXGCTemplateDefinition = {
  "description": "Election night - result reveal",
  "steps": "2",
  "DataFields": [
    { "field": "f0", "ftype": "textfield", "title": "Headline", "value": "ELECTION NIGHT" },
    { "field": "f1", "ftype": "textfield", "title": "Result A", "value": "KORHONEN 52.1%" },
    { "field": "f2", "ftype": "textfield", "title": "Result B", "value": "NIEMI 47.9%" }
  ]
};
```
```js
function play() {
  var tl = gsap.timeline();
  tl.to("#panel",    { opacity: 1, duration: 0.6, ease: "power2.out" });
  tl.to("#headline", { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");
}
function next() {
  var tl = gsap.timeline();
  tl.to("#result_a", { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
  tl.to("#result_b", { x: 0, opacity: 1, duration: 0.5 }, "-=0.3");
}
function stop() {
  gsap.to("#fullscreen", { opacity: 0, duration: 0.4, ease: "power2.in" });
}
```

**Exercises**

1. **Observe (interactive).** "Drive it: press PLAY. The panel and headline arrive -
   and a new button appears next to STOP: CONTINUE. Press it. Press STOP." (Each press
   highlights the function that ran.) "Where did the Continue button come from?"
   - A) The `"steps": "2"` line in the definition. **(correct)** - "Declare more than
     one step and SPX gives the operator the button. No steps line, no button."
   - B) The next() function existing. -> "next() is what the button *calls* - but the
     button itself comes from the definition. A template can define next() and never
     get a Continue if steps isn't declared."
   - C) It's always there. -> "Play the Unit 7 strap again - no Continue. Single-step
     templates never show it."
2. **Predict.** "`"steps": "2"` - how many times can the operator press Continue?"
   - A) Once. **(correct)** - "The arrival *is* step one. Continue covers the rest:
     steps minus one."
   - B) Twice. -> "Count the phases: play() is the first, next() is the second. Two
     steps, one Continue."
   - C) As many as they like. -> "The definition sets the count. After the last step,
     Continue has nothing left to call."
3. **Fill (word bank).** "A sports podium graphic reveals bronze, then silver, then
   gold: three phases. Complete the definition: `"steps": "___"`"
   - Bank: `3` **(correct)**, `2`, `1`.
   - `2` -> "Count *all* phases including the arrival: bronze arrives with play(),
     then two Continues. Three steps."
   - `1` -> "One step means no Continue at all - the whole podium would land at once."
4. **Trace (kernel).** The operator's button log reads: PLAY, CONTINUE, CONTINUE,
   STOP - driving a three-step podium graphic. "Tap the function that ran at each
   press, in order."
   - Correct: play() -> next() -> next() -> stop().
   - Choosing play() for a CONTINUE -> "Continue never re-runs play() - the graphic is
     already on air. Each Continue calls next(), and next() alone."
   - Choosing next() for STOP -> "STOP always means stop(), whatever step you're on -
     the out must work from any phase."
5. **Predict.** "A template defines a perfectly good next(), but its definition has no
   steps line. The operator wants the second phase. What happens?"
   - A) There's no Continue button to press - the phase is unreachable from the
     panel. **(correct)** - "The definition describes; the panel obeys. Code that the
     contract never calls might as well not exist - worth checking when a 'broken'
     multi-step lands on your desk."
   - B) Continue appears anyway, since next() exists. -> "SPX reads the *definition*,
     not your function list. No declared steps, no button."
   - C) The template crashes. -> "Nothing crashes - the graphic simply plays as a
     one-step. Silent, like most of this unit's failures."

- **Success criteria:** at least 4/5, and the kernel trace (ex. 4) fully correct - if
  missed, a fresh variant (a four-press log on the election graphic) is asked at the
  end.
- **Common wrong answers:** expecting Continue to re-run play() (ex. 4 - the headline
  misconception); off-by-one on steps vs Continues (ex. 2-3 attack it from both
  directions).
- **Duration:** 4 min.

---

## Lesson 8.7 - Why didn't it change?

- **New concept:** systematic mismatch-hunting - when an edit does nothing, check the
  four usual suspects *in order*: (1) wrong id (or hash-in-getElementById), (2)
  selector or class typo, (3) missing unit or malformed value, (4) wrong field number.
  Errors in this world are mostly silent; the method replaces panic.
- **Learner-facing explanation:** "You made the edit, pressed PLAY - and nothing
  changed. No error, no clue. This is normal, and it's almost always one of four
  suspects, so check them in order: 1 - wrong id (or a # inside getElementById); 2 - a
  selector or class typo; 3 - a missing unit or a malformed value; 4 - the wrong field
  number. Walk the list. Never guess."
- **Context:** a "broken ticket" drill: the ARENA CLASH scoreboard has been through
  three careless hands, and four realistic bug reports have piled up - one per
  suspect. The hint ladder *is* the checklist: each hint names the next suspect to
  check, never the answer. The app scores method: fewer, targeted edits beat many
  guesses.
- **Recycles:** every silent failure planted since 3.2, deliberately - the class typo
  (2.4), hash-in-getElementById (7.3), invented labels (7.5), variable typos (8.2),
  unmatched class names (8.4). This lesson is their payoff.

**Exercises**

1. **Fix (suspect 1: wrong id / hash-in-getElementById).** Ticket: *"Retyped the left
   team's name in the panel - the board still says NOVA FIVE."*
   ```js
   function update(data) {
     var d = JSON.parse(data);
     document.getElementById("#f0").textContent = d.f0;
     document.getElementById("f1").textContent = d.f1;
     document.getElementById("f2").textContent = d.f2;
     document.getElementById("f3").textContent = d.f3;
     document.getElementById("f4").textContent = d.f4;
   }
   ```
   "Walk the list. Suspect 1 first: check every id this edit depends on."
   - Correct: tap `"#f0"`; fix to `"f0"`.
   - Hint ladder: hint 1 restates suspect 1 ("Check the id: does the element exist,
     and is it written *without* the hash in getElementById?"); hint 2 narrows to the
     update() line for f0; the answer is never shown.
   - Editing an unrelated line first costs a method point: "That line wasn't under
     suspicion - the ticket says f0. Targeted edits only."
2. **Fix (suspect 2: selector or class typo).** Ticket: *"The map-score boxes render
   as plain text - no dark box behind them."*
   ```html
   <span class="mapBox">2</span> ... <span class="mapBox">1</span>
   ```
   ```css
   .mapBoxx { background-color: #12131a; color: #f5f6fa; padding: 8px; }
   ```
   "Suspect 1 clears (no ids involved). Suspect 2: compare every class name letter by
   letter."
   - Correct: tap `.mapBoxx`; fix to `.mapBox`.
   - Tapping the HTML spans -> "Both spans agree with each other - `mapBox`, twice.
     When the *uses* agree, suspect the *rule*."
3. **Fix (suspect 3: missing unit / malformed value).** Ticket: *"Moved the board down
   to the lower third of frame (top: 940) - on air it still hugs the top."*
   ```css
   #bugRoot { position: absolute; top: 940; left: 760px; }
   ```
   "Suspects 1 and 2 clear - the id and selector match. Suspect 3: read every value
   like a machine would."
   - Correct: tap `940`; fix to `940px`.
   - Tapping `left: 760px` -> "That one has its unit. A number with no unit is a
     malformed value - the machine throws the whole declaration away. Silently, of
     course."
4. **Fix (suspect 4: wrong field number).** Ticket: *"Editing 'Maps right' does
   nothing - and editing 'Maps left' changes BOTH scores."*
   ```js
   document.getElementById("f2").textContent = d.f2;
   document.getElementById("f3").textContent = d.f2;
   ```
   "Suspects 1-3 clear: ids exist, no selectors involved, values are fine. Suspect 4:
   match every field number against the definition."
   - Correct: tap the second `d.f2`; fix to `d.f3`.
   - Tapping `getElementById("f3")` -> "The element is right - f3's *box* updates,
     you can see it flash. It's being fed the wrong *field*: read what's on the right
     of the equals sign."
5. **Predict (kernel).** "New ticket, fresh template: *'The series label didn't change
   on air after I retyped it.'* Which suspect do you check first, and where?"
   - A) Suspect 1: the getElementById line for that field in update() - is the id
     right, with no hash? **(correct)** - "In order, always. Most tickets die at
     suspect 1, and checking it costs ten seconds."
   - B) Suspect 4 - field numbers feel likeliest. -> "Maybe - but 'likeliest' is how
     guessing starts. The list is ordered so each check is quick and rules territory
     out. Suspect 1 first, every time."
   - C) Change things until it works. -> "That's the random walk this lesson replaces.
     Every untargeted edit can add a *second* bug - then you're debugging two."

- **Success criteria:** all four Fixes solved with at most two hints total across the
  lesson, and the kernel (ex. 5) correct. The method score (edits made vs edits
  needed) is shown at the end: par is 4.
- **Common wrong answers:** random-walk debugging - changing unrelated lines "to see"
  (scored and named); jumping to a favorite suspect out of order (ex. 5B); fixing the
  *use* when the *rule* is wrong or vice versa (ex. 2's feedback teaches
  which-side-agrees reasoning).
- **Duration:** 6 min.

---

## Lesson 8.8 - Edit without breaking

- **New concept:** safe-editing discipline - the do-not-rename list (`play`, `stop`,
  `update`, `next`, the `fN` ids, `SPXGCTemplateDefinition`) plus the
  one-change-then-play habit; everything else in a template is yours to touch. Doubles
  as the unit's review.
- **Learner-facing explanation:** "A template is yours to reshape - except the names
  that other software calls. SPX looks for play, stop, update, next, the fN ids, and
  SPXGCTemplateDefinition *by name*: rename any of them and the contract goes silent.
  Everything else - classes, variables, your own ids - is fair game. And one habit
  above all: one change, then play. Every time."
- **Context:** the student receives the **checklist card** they keep from here on (the
  capstones grade against it): the do-not-rename list on one side, "one change, then
  play" on the other. Drills run on the stranger templates from this unit.
- **Recycles:** the contract names (7.2/7.6), the fN handshake (7.7), CSS variables
  (8.2), the 8.7 method (the diff exercise is a method post-mortem).

**Exercises**

1. **Predict (kernel, four quick taps).** "Safe to rename? Tap YES or NO for each:
   `#strap` / `play()` / `--accent` / `f0`."
   - Correct: `#strap` YES - `play()` NO - `--accent` YES - `f0` NO.
   - `#strap` NO -> "It's yours - the author chose it and only *this file* uses it.
     Rename it everywhere it appears (rule AND uses - remember 8.2) and nothing
     outside cares."
   - `play()` YES -> "SPX calls that exact name. Rename it and PLAY presses into
     silence - you saw it in 7.2. Contract names are frozen."
   - `--accent` NO -> "Variables are yours: rename the dial and its var() uses
     together and the template is identical. Only names *other software* calls are
     frozen."
   - `f0` YES -> "The fN ids are the handshake itself (7.7) - the operator's field f0
     lands in the element f0 by *name*. Frozen."
2. **Fix.** Ticket on the SKYWATCH panel: *"A helpful colleague 'clarified' the code.
   Now the panel ignores everything typed in the operator panel."*
   ```js
   function refresh(data) {
     var d = JSON.parse(data);
     document.getElementById("f0").textContent = d.f0;
     document.getElementById("f1").textContent = d.f1;
     document.getElementById("f2").textContent = d.f2;
   }
   ```
   "The body of the function is untouched and correct. Restore the data flow."
   - Correct: rename `refresh` back to `update`.
   - Editing the body lines -> "The wiring inside is fine - nothing *calls* it
     anymore. SPX delivers field edits to a function named update, exactly. Check the
     card."
3. **Observe (diff view).** A diff of the Morning Light strap shows three edits made
   in one sitting: (a) `--accent: #f2a03d` -> `#2e7d4f`, (b) the f1 default value
   reworded in the definition, (c) `function stop()` -> `function stopNow()`. The
   report: "STOP does nothing anymore." "Which edit broke it - and which habit would
   have caught it in ten seconds?"
   - Correct: edit (c), and the one-change-then-play habit - playing after each edit
     pins the breakage to the exact change that caused it.
   - Choosing (a) or (b) -> "Both are legal edits - a variable and a default are
     yours. Check each changed name against the card: one of the three touched a
     frozen name."
   - "Test at the end" as the habit -> "Testing at the end *found* the breakage but
     not the culprit - three suspects instead of one. One change, then play: each test
     has exactly one possible cause."
4. **Fill (the card, from a word bank).** "Fill in the do-not-rename list:
   `____ / ____ / ____ / ____ / the ____ ids / ____`"
   - Bank: `play`, `stop`, `update`, `next`, `fN`, `SPXGCTemplateDefinition`, plus
     distractors `--accent`, `gsap`, `#strap`.
   - `--accent` / `#strap` -> "Yours to rename (with their uses). The frozen names are
     the ones *SPX* speaks."
   - `gsap` -> "gsap is a tool you call - you'd never rename it, but it isn't part of
     the SPX contract. The card lists what SPX calls *in your file*."
5. **Build-lite (the disciplined mini-task).** On the ARENA CLASH board: "The producer
   wants the series label yellow (#e8b90c) and the entrance a touch faster (0.7 ->
   0.5). Make both changes the disciplined way." The app enforces the loop: first
   edit -> PLAY -> verify prompt ("what did you just confirm?") -> second edit ->
   PLAY -> verify.
   - Making both edits before playing -> the app stops the run: "Two changes are in
     flight - if this play looks wrong, which one do you blame? One change, then
     play."

- **Success criteria:** the kernel (ex. 1) all four taps correct; the mini-task (ex.
  5) completed within the enforced loop; at least 4/5 overall.
- **Common wrong answers:** "more edits at once = faster" (ex. 3 and 5 both make the
  cost concrete: ambiguity about the culprit); over-freezing - treating *everything*
  as untouchable (ex. 1's `#strap`/`--accent` feedback pushes back: most of a template
  IS yours).
- **Duration:** 5 min.

---

## Lesson 8.9 - (Optional) The other dialect

- **New concept (recognition only):** some templates define no global play/stop/update
  at all - they read `spxData.f0` directly (already an object, no JSON.parse) and hook
  the lifecycle via `window.top.spxRenderer.on('play' | 'stop' | 'continue', handler)`.
  Same contract ideas, different spelling. Know which dialect you're in before
  editing.
- **Learner-facing explanation:** "One day you'll open a template and find no play(),
  no update() - and it works anyway. It's the other SPX dialect: instead of *you*
  defining functions for SPX to call, the template *subscribes* to SPX's events with
  `spxRenderer.on(...)`, and reads its fields straight from `spxData` - already
  unpacked, no JSON.parse. Same ideas, different spelling. Your job today is only to
  *recognize* it: the tell-tales are the words `spxData` and `spxRenderer`."
- **Context:** a real-world-style Morning Light strap in the spxData dialect, side by
  side with its classic twin. The anatomy map from 8.1 is re-run on it: three
  landmarks look identical; landmark 4 looks alien - and the map still works.
- **Recycles:** 8.1's skim strategy (landmark 4 is where dialects differ), the
  contract (7.2/7.6 - the same lifecycle wearing other clothes), 8.8's discipline
  (don't edit what you don't recognize).

**Code slice (the dialect twin, landmark 4 only):**
```js
window.top.spxRenderer.on('play', function () {
  document.getElementById('f0').textContent = spxData.f0;
  document.getElementById('f1').textContent = spxData.f1;
  gsap.to('#ml_strap', { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
});
window.top.spxRenderer.on('stop', function () {
  gsap.to('#ml_strap', { opacity: 0, duration: 0.4, ease: 'power2.in' });
});
```
(The handler is "a recipe without a name, handed straight to the hook" - named-function
recipes are the same idea with a name; that's as deep as this lesson goes.)

**Exercises**

1. **Observe (two taps).** "This template has no play() and no update(), yet PLAY
   works. Tap the two tell-tale words that give the dialect away."
   - Correct: `spxData` and `spxRenderer`.
   - Tapping `gsap` -> "GSAP lives happily in both dialects - it animates either way.
     The tell-tales are the SPX-flavored words: spxData, spxRenderer."
2. **Predict (kernel).** "You open a downloaded template: no update() anywhere.
   Broken, or the other dialect?"
   - A) Check for the tell-tales first: if spxData / spxRenderer appear, it's the
     other dialect, working as designed. **(correct)** - "'No play() = broken' is
     yesterday's rule. Two dialects exist; identify before you judge - or edit."
   - B) Broken - every template must define update(). -> "Only in the classic dialect.
     This one receives data through spxData and events through spxRenderer.on - no
     globals needed."
   - C) Add an update() to fix it. -> "That's editing blind - 8.8's cardinal sin. An
     added update() would just sit there uncalled... or worse, fight the handlers that
     already do the job."
3. **Predict.** "In this dialect, the template reads `spxData.f0`. Where's the
   JSON.parse?"
   - A) There isn't one - spxData is already an object. **(correct)** - "The classic
     dialect gets sealed freight (a JSON string) and unpacks it. This dialect gets the
     bundle pre-opened."
   - B) Hidden in spxRenderer. -> "Nothing hidden to worry about: from where you
     stand, spxData is simply already readable. No parse line to write or to fix."
   - C) It's missing - that's a bug. -> "Reading .f0 straight off spxData *works* -
     that's the point. If it were a string, 7.6 taught you what you'd see: nothing."
4. **Match (five snippets -> classic or spxData).**
   1. `function update(data) { var d = JSON.parse(data); ... }` -> classic.
   2. `window.top.spxRenderer.on('continue', function () { ... })` -> spxData.
   3. `document.getElementById("f0").textContent = spxData.f0;` -> spxData.
   4. `function next() { revealResults(); }` -> classic.
   5. `gsap.to("#strap", { x: 0, duration: 0.6 })` -> either (trick entry; accepting
      "both" is correct).
   - Mismatches -> "Look for the dialect words: global function definitions with the
     contract names = classic; spxData / spxRenderer = the other one. GSAP belongs to
     both."

- **Success criteria:** at least 3/4, and the kernel (ex. 2) correct. Optional lesson:
  no gate depends on it.
- **Common wrong answers:** "no play() function = broken template" (ex. 2 - the
  headline misconception); expecting to add JSON.parse where none is needed (ex. 3);
  assuming GSAP marks a dialect (ex. 1 and the trick entry in ex. 4).
- **Duration:** 4 min.

---

## Checkpoint 8 - "The download"

- **Type:** Build/Fix (web primary; on phone the same tickets run with tap-based
  editing and word banks).
- **Scenario:** "You found a decent lower third on the internet. Make it ours." The
  template: **"CleanLine Lower Third v3"**, a stranger's file with terse habits -
  variables named `--c1`/`--c2`, ids `lt_wrap`/`lt_logo`, comment header
  `/* cleanline lt3 - free for broadcast use - TK */`. It is realistically imperfect,
  and it is unfamiliar: nothing in it matches the course's own naming.
- **Given (abridged; full file ~90 lines, landmark-foldable):**
  ```html
  <style>
    /* cleanline lt3 - free for broadcast use - TK */
    :root { --c1: #10b981; --c2: #0b0f14; }
    #lt_wrap  { position: absolute; left: 96px; bottom: 96px; }
    #lt_panel { background-color: var(--c1); padding: 18px 28px; }
    #f0 { color: #ffffff; font-size: 44px; font-weight: 700; }
    #f1 { color: var(--c2); font-size: 26px; }
    .lt_tick  { background-color: var(--c1); }
  </style>
  ...
  <img id="lt_logo" src="logo/brand-mark.png">
  ...
  <script>
    function play() {
      gsap.fromTo("#lt_wrap", { y: 160, opacity: 0 },
                              { y: 0, opacity: 1, duration: 2.4, ease: "power2.in" });
    }
    ...
  </script>
  ```
- **The three change tickets:**
  1. **Rebrand to the NN card** (panel `#0a3d91`, accent `#e8b90c`). The intended
     discovery: the template is variable-driven - `--c1` and `--c2` are the dials
     (8.2); two edits in `:root` rebrand every use. Editing individual rules instead
     is detected and flagged as wire-editing (it can pass, but costs the method
     score).
  2. **Swap the logo to `nn-logo.png`** (2.5/8.3 paths). **The hidden 8.7 suspect
     lives here:** the existing src is `logo/brand-mark.png`, but the asset drawer has
     `nn-logo.png` at the root - the natural edit `logo/nn-logo.png` produces a
     broken image. The play-after-the-fix reveals it; the walk-the-list method
     (suspect 3: malformed value - check the value against the asset drawer, like 2.5
     taught) finds it. The hint ladder is the 8.7 checklist, never the answer.
  3. **"The entrance feels slow and it lands wrong."** Find the GSAP tween (8.1
     landmark 4), shorten `duration: 2.4` to a broadcast-sane value (accepted range
     0.5-0.9), and fix the ease *direction*: entrances ease out, so
     `"power2.in"` -> `"power2.out"` (6.3/5.4).
- **The graded habit:** the checkpoint requires PLAY after *each* ticket (the 8.8
  one-change-then-play habit is graded, not just the outcome). The event log must
  show ticket-fix -> play -> verify, three times; batching all edits and playing once
  at the end fails the habit criterion even if the final render is correct, with
  feedback: "All three tickets look right - but when ticket 2 broke mid-way, you had
  three suspects instead of one. Play after every change."
- **Pass criteria:** all three tickets verified on air (panel and accent match the NN
  card everywhere the variables reach; the NN logo renders, unbroken; entrance
  duration in range with an ease-out), no frozen name renamed (checked against the
  8.8 card), and the play-after-each-fix log complete.
- **Failure handling (diagnosis over verdict; each maps to its remediation lesson):**
  - Can't locate what a ticket refers to (long idle or unfolds everything) -> "Four
    landmarks, in order - where does an entrance live? (See: The anatomy map.)" ->
    micro-review 8.1.
  - Edit made but nothing changed on air (e.g. edited `--c1` uses but missed one, or
    the broken logo path shipped) -> "Your edit didn't reach the screen. Walk the
    four suspects, in order. (See: Why didn't it change?)" -> micro-review 8.7.
  - Contract broken (a frozen name renamed, PLAY or field edits gone silent) ->
    "Check your changed names against the card. (See: Edit without breaking.)" ->
    micro-review 8.8.
  - Wrong ease direction chosen in ticket 3 -> the 5.4/6.3 side-by-side comparison
    replays before the re-attempt.
  - Re-attempts use fresh variants: a different brand card, a different asset
    filename, a different broken value.
- **Duration:** 8 min.

**Unit 8 total learner time:** ~42-50 min across 10 sessions (8.9 optional excluded).
