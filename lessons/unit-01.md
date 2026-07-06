# Unit 1 - Hello, Graphic (full lesson plans)

**Unit goal:** demystify "a graphic is code": the student can look at a tiny template and
its rendered output, point at which code makes what, and make their first text edit.
**Promise:** after this unit you can read a tiny template and point at the code that
makes each thing appear on screen.
**Prerequisites:** Unit 0 - the student arrives knowing the graphic types by name, that
a graphic is a web page, and the three-jobs model. Unit 1 is "HTML says what's there",
made real.

## Conventions used in these plans

- Every exercise screen has three zones: the **render** (the graphic over a program
  feed or transparency view), the **code slice** (only the lines the student may touch;
  the SPX boilerplate is hidden), and the **task**. PLAY/STOP buttons are always present
  and really call the hidden template's `play()`/`stop()`.
- **Unit 1 code slices contain zero untaught tokens.** No ids, no classes, no
  attributes: bare `<div>`/`<span>`/text only. The strap's styling comes from hidden CSS
  the student never sees in this unit.
- Exercise types: **Observe** (tap a line/element), **Predict** (multiple choice),
  **Fill** (one blank, word-bank chips on phone / typing on web), **Fix** (find and
  correct a bug), **Arrange** (order blocks), **Type** (short free typing, web-leaning),
  **Build** (checkpoint assembly).
- All lessons are phone-complete. Feedback strings are written learner-facing and
  ready to localize.
- Running graphic: the **"Nightly News" strap** (channel NN), over a news-studio feed.

---

## Lesson 1.1 - Graphics are code

- **New concept:** each visible thing on screen corresponds to a line of code - the
  code always says exactly what the screen says.
- **Learner-facing explanation:** "You know the graphic is a web page. Now open one:
  each thing on screen comes from one line in the file. Match the words on screen to
  the words in the code - they are always identical."
- **Context:** the Nightly News strap ("Maria Kranz / News Anchor") is on air over the
  studio feed. The code slice sits next to it - the student's first *readable* code
  after Unit 0's cockpit tour.
- **Recycles:** the it's-a-web-page revelation (0.2), *lower third* by name (0.1),
  "HTML says what's there" (0.3).

**Code slice (used by ex. 1-3):**
```html
<div>NIGHTLY NEWS</div>
<div>Maria Kranz</div>
<div>News Anchor</div>
```

**Exercises**

1. **Observe.** "Tap the line of code that puts the presenter's *name* on screen."
   - Correct: `<div>Maria Kranz</div>` (line highlights, and the name pulses on the render).
   - Wrong `<div>News Anchor</div>`: "That line makes the smaller *second* line. Look for
     the words that match the name exactly."
   - Wrong `<div>NIGHTLY NEWS</div>`: "That's the show label at the top of the strap.
     The code always says exactly what the screen says."
2. **Observe.** "Now tap the line that makes the smaller line, 'News Anchor'."
   - Correct: `<div>News Anchor</div>`. Same wrong-answer feedback pattern as ex. 1.
3. **Predict.** "If we change `<div>Maria Kranz</div>` to `<div>Tomas Berg</div>`, what
   happens on screen?"
   - A) The strap shows *Tomas Berg* instead. **(correct)**
   - B) Nothing changes until we film new video. -> "The graphic isn't video - it's drawn
     live from the code, every time."
   - C) The graphic breaks. -> "Changing the words never breaks a graphic. The text in
     the file is simply what the screen shows."
   - D) Both lines change. -> "Only the line we edited changes. Each screen line has its
     own code line."
   - After answering, the change is applied live so the student *sees* A happen.
4. **Observe (transfer to a second graphic).** A hockey score strap renders:
   code slice `<div>HIFK 3 - 2 TPS</div>` among two decoy lines
   (`<div>SPORTS TONIGHT</div>`, `<div>LIVE</div>`). "Tap the code that produced the
   score."
   - Correct: the HIFK line. Wrong answers get: "Match the words on screen to the words
     in the code - they're always identical."
