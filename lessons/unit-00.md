# Unit 0 - Welcome to On-Air (full lesson plans)

**Unit goal:** set the mindset before any code: know the everyday broadcast graphics by
name, understand that they are web pages ("if you can build a web page, you can build
TV graphics"), and know what HTML, CSS, and JavaScript each do - by sight, not by
skill.
**Promise:** after this unit you can name the graphics you see on TV, and say which of
the three languages makes what - the words, the look, or the motion.
**Prerequisites:** none. This is the true first contact: no code is written or edited
anywhere in this unit.

**A note on the no-untaught-tokens rule:** Unit 0 is a *guided tour*. Lessons 0.2-0.3
show real code the student cannot read yet - always labeled, color-coded, observe-only,
and framed as "you're looking at the cockpit, not flying yet". The rule that students
never *work on* code containing untaught tokens starts applying in Unit 1.

Conventions (render / code / task zones, exercise types, phone-complete) as in
unit-01.md.

---

## Lesson 0.1 - The graphics you already know

- **New concept:** the four everyday broadcast graphics and their names and jobs:
  **lower third**, **corner bug**, **ticker**, **full-screen**.
- **Learner-facing explanation:** "You've watched these graphics your whole life -
  today they get names. Every one of them is something you'll build in this course."
- **Context:** a highlights reel over real-feeling footage: a news studio, a hockey
  match, an election night. Graphics appear as they would on air.
- **Recycles:** n/a (first lesson of the course).

**Exercises**

1. **Observe.** The Nightly News strap slides in over the studio feed. "This one is
   called a *lower third*. Why, do you think?"
   - A) It lives in the lower third of the picture. **(correct)**
   - B) It's one third of the screen wide. -> "Widths vary - it's the *position* that
     names it. Look where it sits."
   - C) There are three of them. -> "Just one - sitting in the lower third of the
     frame. Position is the clue."
2. **Observe (multi-tap).** A busy sports frame: corner bug top-right, score strap
   lower-left, ticker crawling along the bottom. Name chips shown. "Tap the *corner
   bug*."
   - Tapping the ticker -> "That crawling band is the *ticker*. The bug is the small
     mark that never leaves its corner."
   - Tapping the score strap -> "That's a lower third doing sports duty. The bug is
     smaller, quieter, and glued to its corner."
3. **Match.** Four freeze-frames <-> four name chips: *lower third* / *corner bug* /
   *ticker* / *full-screen*. (Tap-to-pair; any wrong pairing snaps back with the
   graphic's one-line job description.)
4. **Predict.** "The channel wants viewers to always know what they're watching, no
   matter when they tune in. Which graphic does that job?"
   - Corner bug **(correct)**; lower third -> "Straps come and go with the story. The
     *bug* is the one that never leaves."
5. **Predict (two quick taps).** "Election results need the whole screen -> which
   type?" -> full-screen. "Breaking headlines running continuously under the show ->
   which type?" -> ticker.
   - Wrong answers repeat the jobs: "Full-screens *replace* the picture; tickers *ride
     along* the bottom."

- **Success criteria:** at least 4/5, and the Match (ex. 3) fully correct - these four
  names are the course's vocabulary and get used from Unit 1 onward.
- **Common wrong answers:** bug/ticker confusion (both "always there") - ex. 2 and 4
  attack it twice; naming by content instead of position (ex. 1B).
- **Duration:** 3-4 min.

---

## Lesson 0.2 - It's a web page

- **New concept:** modern broadcast graphics are built with the same technology as
  websites; a playout system (SPX / CasparCG) plays those pages out over the video. A
  *template* is a web page with changeable parts.
- **Learner-facing explanation:** "That lower third is not a video clip and not a
  Photoshop file - it's a web page, built with the exact same technology as any
  website. If you can build a web page, you can build TV graphics. This course teaches
  you the small slice of web-page building that TV needs."
- **Context:** the same NN strap shown three ways, side by side: (1) on air over the
  studio feed, (2) inside an ordinary browser window with a URL bar, (3) as a file icon
  named `lowerthird.html`.
- **Recycles:** lower third (0.1).

**Exercises**

1. **Observe.** Toggle between the browser view and the on-air view of the strap.
   "What's the difference between the web page and the on-air graphic?"
   - A) None - it's the same page, played out over the video. **(correct)**
   - B) The TV version is a video file. -> "No video was rendered. The page itself is
     shown live on air - which is why its text can change every show."
   - C) TV needs a special image format. -> "No conversion, no export. The channel's
     playout software shows the web page directly."
2. **Predict.** "So what do you need to be able to create modern broadcast graphics?"
   - A) The same skills used to make web pages. **(correct)** -> "That's the whole
     secret - and the whole plan for this course."
   - B) An expensive broadcast-only design suite. -> "The playout software this course
     targets - SPX with CasparCG - is free and open source. The graphics themselves are
     plain web files."
   - C) A TV-engineering degree. -> "The engineers keep the signal running. The
     *graphics* are made by people who learned exactly what you're about to learn."
3. **Predict (true/false).** "The strap on TV and a page in your browser can be the
   very same file." True **(correct)**; False -> "You just watched it: one file, two
   screens. That file is what you'll be reading in Unit 1."
4. **Fill (word bank).** "A broadcast graphic template is a file ending in ____."
   Bank: `.html` **(correct)**, `.mp4`, `.png`.
   - `.mp4` -> "A video can't change tonight's presenter name. An HTML page is *live* -
     its text changes every show."
   - `.png` -> "A picture is frozen. The template has to update, animate, and respond -
     that takes a page, not a picture."
