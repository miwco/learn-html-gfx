# Unit 7 - Making It Live (full lesson plans)

**Unit goal:** open the boilerplate at last: the SPX contract. Students wire a
template so an operator can change its content and play it - the course's biggest
payoff.
**Promise:** after this unit you can wire a template so an operator can retitle and
play it without touching code.
**Prerequisites:** Units 0-6 (function *calls* fluent; ids solid).
**SPX grounding:** classic-globals dialect throughout (`play()`, `stop()`,
`update(data)` with a JSON string, `fN` <-> `id="fN"`); definition placed last in
`<head>`; first two DataFields feed the rundown preview.

**Conventions:** as in unit-01.md. Two unit-specific stage devices:
- The **console strip** from 6.1 returns for 7.3-7.6: a one-line JS sandbox under the
  render where the student runs single statements and sees the consequence live.
- The **boilerplate unseals progressively**: 7.2 opens the `play()`/`stop()` seal
  (placed in 1.2/5.3), 7.6 reveals `update`, 7.8 opens the 2.6 "definition" seal. By
  the checkpoint, nothing in the template is hidden any more.
- One **kernel** exercise per lesson is marked **(kernel)** - the discrimination that
  *is* the concept, per the progression model.

Running graphics: the **Nightly News strap** (branded and GSAP-animated since
Checkpoint 6), the **weather strap** (city + `<img id="icon">`), the **score strap**,
and the **NN bug**.

---

## Lesson 7.1 - Writing the recipe

- **New concept:** *defining* a function - `function flash() { ... }` stores a named
  recipe that does nothing until someone calls it by name. The student has been
  *calling* recipes since 6.1; now they write one.
- **Learner-facing explanation:** "Since Unit 6 you've been *calling* recipes:
  `gsap.to(...)` runs someone else's instructions. Today you write your own:
  `function flash() { ... }` - the word `function`, the name you choose, empty
  parentheses, and the recipe's steps between the braces. Writing it down runs
  nothing. It waits, under its name, until something calls it."
- **Context:** a third button appears next to PLAY/STOP: **MY BUTTON**. The app wires
  nothing - the button simply calls `flash()`. If a recipe by that name exists, it
  runs; if not, nothing happens. The student experiences both states.
- **Recycles:** function calls (6.1), `fromTo` (6.5), the settings object (6.2),
  id targets (3.3/6.1).

**Code slice (used by ex. 1-3):**
```js
function flash() {
  gsap.fromTo("#strap", { opacity: 0 }, { opacity: 1, duration: 0.5 });
}
```

**Exercises**

1. **Observe (three taps, the 1.4 anatomy pattern).** The definition shown
   color-coded. "Tap the recipe's *name*." -> `flash`. "Tap the part that marks it as
   a recipe." -> `function`. "Tap the steps that run when it's called." -> the body
   between `{ }`.
   - Tapping `gsap.fromTo(...)` for the name -> "That's a step *inside* the recipe -
     a call you know from Unit 6. The recipe's own name sits right after the word
     `function`."
   - Tapping `()` for the body -> "The parentheses are part of the recipe's name tag.
     The steps live between the *braces*."
2. **Predict.** **(kernel)** "You type the definition above into the template and
   press enter. Does the strap flash?"
   - A) No - nothing moves until something *calls* `flash()`. **(correct)**
   - B) Yes, immediately. -> "Writing a recipe down doesn't cook the meal. Watch the
     render: nothing moved. Definitions wait to be called."
   - C) Yes, but only once. -> "Not even once. The steps inside the braces are
     stored, not run. Calling the name runs them - as many times as it's called."
3. **Observe (interactive).** "Now press MY BUTTON." (The strap flashes.) "Press it
   again." (It flashes again.) "What does MY BUTTON do?"
   - A) It *calls* `flash()` - and the stored recipe runs. **(correct)**
   - B) It contains the animation itself. -> "The button holds nothing but a name.
     Delete the definition and the button goes dead - the recipe is yours, in the
     code."
   - C) It re-types the definition. -> "The definition was written once. Calling runs
     it - defining and running are two different moments."
4. **Fill (word bank).** "Write a recipe named `pop` for the corner bug:
   `function ____() { gsap.from("#bug", { scale: 0, duration: 0.4 }); }`"
   Bank: `pop` **(correct)**, `pop()`, `gsap`, `#bug`.
   - `pop()` -> "The parentheses are already there, right after the blank. The name
     alone goes in: `pop`."
   - `gsap` -> "gsap is the tool the recipe *uses*. The recipe's own name is yours to
     choose - and here the task says `pop`."
   - `#bug` -> "That's the *target* inside the step. The recipe's name comes after
     the word `function`."
5. **Arrange.** Blocks: `function` / `pop` / `()` / `{` /
   `gsap.from("#bug", { scale: 0, duration: 0.4 });` / `}` - "Build the complete
   recipe."
   - Body placed outside the braces -> "Steps outside the braces don't belong to the
     recipe - they'd run immediately, on their own. Everything the recipe owns lives
     between `{` and `}`."
6. **Predict (define-vs-run, second angle).** "A template contains
   `function flash() { ... }` and MY BUTTON is never pressed all evening. How many
   times does the strap flash?"
   - A) 0 **(correct)** - "Defined, never called: the recipe just waits. Tomorrow you
     meet the caller that matters - SPX itself."
   - B) 1 -> "Defining is not a first run. Zero calls, zero flashes."
   - C) It flashes continuously. -> "Nothing loops here. No call, no run."