5. **Predict.** "The screen shows *Alexandra Rivera*. Which code made it?"
   - A) `<div>Alexandra Rivera</div>` **(correct)**
   - B) `<div>Maria Kranz</div>` -> "The code says Maria Kranz - so that's what the
     screen would say."
   - C) `Alexandra Rivera <div></div>` -> "Close - but here the name sits *outside* the
     tags. You'll learn in lesson 1.4 why that matters. The safe rule: the words live
     *between* the tags."

- **Success criteria:** at least 4/5 correct, including both Observe taps (ex. 1-2).
  On failure: replay ex. 1-2 with a fresh presenter name before continuing.
- **Common wrong answers:** matching the *position* on screen instead of the words
  (tapping the first code line for the top-of-screen item is right here, but students
  who guess by position get name/title swapped - feedback always redirects to "match the
  words").
- **Duration:** 3-4 min.

---

## Lesson 1.2 - PLAY and STOP

- **New concept:** graphics don't just appear - an operator *plays* them on air and
  *stops* them off; the template responds to those two commands.
- **Learner-facing explanation:** "In a control room, an operator presses PLAY to bring
  a graphic on air and STOP to take it off. Your template decides what those buttons do -
  that's what makes it a *template* and not a picture."
- **Context:** same strap; the PLAY/STOP buttons get a spotlight. Program feed running
  behind.
- **Recycles:** code <-> screen correspondence (1.1).

**Exercises**

1. **Observe (interactive).** "Press PLAY." (Strap animates in.) "Now press STOP."
   (Strap animates out.) Then: "What did PLAY do?"
   - A) Brought the graphic on air. **(correct)**
   - B) Started the studio video. -> "The video was already running - the operator only
     controls the *graphic* on top of it."
   - C) Saved the file. -> "Nothing was saved - PLAY performs the graphic, like pressing
     play on a song."
2. **Predict.** "The director says: *'Lose the strap.'* Which button does the operator
   press?"
   - STOP **(correct)** / PLAY -> "PLAY brings a graphic ON air. To take it off, the
     operator presses STOP."
3. **Predict.** The strap the student just played stays on stage as the anchor. "You
   just played this strap in, then out. Think back to Unit 0: a corner bug and a
   full-screen title come and go the same way every show. Of those three graphics, how
   many arrive with an animation?" (Framed as Unit-0 recall so the prompt never names a
   graphic the stage isn't showing.)
   - All three **(correct)** / only the strap / none -> "Broadcast graphics almost never
     pop on. They animate in and animate out - by Unit 5, you'll be the one making that
     motion." (Wrong "only the strap": "Even the little corner bug fades in.")
4. **Fill (word bank).** "The person in the control room who plays the graphics is
   called the ________." Bank: *operator* **(correct)**, *presenter*, *editor*.
   - *presenter* -> "The presenter is on camera. The operator sits at the graphics desk -
     you'll meet their screen in Unit 7."
5. **Observe (sequencing).** "Press PLAY, watch the strap come in - then tap the button
   that takes it off air." Requires the full cycle unaided.

- **Success criteria:** completes the PLAY -> STOP cycle without hints; at least 3/4 of
  the questions correct.
- **Common wrong answers:** pressing PLAY a second time to remove the graphic (feedback
  in ex. 2); thinking PLAY starts the video (ex. 1B).
- **Duration:** 3 min.

---

## Lesson 1.3 - The empty stage

- **New concept:** the canvas is a fixed 1920x1080 frame with a transparent background,
  because the graphic sits *over* the program video (keying).
- **Learner-facing explanation:** "Your graphic is drawn on an invisible sheet exactly
  1920 pixels wide and 1080 tall, laid over the video. Anywhere you don't draw stays
  see-through - that's why the news picture shows behind the strap."
- **Context:** a new UI control appears and stays for the whole course: the
  **over-video / transparency toggle** (checkerboard view).
- **Recycles:** PLAY/STOP (1.2) - graphics are checked over video before air; the
  lower-third name and job from 0.1 (ex. 5 asks the student to *recognize* one).

**Exercises**

