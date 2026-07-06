# Unit 6 - Moving with GSAP (full lesson plans)

**Unit goal:** read, tweak, and write simple GSAP tweens and timelines - and meet
JavaScript gently, as *calls* only. (Why GSAP after CSS motion: pro SPX templates
overwhelmingly animate with GSAP, and its call-with-settings shape is the friendliest
possible first JavaScript.)
**Promise:** after this unit you can read and adjust the GSAP animation in any
template you're handed.
**Prerequisites:** Units 0-5. GSAP itself is boilerplate ("the channel's animation
toolkit is already loaded - trust it").

## Conventions this unit

- As in unit-01.md, plus: every exercise screen adds the **console strip** - a thin
  panel under the render holding one or more prepared lines of JavaScript and a RUN
  button. Tap RUN and the line executes against the live render. Editable parts of a
  line are highlighted; everything else is read-only. This is an app feature the
  student meets in 6.1 and uses in every lesson after.
- The 2.6 seal on the body's `<script>` ("the moves and the data") half-opens here:
  *the moves* are now the student's; *the data* stays sealed until Unit 7. The line
  that loads GSAP sits in the head and carries its own seal: "the channel's animation
  toolkit - already loaded, trust it."
- When a broken call runs, the app shows a **friendly error overlay** (plain-language
  message, the offending spot highlighted). First planted deliberately in 6.2.
- **GSAP property canon for the course:** targets are id selector strings like
  `"#strap"`; `x`/`y` in pixels; `scale` as a multiple (0 = nothing, 1 = normal);
  `opacity` 0-1; `duration` and `delay` in seconds, no units written; `ease` as a
  quoted name - `"power2.out"` for entrances, `"power2.in"` for exits, `"none"` for
  deliberately robotic constant speed.
- Running graphic: the Nightly News strap and NN bug, both fully styled and positioned
  by the Unit 3-4 CSS (which this unit never edits - "CSS owns the resting look").
  Structure, shown once in 6.1 and stable all unit:

```html
<div id="strap">
  <img src="nn-logo.png">
  <div id="panel">
    <div id="name" class="line">Maria Kranz</div>
    <div id="title" class="line">News Anchor</div>
  </div>
</div>
<img id="bug" src="nn-logo.png">
```

---

## Lesson 6.1 - Asking a tool to move things

- **New concept:** calling a function - `gsap.to("#strap", { x: 0 })` is an
  *instruction*: a tool's name, then its inputs in parentheses; when the line runs,
  the tool does the work.
- **Learner-facing explanation:** "Until now your code has *described* things: HTML
  says what's there, CSS says how it looks. JavaScript gives *instructions*.
  `gsap.to("#strap", { x: 0 })` is a call: the tool's name (`gsap.to`), then its
  inputs in parentheses - who to move, and the settings for the move. Nothing happens
  until the line runs. GSAP is the channel's animation toolkit, already loaded -
  trust it."
- **Context:** the console strip appears for the first time, under the on-air strap.
  This is the moment 0.3's "JS says what it does" becomes hands-on: tap RUN, watch the
  strap obey. The settings braces are introduced as one sealed input for now ("the
  settings for the move - we open that box next lesson").
- **Recycles:** id selectors (3.3 - GSAP targets are the same `#name` strings), the
  three-jobs model (0.3), the body `<script>` room from the skeleton (2.6).

**Console strip (used by ex. 1-3):**
```js
gsap.to("#strap", { x: 200 })
gsap.to("#bug", { scale: 0 })
gsap.to("#strap", { x: 0 })
```

**Exercises**

1. **Observe (interactive).** "Run all three lines, one at a time, and watch what each
   one does." (Strap slides right; bug shrinks away; strap comes home.) Then: "Tap the
   part of the first call that named *which element* moves."
   - Correct: `"#strap"` (the strap outlines on the render).
   - Tapping `gsap.to` -> "That's the tool's name - the same tool ran all three moves.
     The *who* is the first input, inside the parentheses."
   - Tapping `{ x: 200 }` -> "Those are the settings for the move - the *what*. The
     *who* comes just before them: the target."
2. **Predict.** "`gsap.to("#bug", { scale: 1 })` is about to run. Which element is
   about to change?"
   - A) The NN bug. **(correct)**
   - B) The strap. -> "Read the target: `#bug`. GSAP finds elements exactly the way
     Unit 3's selectors did - by id."
   - C) Every element. -> "A call moves only what its target names. One call, one
     target - here, the bug."
3. **Predict (kernel).** The line `gsap.to("#strap", { x: 200 })` sits in the console
   strip. RUN has not been pressed. "What is the strap doing right now?"
   - A) Nothing - a call is an instruction, and instructions happen only when they
     run. **(correct)**
   - B) It has already moved 200 pixels right. -> "The line existing changes nothing.
     CSS *is*; JavaScript *does* - and it does it when the line runs. Press RUN and
     watch the difference between written and executed."
   - C) It is drifting right slowly on its own. -> "There's no halfway state. Before
     RUN: nothing. After RUN: the move. The call is an action, not a description."
