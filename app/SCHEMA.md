# App content schema (v1)

Course content lives in `app/content/unitNN.js`, one file per unit. Each file appends
one unit object to the global registry:

```js
window.COURSE_DATA = window.COURSE_DATA || [];
COURSE_DATA.push({
  id: 3,                        // unit number, used for ordering + gating
  title: "House Style",
  promise: "Restyle a lower third to match any channel's brand.",
  lessons: [ /* lesson objects, in order */ ]
});
```

## Lesson object

```js
{
  id: "3.1",                    // "N.M" or "cpN" for the checkpoint
  title: "A rule of style",
  concept: "one sentence - the single new concept",
  explain: "1-2 learner-facing sentences shown at lesson start",
  isCheckpoint: false,          // true on checkpoint lessons
  exercises: [ /* 2-6 exercise objects */ ]
}
```

## The render spec

Any exercise may carry `render` - what the live 1920x1080 stage shows when the
exercise loads. All fields optional:

```js
render: {
  html: "<div id=\"strap\">...</div>", // template body content
  css: "#strap { ... }",           // template CSS. If present, house style is OFF
                                    // unless house:true is also set.
  js: "function play(){...}",     // template JS. Runs in the sandboxed stage.
                                    // gsap.to/from/fromTo/timeline available (shim).
  house: true,                      // wrap html in the NN house-style strap look
                                    // (default: true when no css given, else false)
  kind: "lowerthird",              // house-mode graphic type (default lowerthird):
                                    //   "lowerthird" - blue name strap, lower-left
                                    //   "bug"        - small channel mark, top-right corner
                                    //   "ticker"     - full-width band on the bottom edge
                                    //   "fullscreen" - graphic that fills the 1920x1080 frame
                                    // The prompt must name the SAME graphic the render shows.
                                    // For a scene with several graphics at once, set
                                    // house:false and hand-write .gfx / .gfx bug markup
                                    // (the house stylesheet is always available).
  mode: "video" | "transparent",  // program feed vs checkerboard (default video)
  autoplay: true,                   // play the graphic in on load
  overlay: "grid" | "safe" | null // coordinate grid / title-safe overlay
}
```

PLAY behavior on the stage: if the template JS defines a global `play()`, PLAY calls
it (and STOP calls `stop()`); otherwise PLAY toggles the `on` class on the stage
root `#stage`, so pure-CSS motion is written as off-state + `#stage.on ...` state +
transition. Unit 0-5 exercises use the class mechanism; Unit 6+ may define play/stop.

The operator panel (see `operate` type) sends `update(jsonString)` to the template JS.

## Exercise types

Common fields: `type`, `prompt` (exact learner-facing text), optional `render`,
optional `kernel: true` (exactly one per lesson - the concept-defining exercise).

### observe - tap the responsible code
```js
{ type: "observe", prompt: "Tap the line that ...",
  lines: ["<div>NIGHTLY NEWS</div>", "<div>Maria Kranz</div>"],
  answer: 1,                       // index into lines
  highlight: "#name",             // optional CSS selector cross-lit on the stage
                                    // when correct (falls back to element index)
  feedback: { 0: "wrong-answer text for line 0", default: "generic nudge" } }
```

### predict - multiple choice with per-option feedback
```js
{ type: "predict", prompt: "...",
  options: [
    { text: "...", correct: true, feedback: "shown on correct" },
    { text: "...", feedback: "why this is wrong - reference the render" } ],
  applyOnAnswer: { html: "...", css: "...", play: true } } // optional: patch the
                                    // stage on the CORRECT answer so the student
                                    // sees the predicted outcome happen
```

### fill - one blank, word-bank chips
```js
{ type: "fill", prompt: "...",
  code: "<div>{{blank}}</div>",  // shown in the code zone; exactly one {{blank}}
  bank: ["Alexandra Rivera", "<Alexandra Rivera>"],
  answer: "Alexandra Rivera",
  slot: "html" | "css" | "js",  // which template layer the assembled code feeds;
                                    // the stage re-renders live on every chip pick
                                    // (wrong chips render their consequence!)
  feedback: { "<Alexandra Rivera>": "chip-specific wrong feedback" } }
```
When `slot` is set, the assembled code REPLACES that layer of the exercise's render
spec, so a wrong chip visibly misbehaves before the feedback text explains it.

