# Unit 5 - Making It Move (full lesson plans)

**Unit goal:** animate a graphic on and off air with professional timing, in pure CSS.
**Promise:** after this unit you can animate a graphic on and off air so it feels
professional, not PowerPoint.
**Prerequisites:** Units 0-4. PLAY/STOP now visibly *cause* the motion by applying a
state class - shown but not yet explained ("trust it for now - Unit 7 opens the
buttons, Unit 8 shows the switch").

## Conventions used in these plans

- Zones as in unit-01.md: **render** (over program feed or checkerboard), **code
  slice** (only touchable lines; boilerplate hidden), **task**. PLAY/STOP always
  present and real.
- **The state-class mechanism (new this unit, trusted not explained):** pressing PLAY
  adds the class `on` to the animated elements; STOP removes it. A live attribute
  readout above the render shows it happening: `class="strap"` <-> `class="strap on"`.
  Every such slice carries the seal: "trust it for now - Unit 7 opens the buttons,
  Unit 8 shows the switch." One supporting fact is introduced alongside it in 5.3: an
  element can wear *several* classes - the class attribute is a list of labels
  (a small extension of 2.4).
- All motion in this unit is **off-state styles + on-state styles + a transition** (or,
  in 5.7, an animation). No JavaScript appears anywhere.
- Code slices contain only Unit 0-4 tokens plus this unit's new properties, in
  teaching order: `transform: translate()` (5.1), `scale()` (5.2), `transition` (5.3),
  `ease-out` (5.4), `ease-in` (5.5), `transition-delay` (5.6), `@keyframes` +
  `animation-name`/`animation-duration`/`animation-timing-function`/
  `animation-iteration-count` (5.7). This unit standardizes on the two-value form
  `translate(x, y)` - one syntax, and the y slot recycles 4.1's "y grows downward".
- **New render control:** a slow-motion replay button (0.25x) joins the
  over-video/checkerboard toggle and the coordinate/safe-area overlays. Easing is
  invisible at full speed until the eye is trained.
- Running graphics: the **Nightly News strap** (Maria Kranz, panel `#0a3d91`), the
  **NN bug** (top-right, from 4.3), the **HIFK-TPS score strap**, the **weather strap**
  (Alexandra Rivera), and the **sports ticker** (accent `#e8b90c`).

---

## Lesson 5.1 - Slide without breaking

- **New concept:** `transform: translate(x, y)` slides a box away from its pinned spot
  without re-measuring anything else - the animation-safe way to move.
- **Learner-facing explanation:** "To animate a box you don't re-pin it - you slide it
  from where it's pinned. `transform: translate(x, y)` moves the box while its pin,
  its neighbors, and the layout around it stay untouched. That's why broadcast motion
  is built on transforms, not on changing `top` and `left`."
- **Context:** the strap sits at its Checkpoint 4 position. A translate joystick
  previews the entrance path; crosshairs read out the offset. No gliding yet - values
  snap; the smoothness arrives in 5.3.
- **Recycles:** the coordinate grid and y-downward (4.1), pinning (4.2), the ticker's
  job (0.1).

**Code slice (ex. 1-4):**
```css
#strap {
  position: absolute;
  left: 120px;
  bottom: 96px;
  transform: translate(0px, 0px);
}
```

**Exercises**

1. **Observe.** "Drag the joystick and watch the transform values. Slide the strap
   straight *down* - which number changed?"
   - Correct: the second one. "The first slot is x - across. The second is y - and y
     grows downward, like reading. Same grid as Unit 4."
   - Tapping/choosing the first -> "That slot slides the strap *sideways*. Down lives
     in the second slot: translate(across, down)."
2. **Predict.** "We set `transform: translate(-500px, 0px)`. Where is the strap?"
   - A) Off-screen, out the left edge. **(correct)** -> "Remember this spot - parking
     a graphic just off-frame is exactly how entrances begin."
   - B) Off-screen right. -> "Negative x slides *left*; positive slides right. The
     render shows it gone out the left side."
   - C) 500px lower. -> "That would be the *second* slot. The first slot only ever
     moves things across."
3. **Fill (word bank).** "Park the strap 60px below its pin, ready to rise on air:
   `transform: translate(0px, ___px);`" Bank: *60* **(correct)**, *-60*, *0*.
   - *-60* -> render preview shows the strap floating 60px *above* the panel line:
     "Negative y is up. The strap should wait *below* its spot - y grows downward."
   - *0* -> "translate(0px, 0px) is no slide at all - the strap is already sitting at
     its pin."
4. **Predict.** "After all that sliding we set `transform: translate(0px, 0px)`. Where
   does the strap sit now?"
   - A) Exactly at its pin: left 120, bottom 96. **(correct)** -> "The pin never moved.
     translate is a *slide from the pin*, and a zero slide is home."
   - B) Wherever it was last dragged. -> "Transforms don't accumulate history - the
     current value is the whole story, and it reads zero."
   - C) The top-left corner of the canvas. -> "0,0 here means zero *slide*, not the
     frame's corner. Canvas coordinates belong to `top`/`left`; translate counts from
     the pin."