- **Success criteria:** at least 5/6, and ex. 2 (the kernel) correct - if missed, a
  fresh variant (define `pop`, don't press the button) is asked at the end.
- **Common wrong answers:** define-means-run (ex. 2, 3, 6 attack it from three
  angles - it must be dead before 7.2, where SPX becomes the caller); putting the
  call's parentheses into the name blank (ex. 4).
- **Duration:** 4 min.

---

## Lesson 7.2 - SPX calls, you answer

- **New concept:** the lifecycle contract - SPX itself calls *your* `play()` and
  `stop()`; your job is to put the right recipes under those exact names. The PLAY
  button's magic, formally explained at last.
- **Learner-facing explanation:** "Here's the deal the template makes with SPX: when
  the operator presses PLAY, SPX calls a function named exactly `play()`. On STOP it
  calls `stop()`. SPX doesn't care what's inside them - that's your side of the
  contract. Put your in-timeline under `play`, your out-timeline under `stop`, and
  the buttons you've trusted since lesson 1.2 are finally yours."
- **Context:** the hidden boilerplate slides open with a reveal animation - and there
  they are, two definitions shaped exactly like 7.1's: `function play()` and
  `function stop()`. The 1.2 and 5.3 "trust it for now" seals visibly come off. The
  student's Checkpoint 6 timelines are moved inside.
- **Recycles:** defining (7.1), timelines + overlap (6.6/6.7), eases (6.3), PLAY/STOP
  as the operator's commands (1.2).

**Code slice (used by ex. 1-2):**
```js
function play() {
  gsap.timeline()
    .fromTo("#strap", { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
    .fromTo("#title", { opacity: 0 },
            { opacity: 1, duration: 0.4 }, "-=0.2");
}

function stop() {
  gsap.to("#strap", { opacity: 0, duration: 0.3, ease: "power2.in" });
}
```

**Exercises**

1. **Observe (interactive).** "Press PLAY." A call arrow animates across the screen:
   **SPX -> play() -> the timeline**, and the strap slides in. "Who called `play()`?"
   - A) SPX - the playout system calls it whenever the operator presses PLAY.
     **(correct)**
   - B) The timeline. -> "The timeline is what play() *runs* - the last stop on the
     arrow, not the first. Follow it from the left: SPX starts the chain."
   - C) You, by defining it. -> "7.1's rule: defining runs nothing. You wrote the
     recipe; SPX is the one who calls it."
2. **Predict.** **(kernel)** "We rename `play` to `start` - the timeline inside is
   untouched. The operator presses PLAY. What happens?"
   - A) Nothing - SPX calls the name `play`, and nobody answers to it any more.
     **(correct)** (The render confirms: PLAY pressed, strap stays off air.)
   - B) The strap animates in as before. -> "Try it - dead button. The contract is a
     *name* agreement: SPX calls exactly `play()`. A recipe under any other name is
     never called."
   - C) SPX finds `start` because it does the same thing. -> "SPX never reads inside
     your functions - it only calls the agreed names. `start` could contain anything;
     SPX will never know it exists."
3. **Fill (word bank).** "Your out-timeline must run when the operator takes the
   strap off air. Name the recipe:
   `function ____() { gsap.to("#strap", { opacity: 0, duration: 0.3, ease: "power2.in" }); }`"
   Bank: `stop` **(correct)**, `play`, `out`, `off`.
   - `play` -> "That name runs on PLAY - your entrance would fire when the director
     says 'lose the strap'. The off-air name in the contract is `stop`."
   - `out` / `off` -> "Good instinct, wrong contract. SPX only calls two playout
     names: `play` and `stop`. Off air = `stop`."
4. **Fix.** The render misbehaves: PLAY fades the strap *out*; STOP slides it *in*.
   Code: the 7.2 slice with the two bodies swapped. "The in and out moves answered to
   the wrong names. Tap what to swap." Correct: the two bodies (accepting a tap on
   either body; the fix offered swaps them).
   - Tapping the eases -> "The eases are correct for their moves - power2.out on the
     entrance, power2.in on the exit (Unit 6 taste). The moves are just under the
     wrong *names*."
   - Tapping `function` keywords -> "Both definitions are well-formed. Read what each
     one *does* against what its name promises SPX."
5. **Predict.** "A template defines `play()` but no `stop()` at all. The strap is on
   air and the operator presses STOP. What happens?"
   - A) Nothing runs - the strap stays on air. **(correct)** - "SPX calls a name
     nobody answers to. On a real broadcast this is a stuck graphic - by the
     checkpoint, your templates always answer both calls."
   - B) SPX removes the graphic itself. -> "SPX only *calls*. If your template
     doesn't define the exit, there is no exit."
   - C) The template breaks permanently. -> "No harm done - just no response. Define
     `stop()` and the button comes alive."

- **Success criteria:** at least 4/5, and ex. 2 (the kernel) correct - if missed, its
  mirror variant (rename `stop` to `hide`, press STOP) is asked at the end.