4. **Fill (word bank).** "Bring the whole strap home: `gsap.to("____", { x: 0 })`"
   Bank: `#strap` **(correct)**, `strap`, `#name`.
   - `strap` -> "Without the `#`, the tool goes looking for a *tag* called strap and
     finds nothing. The `#` means 'find the id' - the same hash you wrote in Unit 3's
     `#name` rules."
   - `#name` -> "That id belongs to one line inside the strap. The task says the
     *whole* strap - target the wrapper that owns it all."
5. **Arrange.** Blocks: `gsap.to` / `(` / `"#bug"` / `,` / `{ scale: 0 }` / `)` -
   "Build the call that shrinks the bug away."
   - Settings placed before the target -> "GSAP always hears *who* first, *what*
     second: target, comma, settings."
   - Parentheses misplaced -> "The parentheses are the call's hands - they hold *all*
     the inputs. Name first, then everything else inside them."

- **Success criteria:** at least 4/5; ex. 3 (the kernel) must be correct - if missed,
  a fresh variant (same question on the bug's call) is asked at the end.
- **Common wrong answers:** dropping the `#` from the target (ex. 4 - the feedback
  ties it straight back to 3.3); treating the written line as already-in-effect
  (ex. 3 - the misconception this lesson exists to kill).
- **Duration:** 4 min.

---

## Lesson 6.2 - The settings object

- **New concept:** the `{ x: 0, opacity: 1 }` braces are a settings list -
  property: value pairs, separated by commas - and `x`, `y`, `scale`, `opacity` are
  the same knobs the student turned in CSS, wearing shorter names.
- **Learner-facing explanation:** "The second input is a settings list: braces around
  property-and-value pairs, a colon inside each pair, a comma between pairs. The
  properties are old friends with short names: `x` and `y` are Unit 5's translate,
  `scale` is scale, `opacity` is opacity. Careful: these braces are not a CSS rule -
  a rule *is*, a call *does*."
- **Context:** a side-by-side **translation card** stays on screen all lesson:
  `transform: translateX(-500px)` <-> `x: -500` / `transform: translateY(40px)` <->
  `y: 40` / `transform: scale(0)` <-> `scale: 0` / `opacity: 0` <-> `opacity: 0`
  ("some keep their names"). The strap's Unit 5 entrance values reappear one by one
  in GSAP spelling.
- **Recycles:** translate (5.1), scale (5.2), opacity (4.7), the CSS rule shape (3.1 -
  now explicitly contrasted).

**Exercises**

1. **Observe (edit and rerun).** Console strip: `gsap.to("#strap", { x: 300 })`. "Run
   it. Now edit the 300 to 0 and run again." (Strap slides out right, then home.)
   Then: "What did the number 300 mean?"
   - A) 300 pixels to the right of the strap's home spot. **(correct)**
   - B) 300 seconds. -> "Nothing about time is in this call yet - time arrives next
     lesson. `x` speaks pixels, exactly like translateX."
   - C) 300% size. -> "Size is `scale`'s job. `x` is sideways travel in pixels -
     Unit 5's translateX in a two-letter coat."
2. **Predict.** "`gsap.to("#strap", { x: -500, opacity: 0 })` runs. Where does the
   strap end up, and can we see it?"
   - A) 500 pixels left of home - and invisible. **(correct)** - "You've met this
     position before: it's the entrance's starting point from 5.1, now written in
     GSAP."
   - B) At home, visible. -> "Read the pairs: `x: -500` sends it left (minus =
     left, same as translate), `opacity: 0` fades it out. Both happen."
   - C) 500 pixels right and see-through. -> "Minus goes *left*. Positive x goes
     right - same compass as translateX(-500px) in Unit 5."
3. **Fill (word bank).** "The bug pops to full size:
   `gsap.to("#bug", { scale: ___ })`" Bank: `1` **(correct)**, `0`, `100`.
   - `0` -> "Scale 0 is *nothing* - that's the ready-to-enter size from 5.2. Full
     size is 1."
   - `100` -> "Scale speaks in multiples, not percent: 1 = normal, 2 = double. 100
     would fill the sky."
4. **Fill (word bank).** "Slide the strap 40 pixels *down*:
   `gsap.to("#strap", { ___: 40 })`" Bank: `y` **(correct)**, `x`, `scale`.
   - `x` -> "x is sideways. Down is the y direction - positive y goes down, exactly
     like the 1920x1080 grid from Unit 4."
   - `scale` -> "Scale changes size, not place. Travel is x and y's job."
5. **Fix (the first loud error).** Console strip:
   ```js
   gsap.to("#strap", { x: 0 opacity: 1 })
   ```
   "Run it." The friendly error overlay appears: *"GSAP couldn't read the settings
   list - something is missing between two pairs."* "Tap the spot where the list
   broke." Correct: between `0` and `opacity`; the offered fix is a comma.
   - Tapping the braces -> "The braces are fine - they hold the list. The break is
     *inside* the list: every pair needs a comma before the next one."
   - Tapping a colon -> "Colons glue a property to its value - both of these are
     correct. What separates one *pair* from the next?"
   - After fixing: "That red overlay is a *loud* failure - it tells you where to
     look. Remember Unit 3's silent ones? Loud errors are the friendly kind."
