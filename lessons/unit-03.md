# Unit 3 - House Style (full lesson plans)

**Unit goal:** restyle any graphic's colors, type, and spacing to match a brand.
**Promise:** after this unit you can restyle a lower third to match any channel's brand.
**Prerequisites:** Units 0-2. This unit opens the `<style>` seal placed in 2.6.
**Conventions:** as in unit-01.md. From 3.1 onward, code slices may show a `<style>`
block above the body markup; the two are visually separated ("the style room" / "the
stage"). Selectors may only use tag names, classes, and ids the student met in Units
1-2. Named colors only until 3.5; no font properties until 3.6; no sizes until 3.7.

Running graphics this unit: the **Nightly News strap** (wrapper now carrying
`id="panel"`), the **score strap**, the **ticker** (scenery since 2.4), and the
**brand card** - a new recurring prop from the (fictional) NN design department.

---

## Lesson 3.1 - A rule of style

- **New concept:** CSS rule anatomy: `selector { property: value; }` - who, then what -
  and rules live inside `<style>`, not on stage.
- **Learner-facing explanation:** "Looks are written as *rules* in the style room:
  first *who* (the selector), then in braces *what to change* and *what to change it
  to* - `div { background-color: black; }`. The rule changes how elements look; it
  never appears on screen itself."
- **Context:** the seal from 2.6 comes off `<style>` - and the strap is suddenly
  *naked*: the hidden CSS that dressed it all course is revealed and emptied. One rule,
  typed live, puts the black panel back before the student's eyes.
- **Recycles:** the skeleton (2.6 - the style room is in the head), element names
  (1.4/1.6), content-shows-exactly-as-written (1.5).

**Code slice (used by ex. 1-2, color-coded selector / property / value):**
```html
<style>
  div { background-color: black; }
</style>

<div>
  <div>Maria Kranz</div>
  <div>News Anchor</div>
</div>
```

**Exercises**

1. **Observe (three taps).** The rule shown color-coded, mirroring 1.4's tag dissection.
   "Tap the part that says *who* gets styled." -> `div`. "Tap the part that says *what*
   to change." -> `background-color`. "Tap the part that says what to change it *to*."
   -> `black`.
   - Wrong taps restate the zone's job, e.g. tapping `black` for the property: "That's
     the *value* - the answer. The property is the question being answered: which look
     are we changing?"
2. **Predict (kernel).** "Read this rule like a sentence: `div { color: white; }`.
   What does it say?"
   - A) The divs: make their text white. **(correct)** (Rule toggles on; the strap's
     text flips white live.)
   - B) Make a new div named color. -> "Rules never create elements - the body decides
     what exists, the style room only decides how it looks."
   - C) Put the word 'white' inside the div. -> "Nothing in the style room ever shows
     on screen. Who, then what: *divs* get *white text*."
3. **Fill (word bank).** "The director wants the strap's text white. Complete the rule:
   `div { color: ____; }`" Bank: *white* **(correct)**, *bright*, *div*.
   - *bright* -> render: nothing changes. "The machine only knows real color names -
     'bright' isn't one, so the rule failed quietly. Try the color's actual name."
   - *div* -> "div is the *who* - it's already written before the braces. Inside the
     braces goes the what: a property and its value."
4. **Fix.** Render: the strap's second line reads `background-color: black` ON AIR.
   Code:
   ```html
   <style>
   </style>

   <div>
     <div>Maria Kranz</div>
     <div>background-color: black</div>
   </div>
   ```
   "The style words are showing on screen, like the quote marks in Unit 1. What went
   wrong?"
   - A) The rule was written on stage (in the body) instead of in the style room.
     **(correct)** -> one-tap fix moves it into `<style>` as
     `div { background-color: black; }`; the panel appears, the stray line vanishes.
   - B) The color name is wrong. -> "The color is fine - the *address* is wrong.
     Anything between an element's tags is content, and content shows exactly as
     written."
   - C) It needs quote marks. -> "Quotes would show on air too (remember 1.5). Style
     words don't belong on stage at all - they live in `<style>`, in the head."
5. **Arrange.** Blocks: `div` / `{` / `background-color:` / `black` / `;` / `}` -
   "Assemble the rule that paints the strap's panel black."
   - Value before property -> "Who, then what, then to-what: the property comes first,
     then a colon, then the value."
   - Missing `;` placement -> "Every property line ends with a semicolon - it's the
     full stop of the style sentence."

- **Success criteria:** at least 4/5, and ex. 2 (the kernel) correct; if missed, a
  fresh who-then-what variant (`span { color: yellow; }`) is asked at the end.