1. **Observe.** Student flips the toggle: strap over studio feed <-> strap over
   checkerboard. "What does the checkerboard mean?"
   - A) Nothing is drawn there - the video will show through. **(correct)**
   - B) The graphic is broken. -> "It's the opposite of broken: the checkerboard is how
     we *show* see-through. On air, the program picture fills it."
   - C) That's the studio floor. -> "The checkerboard never goes on air - it's a preview
     pattern that means 'transparent'."
2. **Predict.** "We play this same template during a football match instead of the news.
   What appears behind the strap?"
   - A) The match video. **(correct)**
   - B) The news studio. -> "The template doesn't contain any video. It rides on top of
     whatever the channel is showing."
   - C) A checkerboard. -> "Checkerboard is preview-only. On air: the program picture."
3. **Predict.** "A designer fills the entire background with dark blue. What happens on
   air?"
   - A) The video is completely covered by blue. **(correct)** -> on the correct answer
     the stage shows it: the whole frame floods dark blue with the strap still on top.
     Follow-up note: "Full-screen graphics do exactly this *on purpose*. A lower third
     must never."
   - B) The blue becomes invisible. -> "Only *undrawn* areas are see-through. Painted
     areas cover the video."
   - C) Only the strap shows. -> "Everything you draw shows - including a background you
     didn't mean to draw."
4. **Fill (word bank).** "The canvas is always ______ x ______ pixels." Bank: *1920*,
   *1080*, *1280*, *720*.
   - *1280/720* -> "That's HD's little sibling. Broadcast graphics for SPX are authored
     at full HD: 1920 x 1080."
5. **Observe (taste seed).** Three renders of the same strap: floating mid-frame, sitting
   in the lower area, stretched full width. "Tap the one that looks like a real lower
   third." Correct: lower area.
   - Wrong -> "Lower thirds live in the lower part of the frame - the *lower third* of
     it. Unit 4 teaches exactly where."

- **Success criteria:** at least 4/5, and ex. 1 (the transparency meaning) must be
  correct - if missed, a variant is re-asked at the end of the lesson.
- **Common wrong answers:** "checkerboard = broken" is *the* misconception this lesson
  exists to kill; both ex. 1B and 2C target it.
- **Duration:** 4 min.

---

## Lesson 1.4 - Tag anatomy

- **New concept:** an element = opening tag + content + closing tag.
- **Learner-facing explanation:** "Each piece of a graphic is written as an *element*:
  an opening tag like `<div>`, the content, and a closing tag like `</div>`. Tags are
  instructions and never show on screen; the content is what shows."
- **Context:** the strap's name line, dissected with color-coding (opening tag /
  content / closing tag).
- **Recycles:** code <-> screen (1.1); the render is checked over video (1.3).

**Exercises**

1. **Observe (three taps).** `<div>Maria Kranz</div>` shown color-coded.
   "Tap the opening tag." -> `<div>`. "Tap the closing tag." -> `</div>`.
   "Tap the part that shows on screen." -> `Maria Kranz`.
   - Wrong taps get the zone's name and its job restated, e.g. tapping `</div>` for the
     opening tag: "That one has a slash - the slash means *closing*. Opening tags have
     none."
2. **Predict.** "What shows on screen from `<div>Tomas Berg</div>`?"
   - A) Tomas Berg **(correct)**
   - B) `<div>Tomas Berg</div>` -> "Tags never appear on screen - they're instructions
     to the machine. Only the content between them shows."
   - C) div -> "The tag's *name* is for the machine too. Viewers only ever see content."
3. **Fix.** The render shows the strap's second line has vanished. Code:
   ```html
   <div>Sports Tonight<div>
   <div>Tomas Berg</div>
   ```
   "The 'Sports Tonight' element never ends, so it swallowed the line after it. Tap the
   tag that's wrong." Correct: the second `<div>` on line 1; the fix choice offered is
   `</div>`.
   - Tapping line 2's tags -> "Line 2 is fine. The problem starts earlier: something was
     opened and never closed."