6. **Predict (kernel).** Side by side:
   ```css
   #strap { opacity: 1; }
   ```
   ```js
   gsap.to("#strap", { opacity: 1 })
   ```
   "Both use braces, both say opacity: 1. What's the real difference?"
   - A) The CSS rule states the strap's resting look; the call is an *action* that
     animates the strap there when it runs. **(correct)**
   - B) Nothing - they're interchangeable. -> "They look like twins but live in
     different rooms and speak different verbs: the rule sits in `<style>` and *is*;
     the call sits in `<script>` and *does* - the moment it runs."
   - C) The JS one is wrong because pairs need semicolons. -> "CSS separates with
     semicolons; a JS settings list separates with commas. Same idea, different
     grammar - you just fixed exactly that comma."

- **Success criteria:** at least 5/6; ex. 6 (the kernel) must be correct - if missed,
  a fresh variant (the same contrast on `#bug` and scale) is asked at the end.
- **Common wrong answers:** braces-in-JS read as a CSS rule (ex. 6 - the translation
  card exists to head this off); scale given as a percent (ex. 3); minus-x direction
  flipped (ex. 2C).
- **Duration:** 4-5 min.

---

## Lesson 6.3 - How long, and how

- **New concept:** `duration` and `ease` ride in the same settings object -
  `"power2.out"` is Unit 5's ease-out taste and `"power2.in"` its ease-in, spelled
  the GSAP way; `"none"` is the robot.
- **Learner-facing explanation:** "Two more settings ride in the same braces:
  `duration` - how many seconds the move takes - and `ease` - the speed *shape*.
  `"power2.out"` lands gently: entrances. `"power2.in"` accelerates away: exits.
  `"none"` is constant speed: robotic. Warning about the names: `.out` and `.in`
  describe the *curve*, not whether the graphic is coming or going. An entrance
  eases OUT. An exit eases IN. Same taste you learned in Unit 5 - new spelling."
- **Context:** the motion spec from Checkpoint 5 ("In: 0.5s, decelerating...")
  reappears as a real design-department card and gets translated line by line into
  one call: `gsap.to("#strap", { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })`.
  The strap starts each replay in its Unit 5 off state.
- **Recycles:** easing taste wholesale (5.4/5.5 - entrances decelerate, exits
  accelerate and run faster), the settings list (6.2), duration values from
  Checkpoint 5.

**Exercises**

1. **Observe (swap and replay).** Console strip:
   ```js
   gsap.to("#strap", { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
   ```
   The ease value is a chip the student swaps between `"power2.out"`,
   `"power2.in"`, `"none"`, replaying each. "Tap the one that looks
   broadcast-quality for an entrance."
   - Correct: `"power2.out"` - "Fast start, gentle landing - the 5.4 arrival, by its
     GSAP name."
   - `"none"` -> "Constant speed - the robot from 5.4. (It's not always wrong: the
     ticker's endless crawl *wants* `"none"`. Entrances don't.)"
   - `"power2.in"` -> "It creeps off the line and slams into place - that's a
     *leaving* curve. Hold that thought for the next question."
2. **Predict (kernel).** "A colleague's *entrance* tween says `ease: "power2.in"`.
   How will it feel on air?"
   - A) It starts slow and slams to a stop - an exit's curve pasted onto an
     entrance; wrong feel. **(correct)**
   - B) Correct - `.in` means the graphic is coming *in*. -> "This is the trap in
     the name. `.in` and `.out` describe the CURVE, not the graphic's direction.
     power2.out = decelerating arrival - use it to come in. power2.in =
     accelerating - use it to leave. Entrances ease out."
   - C) GSAP will refuse to run it. -> "GSAP obeys happily - the machine has no
     taste. Ease direction is *your* call, which is why you're being drilled on it."
3. **Fill (word bank).** The spec card: *"Out: 0.3 seconds, accelerating."*
   "`gsap.to("#strap", { y: 40, opacity: 0, duration: ___, ease: "power2.in" })`"
   Bank: `0.3` **(correct)**, `0.5`, `3`.
   - `0.5` -> "That's the entrance's length. The 5.5 rule still rules: outs run
     *shorter* than ins - the card says 0.3."
   - `3` -> "Three full seconds off air - an eternity. GSAP durations are seconds,
     and broadcast outs live around a third of one."
4. **Fix (taste bug - found by feel first).** "Press PLAY, then STOP, and just
   *watch* the cycle." The PLAY box and STOP box are shown:
   ```js
   gsap.to("#strap", { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" })
   ```
   ```js
   gsap.to("#strap", { y: 40, opacity: 0, duration: 0.9, ease: "power2.out" })
   ```
   "The out feels wrong twice over. Tap the TWO settings in the STOP call that break
   Unit 5's exit rules." Correct: `duration: 0.9` (slower than the in) and
   `ease: "power2.out"` (a landing curve on a departure); fixes offered: `0.3` and
   `"power2.in"`.
   - Tapping `y: 40` or `opacity: 0` -> "Those are right - fade and slide down is
     exactly the spec. The problem is *how long* and *what shape*."
   - Finding only one -> "One more. Say the exit rule-pair out loud: outs ease IN,
     and run FASTER."