- **Common wrong answers:** writing style words into the HTML content (ex. 4 - the
  headline misconception, given a *visible* on-air consequence exactly like 1.5's
  quote marks); confusing property and value roles (ex. 1, 5).
- **Duration:** 5 min.

---

## Lesson 3.2 - Styling by tag

- **New concept:** an element selector hits *every* element of that tag - `div { }`
  styles all divs, `span { }` all spans.
- **Learner-facing explanation:** "A tag selector styles every element with that tag
  name - write `span { ... }` once and *all* spans obey. One rule, many elements."
- **Context:** the score strap. One `span` rule colors both scores at once - and
  retroactively explains Unit 1's "magic" span highlight.
- **Recycles:** div/span (1.6), rule anatomy (3.1), class vocabulary (2.4) as contrast
  in ex. 5.

**Code slice:**
```html
<style>
  span { color: yellow; }
</style>

<div>HIFK <span>3</span> - <span>2</span> TPS</div>
```

**Exercises**

1. **Observe.** A toggle switches the `span` rule on and off; both scores flip yellow
   and back *together*. "The rule is written once. How many elements did it change?"
   - Both **(correct)** / only the 3 -> "Watch the toggle again: the 2 flips too. A tag
     selector reaches *every* span, not just the first one it meets."
2. **Predict (kernel).** Same strap. "We add a third span around LIVE:
   `<span>LIVE</span>`. With `span { color: yellow; }` in the style room, how many
   elements are yellow now?"
   - A) 3 **(correct)** - "Every span, always - including ones added later. That's why
     tag selectors are powerful and dangerous."
   - B) 1 -> "A tag selector isn't first-come-first-served. It styles every element
     carrying that tag name."
   - C) 2 -> "The new LIVE span is a span like the others - the rule picks it up the
     moment it exists."
3. **Observe (the retro-reveal).** The Unit 1 score lesson returns, its hidden CSS now
   visible. "In Unit 1 the score turned yellow 'by magic'. Tap the rule that was hidden
   all along." Correct: `span { background-color: yellow; }`.
   - Tapping the body code -> "The stage only says what exists. The look came from the
     style room - it was there the whole time, sealed."
4. **Fix.** Render: both scores stay plain white; nothing happens. Code:
   ```html
   <style>
     scores { color: yellow; }
   </style>
   ```
   "The designer wrote a rule but the scores never changed. Why?"
   - A) There is no tag called `scores` - the selector must name a real tag: `span`.
     **(correct)** -> fix from bank; scores turn yellow.
   - B) The color name is wrong. -> "yellow is fine. The rule reaches *nobody* - the
     who is a tag name that doesn't exist."
   - C) The template is broken. -> "Nothing is broken - and that's the trap. CSS fails
     *silently*: a selector that matches nothing simply does nothing. Remember this
     feeling; you'll hunt this exact bug in Unit 8."
5. **Predict.** "The director wants ONLY the home score yellow, not both. Can
   `span { ... }` do that?"
   - A) No - a tag selector always hits every span. We need a way to name just one.
     **(correct)** - "Exactly. You already invented those names in Unit 2 - ids and
     classes. Next lesson they pay off."
   - B) Yes - it takes the first span. -> "Tag selectors don't pick favourites; both
     scores changed in ex. 1. To single one out we need its *name*."
   - C) Yes - write the rule twice. -> "Twice the rule, same crowd: it still addresses
     every span. Selecting *one* element needs a different kind of who."

- **Success criteria:** at least 4/5, and ex. 2 (the kernel count) correct; if missed,
  a fresh counting variant (divs in the full strap) is asked at the end.
- **Common wrong answers:** expecting a tag selector to hit only the first match
  (ex. 1, 2B); treating silent failure as "the app is broken" (ex. 4C - deliberate
  groundwork for 8.7).
- **Duration:** 4-5 min.

---

## Lesson 3.3 - Dot and hash

- **New concept:** `.line` selects by class, `#name` selects by id - the names the
  student invented in Unit 2, now paying off.
- **Learner-facing explanation:** "A dot selects a *class*: `.line` styles every
  element wearing `class=\"line\"`. A hash selects an *id*: `#name` styles the one
  element with `id=\"name\"`. Dot = family, hash = one of a kind."
- **Context:** the strap - `.line` gives both lines the shared white text, `#name`
  turns only the name NN yellow. The Unit 2 promise ("styles will find these names")
  is kept on screen.
- **Recycles:** id vs class discrimination (2.4 ex. 4, now with visible consequences),
  the typo-hunt habit (2.4 ex. 5), silent failure (3.2).

