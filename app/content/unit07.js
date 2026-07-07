// Unit 7 - Making It Live. Source of truth: lessons/unit-07.md
// Schema per app/SCHEMA.md. SPX classic-globals dialect: play(), stop(),
// update(data) with a JSON string, fN <-> id="fN". The operate type is the
// simulated SPX panel; PLAY/STOP on the stage call the template's own functions.
(function () {

  // The Nightly News strap (+ NN bug), ids name/title until the 7.7 migration.
  var CSS = '#strap { position: absolute; left: 120px; top: 860px; background-color: #0a3d91; padding: 22px 34px; } .line { color: #ffffff; font-size: 52px; font-weight: 700; font-family: Arial, sans-serif; } #title { font-size: 34px; font-weight: 400; color: #dbe4f5; }';
  var BUGCSS = CSS + ' #bug { position: absolute; right: 90px; top: 60px; width: 90px; height: 90px; background-color: #0a3d91; color: #ffffff; font-family: Arial, sans-serif; font-size: 40px; font-weight: 700; line-height: 90px; text-align: center; border-radius: 10px; }';
  var HTML = '<div id="strap"><div id="name" class="line">Maria Kranz</div><div id="title" class="line">News Anchor</div></div>';
  var HTMLB = HTML + '<div id="bug">NN</div>';

  // 7.7+: ids migrated to the fN handshake.
  var FHTML = '<div id="strap"><div id="f0" class="line">Maria Kranz</div><div id="f1" class="line">News Anchor</div></div>';
  var FCSS = '#strap { position: absolute; left: 120px; top: 860px; background-color: #0a3d91; padding: 22px 34px; } .line { color: #ffffff; font-size: 52px; font-weight: 700; font-family: Arial, sans-serif; } #f1 { font-size: 34px; font-weight: 400; color: #dbe4f5; }';

  // The fully wired template (update + play + stop), used from 7.7 on.
  var WIRED = 'function update(data) { var d = JSON.parse(data); document.getElementById("f0").textContent = d.f0 || ""; document.getElementById("f1").textContent = d.f1 || ""; }\nfunction play() { gsap.timeline().fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }).fromTo("#f1", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2") }\nfunction stop() { gsap.to("#strap", { y: 40, opacity: 0, duration: 0.3, ease: "power2.in" }) }';

  // 7.6: update() writing into the OLD name/title ids (pre-handshake), plus a play()
  // wrapper that feeds it a bundle so the delivery is visible on air.
  var U76 = 'function update(data) { var d = JSON.parse(data); document.getElementById("name").textContent = d.f0 || ""; document.getElementById("title").textContent = d.f1 || ""; }';
  var U76PLAY = '\nfunction play(){ update(JSON.stringify({ f0: "Tomas Berg", f1: "Sports Reporter" })); }';
  // 7.6 safety-net demo: no parse guard, blank Title arrives -> "undefined" on air.
  var U76BAD = 'function update(data) { var d = JSON.parse(data); document.getElementById("name").textContent = d.f0; document.getElementById("title").textContent = d.f1; }\nfunction play(){ update(JSON.stringify({ f0: "Maria Kranz" })); }';

  // 7.7: the handshake wired right vs. crossed. A play() wrapper feeds a fixed bundle
  // so the swap (or its repair) shows on air immediately.
  var HS_DEMO = '\nfunction play(){ update(JSON.stringify({ f0: "Maria Kranz", f1: "News Anchor" })); }';
  var HS_GOOD = 'function update(data){ var d = JSON.parse(data); document.getElementById("f0").textContent = d.f0 || ""; document.getElementById("f1").textContent = d.f1 || ""; }';
  var HS_CROSS = 'function update(data){ var d = JSON.parse(data); document.getElementById("f1").textContent = d.f0 || ""; document.getElementById("f0").textContent = d.f1 || ""; }';

  // The definition block, shown as a code reference in 7.8.
  var DEF = 'window.SPXGCTemplateDefinition = {\n  "description": "Nightly News name strap",\n  "playserver": "OVERLAY", "playchannel": "1", "playlayer": "19",\n  "webplayout": "19", "out": "manual",\n  "DataFields": [\n    { "field": "f0", "ftype": "textfield", "title": "Name",  "value": "Maria Kranz" },\n    { "field": "f1", "ftype": "textfield", "title": "Title", "value": "News Anchor" }\n  ]\n};';

  // 7.1: the flash recipe; NEXT is the student's own button (the app wires it to call flash()).
  var FLASH = 'function flash() { gsap.fromTo("#strap", { opacity: 0 }, { opacity: 1, duration: 0.5 }) }';
  var FLASHNEXT = FLASH + '\nfunction next() { flash() }';

  // 7.2: the contract pair.
  var PS72 = 'function play() { gsap.timeline().fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }).fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2") }\nfunction stop() { gsap.to("#strap", { opacity: 0, duration: 0.3, ease: "power2.in" }) }';
  var PS72SWAP = 'function play() { gsap.to("#strap", { opacity: 0, duration: 0.3, ease: "power2.in" }) }\nfunction stop() { gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }) }';

  window.COURSE_DATA = window.COURSE_DATA || [];
  COURSE_DATA.push({
    id: 7,
    title: "Making It Live",
    promise: "Wire a template so an operator can retitle and play it without touching code.",
    lessons: [

      {
        id: "7.1", title: "Writing the recipe",
        concept: "Defining a function stores a named recipe - it does nothing until someone calls it by name.",
        explain: "Since Unit 6 you've been CALLING recipes: gsap.to(...) runs someone else's instructions. Today you write your own: function flash() { ... } - the word function, the name you choose, empty parentheses, and the steps between the braces. Writing it down runs nothing. It waits, under its name, until something calls it.",
        exercises: [
          {
            type: "observe",
            prompt: "The definition, in pieces: function flash() { gsap.fromTo(\"#strap\", { opacity: 0 }, { opacity: 1, duration: 0.5 }); }. Tap the recipe's NAME.",
            render: { html: HTMLB, css: BUGCSS, mode: "video", js: FLASH },
            lines: ['function', 'flash', '()', '{', 'gsap.fromTo("#strap", { opacity: 0 }, { opacity: 1, duration: 0.5 });', '}'],
            answer: 1,
            highlight: "#strap",
            success: "flash - the name you chose, sitting right after the word function. Anything that knows the name can now run the steps.",
            feedback: {
              0: "function marks it as a recipe - it's the same word on every definition. The recipe's own name comes right after it.",
              2: "The parentheses are part of the recipe's name tag, not the name itself. The name sits just before them.",
              4: "That's a step INSIDE the recipe - a call you know from Unit 6. The recipe's own name sits right after the word function.",
              5: "The braces hold the steps that run when it's called. The name sits right after the word function.",
              default: "The braces hold the steps. The name sits right after the word function."
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "You type the definition into the template and press enter. Does the strap flash?",
            render: { html: HTMLB, css: BUGCSS, mode: "video", js: FLASH },
            options: [
              { text: "No - nothing moves until something CALLS flash().", correct: true,
                feedback: "Watch the render: nothing moved. Writing a recipe down doesn't cook the meal. Definitions wait to be called." },
              { text: "Yes, immediately.",
                feedback: "Watch the render: nothing moved. Writing a recipe down doesn't cook the meal. Definitions wait to be called." },
              { text: "Yes, but only once.",
                feedback: "Not even once. The steps inside the braces are stored, not run. Calling the name runs them - as many times as it's called." }
            ]
          },
          {
            type: "predict",
            prompt: "A third button, CONTINUE, is now on the stage, wired to run flash(). Press it. Press it again. What does the button do?",
            render: { html: HTMLB, css: BUGCSS, mode: "video", js: FLASHNEXT },
            options: [
              { text: "It CALLS flash() - and the stored recipe runs.", correct: true,
                feedback: "Every press, one call, one run. The recipe was written once; calling is what makes it happen." },
              { text: "It contains the animation itself.",
                feedback: "The button holds nothing but a name. Delete the definition and the button goes dead - the recipe is yours, in the code." },
              { text: "It re-types the definition.",
                feedback: "The definition was written once. Calling runs it - defining and running are two different moments." }
            ]
          },
          {
            type: "fill",
            prompt: "Write a recipe named pop for the corner bug. (Your pick loads live - a broken name fails loudly.)",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            code: 'function {{blank}}() { gsap.from("#bug", { scale: 0, duration: 0.4 }); }',
            bank: ["pop", "pop()", "gsap", "#bug"],
            answer: "pop",
            slot: "js",
            success: "Named pop - and notice the stage: defining it ran NOTHING. It waits under its name.",
            feedback: {
              "pop()": "The red overlay: the parentheses are already there, right after the blank. The name alone goes in: pop.",
              "gsap": "gsap is the tool the recipe USES. The recipe's own name is yours to choose - and here the task says pop.",
              "#bug": "That's the TARGET inside the step - and the overlay shows names can't start with #. The recipe's name comes after the word function."
            }
          },
          {
            type: "arrange",
            prompt: "Build the complete recipe: the marker word, the name, the empty parentheses, and the steps in their braces.",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            blocks: ['function', 'pop', '()', '{', 'gsap.from("#bug", { scale: 0, duration: 0.4 });', '}'],
            slot: "js",
            success: "A complete recipe - stored, waiting, running nothing. Tomorrow you meet the caller that matters.",
            feedback: { default: "Steps outside the braces don't belong to the recipe - they'd run immediately, on their own. Everything the recipe owns lives between { and }." }
          },
          {
            type: "predict",
            prompt: "A template contains function flash() { ... } and the button is never pressed all evening. How many times does the strap flash?",
            render: { html: HTMLB, css: BUGCSS, mode: "video", js: FLASH },
            options: [
              { text: "0", correct: true,
                feedback: "Defined, never called: the recipe just waits. Tomorrow you meet the caller that matters - SPX itself." },
              { text: "1",
                feedback: "Defining is not a first run. Zero calls, zero flashes." },
              { text: "It flashes continuously.",
                feedback: "Nothing loops here. No call, no run." }
            ]
          }
        ]
      },

      {
        id: "7.2", title: "SPX calls, you answer",
        concept: "The lifecycle contract: SPX calls YOUR play() and stop() - your job is to put the right recipes under those exact names.",
        explain: "Here's the deal the template makes with SPX: when the operator presses PLAY, SPX calls a function named exactly play(). On STOP it calls stop(). SPX doesn't care what's inside them - that's your side of the contract. The buttons you've trusted since lesson 1.2 are finally yours.",
        exercises: [
          {
            type: "predict",
            prompt: "Press PLAY on the stage. SPX -> play() -> the timeline - and the strap slides in. Who called play()?",
            render: { html: HTML, css: CSS, mode: "video", js: PS72 },
            options: [
              { text: "SPX - the playout system calls it whenever the operator presses PLAY.", correct: true,
                feedback: "SPX starts the chain; your recipe answers. That's the whole contract." },
              { text: "The timeline.",
                feedback: "The timeline is what play() RUNS - the last stop on the chain, not the first. Follow it from the left: SPX starts it." },
              { text: "You, by defining it.",
                feedback: "7.1's rule: defining runs nothing. You wrote the recipe; SPX is the one who calls it." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "We rename play to start - the timeline inside is untouched. The operator presses PLAY. Try it on the stage. What happens?",
            render: { html: HTML, css: CSS, mode: "video",
              js: 'function start() { gsap.timeline().fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }).fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.2") }\nfunction stop() { gsap.to("#strap", { opacity: 0, duration: 0.3, ease: "power2.in" }) }' },
            options: [
              { text: "Nothing - SPX calls the name play, and nobody answers to it any more.", correct: true,
                feedback: "Dead button, live proof. The contract is a NAME agreement: SPX calls exactly play()." },
              { text: "The strap animates in as before.",
                feedback: "You tried it - dead button. The contract is a NAME agreement: SPX calls exactly play(). A recipe under any other name is never called." },
              { text: "SPX finds start because it does the same thing.",
                feedback: "SPX never reads inside your functions - it only calls the agreed names. start could contain anything; SPX will never know it exists." }
            ]
          },
          {
            type: "fill",
            prompt: "Your out-timeline must run when the operator takes the strap off air. Name the recipe - then test it with the stage's STOP button.",
            render: { html: HTML, css: CSS, mode: "video" },
            code: 'function {{blank}}() { gsap.to("#strap", { opacity: 0, duration: 0.3, ease: "power2.in" }); }',
            bank: ["stop", "play", "out", "off"],
            answer: "stop",
            slot: "js",
            success: "Now press STOP on the stage - the strap leaves. That name answers the operator's off-air call.",
            feedback: {
              "play": "Watch the stage: your EXIT just fired on PLAY - the strap vanished when the director said show it. The off-air name in the contract is stop.",
              "out": "Good instinct, wrong contract. SPX only calls two playout names: play and stop. Off air = stop.",
              "off": "Good instinct, wrong contract. SPX only calls two playout names: play and stop. Off air = stop."
            }
          },
          {
            type: "fix",
            prompt: "The render misbehaves: PLAY fades the strap OUT; STOP slides it IN (try both). The moves answered to the wrong names. Tap the body that must move - the fade-out sitting under play().",
            render: { html: HTML, css: CSS, mode: "video", autoplay: true, js: PS72SWAP },
            tokens: [
              'function play() {',
              'gsap.to("#strap", { opacity: 0, duration: 0.3, ease: "power2.in" })',
              '}',
              'function stop() {',
              'gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })',
              '}'
            ],
            answer: 1,
            fixedToken: 'gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })',
            fixedRender: { js: PS72 },
            success: "Bodies swapped back: the entrance under play, the exit under stop. Press PLAY - the buttons keep their promises again.",
            feedback: {
              4: "That entrance is in the wrong home too - the other half of the same swap. Tap the fade-out under play() to swap them back.",
              default: "Both definitions are well-formed, and the eases fit their moves (Unit 6 taste). Read what each body DOES against what its name promises SPX."
            }
          },
          {
            type: "predict",
            prompt: "A template defines play() but no stop() at all. The strap is on air and the operator presses STOP (try it). What happens?",
            render: { html: HTML, css: CSS, mode: "video", autoplay: true,
              js: 'function play() { gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }) }' },
            options: [
              { text: "Nothing runs - the strap stays on air.", correct: true,
                feedback: "SPX calls a name nobody answers to. On a real broadcast this is a stuck graphic - by the checkpoint, your templates always answer both calls." },
              { text: "SPX removes the graphic itself.",
                feedback: "SPX only CALLS. If your template doesn't define the exit, there is no exit." },
              { text: "The template breaks permanently.",
                feedback: "No harm done - just no response. Define stop() and the button comes alive." }
            ]
          }
        ]
      },

      {
        id: "7.3", title: "Grab the element",
        concept: "document.getElementById(\"name\"): JS takes hold of one element by its Unit 2 id - the name goes in ALONE, no hash.",
        explain: "JS can reach into the page and take hold of any element - by the id you gave it in Unit 2. document.getElementById(\"name\") means: in this document, get the element whose id is name. One id, one element, one grip. The hash is CSS spelling - here the name goes in alone. Every successful grab lights its element up with the red HELD outline.",
        exercises: [
          {
            type: "observe",
            prompt: "Three grabs ran, one per line: getElementById(\"name\"), then (\"title\"), then (\"bug\"). Tap the LINE whose grip closed on the corner bug - it lights up when you're right.",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            lines: [
              'document.getElementById("name")',
              'document.getElementById("title")',
              'document.getElementById("bug")'
            ],
            answer: 2,
            highlight: "#bug",
            success: "The grip always matches the id, letter for letter - and there's the HELD outline on the bug.",
            feedback: {
              0: "That grab closed on the strap's first line. The third line asked for the id bug - the grip matches the id, letter for letter.",
              1: "That grab closed on the title line. The third line asked for the id bug - the grip matches the id, letter for letter."
            }
          },
          {
            type: "predict",
            prompt: "document.getElementById(\"title\") runs. Which element lights up as held?",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            options: [
              { text: "The title line.", correct: true,
                feedback: "The grip goes where the id points - there's the outline." },
              { text: "The name line.",
                feedback: "The grip goes where the id points. title is the second line's badge - Unit 2 gave it that name." },
              { text: "Both strap lines - they share class=\"line\".",
                feedback: "getElementById finds by ID - one of a kind, one element. Reaching a whole class from JS comes in Unit 8." }
            ],
            applyOnAnswer: { js: 'document.getElementById("title").className = "line hl"', play: false }
          },
          {
            type: "fill",
            prompt: "Grab the corner bug.",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            code: 'document.getElementById("{{blank}}")',
            bank: ["bug", "#bug", "NN", "div"],
            answer: "bug",
            success: "One id, one element, one grip - getElementById now points at exactly the bug. Nothing moves yet: grabbing is only step one.",
            feedback: {
              "#bug": "No hash here - that's how CSS marks an id. getElementById already knows it's getting an id: the name goes in alone.",
              "NN": "That's the text the bug SHOWS on screen. Elements are grabbed by their id, not their content.",
              "div": "That's the tag's type. The grip needs the one element's own name - its id."
            }
          },
          {
            type: "fix", kernel: true,
            prompt: "This grab came back EMPTY - the red overlay says the grip closed on nothing: no element has the id it asked for. Tap the problem.",
            render: { html: HTMLB, css: BUGCSS, mode: "video",
              js: 'var held = document.getElementById("#name"); held.className = "line hl";' },
            tokens: ['document', '.getElementById(', '"#name"', ')'],
            answer: 2,
            fixedToken: '"name"',
            fixedRender: { js: 'var held = document.getElementById("name"); held.className = "line hl";' },
            success: "Hash gone, grip closed - the name line wears the HELD outline. getElementById wants the name alone; the hash is CSS spelling.",
            feedback: {
              0: "The tool is spelled correctly. Read what's INSIDE the quotes against the id in the HTML: is there an element whose id is, literally, hash-n-a-m-e?",
              1: "The tool is spelled correctly. Read what's INSIDE the quotes against the id in the HTML: is there an element whose id is, literally, hash-n-a-m-e?",
              3: "The quotes and parentheses belong - the id rides in as text. The stowaway is the hash: getElementById wants the name alone."
            }
          },
          {
            type: "predict",
            prompt: "The two spellings, side by side. In CSS you target the name line as #name. In getElementById(...), what goes in the quotes?",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            options: [
              { text: "\"name\" - the hash is CSS spelling (and GSAP targets borrow it); getElementById takes the bare id.", correct: true,
                feedback: "CSS and GSAP targets: with hash. getElementById: without. That one character is the most common beginner DOM bug - now it can't catch you." },
              { text: "\"#name\" - same as CSS.",
                feedback: "The hash is CSS's marker meaning this-is-an-id-not-a-tag. getElementById takes ONLY ids, so the marker would just be a wrong character." }
            ]
          }
        ]
      },

      {
        id: "7.4", title: "Change what it shows",
        concept: ".textContent sets a grabbed element's text from JS; its sibling .src swaps a grabbed image's file.",
        explain: "Once you hold an element, you can change what it shows: .textContent is its text, .src is its image file. Write document.getElementById(\"name\").textContent = \"Tomas Berg\"; and the strap changes live, on air - your Unit 1 edit, now done by code. That's the trick everything live is built on.",
        exercises: [
          {
            type: "observe",
            prompt: "Press PLAY to run the first line - watch the name change live, on air. The second line (from the weather template) swaps sun for rain. Which line changes a PICTURE?",
            render: { html: HTML, css: CSS, mode: "video",
              js: 'function play() { document.getElementById("name").textContent = "Tomas Berg" }' },
            lines: [
              'document.getElementById("name").textContent = "Tomas Berg";',
              'document.getElementById("icon").src = "weather-icon-rain.png";'
            ],
            answer: 1,
            highlight: "#icon",
            success: "Pictures live in src - the same attribute you edited by hand in 2.5, now set from JS.",
            feedback: {
              0: "That one rewrote TEXT - you just watched it retitle the strap. Pictures live in src." }
          },
          {
            type: "predict",
            prompt: "We run: document.getElementById(\"title\").textContent = \"Sports Reporter\"; - which line of the strap changes?",
            render: { html: HTML, css: CSS, mode: "video" },
            options: [
              { text: "The title line.", correct: true,
                feedback: "Follow the grip: the id says title, so the text lands there. Watch." },
              { text: "The name line.",
                feedback: "Follow the grip: the id in the parentheses says title. The text lands wherever the grip holds." },
              { text: "Both lines.",
                feedback: "One id, one element, one change. To change both lines you'd write two lines of code - which is exactly what update() will do soon." }
            ],
            applyOnAnswer: { js: 'document.getElementById("title").textContent = "Sports Reporter";', play: false }
          },
          {
            type: "predict", kernel: true,
            prompt: "A colleague writes: \"name\".textContent = \"Tomas Berg\"; - the id, with .textContent attached straight to it. Does the strap change?",
            render: { html: HTML, css: CSS, mode: "video" },
            options: [
              { text: "No - \"name\" is just a piece of text, not the element. Grab the element first, then set its textContent.", correct: true,
                feedback: "No bridge, no change. getElementById IS the bridge from an id to its element." },
              { text: "Yes - JS knows which element you mean.",
                feedback: "JS knows nothing of the sort. Text in quotes is only text. The bridge from an id to its element is getElementById - no bridge, no change." },
              { text: "It renames the element's id.",
                feedback: "Nothing was grabbed, so nothing was touched. Grab first, set second - always two steps, even on one line." }
            ]
          },
          {
            type: "fix",
            prompt: "The strap threw an error - the player couldn't run this line. You can't hand words straight to a whole element; something is missing between the grab and the =. Tap the piece that needs it.",
            render: { html: HTML, css: CSS, mode: "video",
              js: 'document.getElementById("name") = "Alexandra Rivera";' },
            tokens: ['document.getElementById("name")', '=', '"Alexandra Rivera";'],
            answer: 0,
            fixedToken: 'document.getElementById("name").textContent',
            fixedRender: { js: 'document.getElementById("name").textContent = "Alexandra Rivera";' },
            success: "You can't assign words to a whole element - you assign to its .textContent. And there's the new name, on air.",
            feedback: {
              1: "The = is doing its job - it delivers the value. The grab on its left is a whole ELEMENT; words need the part of it that holds text.",
              2: "The text is what you WANT on air. The missing piece is the property that receives it - on the grabbed element."
            }
          },
          {
            type: "type",
            prompt: "The rundown changed: put James Okafor in the name line - one full line of JS. Your line runs live on air.",
            render: { html: HTML, css: CSS, mode: "video" },
            code: '{{blank}}',
            slot: "js",
            placeholder: 'document.getElementById(...).textContent = ...',
            answer: [
              'document.getElementById("name").textContent = "James Okafor";',
              'document.getElementById("name").textContent = "James Okafor"',
              'document.getElementById("name").textContent="James Okafor";',
              'document.getElementById("name").textContent="James Okafor"'
            ],
            success: "James Okafor, on air - your Unit 1 edit, performed by code.",
            feedback: { default: "Grab first, set second: document.getElementById(\"name\").textContent = \"James Okafor\"; - the id alone in the parentheses (no hash), the new text in quotes." }
          }
        ]
      },

      {
        id: "7.5", title: "A labeled bundle",
        concept: "An object is a bundle of labeled values; data.f0 reads the value labeled f0 out of the bundle.",
        explain: "Tonight's strap content arrives as a bundle of labeled values: { f0: \"Maria Kranz\", f1: \"News Anchor\" }. Each label tags one value, like luggage tags. data.f0 means: from the bundle called data, give me the value tagged f0. The labels are f0, f1, ... because that's how SPX ships operator fields - the full logic of the naming comes in lesson 7.7.",
        exercises: [
          {
            type: "predict",
            prompt: "The bundle: data = { f0: \"Maria Kranz\", f1: \"News Anchor\" }. You read data.f0. What comes out?",
            render: { html: HTML, css: CSS, mode: "video" },
            options: [
              { text: "Maria Kranz", correct: true,
                feedback: "The dot picks a tag; out comes what hangs off it." },
              { text: "f0",
                feedback: "f0 is the TAG. Reading data.f0 hands you what hangs off the tag - the value." },
              { text: "The whole bundle.",
                feedback: "The dot picks one tag. data alone is the whole bundle; data.f0 is one value out of it." }
            ]
          },
          {
            type: "predict",
            prompt: "Same bundle. data.f1 - what comes out?",
            render: { html: HTML, css: CSS, mode: "video" },
            options: [
              { text: "News Anchor", correct: true,
                feedback: "The labels do the choosing: f1 tags the job title." },
              { text: "Maria Kranz",
                feedback: "That value hangs off f0. Count the tags: f0 first, f1 second - the labels do the choosing, not the order you read them in." },
              { text: "\"News Anchor\" with the quotes.",
                feedback: "The quotes are the code's packaging (remember 1.5's on-air quote marks?). The value itself is the bare text." }
            ]
          },
          {
            type: "fill",
            prompt: "Read the presenter's NAME out of the bundle.",
            render: { html: HTML, css: CSS, mode: "video" },
            code: 'data = { f0: "Maria Kranz", f1: "News Anchor" }\ndata.{{blank}}',
            bank: ["f0", "f1", "name", "data"],
            answer: "f0",
            success: "The name hangs off the first tag: f0.",
            feedback: {
              "f1": "That tag holds the job title. The name hangs off the first tag - f0.",
              "name": "There's no tag called name in this bundle. SPX ships fields as f0, f1, ... Read the tags that exist.",
              "data": "data is the bundle itself. After the dot comes a TAG."
            }
          },
          {
            type: "fix", kernel: true,
            prompt: "This read came back empty - no error, no warning, just nothing. You asked for a tag this bundle doesn't have. Tap the wrong tag - it snaps to one that exists.",
            render: { html: HTML, css: CSS, mode: "video" },
            tokens: ['data', '.', 'name'],
            answer: 2,
            fixedToken: 'f0',
            success: "Read the labels that exist: this bundle's tags are f0 and f1, nothing else. Silent empty reads are why you always check the exact name.",
            feedback: {
              0: "The bundle is real and full. The tag you asked it for isn't. Read the labels that exist, not the ones you wish existed.",
              1: "The dot is doing its job - it picks a tag. The problem is which tag was asked for."
            }
          },
          {
            type: "predict",
            prompt: "You've written bundles before: gsap.to(\"#strap\", { x: 0, opacity: 1 }). In that call, what is opacity?",
            render: { html: HTML, css: CSS, mode: "video" },
            options: [
              { text: "A label in a bundle, tagging the value 1.", correct: true,
                feedback: "Same shape all along: labels and values in braces. Unit 6 you wrote them for GSAP to read; now SPX writes them for YOU to read." },
              { text: "An element id.",
                feedback: "Ids live in HTML and in quotes here (\"#strap\"). Inside the braces it's labels-and-values - a bundle." },
              { text: "A function.",
                feedback: "No parentheses, no call. opacity: 1 is a labeled value, nothing more." }
            ]
          }
        ]
      },

      {
        id: "7.6", title: "Unpack the delivery",
        concept: "update(data) receives the bundle as a JSON string; JSON.parse(data) opens it into a real object you can read.",
        explain: "Whenever the operator edits a field, SPX calls your update(data) - the third name in the contract. But the bundle arrives sealed: data is one long piece of text, a JSON string. Text has no tags - data.f0 on the string gives nothing. JSON.parse(data) breaks the seal. Give it a short name - var d = JSON.parse(data); - and read your tags off d. One more habit: d.f0 || \"\" means 'the value, or empty text if the tag is missing' - a tidy default that keeps a blank field looking blank, and stays safe the moment that value is joined into a longer string.",
        exercises: [
          {
            type: "predict",
            prompt: "The bundle arrives as data = '{\"f0\":\"Maria Kranz\",\"f1\":\"News Anchor\"}' - wrapped in string quotes, marked SEALED. You read data.f0. What pops out?",
            render: { html: HTML, css: CSS, mode: "video" },
            options: [
              { text: "Nothing - data is still a string, one piece of text with no tags to read.", correct: true,
                feedback: "The values are right there inside the text - just sealed, until JSON.parse opens them." },
              { text: "Maria Kranz.",
                feedback: "Not yet - a string has no tags. Reading .f0 off sealed text comes back empty. Parse first." },
              { text: "The whole string.",
                feedback: "data alone would give the whole string. data.f0 asks a string for a tag it can't have: empty." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "An update body skips the parse and reads data.f0 straight off the delivery. The operator types Tomas Berg. Press PLAY. What lands on air?",
            render: { html: HTML, css: CSS, mode: "video",
              js: 'function update(data){ document.getElementById("name").textContent = data.f0; }\nfunction play(){ update(JSON.stringify({ f0: "Tomas Berg", f1: "Sports Reporter" })); }' },
            options: [
              { text: "Nothing arrives - a string has no f0 tag, so the read comes back empty.", correct: true,
                feedback: "Sealed freight: parse first, read second. Always. Watch the name line blank out - reading .f0 off a string gives undefined, which wipes the line to empty." },
              { text: "Tomas Berg, as intended.",
                feedback: "The opposite - watch the name line blank out. data.f0 asked a string for a tag it can't have, so nothing came back to show." },
              { text: "The whole string, tags and all.",
                feedback: "Close - that's what writing data alone would show. But data.f0 asks a string for a tag: empty." }
            ]
          },
          {
            type: "fill",
            prompt: "Break the seal and name the opened bundle.",
            render: { html: HTML, css: CSS, mode: "video" },
            code: 'var d = JSON.{{blank}}(data);',
            bank: ["parse", "open", "read", "f0"],
            answer: "parse",
            success: "The seal's broken - d is now a real bundle you can read tags off. Nothing shows on air yet; the reading comes next.",
            feedback: {
              "open": "Right idea, wrong spelling - the tool's real name is JSON.parse. Machines don't forgive synonyms any more than typos.",
              "read": "Right idea, wrong spelling - the tool's real name is JSON.parse. Machines don't forgive synonyms any more than typos.",
              "f0": "f0 is a tag INSIDE the bundle. First open the whole delivery: JSON.parse."
            }
          },
          {
            type: "predict",
            prompt: "The operator leaves Title blank, so d.f1 comes back undefined. Setting textContent = d.f1 just blanks the line - so why do pros still write d.f1 || \"\" everywhere?",
            render: { html: HTML, css: CSS, mode: "video", autoplay: true },
            options: [
              { text: "The moment that value is joined into a string - like \"Live: \" + d.f1 - undefined turns into the literal word on air. || \"\" keeps it clean.", correct: true,
                feedback: "Exactly. A plain textContent quietly hides an undefined, but string-joining exposes it. || \"\" is two characters of insurance that hold in both places." },
              { text: "No reason - blank is blank either way.",
                feedback: "For a plain textContent, true - both blank. But the moment that value is built into a longer string, undefined shows up as literal text. The habit protects you there." }
            ]
          },
          {
            type: "arrange",
            prompt: "Assemble the canonical update: open the delivery, then put the value where it belongs.",
            render: { html: HTML, css: CSS, mode: "video" },
            blocks: [
              'function update(data) {',
              '  var d = JSON.parse(data);',
              '  document.getElementById("name").textContent = d.f0 || "";',
              '}'
            ],
            success: "Open the delivery, then read and place - the shape every live template runs on.",
            feedback: { default: "Parse first, read second: before JSON.parse runs, d doesn't exist yet - the bundle is still sealed. And every step lives inside update's braces." }
          }
        ]
      },

      {
        id: "7.7", title: "The f0 handshake",
        concept: "Each operator field fN pairs with one element id=\"fN\" - update() is just 'for each field, write its value into its element'.",
        explain: "SPX templates run on one handshake: field f0 writes into the element with id=\"f0\", f1 into id=\"f1\", same name on both ends. So the strap's ids change today: name becomes f0, title becomes f1. Remember Unit 2 - an id describes the element's job? In a live template, the job IS the field number. And the handshake isn't magic: it's those two lines in update(), and lines can be wrong.",
        exercises: [
          {
            type: "observe",
            prompt: "Field f0 was set to Tomas Berg - press PLAY to watch it arrive. Which line of update() carried it into the strap?",
            render: { html: FHTML, css: FCSS, mode: "video",
              js: HS_GOOD + '\nfunction play(){ update(JSON.stringify({ f0: "Tomas Berg", f1: "News Anchor" })); }' },
            lines: [
              'document.getElementById("f0").textContent = d.f0 || "";',
              'document.getElementById("f1").textContent = d.f1 || "";'
            ],
            answer: 0,
            highlight: "#f0",
            success: "Field f0 -> d.f0 -> element f0: the same name at every station. That's the handshake.",
            feedback: {
              1: "That line carries the second field. Follow the name: field f0 -> d.f0 -> element f0 - the same name at every station."
            }
          },
          {
            type: "predict",
            prompt: "The operator edits field f1. Which element changes?",
            render: { html: FHTML, css: FCSS, mode: "video" },
            options: [
              { text: "The element with id=\"f1\" - the title line.", correct: true,
                feedback: "f1's value rides f1's wire into f1's element. Name to name." },
              { text: "The element with id=\"f0\".",
                feedback: "Wrong wire. f1's value rides f1's wire into f1's element - the handshake is name-to-name." },
              { text: "Both lines.",
                feedback: "One field, one element. Two lines change only when two fields are edited." }
            ]
          },
          {
            type: "fill",
            prompt: "Complete the first wire so element f0 takes its own field.",
            render: { html: FHTML, css: FCSS, mode: "video" },
            code: 'document.getElementById("f0").textContent = d.{{blank}};',
            bank: ["f0", "f1", "name", "\"f0\""],
            answer: "f0",
            success: "Wired - element f0 now takes field f0, so the operator's Name lands on the top line. You'll watch it play out in the operator drill.",
            feedback: {
              "f1": "That crosses the wires - the second field's value would land in the first element. Same name on both ends: element f0 takes d.f0.",
              "name": "The old id retired this lesson - and the bundle never had a name tag anyway. Fields ship as f0, f1, ...",
              "\"f0\"": "Quotes belong in getElementById, where the id rides as text. After d. comes the bare tag: d.f0."
            }
          },
          {
            type: "fix", kernel: true,
            prompt: "On air the name and title have swapped - News Anchor sits big on top, Maria Kranz small below. Somebody crossed the wires. Tap a crossed write line, then fix it.",
            render: { html: FHTML, css: FCSS, mode: "video", autoplay: true, js: HS_CROSS + HS_DEMO },
            tokens: [
              'var d = JSON.parse(data);',
              'document.getElementById("f1").textContent = d.f0 || "";',
              'document.getElementById("f0").textContent = d.f1 || "";'
            ],
            answer: 1,
            fixedToken: 'document.getElementById("f0").textContent = d.f0 || "";',
            fixedRender: { js: HS_GOOD + HS_DEMO },
            success: "Each element takes its own field again - name on top, title below. The handshake is code, and code can be set right.",
            feedback: {
              0: "The delivery opened fine - the values exist, they just land in each other's elements. Look at the WRITE lines: does each element take its own field?",
              2: "That's the other crossed line - the same swap seen from the other side. Tap the f1 line and repair the pair."
            }
          },
          {
            type: "predict",
            prompt: "In Unit 2 you chose the id name because it described the element's job. Today that id is f0. What's the element's job now?",
            render: { html: FHTML, css: FCSS, mode: "video" },
            options: [
              { text: "Holding whatever the operator's first field says - and f0 names exactly that.", correct: true,
                feedback: "The job description got more precise, not less: this element belongs to field f0, forever, whoever is on air." },
              { text: "Nothing changed - ids are decoration.",
                feedback: "Ids are how JS finds the element (7.3). Rename one end of a wire and the handshake breaks - the opposite of decoration." },
              { text: "The element now holds the text 'f0'.",
                feedback: "Ids never show on screen (2.3). The id names the element's role: the landing spot for field f0." }
            ]
          }
        ]
      },

      {
        id: "7.8", title: "Describing the controls",
        concept: "window.SPXGCTemplateDefinition lists your DataFields - each with field (fN), ftype, title, value - and the operator panel builds itself from it.",
        explain: "How does SPX know your template has two text fields called Name and Title? You tell it - in the template definition, the sealed box from 2.6. Each DataField says field (which fN), ftype: \"textfield\" (a text box), title (the label the operator reads), and value (the default). The panel builds itself from this list. And a pro courtesy: the first two fields' values become the rundown row's preview - put the most important fields first.",
        exercises: [
          {
            type: "predict",
            prompt: "In the definition, field f0 has \"title\": \"Name\". You change it to \"Presenter name\" and the panel's first label re-renders. Who is that label written for?",
            render: { html: FHTML, css: FCSS, mode: "video" },
            options: [
              { text: "The operator - it's the human-readable name of the field.", correct: true,
                feedback: "The engine reads field, not title. The title exists so a stressed operator at 21:59 knows exactly what to type where." },
              { text: "SPX's playout engine.",
                feedback: "The engine reads field, not title. The title is for the human at the panel." },
              { text: "The viewer.",
                feedback: "Nothing in the head is ever drawn on screen (2.6). The title lives on the operator's panel, not on air." }
            ]
          },
          {
            type: "predict",
            prompt: "A rundown lists tonight's graphics one row each. With DataFields f0 (Name = Maria Kranz) and f1 (Title = News Anchor), what does this template's row preview?",
            render: { html: FHTML, css: FCSS, mode: "video" },
            options: [
              { text: "Maria Kranz and News Anchor - the values of the first two DataFields.", correct: true,
                feedback: "So an operator can tell ten straps apart at a glance - which is why your most important fields go first." },
              { text: "The description text.",
                feedback: "The description names the template. The row's preview shows the first two fields' values." },
              { text: "f0 and f1.",
                feedback: "Field numbers mean nothing to an operator scanning a rundown. SPX shows the values." }
            ]
          },
          {
            type: "fill",
            prompt: "Complete the second field's entry so its wire reaches the title line (id=\"f1\").",
            render: { html: FHTML, css: FCSS, mode: "video" },
            code: '{ "field": "{{blank}}", "ftype": "textfield", "title": "Title", "value": "News Anchor" }',
            bank: ["f1", "f2", "title", "textfield"],
            answer: "f1",
            success: "Field f1 defined - the operator's Title field now has a wire reaching the id=\"f1\" line.",
            feedback: {
              "f2": "There's no element id=\"f2\" in this strap - the wire would dangle. The title line's element is f1, so the field is f1.",
              "title": "That's the old Unit 2 id, retired in 7.7. field carries the fN name the handshake runs on.",
              "textfield": "That's the ftype - the KIND of control. field names which fN this is."
            }
          },
          {
            type: "arrange",
            prompt: "Assemble the Name field's entry: which field, what kind of control, what the operator reads, what's pre-filled.",
            render: { html: FHTML, css: FCSS, mode: "video" },
            blocks: [
              '{ "field": "f0",',
              '"ftype": "textfield",',
              '"title": "Name",',
              '"value": "Maria Kranz" }'
            ],
            success: "One DataField is one bundle (7.5): four labeled values between one pair of braces.",
            feedback: { default: "A DataField is one bundle: four labeled values, in one pair of braces, in order - which field, what kind, what label, what default." }
          },
          {
            type: "fix", kernel: true,
            prompt: "The panel shows a field labeled Title, but typing into it changes nothing. Facts: the element is id=\"f1\" and update writes d.f1 into it. Tap the mismatch in the definition entry.",
            render: { html: FHTML, css: FCSS, mode: "video" },
            tokens: [
              '{ "field":',
              '"f2"',
              ', "ftype": "textfield", "title": "Title", "value": "News Anchor" }'
            ],
            answer: 1,
            fixedToken: '"f1"',
            success: "One name, three places: field, update line, and id must all say f1. Now the control's wire reaches the title line.",
            feedback: {
              0: "field is the right label to carry the fN name - the problem is the VALUE it's set to. The element and update both say f1; this says something else.",
              2: "The ftype, title and value are fine - the operator can read the label. The machine end is the field number: it must match the element's id."
            }
          },
          {
            type: "predict",
            prompt: "Where does the definition live?",
            render: { html: FHTML, css: FCSS, mode: "video" },
            options: [
              { text: "In the <head>, as its last item.", correct: true,
                feedback: "The definition is settings - head material, and by SPX convention the head's last item, after the styles and scripts." },
              { text: "In the <body>, with the elements.",
                feedback: "The body is what's on screen. The definition is settings - head material." },
              { text: "Anywhere - order is decoration.",
                feedback: "SPX reads the definition from the head, last item - the convention this course and the pros' templates always follow." }
            ]
          }
        ]
      },

      {
        id: "7.9", title: "Review remix",
        concept: "The whole contract, one lap: definition describes, update delivers, play performs, stop clears.",
        explain: "Nothing new here - a lap of everything the contract taught you, in fresh combinations, before the checkpoint.",
        exercises: [
          {
            type: "predict", kernel: true,
            prompt: "The operator types Sports Reporter into Title (f1). In the code, what happens FIRST to the delivery before anything can be read?",
            render: { html: FHTML, css: FCSS, mode: "video" },
            options: [
              { text: "JSON.parse breaks the seal, turning the string into a readable bundle.", correct: true,
                feedback: "Parse, then read d.f1, then write into #f1 - always that order. The delivery is sealed until parse." },
              { text: "d.f1 reads the new title straight off.",
                feedback: "Not yet - the delivery is sealed text until JSON.parse opens it. Parse first, read second." },
              { text: "getElementById(\"f1\") writes it into the strap.",
                feedback: "That's the last station, not the first. Nothing can be written before the bundle is parsed and read." }
            ]
          },
          {
            type: "fix",
            prompt: "This grab comes back empty - the overlay says the grip closed on nothing. Tap the problem.",
            render: { html: FHTML, css: FCSS, mode: "video",
              js: 'var held = document.getElementById("#f0"); held.className = "line hl";' },
            tokens: ['document.getElementById(', '"#f0"', ')'],
            answer: 1,
            fixedToken: '"f0"',
            fixedRender: { js: 'var held = document.getElementById("f0"); held.className = "line hl";' },
            success: "Hash gone, grip closed. getElementById wants the id alone; the hash is CSS spelling.",
            feedback: {
              0: "The tool is spelled right. Read inside the quotes: is there an element whose id is literally hash-f-zero?",
              2: "The parentheses belong. The stowaway is inside the quotes: the hash getElementById never wants."
            }
          },
          {
            type: "predict",
            prompt: "A definition lists three textfields: f0 (Name), f1 (Title), f2 (Location). How many controls does the panel build, and which values does the rundown row preview?",
            render: { html: FHTML, css: FCSS, mode: "video" },
            options: [
              { text: "Three controls; the row previews f0's and f1's values.", correct: true,
                feedback: "One control per DataField; the first two fields' values are the preview. Lead with what matters." },
              { text: "Three controls; the row previews all three.",
                feedback: "Three controls, yes - but the rundown preview is just the first TWO fields' values." },
              { text: "Two controls; the third is the preview.",
                feedback: "Every DataField builds a control - so three. The preview is a copy of the first two values, not a missing control." }
            ]
          },
          {
            type: "arrange",
            prompt: "Assemble the complete minimal update() - and leave the crossed-wire distractor in the bank unused.",
            render: { html: FHTML, css: FCSS, mode: "video" },
            blocks: [
              'function update(data) {',
              '  var d = JSON.parse(data);',
              '  document.getElementById("f0").textContent = d.f0 || "";',
              '}'
            ],
            distractors: ['  document.getElementById("#f1").textContent = d.f0;'],
            success: "Signature, parse, a safety-netted write into its own element, close - and the hash-and-crossed distractor rejected.",
            feedback: { default: "Parse before you read; each element takes its OWN field; and reject the block with the hash-in-getElementById and the crossed f0/f1." }
          },
          {
            type: "predict",
            prompt: "An update body reads d.name from a bundle whose only tags are f0 and f1. What lands on air?",
            render: { html: FHTML, css: FCSS, mode: "video" },
            options: [
              { text: "Nothing - there's no name tag, so the read is empty.", correct: true,
                feedback: "Read the tags that exist. SPX ships fields as f0, f1, ... - never name." },
              { text: "The presenter's name.",
                feedback: "The bundle has no tag called name - only f0 and f1. Reading a missing tag comes back empty." },
              { text: "The word name.",
                feedback: "d.name asks for a value, not the label text. The tag is missing, so: nothing." }
            ]
          }
        ]
      },

      {
        id: "cp7", title: "Checkpoint: Operator-ready",
        concept: "Wire the branded strap to the SPX contract, then sit in the operator's chair and drive it.",
        explain: "The branded, animated strap goes live tonight. Wire it so the operator never opens the code - the definition, the update body, the play/stop pair - then prove it from the SPX panel. Tonight's rundown card: Priya Nair, Economics Editor.",
        isCheckpoint: true,
        exercises: [
          {
            type: "arrange",
            prompt: "Part 1a - the update body. Assemble it: open the delivery, then send each field to its own element, safety-netted.",
            render: { html: FHTML, css: FCSS, mode: "video" },
            blocks: [
              'function update(data) {',
              '  var d = JSON.parse(data);',
              '  document.getElementById("f0").textContent = d.f0 || "";',
              '  document.getElementById("f1").textContent = d.f1 || "";',
              '}'
            ],
            success: "Parse, then two handshake writes with the safety net. That is the whole data path.",
            feedback: { default: "Parse first; each element takes its own field (f0 <- d.f0, f1 <- d.f1); both writes carry || \"\"; everything inside the braces." }
          },
          {
            type: "fill",
            prompt: "Part 1b - the definition. Complete the Name field so it wires to the top line (id=\"f0\") and leads the rundown preview.",
            render: { html: FHTML, css: FCSS, mode: "video" },
            code: '{ "field": "{{blank}}", "ftype": "textfield", "title": "Name", "value": "Maria Kranz" }',
            bank: ["f0", "f1", "name", "Name"],
            answer: "f0",
            success: "Name field wired to f0 - it leads the rundown and lands on the top line.",
            feedback: {
              "f1": "f1 is the title line's field. The Name control must carry f0 to reach the top line - and to lead the preview.",
              "name": "The descriptive id retired in 7.7. field carries the fN name: f0.",
              "Name": "That's the title the operator reads - it's already in the title slot. field carries the machine name: f0."
            }
          },
          {
            type: "fix",
            prompt: "Part 1c - the playout pair. On air, PLAY fades the strap OUT and STOP slides it IN (press both). The timelines answer to the wrong names. Tap the exit body sitting under play().",
            render: { html: FHTML, css: FCSS, mode: "video", autoplay: true,
              js: 'function play() { gsap.to("#strap", { opacity: 0, duration: 0.3, ease: "power2.in" }) }\nfunction stop() { gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }) }' },
            tokens: [
              'function play() {',
              'gsap.to("#strap", { opacity: 0, duration: 0.3, ease: "power2.in" })',
              '}',
              'function stop() {',
              'gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })',
              '}'
            ],
            answer: 1,
            fixedToken: 'gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })',
            fixedRender: { js: WIRED },
            success: "Entrance under play, exit under stop. Press PLAY - the buttons keep their promises. Now drive it.",
            feedback: {
              4: "That entrance is in the wrong home too - the other half of the swap. Tap the fade-out under play() to correct the pair.",
              default: "Both are well-formed and the eases fit their moves. Read what each body DOES against the name that promises it to SPX."
            }
          },
          {
            type: "operate", kernel: true,
            prompt: "Part 2 - drive it. The rundown card reads Priya Nair, Economics Editor. Type both into the panel, press Update, then Play the strap on air.",
            render: { html: FHTML, css: FCSS, mode: "video", js: WIRED },
            panel: [
              { id: "f0", label: "Name", value: "Maria Kranz", expect: "Priya Nair" },
              { id: "f1", label: "Title", value: "News Anchor", expect: "Economics Editor" }
            ],
            check: [
              { sel: "#f0", text: "Priya Nair" },
              { sel: "#f1", text: "Economics Editor" }
            ],
            successFeedback: "On air, from the operator's chair, without ever opening the code. That is a wired template - the whole point of the unit. You are operator-ready.",
            feedback: { default: "Type both fields to match the rundown card, press Update to send them into the strap, then Play. Check each line against the card - Priya Nair on top, Economics Editor below." }
          }
        ]
      }

    ]
  });

})();