5. **Predict.** "The sports ticker crawls Tomas Berg's match report across the
   screen at constant speed, forever. Which ease does the crawl want?"
   - A) `"none"` **(correct)** - "The one place the robot is the pro choice: a crawl
     that eased would surge and stall."
   - B) `"power2.out"` -> "A crawl has no landing - it never stops. Constant speed
     is the point: `"none"`."
   - C) `"power2.in"` -> "Accelerating forever? The headlines would fly off
     unreadable. Constant crawl: `"none"`."
6. **Predict (kernel mirror).** "Maria Kranz's strap is leaving the screen. Which
   ease?"
   - A) `"power2.in"` **(correct)**
   - B) `"power2.out"` -> "Read the name as the curve, not the direction: `.out`
     eases *out of its speed* at the end - a landing shape. Departures accelerate:
     `"power2.in"`."
   - C) `"none"` -> "Save the robot for the ticker. A strap leaves like it's needed
     elsewhere - accelerating."

- **Success criteria:** at least 5/6, and ex. 2 AND ex. 6 (the ease-direction kernel
  and its mirror) both correct - this pair is the unit's most important
  discrimination; missing either re-asks a fresh variant at the end, and the skill
  is flagged for the warm-up deck regardless.
- **Common wrong answers:** reading `.in`/`.out` as the graphic's direction (ex. 2B,
  6B - drilled from both sides, and re-tested in 6.8 and Checkpoint 6); symmetric
  in/out durations (ex. 3, 4 - the 5.5 asymmetry restated in GSAP).
- **Duration:** 5-6 min.

---

## Lesson 6.4 - Enter from off-screen

- **New concept:** `gsap.from(...)` - describe the *starting* state; the element
  animates from there to wherever the CSS puts it.
- **Learner-facing explanation:** "`gsap.to` animates TO the settings.
  `gsap.from` flips the arrow: the settings are the *starting line*, and the element
  travels home - to the position and look your CSS already gives it. That's the
  standard entrance idiom: CSS owns the resting look, the tween owns the journey."
- **Context:** the strap's entrance becomes
  `gsap.from("#strap", { y: 40, opacity: 0, duration: 0.5, ease: "power2.out" })` -
  and the Unit 5 state classes officially retire (a small on-screen send-off: "the
  off-state class did good work; from here, GSAP describes the start instead").
- **Recycles:** 5.1's planted "translate(-500px) is the starting point", resting
  positions (4.2), ease taste (6.3), the settings list (6.2).

**Exercises**

1. **Observe (direction flip).** Console strip, two lines with identical settings:
   ```js
   gsap.to("#strap", { y: 40, opacity: 0, duration: 0.5, ease: "power2.out" })
   gsap.from("#strap", { y: 40, opacity: 0, duration: 0.5, ease: "power2.out" })
   ```
   "Run the first. Reset. Run the second. Same settings - opposite journeys." Then:
   "In the `from` call, what do the settings describe?"
   - A) Where the strap *starts* - it then travels to its CSS home. **(correct)**
   - B) Where the strap ends up. -> "That's `to`'s reading - you just watched it
     leave. `from` flips the arrow: settings are the start, CSS home is the finish."
   - C) Both start and end. -> "One set of braces can only hold one end. (Stating
     *both* ends is real - next lesson.)"
2. **Predict (kernel).** "`gsap.from("#name", { opacity: 0, duration: 0.5 })`
   finishes. What is the name line's opacity?"
   - A) 1 - whatever the CSS gives it; the settings were only the starting
     line. **(correct)**
   - B) 0 - the call says opacity: 0. -> "With `to` it would end at 0. This is
     `from`: it *starts* at 0 and comes home to the CSS look - fully visible."
   - C) 0.5 - halfway. -> "0.5 here is the duration - seconds, not opacity. The
     journey ends wherever CSS rests the element: opacity 1."
3. **Fill (word bank).** "The NN bug pops in from nothing:
   `gsap.from("#bug", { scale: ___, duration: 0.4, ease: "power2.out" })`"
   Bank: `0` **(correct)**, `1`, `-1`.
   - `1` -> "from scale 1 means 'start at normal size' - no journey at all. The pop
     starts from nothing: 0."
   - `-1` -> "Scale doesn't go below nothing. 0 is fully shrunk - the 5.2
     ready-to-enter size."
4. **Fix.** PLAY runs this "entrance" - and the strap, sitting quietly at home,
   slides down and vanishes:
   ```js
   gsap.to("#strap", { y: 40, opacity: 0, duration: 0.5, ease: "power2.out" })
   ```
   "PLAY should bring the strap IN. One word is wrong. Tap it." Correct: `to`;
   fix offered: `from`.
   - Tapping the settings -> "The settings are the perfect *starting* point - 40
     down, invisible. The bug is the verb: `to` drove the strap TO that state.
     Flip the arrow."
   - After fixing, replay: the same settings now produce the entrance.