- **Common wrong answers:** believing the names are decorative (ex. 2, 3, 5 - the
  contract-is-a-name-agreement idea is this lesson's whole payload); crediting SPX
  with reading the function bodies (ex. 2C, 5B).
- **Duration:** 4 min.

---

## Lesson 7.3 - Grab the element

- **New concept:** `document.getElementById("name")` - JS reaching into the page and
  holding one element, found by its Unit 2 id. (Grabbing only - changing what it
  shows is 7.4.)
- **Learner-facing explanation:** "JS can reach into the page and take hold of any
  element - by the id you gave it in Unit 2. `document.getElementById("name")` means:
  in this document, get the element whose id is `name`. One id, one element, one
  grip. And note: the name goes in *alone* - no hash. The hash is CSS spelling."
- **Context:** the console strip returns. Every successful grab is visualized: the
  grabbed element lights up on the render with a "held" outline, so an empty grab is
  *visibly* empty.
- **Recycles:** ids (2.3), dot-and-hash selectors (3.3 - now contrasted), the id
  strings GSAP targets use (6.1 - which *do* wear the hash, like CSS).

**Exercises**

1. **Observe (interactive).** Three prepared lines in the console strip:
   `document.getElementById("name")`, `document.getElementById("title")`,
   `document.getElementById("bug")`. "Run each line and watch the render. Then tap
   the element the *third* line grabbed." Correct: the corner bug lights up.
   - Tapping a strap line -> "That was one of the first two grabs. The third asked
     for the id `bug` - the grip always matches the id, letter for letter."
2. **Predict.** "`document.getElementById("title")` - which element lights up?"
   - A) The title line. **(correct)**
   - B) The name line. -> "The grip goes where the id points. `title` is the second
     line's badge - Unit 2 gave it that name."
   - C) Both strap lines - they share `class="line"`. -> "getElementById finds by
     *id* - one of a kind, one element. Reaching a whole class from JS comes in
     Unit 8."
3. **Fill (word bank).** "Grab the corner bug: `document.getElementById("____")`"
   Bank: `bug` **(correct)**, `#bug`, `nn-logo.png`, `img`.
   - `#bug` -> "No hash here - that's how *CSS* marks an id. getElementById already
     knows it's getting an id: the name goes in alone."
   - `nn-logo.png` -> "That's the image *file* (src). Elements are grabbed by their
     id."
   - `img` -> "That's the tag's type. The grip needs the one element's own name -
     its id."
4. **Fix.** **(kernel)** The console strip shows a grab that came back *empty* - no
   element lights up, and a friendly error overlay reads: "Nothing in this template
   has the id `#name`."
   ```js
   document.getElementById("#name")
   ```
   "The grip closed on nothing. Tap the problem." Correct: the `#` inside the
   quotes; the fix offered removes it.
   - Tapping `document` or `getElementById` -> "The tool is spelled correctly. Read
     what's *inside* the quotes against the id in the HTML: is there an element whose
     id is, literally, hash-n-a-m-e?"
   - Tapping the quotes -> "Quotes belong - the id goes in as text. The stowaway is
     the hash: getElementById wants the name alone."
5. **Predict (two quick taps - the CSS/JS contrast).** "In CSS, target the name
   line: `#name` or `name`?" -> `#name`. "In `getElementById(...)`: `"name"` or
   `"#name"`?" -> `"name"`.
   - Wrong -> "The hash is CSS's marker meaning 'this is an id, not a tag'.
     getElementById takes *only* ids, so the marker would just be a wrong
     character. CSS (and GSAP targets): with hash. getElementById: without."

- **Success criteria:** at least 4/5, and ex. 4 (the kernel) correct - if missed, a
  fresh variant (`"#title"`) is asked at the end.
- **Common wrong answers:** the hash inside getElementById - the single most common
  beginner DOM bug, taught *proactively* here (ex. 3, 4, 5 all rehearse it before
  the student ever meets it in the wild); expecting a class-wide grab (ex. 2C).
- **Duration:** 4-5 min.

---

## Lesson 7.4 - Change what it shows

- **New concept:** `.textContent` sets a grabbed element's text from JS - the 1.5
  edit, performed by code; its sibling `.src` swaps a grabbed image's file.
- **Learner-facing explanation:** "Once you hold an element, you can change what it
  shows: `.textContent` is its text, `.src` is its image file. Write
  `document.getElementById("name").textContent = "Tomas Berg";` and the strap changes
  live, on air - your Unit 1 edit, now done by code. That's the trick everything
  'live' is built on."
- **Context:** the console strip, on air over the program feed. One line retitles the
  strap; one line turns the weather from sun to rain. The student watches code do
  what their fingers did in 1.5 and 2.5.
- **Recycles:** grabbing (7.3), text-is-what-shows (1.5), img src + the asset drawer
  (2.5), ids (2.3).

**Code slice (used by ex. 1):**
```js
document.getElementById("name").textContent = "Tomas Berg";
document.getElementById("icon").src = "weather-icon-rain.png";
```

**Exercises**

1. **Observe (interactive).** "Run the first line." (The strap's name changes on
   air.) "Run the second." (Sun becomes rain.) "Which line changed a *picture*?"
   Correct: the `.src` line.
   - Choosing the `.textContent` line -> "That one rewrote text. Pictures live in
     `src` - the same attribute you edited by hand in 2.5, now set from JS."
2. **Predict.** "We run: `document.getElementById("title").textContent = "Sports Reporter";`
   Which line of the strap changes?"
   - A) The title line. **(correct)**
   - B) The name line. -> "Follow the grip: the id in the parentheses says `title`.
     The text lands wherever the grip holds."
   - C) Both lines. -> "One id, one element, one change. To change both lines you'd
     write two lines of code - which is exactly what update() will do in 7.6."
3. **Predict.** **(kernel)** "A colleague writes: `"name".textContent = "Tomas Berg";`
   - the id, with `.textContent` attached straight to it. Does the strap change?"
   - A) No - `"name"` is just a piece of text, not the element. You must *grab* the
     element first, then set its textContent. **(correct)**
   - B) Yes - JS knows which element you mean. -> "JS knows nothing of the sort.
     Text in quotes is only text. The bridge from an id to its element is
     getElementById - no bridge, no change."
   - C) It renames the element's id. -> "Nothing was grabbed, so nothing was
     touched. Grab first, set second - always two steps, even on one line."