5. **Fix (kernel).** The sports ticker crawls by - stuttering. Code:
   ```css
   #ticker {
     position: absolute;
     left: 40px;
     bottom: 24px;
   }
   ```
   "To move the ticker, the designer keeps changing `left` - and the crawl stutters.
   Which property should carry the motion instead? Tap the correct replacement."
   - A) `transform: translate(-200px, 0px);` **(correct)** -> the render replays
     smooth: "Changing `left` makes the machine re-measure the layout - padding,
     margins, neighbors - on every step. A transform slides the finished picture.
     Same look, different machinery - transforms are the smooth ones."
   - B) `left: -160px;` -> "Still `left`, still re-measuring, still stuttering. The
     smooth mover is `transform`."
   - C) `bottom: 24px;` -> "That pins the ticker's height - it doesn't move anything
     sideways, smoothly or otherwise."

- **Success criteria:** at least 4/5; ex. 5 (the kernel) correct with at most one
  hint.
- **Common wrong answers:** reading translate values as canvas coordinates (ex. 4C -
  the pin-vs-slide split is this lesson's foundation); flipped signs (ex. 2B, 3);
  "any property that moves it is fine" (ex. 5 - the stutter is shown, not asserted).
- **Duration:** 4-5 min.

---

## Lesson 5.2 - Grow and shrink

- **New concept:** `transform: scale()` resizes from the element's own center - 1 is
  normal, 0 is nothing, 2 is double; scale(0) is invisible but still there.
- **Learner-facing explanation:** "`scale()` resizes an element from its own middle:
  `scale(1)` is its normal size, `scale(0)` is nothing at all, `scale(2)` is double.
  A bug that pops on air starts at `scale(0)` - invisible, but still pinned, still in
  the code, ready to enter."
- **Context:** the NN bug at its permanent top-right home (right 40, top 40, from
  4.3), with a scale slider. The safe-area overlay is on.
- **Recycles:** safe areas (4.5), opacity-zero as the sibling ready state (4.7), the
  bug's pin (4.3), the score strap (1.6).

**Code slice (ex. 1-4):**
```css
#bug {
  position: absolute;
  right: 40px;
  top: 40px;
  transform: scale(1);
}
```

**Exercises**

1. **Observe.** "Slide the scale from 0 to 2 and back. Stop where the bug disappears
   completely. What does the transform read?"
   - Correct: `scale(0)`. Stopping at a small value like 0.1 -> "Almost - there's
     still a speck of logo in the corner. *Nothing* is exactly 0."
2. **Predict.** "We set `scale(2)`. What's the risk up in that corner?"
   - A) The bug grows past the title-safe line. **(correct)** -> the overlay lights
     the breach: "Scaling happens from the element's center, so half the growth goes
     *toward the frame edge*. Big things near corners break title-safe (Unit 4)."
   - B) The bug slides left. -> "Scale changes size, never position - the pin holds."
   - C) The bug turns see-through. -> "Size, not transparency. See-through is
     `opacity`'s job (4.7)."
3. **Predict (kernel).** "The bug is at `scale(0)`. A colleague says: 'Someone deleted
   the bug from the template.' True or false?"
   - False **(correct)** -> "Tap the corner - the element's outline still lights up.
     scale(0) draws it at no size; the element, its pin, and its code are all still
     there. Invisible but still there - the same idea as opacity 0, and exactly what
     makes it *ready to enter*."
   - True -> "Check the code slice: the `#bug` element is right there. Deleted means
     gone from the file; scale(0) means drawn at no size. One of them can come back
     with a single number."
4. **Fill (word bank).** "Park the bug ready to pop on air:
   `transform: scale(___);`" Bank: *0* **(correct)**, *1*, *2*.
   - *1* -> "That's the bug at full size, already on air before PLAY. Ready-to-enter
     means nothing showing: 0."
   - *2* -> "Double size is an exit *problem*, not an entrance state."
5. **Arrange.** Blocks: `transform:` / `translate(0px, 40px)` / `scale(0)` / `;` -
   "Build one transform line that parks the HIFK-TPS score strap 40px below its pin
   AND at nothing size."
   - Correct: `transform: translate(0px, 40px) scale(0);` -> "Both moves ride one
     transform line, separated by a space. The order can matter in general - this
     course always writes the slide first, the size second."
   - `;` placed mid-line -> render preview shows the strap frozen at full size: "The
     semicolon ends the declaration - anything after it is ignored. It goes last."