4. **Fill (word bank).** `<div>Alexandra Rivera` ____ - "Complete the element."
   Bank: `</div>` **(correct)**, `<div>`, `<//div>`, `(/div)`.
   - `<div>` -> "That *opens* another element. Closing tags carry one slash before the
     name: `</div>`."
   - `<//div>` -> "One slash only - `</div>`."
   - `(/div)` -> "Tags always use angle brackets `< >`, never parentheses."
5. **Arrange.** Blocks: `</div>` / `James Okafor` / `<div>` - "Build the element that
   puts *James Okafor* on the strap." Correct order: `<div>` `James Okafor` `</div>`.
6. **Predict (quick true/false).** "True or false: the viewer at home can see the word
   'div'." False **(correct)**; True -> "Never. If a viewer ever *does* see a tag on
   air, something is broken - you'll fix exactly that bug in Unit 2."

- **Success criteria:** at least 5/6; ex. 3 (the Fix) solved with at most one hint.
- **Common wrong answers:** missing-slash confusion (ex. 3, 4); believing tags render
  (ex. 2, 6) - both are re-tested in 1.5 and Unit 2's review.
- **Duration:** 5 min.

---

## Lesson 1.5 - Change the words

- **New concept:** the text between the tags is exactly what shows - editing it (and
  nothing else) changes the screen. The student's first real edit.
- **Learner-facing explanation:** "To change what a graphic says, change the text
  between the tags - nothing else. The tags stay; the words are yours."
- **Context:** tonight's rundown changed: a new presenter is on. The producer's note is
  shown as a real rundown card.
- **Recycles:** tag anatomy (1.4), PLAY (1.2), the code<->screen rule (1.1).

**Exercises**

1. **Observe.** Split screen: code and render. The instructor-hand edits
   `Maria Kranz` -> `Tomas Berg`; the render updates live. "Tap the only thing that
   changed in the code." Correct: the content. (Tags tapped -> "The tags didn't move.
   Edits happen *between* them.")
2. **Fill (word bank).** "Make the strap show *Alexandra Rivera*:
   `<div>__________</div>`"
   Bank: `Alexandra Rivera` **(correct)**, `<Alexandra Rivera>`, `"Alexandra Rivera"`.
   - `<Alexandra Rivera>` -> "Angle brackets create *tags*. A name is content - no
     brackets." (Render preview shows the name vanishing - the machine took it for a tag.)
   - `"Alexandra Rivera"` -> render preview shows the quotes ON AIR: "See the quote marks
     on screen? Content shows *exactly* as written - quotes included. Leave them out."
3. **Build-lite (the first edit).** The rundown card reads: *James Okafor - Political
   Correspondent*. "Update both lines, then press PLAY."
   ```html
   <div>Maria Kranz</div>
   <div>News Anchor</div>
   ```
   Phone: two blanks with word banks. Web: free typing. Auto-check compares rendered
   text to the card, trimmed; case differences pass but prompt: "On air this is exactly
   how it will read - match the card's capitals."
4. **Fix.** The render shows *Maria Kranz* unstyled in the top-left corner, outside the
   strap. Code: `<div></div>Maria Kranz`. "The name escaped its element, so it lost the
   strap. What happened?"
   - A) The text sits *outside* the tags, so the strap's box is empty. **(correct)** ->
     then drag the name between the tags to fix; PLAY confirms.
   - B) The name is spelled wrong. -> "Spelling is fine - position isn't. Where does
     content belong relative to the tags?"
   - C) PLAY wasn't pressed. -> "It's on air already - just in the wrong place. The code
     decides *where*, not the button."
5. **Predict.** "You change `<div>HIFK 3 - 2 TPS</div>` to `<div>HIFK 4 - 2 TPS</div>`
   and press PLAY. What does the score strap show?" Correct: *HIFK 4 - 2 TPS*.

- **Success criteria:** ex. 3 completed and played out; at least 4/5 overall.
- **Common wrong answers:** wrapping content in brackets or quotes (ex. 2 - both get a
  *visible* consequence, not just a message); placing text outside the element (ex. 4).
- **Duration:** 5 min.

---

## Lesson 1.6 - div and span

- **New concept:** `<div>` makes a line/box of its own; `<span>` marks a piece *inside*
  a line so it can be treated differently.