4. **Fix.** The console strip errors: a friendly overlay reads "You're assigning to
   the element itself - what *part* of it should change?"
   ```js
   document.getElementById("name") = "Alexandra Rivera";
   ```
   "Something is missing between the grab and the `=`. Tap where." Correct: between
   `)` and `=`; the fix offered inserts `.textContent`.
   - Tapping the id -> "The grab is fine - it holds the name line. But you can't
     assign words to a whole element; you assign to its `.textContent`."
   - Tapping the new name -> "The text is what you *want* on air. The missing piece
     is the property that receives it."
5. **Type (web; Arrange on phone).** "The rundown changed: put *James Okafor* in the
   name line - one full line of JS." Accept
   `document.getElementById("name").textContent = "James Okafor";` (semicolon
   optional; single quotes accepted with the 2.3 note about double quotes). Phone
   blocks: `document.getElementById(` / `"name"` / `)` / `.textContent` / `=` /
   `"James Okafor"` / `;`.
   - Rendered check: the strap must read James Okafor on air. A hash in the id
     revives 7.3's overlay and feedback.

- **Success criteria:** at least 4/5, and ex. 3 (the kernel) correct - if missed, a
  fresh variant (setting `.src` on the bare string `"icon"`) is asked at the end.
- **Common wrong answers:** setting text on the id string instead of the grabbed
  element (ex. 3 - the headline misconception; ex. 4 is its cousin, dropping
  `.textContent` entirely); using `.textContent` for images (ex. 1's feedback plants
  the `.src` discrimination).
- **Duration:** 4-5 min.

---

## Lesson 7.5 - A labeled bundle

- **New concept:** an object is a bundle of labeled values; `data.f0` reads the value
  labeled `f0` out of the bundle.
- **Learner-facing explanation:** "Tonight's strap content arrives as a *bundle of
  labeled values*: `{ f0: "Maria Kranz", f1: "News Anchor" }`. Each label tags one
  value, like luggage tags. `data.f0` means: from the bundle called data, give me the
  value tagged `f0`. The labels are f0, f1, f2 ... because that's how SPX ships
  operator fields - you'll see the full logic of that naming in lesson 7.7."
- **Context:** "tonight's rundown data" rendered as a luggage-tag visual - two tags
  hanging off one bundle. The console strip holds the bundle, already opened (how it
  *arrives* - sealed - is tomorrow's lesson, 7.6). Tapping a tag pops its value out.
- **Recycles:** the settings object (6.2 - "you've been *writing* bundles since
  Unit 6; now you *read* one"), the strap's two-line content (1.1).

**Code slice (used by ex. 1-4):**
```js
data = { f0: "Maria Kranz", f1: "News Anchor" }
```

**Exercises**

1. **Observe (interactive).** "Tap the tag `f1` on the bundle." (Its value, *News
   Anchor*, pops out.) "Now run `data.f0` in the console strip. What came out?"
   - A) Maria Kranz **(correct)**
   - B) f0 -> "f0 is the *tag*. Reading `data.f0` hands you what hangs off the tag -
     the value."
   - C) The whole bundle. -> "The dot picks one tag. `data` alone is the whole
     bundle; `data.f0` is one value out of it."
2. **Predict.** "`data.f1` - what comes out?"
   - A) News Anchor **(correct)**
   - B) Maria Kranz -> "That value hangs off `f0`. Count the tags: f0 first, f1
     second - the labels do the choosing, not the order you read them in."
   - C) `"News Anchor"` with the quotes. -> "The quotes are the code's packaging
     (remember 1.5's on-air quote marks?). The value itself is the bare text."
3. **Fill (word bank).** "Read the presenter's *name* out of the bundle:
   `data.____`" Bank: `f0` **(correct)**, `f1`, `name`, `data`.
   - `f1` -> "That tag holds the job title. The name hangs off the first tag - f0."
   - `name` -> "There's no tag called `name` in this bundle. SPX ships fields as f0,
     f1, ... Read the tags that exist."
   - `data` -> "`data` is the bundle itself. After the dot comes a *tag*."
4. **Fix.** **(kernel)** The console strip shows a read that came back empty -
   nothing pops off the bundle:
   ```js
   data.name
   ```
   "You asked for a tag this bundle doesn't have, so you got nothing - no error, no
   warning, just nothing. Tap the problem, then fix it from the bank."
   Correct: `name`; fix: `f0` (bank: `f0`, `f1`, `"name"`).
   - Tapping `data` -> "The bundle is real and full. The tag you asked it for isn't.
     Read the labels that exist, not the ones you wish existed."
   - Fixing with `"name"` -> "Quotes don't create the tag. This bundle's tags are f0
     and f1 - nothing else."
5. **Predict (recycle 6.2).** "You've written bundles before:
   `gsap.to("#strap", { x: 0, opacity: 1 })`. In that call, what is `opacity`?"
   - A) A label in a bundle, tagging the value 1. **(correct)** - "Same shape all
     along: labels and values in braces. Unit 6 you wrote them for GSAP to read;
     now SPX writes them for *you* to read."
   - B) An element id. -> "Ids live in HTML and in quotes here (`"#strap"`).
     Inside the braces it's labels-and-values - a bundle."
   - C) A function. -> "No parentheses, no call. `opacity: 1` is a labeled value,
     nothing more."

- **Success criteria:** at least 4/5, and ex. 4 (the kernel) correct - if missed, a
  fresh variant (`data.title` against an f0/f1 bundle) is asked at the end.