- **Success criteria:** at least 4/5; ex. 3 (the kernel) must be correct - if missed,
  a mirror variant is asked at the end ("opacity 0, scale 0, deleted - which two can
  come back on PLAY?").
- **Common wrong answers:** scale(0) = deleted (ex. 3 - the misconception this lesson
  exists to kill); expecting scale to move the pin (ex. 2B); two transforms written as
  two `transform:` lines (ex. 5 feedback covers it: "a second transform line would
  *replace* the first - one line, both moves").
- **Duration:** 3-4 min.

---

## Lesson 5.3 - Smooth change

- **New concept:** `transition: property duration` - a standing rule that makes future
  changes to a property glide instead of snap.
- **Learner-facing explanation:** "A transition is a standing rule: 'when this
  property changes, glide - don't snap.' `transition: transform 0.5s` means any change
  to transform takes half a second. PLAY flips the strap into its on state; the
  transition turns that flip into motion."
- **Context:** the strap's two states side by side - off: slid 60px down + opacity 0;
  on: home + opacity 1 - and one transition line brings them to life. The mechanism is
  shown plainly: PLAY adds the label `on` to the strap (readout:
  `class="strap"` -> `class="strap on"`). Callout: "An element can wear several
  classes - the attribute is a list of labels. When two rules disagree, the one
  written *later* in `<style>` wins, so with the label on, `.on` takes over. Trust the
  button for now - Unit 7 opens the buttons, Unit 8 shows the switch."
- **Recycles:** translate (5.1), opacity (4.7), class selectors (3.3), the PLAY
  contract (1.2), later-wins ordering intuition (4.6).

**Code slice (ex. 1-3):**
```html
<div id="strap" class="strap">
  <div id="name" class="line">Maria Kranz</div>
  <div id="title" class="line">News Anchor</div>
</div>
```
```css
.strap {
  transform: translate(0px, 60px);
  opacity: 0;
  transition: transform 0.5s;
}
.on {
  transform: translate(0px, 0px);
  opacity: 1;
}
```

**Exercises**

1. **Observe.** A toggle removes/restores the `transition` line. "Remove it and press
   PLAY. What happened?"
   - A) The strap snapped on instantly - no motion. **(correct)** -> "Without the
     rule, a change is a teleport. The two states are the *where*; the transition is
     the *how*."
   - B) Nothing appeared. -> "Look again - the strap IS on air. It just arrived in
     zero time. Snapping and not-arriving look alike at full speed; use the slow-mo
     replay."
   - C) It moved slower. -> "There was no 'slower' - there was no journey at all."
2. **Predict.** "The transition line reads `transition: transform 0.5s;` and PLAY is
   pressed. Which change glides, and which snaps?"
   - A) The slide glides; the fade snaps. **(correct)** -> slow-mo replay confirms:
     the strap rises smoothly but is full opacity from the first frame. "The
     transition names `transform` only. `opacity` changed too - but no rule covered
     it, so it snapped."
   - B) Both glide. -> "A transition only covers the properties it *names*. Read the
     line: one property, one glide."
   - C) The fade glides; the slide snaps. -> "Backwards - check which property the
     transition names."
3. **Fill (word bank).** "Make the fade glide too:
   `transition: transform 0.5s, ___ 0.5s;`" Bank: *opacity* **(correct)**, *color*,
   *.on*.
   - *color* -> "Nothing changes the text color between the two states. List the
     properties that actually differ: transform and opacity."
   - *.on* -> "That's a selector, not a property. Transitions list *properties* -
     the things that change."
4. **Fix.** The weather strap (Alexandra Rivera) snaps on air. Code:
   ```css
   .strap {
     transform: translate(0px, 60px);
     opacity: 0;
     transition: left 0.5s;
   }
   .on {
     transform: translate(0px, 0px);
     opacity: 1;
   }
   ```
   "The designer wrote a transition, but the strap still snaps. Tap what's wrong."
   - Correct: `left` -> fix bank offers `transform` **(correct)**, `strap`, `60px`.
     "`left` never changes here - the pin is constant (that was 5.1's whole point).
     The property that changes between the states is `transform`. A transition
     watching the wrong property watches nothing."
   - Tapping `0.5s` -> "Half a second is fine. The glitch is the *name* - compare the
     two states: which property actually differs?"
5. **Predict (kernel).** "The strap is on air. Nobody presses anything. What is the
   transition doing right now?"
   - A) Nothing - it's a rule waiting for a change. **(correct)** -> "A transition is
     not an action. It's a promise about *future changes*: whenever transform changes -
     PLAY, STOP, anything - the trip takes 0.5s."
   - B) Animating in a loop. -> "Looping motion is a different tool - you'll build it
     in 5.7. A transition runs once per change, then waits."
   - C) Slowly fading the strap. -> "Only a *change* starts a transition. No change,
     no motion - the strap just sits there, on air."

- **Success criteria:** at least 4/5; ex. 5 (the kernel) must be correct - if missed,
  a variant is asked at the end ("STOP is pressed - what does the same transition do?"
  answer: it also governs the way *back*; the rule watches changes in both
  directions).
