# Unit 4 - On the Canvas (full lesson plans)

**Unit goal:** place graphics precisely on the 1920x1080 frame the way broadcast
expects.
**Promise:** after this unit you can put a bug in the corner and a lower third in the
lower third - exactly where broadcast expects them.
**Prerequisites:** Units 0-3. **Conventions:** as in unit-01.md. Code slices may use
everything from Units 0-3 (structure, ids/classes, img, CSS rules and selectors,
color/background-color, hex, font properties, padding); each positioning property
appears only from its own lesson onward. Two new pieces of app UI debut this unit and
stay for the rest of the course: **the grid overlay** (from 4.1, crosshairs + x/y
readout) and **the safe-area overlay** (from 4.5, the title-safe rectangle).

Running graphics this unit: the **Nightly News strap** (branded in Checkpoint 3, its
wrapper now carrying `id="strap"`), the **NN corner bug** (`nn-logo.png`), the
**Election Night full-screen panel**, and the **sports ticker** as scenery. NN house
numbers established this unit: title-safe = 96px from the sides, 54px from top and
bottom; strap home = left 120, top 860; bug home = the safe corner.

---

## Lesson 4.1 - The grid you can trust

- **New concept:** the canvas is always exactly 1920x1080; a position is two plain
  pixel numbers counted from the top-left corner, and y grows downward.
- **Learner-facing explanation:** "Every graphic lives on the same frame: 1920 pixels
  wide, 1080 tall - always. A position is just two numbers counted from the top-left
  corner: x across, y down. y grows downward, like reading."
- **Context:** the grid overlay appears for the first time (togglable, stays available
  for the whole course); crosshairs read out x/y as the student drags a marker over
  the studio feed. No screens of different sizes, no reflowing - broadcast's gift.
- **Recycles:** the fixed 1920x1080 canvas (1.3, now made operational), px on the
  1080p canvas (3.7), the full-frame paint warning (1.3 ex. 3).

**Exercises**

1. **Observe.** The grid overlay is on; a draggable marker sits at (0, 0). "Drag the
   marker to the exact center of the frame - the readout should agree."
   - Correct: (960, 540), snap tolerance 10px.
   - Dropped elsewhere -> "The readout shows (x, y). The center is half of 1920
     across and half of 1080 down - keep dragging until both numbers say 'half'."
2. **Predict.** **(kernel)** "y grows downward. A marker at y: 100 - is it near the
   top of the frame or near the bottom?"
   - A) Near the top. **(correct)** - the marker appears there to confirm.
   - B) Near the bottom. -> "That's the math-class habit - graphs grow upward. Screens
     count DOWN from the top edge: y: 100 is 100 pixels below the top. Watch the
     marker." (The marker renders at y: 100, just under the top edge.)
   - C) Exactly in the middle. -> "The middle is y: 540 - half of 1080. y: 100 is
     barely a tenth of the way down: near the top."
3. **Fill (word bank).** "The top-left corner is (0, 0). The bottom-right corner is
   ( ____ , ____ )." Bank: *1920*, *1080*, *960*, *540*, *0*.
   - *0, 0* -> "That's the top-left - the corner we count FROM. The far corner is the
     full frame away: all of the width, all of the height."
   - *960, 540* -> "That's the center - halfway there. The corner is the whole 1920
     across and the whole 1080 down."
   - *1080, 1920* (swapped) -> "Swapped: x (across) comes first and the frame is
     wider than it is tall - 1920 across, 1080 down."
4. **Predict.** "Maria Kranz's strap sits at (120, 860). Alexandra Rivera's weather
   badge sits at (120, 200). Which one is closer to the top of the frame?"
   - A) The weather badge. **(correct)** - "Smaller y = higher up. Both share x: 120,
     so they sit in the same column."
   - B) The strap. -> "860 is the BIGGER y - and bigger y means further DOWN. The
     strap is near the bottom, where lower thirds live."
   - C) They're at the same height. -> "Same x, yes - but height is y's job, and
     200 and 860 are very different heights."
5. **Observe.** "The director wants a marker 40 pixels in from the RIGHT edge,
   vertically centered. Drag it there and read the x." Correct: (1880, 540),
   tolerance 10px.
   - Dropped near x: 40 -> "That's 40 from the LEFT edge. The right edge sits at
     x: 1920, so 40 in from it is 1920 - 40 = 1880. (Counting backwards from the
     right is clumsy - lesson 4.3 gives you a better way.)"
   - Dropped at 1880 but wrong y -> "x is right - now center it: half of 1080."