**Code slice:**
```html
<style>
  .line { color: white; }
  #name { color: yellow; }
</style>

<div id="panel">
  <div id="name" class="line">Maria Kranz</div>
  <div id="title" class="line">News Anchor</div>
</div>
```

**Exercises**

1. **Observe (multi-tap).** "Tap EVERY element that `.line` will style." Correct: both
   inner divs (each outlines on the render as tapped).
   - Selecting only one -> "Classes are shared - dot rules reach the whole family.
     Keep looking."
   - Tapping the panel -> "The panel carries an id, not `class=\"line\"`. Dot rules only
     find elements *wearing* the class."
2. **Predict.** "`.line` vs `#name` - which changes more elements here?"
   - A) `.line` - it hits both lines; `#name` hits exactly one. **(correct)**
   - B) `#name` -> "An id is one of a kind by Unit 2's rule - a hash can only ever find
     one element."
   - C) They tie. -> "Count the wearers: two elements carry the class, one carries the
     id."
3. **Fill (kernel).** "Only the name line should turn yellow - dot or hash?
   `___name { color: yellow; }`" Bank: `#` **(correct)**, `.`.
   - `.` -> render: nothing changes. "Nothing happened - dot means *class*, and no
     element carries `class=\"name\"`. The name badge is an id, one of a kind: hash.
     Dot = family, hash = one of a kind."
4. **Fix.** Render: both lines stay unstyled. Code:
   ```html
   <style>
     #line { color: white; }
   </style>

   <div>
     <div class="line">Maria Kranz</div>
     <div class="line">News Anchor</div>
   </div>
   ```
   "The lines won't take their style. Find the mismatch."
   - Correct: tap the selector `#line`; fix from bank: `.line`. "The markup says
     `class=\"line\"` - a class needs a dot. The hash went looking for `id=\"line\"`,
     found nobody, and failed silently."
   - Tapping the markup -> "The markup is fine - compare it with the selector,
     character by character, like the ticker typo in Unit 2. Which side is wrong?"
5. **Predict (two quick taps).** "Style every headline in the ticker - dot or hash?"
   -> dot. "Style the strap's one-and-only background panel by its id `panel` - dot or
   hash?" -> hash.
   - Wrong -> "Dot = family, hash = one of a kind. Same choice you made in Unit 2 when
     you handed out the names - now it decides who the rule reaches."

- **Success criteria:** at least 4/5, and ex. 3 (the kernel) correct; if missed, its
  mirror version (`___line { color: white; }` - dot or hash?) is asked at the end.
- **Common wrong answers:** dot/hash swapped or omitted (ex. 3, 4 - both shown as
  silent failures with the feedback formula "dot = family, hash = one of a kind"
  repeated every time); forgetting that ids are unique (ex. 2B).
- **Duration:** 5 min.

---

## Lesson 3.4 - Paint it

- **New concept:** `color` colors the text, `background-color` colors the box - two
  properties, two different surfaces.
- **Learner-facing explanation:** "Every element has two paintable surfaces: the words
  and the box behind them. `color` paints the words; `background-color` paints the
  box. Never let the two whites meet."
- **Context:** the strap goes NN house style: white text on a dark panel (named colors
  for now - the exact brand codes arrive next lesson). Painting the *panel* colors the
  text of both lines too: children inherit their parent's text color, the nesting from
  2.1 quietly at work.
- **Recycles:** rule anatomy (3.1), selectors (3.2/3.3), nesting as inherited text
  color (2.1), keying (1.3 - a painted box covers video; an unpainted one doesn't).

**Code slice:**
```html
<style>
  #panel {
    background-color: black;
    color: white;
  }
</style>

<div id="panel">
  <div class="line">Maria Kranz</div>
  <div class="line">News Anchor</div>
</div>
```

**Exercises**

1. **Observe (toggle-match).** Two toggles switch the panel's two properties off and on
   independently. "Match each property to what it painted." Drag *color* -> the words,
   *background-color* -> the box.
   - Wrong match -> "Watch the render: switching `color` off turned the *words* dark
     again - the box never moved. Two properties, two surfaces."
2. **Predict (kernel).** "We change the panel rule's `color: white` to `color: navy`.
   Does the box change?"
   - A) No - the words turn navy. `color` means the text, always. **(correct)** (Render
     preview: the words go navy on the black panel, barely readable - "and notice
     *both* lines changed: the lines sit inside the panel, so they inherit its text
     color.")
   - B) Yes - the box turns navy. -> "Look again: the words changed, the box didn't.
     The box listens only to `background-color`."
   - C) Both the box and the words. -> "One property, one surface. To paint both you
     need both properties."