- **Common wrong answers:** inventing label names that "should" exist (ex. 3, 4 -
  the silent empty read is deliberately *experienced*; it plants 8.7's
  check-the-exact-name debugging instinct); confusing tag with value (ex. 1B, 2B).
- **Duration:** 4 min.

---

## Lesson 7.6 - Unpack the delivery

- **New concept:** `update(data)` - the third contract function - receives the bundle
  as a JSON *string* (sealed freight); `JSON.parse(data)` opens it into a real object
  you can read.
- **Learner-facing explanation:** "Whenever the operator edits a field, SPX calls
  your `update(data)` - the third name in the contract. But the bundle arrives
  *sealed*: `data` is one long piece of text, a JSON string. Text has no tags -
  `data.f0` on the string gives you nothing. `JSON.parse(data)` breaks the seal and
  hands back the real bundle. Give it a short name - `var d = JSON.parse(data);` -
  and read your tags off `d`. One more habit: write `d.f0 || ""` - 'the value, or
  empty text if the tag is missing' - so a blank field never puts the word
  *undefined* on air."
- **Context:** the boilerplate unseals its third function: `function update(data)`,
  empty, waiting. The sealed-freight demo runs in the console strip: the same bundle
  as 7.5, now wrapped in string quotes with a "SEALED" tape graphic. Reading `.f0`
  off the string visibly fails; off the parsed object it works.
- **Recycles:** objects (7.5), the contract (7.2 - update joins play and stop),
  grab-and-set (7.3/7.4), defining (7.1 - update takes an *input*, named in its
  parentheses, a small extension shown, not drilled).

**Code slice (the canonical update, used by ex. 4-5):**
```js
function update(data) {
  var d = JSON.parse(data);
  document.getElementById("name").textContent = d.f0 || "";
  document.getElementById("title").textContent = d.f1 || "";
}
```

**Exercises**

1. **Observe (interactive - the sealed/unsealed demo).** The console strip holds:
   `data = '{"f0":"Maria Kranz","f1":"News Anchor"}'` (the tape graphic reads
   SEALED). "Run `data.f0`." (Nothing pops out.) "Now run `JSON.parse(data).f0`."
   (*Maria Kranz* pops out; the tape tears.) "Why did the first try come back
   empty?"
   - A) `data` was still a string - one long piece of text with no tags to read.
     **(correct)**
   - B) The bundle was empty. -> "Look inside the string: the values are right
     there. They're just sealed in text until JSON.parse opens them."
   - C) f0 doesn't exist. -> "It exists - after parsing, the same read works.
     The tag was there; the *seal* was the problem."
2. **Predict.** **(kernel)** "An update body skips the parse and reads `data.f0`
   straight off the delivery. The operator types *Tomas Berg*. What lands on air?"
   - A) Nothing arrives - a string has no f0 tag, so the read comes back empty.
     **(correct)**
   - B) Tomas Berg, as intended. -> "Run it - the strap never changes. Sealed
     freight: parse first, read second. Always."
   - C) The whole string, tags and all. -> "Close - that's what you'd get writing
     `data` alone into the element. But `data.f0` asks a *string* for a tag it
     can't have: empty."
3. **Fill (word bank).** "Break the seal and name the opened bundle:
   `var d = JSON.____(data);`" Bank: `parse` **(correct)**, `open`, `read`, `f0`.
   - `open` / `read` -> "Right idea, wrong spelling - the tool's real name is
     `JSON.parse`. Machines don't forgive synonyms any more than typos."
   - `f0` -> "f0 is a tag *inside* the bundle. First open the whole delivery:
     `JSON.parse`."
4. **Predict (the safety net).** "The operator leaves the Title field blank, so the
   parsed bundle has no f1 value. Two versions of the title line:
   ```js
   document.getElementById("title").textContent = d.f1;
   document.getElementById("title").textContent = d.f1 || "";
   ```
   Which one keeps the word *undefined* off the air?"
   - The second **(correct)** - render preview shows the first version putting
     literal *undefined* on the strap. "`|| ""` means 'or, failing that, empty
     text'. A blank field should look blank - not like a bug."
   - The first -> "Watch the render: *undefined*, on air, in the channel font. The
     safety net `|| ""` is two characters of professionalism."
5. **Arrange.** Blocks: `function update(data) {` / `var d = JSON.parse(data);` /
   `document.getElementById("name").textContent = d.f0 || "";` / `}` - "Assemble the
   canonical update: open the delivery, then put the value where it belongs."
   - Read-before-parse order -> "At that point `d` doesn't exist yet - the bundle is
     still sealed. Parse first, read second."
   - Parse outside the braces -> "update owns its own steps. Everything runs
     *inside* the recipe, in order, each time SPX calls it."