- **Common wrong answers:** transition-as-action (ex. 5 - the headline misconception);
  expecting unnamed properties to glide (ex. 2B); transitioning `left` instead of
  `transform` (ex. 4 - 5.1's lesson resurfacing as a bug).
- **Duration:** 5 min.

---

## Lesson 5.4 - Entrances ease out

- **New concept:** easing is the speed *shape* of a move; `ease-out` (fast start,
  gentle landing) is how real graphics arrive; `linear` is how robots arrive.
- **Learner-facing explanation:** "Easing is the speed shape of a move. `ease-out`
  starts fast and lands gently - that's how real graphics arrive. `linear` moves at
  one constant speed - that's how conveyor belts move. From now on, every entrance
  you build decelerates."
- **Context:** the same strap entrance rendered three ways over the studio feed -
  the course's first pure taste lesson. The slow-motion replay control earns its keep
  here. The framing is explicit: easing is not polish; it is *the* difference between
  amateur and pro motion. (And a forward whisper of 0.3: choreography will one day be
  JS's job - Unit 6.)
- **Recycles:** transitions (5.3), translate (5.1), the operator's eye (1.2 - what
  goes on air must look intentional).

**Code slice (ex. 3):**
```css
.strap {
  transform: translate(0px, 60px);
  opacity: 0;
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
.on {
  transform: translate(0px, 0px);
  opacity: 1;
}
```

**Exercises**

1. **Observe.** Three unlabeled straps play in, one after another (linear / ease-out /
   ease-in, shuffled). "Tap the one that would go on air tonight."
   - Correct: the ease-out entrance. -> "Fast off the line, gentle touchdown - the eye
     reads deceleration as weight and intent."
   - Tapping linear -> "That one moves like a conveyor belt: one speed, no landing.
     Watch the winner again in slow-mo - see it *settle*."
   - Tapping ease-in -> "That one creeps off the line and slams into place. It's a
     curve - just the wrong way round for an arrival. Hold that thought: it has a job,
     next lesson."
2. **Predict (kernel).** "An entrance starts slow, then slams to a stop at full speed.
   Which curve was that?"
   - *ease-in* **(correct)** -> "Slow start, fast finish - acceleration. Fine for
     leaving; wrong for arriving."
   - *ease-out* -> "ease-out is the mirror: fast start, gentle landing. What you just
     described *sped up into* the stop."
   - *linear* -> "linear never changes speed. This move clearly accelerated."
3. **Fill (word bank).** "Give the entrance its landing:
   `transition: transform 0.5s ___, opacity 0.5s ___;`" Bank: *ease-out* **(correct)**,
   *ease-in*, *linear*.
   - *ease-in* -> render preview replays the slam: "Feel that thud? Entrances
     decelerate: ease-out."
   - *linear* -> render preview replays the robot: "Technically it arrived. Nobody
     designed that. ease-out."
4. **Observe (compare replay).** Linear and ease-out entrances side by side at 0.25x.
   "In the last tenth of the move, which strap is moving slower?"
   - Correct: the ease-out one. -> "That end-of-move slowdown is the entire trick.
     Once you can see it in slow-mo, you'll start seeing it at full speed - on every
     channel."
   - Wrong -> the final tenth replays with speed trails: "Watch the trails: one is
     still at full speed when it stops, the other has almost parked already."
5. **Predict (transfer).** "The NN bug pops in with `scale` over 0.3s. Which easing
   does its transition want?"
   - *ease-out* **(correct)** -> "Entrances decelerate - slide or grow, same taste
     rule. One rule, every property."
   - *ease-in* -> "That bug would *slam* to full size. Arrivals land gently."
   - *linear* -> "Robot bug. Same conveyor-belt problem, smaller box."

- **Success criteria:** at least 4/5, and both ex. 1 (the taste tap) and ex. 2 (the
  kernel) correct; a missed kernel re-asks a fresh variant at the end ("fast start,
  gentle landing - which curve?").
- **Common wrong answers:** ease-in/ease-out swapped (ex. 2, 3 - the names are
  genuinely confusable; the feedback always re-anchors to start-fast-land-gently);
  "easing is optional polish" (ex. 1's feedback frames the stakes).
- **Duration:** 4 min.

---

## Lesson 5.5 - Exits ease in, and faster

- **New concept:** the exit rule-pair: outs accelerate away (`ease-in`) and run
  shorter than ins - and each direction gets its own transition, carried by the rule
  that is in force *after* the change.
- **Learner-facing explanation:** "Exits are entrances mirrored, and then some: an out
  accelerates away (`ease-in`) and runs *shorter* than the in. The graphic arrives
  like it matters and leaves like it's needed elsewhere. House pattern: in 0.5s
  ease-out, out 0.3s ease-in."
- **Context:** STOP gets its own tuning. The mechanism beat: which transition runs?
  The one in force *after* the change. PLAY puts the `on` label on - the `.on` rule's
  transition (written later, it wins) carries the entrance. STOP takes the label off -
  the base rule's transition is what remains, and it carries the exit. One transition
  per direction: that's how ins and outs get different speeds in pure CSS.
- **Recycles:** easing (5.4), the later-wins rule (5.3), STOP (1.2), the weather strap.

**Code slice (ex. 3-5):**
```css
.strap {
  transform: translate(0px, 60px);
  opacity: 0;
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
}
.on {
  transform: translate(0px, 0px);
  opacity: 1;
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
```

**Exercises**

1. **Observe.** Two exits play: a 1s ease-out float-away vs a 0.3s ease-in departure.
   "Tap the exit that belongs on air."
   - Correct: the crisp 0.3s ease-in. -> "The other one hangs around like it forgot
     something. Outs accelerate, and they're gone."
   - Wrong -> both replay in slow-mo: "The slow one *lands gently while leaving* -
     an entrance played backwards. Leaving means speeding up."
2. **Predict (kernel).** "The in is `0.5s ease-out`. Which is the right out?"
   - A) `0.3s ease-in` **(correct)** -> "Mirror the curve, drop the time. That
     asymmetry is the whole lesson - and most of what separates pro motion from
     'just reverse it'."
   - B) `0.5s ease-out` -> "That's the entrance, copied. Outs flip the curve AND run
     shorter."
   - C) `0.8s ease-in` -> "Right curve, wrong clock - an out never outstays its in."
   - D) `0.3s ease-out` -> "Quick, but it decelerates *while leaving* - backwards.
     Accelerate away: ease-in."