3. **Fill (word bank).** "Make the title line grey: `#title { ____: grey; }`"
   Bank: *color* **(correct)**, *background-color*.
   - *background-color* -> render: a grey box appears behind the title text. "See the
     grey box? That painted the *surface behind* the words. To touch the words
     themselves: `color`."
4. **Fix.** Render over video: a white box in the lower third, no words visible. Code:
   ```html
   <style>
     #panel { background-color: white; }
     .line { color: white; }
   </style>
   ```
   "The presenter's name has vanished on air. It's still there - why can't we see it?"
   - A) White words on a white panel - the two whites met. **(correct)** -> the student
     picks which value to change (either accepted, e.g. `color: black`); render fixes.
     "Broadcast's oldest gotcha, caught. On a real channel this goes out to a million
     sofas."
   - B) The text was deleted. -> "Tap the body: the words are still in their divs.
     White-on-white is *invisible*, not gone."
   - C) PLAY wasn't pressed. -> "It's on air - the white box is right there covering
     the video. The problem is paint, not playout."
5. **Predict (keying recycle).** "We delete the `background-color` line entirely. What
   shows behind the white words on air?"
   - A) The program video - an unpainted box is see-through. **(correct)** - "The empty
     stage rule from Unit 1, now under your control: paint covers, no paint keys."
   - B) A white box. -> "White would need to be *painted*. Remove the paint and the box
     goes back to transparent."
   - C) A black box. -> "Black is a color like any other - no rule, no paint, video
     shows through."

- **Success criteria:** at least 4/5, and ex. 2 (the kernel) correct; if missed, the
  mirror variant ("we change `background-color: black` to `background-color: navy` -
  do the words change?") is asked at the end.
- **Common wrong answers:** `color` treated as "colors everything" (ex. 2, 3 - both
  given visible consequences); the invisible-text classic (ex. 4 - re-tested in
  Checkpoint 3's property-by-property check).
- **Duration:** 5 min.

---

## Lesson 3.5 - Brand colors

- **New concept:** hex codes like `#0a3d91` - exact colors, read in pairs
  (red/green/blue), at recognize-and-tweak level. Channels don't use "blue"; they use
  *their* blue.
- **Learner-facing explanation:** "A hex code is a color's exact recipe: `#`, then
  three pairs - red, green, blue. You never calculate one; you *copy* it from the
  brand card, character by character."
- **Context:** a brand card arrives from the NN design department - the course's new
  recurring ritual: primary `#0a3d91` (deep blue), accent `#e8b90c` (amber). The
  strap's named colors get replaced by the real thing.
- **Recycles:** the two surfaces (3.4), silent failure (3.2/3.3), the typo-hunt habit
  (2.4).

**Code slice:**
```html
<style>
  #panel {
    background-color: #0a3d91;
    color: white;
  }
</style>
```

**Exercises**

1. **Observe (the mixer).** A hex mixer: three sliders labelled red / green / blue,
   each moving one *pair* of the code, the swatch updating live. The student drags the
   blue pair from `00` to `91` and watches NN blue appear. Then: "The card's blue is
   `#0a3d91`. Which two characters carry the *red* amount?"
   - `0a` **(correct)** - "Pairs read left to right: red, green, blue."
   - `3d` -> "That's the middle pair - green. Red rides first."
   - `91` -> "Last pair is blue - and it's the biggest here, which is why the color
     *is* blue."
2. **Predict (kernel).** "Three values from the card's family. Which one is probably
   the amber accent? `#0a3d91` / `#e8b90c` / `#111111`"
   - `#e8b90c` **(correct)** - "Big red, big green, almost no blue - red plus green
     makes yellow-amber. You read it, you didn't calculate it."
   - `#0a3d91` -> "Its biggest pair is the last one - blue. Lots of blue and little
     red is a cool color, not amber."
   - `#111111` -> "All three pairs tiny and equal - that's almost black. Amber needs
     the warm pairs (red, green) turned up."
3. **Fill (word bank).** "Apply the card's primary to the panel:
   `#panel { background-color: _______; }`"
   Bank: `#0a3d91` **(correct)**, `#0a3d19`, `0a3d91`, `blue`.
   - `#0a3d19` -> render: a murky green-tinged dark shows instead. "Look at the panel -
     visibly off-brand. Two characters got swapped. Brand hexes are copied character
     by character, never from memory."
   - `0a3d91` -> render: panel loses its paint entirely. "Without the `#` the machine
     doesn't read it as a color at all - the rule failed silently, like the ghost
     selector in 3.2."
   - `blue` -> render: a different, brighter blue. "It's blue - but not *NN's* blue.
     Put them side by side and the brand check fails. Channels use exact codes."
4. **Fix.** Render: the panel is unpainted; video shows through behind white text.
   Code: `#panel { background-color: #0a3d9; }`
   "The panel lost its blue. Count the characters."
   - Correct: tap the value; fix restores the missing digit -> `#0a3d91`. "Five
     characters isn't a color, so the machine ignored the whole line - silently. A hex
     is always `#` plus six."
   - Tapping the selector or property -> "Both are fine - the rule *reaches* the panel.
     Read the value: is it a complete recipe?"
5. **Predict.** "A designer says: 'I'll work out our blue's hex in my head.' What's
   the professional move instead?"
   - A) Copy it from the brand card - brand hexes are copied, never invented.
     **(correct)**
   - B) Use `blue`, it's close enough. -> "On a brand check, close fails. The
     reference compares exact values - you saw the two blues clash in ex. 3."
   - C) Tweak by eye until it looks right. -> "Your screen isn't the viewer's screen.
     The card is the truth - copy it."