- **Success criteria:** at least 4/5, and the kernel (ex. 2, y grows downward) must
  be correct - if missed, a fresh variant is asked at the end ("y: 980 - top or
  bottom?").
- **Common wrong answers:** y pointing up (the math habit - ex. 2 and 4 both attack
  it; the line "y grows downward, like reading" repeats wherever offsets appear from
  now on); giving (y, x) order (ex. 3).
- **Duration:** 3-4 min.

---

## Lesson 4.2 - Pin it down

- **New concept:** `position: absolute` plus `top`/`left` pins an element to exact
  coordinates - the broadcast way to place things.
- **Learner-facing explanation:** "Three lines pin an element to the frame:
  `position: absolute;` says 'place me by numbers', then `top` and `left` ARE the
  numbers - counted from the top-left corner, exactly like the grid overlay reads
  them."
- **Context:** the branded strap from Checkpoint 3 is floating at the top of the
  document flow, wherever the browser drops it. Two numbers from the grid overlay -
  x: 120, y: 860 - nail it into the lower third of the frame.
- **Recycles:** rule anatomy (3.1), the id selector (3.3 - the wrapper's new
  `id="strap"`), the coordinate grid (4.1), silent CSS failure (3.2).

**Code slice:**
```html
<div id="strap">
  <div id="name" class="line">Maria Kranz</div>
  <div id="title" class="line">News Anchor</div>
</div>
```
```css
#strap {
  position: absolute;
  top: 860px;
  left: 120px;
}
```

**Exercises**

1. **Observe.** A switch toggles the `position: absolute;` line on and off; the strap
   jumps between the top of the flow and its pinned spot. Then: "With the switch OFF,
   `top: 860px; left: 120px;` are still written in the rule. What are they doing?"
   - A) Nothing - they are ignored until `position: absolute` switches on
     place-by-numbers. **(correct)**
   - B) Moving the strap a little. -> "Watch again: the strap sits exactly where the
     flow drops it. The numbers change nothing until `position: absolute` is on."
   - C) They're saved for later. -> "Not saved - actively ignored. The browser reads
     them and shrugs: this element isn't positioned by numbers."
2. **Fill (word bank).** The grid overlay's crosshairs sit on the strap's target
   corner, reading (120, 860). "Pin the strap there:
   `top: ____px; left: ____px;`" Bank: *860*, *120*, *540*, *1920*.
   - Swapped (*top: 120, left: 860*) -> render shows the strap high up and pushed
     right: "Swapped: `top` is the y number (down from the top), `left` is the x
     number (in from the left). Check the strap against the crosshair readout."
   - *540* -> "That's the center's y - the readout on the target says 860."
   - *1920* -> "1920 is the frame's full width - pin there and the strap starts at
     the right edge, off into nothing."
3. **Fix.** **(kernel)** The render shows the strap stuck at the top of the flow,
   ignoring its numbers. Code:
   ```css
   #strap {
     top: 860px;
     left: 120px;
   }
   ```
   "The coordinates are written, but the strap won't obey them. One line is missing -
   tap where it belongs, then pick it." Correct: add `position: absolute;` (bank:
   `position: absolute;` **(correct)**, `padding: 860px;`, `color: #0a3d91;`).
   - Tapping/blaming `top` or `left` -> "The numbers are right - they're just being
     ignored. Which line switches on place-by-numbers?"
   - `padding: 860px;` -> render preview: the panel balloons monstrously: "Padding
     grows space INSIDE the box (3.8) - it never pins anything."
   - `color: #0a3d91;` -> "That paints the text - position isn't about paint."
4. **Predict.** "We change `top: 860px` to `top: 200px`. Where does the strap go?"
   - A) Near the top of the frame. **(correct)** (Render confirms.)
   - B) Near the bottom. -> "y grows downward, like reading - a SMALLER `top` means
     higher up."
   - C) 200px to the left. -> "`top` moves along y only - up and down. Left-and-right
     is `left`'s job."
5. **Type (web; word-bank assembly on phone).** "Alexandra Rivera's weather strap,
   `id="weather"`, needs pinning at (120, 200). Write the whole rule."
   Accept:
   ```css
   #weather {
     position: absolute;
     top: 200px;
     left: 120px;
   }
   ```
   (Property order free; `.weather` or bare `weather` rejected with 3.3's formula:
   "hash = one of a kind - this id needs `#`.")
   - Missing `position: absolute;` -> render shows the weather strap ignoring its
     numbers, exactly like ex. 3: "Written numbers, no obedience - which line is
     missing?"
   - Swapped numbers -> visible misplacement plus the ex. 2 feedback.

