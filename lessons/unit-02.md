# Unit 2 - Naming the Parts (full lesson plans)

**Unit goal:** navigate a template's structure confidently - know which element is
which, and target the right one.
**Promise:** after this unit you can change any text or image in a template and know
exactly which element you touched.
**Prerequisites:** Unit 1. **Conventions:** as in unit-01.md. From lesson 2.3 onward,
ids and classes may appear in code slices; before that, still bare tags only.

Running graphics this unit: the **Nightly News strap** (now with its wrapper revealed),
the **score strap**, and from 2.5 the **NN logo** and a **weather icon**.

---

## Lesson 2.1 - Boxes inside boxes

- **New concept:** elements can contain elements; children sit inside their parent's
  box and move with it.
- **Learner-facing explanation:** "Elements can live inside other elements. The strap
  is one big box; the name line and the title line are boxes inside it. Move the parent,
  and everything inside moves with it."
- **Context:** Checkpoint 1 quietly previewed the wrapper div - now it's named. The
  render outlines boxes on hover/tap.
- **Recycles:** tag anatomy (1.4), div (1.6), PLAY animation (1.2) - the whole strap
  slides in as one, which is the *point* of the parent box.

**Code slice:**
```html
<div>
  <div>Maria Kranz</div>
  <div>News Anchor</div>
</div>
```

**Exercises**

1. **Observe.** Tapping any element outlines its box on the render. "Tap the element
   that contains the *whole* strap." Correct: the outer div.
   - Tapping an inner div -> "That box holds one line. Look for the box that holds
     *both* lines - and watch its outline wrap everything."
2. **Predict.** "Press PLAY - the whole strap slides in as one piece. Did we animate
   each line separately?"
   - A) No - the *parent* moved, and everything inside moved with it. **(correct)**
   - B) Yes, each line was animated on its own. -> "Watch again: both lines move in
     perfect lockstep. One parent, one move - that's why the wrapper box exists."
   - C) The lines aren't related. -> "They're siblings inside the same parent - the
     outline exercise showed the box that owns them both."
3. **Predict.** "We add `<div>LIVE</div>` inside the outer div, *after* the title line.
   Where does it appear?"
   - A) Inside the strap, as a third line. **(correct)** (Render preview confirms.)
   - B) Outside the strap. -> "It was placed inside the parent's tags, so it lives - and
     moves - inside the strap."
   - C) On top of the name. -> "New children join the stack in code order: after the
     title means below the title."
4. **Arrange (Parsons with indentation).** Blocks (pre-indented):
   `<div>` / `  <div>Tomas Berg</div>` / `  <div>Sports Reporter</div>` / `</div>` -
   "Build the sports strap: both lines inside one parent."
   - Placing a line after the final `</div>` -> "Both lines belong between the parent's
     opening `<div>` and its closing `</div>` - a block placed after the final `</div>`
     is no longer inside the wrapper."
5. **Arrange.** The title line 'News Anchor' has landed after the wrapper's closing
   `</div>`, outside the parent:
   ```html
   <div>
     <div>Maria Kranz</div>
   </div>
   <div>News Anchor</div>
   ```
   "Rebuild the strap so both lines sit between the parent's opening and closing tags."
   Correct: both lines placed above the closing tag (indentation snaps automatically).
   - Wrong -> "The title belongs between the parent's opening and closing tags - above
     the final `</div>`, not after it."

- **Success criteria:** at least 4/5; the Arrange (ex. 4) correct.
- **Common wrong answers:** placing children after the wrapper's closing `</div>`
  (ex. 4, 5) - in house mode the whole strap sits in one styled panel, so a mis-placed
  block does not visibly detach; the tasks are structural (read the code position),
  not "spot the stranded element".
- **Duration:** 5 min.

---

## Lesson 2.2 - Reading the tree