- **Success criteria:** at least 4/5, and ex. 2 (the kernel read) correct; if missed,
  a fresh recognition variant (pick the near-black of the three) is asked at the end.
- **Common wrong answers:** believing hex must be calculated (ex. 2, 5 - the lesson
  insists on copy-don't-compute); missing `#` or missing digit as silent failures
  (ex. 3, 4 - both feed 8.7's suspect list).
- **Duration:** 4-5 min.

---

## Lesson 3.6 - The channel's typeface

- **New concept:** `font-family` picks the typeface, written as a list because not
  every machine has every font - the first available face wins.
- **Learner-facing explanation:** "`font-family: Archivo, sans-serif;` asks for the
  brand face first, with backups after the commas. The machine walks the list left to
  right and uses the first face it actually has. Names with spaces wear quote marks."
- **Context:** the brand card gains a line: *typeface Archivo*. The strap switches
  from the default face to the channel look; three candidate faces are previewed on
  air side by side.
- **Recycles:** rule anatomy (3.1), the class selector (the family font goes on
  `.line` - 3.3's exact payoff), the brand-card ritual (3.5).

**Code slice:**
```html
<style>
  .line { font-family: Archivo, sans-serif; }
</style>
```

**Exercises**

1. **Observe.** The same strap rendered three times: a bookish serif face, the plain
   default, and Archivo. The brand card shows an Archivo specimen. "Tap the render
   that matches the card."
   - Correct: Archivo. Wrong -> "Compare letter shapes with the card's specimen - the
     card is the truth, not taste. Look at the a and the g."
2. **Predict (kernel).** "The playout machine doesn't have Archivo installed. What
   does `font-family: Archivo, sans-serif;` show on air?"
   - A) The next name on the list - a standard sans-serif face. **(correct)** (Render
     preview: the strap in the fallback face - close, not identical.) "That's the
     whole point of the list: the show goes on, in the nearest safe face."
   - B) Nothing - the text disappears. -> "Text never vanishes over a missing font -
     the list exists exactly for this. The machine walks it left to right and uses the
     first face it owns."
   - C) Both fonts mixed together. -> "One face at a time. The list is a ranked queue
     of backups, not a blend."
3. **Fill (word bank).** "Ask for the brand face, with the safe backup after it:
   `.line { font-family: _______, sans-serif; }`"
   Bank: *Archivo* **(correct)**, *sans-serif*, *bold*.
   - *sans-serif* -> "That's already there - it's the backup. The first seat belongs
     to the brand face from the card."
   - *bold* -> "bold is a *weight*, not a typeface - weights arrive next lesson.
     font-family only takes face names."