- **Success criteria:** at least 4/5, and ex. 2 (the kernel) correct - if missed, a
  fresh variant (skip-parse with the weather strap's bundle) is asked at the end.
- **Common wrong answers:** string treated as object (ex. 1, 2 - deliberately
  *experienced* before it's explained; this is the unit's most-diagnosed checkpoint
  failure, so it gets the demo, the kernel, and the arrange); *undefined* on air
  (ex. 4 - taught as a taste/professionalism rule, like 5.5's asymmetric out).
- **Duration:** 5 min.

---

## Lesson 7.7 - The f0 handshake

- **New concept:** the convention that makes every SPX template click: each operator
  field `fN` pairs with one element `id="fN"` - so update() is just "for each field,
  write its value into its element." The strap's ids migrate from `name`/`title` to
  `f0`/`f1`.
- **Learner-facing explanation:** "SPX templates run on one handshake: field `f0`
  writes into the element with `id="f0"`, `f1` into `id="f1"`, and so on - one field,
  one element, same name on both ends. So the strap's ids change today: `name`
  becomes `f0`, `title` becomes `f1`. Remember Unit 2's rule - an id describes the
  element's *job*? In a live template, the job *is* the field number. And the
  handshake isn't magic: it's those two lines in update(), and lines can be wrong."
- **Context:** a wire diagram over the render - two fields on the left (a bare test
  rig; the real, self-building operator panel arrives in 7.8), two elements on the
  right, a wire per pair. As the student types into a field, the value visibly
  travels its wire into the element.
- **Recycles:** ids describe the job (2.3 - the postcard planted there is delivered),
  grab-and-set (7.3/7.4), parse + safety net (7.6), the whole idiom assembled.

**Code slice (used throughout):**
```html
<div id="strap">
  <div id="f0">Maria Kranz</div>
  <div id="f1">News Anchor</div>
</div>
```
```js
function update(data) {
  var d = JSON.parse(data);
  document.getElementById("f0").textContent = d.f0 || "";
  document.getElementById("f1").textContent = d.f1 || "";
}
```

**Exercises**

1. **Observe (interactive).** "Type *Tomas Berg* into field f0 on the test rig."
   (The value travels the top wire; the strap's first line changes on air.) "Which
   line of update() carried it?" Correct: the `d.f0` line.
   - Choosing the `d.f1` line -> "That wire belongs to the second field. Follow the
     name: field f0 -> `d.f0` -> element `f0` - the same name at every station."
2. **Predict.** "The operator edits field f1. Which element changes?"
   - A) The element with `id="f1"` - the title line. **(correct)**
   - B) The element with `id="f0"`. -> "Wrong wire. f1's value rides f1's wire into
     f1's element - the handshake is name-to-name."
   - C) Both lines. -> "One field, one element. Two lines change only when two
     fields are edited."
3. **Fill (word bank).** "Complete the first wire:
   `document.getElementById("f0").textContent = d.____;`"
   Bank: `f0` **(correct)**, `f1`, `name`, `"f0"`.
   - `f1` -> "That crosses the wires - the *second* field's value would land in the
     first element. Same name on both ends: element f0 takes d.f0."
   - `name` -> "The old id retired this lesson - and the bundle never had a `name`
     tag anyway (7.5). Fields ship as f0, f1, ..."
   - `"f0"` -> "Quotes belong in getElementById, where the id rides as text. After
     `d.` comes the bare tag: `d.f0`."
4. **Fix.** **(kernel)** On air, the name and the title have swapped places - *News
   Anchor* sits big on the top line, *Maria Kranz* small below. The wire diagram
   shows two wires crossing. Code:
   ```js
   function update(data) {
     var d = JSON.parse(data);
     document.getElementById("f1").textContent = d.f0 || "";
     document.getElementById("f0").textContent = d.f1 || "";
   }
   ```
   "Somebody crossed the wires. Tap a crossed line, then fix it." Correct: either
   write line; the fix offered makes each element take its own field
   (`f0` <- `d.f0`, `f1` <- `d.f1`).
   - Tapping the parse line -> "The delivery opened fine - the values exist, they
     just land in each other's elements. Look at the write lines: does each element
     take its *own* field?"
   - Tapping the HTML ids -> "The elements are correctly named. The crossing happens
     in update(), where the values are assigned. The handshake is code, not magic -
     and code can be wrong."
5. **Predict (the why of the migration).** "In Unit 2 you chose the id `name`
   because it described the element's job. Today that id is `f0`. What's the
   element's job now?"
   - A) Holding whatever the operator's first field says - and `f0` names exactly
     that. **(correct)** - "The job description got more precise, not less: this
     element belongs to field f0, forever, whoever is on air."
   - B) Nothing changed - ids are decoration. -> "Ids are how JS *finds* the
     element (7.3). Rename one end of a wire and the handshake breaks - that's the
     opposite of decoration."
   - C) The element now holds the text 'f0'. -> "Ids never show on screen (2.3).
     The id names the element's role: the landing spot for field f0."