- **Success criteria:** at least 4/5; the kernel (ex. 3, the position dependency)
  solved with at most one hint.
- **Common wrong answers:** offsets without `position: absolute` (ex. 1, 3, 5 - the
  headline misconception, made visible as a recognizable silent failure); top/left
  swapped (ex. 2).
- **Duration:** 5 min.

---

## Lesson 4.3 - The other corners

- **New concept:** `right` and `bottom` measure from the other edges - pin an element
  to the edge it belongs to.
- **Learner-facing explanation:** "`right: 40px` means 40 pixels in from the RIGHT
  edge; `bottom` counts up from the bottom. Pin to whichever edge the element belongs
  to - a corner bug belongs to the right edge, so count from it."
- **Context:** the NN bug takes its top-right home. First guess: `right: 40px;
  top: 40px` (lesson 4.5 will correct those numbers - on purpose).
- **Recycles:** 4.2 (position + offsets), the bug's job (0.1), img and the asset
  drawer (2.5), the clumsy 1920 - 40 arithmetic from 4.1 ex. 5 - now unnecessary.

**Code slice:**
```html
<img id="bug" src="nn-logo.png">
```
```css
#bug {
  position: absolute;
  top: 40px;
  right: 40px;
}
```

**Exercises**

1. **Predict.** "We increase `right: 40px` to `right: 200px`. Which way does the bug
   slide?"
   - A) Left - further in from the right edge. **(correct)** (Render confirms.)
   - B) Right, toward the edge. -> "That would need a SMALLER number - `right: 0`
     puts it at the edge itself. A bigger `right` pushes it further from that edge,
     toward the middle."
   - C) Down. -> "`right` moves along x only. Up-and-down belongs to `top` and
     `bottom`."
2. **Fill (word bank).** "Pin the bug 40 in from the right edge and 40 down from the
   top: `____: 40px; ____: 40px;`" Bank: *top*, *right*, *left*, *bottom*.
   - *left* -> render shows the bug jumping to the top-LEFT corner: "`left: 40px`
     counts from the left edge - the bug crossed the whole frame. The right edge
     needs `right`."
   - *bottom* -> render shows the bug at the bottom: "`bottom` counts up from the
     bottom edge - the bug sank. 40 down from the TOP is `top`'s job."
3. **Fix.** **(kernel)** Code:
   ```css
   #bug {
     position: absolute;
     top: 40px;
     left: 1780px;
   }
   ```
   "The regular logo is 100px wide, so `left: 1780px` happened to leave 40px of
   clearance. Tonight is special: the bug swaps to the wider `nn-election-logo.png`
   (260px) - and the render shows it bleeding off the right edge. Fix the rule so ANY
   logo keeps 40px of clearance from the right edge." Correct: replace
   `left: 1780px;` with `right: 40px;` (bank: `right: 40px;` **(correct)**,
   `left: 1620px;`, `top: 40px;`).
   - `left: 1620px;` -> render fixes for the wide logo: "Works for THIS logo - and
     you'll be back here the next time the file changes. Count from the edge the bug
     belongs to, and the clearance survives any logo: `right: 40px`."
   - `top: 40px;` -> "The top clearance is fine - the bleed is along x, the left/right
     axis."
4. **Predict.** "A colleague writes BOTH `left: 120px` and `right: 40px` on the strap,
   'to be safe'. What happens?"
   - A) The strap is forced to stretch between both anchors - it smears across almost
     the whole frame. **(correct)** (Render shows the smeared strap.)
   - B) The browser picks one and ignores the other. -> "It obeys BOTH - and the only
     way to obey two anchors is to stretch between them. See the smear."
   - C) Nothing - more instructions is safer. -> "Watch the render: the strap now
     spans from x: 120 to 40-from-the-right. Pick the ONE edge the element belongs to
     and pin only that."
5. **Fill (word bank).** "The sports ticker runs along the very bottom of the frame:
   `#ticker { position: absolute; ____: 0px; }`" Bank: *bottom* **(correct)**, *top*,
   *right*.
   - *top* -> render shows the ticker running across the sky: "`top: 0` pins to the
     TOP edge. The bottom edge needs `bottom`."
   - *right* -> "`right` slides it along x - it can't put the ticker at the bottom.
     Which edge does a ticker belong to?"

- **Success criteria:** at least 4/5; the kernel (ex. 3, pin-the-near-edge) solved
  with at most one hint.
- **Common wrong answers:** bigger-`right`-means-further-right (ex. 1); mixing `left`
  and `right` on one element "to be safe" (ex. 4 - the smear makes it visible, and
  4.6 will show the one legitimate use of stretching).