4. **Fix (recognize level).** The weather strap ignores its font; render shows the
   default face. Code: `.line { font-family: Archivo Narrow, sans-serif; }`
   "The weather strap won't take its face. Something is missing around the name - tap
   where."
   - Correct: tap the two-word name; fix from bank adds quotes ->
     `"Archivo Narrow"`. "A name with a space wears quote marks - without them some
     playout machines misread the list. Rule of thumb: space in the name, quotes
     around it. (You'll meet fonts properly again in Unit 8.)"
   - Tapping `sans-serif` -> "The backup is a built-in keyword - it never needs
     quotes. Look at the name with the *space* in it."
5. **Predict (quick true/false).** "True or false: listing two fonts makes the text
   use both at once."
   - False **(correct)** - "The list is a fallback queue. First available face wins,
     and only that one renders."
   - True -> "Watch ex. 2 again: only one face ever shows. The commas mean 'or else',
     not 'and also'."

- **Success criteria:** at least 4/5, and ex. 2 (the fallback kernel) correct; if
  missed, a fresh variant (the machine lacks BOTH listed faces except the generic -
  what shows?) is asked at the end.
- **Common wrong answers:** "the list means all fonts apply at once" (ex. 2C, 5);
  unquoted multi-word names (ex. 4 - recognize-level, planting 8.3's @font-face work).
- **Duration:** 4-5 min.

---

## Lesson 3.7 - Size and weight

- **New concept:** `font-size` in px on the fixed 1080p canvas (a px is a px here -
  one of broadcast's gifts), and `font-weight` to separate the name from the title.
- **Learner-facing explanation:** "On the 1920x1080 canvas a pixel is a fixed, honest
  unit: `font-size: 44px` is the same size on every machine. `font-weight: bold` or
  `normal` sets how heavy the letters are. Big and bold for the name, smaller and
  lighter for the title - that contrast is broadcast's type hierarchy."
- **Context:** the brand card gains its type spec: *name 44px bold, title 28px
  normal*. The strap's two lines finally stop looking like twins.
- **Recycles:** id selectors (3.3), the brand card (3.5), the 1920x1080 canvas (1.3),
  silent failure (3.2).

**Code slice:**
```html
<style>
  #name {
    font-size: 44px;
    font-weight: bold;
  }
  #title {
    font-size: 28px;
    font-weight: normal;
  }
</style>
```

**Exercises**

1. **Observe (the legibility slider).** A slider drives the title's `font-size` from
   12px to 60px; below 24px the slider track turns red ("too small to read from the
   sofa") and the render zooms out to a living-room view of the TV. "Set the title to
   the card's 28px. Why is the red zone red?"
   - A) TV is read from across a room - broadcast type has a minimum size.
     **(correct)**
   - B) Small text is against the rules of CSS. -> "CSS allows any size - the *room*
     doesn't. The limit is the viewer's sofa, not the machine."
   - C) 12px is not a real size. -> "It's real - look how the render accepts it. It's
     just unreadable from the sofa, which is where your viewer sits."
2. **Predict (kernel).** "The card says: name 44px bold, title 28px normal. Which rule
   styles the *title* correctly?"
   - A) `#title { font-size: 28px; font-weight: normal; }` **(correct)**
   - B) `#title { font-size: 44px; font-weight: bold; }` -> render preview: both lines
     equally huge and heavy. "Now the title shouts as loudly as the name - the
     hierarchy on the card (big bold name, smaller lighter title) is gone."
   - C) `#name { font-size: 28px; font-weight: normal; }` -> render preview: the NAME
     shrinks instead. "The properties are right but the selector reaches the wrong
     element - the *who* decides where the style lands."
3. **Fill (word bank).** "Set the name's weight per the card:
   `#name { font-weight: ____; }`" Bank: *bold* **(correct)**, *normal*, *44px*.
   - *normal* -> render: name and title at the same weight. "Now the name whispers
     like the title. The card wants the name heavier: bold."
   - *44px* -> render: nothing changes. "44px is a *size*, not a weight - the machine
     ignored the line, silently. Weight words here: bold, normal."
4. **Fix.** Render: the title sits at the default size, ignoring the spec. Code:
   `#title { font-size: 28; }`
   "The designer set 28 but the title never changed. Find what's missing."
   - Correct: tap the value; fix from bank -> `28px`. "A bare number isn't a length -
     without `px` the machine drops the whole line, silently. This exact bug is one of
     Unit 8's four usual suspects: remember it."
   - Tapping the selector -> "The selector is fine - it reaches the title. Read the
     value: 28 *what*?"
5. **Type (web; word-bank assembly on phone).** "Write the full rule for the title:
   size 28px, weight normal." Accept `#title { font-size: 28px; font-weight: normal; }`
   (whitespace-flexible; both declarations required, each ending with `;`).
   - Missing `px` -> "28 needs its unit - px - or the line is silently dropped."
   - Missing `;` -> "Each property line ends with a semicolon - without it the next
     line gets swallowed."
   - `.title` or bare `title` -> "The markup says `id=\"title\"` - one of a kind, so:
     hash."

- **Success criteria:** at least 4/5, and ex. 2 (the hierarchy kernel) correct; if
  missed, a fresh variant (pick the rule that styles the *name*) is asked at the end.
- **Common wrong answers:** sizing by eye instead of reading the card (ex. 2B -
  feedback keeps pointing back to the spec); missing `px` (ex. 4, 5 - planted for
  8.7); weight/size values swapped (ex. 3).
- **Duration:** 5-6 min.

---

## Lesson 3.8 - Breathing room

- **New concept:** `padding` - space *inside* the box, between the panel's edge and
  its content; the difference between amateur and broadcast-clean.