- **Success criteria:** at least 4/5, and ex. 4 (the kernel) correct - if missed, a
  fresh variant (crossed wires on the weather strap's city/temperature) is asked at
  the end.
- **Common wrong answers:** treating the pairing as magic rather than convention
  (ex. 4 and 5 attack it - the crossed-wires fix *is* this unit's signature kernel,
  named in the progression model); reaching for the retired `name` id (ex. 3 - the
  migration must hold before 7.8 builds the panel on top of it).
- **Duration:** 5 min.

---

## Lesson 7.8 - Describing the controls

- **New concept:** `window.SPXGCTemplateDefinition` with its `DataFields` array - the
  template describes its own operator panel: each field's `field` (f0...), `ftype`
  (`"textfield"`), `title` (the label the operator reads), and `value` (a sensible
  default). Lives *last in `<head>`*.
- **Learner-facing explanation:** "How does SPX know your template has two text
  fields called Name and Title? You tell it - in the template definition, the sealed
  box you saw in the head back in 2.6. `window.SPXGCTemplateDefinition` lists your
  `DataFields`: for each one, `field` says which fN it is, `ftype: "textfield"` makes
  it a text box, `title` is the label the operator reads, and `value` is the default
  that's already filled in. The panel builds itself from this list. And a pro
  courtesy: the first two fields' values become the rundown row's preview - put the
  most important fields first."
- **Context:** the 2.6 "definition" seal comes off - the last seal in the course's
  code. The moment the student completes the DataFields, the **simulated SPX operator
  panel appears in the app, built from what they wrote** - their titles as labels,
  their defaults pre-filled. Editing the definition re-builds the panel live. The
  playout settings above DataFields are introduced as the delivery address: "copy
  them as-is for now - they get their meaning in Unit 9."
- **Recycles:** the skeleton and the sealed definition (2.6), the handshake (7.7),
  objects (7.5 - each DataField *is* a bundle of four labeled values), defaults as
  content (1.5).

**Code slice (the full definition, last item in `<head>`):**
```html
<script>
  window.SPXGCTemplateDefinition = {
    "description": "Nightly News name strap",
    "playserver": "OVERLAY",
    "playchannel": "1",
    "playlayer": "19",
    "webplayout": "19",
    "out": "manual",
    "DataFields": [
      { "field": "f0", "ftype": "textfield", "title": "Name",  "value": "Maria Kranz" },
      { "field": "f1", "ftype": "textfield", "title": "Title", "value": "News Anchor" }
    ]
  };
</script>
```

**Exercises**

1. **Observe (interactive).** "Change f0's `title` from `"Name"` to
   `"Presenter name"` and watch the panel." (The panel's first label re-renders
   live.) "Who is that label written for?"
   - A) The operator - it's the human-readable name of the field. **(correct)**
   - B) SPX's playout engine. -> "The engine reads `field`, not `title`. The title
     exists so a stressed operator at 21:59 knows exactly what to type where."
   - C) The viewer. -> "Nothing in the head is ever drawn on screen (2.6). The
     title lives on the operator's panel, not on air."
2. **Predict.** "A rundown lists tonight's graphics as one row each. With the
   definition above, what does this template's row show as its preview?"
   - A) *Maria Kranz* and *News Anchor* - the values of the first two DataFields.
     **(correct)**
   - B) The description text. -> "The description names the *template*. The row's
     preview shows the first two fields' *values* - so the operator can tell ten
     straps apart at a glance."
   - C) f0 and f1. -> "Field numbers mean nothing to an operator scanning a
     rundown. SPX shows the values - which is why your most important fields go
     first."
3. **Fill (word bank).** "Complete the second field's entry:
   `{ "field": "____", "ftype": "textfield", "title": "Title", "value": "News Anchor" }`"
   Bank: `f1` **(correct)**, `f2`, `title`, `textfield`.
   - `f2` -> "There's no element `id="f2"` in this strap - the wire would dangle.
     The title line's element is f1, so the field is f1."
   - `title` -> "That's the old Unit 2 id, retired in 7.7. `field` carries the fN
     name that the handshake runs on."
   - `textfield` -> "That's the ftype - the *kind* of control. `field` names which
     fN this is."
4. **Arrange.** Blocks: `{ "field": "f0",` / `"ftype": "textfield",` /
   `"title": "Name",` / `"value": "Maria Kranz" }` - "Assemble the Name field's
   entry: which field, what kind of control, what the operator reads, what's
   pre-filled."
   - Any order that breaks the braces -> "A DataField is one bundle (7.5): four
     labeled values between one pair of braces."
5. **Fix.** **(kernel)** The operator panel shows a second field labeled *Title* -
   but typing into it changes nothing on air. The 7.7 wire diagram exposes it: a
   wire leaves the field and dangles, attached to nothing. Definition entry:
   ```js
   { "field": "f2", "ftype": "textfield", "title": "Title", "value": "News Anchor" }
   ```
   Template facts shown alongside: the element is `id="f1"`; update writes
   `d.f1` into it. "Find the mismatch and fix it." Correct: `"f2"` -> `"f1"`.
   - Tapping the title -> "The label is fine - the operator can read it. The
     *machine* end is broken: the field calls itself f2, but nothing in the
     template listens to f2."
   - Fixing by renaming the element to f2 instead -> accepted with a note: "That
     works too - as long as *all three* ends agree: field, update line, and id.
     One name, three places." (The checker verifies three-way agreement, not one
     spelling.)
6. **Predict (placement, recycle 2.6).** "Where does the definition live?"
   - A) In the `<head>`, as its last item. **(correct)**
   - B) In the `<body>`, with the elements. -> "The body is what's on screen. The
     definition is *settings* - head material, and by SPX convention the head's
     last item."
   - C) Anywhere - order is decoration. -> "SPX reads the definition from the
     head, last item - that's the convention this course (and the pros' templates
     you'll read in Unit 8) always follows."

- **Success criteria:** at least 5/6, and ex. 5 (the kernel) correct - if missed, a
  fresh variant (a dangling f3 on the weather strap) is asked at the end.
- **Common wrong answers:** definition-as-decoration - cured by consequence: the
  panel *is built from it* (ex. 1) and a wrong `field` visibly disconnects a control
  (ex. 5); field-order indifference (ex. 2 - the rundown preview makes order a
  courtesy to a real person).
- **Duration:** 5-6 min.

---

## Lesson 7.9 - Review remix (no new concept)

- **Purpose:** spaced retrieval across the whole contract before the checkpoint;
  adaptive - the app draws 6 exercises weighted toward the student's weakest recorded
  skills from Units <= 7.
- **Learner-facing framing:** "Nothing new. The whole contract, one lap: *definition
  describes, update delivers, play performs, stop clears.*"