5. **Predict (mirror).** "`gsap.from("#bug", { scale: 0, duration: 0.4,
   ease: "power2.out" })` runs. Describe the motion."
   - A) The bug grows from nothing to its normal corner size, landing
     gently. **(correct)**
   - B) The bug shrinks away to nothing. -> "That's the `to` reading again. Run the
     arrow: START at scale 0, travel to the CSS size."
   - C) The bug jumps to double size. -> "Nothing here says 2. From 0, home to 1 -
     the pop you built in 5.2, now one line long."

- **Success criteria:** at least 4/5; ex. 2 (the kernel) must be correct - if
  missed, a fresh variant (from with y on the title line) is asked at the end.
- **Common wrong answers:** from/to direction flips (ex. 2B, 4, 5B - the arrow is
  drilled in both directions until it sticks); duration misread as a property value
  (ex. 2C).
- **Duration:** 4-5 min.

---

## Lesson 6.5 - Full control

- **New concept:** `gsap.fromTo(...)` states both ends explicitly - the bulletproof
  choice when a move must be *repeatable* no matter what state the graphic was left
  in.
- **Learner-facing explanation:** "`gsap.fromTo` takes the target and then TWO
  settings lists: the start, then the finish. More typing than `from` - and worth
  it: no matter where the graphic happens to be when the call runs, the move begins
  from the same place every time. Operators replay graphics at the worst moments.
  Templates that survive them use fromTo. Duration and ease ride in the second list -
  they belong to the journey."
- **Context:** a real broadcast failure mode, demonstrated: the director calls for
  the strap again *while it's still animating in*. The from-only version stutters
  from wherever it was; the fromTo version is identical every take.
- **Recycles:** from (6.4), the operator's reality (1.2 - PLAY happens when the
  gallery says so, not when the code is ready), ease taste (6.3).

**Exercises**

1. **Observe (break it, then bulletproof it).** Console strip:
   ```js
   gsap.from("#strap", { y: 40, opacity: 0, duration: 0.5, ease: "power2.out" })
   ```
   "Press RUN twice, fast." (Second run catches the strap mid-flight - the entrance
   starts from a half-on state and looks broken.) Then the fromTo version:
   ```js
   gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
   ```
   "Hammer RUN as fast as you like." (Identical every time.) "What made the second
   version reliable?"
   - A) It states the start too, so every run begins from the same
     place. **(correct)**
   - B) It's newer, so it runs faster. -> "Same speed, same tool. The difference is
     the stated start: fromTo never has to guess where to begin."
   - C) Pressing RUN twice is forbidden. -> "Tell that to a live director. Replays
     happen - templates must survive them. That's fromTo's whole job."
2. **Predict.** ```js
   gsap.fromTo("#title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" })
   ```
   "Which braces describe where the title line ENDS?"
   - A) The second list: `{ y: 0, opacity: 1, ... }`. **(correct)** - "Read it as
     its name: from THIS, to THAT. Left to right."
   - B) The first list. -> "The first list is the starting line - it's the `from`
     half. The destination is the second list, where duration and ease ride too."
   - C) Neither - CSS decides the end. -> "That was `from`'s trick. fromTo takes
     the wheel completely: both ends written, nothing left to guessing."
3. **Fill (word bank, two blanks).** "Finish the journey - the strap ends at home,
   fully visible:
   `gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: ___, opacity: ___, duration: 0.5, ease: "power2.out" })`"
   Bank: `0`, `1`, `40`. Correct: `y: 0`, `opacity: 1`.
   - `y: 40` -> "That's where it *started* - it would travel nowhere. Home is
     y: 0: the resting spot the CSS pinned in Unit 4."
   - `opacity: 0` in the second slot -> "Then it arrives invisible - an entrance to
     nowhere. It ends seen: 1."
4. **Arrange.** Blocks: `gsap.fromTo` / `("#bug",` / `{ scale: 0 },` /
   `{ scale: 1, duration: 0.4, ease: "power2.out" })` - "Build the bug's
   bulletproof pop: from nothing, to full size, landing gently."
   - Lists swapped -> "Run that and the bug *shrinks away* - you wrote the pop
     backwards. fromTo reads left to right: start first, finish second."
5. **Predict (kernel).** "A colleague trims your fromTo down to a plain from -
   *'less typing, same move.'* When does the difference bite?"
   - A) The first time PLAY runs while the strap isn't fully off - from starts from
     whatever is on screen; fromTo always starts from its stated start. **(correct)**
   - B) Never - they really are the same. -> "Replay ex. 1 and hammer RUN. Same
     move on a calm day; only one of them survives a busy gallery."
   - C) fromTo renders sharper pixels. -> "The picture is identical. The difference
     is *reliability under replay* - a broadcast virtue, not a visual one."

- **Success criteria:** at least 4/5; ex. 5 (the kernel) must be correct - if
  missed, the double-RUN demo replays and a fresh variant is asked.
- **Common wrong answers:** fromTo dismissed as redundant verbosity (ex. 5 - the
  double-play demo IS the argument); start/finish lists swapped (ex. 2, 4).
- **Duration:** 4-5 min.

---

## Lesson 6.6 - The timeline

- **New concept:** `gsap.timeline()` plus chained `.to(...)` calls - a sequence of
  tweens that runs in order, owning the whole graphic's entrance as one object.
- **Learner-facing explanation:** "One tween moves one thing. A whole entrance is
  several moves in a row - so GSAP gives you a timeline: `gsap.timeline()` starts
  the sequence, and each chained `.to(...)` adds the next move to the queue. Out of
  the box they run one after another, in the order written. The whole entrance
  becomes one object - one thing to play, and later, one thing to hand to the PLAY
  button."
- **Context:** the strap's full in, written as one timeline: panel slides in, then
  the name fades up, then the title. A visual **timeline strip** (tween bars on a
  seconds ruler) sits under the code, synced: scrub it and the render follows.
- **Recycles:** 5.6's one-after-another thinking (now expressed as sequence, not
  delays), parent-moves-all (2.1 - the panel tween carries its children), everything
  from 6.1-6.3.

**Code slice (used by ex. 1-2, 5-6):**
```js
gsap.timeline()
  .to("#panel", { x: 0, duration: 0.4, ease: "power2.out" })
  .to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" })
  .to("#title", { opacity: 1, duration: 0.3, ease: "power2.out" })