3. **Predict (mechanism).** "STOP is pressed and the `on` label comes off. Which
   rule's transition carries the move?"
   - A) The base `.strap` rule's. **(correct)** -> "With the label gone, `.on` no
     longer applies. What remains is in force - and its transition drives the way
     out."
   - B) The `.on` rule's. -> "That rule just switched off with its label. It carried
     the way *in*."
   - C) They average out. -> "CSS doesn't negotiate. One rule set is in force after
     the change; its transition runs."
4. **Fill (word bank).** "Tune the out in the base rule:
   `transition: transform ___ ___, opacity ___ ___;`"
   Banks: *0.3s* **(correct)** / *0.5s* / *1s*, and *ease-in* **(correct)** /
   *ease-out* / *linear*.
   - *0.5s* -> "Same length as the in - the exit will feel like it's dawdling. Outs
     run shorter."
   - *ease-out* -> render preview: "Watch it brake on the way out - that's arrival
     body language on a departure."
5. **Fix (taste first, syntax second).** The weather strap's out feels wrong. Step 1 -
   "Play the out. What's wrong with it?"
   - A) It floats away gently, like an entrance in reverse. **(correct)**
   - B) It's too fast. -> "Play it against the house 0.3s reference - this one is
     *slower* and softer, not faster."
   - C) It snaps. -> "It glides alright - watch the slow-mo. The problem is the
     *shape* of the glide."
   Step 2 - the code shows `transition: transform 0.5s ease-out, opacity 0.5s
   ease-out;` in the **base** rule. "Fix the out." Correct edit: `0.3s ease-in` on
   both.
   - Editing the `.on` rule instead -> "That rule carries the *entrance* - it's
     already right. The out lives in the rule that remains when the label comes off."

- **Success criteria:** at least 4/5; ex. 2 (the kernel) must be correct - if missed,
  a fresh variant closes the lesson (given in `0.4s ease-out`, pick the out).
- **Common wrong answers:** the symmetric out - "just reverse it" (ex. 2B; the
  asymmetry IS the concept); editing the wrong state's transition (ex. 5 - the
  which-rule-carries-which-direction model is what the checkpoint will probe).
- **Duration:** 4-5 min.

---

## Lesson 5.6 - One after another

- **New concept:** `transition-delay` - same move, later start; a small stagger
  between lines reads as designed.
- **Learner-facing explanation:** "`transition-delay` holds a move at the starting
  line: same speed, same length, later start. Give the title line a 0.12s delay and it
  lands a beat after the name. A stagger reads as *designed*; everything-at-once reads
  as cheap."
- **Context:** until now the whole strap moved as one - the parent moved and the lines
  rode along (Unit 2). For a stagger, each line makes its own entrance: PLAY now puts
  the `on` label on the strap *and* on each line (the readout shows all three change).
  Still the button's job - still trusted. One honest aside, stated on screen: "this
  delay also runs on the way out; at 0.12s you'll never see it, and Unit 6's timelines
  give in and out separate delays properly."
- **Recycles:** transitions and easing (5.3-5.4), children-move-with-parent (2.1), id
  selectors (3.3), type hierarchy - the important line leads (3.7), margin vs padding
  (4.4, ex. 2).

**Code slice (ex. 2-5):**
```css
.line {
  transform: translate(0px, 40px);
  opacity: 0;
  transition: transform 0.4s ease-out, opacity 0.4s ease-out;
}
#title {
  transition-delay: 0.12s;
}
.on {
  transform: translate(0px, 0px);
  opacity: 1;
}
```

**Exercises**

1. **Observe.** A delay slider on the title line, 0 to 0.5s; the student presses PLAY
   at several settings. "Find where the two lines stop feeling like one move. Roughly
   where did that happen?"
   - *around 0.3s and up* **(correct)** -> "Past about a quarter second the title
     reads as *late*, not choreographed. The house stagger sits near 0.1-0.15s -
     felt, not noticed."
   - *at 0.05s* -> "At 0.05s you can barely tell them apart - play 0.4s and feel the
     difference between a beat and a wait."
   - *never* -> "Play 0.5s again: name... pause... title. Two events. The design
     broke somewhere before that."