- **Duration:** 4-5 min.

---

## Lesson 4.4 - Space between

- **New concept:** `margin` - space OUTSIDE a box, pushing neighbors away
  (`margin: 10px` on all four sides, `margin-top: 10px` on one).
- **Learner-facing explanation:** "Padding is space inside a box - between its edge
  and its content. Margin is space outside - it pushes the neighbors away. A gap
  between two lines is margin's job."
- **Context:** the strap's name line and gold title bar are touching - cramped, not
  broadcast-clean. Margin opens the gap. Padding (3.8) is settled, so the classic
  confusion pair is tackled head-on.
- **Recycles:** padding (3.8), nesting (2.1 - margins act between siblings inside the
  strap), the id selector (3.3), brand colors (3.5 - the gold bar is `#e8b90c`).

**Code slice:**
```css
#strap {
  background-color: #0a3d91;
  padding: 20px;
}
#title {
  background-color: #e8b90c;
  margin-top: 10px;
}
```

**Exercises**

1. **Observe.** Twin sliders: the panel's `padding` and the title bar's `margin-top`,
   with color-coded zones on the render (padding tinted inside the blue panel's edge,
   margin striped between the two lines). After playing: "Drag each label onto its
   zone: *padding* / *margin*."
   - Swapped -> "The tinted band inside the panel's edge is padding - inside space.
     The striped band between the lines is margin - outside space, pushing the title
     bar away from the name."
2. **Predict.** **(kernel)** "We want a bigger gap between the name line and the gold
   title bar - padding or margin?"
   - A) Margin. **(correct)** - "Space BETWEEN boxes is margin - it pushes the
     neighbor away."
   - B) Padding. -> render preview: the gold bar grows taller, its text floating in
     extra gold, and the gap barely changes: "Padding grew the title's own box - see
     the gold swell? The space between boxes is margin."
3. **Fix.** Render: the gold title bar is tall and the text sits low inside it.
   Code:
   ```css
   #title {
     background-color: #e8b90c;
     padding-top: 30px;
   }
   ```
   "The designer wanted a gap ABOVE the bar, but the bar grew instead. Tap the
   property to change, then pick its replacement." Correct: tap `padding-top`,
   replace with `margin-top` (bank: *margin-top* **(correct)**, *top*, *font-size*).
   - Tapping `background-color` -> "The gold is the design - the problem is where the
     extra 30px went: INSIDE the bar."
   - *top* -> "`top` pins by coordinates and needs `position: absolute` (4.2) - it
     would teleport the bar, not open a gap above it."
   - *font-size* -> "That changes the letters, not the space around the bar."
4. **Predict.** "What does `margin: 10px` (no side named) do to the title bar?"
   - A) Pushes its neighbors away on all four sides. **(correct)**
   - B) Only above it. -> "One side needs a name: `margin-top`. The bare `margin`
     works all the way around - same pattern as padding."
   - C) Adds space inside the bar. -> "Inside space is padding. Margin always works
     OUTSIDE the box's edge."
5. **Fill (word bank).** "Open a 12px gap above the title bar:
   `#title { ______: 12px; }`" Bank: *margin-top* **(correct)**, *padding-top*,
   *top*.
   - *padding-top* -> render: the gold bar grows again: "The bar swelled instead of
     moving - padding is inside space. Outside space: margin."
   - *top* -> "Coordinates again - and without `position: absolute` it's silently
     ignored (4.2). The gap between siblings is margin's job."