```

**Exercises**

1. **Observe (scrub).** The timeline strip shows three bars laid end to end on the
   ruler. "Drag the scrubber slowly through the whole entrance, watching code and
   render together. Now tap the bar that belongs to the LAST move."
   - Correct: the `#title` bar.
   - Tapping `#panel`'s bar -> "That's the opener - the leftmost bar. The queue
     runs left to right; the last bar is the title's."
2. **Predict (kernel).** "Three chained `.to` calls. Which tween runs *second* -
   and when does it start?"
   - A) The `#name` tween - it starts when the panel tween finishes. **(correct)**
   - B) The `#name` tween - it starts at the same time as the panel. -> "That
     would be a pile-up, and it's not what you scrubbed. A timeline is a queue:
     each `.to` waits for the one before it. (Starting *early* is real - next
     lesson - but you have to ask for it.)"
   - C) Whichever finishes loading first. -> "Nothing races. The order on the page
     IS the order on air - top to bottom, one at a time."
3. **Arrange.** A reference video plays: panel in, then name, then title. Blocks
   (shuffled): `gsap.timeline()` /
   `.to("#panel", { x: 0, duration: 0.4, ease: "power2.out" })` /
   `.to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" })` /
   `.to("#title", { opacity: 1, duration: 0.3, ease: "power2.out" })` -
   "Build the timeline that matches the video."
   - `gsap.timeline()` not first -> "The timeline is the spine - it must exist
     before moves can chain onto it. It always leads."
   - Name/title swapped -> "Watch the video again: the *name* lands first. On a
     timeline, written order is played order."
4. **Fill (word bank).** "The title step is missing. Add it:
   `.to("____", { opacity: 1, duration: 0.3, ease: "power2.out" })`"
   Bank: `#title` **(correct)**, `title`, `#name`.
   - `title` -> "No hash, no id lookup - same rule as every GSAP target: `#title`."
   - `#name` -> "The name already has its step, one line up. Each element gets its
     own tween; the missing one is the title's."
5. **Predict (2.1 recycle).** "The panel tween moves only `#panel` - but the name
   and title live *inside* the panel. When the panel slides in, where are they?"
   - A) Riding inside it - children move with their parent - still invisible until
     their own tweens fade them up. **(correct)**
   - B) Left behind at the edge of the screen. -> "Boxes inside boxes, from way
     back in 2.1: children go where the parent goes. They arrive aboard the panel,
     then fade up on cue."
   - C) Already visible on the panel. -> "Their opacity starts at 0 (the CSS
     resting-off look) - the ride in is invisible; the fade-up is their own tween."
6. **Predict.** "Durations: 0.4, then 0.3, then 0.3. How long is the whole
   entrance?"
   - A) 1.0 seconds - a queue adds up. **(correct)** - "A full second is polite,
     verging on PowerPoint. Next lesson we tighten it the broadcast way."
   - B) 0.4 seconds - they run together. -> "Chained tweens queue; they don't
     stack. Add them: 0.4 + 0.3 + 0.3."
   - C) 0.3 seconds - the shortest wins. -> "No tween is dropped. One after
     another: a full 1.0s from first pixel to last."

- **Success criteria:** at least 5/6; ex. 2 (the kernel) must be correct - if
  missed, a fresh variant (four tweens, "which runs third?") is asked at the end.
- **Common wrong answers:** expecting chained tweens to run simultaneously (ex. 2B,
  6B - the queue is the concept); timeline spine placed mid-chain (ex. 3).
- **Duration:** 5 min.

---

## Lesson 6.7 - Overlap

- **New concept:** the position parameter - a final `"-=0.2"` after the settings
  starts a tween 0.2s *before* the previous one finishes; overlapping motion reads
  as one designed move. (`stagger` shown at recognize level as the shorthand for
  families.)
- **Learner-facing explanation:** "A strict queue is polite - and polite reads as
  PowerPoint. Pros overlap: the next move starts while the previous one is still
  landing. Write it as a rider after the settings: `"-=0.2"` means 'start 0.2
  seconds before the previous tween ends'. It adjusts the START TIME - it is not a
  duration. Small overlaps knit separate tweens into one designed move."
- **Context:** yesterday's 1.0s queue, tightened to broadcast-crisp. The timeline
  strip now shows the bars sliding left under the rider's control - the overlap is
  *visible* as bars overlapping. On the ticker, three headlines enter with one
  `stagger` call (recognize level, closing the loop from 5.6).
- **Recycles:** timelines (6.6), stagger taste (5.6 - the beat between lines that
  reads "designed"), class selectors (2.4/3.3 - the ticker call targets
  `".headline"`).