2. **Predict (kernel).** "We set `transition-delay: 0.2s` on the title. What changes
   about its move?"
   - A) It starts 0.2s later - same speed, same length. **(correct)** -> slow-mo
     preview: both lines travel equally fast, one simply leaves later. "Delay never
     touches speed. Duration owns speed; delay only moves the starting gun."
   - B) It moves slower. -> preview shows the truth: "Watch the slow-mo - once it
     goes, it's exactly as fast as the name line. Only the *start* moved."
   - C) It runs 0.2s shorter. -> "Nothing was taken off the move - it all still
     happens, just later."
3. **Predict.** "BOTH lines get `transition-delay: 0.2s`. What does the viewer see?"
   - A) The whole entrance starts a beat late - lines together again. **(correct)** ->
     "Equal delays cancel: no stagger, just lateness. A stagger is a *difference*
     between delays."
   - B) A stagger. -> "Staggering needs the lines to start at *different* times -
     these two wait out the same 0.2s side by side."
   - C) Nothing changes. -> "Something changed alright: PLAY now does nothing for a
     fifth of a second. Directors notice."
4. **Fill (word bank).** "Name lands first, title a beat behind:
   `#title { transition-delay: ___; }`" Bank: *0.12s* **(correct)**, *0.4s*, *-0.12s*.
   - *0.4s* -> "That's a whole move-length of waiting - two separate events, not one
     designed move. Keep the beat near a tenth of a second."
   - *-0.12s* -> "No time machines: a delay can't start a move before the button.
     To make the title lead, you'd move the delay to the *other* line instead."
5. **Fix.** The strap plays; the *title* lands first and the name trails. Code:
   ```css
   #name {
     transition-delay: 0.12s;
   }
   ```
   Step 1 - "Play it. Why does the strap feel upside-down?"
   - A) The less important line leads - hierarchy is backwards. **(correct)** -> "The
     name is the headline; the title supports it (Unit 3's hierarchy). The leader
     lands first."
   - B) The delay is too long. -> "0.12s is the house beat - the *length* is fine.
     Look at which line is wearing it."
   Step 2 - fix by moving the delay: selector bank *#title* **(correct)**, *.line*,
   *#name*.
   - *.line* -> "That delays *both* lines - equal delays cancel the stagger (you
     proved that two exercises ago)."
6. **Predict (space vs time).** "A designer wants a bigger gap *between* the name and
   the title while they fly in. Which property?"
   - *margin* **(correct)** -> "Margin is space on *screen*; delay is space in
     *time*. The gap between boxes never belonged to animation (4.4)."
   - *transition-delay* -> "Delay changes *when* the title moves, not *where* it
     sits. The on-screen gap would end up exactly the same."
   - *padding* -> "Padding is space *inside* a box - between its edge and its text
     (3.8). Between two boxes: margin."

- **Success criteria:** at least 5/6; ex. 2 (the kernel) must be correct - if missed,
  a mirror variant ends the lesson (delay on the score strap's away-team line: slower,
  shorter, or later?).
- **Common wrong answers:** delay-as-speed (ex. 2 - the headline misconception);
  staggering by giving lines different *durations* (called out in ex. 2's correct
  feedback: "duration owns speed" - different durations change the feel of each line,
  not just the timing); delays on the wrong line (ex. 5).
- **Duration:** 4-5 min.

---

## Lesson 5.7 - Choreography

- **New concept:** `@keyframes` + `animation` - a named multi-step routine with
  percentage stops, and `infinite` for motion that never ends.
- **Learner-facing explanation:** "A transition can only travel from A to B.
  `@keyframes` writes a whole routine - named stops from 0% to 100% - and `animation`
  performs it. The percentages are *progress through the routine* - not pixels, not
  seconds. And a routine can repeat forever: that's the ticker's engine."
- **Context:** two showpieces. First the NN bug pops in with an overshoot-and-settle -
  a middle position no transition could express. Then the sports ticker's crawl loops
  forever. A scrubbable timeline sits under the render.
- **Recycles:** scale and translate (5.1/5.2 - keyframes animate the same properties),
  easing names (5.4 - they work here too), the ticker's job (0.1), the accent color
  (3.5).

**Code slice A - the bug (ex. 1-3):**
```css
@keyframes pop {
  0%   { transform: scale(0); }
  60%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.on {
  animation-name: pop;
  animation-duration: 0.4s;
}
```

**Code slice B - the ticker (ex. 4-5):**
```css
@keyframes crawl {
  0%   { transform: translate(1920px, 0px); }
  100% { transform: translate(-1920px, 0px); }
}
#ticker-text {
  background-color: #e8b90c;
  animation-name: crawl;
  animation-duration: 20s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
```

**Exercises**

1. **Observe.** "Scrub the timeline to the 60% mark. What size is the bug?"
   - A) A little over full size. **(correct)** -> "1.15 - the overshoot. The routine
     deliberately goes *past* the target, then settles back. That's what makes a pop
     feel alive."
   - B) Nothing yet. -> "That's the 0% stop. Scrub forward - by 60% the bug has
     overshot."
   - C) Exactly full size. -> "Full size is where it *ends* (100%). At 60% it's mid-
     overshoot: 1.15."