- **Success criteria:** at least 4/5, and the kernel (ex. 2, padding-vs-margin) must
  be correct - if missed, a mirror variant is asked at the end ("a gap between two
  ticker headlines - padding or margin?").
- **Common wrong answers:** padding-for-margin (ex. 2, 3, 5 - every one made visible
  as the swelling gold bar); reaching for `top` to make gaps (ex. 3, 5).
- **Duration:** 4-5 min.

---

## Lesson 4.5 - Safe areas

- **New concept:** title-safe margins - nothing important lives at the very edge of
  the frame; broadcast convention gives standard homes to the lower third and the
  bug.
- **Learner-facing explanation:** "Some TVs and stream players crop the edge of the
  picture. Everything important stays inside the title-safe area - the inner
  rectangle 96px in from the sides and 54px from the top and bottom. The strap and
  the bug have standard homes just inside it."
- **Context:** the safe-area overlay joins the grid overlay (togglable, permanent
  from here on). An archive clip shows a graphic clipped by an old TV's overscan -
  the *why*, in one image. The bug's 4.3 numbers (40, 40) get corrected to the safe
  corner; the ticker's home moves up to `bottom: 54px`.
- **Recycles:** 4.2/4.3 offsets (safe positions are just specific numbers), the
  graphic-type vocabulary (0.1), the grid overlay readout (4.1).

**Exercises**

1. **Observe.** "Turn on the safe-area overlay. Tap the zone where lower thirds
   live." Correct: the lower band just inside the title-safe rectangle.
   - Tapping the strip below the safe line -> "That sliver can be cropped off on some
     screens - the strap's home is INSIDE the line."
   - Tapping the center -> "Center stage is for full-screens and big moments. The
     lower third's own name says where it lives (0.1): the lower band, inside the
     line."
2. **Predict.** **(kernel)** "A headline is placed at `left: 8px`. What's the risk?"
   - A) On some TVs and players its first letters are cut off. **(correct)** ->
     follow-up render: the same frame on a simulated old TV, first letters gone.
   - B) Nothing - it's on the canvas, so viewers see it. -> "On YOUR preview, yes.
     But the edge of the canvas is NOT the edge of what every viewer sees - watch
     the old-TV view eat the first letters."
   - C) The graphic loads slower. -> "Position never affects speed - the risk is
     cropping."
3. **Fix (drag).** The bug sits at its 4.3 guess, `right: 40px; top: 40px` - the
   safe-area overlay shows its corner poking outside the title-safe line. "Drag the
   bug into the safe corner. The grid overlay's crosshairs read its distance from the
   right and top edges." Correct: snaps at `right: 96px; top: 54px` (tolerance 6px);
   the code updates live.
   - Dropped safely inside but far from the corner -> "Safe, yes - but a bug lives in
     the corner pocket: right up against the title-safe lines, 96 from the side, 54
     from the top."
   - Dropped still outside -> "Check the overlay: part of the logo is still beyond
     the line. Keep reading the crosshairs."
4. **Fill (word bank).** "NN's house card: the bug sits at `right: ____px;
   top: ____px;`, and nothing important goes closer to the SIDE edges than ____px."
   Bank: *96*, *54*, *40*, *120*.
   - *40* -> "40 was our first guess last lesson - the overlay showed it outside the
     line. Title-safe is 96 from the sides, 54 top and bottom."
   - *120* -> "120 is the strap's comfortable left offset - fine, but the REQUIRED
     minimum at the sides is title-safe's 96."
   - *54* in the sides blank / *96* in the top blank -> "Swapped: the frame is wider
     than tall, and so is the safe border - 96 on the sides, 54 top and bottom."
5. **Predict.** The frame renders on a simulated old TV (edges cropped). Three
   graphics: the strap at `left: 120px; top: 860px`, a score bug at `right: 10px;
   top: 20px`, the ticker with its text padded in past the safe line. "One of these
   loses content in the crop. Tap it."
   - Correct: the score bug. -> "10 and 20 are deep inside the crop zone - HIFK's
     score is gone. Safe corner: 96 and 54."
   - Tapping the strap or ticker -> "That one keeps everything inside the title-safe
     line - it survives the crop. Look for the graphic hugging the frame edge."

- **Success criteria:** at least 4/5, and the kernel (ex. 2, canvas edge is not the
  viewer's edge) must be correct - if missed, a variant is asked at the end (a bug at
  `top: 6px`).
- **Common wrong answers:** "the edge of the canvas is the edge of what viewers see"
  (ex. 2, 5 - both answered with the old-TV render, not just words); treating the
  overlay lines as decoration rather than a hard boundary (ex. 3).
- **Duration:** 4-5 min.

---

## Lesson 4.6 - Who's on top

- **New concept:** when boxes overlap, the one later in the code paints on top;
  `z-index` names the stacking order explicitly (recognize level - read it, tweak a
  number, don't design with it yet).
- **Learner-facing explanation:** "When two boxes overlap, the one written LATER in
  the code paints on top - like coats of paint. `z-index` is a number that overrides
  that order: the bigger number wins. For now you only need to read it."
- **Context:** the Election Night full-screen panel plays in - and swallows the NN
  bug. Stacking explains it and fixes it. (The panel is pinned to all four edges -
  the deliberate, legitimate version of 4.3's accidental smear.)
- **Recycles:** code order (2.1 ex. 3 - "children join the stack in code order"), the
  full-screen type (0.1), brand hex (3.5), opposite-edge stretching (4.3 ex. 4).

**Code slice:**
```html
<img id="bug" src="nn-logo.png">
<div id="panel">ELECTION NIGHT</div>
```
```css
#panel {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #0a3d91;
}
```

**Exercises**

1. **Observe.** With the slice above, the panel covers the bug. "Drag the bug's line
   BELOW the panel's line in the code." The bug pops on top. Then: "What decided who
   was on top?"
   - A) The order in the code - later paints on top. **(correct)**
   - B) Which element is bigger. -> "Size never decides - the tiny bug just beat the
     full-screen panel, purely by moving down the code."
   - C) Which element is higher on the screen. -> "Position on SCREEN doesn't decide
     stacking - position in CODE does. Nothing moved on screen; only a line moved in
     the file."
2. **Predict.** **(kernel)** "In the code: `#panel` is written first, `#bug` second.
   On screen the panel fills the frame and the bug is a small logo up in the corner.
   Where they overlap, who paints on top?"
   - A) The bug - it comes later in the code. **(correct)**
   - B) The panel - it's bigger and covers everything. -> "Size and screen position
     never decide stacking. Only code order (and `z-index`) do - later wins, so the
     little bug sits on the big panel."
   - C) Whichever is higher up on screen. -> "The screen is the RESULT of stacking,
     not the cause. Read the code order."