- **Fixed pool (each tagged with its source lesson):**
  1. **Predict - trace end-to-end (7.6/7.7/7.8).** **(kernel)** The full pipeline as
     a diagram: panel field (*Title*, f1) -> `update(data)` -> `JSON.parse` ->
     `d.f1` -> `getElementById("f1")` -> the strap's second line. The operator types
     *Sports Reporter*. "Tap, in order, the three stations the value passes through
     in the code." Correct order: parse, read `d.f1`, write into `#f1`.
     - Wrong order -> "The delivery is sealed until parse - nothing can be read
       before it. Parse, read, write: always that order."
  2. **Fix (7.3).** `document.getElementById("#f0")` - the grip comes back empty.
     Find the hash, remove it.
  3. **Fix (7.2).** PLAY fades the strap out, STOP slides it in - the swapped
     in/out pair, on the weather strap this time.
  4. **Predict (7.8).** A three-field definition (f0 *Name*, f1 *Title*, f2
     *Location* - all textfields). "How many controls does the panel build, and
     which two values does the rundown row preview?" -> three controls; f0's and
     f1's values.
  5. **Arrange (7.6/7.7).** The complete minimal update() from shuffled blocks:
     signature, parse, two safety-netted writes, closing brace - with one distractor
     block (`document.getElementById("#f1")...`) that must be rejected.
  6. **Predict (7.5/7.6).** "An update body reads `d.name` from a bundle whose tags
     are f0 and f1. What lands on air?" -> nothing/empty - read the tags that exist.
- **Success criteria:** at least 5/6. Any miss appends one more exercise from the
  same source lesson's pool (capped at 8 total).
- **Duration:** 4 min.

---

## Checkpoint 7 - "Operator-ready"

- **Type:** Build (web: write the wiring; phone: guided assembly of the same code
  from labeled blocks, section by section) - then **Drive** (identical on both:
  the student operates their own template from the simulated SPX panel).
- **Scenario:** "The branded, GSAP-animated strap from Checkpoint 6 goes live
  tonight. Wire it so the operator never has to open the code - then sit in the
  operator's chair and prove it."
- **Given (complete and working, carried forward from Checkpoint 6):** the strap's
  HTML (ids already migrated to `f0`/`f1` in 7.7), its branded CSS, and the two
  approved timelines (in: power2.out, overlapped lines; out: faster, power2.in) -
  currently sitting loose in the script, not yet under any contract name.

**Part 1 - Wire it (three tasks):**

1. **The definition** (last item in `<head>`; playout settings provided as the
   copy-as-is block): write the two `DataFields` -
   f0 / `textfield` / an operator-readable title (e.g. *Name*) / a sensible default;
   f1 / `textfield` / *Title* / default - most important field first.
2. **The update body:** parse the delivery, then the two handshake writes with the
   safety net:
   ```js
   function update(data) {
     var d = JSON.parse(data);
     document.getElementById("f0").textContent = d.f0 || "";
     document.getElementById("f1").textContent = d.f1 || "";
   }
   ```
3. **The playout pair:** put the in-timeline under `function play()` and the
   out-timeline under `function stop()` - exact names, one recipe each.

**Part 2 - Drive it (the payoff, staged deliberately):** the app flips to the
simulated SPX operator panel - built from the student's own DataFields, their
titles on the labels, their defaults pre-filled. Tonight's rundown card reads:
*Priya Nair - Economics Editor*. The student, as operator: (1) retitles both
fields, watching the strap update live in preview, (2) presses PLAY - the strap
animates in over the program feed with the new name, (3) mid-air, fixes a late
correction from the producer (*Senior Economics Editor*) - update fires while
live, (4) presses STOP - the strap leaves cleanly. No code visible during the
drive: the operator's view is the whole point.

- **Pass criteria (automated contract checks + the live drive):**
  - `play`, `stop`, and `update` all defined, exactly and only those names
    (lowercase), each containing the right work (in-timeline / out-timeline /
    parse-then-write).
  - update parses *before* reading; each element takes its own field (f0 <- d.f0,
    f1 <- d.f1); both writes carry the `|| ""` safety net.
  - Definition is the last item in `<head>`; two textfield DataFields with
    `field` values matching existing element ids; titles operator-readable
    (non-empty, not "f0"/"f1"); defaults filled; Name field first.
  - The drive completes: typed values reach the air, the late correction lands
    while live, PLAY and STOP run the correct timelines, and blank-field spot-check
    shows no *undefined* on air.
- **Failure handling (diagnosis over verdict; each failure names the skill in
  learner terms and links its remediation lesson):**
  - Panel empty or missing a control -> "SPX can only build what the definition
    describes. (See: Describing the controls.)" -> micro-review 7.8.
  - Control present but typing changes nothing -> the wire diagram runs the
    diagnosis: dangling wire at the field -> `field`/id mismatch -> 7.8 (ex. 5);
    grip-comes-back-empty overlay -> hash or id typo in getElementById -> 7.3;
    sealed-freight icon on `data` -> missing JSON.parse -> 7.6.
  - Name and title swap on air -> "Crossed wires: each element must take its own
    field. (See: The f0 handshake.)" -> micro-review 7.7.
  - *undefined* on air when a field is blanked -> "A blank field should look
    blank. (See: Unpack the delivery, the safety net.)" -> 7.6.
  - PLAY or STOP dead -> "SPX calls exactly `play` and `stop` - is anyone
    answering to those names?" -> 7.2; a malformed definition (missing braces,
    body outside them) -> 7.1.
  - Rundown preview shows the wrong pair -> "The first two fields are the
    operator's preview - lead with what matters." -> 7.8 (ex. 2).
  - After the linked micro-review, the checkpoint re-runs with fresh content (new
    rundown card, new defaults, reshuffled blocks on phone).
- **Duration:** 7 min.

**Unit 7 total learner time:** ~42-50 min across 10 sessions.