2. **Predict (kernel).** Reading the `pop` block cold: "What happens at 60%?"
   - A) The bug has overshot to 1.15 - slightly too big, about to settle back.
     **(correct)** -> "You read a routine: at 60% *of the way through*, scale is
     1.15. Stops are progress markers."
   - B) The bug is 60 pixels wide. -> "Percent of the *routine*, not pixels. The size
     at that stop is whatever the stop says: scale(1.15)."
   - C) It's 0.6 seconds in. -> "Only if the duration were 1s. This routine runs
     0.4s, so 60% lands at 0.24s. The stops are progress, not clock time - the same
     routine can run at any speed."
   - D) The bug is 60% see-through. -> "That would be opacity - this routine animates
     scale. Keyframes change exactly the properties they name."
3. **Arrange.** The three stops of `pop`, shuffled. "Rebuild the routine: pop in,
   overshoot, settle."
   - Correct: `0% { transform: scale(0); }` / `60% { transform: scale(1.15); }` /
   `100% { transform: scale(1); }`
   - Ending on 1.15 -> render preview: the bug parks slightly too big, permanently:
     "The routine ends where its *last* stop says - the bug must rest at scale(1).
     100% is the landing."
   - Starting at scale(1) -> "Then there's no entrance - it begins already full size.
     Ready-to-enter is scale(0) (you parked it there in 5.2)."
4. **Fill (word bank).** "The crawl must never stop:
   `animation-iteration-count: ___;`" Bank: *infinite* **(correct)**, *100*, *1*.
   - *100* -> "A hundred laps at 20s is about half an hour - and then it stops. Live.
     On air. News never ends: infinite."
   - *1* -> "One lap and done - the ticker goes dark 20 seconds into the show."
5. **Predict (the linear payoff).** "Which easing does the crawl want:
   `animation-timing-function: ___`?"
   - *linear* **(correct)** -> "The one move where the robot wins. A crawl never
     arrives and never leaves - it just travels. Constant speed reads as calm;
     easing would make it surge and stall on every lap."
   - *ease-out* -> "Entrances decelerate - but a crawl has no entrance to land. It
     would slow to a near-stop at the end of every lap, then lurch."
   - *ease-in* -> "It would crawl away from every lap start, then sprint. Watch the
     preview - seasick yet?"
6. **Predict (discrimination).** "Could a *transition* alone perform the
   overshoot-and-settle?"
   - A) No - a transition travels start to end; the overshoot needs a middle stop.
     **(correct)** -> "That's the dividing line: two states, use a transition; a
     routine with stops in between, write keyframes."
   - B) Yes, with a longer duration. -> "Duration changes how *long* the trip takes,
     never its shape - A to B stays A to B."
   - C) Yes, with ease-out. -> "Easing shapes the *speed*, never the path. No easing
     goes past the target and comes back."

- **Success criteria:** at least 5/6; ex. 2 (the kernel) must be correct - if missed,
  a fresh variant ends the lesson (a 3-stop slide routine: "what happens at 50%?").
- **Common wrong answers:** percentages read as pixels or seconds (ex. 2 - the
  headline misconception, attacked with both wrong units); routines that end off-target
  (ex. 3); reaching for keyframes when two states and a transition would do (ex. 6's
  feedback states the dividing line).
- **Duration:** 5-6 min.

---

## Lesson 5.8 - Review remix (no new concept)

- **Purpose:** spaced retrieval across Units 1-5 before the checkpoint; adaptive - the
  app draws 6 exercises weighted toward the student's weakest recorded skills, with the
  fixed anchors below always included. Everything is anchored on the full
  on-air/off-air cycle over live video: each exercise ends with PLAY and STOP, not a
  static render. No kernel - a review introduces no new skill.
- **Learner-facing framing:** "Nothing new - one full lap: on air, off air, and
  everything that makes the trip smooth."
- **Fixed pool (each tagged with its source lesson):**
  1. **Fix** (5.3): the HIFK-TPS score strap snaps on PLAY. Its rule reads
     `transition: left 0.5s;` - `left` never changes; the changing property is
     `transform`. Find and fix, then play the cycle.
  2. **Fix** (5.5): James Okafor's strap leaves with `transition: transform 0.6s
     ease-out, opacity 0.6s ease-out;` in the base rule. Taste question first ("play
     the out - what feels wrong?"), then tune to `0.3s ease-in`.
  3. **Predict** (5.4): two silhouetted entrance replays, branding stripped, motion
     only. "Which one is ease-out?" (The silhouettes force reading the *motion*, not
     the graphic.)
  4. **Arrange** (5.7): the `pop` keyframe stops, shuffled - rebuild
     0% -> 60% -> 100% so the bug settles at scale(1).
  5. **Fill** (5.6): rebuild the stagger on the weather strap - which selector gets
     `transition-delay: 0.12s;` so the title trails Alexandra Rivera's name (bank:
     `#title`, `#name`, `.line`).
  6. **Predict** (5.1/5.2): the off-state rule reads `transform: translate(0px, 40px)
     scale(0); opacity: 0;`. "Before PLAY - where is the strap, what size, and is it
     deleted?" (Reading the parked state cold: below its pin, no size, very much
     still there.)