3. **Fix.** Render: the bug is hidden behind the panel - yet the bug is written
   after it. Code:
   ```html
   <div id="panel">ELECTION NIGHT</div>
   <img id="bug" src="nn-logo.png">
   ```
   ```css
   #panel { z-index: 10; }
   #bug { z-index: 5; }
   ```
   "Code order says the bug should win, but it's hidden. Something is overriding the
   order - tap the line responsible, then fix it." Correct: tap `z-index: 5;` (a tap
   on `z-index: 10;` is accepted with: "That's the winner's number - now find the
   loser's"), then set the bug's z-index from the bank: *20* **(correct)**, *5*, *0*.
   - Tapping the HTML lines -> "The order is fine - the override lives in the style
     rules. Which property names the stacking order outright?"
   - *0* -> render: still hidden: "Still smaller than the panel's 10 - the BIGGER
     number wins."
   - *5* -> render: unchanged: "5 is what it already was. Beat the panel's 10."
4. **Predict.** "Two graphics never overlap on screen. Does their code order change
   anything you can see?"
   - A) No - paint order only shows where paint overlaps. **(correct)**
   - B) Yes, the later one looks stronger. -> "Stacking isn't strength - with no
     overlap, there's nothing to win. Both render exactly the same either way."
   - C) Yes, the later one renders bigger. -> "Order never changes size or position -
     only who covers whom, and only where they overlap."
5. **Predict.** "The ticker is written LAST in the body. During the strap's out
   animation it slides down and crosses the ticker. Who's on top during the
   crossing?"
   - A) The ticker. **(correct)** - "Written last, paints last - even mid-animation."
   - B) The strap, because it's moving. -> "Motion doesn't change stacking - code
     order (and z-index) still decide, every frame."
   - C) The strap, because it started higher on screen. -> "Screen position again -
     it never decides. Read the code."

- **Success criteria:** at least 4/5, and the kernel (ex. 2, code order beats screen
  position/size) must be correct - if missed, a variant is asked at the end (weather
  badge vs score strap overlap).
- **Common wrong answers:** expecting position or size ON SCREEN to decide stacking
  rather than position IN CODE (ex. 1, 2, 5 - three angles on the same
  misconception); "smaller z-index wins" (ex. 3).
- **Duration:** 4-5 min.

---

## Lesson 4.7 - See-through

- **New concept:** `opacity` from 1 to 0 fades a whole element; at 0 it is invisible
  but still there.
- **Learner-facing explanation:** "`opacity` fades a whole element: 1 is solid, 0 is
  invisible - but still there, holding its place. NN's strap panel runs at 0.85 so
  the picture breathes through it."
- **Context:** NN's design language wants a slightly translucent panel. An opacity
  slider explores the range over live HIFK-TPS match footage - the busiest video the
  course has. Closing beat, planted verbatim for Unit 5: "invisible but still there
  is exactly how entrances begin."
- **Recycles:** keying / the empty stage (1.3), brand hex (3.5 - a translucent panel
  over video shifts the perceived brand color), the id selector (3.3).

**Exercises**

1. **Observe.** The slider runs the strap panel from 1 down to 0 over the match
   footage. "Play with it, then answer: which range keeps the strap readable over
   the busy crowd?"
   - A) Around 0.8-0.9. **(correct)** - "NN's house value is 0.85: the picture
     breathes, the words hold."
   - B) Around 0.3-0.4. -> render at 0.35: "See the crowd through the letters? Below
     about 0.7 a busy feed eats the text. Too thin for air."
   - C) Exactly 1.0 only. -> "Readable, sure - but a solid slab feels heavy over
     video. NN trades a little solidity for air. Taste, not law."