- **Learner-facing explanation:** "`padding: 20px` pushes a box's edge 20 pixels away
  from what's inside it, on all sides. The content stays put; the box grows around it.
  Text touching a panel edge is the surest sign of an amateur graphic."
- **Context:** the freshly branded strap has one flaw left: the text is glued to the
  panel's edge. Padding finishes the look. (Space *outside* a box - margin - is
  deliberately saved for Unit 4, so the two are never introduced in the same breath.)
- **Recycles:** the box intuition from nesting (2.1 - the box around content), rule
  anatomy (3.1), the id selector (3.3), hex (3.5).

**Code slice:**
```html
<style>
  #panel {
    background-color: #0a3d91;
    padding: 20px;
  }
</style>
```

**Exercises**

1. **Observe (the padding slider).** A slider drives the panel's padding 0 -> 40px;
   the blue panel grows around the fixed text. "What did the slider actually move?"
   - A) The gap inside the panel, between its edge and the words. **(correct)**
   - B) The strap slid across the screen. -> "Watch the words: they never moved.
     Padding is *inside* space - moving boxes around the frame is Unit 4's job."
   - C) The words got bigger. -> "The type stayed at its card sizes - only the panel's
     edge walked outward."
2. **Predict (kernel).** "We give the panel `padding: 20px`. Does the text move, or
   the panel's edge?"
   - A) The edge - it's pushed outward, away from the content. **(correct)** (Render
     preview confirms: text still, panel grown.)
   - B) The text shrinks to make room. -> "Padding never touches the content - it
     grows the *box* around it."
   - C) The whole strap moves 20px across the screen. -> "That would be *outside*
     space - a different property, waiting in Unit 4. Padding only breathes inside
     the box."
3. **Fill (word bank).** "Give the panel its breathing room:
   `#panel { ____: 20px; }`" Bank: *padding* **(correct)**, *font-size*, *color*.
   - *font-size* -> render: the panel's text jumps to 20px, breaking the card's
     hierarchy. "That resized the *type* - and broke the card's 44/28 spec. The
     property for inside space is padding."
   - *color* -> render: nothing changes. "A color can't be 20px, so the rule failed
     silently. Space inside the box: padding."
4. **Fix.** Render: a ticker headline crammed edge-to-edge in its panel. Code:
   ```html
   <style>
     .headline {
       background-color: #0a3d91;
       padding: 0px;
     }
   </style>
   ```
   "The headline is glued to its panel edge. Fix the rule that's starving it."
   - Correct: tap the `0px`; set a value from bank (12px accepted, 0px rejected).
     Render relaxes visibly. "Zero padding is legal - and always looks wrong on air."
   - Changing `font-size` route offered as distractor chip -> "Smaller type would
     still touch the edge - the missing thing is space, not size."
5. **Predict (taste check).** Two straps side by side, identical brand, one with
   `padding: 20px`, one with `padding: 0px`. "Tap the broadcast-clean one."
   - Padded **(correct)**. Wrong -> "Look at the gap between the words and the panel
     edge. Real channel graphics always leave breathing room - from now on, so do
     yours."

- **Success criteria:** at least 4/5, and ex. 2 (the kernel) correct; if missed, a
  fresh variant (padding on the score strap - what moves?) is asked at the end.
- **Common wrong answers:** padding confused with "moving the box" (ex. 1B, 2C - the
  feedback names Unit 4 explicitly so the margin discrimination lands on prepared
  ground); padding confused with type size (ex. 3, 4).
- **Duration:** 4-5 min.

---

## Lesson 3.9 - Review remix (no new concept)

- **Purpose:** spaced retrieval across Units 1-3 before the checkpoint; adaptive - the
  app draws 6 exercises weighted toward the student's weakest recorded skills, with
  four fixed anchors always included.
- **Learner-facing framing:** "Nothing new - a quick lap of the style room before the
  rebrand job."
- **Fixed anchors (always included, tagged with source lessons):**
  1. **Fix (3.3, typo-hunt from 2.4).** Render: the title line ignores its style.
     Code: `#titel { color: white; }` over markup `<div id="title" class="line">`.
     "The title won't style. Compare the selector with the markup, character by
     character." Correct: tap `#titel`, fix to `#title`.
     - Tapping the markup -> "The markup matches Unit 2's strap - the mismatch is on
       the style side. Machines don't forgive typos."
  2. **Predict (3.3 + 2.1).** "A third line is added inside the strap:
     `<div class="line">LIVE</div>`. How many elements does `.line { color: white; }`
     hit now?" Correct: 3.
     - 2 -> "The new line wears the class too - dot rules reach every wearer, including
       ones added later."
  3. **Arrange (3.1/3.4/3.5).** Blocks: `#panel` / `{` / `background-color:` /
     `#0a3d91` / `;` / `}` - "Rebuild the NN panel rule from the brand card."
     - Wrong order -> "Who, then what, then to-what - and the semicolon closes the
       line."
  4. **Predict (3.5).** The brand card shown. "Which value is NN amber?
     `#e8b90c` / `#0a3d91` / `#c0b9e8`" Correct: `#e8b90c`.
     - `#c0b9e8` -> "Its blue pair is the big one - that's a cool lilac. Amber runs
       warm: big red and green, tiny blue."