- **New concept:** closing tags match the most recently opened tag ("close from the
  inside out"); indentation mirrors nesting and is your reading aid.
- **Learner-facing explanation:** "Boxes close from the inside out - a closing tag
  always ends the most recently opened box. Indentation doesn't change anything on
  screen; it's there so *you* can see what's inside what."
- **Context:** the full strap plus the score strap with its span - the first time two
  levels of nesting plus an inline element appear together.
- **Recycles:** nesting (2.1), span (1.6), tag anatomy (1.4).

**Exercises**

1. **Observe.** Code: the three-div strap from 2.1. "Tap the closing tag that belongs
   to the *outer* div." Correct: the last `</div>`.
   - Tapping an inner `</div>` -> "That one closes the line opened just before it.
     Inside-out: the outer box closes *last*."
2. **Predict.** The same strap flattened to one line:
   `<div><div>Maria Kranz</div><div>News Anchor</div></div>`
   "How many elements is this?"
   - A) 3 **(correct)** - "Same strap, same three boxes - only the line breaks are gone."
   - B) 1 -> "Count opening tags: three divs open, three close. Layout on the page
     doesn't change the structure."
   - C) 5 -> "Closing tags don't create new elements - each pair is *one* element."
3. **Fix.** An inside-out closing-order puzzle. Code: `<div><span>LIVE</div></span>`
   "Boxes must close inside-out - tap the first closing tag that's out of place."
   Correct: `</div>` (the span opened last, so it must close first) -> fix offered: swap
   to `</span>`. Honest success: it looks the same on screen (the browser quietly patches
   this one), but correct nesting keeps styles and scripts pointing at the right box.
   - Tapping the openers -> "The openers are fine - LIVE should be a span inside a div.
     The problem is the closing *order*."
4. **Arrange (indent the tree).** Five unindented lines of the score strap (outer div,
   img placeholder line excluded this unit, two spans inline) - simplified to:
   `<div>` / `<div>HIFK <span>3</span></div>` / `<div>TPS <span>2</span></div>` /
   `</div>` given flat; the student drags each line to its indent depth (0 or 1).
   - Wrong depth -> "Indent = 'I live inside the line above me one level up'. Does this
     line live inside the strap?"
5. **Predict.** Score-strap code shown. "Which element is the span's *parent*?"
   - A) The line div it sits in **(correct)**
   - B) The outer strap div -> "That's its grandparent. The parent is the box
     immediately around it."
   - C) The other span -> "Siblings sit side by side; neither contains the other."

- **Success criteria:** at least 4/5; ex. 3 (crossed nesting) solved with at most one
  hint.
- **Common wrong answers:** crossed closers (ex. 3 - the classic beginner bug, framed
  as a reading puzzle since the browser patches it with no visible change); counting
  closers as elements (ex. 2C).
- **Duration:** 5 min.

---

## Lesson 2.3 - The id

- **New concept:** `id="..."` inside an opening tag gives one element a unique name;
  each id appears once per template.
- **Learner-facing explanation:** "You can give an element a name tag, written inside
  its opening tag: `<div id="name">`. An id must be unique - it points to exactly one
  element, so styles (Unit 3) and live data (Unit 7) can find it."
- **Context:** the strap's lines get their working names: `id="name"`, `id="title"`.
  Forward hook shown as a postcard: "In Unit 7, the text an operator types lands in
  these ids. Choose names that describe the *job*."
- **Recycles:** opening vs closing tags (1.4), nesting (2.1).

**Code slice:**
```html
<div>
  <div id="name">Maria Kranz</div>
  <div id="title">News Anchor</div>
</div>
```

**Exercises**

1. **Observe.** "Tap the element whose id is `title`." Correct: the second inner div
   (its box outlines on the render).
2. **Predict.** "Where does an id live?"
   - A) Inside the opening tag. **(correct)**
   - B) Between the tags. -> "Between the tags is *content* - it would show on air!
     (Remember the quote marks in 1.5.) Settings like id ride inside the opening tag."
   - C) In the closing tag. -> "Closing tags carry nothing but the slash and the name."
3. **Fill (word bank).** "This element holds whoever is presenting tonight. Give it a
   sensible id: `<div id="____">Alexandra Rivera</div>`"
   Bank: *name* **(correct)**, *Alexandra*, *div*.
   - *Alexandra* -> "The content changes every show - the id is the element's *job*,
     which stays the same. Tomorrow this element still holds a name, just not
     Alexandra's."
   - *div* -> "That's the tag's type, not a name you chose. Ids describe the element's
     role in *your* graphic."