- **Success criteria:** at least 5/6. Any miss appends one more exercise from the same
  source lesson's pool (capped at 8 total).
- **Duration:** 4-5 min.

---

## Checkpoint 5 - "On air, off air"

- **Type:** Build (web: write the motion rules; phone: guided assembly - one rule at a
  time from chip banks, same checker).
- **Scenario:** a motion spec arrives from the NN design department, written like a
  real one:
  > **IN:** strap slides up 40px and fades in, 0.5s, decelerating; title follows
  > 120ms behind.
  > **OUT:** fade + slide down, 0.3s, accelerating.
- **Given code (the fully styled, positioned strap from Checkpoint 4, motion section
  empty):**
  ```html
  <div id="strap" class="strap">
    <img src="nn-logo.png">
    <div id="name" class="line">Maria Kranz</div>
    <div id="title" class="line">News Anchor</div>
  </div>
  ```
  ```css
  #strap {
    position: absolute;
    left: 120px;
    bottom: 96px;
    background-color: #0a3d91;
    padding: 24px;
  }
  ```
  The state-class seal is shown above the editor: "PLAY puts the `on` label on the
  strap and on each line; STOP removes it. Trust it for now - Unit 7 opens the
  buttons, Unit 8 shows the switch."
- **Tasks:**
  1. Write the off state: the strap parked 40px below its pin, invisible; the lines
     invisible.
  2. Write the on state (`.on`): home and fully visible.
  3. Give each direction its transition: the entrance (on the `.on` rule) 0.5s,
     decelerating; the exit (on the base rules) 0.3s, accelerating.
  4. Delay the title's entrance by 0.12s.
  5. Press PLAY, then STOP, over live video - then approve the taste replay.
- **Reference solution (one of the accepted shapes; the checker grades computed
  values, not text):**
  ```css
  .strap {
    transform: translate(0px, 40px);
    opacity: 0;
    transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  }
  .line {
    opacity: 0;
    transition: opacity 0.3s ease-in;
  }
  #title {
    transition-delay: 0.12s;
  }
  .on {
    transform: translate(0px, 0px);
    opacity: 1;
    transition: transform 0.5s ease-out, opacity 0.5s ease-out;
  }
  ```
- **Pass criteria (checked on computed values, with tolerance):**
  - Off state: the strap sits 40px below its pin (translate y = 40px, +-5px; a strap
    parked at 60px gets: "your strap parks 60px low - the spec says 40. Read the card,
    not the lesson.") and computes to opacity 0.
  - PLAY: transform and opacity glide over 0.5s (+-0.05s) with a decelerating curve
    (`ease-out` accepted; `ease` and `linear` fail with a slow-mo replay showing the
    landing).
  - The title's entrance starts ~0.12s (+-0.05s) after the name's; the name must not
    trail the title.
  - STOP: the way out runs 0.3s (+-0.05s) with an accelerating curve (`ease-in`), and
    the measured out is strictly shorter than the measured in.
  - Nothing snaps: every property that changes between the states is covered by a
    transition in both directions.
  - **The taste-approval replay (pass requires it, not just the numbers):** the app
    records the student's in and out and replays them back to back, twice, second
    time in slow-mo, over the live feed. Prompt: "Watch your in, then your out. Does
    your out feel *faster* than your in - does it leave like it's needed elsewhere?"
    The student must answer; answering "no" (or "yes" when the measured values
    contradict it) routes to the matching remediation instead of a pass. Taste stays
    in the loop even when the numbers are green.
- **Failure handling (diagnosis over verdict; each maps to its source lesson):**
  - Strap snaps instead of gliding, or one property glides while the other snaps ->
    "Something teleported - which property changed without a transition naming it?"
    -> micro-review 5.3.
  - Entrance curve wrong (linear or accelerating in) -> the slam replays in slow-mo:
    "Watch the landing." -> micro-review 5.4.
  - Exit curve wrong, or out not shorter than in -> "Your graphic leaves like it
    forgot something - outs accelerate and run shorter." -> micro-review 5.5.
  - No stagger, equal delays, or the name trailing the title -> "Both lines land
    together / the hierarchy is upside-down - who leads?" -> micro-review 5.6.
  - Wrong parking spot or wrong travel direction (strap enters downward) ->
    "Check where the strap waits before PLAY - the slide direction follows from the
    parking spot." -> micro-review 5.1.
  - After the linked micro-review, the checkpoint re-runs with fresh variant content
    (new presenter from the cast - e.g. James Okafor, Political Correspondent - and a
    reworded spec card with the same targets).
- **Duration:** 6-7 min.

**Unit 5 total learner time:** ~39-45 min across 9 sessions.
