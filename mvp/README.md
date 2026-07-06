# MVP - Unit 1 playable (proof of concept)

A working, dependency-free slice of the app, built to test the *pedagogy* with real
students: a taste of Unit 0 plus Unit 1 fully playable through Checkpoint 1.

## Run it

```sh
cd learn-html-gfx/mvp
py -m http.server 8770
# open http://localhost:8770/index.html   (phone-width; resize to test)
```

No build step, no dependencies - vanilla HTML/CSS/JS, matching the course's own "no
frameworks, no tooling" scope.

## What it proves

- **Exercises as data.** All content lives in `content.js` as plain objects; `app.js`
  is a generic engine that renders whatever type each step declares. Authoring a new
  lesson = adding data, not code.
- **A live, sandboxed renderer.** `renderer.js` is a 1920x1080 stage in a sandboxed
  iframe (`allow-scripts` only - exercise HTML runs in an isolated origin and can never
  touch the app). It carries the hidden "boilerplate": NN house-style CSS, the
  program-feed / transparency-checker backgrounds, and the PLAY/STOP in/out animation.
  Students only ever supply the body content; the stage does the rest - exactly the
  template-first model.
- **All six exercise types**, each rendering a live result:
  observe (tap the code, it cross-lights on air), predict (per-option feedback, and the
  change is applied live so the student sees the outcome), fill (word-bank chips update
  the graphic as you choose), fix (find the broken tag, watch the line reappear),
  arrange (Parsons), build (fill the strap from a rundown card, PLAY, check on air).
- **The beginner-safe error experience, literally.** Wrong answers produce a *visible*
  result, not a message: choosing `"Alexandra Rivera"` with quotes renders the quote
  marks on air; turning a `<span>` into a `<div>` breaks the score onto its own line.
  The DOM parser gives us these consequences for free.
- **Phone-first.** Single column, big tap targets, everything completable by tapping and
  word-banks - no typing required.

## Verified

Driven programmatically through all 18 steps in the browser: every exercise type reaches
correct completion with zero JavaScript errors; the sandboxed renderer receives draws;
wrong answers show their visible consequence and block advance until corrected; PLAY/STOP
and the video/transparency toggle are wired; observe cross-lighting highlights the right
element and resets between steps; the shipped iframe stays `sandbox="allow-scripts"`
(isolated origin). Confirmed visually: the NN lower third plays in over the studio feed in
the lower-left, correctly positioned, with the tapped code line cross-lit on air.

**Bug found and fixed during visual QA:** the 1920x1080 stage used `transform-origin:
center` plus grid centering, which pushed the scaled graphic *off the visible frame* -
the functional tests passed (messages delivered, DOM correct) but nothing showed on
screen. Fixed in `renderer.js` `fit()` by scaling from `top left` and letterbox-centering
the scaled box explicitly. This is exactly why visual verification matters even when the
logic checks out.

## Files

| File | Role |
|---|---|
| `index.html` | shell: stage, controls, task/feedback zones |
| `app.css` | broadcast identity - slate ground, amber tally-light accent, semantic green/red |
| `renderer.js` | the sandboxed 1920x1080 live graphic stage (iframe srcdoc) |
| `content.js` | Unit 0 taste + Unit 1 lessons + Checkpoint 1, as data |
| `app.js` | the generic exercise-player engine |

## Not in the MVP (deliberately)

Progression/mastery tracking, the warm-up deck, gamification, and Units 2-9 - all
designed (see the other deliverables) but out of scope for a pedagogy pilot. The point
of this slice is to put real lessons in front of real students and watch them learn.
