// Unit 9 - Making It Real. Source of truth: lessons/unit-09.md
// Capstones 9.3-9.6 are staged builds (arrange/fill stages gated in order, ending in an
// operate exercise driving the finished template). Capstone D's crawl loops via CSS
// @keyframes (the GSAP shim has no repeat). 9.9 encodes the optional real-SPX
// walkthrough as predicts and carries the unit's checkpoint flag.
window.COURSE_DATA = window.COURSE_DATA || [];
(function () {

  /* ---------- Capstone A: NN lower third ---------- */
  var NN_CSS = [
    '#strap { position: absolute; left: 96px; bottom: 96px; background-color: #0a3d91; padding: 18px 32px; font-family: Arial, sans-serif; opacity: 0; }',
    '#f0 { color: #ffffff; font-size: 44px; font-weight: 700; }',
    '#f1 { color: #e8b90c; font-size: 28px; margin-top: 6px; }'
  ].join('\n');
  var NN_HTML = '<div id="strap"><div id="f0">Maria Kranz</div><div id="f1">News Anchor</div></div>';
  var NN_JS = [
    'function update(data) {',
    '  var d = JSON.parse(data);',
    '  document.getElementById("f0").textContent = d.f0;',
    '  document.getElementById("f1").textContent = d.f1;',
    '}',
    'function play() {',
    '  var tl = gsap.timeline();',
    '  tl.fromTo("#strap", { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" });',
    '  tl.fromTo("#f0", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");',
    '  tl.fromTo("#f1", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");',
    '}',
    'function stop() {',
    '  gsap.to("#strap", { x: -40, opacity: 0, duration: 0.3, ease: "power2.in" });',
    '}'
  ].join('\n');

  /* ---------- Capstone B: NN corner bug ---------- */
  var BUG_CSS = [
    '#bug { position: absolute; top: 54px; right: 96px; opacity: 0; font-family: Arial, sans-serif; text-align: center; }',
    '#logo { width: 110px; height: 110px; margin: 0 auto; background: linear-gradient(135deg, #e8b90c, #b8860b); border-radius: 12px; color: #0a2a5e; font-size: 44px; font-weight: 700; line-height: 110px; animation: breathe 4s ease-in-out infinite; }',
    '@keyframes breathe {',
    '  0% { transform: scale(1); }',
    '  50% { transform: scale(1.03); }',
    '  100% { transform: scale(1); }',
    '}',
    '#f0 { color: #ffffff; font-size: 20px; margin-top: 8px; transition: opacity 0.3s; }',
    '.hidden { opacity: 0; }'
  ].join('\n');
  var BUG_HTML = '<div id="bug"><div id="logo">NN</div><div id="f0">with NN Weather</div></div>';
  var BUG_JS = [
    'function update(data) {',
    '  var d = JSON.parse(data);',
    '  var sponsor = document.getElementById("f0");',
    '  sponsor.textContent = d.f0;',
    '  if (d.f1 == "1") { sponsor.classList.remove("hidden"); }',
    '  else { sponsor.classList.add("hidden"); }',
    '}',
    'function play() {',
    '  gsap.fromTo("#bug", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });',
    '}',
    'function stop() {',
    '  gsap.to("#bug", { scale: 0.8, opacity: 0, duration: 0.25, ease: "power2.in" });',
    '}'
  ].join('\n');

  /* ---------- Capstone C: election full-screen ---------- */
  var FS_CSS = [
    ':root { --panel: #0a3d91; }',
    '#full { opacity: 0; font-family: Arial, sans-serif; }',
    '#panel { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--panel); }',
    '#f0 { position: absolute; left: 96px; top: 420px; color: #ffffff; font-size: 96px; font-weight: 700; }',
    '#f1 { position: absolute; left: 96px; top: 560px; color: #e8b90c; font-size: 44px; }'
  ].join('\n');
  var FS_HTML = '<div id="full"><div id="panel"></div><div id="f0">ELECTION NIGHT</div><div id="f1">Live results from all 13 districts</div></div>';
  var FS_JS = [
    'function update(data) {',
    '  var d = JSON.parse(data);',
    '  document.getElementById("f0").textContent = d.f0;',
    '  document.getElementById("f1").textContent = d.f1;',
    '  document.getElementById("panel").style.backgroundColor = d.f2;',
    '}',
    'function play() {',
    '  var tl = gsap.timeline();',
    '  tl.to("#full", { opacity: 1, duration: 0 });',
    '  tl.to("#f1", { opacity: 0, duration: 0 });',
    '  tl.fromTo("#panel", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });',
    '  tl.fromTo("#f0", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");',
    '}',
    'function next() {',
    '  gsap.fromTo("#f1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });',
    '}',
    'function stop() {',
    '  gsap.to("#full", { opacity: 0, duration: 0.4, ease: "power2.in" });',
    '}'
  ].join('\n');

  /* ---------- Capstone D: NN ticker ---------- */
  var TICK_CSS = [
    '#bar { position: absolute; left: 0; right: 0; bottom: 0; background-color: #0a3d91; padding: 16px 0; opacity: 0; }',
    '#crawl { color: #ffffff; font-family: Arial, sans-serif; font-size: 30px; white-space: nowrap; animation: crawl 18s linear infinite; }',
    '@keyframes crawl {',
    '  from { transform: translateX(1920px); }',
    '  to { transform: translateX(-100%); }',
    '}'
  ].join('\n');
  var TICK_HTML = '<div id="bar"><div id="crawl">+++ STORM WARNING +++ DERBY TONIGHT +++</div></div>';
  var TICK_JS = [
    'function update(data) {',
    '  var d = JSON.parse(data);',
    '  var items = d.f0.split(" | ");',
    '  document.getElementById("crawl").textContent = "+++ " + items.join(" +++ ") + " +++";',
    '}',
    'function play() {',
    '  gsap.fromTo("#bar", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });',
    '}',
    'function stop() {',
    '  gsap.to("#bar", { y: 60, opacity: 0, duration: 0.3, ease: "power2.in" });',
    '}'
  ].join('\n');

  /* ---------- 9.1 operator's desk / 9.7 planted fault ---------- */
  var DESK_CSS = [
    '#bug19 { position: absolute; top: 54px; right: 96px; width: 100px; height: 100px; background: linear-gradient(135deg, #e8b90c, #b8860b); border-radius: 12px; color: #0a2a5e; font-size: 40px; font-weight: 700; line-height: 100px; text-align: center; font-family: Arial, sans-serif; }',
    '#strap7 { position: absolute; left: 96px; bottom: 96px; background-color: #0a3d91; color: #ffffff; padding: 18px 32px; font-family: Arial, sans-serif; font-size: 44px; font-weight: 700; }'
  ].join('\n');
  var DESK_HTML = '<div id="bug19">NN</div><div id="strap7">HIFK 3 - 2 TPS</div>';

  var SPORT_CSS = [
    '#strap { position: absolute; left: 96px; bottom: 96px; background-color: #12131a; color: #f5f6fa; padding: 18px 32px; font-family: Arial, sans-serif; font-size: 44px; font-weight: 700; opacity: 0; }',
    '#strap span { color: #e8b90c; }'
  ].join('\n');
  var SPORT_HTML = '<div id="strap">HIFK <span>3 - 2</span> TPS</div>';
  var SPORT_JS = 'function play() {\n  gsap.fromTo("#strap", { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });\n}\nfunction stop() {\n  gsap.to("#strap", { y: 120, opacity: 0, duration: 0.9, ease: "power2.in" });\n}';

  /* ---------- 9.2 grown-up definition strap ---------- */
  var NN92_CSS = [
    '#strap { position: absolute; left: 96px; bottom: 96px; background-color: #0a3d91; padding: 18px 32px; font-family: Arial, sans-serif; }',
    '#logo { display: inline-block; background-color: #e8b90c; color: #0a2a5e; font-weight: 700; font-size: 30px; padding: 2px 12px; margin-right: 14px; transition: opacity 0.3s; }',
    '.hidden { opacity: 0; }',
    '#f0 { display: inline; color: #ffffff; font-size: 44px; font-weight: 700; }',
    '#f1 { color: #dbe4f5; font-size: 26px; margin-top: 6px; }'
  ].join('\n');
  var NN92_HTML = '<div id="strap"><div><span id="logo">NN</span><span id="f0">Maria Kranz</span></div><div id="f1">News Anchor</div></div>';
  var NN92_FIXED_JS = 'function update(data) {\n  var d = JSON.parse(data);\n  var logo = document.getElementById("logo");\n  if (d.f3 == "0") { logo.classList.add("hidden"); }\n  else { logo.classList.remove("hidden"); }\n}';
  var NN92_BROKEN_JS = NN92_FIXED_JS.replace('d.f3 == "0"', 'd.f3 == "1"');

  COURSE_DATA.push({
    id: 9,
    title: "Making It Real",
    promise: "Deliver four working templates to a real SPX rundown.",
    lessons: [

      {
        id: "9.1", title: "The operator's desk",
        concept: "A show is a rundown: items with field values, driven Play/Continue/Stop, stacked on layers.",
        explain: "You've been playing one template at a time. A real show is a rundown: a list of graphic items, each one a template plus tonight's field values. The operator walks the list while long-running graphics like the bug sit on their own layer and never blink.",
        exercises: [
          {
            type: "predict",
            prompt: "A 3-item news block ran: strap in and out, full-screen in and out, second strap - and the corner bug never flinched the whole time. Why?",
            render: { html: DESK_HTML, css: DESK_CSS, autoplay: true },
            options: [
              { text: "It sits on its own layer, played once and left alone.", correct: true,
                feedback: "One play, one layer, all show long - while straps come and go below it." },
              { text: "It's burned into the video clip.",
                feedback: "Nothing here is in the video - every graphic is a template on a layer. Stop the bug's layer and it's gone." },
              { text: "It secretly re-plays between items.",
                feedback: "No - it never re-plays. Played once onto its own layer, it simply holds there, all show long." }
            ]
          },
          {
            type: "predict",
            prompt: "The bug is on layer 19, the strap on layer 7 - can both be on air at once?",
            render: { html: DESK_HTML, css: DESK_CSS, autoplay: true },
            options: [
              { text: "Yes - layers are independent; higher numbers just sit closer to the camera.", correct: true,
                feedback: "Exactly the stacking rule from 4.6, now at playout scale." },
              { text: "No - playing one stops the other.",
                feedback: "Only two items on the SAME layer replace each other. 19 and 7 live in different slots of the stack." },
              { text: "Only if they don't overlap on screen.",
                feedback: "Overlap is fine - that's what stacking order is for. The bug rides above everything below layer 19." }
            ]
          },
          {
            type: "operate", kernel: true,
            prompt: "Producer's note: 'Tonight's guest got promoted - she's Chief Political Editor now. Fix it.' Fix it the way the operator would: edit the item's Title field (never the template file), Update, then Play.",
            render: { html: '<div id="strap"><div id="f0">Sofia Lindqvist</div><div id="f1">Political Correspondent</div></div>', css: NN_CSS, js: NN_JS, autoplay: false },
            panel: [
              { id: "f0", label: "Name", value: "Sofia Lindqvist", expect: "Sofia Lindqvist" },
              { id: "f1", label: "Title", value: "Political Correspondent", expect: "Chief Political Editor" }
            ],
            check: [
              { sel: "#f0", text: "Sofia Lindqvist" },
              { sel: "#f1", text: "Chief Political Editor" }
            ],
            successFeedback: "Tonight's value lives in the rundown item's fields - the operator's territory. The template file (and its defaults) is the developer's.",
            feedback: { default: "The strap doesn't say Chief Political Editor yet. Edit the Title field exactly, press Update, then Play." }
          },
          {
            type: "predict",
            prompt: "In the rundown, Continue is greyed out for the strap but active for the Election full-screen. Why?",
            options: [
              { text: "The full-screen's definition says \"steps\": \"2\" - Continue means 'next phase'.", correct: true,
                feedback: "8.6 at the real desk: declared steps put the button in the operator's hand." },
              { text: "The strap is broken.",
                feedback: "Nothing's broken - a one-step graphic simply has no next phase to continue to." },
              { text: "Continue only works on full-screens.",
                feedback: "It works on any template whose definition declares 2 or more steps - the graphic's TYPE is irrelevant." }
            ]
          },
          {
            type: "predict",
            prompt: "Who does what? 'The operator changes how FAST the strap animates.' True or false?",
            options: [
              { text: "False - speed lives in the template's timelines. That's the developer's side of the desk: yours.", correct: true,
                feedback: "The operator changes what it SAYS tonight; the template decides what PLAY actually does. SPX calls, your code answers - as it has since 1.2." },
              { text: "True - there's a speed field.",
                feedback: "Only if the developer built one. Out of the box, timing lives in play()'s timelines - the developer's side of the desk." }
            ]
          }
        ]
      },

      {
        id: "9.2", title: "Better controls",
        concept: "dropdown, number and checkbox fields - and panel courtesy: readable titles, sensible defaults, preview fields first.",
        explain: "A textfield can't say 'pick one of these' or 'on/off'. A dropdown offers a fixed list (each item has a text the operator reads and a value your code receives), a number takes digits, a checkbox arrives as \"1\" or \"0\". The panel you define is a UI a colleague will use under studio pressure - design it like one.",
        exercises: [
          {
            type: "predict",
            prompt: "You add a third choice to the style dropdown: { \"text\": \"Boxed\", \"value\": \"boxed\" }. In the operator panel's list, which word does the operator read?",
            render: { html: NN92_HTML, css: NN92_CSS, js: NN92_FIXED_JS, autoplay: true },
            options: [
              { text: "Boxed", correct: true,
                feedback: "text is for the human, value is for your code. Two audiences, two spellings." },
              { text: "boxed",
                feedback: "That's the value - what lands in d.f2 for YOUR code. The operator reads the text: Boxed." },
              { text: "f2",
                feedback: "f2 is the field's name in the plumbing. The operator sees the title and the items' text entries." }
            ]
          },
          {
            type: "predict",
            prompt: "A field reads: \"ftype\": \"dropdown\", \"value\": \"Left align\", \"items\": [ {\"text\": \"Left align\", \"value\": \"left\"}, {\"text\": \"Centered\", \"value\": \"center\"} ]. What's wrong with it?",
            options: [
              { text: "The default is broken: value must exactly equal one of the items' VALUES - here \"left\" - not the visible text.", correct: true,
                feedback: "The field's value is machine-side. 'Left align' is the human-side text - the machine never matches it." },
              { text: "Nothing - 'Left align' is in the list.",
                feedback: "It's in the list as a TEXT. The field's value must match an item's VALUE - the machine-side spelling." },
              { text: "Dropdowns can't have defaults.",
                feedback: "They can and should - by naming one of the items' values as the field's value." }
            ]
          },
          {
            type: "fill",
            prompt: "The operator should be able to pick Centered, and your update() switches on the string center. Complete the item.",
            code: '{ "field": "f2", "ftype": "dropdown", "title": "Strap style",\n  "value": "left",\n  "items": [ { "text": "Left align", "value": "left" },\n             { "text": "Centered",   "value": "{{blank}}" } ] }',
            bank: ["center", "Centered", "f2"],
            answer: "center",
            feedback: {
              "Centered": "That's the human-facing text again. The value is what lands in d.f2 - and your code is listening for center.",
              "f2": "f2 is the field's NAME, not one of its choices."
            }
          },
          {
            type: "fix", kernel: true,
            prompt: "The panel's 'Show logo' checkbox is ticked, but the logo is gone; untick it and the logo appears. Checked means SHOW. Read the logic and fix it.",
            render: { html: NN92_HTML, css: NN92_CSS, js: NN92_BROKEN_JS, autoplay: true },
            tokens: ['if (d.f3 == "1")', '{ logo.classList.add("hidden"); }', 'else', '{ logo.classList.remove("hidden"); }'],
            answer: 0, fixedToken: 'if (d.f3 == "0")',
            fixedRender: { js: NN92_FIXED_JS },
            success: "Now unchecked (\"0\") hides and checked shows - the box finally does what its label promises.",
            feedback: {
              1: "Half right - but flip this branch alone and BOTH branches remove. Flip one thing: the test. Hide when d.f3 is \"0\".",
              3: "Same trap: flip this alone and both branches add. The clean single fix is the comparison - hide on \"0\".",
              default: "Checkboxes arrive as the strings \"1\" and \"0\" (never true/false). The comparison exists - it's just testing for the wrong one."
            }
          },
          {
            type: "arrange",
            prompt: "A colleague's field order makes the rundown row preview show a color code instead of tonight's guest. The first two fields ARE the preview. Reorder.",
            render: { html: NN92_HTML, css: NN92_CSS, js: NN92_FIXED_JS, autoplay: true },
            blocks: [
              '{ "field": "f0", "ftype": "textfield", "title": "Name" },',
              '{ "field": "f1", "ftype": "textfield", "title": "Title" },',
              '{ "field": "f2", "ftype": "color", "title": "Panel color" },',
              '{ "field": "f3", "ftype": "checkbox", "title": "Show logo" }'
            ],
            feedback: { default: "An operator scanning 40 items needs 'Maria Kranz - News Anchor' in the row, not rgba(10,61,145,1). Name and Title first." }
          },
          {
            type: "predict",
            prompt: "The producer wants a field for how many seconds the sponsor message stays up. Which ftype?",
            options: [
              { text: "number", correct: true,
                feedback: "Digits deserve a digits-only control." },
              { text: "textfield",
                feedback: "It would accept 'ten-ish'. Digits deserve a digits-only control: number." },
              { text: "checkbox",
                feedback: "That's an on/off. You need an amount: number." }
            ]
          }
        ]
      },

      {
        id: "9.3", title: "Capstone A: Lower third",
        concept: "Build the NN lower third from a brief - structure, style, motion, contract, fields - then drive it.",
        explain: "The job card: name + title fields, NN brand (panel #0a3d91, accent #e8b90c), title-safe lower-left, in under 0.6s decelerating with staggered lines, out faster and accelerating, preview shows name + title. This is Checkpoint 7's strap without training wheels - nothing in it is new.",
        exercises: [
          {
            type: "arrange",
            prompt: "Stage 1 - structure. Assemble the strap's body: a wrapper holding the two handshake lines, ids chosen BEFORE any wiring exists. One block stays unused.",
            render: { html: "", css: NN_CSS, js: NN_JS, autoplay: false },
            blocks: ['<div id="strap">', '  <div id="f0">Maria Kranz</div>', '  <div id="f1">News Anchor</div>', '</div>'],
            distractors: ['  <div id="#f0">Maria Kranz</div>'],
            slot: "html",
            success: "Wrapper plus f0/f1 - the handshake ids in place. It already plays with the given motion.",
            feedback: { default: "Wrapper first, the two lines nested inside, closer last - and one of those name lines carries a # inside its id. Ids never include the hash (8.7, suspect 1)." }
          },
          {
            type: "fill",
            prompt: "Stage 2 - style. Apply the brand card: the panel behind the strap is NN blue.",
            render: { html: NN_HTML, css: NN_CSS, js: NN_JS, autoplay: true },
            code: '#strap { position: absolute; left: 96px; bottom: 96px; background-color: {{blank}}; padding: 18px 32px; font-family: Arial, sans-serif; opacity: 0; }\n#f0 { color: #ffffff; font-size: 44px; font-weight: 700; }\n#f1 { color: #e8b90c; font-size: 28px; margin-top: 6px; }',
            bank: ["#0a3d91", "#e8b90c", "0a3d91"],
            answer: "#0a3d91", slot: "css",
            success: "Panel blue, name white and big, title gold - the card, applied. Note left 96 / bottom 96: title-safe, and resting opacity 0 so nothing airs before play.",
            feedback: {
              "#e8b90c": "That's the accent gold - the TITLE line's color. The panel behind everything is NN blue: #0a3d91.",
              "0a3d91": "The panel vanished - no #, no color, the declaration is thrown away silently. Suspect 3."
            }
          },
          {
            type: "fill",
            prompt: "Stage 3 - motion. The brief: in slides + fades, DECELERATING, under 0.6s. Set the entrance ease, then PLAY to feel it.",
            render: { html: NN_HTML, css: NN_CSS, js: NN_JS, autoplay: true },
            code: 'function play() {\n  var tl = gsap.timeline();\n  tl.fromTo("#strap", { x: -80, opacity: 0 },\n    { x: 0, opacity: 1, duration: 0.4, ease: "{{blank}}" });\n  tl.fromTo("#f0", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");\n  tl.fromTo("#f1", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");\n}\nfunction stop() {\n  gsap.to("#strap", { x: -40, opacity: 0, duration: 0.3, ease: "power2.in" });\n}',
            bank: ["power2.out", "power2.in", "none"],
            answer: "power2.out", slot: "js",
            success: "Lands softly, lines a beat apart, total 0.6s - and the out is shorter and eases in. fromTo states both ends, so a second play starts clean (6.5).",
            feedback: {
              "power2.in": "Play it - the strap speeds INTO frame and slams. Entrances decelerate: power2.out. (The out is where power2.in belongs.)",
              "none": "Linear motion feels mechanical - no landing at all. Entrances decelerate: power2.out."
            }
          },
          {
            type: "arrange",
            prompt: "Stage 4 - contract. Assemble update() so the operator's fields reach the strap. One block stays unused.",
            render: { html: NN_HTML, css: NN_CSS, js: NN_JS, autoplay: true },
            blocks: ['function update(data) {', '  var d = JSON.parse(data);', '  document.getElementById("f0").textContent = d.f0;', '  document.getElementById("f1").textContent = d.f1;', '}'],
            distractors: ['  var d = data;'],
            success: "Parse first - data arrives as a sealed JSON string (7.6) - then the two handshake writes, under the exact name update.",
            feedback: { default: "Parse before you read: var d = JSON.parse(data). The block without JSON.parse leaves d.f0 undefined - the 7.6 lesson." }
          },
          {
            type: "operate", kernel: true,
            prompt: "Delivery check. The rundown card reads: James Okafor, Political Correspondent. Fill the panel, Update, Play - then Stop and Play again: it must run clean twice.",
            render: { html: NN_HTML, css: NN_CSS, js: NN_JS, autoplay: false },
            panel: [
              { id: "f0", label: "Name", value: "", expect: "James Okafor" },
              { id: "f1", label: "Title", value: "", expect: "Political Correspondent" }
            ],
            check: [
              { sel: "#f0", text: "James Okafor" },
              { sel: "#f1", text: "Political Correspondent" }
            ],
            successFeedback: "Capstone A delivered: brand card, title-safe, in under 0.6s easing out, out faster easing in, fields with readable titles - the full checklist, passed.",
            feedback: { default: "The strap doesn't match the card yet. Type both fields exactly, Update, then Play." }
          }
        ]
      },

      {
        id: "9.4", title: "Capstone B: Corner bug",
        concept: "An always-on graphic: subtle looping idle, checkbox-driven sponsor line, an out setting that survives a show.",
        explain: "The job card: the NN mark pinned top-right inside title-safe, a sponsor line (text field) with a show/hide checkbox, a breathing idle animation - felt, not seen - and an out setting fit for a graphic that must survive a full show.",
        exercises: [
          {
            type: "arrange",
            prompt: "Stage 1 - structure. The bug: a wrapper holding the logo mark and the sponsor line. The in/out will fly the wrapper; the idle will breathe the logo - two motions, two elements.",
            render: { html: "", css: BUG_CSS, js: BUG_JS, autoplay: false },
            blocks: ['<div id="bug">', '  <div id="logo">NN</div>', '  <div id="f0">with NN Weather</div>', '</div>'],
            distractors: ['<div class="bug">'],
            slot: "html",
            success: "Wrapper, logo, sponsor line. Watch the logo: it's already breathing - the CSS keyframes run on their own.",
            feedback: { default: "The wrapper is grabbed by id in play() - a class-only div matches nothing there. Wrapper (id bug) first, logo and sponsor nested, closer last." }
          },
          {
            type: "fill",
            prompt: "Stage 2 - the idle. The brief says breathing 'felt, not seen'. Set the peak of the loop - then watch it breathe.",
            render: { html: BUG_HTML, css: BUG_CSS, js: BUG_JS, autoplay: true },
            code: '#bug { position: absolute; top: 54px; right: 96px; opacity: 0; font-family: Arial, sans-serif; text-align: center; }\n#logo { width: 110px; height: 110px; margin: 0 auto; background: linear-gradient(135deg, #e8b90c, #b8860b); border-radius: 12px; color: #0a2a5e; font-size: 44px; font-weight: 700; line-height: 110px; animation: breathe 4s ease-in-out infinite; }\n@keyframes breathe {\n  0% { transform: scale(1); }\n  50% { transform: scale({{blank}}); }\n  100% { transform: scale(1); }\n}\n#f0 { color: #ffffff; font-size: 20px; margin-top: 8px; transition: opacity 0.3s; }\n.hidden { opacity: 0; }',
            bank: ["1.03", "1.4", "1"],
            answer: "1.03", slot: "css",
            success: "Under 1.05: it's a bug, not a beacon. And note the loop lives on the LOGO while play() flies the WRAPPER - two drivers, two steering wheels.",
            feedback: {
              "1.4": "Look at it - jumping jacks in the corner, all show long. Idle motion on an always-on graphic should be felt, not seen. Keep it at or under 1.05.",
              "1": "Scale 1 to 1 to 1 - no breathing at all. Give it a whisper: 1.03."
            }
          },
          {
            type: "fill",
            prompt: "Stage 3 - the checkbox. It arrives as the string \"1\" (ticked) or \"0\". Ticked means SHOW the sponsor line. Complete update().",
            render: { html: BUG_HTML, css: BUG_CSS, js: BUG_JS, autoplay: true },
            code: 'function update(data) {\n  var d = JSON.parse(data);\n  var sponsor = document.getElementById("f0");\n  sponsor.textContent = d.f0;\n  if (d.f1 == "1") { sponsor.classList.{{blank}}("hidden"); }\n  else { sponsor.classList.add("hidden"); }\n}\nfunction play() {\n  gsap.fromTo("#bug", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });\n}\nfunction stop() {\n  gsap.to("#bug", { scale: 0.8, opacity: 0, duration: 0.25, ease: "power2.in" });\n}',
            bank: ["remove", "add", "toggle"],
            answer: "remove", slot: "js",
            success: "Ticked strips the hidden label; unticked adds it. The 9.2 kernel, wired right on the first try.",
            feedback: {
              "add": "That's the 9.2 classic in the wild: ticked would HIDE the line. \"1\" means shown - take the hidden label away: remove.",
              "toggle": "toggle flips whatever's there - the box would drift out of sync with the graphic. State it explicitly: remove on \"1\", add otherwise."
            }
          },
          {
            type: "predict",
            prompt: "Stage 4 - the out setting. The definition offers out: \"manual\" vs \"none\" vs \"4000\". Which suits a bug that must survive a full show?",
            render: { html: BUG_HTML, css: BUG_CSS, js: BUG_JS, autoplay: true },
            options: [
              { text: "\"manual\" - the operator takes it out at the end; never a timer.", correct: true,
                feedback: "\"4000\" would auto-stop the layer four seconds into the show; \"none\" makes it play-only with no out at all. Manual keeps the bug up until someone decides." },
              { text: "\"4000\" - a nice long time.",
                feedback: "That's four SECONDS - a millisecond out auto-stops the layer. Your bug would clock out four seconds into the show." },
              { text: "\"none\" - it never goes out.",
                feedback: "Then STOP can't take it out either - play-only. The show ends someday; the operator needs the exit: manual." }
            ]
          },
          {
            type: "operate", kernel: true,
            prompt: "Delivery check. New sponsor tonight: set the line to say with NN Sport, keep the checkbox field at 1 so it shows, Update, Play.",
            render: { html: BUG_HTML, css: BUG_CSS, js: BUG_JS, autoplay: false },
            panel: [
              { id: "f0", label: "Sponsor line", value: "with NN Weather", expect: "with NN Sport" },
              { id: "f1", label: "Show sponsor (1 = on, 0 = off)", value: "1", expect: "1" }
            ],
            check: [
              { sel: "#f0", text: "with NN Sport" },
              { sel: "#f0", style: { opacity: "1" } }
            ],
            successFeedback: "Capstone B delivered: title-safe corner pin, breathing under 1.05 on the logo while the wrapper flies, checkbox wired the right way round, manual out.",
            feedback: { default: "The sponsor line isn't showing 'with NN Sport' yet - or it's hidden. Check both fields, Update, then Play." }
          }
        ]
      },

      {
        id: "9.5", title: "Capstone C: Full-screen title",
        concept: "A two-step full-screen: play reveals the title, Continue (next) reveals the subtitle, a dropdown drives the panel color.",
        explain: "The job card: title, subtitle, and a panel-color dropdown driving the panel via .style. Two steps - Play reveals the title, Continue the subtitle, Stop clears. The panel covers the frame deliberately; the text stays title-safe.",
        exercises: [
          {
            type: "arrange",
            prompt: "Stage 1 - structure. The panel must be a SEPARATE element from the text, so it can be colored and faded on its own. Assemble - one block stays unused.",
            render: { html: "", css: FS_CSS, js: FS_JS, autoplay: false },
            blocks: ['<div id="full">', '  <div id="panel"></div>', '  <div id="f0">ELECTION NIGHT</div>', '  <div id="f1">Live results from all 13 districts</div>', '</div>'],
            distractors: ['  <div id="panel">ELECTION NIGHT</div>'],
            slot: "html",
            success: "Panel, title, subtitle - three siblings inside the wrapper. The panel can now take the operator's color without touching the text.",
            feedback: { default: "One panel block has the headline TRAPPED inside it - color that panel and you can't fade the text separately. The panel stays empty; the title is its own element." }
          },
          {
            type: "fill",
            prompt: "Stage 2 - coverage. This graphic covers the frame ON PURPOSE (1.3, inverted knowingly). Pin the panel's fourth edge.",
            render: { html: FS_HTML, css: FS_CSS, js: FS_JS, autoplay: true },
            code: ':root { --panel: #0a3d91; }\n#full { opacity: 0; font-family: Arial, sans-serif; }\n#panel { position: absolute; top: 0; left: 0; right: 0; {{blank}}: 0; background-color: var(--panel); }\n#f0 { position: absolute; left: 96px; top: 420px; color: #ffffff; font-size: 96px; font-weight: 700; }\n#f1 { position: absolute; left: 96px; top: 560px; color: #e8b90c; font-size: 44px; }',
            bank: ["bottom", "height", "margin"],
            answer: "bottom", slot: "css",
            success: "All four edges pinned - full coverage, no video leaking at an edge. The text keeps its 96px title-safe margin even though the panel doesn't.",
            feedback: {
              "height": "height: 0 - the panel collapses to nothing. Pin the fourth EDGE: bottom: 0 stretches it to full coverage.",
              "margin": "Margin pushes; it doesn't pin. The fourth edge is bottom: 0 - without it, live video peeks out of the bottom of the frame."
            }
          },
          {
            type: "fill",
            prompt: "Stage 3 - the phase function. SPX calls it on Continue. Name it - carefully.",
            render: { html: FS_HTML, css: FS_CSS, js: FS_JS, autoplay: false },
            code: 'function play() {\n  var tl = gsap.timeline();\n  tl.to("#full", { opacity: 1, duration: 0 });\n  tl.to("#f1", { opacity: 0, duration: 0 });\n  tl.fromTo("#panel", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });\n  tl.fromTo("#f0", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");\n}\nfunction {{blank}}() {\n  gsap.fromTo("#f1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });\n}\nfunction stop() {\n  gsap.to("#full", { opacity: 0, duration: 0.4, ease: "power2.in" });\n}',
            bank: ["next", "continue", "phase2"],
            answer: "next", slot: "js",
            success: "next() - the contract name. And note play()'s zero-second tweens: wrapper on, subtitle hidden - every run starts from the same clean state.",
            feedback: {
              "continue": "Two problems: SPX calls next(), and continue is a word JavaScript keeps for itself - the script died before the show started. The contract name is next.",
              "phase2": "Legal JavaScript - but SPX calls next() by name. A phase function under any other name is unreachable from the panel."
            }
          },
          {
            type: "predict",
            prompt: "Your next() is perfect, but the definition still says \"steps\": \"1\". What does the operator get?",
            render: { html: FS_HTML, css: FS_CSS, js: FS_JS, autoplay: false },
            options: [
              { text: "No Continue button - the subtitle phase is unreachable from the panel.", correct: true,
                feedback: "8.6's rule, now in your own delivery: the definition declares \"steps\": \"2\", or the button never appears." },
              { text: "Continue appears anyway - next() exists.",
                feedback: "SPX reads the definition, not your function list. Declare \"steps\": \"2\"." },
              { text: "The subtitle reveals itself automatically.",
                feedback: "Nothing calls next() on its own. No declared steps, no button, no phase two." }
            ]
          },
          {
            type: "operate", kernel: true,
            prompt: "Delivery check. The result is in: set Subtitle to KORHONEN WINS and pick Result Red from the Panel color dropdown. Update, Play - then press CONTINUE to reveal, and STOP to clear.",
            render: { html: FS_HTML, css: FS_CSS, js: FS_JS, autoplay: false },
            panel: [
              { id: "f0", label: "Title", value: "ELECTION NIGHT", expect: "ELECTION NIGHT" },
              { id: "f1", label: "Subtitle", value: "", expect: "KORHONEN WINS" },
              { id: "f2", label: "Panel color", value: "#0a3d91", expect: "#8a1526",
                options: [ { text: "NN Blue", value: "#0a3d91" },
                           { text: "Result Red", value: "#8a1526" },
                           { text: "Neutral Grey", value: "#3a3a3a" } ] }
            ],
            check: [
              { sel: "#f0", text: "ELECTION NIGHT" },
              { sel: "#f1", text: "KORHONEN WINS" },
              { sel: "#panel", style: { backgroundColor: "rgb(138, 21, 38)" } }
            ],
            successFeedback: "Capstone C delivered: full coverage, title-safe text, dropdown color on the panel via .style, and the Play -> Continue -> Stop cycle running clean.",
            feedback: { default: "Not matching yet: Subtitle must read KORHONEN WINS and the panel color #8a1526. Update first, then Play." }
          }
        ]
      },

      {
        id: "9.6", title: "Capstone D: Ticker",
        concept: "A continuous crawl: CSS keyframes loop it, linear ease, seam separators, updates routed through one place.",
        explain: "The job card: a bottom-of-frame news ticker. Headlines in one field, continuous loop at reading speed, opaque bar, full frame width. The loop is CSS - @keyframes crawl, linear, infinite - because loops belong to the stylesheet's animation engine.",
        exercises: [
          {
            type: "arrange",
            prompt: "Stage 1 - structure. Two separate elements: the bar is the panel, the crawl is the moving text. Assemble - one block stays unused.",
            render: { html: "", css: TICK_CSS, js: TICK_JS, autoplay: false },
            blocks: ['<div id="bar">', '  <div id="crawl">+++ STORM WARNING +++ DERBY TONIGHT +++</div>', '</div>'],
            distractors: ['</span>'],
            slot: "html",
            success: "Bar and crawl, separate - the bar sits still while the text moves through it. The crawl is already running: CSS keyframes need no play().",
            feedback: { default: "The bar wraps the crawl - and nothing here opened a span. Wrapper, crawl, closing div." }
          },
          {
            type: "fill",
            prompt: "Stage 2 - the loop's tempo curve. Watch the crawl as you choose.",
            render: { html: TICK_HTML, css: TICK_CSS, js: TICK_JS, autoplay: true },
            code: '#bar { position: absolute; left: 0; right: 0; bottom: 0; background-color: #0a3d91; padding: 16px 0; opacity: 0; }\n#crawl { color: #ffffff; font-family: Arial, sans-serif; font-size: 30px; white-space: nowrap; animation: crawl 18s {{blank}} infinite; }\n@keyframes crawl {\n  from { transform: translateX(1920px); }\n  to { transform: translateX(-100%); }\n}',
            bank: ["linear", "ease-in-out", "power2.out"],
            answer: "linear", slot: "css",
            success: "A crawl runs linear - constant speed, about two words a second past a fixed point at this size. The 18s duration keeps it readable; infinite keeps it going.",
            feedback: {
              "ease-in-out": "Watch it - the text speeds up and slows down every lap: seasickness in text form. Loops run linear.",
              "power2.out": "A GSAP ease name means nothing to CSS - the whole animation is thrown away and the crawl freezes. CSS's steady keyword is linear."
            }
          },
          {
            type: "predict",
            prompt: "Stage 3 - the split. Your update() is given to you as boilerplate (splitting text into a list is a skill for later): it splits the headlines field on \" | \", joins the pieces back with \" +++ \", and wraps the whole line in +++. Reading that, what does the operator type between two headlines?",
            render: { html: TICK_HTML, css: TICK_CSS, js: TICK_JS, autoplay: true },
            options: [
              { text: "Space-pipe-space:  |  - exactly what the code splits on.", correct: true,
                feedback: "The code splits on \" | \", so that is the operator's separator. The +++ seams are added for you by the join and the wrapper. (In real SPX this field is a textarea, one headline per line.)" },
              { text: "Three plus signs: +++",
                feedback: "The +++ are added BY the given code, not typed by the operator. Their separator is what the code splits on: \" | \"." },
              { text: "A comma.",
                feedback: "The code splits on \" | \", not a comma - and headlines may themselves contain commas. Match what the given code splits on." }
            ]
          },
          {
            type: "predict",
            prompt: "A colleague simplifies the join: items.join(\" +++ \") with no leading or trailing separator. What happens where the loop rejoins itself?",
            render: { html: TICK_HTML, css: TICK_CSS, js: TICK_JS, autoplay: true },
            options: [
              { text: "The last headline crashes into the first: '...derbyStorm warning...'. The seam needs a separator too.", correct: true,
                feedback: "Separators go between every headline AND around the seam where the loop joins - that's why the text is wrapped in +++ on both ends." },
              { text: "Nothing - the loop restarts off-screen.",
                feedback: "The restart is off-screen, but the reader still meets the seam: end and start arrive glued together. Wrap both ends." },
              { text: "The crawl stops at the end.",
                feedback: "infinite keeps it looping forever - that's not the problem. The problem is what the seam READS like: two headlines glued together." }
            ]
          },
          {
            type: "operate", kernel: true,
            prompt: "Delivery check. Add tonight's third headline so the field reads exactly: STORM WARNING | DERBY TONIGHT | BUDGET VOTE. Update, then Play - and verify the seam separators survive.",
            render: { html: TICK_HTML, css: TICK_CSS, js: TICK_JS, autoplay: false },
            panel: [
              { id: "f0", label: "Headlines (separate with ' | ')", value: "STORM WARNING | DERBY TONIGHT", expect: "STORM WARNING | DERBY TONIGHT | BUDGET VOTE" }
            ],
            check: [
              { sel: "#crawl", text: "+++ STORM WARNING +++ DERBY TONIGHT +++ BUDGET VOTE +++" }
            ],
            successFeedback: "Capstone D delivered: full-width opaque bar, linear infinite crawl at reading speed, separators between every headline and around the seam. Four templates built.",
            feedback: { default: "The crawl doesn't carry all three headlines with +++ between and around them. Check the field reads exactly STORM WARNING | DERBY TONIGHT | BUDGET VOTE, Update, then Play." }
          }
        ]
      },

      {
        id: "9.7", title: "The delivery checklist",
        concept: "Nine checks a graphic must pass before it ships - because eyes forgive and checklists don't.",
        explain: "Before a graphic goes to a real show, a professional runs the same short list, every time: 1 contract intact, 2 plays clean twice, 3 easing directions right, 4 out faster than in, 5 title-safe, 6 keyed over bright AND dark, 7 readable field titles, 8 sensible defaults, 9 preview fields first. During the capstones this list ran silently as your grader. Now it's yours.",
        exercises: [
          {
            type: "predict", kernel: true,
            prompt: "A handsome sports strap. Run the list: PLAY it, STOP it, time both. Items 1-3 pass. Item 4 - out faster than in?",
            render: { html: SPORT_HTML, css: SPORT_CSS, js: SPORT_JS, autoplay: true },
            options: [
              { text: "Fails - the in is 0.5s, the out drags 0.9s.", correct: true,
                feedback: "Your eye said fine; the list said no. That's why pros run it. Don't watch the graphic - time it." },
              { text: "Passes - it looked fine.",
                feedback: "It LOOKS fine - that's the point. Time it: in 0.5s, out 0.9s. The goodbye outstays the hello. Eyes forgive; checklists don't." },
              { text: "Item 3 is the one failing - the eases are backwards.",
                feedback: "The directions are right: in decelerates, out accelerates. It's the TIMING that fails - items 3 and 4 make you measure different things." }
            ]
          },
          {
            type: "predict",
            prompt: "A strap plays clean the first time, but the second play starts from half-off-screen. Which checklist item catches it?",
            options: [
              { text: "Item 2 - plays and stops clean twice in a row.", correct: true,
                feedback: "And the fix is 6.5's: state both ends with fromTo." },
              { text: "Item 3 - easing directions.",
                feedback: "Easing direction is about FEEL, not starting state. Dirty re-plays are exactly what the double-play test exists for." },
              { text: "Item 5 - title-safe.",
                feedback: "Title-safe is about WHERE, not WHEN. Run it twice - that's the test that catches it." }
            ]
          },
          {
            type: "predict",
            prompt: "A colleague's template fails four items and there's time to fix two before air: (a) out slower than in, (b) fields shown as raw f0/f1, (c) the name line outside title-safe, (d) second play starts dirty. Which two first?",
            options: [
              { text: "(c) and (d).", correct: true,
                feedback: "What the VIEWER sees beats what the operator sees, and what breaks EVERY play beats what merely looks unhurried. (a) and (b) get fixed after the show." },
              { text: "(b) and (a) - operator comfort and polish.",
                feedback: "Ugly field names hurt the operator, not the audience. On-air damage first: the off-safe name and the dirty re-play." },
              { text: "(a) and (c) - both are motion or position.",
                feedback: "(a) merely looks unhurried; (d) breaks every re-play on air. Severity, not category: (c) and (d)." }
            ]
          },
          {
            type: "predict",
            prompt: "A strap is white text with no panel. Over the night-news clip it looks perfect. Which item is still unchecked - and what will it find?",
            options: [
              { text: "Item 6 - over the bright hockey ice the text disappears. Keying is checked over bright AND dark.", correct: true,
                feedback: "One background is half a check. Flip the stage to the bright clip before you sign off." },
              { text: "Item 5 - it's off safe.",
                feedback: "Position wasn't the issue - contrast is. One clip is not a keying check." },
              { text: "None - it played fine.",
                feedback: "'It played once, it's done' is the exact misconception this lesson kills. One background is half a check." }
            ]
          },
          {
            type: "predict",
            prompt: "Run the list on your own corner bug: its panel shows the fields as 'f0 text' and 'f1 tick'. Which item flags it?",
            options: [
              { text: "Item 7 - field titles an operator can read.", correct: true,
                feedback: "'Sponsor line' and 'Show sponsor', not plumbing names. The panel is UI you design for a colleague under studio pressure." },
              { text: "Item 1 - the contract is broken.",
                feedback: "The contract is names SPX calls in your code - play, update, the fN ids. TITLES are for humans; that's courtesy, item 7." },
              { text: "Item 9 - preview fields first.",
                feedback: "Item 9 is about ORDER. These titles are illegible whatever the order - item 7." }
            ]
          }
        ]
      },

      {
        id: "9.8", title: "Shipping the file",
        concept: "A template is a folder - the .html plus its assets - and every path in it must be relative.",
        explain: "A template isn't one file - it's a folder: the .html plus every image, font, and script it points at, in the SPX shape ASSETS/templates/<company>/<project>/. Keep every path relative (starting ./) so the links hold wherever the folder lands. A path that starts C:\\ points at YOUR machine - and dies on everyone else's.",
        exercises: [
          {
            type: "observe",
            prompt: "The Export of Capstone A, packed. Tap the file the operator's rundown will actually point at.",
            lines: ["ASSETS/templates/", "  nn/", "    news/", "      LowerThird.html", "      images/nn-logo.png", "      fonts/nn-sans.woff2", "      js/gsap.min.js"],
            answer: 3, highlight: "#no-hl",
            success: "The .html is the passenger; everything else is its luggage. SPX lists templates, and each template drags its folder along.",
            feedback: {
              4: "That file is luggage. The template - the .html - is the passenger.",
              5: "That file is luggage. The template - the .html - is the passenger.",
              6: "That file is luggage. The template - the .html - is the passenger.",
              default: "Folders shape the delivery; the rundown points at one file - which one can SPX play?"
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "This template moves to the playout machine. Which of its three image paths breaks?",
            options: [
              { text: "src=\"C:\\Users\\mkranz\\Desktop\\nn-logo.png\"", correct: true,
                feedback: "The classic handover killer: it names YOUR disk. The playout machine has no mkranz." },
              { text: "src=\"./images/nn-logo.png\"",
                feedback: "Relative paths travel: ./ means 'next to this very file', true on any machine the folder lands on." },
              { text: "src=\"/media/images/bg/studio.png\"",
                feedback: "A leading / reaches the playout server's own global asset pool - it's MEANT to resolve there, not here." }
            ]
          },
          {
            type: "fill",
            prompt: "Point the strap at its packed logo.",
            code: '<img id="logo" src="./images/{{blank}}">',
            bank: ["nn-logo.png", "C:\\nn-logo.png", "images/nn-logo.png"],
            answer: "nn-logo.png",
            feedback: {
              "C:\\nn-logo.png": "A drive letter in a shipped template is a time bomb. Stay inside the folder: relative.",
              "images/nn-logo.png": "The path already starts ./images/ - this would look for images/images/. The blank wants just the filename."
            }
          },
          {
            type: "fix",
            prompt: "Capstone A's @font-face renders perfectly HERE - and works on this machine only. Fix it so it works on every machine.",
            tokens: ["@font-face {", "  font-family: 'nn-sans';", "  src: url('C:\\Users\\mkranz\\fonts\\nn-sans.woff2');", "}"],
            answer: 2, fixedToken: "  src: url('./fonts/nn-sans.woff2');",
            success: "'Works here' and 'works there' are different claims - only relative paths make them the same claim.",
            feedback: {
              1: "The name is fine and matches its uses. The FILE path is what names one specific machine's disk.",
              default: "It works because YOU are mkranz. Find the line that names your disk."
            }
          },
          {
            type: "predict",
            prompt: "In another template you find src=\"/media/video/intro.mp4\". What is that path saying?",
            options: [
              { text: "Fetch from the playout server's global media pool.", correct: true,
                feedback: "A leading / deliberately leaves the template folder for the server's shared assets - different from ./ and different from C:\\." },
              { text: "It's broken - no ./",
                feedback: "Not broken - different: a leading / deliberately leaves the template folder for the server's shared assets." },
              { text: "Fetch from the template's own folder.",
                feedback: "That would start ./ - a bare / goes to the GLOBAL pool, shared across all templates on the server." }
            ]
          }
        ]
      },

      {
        id: "9.9", title: "Graduation: the real thing",
        concept: "Your templates run in actual SPX exactly as they ran here - same definition, same contract, same buttons.",
        explain: "Everything you built runs in the real SPX exactly as it ran in the simulator. This walkthrough proves it with Capstone A's exported folder: install SPX, drop the folder in, add the template to a rundown, fill fields, play out. If you have SPX, do it for real; either way, these questions are the map.",
        isCheckpoint: true,
        exercises: [
          {
            type: "predict",
            prompt: "Step one after installing SPX: your exported folder goes into SPX's assets. Where, exactly?",
            options: [
              { text: "ASSETS/templates/nn/news/ - the exact shape 9.8 packed.", correct: true,
                feedback: "Ship the folder, keep the shape. SPX finds LowerThird.html there and every relative path inside it still holds." },
              { text: "Anywhere - SPX scans the whole disk.",
                feedback: "SPX lists templates from its ASSETS/templates tree. Outside it, your template simply isn't offered." },
              { text: "Just the .html - the assets can stay behind.",
                feedback: "The .html is the passenger, the assets are its luggage (9.8). Leave the fonts and images behind and the relative paths point at nothing." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "You add LowerThird.html to a real rundown and a field panel appears: Name, Title, with your defaults. Where is that panel coming from?",
            options: [
              { text: "It IS your SPXGCTemplateDefinition, field for field - the 7.8 definition, rendered by the real client.", correct: true,
                feedback: "The course's simulator wasn't a toy: the same definition drives the same panel. Recognize the moment - you built this." },
              { text: "SPX guessed the fields by reading your update().",
                feedback: "SPX never reads your functions to build UI - it reads the definition. update() only says where values land." },
              { text: "Someone configured it in SPX's settings.",
                feedback: "No configuration - the panel ships INSIDE the template. That's the whole point of the definition." }
            ]
          },
          {
            type: "predict",
            prompt: "You open SPX's web playout in a browser window and press Play on your item. What is that browser page?",
            options: [
              { text: "The renderer - your 1920x1080 canvas from 1.3, live.", correct: true,
                feedback: "Fill the fields, Play, Stop, Play again - item 2 of your own checklist, in the wild." },
              { text: "A preview - the real output is a video file.",
                feedback: "No video is rendered, ever. The page IS the output: one file, two screens, as 0.2 promised." },
              { text: "A settings page.",
                feedback: "It's the playout itself: the browser window renders your template live. Key it over program and it's broadcast." }
            ]
          },
          {
            type: "predict",
            prompt: "Troubleshooting: your strap plays IN but never goes OUT. Which lesson's rule do you check first?",
            options: [
              { text: "stop() missing or renamed - the contract and the 8.8 do-not-rename card.", correct: true,
                feedback: "The out is stop()'s job, called by exact name. (Template not listed? 9.8's folder shape. Plays empty? 7.7/7.8's handshake and defaults. Font missing? An absolute path survived.)" },
              { text: "The folder shape.",
                feedback: "A wrong folder means the template never appears at all. It plays - so SPX found it. The silent out is a contract name: stop()." },
              { text: "The field defaults.",
                feedback: "Defaults decide what it SAYS, not whether it leaves. The out is stop()'s job - check the name against the card." }
            ]
          },
          {
            type: "predict",
            prompt: "Last one. When a real video mixer or SDI output is involved, SPX sends the same template to a CasparCG server behind it. What changes in your template?",
            options: [
              { text: "Nothing - the renderer changes, not the template.", correct: true,
                feedback: "That's graduation: four working templates, and the fluency to open any fifth - find the landmarks, trace the wires, run the checklist before it ships." },
              { text: "It must be rewritten in a CasparCG format.",
                feedback: "CasparCG plays HTML pages - the same page. Your template does not change; the renderer does." },
              { text: "The contract functions get new names.",
                feedback: "Same contract, same names, wherever the page renders. The renderer changes; your file doesn't." }
            ]
          }
        ]
      }
    ]
  });
})();