### fix - find the broken token
```js
{ type: "fix", prompt: "...",
  tokens: ["<div>", "Sports Tonight", "<div>", "Tomas Berg", "</div>"],
  answer: 2,                       // index of the wrong token
  fixedToken: "</div>",
  fixedRender: { html: "...", play: true }, // stage patch on success
  feedback: { default: "nudge shown for any wrong token", 3: "token-specific" } }
```

### arrange - order shuffled blocks (Parsons), tap-to-place
```js
{ type: "arrange", prompt: "...",
  blocks: ["<div>", "  <div>Tomas Berg</div>", "</div>"], // CORRECT order here;
                                    // the player shuffles for display
  distractors: ["</span>"],       // optional wrong blocks that must be left unused
  slot: "html",                    // assembled result renders live when complete
  render: { ... },
  feedback: { default: "..." } }
```

### type - free typing (web; the player offers chips on narrow screens)
```js
{ type: "type", prompt: "Write the opening tag for a div with id \"score\".",
  answer: ["<div id=\"score\">", "<div id='score'>"], // any of these accepted;
                                    // matching trims + collapses whitespace
  placeholder: "<div ...>",
  slot: "html", code: "{{blank}}Maria Kranz</div>", // optional context template
  feedback: { default: "..." } }
```

### build - multi-field assembly against a rundown card (checkpoints)
```js
{ type: "build", prompt: "...",
  card: { name: "James Okafor", title: "Political Correspondent" }, // shown as card
  template: "<div>{{name}}</div><div>{{title}}</div>", // {{key}} slots
  slot: "html",
  fields: [
    { key: "name", label: "Name line", bank: ["James Okafor", "Maria Kranz"],
      answer: "James Okafor" } ],
  successFeedback: "...",
  render: { ... } }
```

### operate - drive the template from the simulated SPX operator panel (Unit 7+)
```js
{ type: "operate", prompt: "Retitle the strap for tonight's guest and play it out.",
  render: { html: "...", css: "...", js: "...full wired template js..." },
  panel: [                          // the DataFields the panel shows
    { id: "f0", label: "Name", value: "" , expect: "Sofia Lindqvist" },
    { id: "f1", label: "Title", value: "", expect: "Chief Political Editor" } ],
  check: [                          // probed on the stage after Update+Play
    { sel: "#f0", text: "Sofia Lindqvist" },
    { sel: "#f1", text: "Chief Political Editor" } ],
  successFeedback: "...", feedback: { default: "..." } }
```
The panel has Update / Play / Stop buttons; Update sends `update(JSON.stringify(values))`
into the template. `check` entries may test `text` (textContent) or `style: {prop: val}`
(computed style, camelCase prop names).

## Authoring rules

- Every exercise's code must contain only concepts taught before that lesson (the
  lesson plans are the source of truth).
- Keep code SHORT - the code zone is a phone screen. Prefer 3-8 line slices.
- Every wrong answer needs specific feedback; use render consequences wherever the
  wrong choice produces one.
- Escape quotes carefully - these are JS string literals. Prefer double-quoted HTML
  attributes inside single-quoted... no: use double quotes in code and escape (\")
  or use template literals with backticks when multiline.
- Plain dashes only, ASCII only.
- The GSAP shim supports: gsap.to/from/fromTo(target, {x, y, scale, opacity,
  duration, delay, ease, stagger}), gsap.timeline() with chained .to/.from/.fromTo
  and the position parameter ("-=0.2", "+=0.1", or absolute seconds). Ease names:
  "none", "power1.out", "power1.in", "power2.out", "power2.in", "power2.inOut",
  "back.out". Nothing else exists - author within this subset.