2. **Predict.** **(kernel)** "Two see-through effects in this frame: (A) the area
   AROUND the strap, where the match shows because nothing is painted there; (B) the
   strap panel itself, where the match glows through the blue. Which one is
   `opacity`?"
   - A) The area around the strap. -> "That's keying - the empty stage from 1.3:
     nothing is drawn there at all, so there's nothing to fade. `opacity` fades
     something you DID draw."
   - B) The panel. **(correct)** - "Painted, then faded to 0.85. Keying is
     no-paint; opacity is faded paint."
   - C) Both. -> "They look cousins but work differently: around the strap there is
     NO element; the panel is an element at 85% strength. Only the panel involves
     `opacity`."
3. **Predict.** "`opacity: 0` versus deleting the element - what's the difference on
   screen, and which one can come back?"
   - A) They look identical; the opacity-0 element is still there and can fade back
     in. **(correct)** -> "Invisible but still there is exactly how entrances begin -
     Unit 5 starts from this."
   - B) opacity: 0 leaves a grey ghost box. -> render at 0: nothing: "No ghost - 0 is
     fully invisible. The element is still in the file, just at zero strength."
   - C) They're the same in every way. -> "On screen tonight, yes. But the deleted
     one is GONE; the opacity-0 one is waiting for its cue."
4. **Fill (word bank).** "Set the NN house panel:
   `#strap { opacity: ____; }`" Bank: *0.85* **(correct)**, *85*, *0.085*, *1*.
   - *85* -> "opacity runs from 0 to 1 - 85 is off the scale, and the machine clamps
     it to solid 1. The house value is 0.85."
   - *0.085* -> render: the panel all but vanishes: "One zero too many - that's under
     a tenth of full strength."
   - *1* -> "Fully solid - that's the default, not the NN look. The card says 0.85."
5. **Predict.** "The panel is `#0a3d91` at `opacity: 0.85` over bright match footage.
   Does the blue on air look exactly like the brand card?"
   - A) No - the video mixes through and shifts the perceived color. **(correct)** ->
     "That's why designers check brand color at final opacity over REAL footage, not
     on a grey test screen."
   - B) Yes - hex is hex. -> "Slide it yourself: at 0.85, the crowd's colors leak
     into the blue. The hex is exact; what viewers SEE is the mix."

- **Success criteria:** at least 4/5, and the kernel (ex. 2, opacity vs keying) must
  be correct - if missed, a variant is asked at the end (the bug's transparent PNG
  background vs a faded panel: which is which?).