4. **Fix.** Code has `id="name"` on both lines. "Both lines carry `id="name"`, but an id
   must point to exactly one element. Tap the line that should get a different id."
   Correct: the title line; its id becomes `title`. Honest success: ids don't change how
   the strap looks, but now each line has its own name, so CSS and JavaScript can point
   at exactly one of them.
   - Tapping the name line -> "That one really *is* the name - it's the title line that
     needs an id of its own."
5. **Predict.** "`<div id="name">Tomas Berg</div>` - what shows on screen?"
   - A) Tomas Berg **(correct)**
   - B) name -> "Ids are for the machine and for you - never for the viewer."
   - C) id="name" -> "Everything inside the opening tag stays invisible. Only content
     shows."
6. **Type (web; word-bank assembly on phone).** "Write the opening tag for a div with
   the id `score`." Accept `<div id="score">`; single quotes accepted with note:
   "Works - but this course always writes double quotes, like the pros' templates
   you'll read."

- **Success criteria:** at least 5/6; ex. 3 or 4 (id semantics) correct.
- **Common wrong answers:** id-as-content confusion (ex. 3 *Alexandra* - the most
  important feedback in this lesson, it plants the Unit 7 payoff); attributes placed
  between tags (ex. 2B connects back to the visible-quotes moment in 1.5).
- **Duration:** 5-6 min.

---

## Lesson 2.4 - The class

- **New concept:** `class="..."` is a shared label many elements can carry; ids for
  one-of-a-kind parts, classes for families.
- **Learner-facing explanation:** "A class is a label many elements can share:
  `class="line"`. When several parts should look or behave the same, give them the same
  class. One-of-a-kind parts get an id; families get a class."
- **Context:** both strap lines get `class="line"`; in the score strap, both scores get
  `class="score"`. A ticker with three headlines appears for the first time (as
  read-only scenery) - a natural family of same-looking items.
- **Recycles:** id (2.3), attribute placement (2.3), span (1.6), nesting (2.1).

**Code slice:**
```html
<div>
  <div id="name" class="line">Maria Kranz</div>
  <div id="title" class="line">News Anchor</div>
</div>
```

**Exercises**

1. **Observe (multi-tap).** Score strap: `<span class="score">3</span>` ...
   `<span class="score">2</span>`. "Tap ALL elements with the class `score`."
   Correct: both spans. (Selecting only one: "Classes are shared - keep looking.")
2. **Predict.** "Both strap lines carry `class="line"`. Next unit we'll give that class
   the channel's font. How many elements change?"
   - A) 2 **(correct)** - "One label, applied everywhere it's worn. That's the power of
     a class."
   - B) 1 -> "Both lines wear the label, so both change - that's exactly why we used a
     class and not an id."
   - C) Every element in the template. -> "Only the elements *carrying* the class. The
     wrapper div has no `class="line"`, so it's untouched."
3. **Fill (word bank).** "Give the away team's score the same label as the home team's:
   `<span class="_____">2</span>`" Bank: *score* **(correct)**, *away*, *span*.
   - *away* -> "Then the two scores would be different families and couldn't share a
     look. Same job, same class."
   - *span* -> "That's the tag type again - the class is the label *you* choose."
4. **Predict (id vs class, two quick taps).**
   "The strap's one-and-only background panel -> id or class?" -> id.
   "Every headline in the ticker -> id or class?" -> class.
   - Wrong -> "One of a kind -> id. A family that shares a look -> class."
5. **Fix.** The ticker's three headlines, rendered uniformly (all three read alike on
   screen - the typo has no visible effect yet). Code:
   ```html
   <div class="headline">Storm warning issued for the west coast</div>
   <div class="headlnie">Parliament votes on the budget tonight</div>
   <div class="headline">HIFK wins the derby 4 - 2</div>
   ```
   "All three headlines should carry `class="headline"`, but one is misspelled, so in
   Unit 3 it won't pick up the shared style. Read the class names and tap the odd one
   out." Correct: the typo `headlnie`; fix via bank.
   - Tapping a correctly spelled line -> "That class is spelled right. Compare the three
     class names *letter by letter* - one of them is off." (This is deliberate groundwork
     for lesson 8.7's debugging method.)