- **Learner-facing explanation:** "A `<div>` gets its own line or box on screen. A
  `<span>` wraps a few words *inside* a line - like just the score, or just the word
  LIVE - so that piece can get its own look."
- **Context:** the sports score strap. Hidden CSS highlights every `<span>` in NN
  yellow, so wrapping something in a span has an immediate visible payoff.
- **Recycles:** tag anatomy (1.4), editing content (1.5), transfer across graphics (1.1).

**Code slice:** `<div>HIFK <span>3</span> - 2 TPS</div>` - renders as
"HIFK **3** - 2 TPS" with the 3 highlighted.

**Exercises**

1. **Observe.** "The 3 is highlighted on screen. Tap the code responsible."
   Correct: the `<span>3</span>`.
2. **Predict.** "We wrap the 2 in a `<span>` as well. What changes?"
   - A) The 2 gets the same highlight. **(correct)**
   - B) The 2 moves to its own line. -> "That's what a *div* would do. Spans stay in the
     line."
   - C) Nothing. -> "Spans exist exactly so a piece of a line can be treated
     differently - here, highlighted."
3. **Predict (the key discrimination).** "We change the span around the 3 into a div:
   `<div>3</div>`. What happens?"
   - A) The 3 breaks onto its own line - the score falls apart. **(correct)** (Render
     preview shows it happening.)
   - B) The highlight gets brighter. -> "div vs span isn't about *strength* - it's about
     whether the piece gets its own line."
   - C) Nothing changes. -> "Try it - watch the render. A div always takes its own line."
4. **Fill (word bank).** "Highlight only the word LIVE:
   `<div><____>LIVE</____> from the Arena</div>`" Bank: *span* **(correct)**, *div*.
   - *div* -> "A div would push LIVE onto its own line, splitting the sentence. To mark
     words *inside* a line: span."
5. **Arrange.** Blocks: `<div>` / `TPS ` / `<span>` / `2` / `</span>` / `</div>` -
   "Build the away-team line with the score highlighted."
6. **Predict (two quick taps).** "A new line for the presenter's title - div or span?"
   -> div. "A highlighted word inside a headline - div or span?" -> span.
   - Wrong answers repeat the rule: "Own line -> div. Inside a line -> span."

- **Success criteria:** at least 5/6, and ex. 3 (the discrimination) must be correct;
  if missed, its mirror version (span -> div on the LIVE badge) is asked at the end.
- **Common wrong answers:** treating span/div as interchangeable (ex. 3, 4, 6 all
  attack this from different angles).
- **Duration:** 5 min.

---

## Checkpoint 1 - "Retitle the strap"

- **Type:** Build (phone-friendly: word-bank entry; web: typing).
- **Scenario:** the rundown card for tonight: *Sofia Lindqvist - Chief Political
  Editor*, and the badge must read *EXCLUSIVE*.
- **Given code (complete and working):**
  ```html
  <div>
    <div>Maria Kranz <span>LIVE</span></div>
    <div>News Anchor</div>
  </div>
  ```
  (The wrapper div is present but not yet explained - it is *visible* here as a gentle
  preview of Unit 2's nesting; the student only edits text.)
- **Tasks:** (1) change the name, (2) change the title line, (3) change the badge text,
  (4) press PLAY and check the result over video, (5) flip to transparency view and
  answer one recycled question: "Why is everything around the strap checkered?"
- **Pass criteria:** all three text nodes exactly match the rundown card (whitespace
  trimmed); the transparency question answered correctly; graphic played.
- **Failure handling (remediation, not retry-blindly):** each mismatch produces a
  visible diff against the card - e.g. "Your strap says *Sofia Lindquist* - check the
  spelling on the card." A structural break (deleted tag) shows the broken render plus:
  "Compare with the original - which closing tag went missing?" and offers a one-tap
  restore of the original to edit again. Two consecutive failures on the same task open
  the relevant micro-review (1.4 for tag damage, 1.5 for content placement).
- **Duration:** 5-6 min.

**Unit 1 total learner time:** ~25-31 min across 7 sessions.