- **Common wrong answers:** opacity confused with background transparency/keying
  (ex. 2 - the lesson's reason for existing); a 0-100 scale (ex. 4).
- **Duration:** 4-5 min.

---

## Lesson 4.8 - Review remix - over video (no new concept)

- **Purpose:** spaced retrieval across Units 1-4 before the checkpoint, with
  everything exercised over MOVING footage for the first time - placement skills must
  survive a busy, changing background. Adaptive: the app draws 6 exercises weighted
  toward the student's weakest recorded skills, with the fixed anchors below always
  included. (No kernel - review lessons introduce no new skill.)
- **Learner-facing framing:** "Nothing new - a full lap of the canvas, over live
  pictures this time. This is the frame you'll dress in the checkpoint."
- **Fixed pool (each tagged with its source lesson):**
  1. **Observe** (4.5): over a moving news clip with the safe-area overlay OFF, three
     graphics render: the strap at `left: 120px; top: 860px`, James Okafor's
     name badge at `top: 20px; left: 30px`, the bug at `right: 96px; top: 54px`.
     "One of these breaks title-safe. Tap it, then turn on the safe-area overlay to
     check." Correct: the badge. Tapping a safe graphic -> "Check it against the
     overlay - that one sits inside the lines."
  2. **Fix** (4.3): the bug pinned with `left: 1900px` - the render shows the logo
     almost entirely off-frame over the moving clip. Correct fix: replace with
     `right: 96px;` (bank: `right: 96px;` **(correct)**, `left: 1820px;` -> "Back
     on-frame, but hugging the crop zone and broken again by the next wider logo -
     pin the near edge at the safe distance", `top: 96px;` -> "The bleed is along x").
  3. **Predict** (4.6): "The Election Night panel is written AFTER the bug, no
     z-index anywhere. The panel plays in. Can you still see the bug?" Correct: no -
     later in code paints on top. Wrong -> "Nothing about the bug's screen position
     protects it - code order decides."
  4. **Arrange** (4.2): rebuild the strap's position rule from blocks:
     `#strap` / `{` / `position: absolute;` / `top: 860px;` / `left: 120px;` / `}` -
     plus one distractor block `padding: 860px;` that must be rejected.
  5. **Predict** (4.4): "The gap between two ticker headlines is too small - padding
     or margin?" Correct: margin. Wrong -> the swelling-box render from 4.4.
  6. **Predict** (4.7 + 1.3): the strap at `opacity: 0.85` over the match clip:
     "The crowd shows faintly THROUGH the blue panel, and fully AROUND the strap.
     Which effect is opacity and which is keying?" Two-tap match.
- **Closing beat:** the full NN frame assembles piece by piece as the pool completes -
  strap, bug, ticker scenery, all placed, over the live clip - and holds as a preview
  of Checkpoint 4: "Next: you dress this frame yourself."
- **Success criteria:** at least 5/6. Any miss appends one more exercise from the same
  source lesson's pool (capped at 8 total).
- **Duration:** 4-5 min.

---

## Checkpoint 4 - "Dress the frame"

- **Type:** Build (web: write the rules; phone: guided assembly plus
  drag-with-crosshairs - dragging an element writes its offsets into the code live).
- **Scenario:** a broadcast reference layout arrives as a translucent overlay on the
  canvas ("match this frame"): the NN bug top-right in the safe corner, the branded
  strap in the standard lower-third position with its panel at house opacity, the
  ticker along the bottom (given), everything title-safe, over a live news clip.
- **Given code (structure and branding complete from Checkpoints 2-3; position rules
  empty):**
  ```html
  <img id="bug" src="nn-logo.png">
  <div id="strap">
    <div id="name" class="line">Maria Kranz</div>
    <div id="title" class="line">News Anchor</div>
  </div>
  ```
  ```css
  /* Checkpoint 3 styling given, folded: panel #0a3d91, .line font,
     name/title sizes and weights, panel padding, #title gold bar */

  #bug {

  }
  #strap {

  }
  #title {

  }
  ```
  The ticker is given, already pinned at `bottom: 54px`, as scenery.
- **Tasks:** (1) pin the bug in the safe corner, counting from the right edge
  (`position: absolute; right: 96px; top: 54px;`); (2) pin the strap at the standard
  lower-third home (`position: absolute; top: 860px; left: 120px;`); (3) open the
  house 10px gap above the gold title bar (`margin-top: 10px;` on `#title`); (4) set
  the panel to house opacity (`opacity: 0.85;` on `#strap`); (5) toggle the safe-area
  overlay and confirm nothing important crosses the lines; (6) press PLAY and check
  the frame against the reference over the moving clip.
- **Pass criteria:** each element's computed position within 6px of the reference;
  nothing outside title-safe; the strap panel's computed opacity 0.85; the gap made
  with margin (a padding-faked gap fails the pixel match because the gold bar grows);
  both elements actually pinned (`position: absolute` present - without it the
  offsets are silently ignored and the pixel check fails loudly). A bug pinned with
  `left: 1724px` passes the pixel check but triggers a coaching note, not a fail:
  "Matches tonight - but swap in a wider special-event logo and it bleeds. Pros pin
  the near edge: `right: 96px`."
- **Failure handling (diagnosis names the element and the axis, then maps to the
  source lesson):**
  - element ignores its numbers (missing `position: absolute`) -> "Your bug's
    coordinates are written but ignored - which line switches on place-by-numbers?
    (See: Pin it down.)" -> micro-review 4.2.
  - wrong position -> "Your bug is 12px too close to the frame edge - which offset
    controls that?" -> micro-review 4.2/4.3 (whichever axis/edge is off).
  - anything outside title-safe -> the old-TV cropped render: "This is what some
    viewers get. (See: Safe areas.)" -> micro-review 4.5.
  - bug hidden behind another element -> "It's there - something paints over it.
    What decides who's on top? (See: Who's on top.)" -> micro-review 4.6.
  - gap faked with padding -> the swollen gold bar render -> micro-review 4.4.
  - opacity wrong (off-scale value or solid panel) -> "The reference panel breathes;
    yours is solid. (See: See-through.)" -> micro-review 4.7.
  - After the linked micro-review, the checkpoint re-runs with fresh variants (new
    presenter from the roster, new reference numbers within the safe conventions).
- **Duration:** 6-7 min.

**Unit 4 total learner time:** ~38-46 min across 9 sessions.