- **Success criteria:** at least 4/5; the id-vs-class pair (ex. 4) both correct.
- **Common wrong answers:** unique-vs-shared confusion (ex. 4); typo blindness (ex. 5 -
  the course's first typo-hunt, a skill recycled forever after).
- **Duration:** 5 min.

---

## Lesson 2.5 - Pictures

- **New concept:** `<img src="...">` shows an image from a file; no closing tag; `src`
  names the file.
- **Learner-facing explanation:** "`<img src="nn-logo.png">` puts an image on screen.
  There's no closing tag - the picture *is* the content - and `src` (source) says which
  file to show."
- **Context:** the NN logo joins the strap; a sun icon joins a weather strap. Asset
  drawer UI shows the available files: `nn-logo.png`, `nn-logo-gold.png`,
  `weather-icon-sun.png`, `weather-icon-rain.png`, `hifk-crest.png`.
- **Recycles:** attributes inside the opening tag (2.3/2.4), keying/transparency (1.3),
  nesting (2.1 - the img lives *inside* the strap).

**Exercises**

1. **Observe.** Strap code now includes `<img src="nn-logo.png">` as the first child.
   "Tap the code that shows the channel logo."
2. **Predict.** "We change `src="nn-logo.png"` to `src="nn-logo-gold.png"`. What
   happens?"
   - A) The gold version of the logo shows. **(correct)**
   - B) Nothing. -> "src is live: point it at another file and the picture follows."
   - C) The text turns gold. -> "src only chooses the *image file* - text isn't
     involved."
3. **Fill (word bank).** "Show the sun icon on the weather strap:
   `<img ____="weather-icon-sun.png">`" Bank: *src* **(correct)**, *id*, *file*.
   - *id* -> "An id names the element; it doesn't load anything. The attribute that
     points at a file is `src`."
   - *file* -> "Good guess - but the attribute's real name is `src`, short for
     *source*."
4. **Fix.** Render: broken-image marker where the logo should be. Code:
   `<img src="nn-logo.pgn">`
   "The logo is missing on air. Find the problem." Correct: tap the filename; fix
   `pgn` -> `png` from bank.
   - Tapping `<img` or `src` -> "The tag and attribute are fine. Read the *value*
     carefully - does that file exist in the asset drawer?"
5. **Predict (keying recycle).** Two versions of the logo shown over video: one PNG
   with a solid white box behind it, one transparent PNG. "Which file belongs on a
   lower third?"
   - Transparent **(correct)**; white-box -> "Remember the empty stage: anything you
     draw covers the video. A white box on air is a designer's nightmare - use images
     with transparent backgrounds."
6. **Arrange.** Blocks: `<img` / `src=` / `"hifk-crest.png"` / `>` - "Build the tag
   that puts the club crest on the score strap."

- **Success criteria:** at least 5/6; ex. 4 (broken filename) solved - it must be
  *found*, not just fixed, since finding is the durable skill.
- **Common wrong answers:** filename typos treated as "the app is broken" (ex. 4's
  feedback names the habit: check the value against the asset drawer); solid-background
  images on overlays (ex. 5).
- **Duration:** 5 min.

---

## Lesson 2.6 - The skeleton

- **New concept:** every template shares one frame: `<head>` for settings (`<style>`,
  and the template definition) and `<body>` for what's on screen (plus its `<script>`).
  Recognize-only.
- **Learner-facing explanation:** "Around the code you've been editing there's always
  the same frame. The `<head>` holds settings: the looks (`<style>`) and the template's
  control-panel definition. The `<body>` holds everything that appears on screen. You'll
  open each of these rooms later - today you learn the floor plan."
- **Context:** the full Nightly News template, zoomed out for the first time, regions
  color-coded and folded; the strap the student knows is highlighted inside `<body>`.
  Two "trust it for now" seals are placed visibly: on `<style>` ("opens in Unit 3") and
  on the definition script ("opens in Unit 7").
- **Recycles:** nesting at the largest scale (2.1 - html contains head and body),
  everything-they-know lives in body.

**Folded map shown:**
```html
<html>
  <head>
    <style> ... the looks ... </style>
    <script> ... the template definition ... </script>
  </head>
  <body>
    <div> ... the strap you know ... </div>
    <script> ... the moves and the data ... </script>
  </body>
</html>
```

**Exercises**