5. **Predict.** "It's called a *template*, not just a page. Why?"
   - A) Because parts of it - like the name - get filled in fresh for every show.
     **(correct)** -> "Exactly. In Unit 7 you'll see who fills them in, and how."
   - B) Because it's unfinished. -> "It's completely finished - it just has *slots*.
     The design is fixed; tonight's content drops in."
   - C) Because it's a copy of another file. -> "No copying involved: one template
     serves every episode, with new content each time."

- **Success criteria:** at least 4/5; ex. 1 (same page, two screens) must be correct -
  it *is* the lesson.
- **Common wrong answers:** "TV graphics = rendered video/images" is the misconception
  this lesson exists to kill; ex. 1, 3 and 4 all target it from different angles.
- **Duration:** 3-4 min.

---

## Lesson 0.3 - Three languages, three jobs

- **New concept:** a template is written in three languages with three jobs: **HTML**
  says what's there, **CSS** says how it looks, **JavaScript** says what it does
  (motion and live data).
- **Learner-facing explanation:** "Every graphic is built from three languages, and
  each has exactly one job. HTML is the content - the actual words and pieces. CSS is
  the styling - colour, font, size, position. JavaScript is the behaviour - the motion
  now, and the live data later. Same strap on screen, three layers; you'll learn them
  in that order, always on real graphics." (The app states each job plainly - HTML =
  words, CSS = looks, JS = motion - with one "which language does this job?" check per
  language, before the switch-CSS-off payoff.)
- **Context:** the NN strap with three labeled layer switches: HTML / CSS / JS. Turning
  a layer off shows exactly what that language contributes. The code panel shows the
  template color-coded by language - a cockpit tour, observe-only.
- **Recycles:** the it's-a-web-page idea (0.2), lower third (0.1).

**Exercises**

1. **Observe.** Student switches CSS off: the strap collapses into plain black-on-white
   text in the top-left corner. "What did we just lose?"
   - A) The looks. **(correct)** -> "The words survived (HTML), and PLAY still works
     (JS) - but every color, font, and position was CSS."
   - B) The words. -> "Read the corner - the words are all still there, just undressed.
     Words are HTML's job."
   - C) The graphic entirely. -> "It's still there - naked. Only its *appearance* was
     CSS."
2. **Observe.** CSS back on; student switches JS off, then presses PLAY. Nothing
   happens; the rundown's name change never arrives. "What did we lose this time?"
   - A) The motion and the live data. **(correct)**
   - B) The colors. -> "The strap still looks perfect - it just won't *do* anything.
     Doing is JavaScript's job."
   - C) The text. -> "The old text is still there. What's gone is the ability to
     *change* and *move* - that's JS."
3. **Match.** Three code snippets <-> three language chips (snippets are observe-only;
   the tell-tale signs are given first: *HTML wears angle brackets; CSS pairs
   property: value inside braces; JS gives instructions ending in parentheses*):
   - `<div>Maria Kranz</div>` -> HTML
   - `.line { color: #ffffff; }` -> CSS
   - `play();` -> JS
   - Wrong pairings get the tell-tale repeated: e.g. "Angle brackets are HTML's
     uniform - nothing else wears them."
4. **Predict (three quick taps).** "Which language do you touch to..."
   - "...change the strap's color?" -> CSS
   - "...fix a typo in the presenter's name?" -> HTML
   - "...make the entrance slower?" -> JS
   - Wrong -> the job line repeats: "What's there = HTML. How it looks = CSS. What it
     does = JS."
5. **Fill (word bank, the metaphor).** "HTML is what's on stage. CSS is how it's
   ________. JavaScript is the ________." Bank: *dressed and lit* / *choreography*
   (+ distractors: *written*, *filmed*).
6. **Predict (the road ahead).** "Three languages - which will you meet first, starting
   in the very next lesson?"
   - HTML **(correct)** -> "Content first: you can't dress or move what isn't there.
     CSS arrives in Unit 3, JavaScript in Unit 6 - one small step at a time."
   - CSS / JS -> "Tempting - but you can't style or move what doesn't exist yet.
     What's-there comes first: HTML."

- **Success criteria:** at least 5/6, and ex. 4 (the three quick taps) fully correct -
  the three-jobs mapping is the mental model everything else hangs on.
- **Common wrong answers:** assigning looks to HTML (the most common beginner
  conflation - ex. 1, 3, 4 all separate them); expecting JS to be about text content
  (ex. 2C plants "content is HTML's job" early).
- **Duration:** 4 min.

---

## Checkpoint 0 - "Graphics spotter"

- **Type:** light observe/predict checkpoint - no building, fully phone-perfect.
- **Scenario:** "Watch tonight's broadcast like a graphics person." A ~30-second
  simulated NN segment plays (studio -> sports -> election handoff). It pauses four
  times, once per graphic.
- **Tasks:** (1-4) as each graphic appears, name it from the four chips (lower third,
  corner bug, ticker, full-screen); (5-7) three which-language questions in broadcast
  wording ("the strap's entrance feels too slow - which language is that?", "the
  presenter's surname is misspelled - which language?", "the channel rebrands to gold -
  which language?"); (8) one true/false: "This whole segment's graphics could be files
  ending in .html." (True.)
- **Pass criteria:** at least 7/8, including all four namings.
- **Failure handling:** a miss on naming replays the 0.1 gallery with names visible,
  then re-runs the segment with fresh graphic order; a miss on languages re-opens the
  0.3 layer-switch demo for the language that was missed - then one retry variant.
- **Duration:** 3-4 min.

**Unit 0 total learner time:** ~13-16 min across 4 sessions.