**Code slice (the tightened entrance, ex. 2-4):**
```js
gsap.timeline()
  .to("#panel", { x: 0, duration: 0.4, ease: "power2.out" })
  .to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2")
  .to("#title", { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2")
```

**Exercises**

1. **Observe (the overlap slider).** A slider morphs the rider on both line tweens
   from `"-=0"` to `"-=0.3"`, replaying live; the timeline strip's bars slide
   together as it moves. "Find the spot where the entrance stops feeling like a
   queue but every line still gets its own moment. What did the minus-number
   change?"
   - A) When each tween *starts*, relative to the one before it. **(correct)**
   - B) How fast each tween plays. -> "Watch the bars: they keep their length. The
     rider slides them earlier - start time, not speed."
   - C) The order of the tweens. -> "Order stayed: panel, name, title. They just
     stopped waiting for each other's last breath."
2. **Predict (kernel).** "The title tween carries `"-=0.2"`. What does it mean?"
   - A) The title starts 0.2 seconds *before the previous tween finishes*.
     **(correct)**
   - B) The title tween lasts 0.2 seconds. -> "Length lives INSIDE the braces, as
     `duration`. This rider sits *outside* them and does one job: it moves the
     start time earlier. The tween still runs its full 0.3s."
   - C) The title waits an extra 0.2 seconds. -> "That would be `"+=0.2"` - plus
     pushes later, minus pulls earlier. Minus is the broadcast one: overlap, not
     gap."
3. **Fill (word bank).** "Tighten the name tween - start it 0.2s early:
   `.to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" }, "___")`"
   Bank: `-=0.2` **(correct)**, `+=0.2`, `0.2s`.
   - `+=0.2` -> "Plus adds a *gap* after the panel lands - more PowerPoint, not
     less. Overlap pulls earlier: minus."
   - `0.2s` -> "The rider is written like arithmetic on the start time -
     minus-equals - and GSAP always speaks plain seconds, no units: `"-=0.2"`."
4. **Fix (taste bug).** The rider on the title tween has been cranked to
   `"-=0.3"` - with the name tween 0.3s long, name and title now land at the same
   instant and the one-two hierarchy is gone. "Play it. Maria Kranz's name and her
   title arrive as one blob. Tap the value to change, then pick the fix."
   Correct: the title's `"-=0.3"`; fix chips: `-=0.1` **(accepted)**,
   `-=0.2` **(accepted)**, `-=0.4`.
   - Tapping the name's rider -> "The name-over-panel overlap reads fine. The blob
     is the *title* starting with zero gap on the name - its rider ate the whole
     0.3s tween."
   - Choosing `-=0.4` -> "Even earlier - now the title *leads* the name, and the
     hierarchy flips backwards (remember 5.6: the important line lands first)."
5. **Predict (stagger, recognize level).** The ticker's three headlines:
   ```js
   gsap.from(".headline", { y: 20, opacity: 0, duration: 0.3, ease: "power2.out", stagger: 0.1 })
   ```
   "Three elements, one call. What does `stagger: 0.1` do?"
   - A) Each headline starts 0.1s after the one before - a built-in one-after-
     another for the whole family. **(correct)** - "The class selector grabs all
     three (2.4's family label at work); stagger spaces their starts. You'll read
     this in pro templates constantly - recognizing it is enough for now."
   - B) All three wait 0.1s, then move together. -> "That would be `delay`. Stagger
     *spaces the family out*: first at 0, second at 0.1, third at 0.2."
   - C) Each tween lasts 0.1s. -> "Length is `duration: 0.3`, right there in the
     settings. Stagger only staggers the starts."

- **Success criteria:** at least 4/5; ex. 2 (the kernel) must be correct - if
  missed, a fresh variant (`"-=0.1"` on the name tween) is asked at the end.
- **Common wrong answers:** the rider read as a duration (ex. 2B - the
  bars-keep-their-length visual in ex. 1 exists to prevent this); plus/minus
  direction flipped (ex. 3); overlap cranked past the hierarchy (ex. 4 - taste,
  recycled from 5.6).
- **Duration:** 4-5 min.

---

## Lesson 6.8 - Review remix (no new concept)

- **Purpose:** spaced retrieval across the unit before the checkpoint, rehearsing
  the unit's promise *literally*: reading and adjusting someone else's GSAP. All six
  anchors work against one realistic animation block "from the channel's shelf" -
  written by a stranger, commented by nobody.
- **Learner-facing framing:** "This entrance was written by someone who left the
  channel. Nothing new to learn - read it, tune it, fix it. This is the job."
- **No kernel** (nothing new); the pool re-tests earlier kernels, 6.3's
  ease-direction above all. Adaptive: the app draws 6 exercises weighted toward the
  student's weakest recorded skills, always including the fixed anchors below.

**The inherited block (on screen throughout):**
```js
gsap.timeline()
  .fromTo("#panel", { x: -640, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
  .fromTo("#name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.2")
  .fromTo("#title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.in" }, "-=0.1")
```

**Fixed pool (each tagged with its source lesson):**

1. **Predict** (6.6/6.7): "Before you run it: in what order do the three tweens
   start, and do any overlap?" Correct: panel, name, title; the name starts 0.2s
   before the panel lands, the title 0.1s before the name lands.