1. **Observe.** "Tap the section where the strap's elements live." Correct: `<body>`.
   - `<head>` -> "The head holds settings - nothing in it is ever drawn on screen."
2. **Observe.** "Tap the section that decides the graphic's *looks* - colors, fonts.
   We open it next unit." Correct: `<style>` in the head.
3. **Predict.** "A colleague says: *'The fields the operator can edit are described in
   the head.'* True or false?"
   - True **(correct)** - "That's the template definition - the seal comes off in
     Unit 7."
   - False -> "It's true: the head carries the template's settings, including the list
     of operator fields. Unit 7 opens that seal."
4. **Predict.** "Where would you add a third strap line?"
   - A) Inside the strap's div, in the body. **(correct)**
   - B) In the head. -> "The head never draws anything. On-screen elements live in the
     body."
   - C) After `</html>`. -> "Outside the frame nothing exists - the template ends at
     `</html>`."
5. **Fill (drag labels).** Drag the labels *head* / *body* / *style* / *the definition*
   onto the four highlighted regions of the folded map.

- **Success criteria:** 4/5, including both Observe taps (ex. 1-2).
- **Common wrong answers:** expecting head content to render (ex. 1, 4B - the
  head-vs-body split must be solid before Unit 3 opens `<style>`).
- **Duration:** 4 min.

---

## Lesson 2.7 - Review remix (no new concept)

- **Purpose:** spaced retrieval across Units 1-2 before the checkpoint; adaptive - the
  app draws 6 exercises weighted toward the student's weakest recorded skills.
- **Learner-facing framing:** "Nothing new - a quick lap of everything the strap has
  taught you."
- **Fixed pool (each tagged with its source lesson):**
  1. **Observe** (2.3): full strap code - "Tap the element with id `title`."
  2. **Fix** (2.2): crossed closers on the LIVE badge - find and swap.
  3. **Fix** (2.5): `src="nn-logo.png"` misspelled - find and correct.
  4. **Predict** (1.6): "We change this span to a div - what happens to the line?"
  5. **Arrange** (2.1/2.3/2.4): rebuild the strap with wrapper, ids, classes, logo -
     7 blocks.
  6. **Predict** (1.3): the strap over checkerboard - "What will the viewer see here?"
- **Success criteria:** at least 5/6. Any miss appends one more exercise from the same
  source lesson's pool (capped at 8 total).
- **Duration:** 4-5 min.

---

## Checkpoint 2 - "Rebuild the strap"

- **Type:** Build via Arrange (Parsons) - fully phone-friendly by design; on web the
  student may alternatively type it from scratch against the same checker.
- **Scenario:** "The intern deleted the strap's structure. The pieces survived. Rebuild
  it exactly, then put it on air."
- **Target structure (10 shuffled blocks, indentation snaps on placement):**
  ```html
  <div>
    <img src="nn-logo.png">
    <div id="name" class="line">Maria Kranz</div>
    <div id="title" class="line">News Anchor</div>
  </div>
  ```
- **Distractor blocks included:** a second `</div>` (surplus) and a block reading
  `<div id="name">` *without* the class (near-miss). Distractors make the Parsons
  problem honest - the student must reject, not just order.
- **Pass criteria (checked structurally, not textually):** wrapper contains all three
  children in order; `name`/`title` ids on the correct lines; both lines carry
  `class="line"`; the img's src intact; no unclosed elements. Then PLAY: the strap must
  animate in with logo and both lines styled.
- **Failure handling:** the checker names the *structural* problem in learner terms,
  each mapping to its remediation lesson:
  - stranded child -> "Your title line sits outside the strap - it won't move with the
    strap when it animates. (See: Boxes inside boxes.)" -> offers micro-review 2.1.
  - swapped ids -> "The operator's name would land in the title slot in Unit 7 - ids
    must match the element's job. (See: The id.)" -> micro-review 2.3.
  - missing class -> "One line is missing the family label it needs to share the look
    in Unit 3 - which line, and which label? (See: The class.)"
  - crossed/unclosed tags -> the 1.4/2.2 swallowed-content render plus the inside-out
    rule.
- **Duration:** 6-7 min.

**Unit 2 total learner time:** ~35-42 min across 8 sessions.