- **Adaptive slots (2, drawn by lowest strength across Units 1-3):** e.g. the
  color-vs-background-color swap (3.4), the fallback-font question (3.6), the missing
  `px` fix (3.7), the crossed closers (2.2), div-vs-span switch (1.6).
- **Success criteria:** at least 5/6. Any miss appends one more exercise from the same
  source lesson's pool (capped at 8 total).
- **Duration:** 4-5 min.

---

## Checkpoint 3 - "Rebrand it"

- **Type:** Build (web: type the rules against the checker; phone: guided
  block-assembly, one rule at a time).
- **Scenario:** NN launches a sister channel: **NN Sport**. A new brand card arrives:
  primary green `#0b6e3d`, text white, typeface *"Barlow Condensed"* (note the space),
  name 44px bold, title 26px normal, panel padding 20px. "Take the strap you rebuilt
  in Checkpoint 2 and dress it for the new channel - the reference render is your
  target."
- **Given code (structurally complete, style room empty; the wrapper now carries
  `id="panel"` so rules can reach it):**
  ```html
  <style>
  </style>

  <div id="panel">
    <img src="nn-logo.png">
    <div id="name" class="line">Tomas Berg</div>
    <div id="title" class="line">Sports Reporter</div>
  </div>
  ```
- **Tasks:** write/assemble the rules to match the reference: (1) panel color and
  padding, (2) family text color and typeface on `.line`, (3) name size and weight,
  (4) title size and weight - then press PLAY and check over video. Target solution
  (any equivalent rule split accepted; checking is by computed style, not text):
  ```css
  #panel { background-color: #0b6e3d; padding: 20px; }
  .line { color: white; font-family: "Barlow Condensed", sans-serif; }
  #name { font-size: 44px; font-weight: bold; }
  #title { font-size: 26px; font-weight: normal; }
  ```
- **Pass criteria (computed styles compared property-by-property against the
  reference, within tolerance):**
  - panel `background-color` = `#0b6e3d` exactly (named greens fail: "It's green -
    but not NN Sport's green. Copy the card's code.");
  - panel `padding` = 20px on all sides;
  - both `.line` elements: `color` white; `font-family` lists *Barlow Condensed*
    first (quoted) with a fallback present;
  - `#name`: `font-size` 44px, `font-weight` bold;
  - `#title`: `font-size` 26px, `font-weight` normal;
  - the strap plays out over video with the logo and both lines intact.
- **Failure handling (diagnosis names the property AND the surface, then maps to the
  source lesson):**
  - a rule that reaches nobody (selector typo, wrong dot/hash, missing `#panel`) ->
    "Your rule changed nothing on the render - compare the selector with the markup,
    character by character. (See: Dot and hash.)" -> micro-review 3.3.
  - malformed rule (missing `;`, missing `}` - following declarations swallowed) ->
    "Everything after your first line stopped working - check the punctuation. (See:
    A rule of style.)" -> micro-review 3.1.
  - wrong surface (text painted instead of panel or vice versa) -> "Your green landed
    on the words, not the box - which property owns which surface? (See: Paint it.)"
    -> micro-review 3.4.
  - wrong or broken hex (off-shade, missing `#`, five digits) -> "Your panel is
    visibly off the card's green - copy the code character by character. (See: Brand
    colors.)" -> micro-review 3.5.
  - font not applied (unquoted two-word name, missing fallback, wrong face) -> "The
    strap fell back to the default face - check the quotes around the two-word name.
    (See: The channel's typeface.)" -> micro-review 3.6.
  - size/weight off (e.g. "your title is bolder than the reference - check which rule
    carries the weight"; missing `px` called out by name) -> micro-review 3.7.
  - cramped panel (padding missing or 0) -> "The text is touching the panel edge -
    the reference breathes. (See: Breathing room.)" -> micro-review 3.8.
  After remediation the checkpoint re-runs with a fresh brand card (new hex pair, new
  face, new sizes), per the progression model.
- **Duration:** 6-7 min.

**Unit 3 total learner time:** ~41-48 min across 10 sessions.