2. **Fix** (6.3 - the unit's headline kernel, re-tested): "One tween's ease is
   wrong-direction. Play it, feel it, tap it." Correct: the title's
   `ease: "power2.in"` - an accelerating curve on an *entrance* tween; fix:
   `"power2.out"`. (Tapping the panel's or name's ease -> "Those land gently -
   decelerating arrivals. One line slams into place instead. Watch the title.")
3. **Fill** (6.3): "The producer wants the panel's entrance 20% faster. 20% off
   0.5 is..." - edit `duration: 0.5` to `0.4` (chips: `0.4`, `0.3`, `0.45`).
4. **Type on web / Arrange on phone** (6.4): "The NN bug still pops in with old CSS.
   Rewrite it as one from-tween: from nothing, 0.4s, landing gently." Correct:
   `gsap.from("#bug", { scale: 0, duration: 0.4, ease: "power2.out" })` (accepting
   any pair order inside the braces).
5. **Fix** (6.2): a fresh line pasted below the block fails loudly:
   `gsap.to("#strap", { y: 0 opacity: 1, duration: 0.3 })` - find the missing comma
   from the error overlay's hint alone.
6. **Predict** (6.5): "PLAY gets hammered twice mid-entrance. Does this block
   stutter or hold?" Correct: it holds - every tween is a fromTo, so each starts
   from its stated start. (Wrong -> "Check the verbs: the stranger used fromTo
   throughout. That choice is *why* the block is shelf-worthy.")

- **Success criteria:** at least 5/6. Any miss appends one more exercise from the
  same source lesson's pool (capped at 8 total).
- **Duration:** 4-5 min.

---

## Checkpoint 6 - "The GSAP strap"

- **Type:** Build (web: write the two timelines in labeled boxes; phone: guided
  block assembly of the same code, with the settings values entered via chips).
- **Scenario:** the same NN design-department motion spec as Checkpoint 5 - now
  implemented the industry way. The spec card: *"In: panel slides up 40px and fades
  in, 0.5s, decelerating; name and title follow, each overlapping the previous move
  by 0.2s, 0.4s each, decelerating. Out: whole strap fades and slides down 40px,
  0.3s, accelerating. Must survive a double-PLAY."*
- **Given:** the fully styled, positioned strap from Checkpoint 4 (ids `#strap`,
  `#panel`, `#name`, `#title` as established in 6.1); two labeled code boxes, **ON
  PLAY** and **ON STOP**, visibly wired to the buttons but sealed: "PLAY runs the
  IN box, STOP runs the OUT box - trust the wiring, Unit 7 opens it." The lines'
  CSS resting-off opacity is noted on the card (name and title rest at opacity 0
  until tweened - the 6.6 arrangement).
- **Target solution (what the checker accepts, modulo pair order and equivalent
  values):**

  ON PLAY:
  ```js
  gsap.timeline()
    .fromTo("#panel", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
    .fromTo("#name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")
    .fromTo("#title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")
  ```
  ON STOP:
  ```js
  gsap.timeline()
    .to("#strap", { y: 40, opacity: 0, duration: 0.3, ease: "power2.in" })
  ```
  (One tween on the parent takes the whole strap out - children ride, 2.1's oldest
  lesson doing broadcast work. A per-element out is also accepted if its values are
  correct.)
- **Tasks:** (1) build the in-timeline: three tweens, correct targets and order,
  fromTo for repeatability, spec durations, entrance easing, both overlaps;
  (2) build the out: shorter than the in, exit easing; (3) press PLAY, then
  double-tap PLAY mid-entrance - the replay must not stutter; (4) the
  taste-approval replay from Checkpoint 5, re-asked: "Does your out feel faster
  than your in?"
- **Pass criteria (checked structurally against the running tweens, not the
  text):** in-timeline uses fromTo tweens targeting `#panel`, `#name`, `#title` in
  that order; panel duration 0.5, lines 0.4; every in-ease `"power2.out"`; both
  line tweens carry a `"-=0.2"` rider; out duration 0.3 with ease `"power2.in"` and
  end state y: 40 / opacity: 0; double-PLAY replay produces an identical entrance;
  taste question answered.
- **Failure handling (diagnosis over verdict, each mapped to its lesson):**
  - call won't run / error overlay -> "Read the overlay - it points at the broken
    spot in the settings list. (See: The settings object.)" -> micro-review
    6.1/6.2.
  - wrong ease direction -> "Your entrance slams / your exit floats. Say the rule:
    entrances ease OUT, exits ease IN - the name is the curve, not the direction.
    (See: How long, and how.)" -> micro-review 6.3.
  - entrance built with `to`, or stutters on double-PLAY -> "Watch the double-PLAY
    replay: the move starts from wherever the strap was. State both ends. (See:
    Enter from off-screen / Full control.)" -> micro-review 6.4/6.5.
  - queue with no overlap, or lines landing as one blob -> "Feel it against the
    reference: a polite queue reads PowerPoint; a swallowed name reads chaos. The
    rider is `"-=0.2"`. (See: The timeline / Overlap.)" -> micro-review 6.6/6.7.
  - After the linked micro-review, the checkpoint re-runs with fresh variant values
    (new spec numbers, new presenter on the strap).
- **Duration:** 6-7 min.

**Unit 6 total learner time:** ~40-46 min across 9 sessions.
