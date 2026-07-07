// Unit 8 - Other People's Templates. Source of truth: lessons/unit-08.md
// Stranger templates (ARENA CLASH / Morning Light / SKYWATCH) shown as short excerpts;
// 8.1's landmark map is encoded as observe over folded one-line summaries.
window.COURSE_DATA = window.COURSE_DATA || [];
(function () {

  /* ---------- ARENA CLASH esports scorebug (camelCase stranger) ---------- */
  var ARENA_CSS = [
    '/* arena clash scorebug :: rze :: v2 final FINAL */',
    '#bugRoot { position: absolute; top: 60px; left: 560px; font-family: Arial, sans-serif; opacity: 0; }',
    '#teamsRow { background-color: #12131a; color: #f5f6fa; font-size: 40px; font-weight: 700; padding: 14px 24px; }',
    '.mapBox { background-color: #e8b90c; color: #12131a; padding: 4px 16px; margin: 0 12px; }',
    '#seriesLabel { color: #f5f6fa; font-size: 22px; letter-spacing: 2px; text-align: center; margin-top: 8px; opacity: 0; }'
  ].join('\n');
  var ARENA_HTML = '<div id="bugRoot"><div id="teamsRow"><span id="f0">NOVA FIVE</span>' +
    '<span class="mapBox" id="f2">2</span><span class="mapBox" id="f3">1</span>' +
    '<span id="f1">IRON WOLVES</span></div>' +
    '<div id="seriesLabel">GRAND FINAL - BEST OF 5</div></div>';
  var ARENA_JS = [
    'function update(data) {',
    '  var d = JSON.parse(data);',
    '  document.getElementById("f0").textContent = d.f0;',
    '  document.getElementById("f1").textContent = d.f1;',
    '  document.getElementById("f2").textContent = d.f2;',
    '  document.getElementById("f3").textContent = d.f3;',
    '  document.getElementById("seriesLabel").textContent = d.f4;',
    '}',
    'function play() {',
    '  var tl = gsap.timeline();',
    '  tl.fromTo("#bugRoot", { y: -140, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" });',
    '  tl.to("#seriesLabel", { opacity: 1, duration: 0.4 }, "-=0.2");',
    '}',
    'function stop() {',
    '  gsap.to("#bugRoot", { opacity: 0, duration: 0.3, ease: "power2.in" });',
    '}'
  ].join('\n');
  var ARENA = { html: ARENA_HTML, css: ARENA_CSS, js: ARENA_JS, mode: 'video', autoplay: true };

  // the folded landmark map (one line per landmark, in FILE order)
  var FOLD = [
    '<style> /* arena clash :: rze :: v2 FINAL */ ...58 lines: colors, positions, the works... </style>',
    '<script> window.SPXGCTemplateDefinition = { ...5 DataFields... } <\/script>',
    '<div id="bugRoot"> ...14 lines: team boxes, map scores, the series label... </div>',
    '<script> function update(data) {...} function play() {...} function stop() {...} <\/script>'
  ];

  /* ---------- Morning Light strap (snake_case stranger) ---------- */
  var ML_CSS = [
    '/* morning light strap - design tokens up top */',
    ':root {',
    '  --accent: #f2a03d;',
    '  --ink: #232323;',
    '  --paper: #fffdf7;',
    '}',
    '#ml_strap { position: absolute; left: 96px; bottom: 96px; background-color: var(--paper); color: var(--ink); padding: 22px 34px; font-family: Georgia, serif; }',
    '#ml_badge { display: inline-block; background-color: var(--accent); color: #ffffff; font-size: 24px; padding: 4px 14px; }',
    '#ml_clock { display: inline-block; background-color: var(--accent); color: #ffffff; font-size: 24px; padding: 4px 10px; margin-left: 10px; }',
    '#f0 { font-size: 42px; font-weight: 700; margin-top: 8px; }',
    '#ml_topic { color: var(--accent); font-size: 28px; font-weight: 700; }',
    '.ml_dot { display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: var(--accent); margin: 0 10px 2px; }',
    '.ml_hi { color: var(--accent); }',
    '#ml_bar { height: 8px; background-color: var(--accent); margin-top: 12px; }'
  ].join('\n');
  var ML_HTML = '<div id="ml_strap"><span id="ml_badge">MORNING LIGHT</span><span id="ml_clock">07:45</span>' +
    '<div id="f0">Elif Demir <span class="ml_hi">LIVE</span></div>' +
    '<div id="ml_topic"><span class="ml_dot"></span>Sourdough for beginners<span class="ml_dot"></span></div>' +
    '<div id="ml_bar"></div></div>';
  var ML_CSS_BLUE = ML_CSS.replace('--accent: #f2a03d;', '--accent: #3db4f2;');
  var ML_CSS_TYPO = ML_CSS.replace('#ml_topic { color: var(--accent)', '#ml_topic { color: var(--acent)');
  var ML85_JS = [
    'function update(data) {',
    '  var d = JSON.parse(data);',
    '  document.getElementById("f0").textContent = d.f0;',
    '  document.getElementById("ml_topic").textContent = d.f1;',
    '  document.getElementById("ml_badge").style.backgroundColor = d.f2;',
    '}',
    'function play() {',
    '  gsap.fromTo("#ml_strap", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });',
    '}',
    'function stop() {',
    '  gsap.to("#ml_strap", { y: 60, opacity: 0, duration: 0.3, ease: "power2.in" });',
    '}'
  ].join('\n');

  /* ---------- NN Sans strap (8.3) ---------- */
  var FONT_CSS = [
    '@font-face {',
    '  font-family: "NN Sans";',
    '  src: url("fonts/nn-sans-old.woff2");',
    '}',
    '#strap { position: absolute; left: 96px; bottom: 96px; background-color: #0a3d91; padding: 18px 32px; }',
    '#f0 { font-family: "NN Sans", sans-serif; color: #ffffff; font-size: 44px; font-weight: 700; }',
    '#f1 { font-family: "NN Sans", sans-serif; color: #e8b90c; font-size: 26px; }'
  ].join('\n');
  var FONT_HTML = '<div id="strap"><div id="f0">Maria Kranz</div><div id="f1">News Anchor</div></div>';
  var FONT_CSS_NEWFILE = FONT_CSS.replace('nn-sans-old.woff2', 'nn-sans.woff2');
  var FONT_CSS_BROKEN = FONT_CSS_NEWFILE.replace('#f0 { font-family: "NN Sans"', '#f0 { font-family: "NNSans"');

  /* ---------- SKYWATCH weather panel (kebab-case stranger) ---------- */
  var SKY_CSS = [
    '/* skywatch weather panel -- base look is day; the night class flips it */',
    '.panel { position: absolute; top: 120px; right: 160px; width: 460px; padding: 34px; font-family: Arial, sans-serif; background-color: #eaf6ff; color: #10233a; }',
    '.night { background-color: #101c30; color: #d7e8ff; }',
    '#f0 { font-size: 30px; letter-spacing: 2px; }',
    '#f1 { font-size: 90px; font-weight: 700; }',
    '#f2 { font-size: 26px; }'
  ].join('\n');
  var SKY_HTML = '<div id="w-panel" class="panel"><div id="f0">TAMPERE</div><div id="f1">21</div><div id="f2">Clear skies</div></div>';
  var SKY_TOGGLE_JS = 'function play() {\n  document.getElementById("w-panel").classList.add("night");\n}\nfunction stop() {\n  document.getElementById("w-panel").classList.remove("night");\n}';
  var SKY_UPD_JS = 'function update(data) {\n  var d = JSON.parse(data);\n  document.getElementById("f0").textContent = d.f0;\n  document.getElementById("f1").textContent = d.f1;\n  document.getElementById("f2").textContent = d.f2;\n}\n' + SKY_TOGGLE_JS;

  /* ---------- Election full-screen (8.6) ---------- */
  var ELECT_CSS = [
    '#fullscreen { opacity: 0; font-family: Arial, sans-serif; }',
    '#panel { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: #101828; opacity: 0; }',
    '#headline { position: absolute; left: 96px; top: 400px; color: #ffffff; font-size: 90px; font-weight: 700; opacity: 0; }',
    '#result_a { position: absolute; left: 96px; top: 560px; color: #e8b90c; font-size: 48px; opacity: 0; }',
    '#result_b { position: absolute; left: 96px; top: 630px; color: #ffffff; font-size: 48px; opacity: 0; }'
  ].join('\n');
  var ELECT_HTML = '<div id="fullscreen"><div id="panel"></div><div id="headline">ELECTION NIGHT</div>' +
    '<div id="result_a">KORHONEN 52.1%</div><div id="result_b">NIEMI 47.9%</div></div>';
  var ELECT_JS = [
    'function play() {',
    '  var tl = gsap.timeline();',
    '  tl.to("#fullscreen", { opacity: 1, duration: 0 });',
    '  tl.to("#result_a", { opacity: 0, duration: 0 });',
    '  tl.to("#result_b", { opacity: 0, duration: 0 });',
    '  tl.to("#panel", { opacity: 1, duration: 0.6, ease: "power2.out" });',
    '  tl.fromTo("#headline", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");',
    '}',
    'function next() {',
    '  var tl = gsap.timeline();',
    '  tl.fromTo("#result_a", { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });',
    '  tl.fromTo("#result_b", { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3");',
    '}',
    'function stop() {',
    '  gsap.to("#fullscreen", { opacity: 0, duration: 0.4, ease: "power2.in" });',
    '}'
  ].join('\n');

  /* ---------- CleanLine Lower Third v3 (checkpoint stranger) ---------- */
  var CL_CSS = [
    '/* cleanline lt3 - free for broadcast use - TK */',
    ':root { --c1: #10b981; --c2: #0b0f14; }',
    '#lt_wrap { position: absolute; left: 96px; bottom: 96px; opacity: 0; font-family: Arial, sans-serif; }',
    '#lt_panel { background-color: var(--c1); padding: 18px 28px; }',
    '#f0 { color: #ffffff; font-size: 44px; font-weight: 700; }',
    '#f1 { color: var(--c2); font-size: 26px; }',
    '.lt_tick { background-color: var(--c1); }'
  ].join('\n');
  var CL_HTML = '<div id="lt_wrap"><div id="lt_panel"><div id="f0">Maria Kranz</div><div id="f1">News Anchor</div></div></div>';
  var CL_CSS_NN = CL_CSS.replace('--c1: #10b981;', '--c1: #0a3d91;').replace('--c2: #0b0f14;', '--c2: #e8b90c;');
  var CL_JS_SLOW = 'function update(data) {\n  var d = JSON.parse(data);\n  document.getElementById("f0").textContent = d.f0;\n  document.getElementById("f1").textContent = d.f1;\n}\nfunction play() {\n  gsap.fromTo("#lt_wrap",\n    { y: 160, opacity: 0 },\n    { y: 0, opacity: 1, duration: 2.4, ease: "power2.in" });\n}\nfunction stop() {\n  gsap.to("#lt_wrap", { y: 80, opacity: 0, duration: 0.3, ease: "power2.in" });\n}';
  var CL_JS_TIMED = CL_JS_SLOW.replace('duration: 2.4', 'duration: 0.6');
  var CL_JS_FIXED = CL_JS_TIMED.replace('duration: 0.6, ease: "power2.in"', 'duration: 0.6, ease: "power2.out"');

  COURSE_DATA.push({
    id: 8,
    title: "Other People's Templates",
    promise: "Open a template you've never seen, find your way around, and change it with confidence.",
    lessons: [

      {
        id: "8.1", title: "The anatomy map",
        concept: "Skim any template by its four landmarks: definition, body, styles, functions.",
        explain: "Never read a stranger's template like a book. Skim its four landmarks in question order: the definition (what can the operator change?), the body (what's on screen?), the styles (what's the look?), the functions (what happens on play, update, stop?).",
        exercises: [
          {
            type: "observe",
            prompt: "A stranger's 120-line esports scorebug, folded to its four landmarks. The skim starts where the operator starts: what can they change? Tap landmark 1 - the definition.",
            render: ARENA,
            lines: FOLD, answer: 1, highlight: "#no-hl",
            success: "One glance at the definition and the whole operator side is known. That's why the skim starts here.",
            feedback: {
              0: "Styles are stop three. Start where the operator starts: what can they change? That's the definition.",
              2: "The body is stop two - what exists. Stop one answers the operator question: the definition.",
              3: "Functions are the LAST stop - what happens only makes sense once you know what exists and what feeds it.",
              default: "Four stops, in question order. Stop one is the definition script in the head."
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "You have unfolded nothing except the definition: it lists 5 DataFields. How many fields will the operator panel show?",
            render: ARENA,
            options: [
              { text: "5", correct: true,
                feedback: "One landmark, one glance - and you already know the whole operator side of this template." },
              { text: "You can't know without reading update().",
                feedback: "You can - the definition alone IS the operator panel. update() only says where the values land." },
              { text: "2",
                feedback: "Two fields feed the rundown preview (Unit 7) - but count the DataFields entries: five fields on the panel." }
            ]
          },
          {
            type: "observe",
            prompt: "Speed round: find where the entrance animation lives. Tap the landmark region - don't read, jump.",
            render: ARENA,
            lines: FOLD, answer: 3, highlight: "#bugRoot",
            success: "Landmark 4: play() holds a GSAP timeline - the entrance. Watch it run.",
            feedback: {
              0: "Styles CAN animate (Unit 5) - but this is a GSAP template, and its entrance lives where SPX calls it: play(), landmark 4.",
              1: "The definition lists fields, never motion. In a GSAP template the entrance lives in play() - landmark 4.",
              default: "That's what line-by-line reading costs. Jump straight to landmark 4 - the functions."
            }
          },
          {
            type: "fill",
            prompt: "Same map, different terrain: the SKYWATCH weather panel, another author, another style. Label the folded region.",
            render: { html: SKY_HTML, css: SKY_CSS, autoplay: true },
            code: '/* SKYWATCH, head, folded: */\n<script> window.SPXGCTemplateDefinition = { ...4 DataFields... } <\/script>\n\nlandmark: {{blank}}',
            bank: ["the definition", "the styles", "the functions"],
            answer: "the definition",
            success: "The author's style changed - the landmarks didn't.",
            feedback: {
              "the styles": "Styles live in the <style> block. This is the SPXGCTemplateDefinition script - the definition, whoever wrote it.",
              "the functions": "The functions are play/update/stop in the body script. A script defining SPXGCTemplateDefinition is always landmark 1."
            }
          },
          {
            type: "predict",
            prompt: "The producer asks: 'Can the operator change the series label, or is it hard-coded?' Which landmark answers fastest?",
            render: ARENA,
            options: [
              { text: "The definition.", correct: true,
                feedback: "One glance: 'Series label' is field f4. If it weren't listed there, it would be hard-coded." },
              { text: "The body.",
                feedback: "The body shows the element exists - not whether the operator can change it. The definition lists what they can touch." },
              { text: "The functions.",
                feedback: "update() would tell you eventually - after reading code. The definition tells you at a glance. Skim order is answer order." }
            ]
          }
        ]
      },

      {
        id: "8.2", title: "The control panel at the top",
        concept: "CSS variables: define a value once in :root, use it everywhere with var().",
        explain: "Good template authors put their brand in one place: :root { --accent: #f2a03d; } defines the value once, and var(--accent) uses it wherever it's needed. To rebrand, change the dial - not every wire.",
        exercises: [
          {
            type: "predict",
            prompt: "Six things on this strap are orange: badge, clock, topic, dots, highlight, bar - all reading var(--accent). Answer, and we change --accent to #3db4f2 live. How many lines must be edited to turn all six sky blue?",
            render: { html: ML_HTML, css: ML_CSS, autoplay: true },
            options: [
              { text: "One - the --accent line in :root.", correct: true,
                feedback: "One dial, six wires. That's the whole point of a variable - watch all six follow." },
              { text: "Six - one per orange element.",
                feedback: "The six places USE the variable instead of repeating the color. Edit the one line that defines it." },
              { text: "Seven - the definition and the six uses.",
                feedback: "Just the dial. Every var(--accent) follows the one definition automatically." }
            ],
            applyOnAnswer: { css: ML_CSS_BLUE, play: true }
          },
          {
            type: "predict", kernel: true,
            prompt: "The producer wants the accent green everywhere. Where do you edit?",
            render: { html: ML_HTML, css: ML_CSS_BLUE, autoplay: true },
            options: [
              { text: "The --accent line in :root.", correct: true,
                feedback: "Change the dial. Every var(--accent) follows." },
              { text: "Every rule that contains var(--accent).",
                feedback: "That's six edits and six chances for a typo - and next month's rebrand costs six more. The variable exists so one edit does it." },
              { text: "Each element in the body.",
                feedback: "Colors don't live in the body at all - Unit 3's oldest rule. Here they don't even live in six rules: they live in one variable." }
            ]
          },
          {
            type: "predict",
            prompt: "We change --accent to green. Does the cream panel behind the text turn green too?",
            render: { html: ML_HTML, css: ML_CSS, autoplay: true },
            options: [
              { text: "No - the panel uses var(--paper), a different variable.", correct: true,
                feedback: "You had to FIND the var() uses to know. That hunt is the skill." },
              { text: "Yes, everything changes.",
                feedback: "Only the wires connected to THIS dial. The panel reads --paper - a different dial." },
              { text: "No, because the panel is an id, not a class.",
                feedback: "Ids and classes don't decide it - the VALUE does. The panel's background says var(--paper), so it follows --paper." }
            ]
          },
          {
            type: "fill",
            prompt: "The designer adds a navy panel variable. Complete the definition.",
            render: { html: ML_HTML, css: ML_CSS, autoplay: true },
            code: ':root {\n  --accent: #f2a03d;\n  {{blank}}: #0a3d91;\n}',
            bank: ["--panel", "panel", "var(--panel)"],
            answer: "--panel",
            feedback: {
              "panel": "Variable names always start with the double dash: --panel. That's how CSS knows it's a dial, not a property.",
              "var(--panel)": "var(...) is for USING a variable. Defining one is just --panel: value;"
            }
          },
          {
            type: "fix",
            prompt: "The topic line has lost its orange - it renders in plain ink, and no error appeared anywhere. Find out why.",
            render: { html: ML_HTML, css: ML_CSS_TYPO, autoplay: true },
            tokens: ["#ml_topic {", "color:", "var(--acent);", "font-size: 28px;", "font-weight: 700;", "}"],
            answer: 2, fixedToken: "var(--accent);",
            fixedRender: { css: ML_CSS },
            success: "--acent vs --accent. A wrong variable name fails silently - the machine just shrugs and moves on.",
            feedback: {
              0: "The selector matches - the rule IS applying (the size and weight prove it). Compare the variable name with :root, letter by letter.",
              default: "The definition in :root is spelled right. Compare it with the USE, letter by letter - machines don't forgive typos."
            }
          }
        ]
      },

      {
        id: "8.3", title: "Bringing your own font",
        concept: "@font-face loads a font file and names it; font-family uses that exact name.",
        explain: "A channel's typeface isn't installed on the playout machine - it arrives as a file, like an image. @font-face loads the file and gives it a name; font-family then uses that name. Point src at the right file, and keep the name identical in both places.",
        exercises: [
          {
            type: "observe",
            prompt: "The font name is a handshake with two ends. Tap the end that DECLARES the name - inside @font-face.",
            render: { html: FONT_HTML, css: FONT_CSS, autoplay: true },
            lines: ['@font-face {', '  font-family: "NN Sans";', '  src: url("fonts/nn-sans-old.woff2");', '}', '#f0 { font-family: "NN Sans", sans-serif; }'],
            answer: 1, highlight: "#no-hl",
            success: "That's the declaring end. The #f0 rule is the other end - both must match exactly.",
            feedback: {
              2: "That's the FILE. The name handshake is between the font-family inside @font-face and the font-family that uses it.",
              4: "That's the other end - the USE. The declaring end lives inside @font-face.",
              default: "Look for font-family inside the @font-face block - that line names the loaded file."
            }
          },
          {
            type: "predict",
            prompt: "The playout machine can't find the font file at all. What does the strap render with?",
            render: { html: FONT_HTML, css: FONT_CSS, autoplay: true },
            options: [
              { text: "The fallback: sans-serif.", correct: true,
                feedback: "Unit 3's fallback list, doing its real job. Readable, but off-brand - that's your cue to check the file." },
              { text: "No text at all.",
                feedback: "The text always shows - fonts change how it's DRAWN, not whether it exists. The fallback steps in." },
              { text: "The file loads from the internet.",
                feedback: "Broadcast machines are often offline on purpose. The file ships WITH the template - that's why @font-face exists." }
            ]
          },
          {
            type: "fill",
            prompt: "NN's rebrand shipped a new brand file: fonts/nn-sans.woff2. Point the template at it.",
            render: { html: FONT_HTML, css: FONT_CSS, autoplay: true },
            code: '@font-face {\n  font-family: "NN Sans";\n  src: url("{{blank}}");\n}',
            bank: ["fonts/nn-sans.woff2", "NN Sans", "nn-sans"],
            answer: "fonts/nn-sans.woff2",
            feedback: {
              "NN Sans": "That's the font's NAME. src wants a file path - src, same job as an image's src.",
              "nn-sans": "Close - but the file lives in the fonts/ folder and ends in .woff2. Check the asset drawer for the exact path."
            }
          },
          {
            type: "fix", kernel: true,
            prompt: "The strap renders in the generic fallback even though the file is present and loads fine. Find why the strap won't wear it.",
            render: { html: FONT_HTML, css: FONT_CSS_BROKEN, autoplay: true },
            tokens: ['@font-face {', '  font-family: "NN Sans";', '  src: url("fonts/nn-sans.woff2");', '}', '#f0 { font-family: "NNSans", sans-serif; }'],
            answer: 4, fixedToken: '#f0 { font-family: "NN Sans", sans-serif; }',
            fixedRender: { css: FONT_CSS_NEWFILE },
            success: "NN Sans vs NNSans - the handshake needs an exact match, spaces included.",
            feedback: {
              2: "The path is right - the file loads. Compare the two NAMES character by character: NN Sans vs NNSans.",
              1: "This end is fine. Compare it with the use in the #f0 rule, letter by letter - one of them lost a space.",
              default: "The file is fine. The handshake is between two names - compare them character by character."
            }
          },
          {
            type: "predict",
            prompt: "A colleague deletes the whole @font-face block but keeps font-family: \"NN Sans\". On THEIR laptop the strap still looks perfect. What happens on the playout machine?",
            render: { html: FONT_HTML, css: FONT_CSS, autoplay: true },
            options: [
              { text: "The fallback font - their laptop happens to have NN Sans installed; the playout machine doesn't.", correct: true,
                feedback: "The FILE is the point. 'Works on my machine' is not a font strategy." },
              { text: "It looks perfect there too.",
                feedback: "Only if that machine has the font installed - and you can't bet a broadcast on it. @font-face ships the file so every machine agrees." },
              { text: "The template crashes.",
                feedback: "Missing fonts never crash anything - they fail SILENTLY into the fallback. Which is exactly why you must know this rule." }
            ]
          }
        ]
      },

      {
        id: "8.4", title: "Flip the switch",
        concept: "classList.add and .remove switch an element's class - and so which CSS rules apply.",
        explain: "JS can put a class on an element and take it off: classList.add(\"night\"), classList.remove(\"night\"). The element doesn't get new styles FROM JS - it gets a new label, and the CSS rules for that label wake up. This is what Unit 5's hidden PLAY machinery was doing all along.",
        exercises: [
          {
            type: "predict",
            prompt: "Press PLAY - this weather panel flips to its night look. Press STOP - day again. PLAY here runs classList.add(\"night\"). What did add actually change?",
            render: { html: SKY_HTML, css: SKY_CSS, js: SKY_TOGGLE_JS, autoplay: false },
            options: [
              { text: "The element's class list - the styles followed.", correct: true,
                feedback: "JS wrote one WORD onto the element. The colors came from the .night rule that was sitting in the stylesheet all along, waiting." },
              { text: "The element's colors directly.",
                feedback: "JS wrote one word onto the element - the .night rule in the stylesheet did all the painting." },
              { text: "The stylesheet.",
                feedback: "The stylesheet never changed - both rules were always there. The element changed which rules it MATCHES." }
            ]
          },
          {
            type: "predict",
            prompt: "classList.add(\"night\") runs. Which CSS rule wakes up?",
            render: { html: SKY_HTML, css: SKY_CSS, js: SKY_TOGGLE_JS, autoplay: false },
            options: [
              { text: ".night { background-color: #101c30; ... }", correct: true,
                feedback: "The new label matches the .night rule - and later-rule-wins puts it on top of .panel." },
              { text: ".panel { ... }",
                feedback: "That rule was already awake - the element has carried panel from the start. The NEW label is what changes the match." },
              { text: "No rule - classList paints the element itself.",
                feedback: "classList never paints anything. It changes labels; the stylesheet does the painting. A label no rule matches would do nothing at all - hold that thought." }
            ]
          },
          {
            type: "fill",
            prompt: "The panel must return to its day look when the graphic goes off air. Complete stop() - then PLAY and STOP to test your wiring.",
            render: { html: SKY_HTML, css: SKY_CSS, js: SKY_TOGGLE_JS, autoplay: false },
            code: 'function play() {\n  document.getElementById("w-panel").classList.add("night");\n}\nfunction stop() {\n  document.getElementById("w-panel").classList.{{blank}}("night");\n}',
            bank: ["remove", "add", "delete"],
            answer: "remove", slot: "js",
            feedback: {
              "add": "add would switch night ON. Off air we take the label away: remove.",
              "delete": "Good instinct, wrong word - classList's pair is add and remove."
            }
          },
          {
            type: "fix", kernel: true,
            prompt: "A colleague added a night switch but the panel stays light. No error, nothing on screen. Walk the chain and find the break.",
            render: { html: SKY_HTML, css: SKY_CSS, js: SKY_TOGGLE_JS.replace('add("night")', 'add("nite")'), autoplay: false },
            tokens: ['document', '.getElementById("w-panel")', '.classList', '.add(', '"nite"', ');'],
            answer: 4, fixedToken: '"night"',
            fixedRender: { js: SKY_TOGGLE_JS },
            success: "The element got labeled nite - and no .nite rule exists to wake up. Silent, as always. Fixed, it flips.",
            feedback: {
              1: "The grab is fine - the class WAS added. So the element now carries nite... search the stylesheet like 8.2 taught you: is there any .nite rule?",
              3: "add is the right call. Look at WHAT it adds - and compare with the rule waiting in the stylesheet.",
              default: "The .night rule is spelled fine. It's waiting for an element labeled night - and this element got labeled something else."
            }
          },
          {
            type: "predict",
            prompt: "Unit 5: your strap slid in when PLAY 'applied the on state - trust it for now'. The seal comes off. What was the hidden machinery doing?",
            options: [
              { text: "classList.add on the strap inside play(), and classList.remove inside stop().", correct: true,
                feedback: "That's the whole trick. You've now seen every line of the boilerplate you spent four units trusting." },
              { text: "Rewriting the stylesheet on every PLAY.",
                feedback: "Far simpler: the on-state rules were always in the stylesheet. PLAY just added the label that matches them." },
              { text: "GSAP.",
                feedback: "In Unit 6 templates, yes - but Unit 5 had no JS you'd met. Its CSS transitions fired when a class arrived. classList was the finger on the switch." }
            ]
          },
          {
            type: "predict",
            prompt: "A first look ahead. Soon a 'Night mode' checkbox will arrive as d.f3 - either \"1\" (ticked) or \"0\". This decides the switch:\n  if (d.f3 == \"1\") { panel.classList.add(\"night\"); }\n  else { panel.classList.remove(\"night\"); }\nWith the box ticked (\"1\"), which line runs?",
            render: { html: SKY_HTML, css: SKY_CSS, autoplay: true },
            options: [
              { text: "The add line - night goes on, and the panel flips to its night look.", correct: true,
                feedback: "That's an if/else. == checks the value; a true test runs the if block, anything else runs the else. You'll write these in Unit 9 - here you're just meeting the shape." },
              { text: "Both lines run, one after the other.",
                feedback: "Only one branch ever runs: if the == test is true, the if line; otherwise the else line. Never both." },
              { text: "Neither, until PLAY is pressed.",
                feedback: "This runs the moment the operator toggles the box (an update), not on PLAY. The == test picks which single line fires." }
            ]
          }
        ]
      },

      {
        id: "8.5", title: "Styling from data",
        concept: "element.style sets one style directly - the tool when the value arrives from the operator.",
        explain: "When the VALUE of a style comes from the operator - tonight's accent color - a class can't help: you can't write a rule for a color you don't know yet. JS sets it directly: element.style.backgroundColor = d.f2. One rename rule: CSS names lose their hyphen in JS - background-color becomes backgroundColor.",
        exercises: [
          {
            type: "operate",
            prompt: "Field f2 is a color field - its value rides the same pipeline as any text. The producer wants a bold red badge to flag today's featured bake: type #e02020 into Strap colour, press Update, then Play.",
            render: { html: ML_HTML, css: ML_CSS, js: ML85_JS, autoplay: true },
            panel: [
              { id: "f0", label: "Host", value: "Elif Demir", expect: "Elif Demir" },
              { id: "f1", label: "Topic", value: "Sourdough for beginners", expect: "Sourdough for beginners" },
              { id: "f2", label: "Strap colour (hex)", value: "", expect: "#e02020" }
            ],
            check: [
              { sel: "#ml_badge", style: { backgroundColor: "rgb(224, 32, 32)" } },
              { sel: "#f0", text: "Elif Demir" }
            ],
            successFeedback: "The color arrived through update() like every field - same pipeline, different ftype - and landed on .style, not .textContent. One quirk: the browser stores a colour as rgba(...), so your #e02020 reads back as rgba(224, 32, 32, 1).",
            feedback: { default: "The badge isn't red yet. Type #e02020 (hash included) into Strap colour, press Update, then Play." }
          },
          {
            type: "fill", kernel: true,
            prompt: "Write the operator's color onto the badge. Complete the line - remember the rename rule.",
            render: { html: ML_HTML, css: ML_CSS, js: ML85_JS, autoplay: true },
            code: 'function update(data) {\n  var d = JSON.parse(data);\n  document.getElementById("f0").textContent = d.f0;\n  document.getElementById("ml_badge").style.{{blank}} = d.f2;\n}',
            bank: ["backgroundColor", "background-color", "bgColor"],
            answer: "backgroundColor",
            feedback: {
              "background-color": "In CSS, yes. In JS the hyphen is illegal in a name like this. The rename rule: drop the hyphen, capitalize the next letter - backgroundColor.",
              "bgColor": "JS doesn't abbreviate - it renames. Take the CSS name, remove the hyphen, capitalize what followed it: backgroundColor."
            }
          },
          {
            type: "fix",
            prompt: "The badge ignores the operator's color - and this time the app shows a LOUD red error. For once, the machine complained. Fix the line.",
            render: { html: ML_HTML, css: ML_CSS, js: ML85_JS.replace(".style.backgroundColor = d.f2", ".style.background-color = d.f2"), autoplay: true },
            tokens: ['document.getElementById("ml_badge")', '.style.', 'background-color', ' = d.f2;'],
            answer: 2, fixedToken: "backgroundColor",
            fixedRender: { js: ML85_JS, play: true },
            success: "JS read background-color as 'background minus color' - a loud syntax error, for once. Hyphens become capitals.",
            feedback: {
              3: "The value is fine - the error points at the property name. JS read background-color as 'background minus color'.",
              default: "The error names the line. Which token can JS not even read as a name?"
            }
          },
          {
            type: "predict",
            prompt: "The operator picks red, but the template says document.getElementById(\"ml_badge\").textContent = d.f2. What shows on air?",
            render: { html: ML_HTML, css: ML_CSS, js: ML85_JS, autoplay: true },
            options: [
              { text: "The badge displays the text rgba(224,32,32,1).", correct: true,
                feedback: "A color field's value is a STRING. Written to textContent, it shows as words - on air. Style values go to .style. Watch." },
              { text: "The badge turns red.",
                feedback: "textContent puts text on screen - it never styles anything. To USE the value as a color, write it to style.backgroundColor." },
              { text: "Nothing.",
                feedback: "Something worse than nothing: the color's raw code, readable by every viewer." }
            ],
            applyOnAnswer: { html: ML_HTML.replace("MORNING LIGHT", "rgba(224,32,32,1)"), play: true }
          },
          {
            type: "predict",
            prompt: "Tool choice. A day/night look designed in the stylesheet - and a badge color the operator picks live. Which tool for which?",
            options: [
              { text: "Day/night: classList. Live color: .style.", correct: true,
                feedback: "Known looks live in rules - switch them with a class (8.4). Values that arrive as data can't have a ready-made rule - set them with .style." },
              { text: "Both with .style.",
                feedback: "The day/night looks are already designed as rules - don't rebuild them in JS. Switch the label; let the stylesheet do the painting." },
              { text: "Both with classList.",
                feedback: "You can't write a rule for a color you don't know yet. Data-driven values need .style." }
            ]
          }
        ]
      },

      {
        id: "8.6", title: "More than one step",
        concept: "\"steps\": \"2\" gives the operator a Continue button; SPX calls next() once per further phase.",
        explain: "Some graphics land in beats: the panel first, the results on a second press. The definition declares it - \"steps\": \"2\" - and the operator gets a Continue button. SPX runs the contract in order: play() in, each Continue calls next(), stop() out.",
        exercises: [
          {
            type: "predict",
            prompt: "Drive it: PLAY brings the panel and headline - and a CONTINUE button sits next to STOP. Press it: the results land. STOP clears. This template's definition says \"steps\": \"2\". Where did the Continue button come from?",
            render: { html: ELECT_HTML, css: ELECT_CSS, js: ELECT_JS, autoplay: false },
            options: [
              { text: "The \"steps\": \"2\" line in the definition.", correct: true,
                feedback: "Declare more than one step and SPX gives the operator the button. No steps line, no button." },
              { text: "The next() function existing.",
                feedback: "next() is what the button CALLS - but the button itself comes from the definition. A template can define next() and never get a Continue if steps isn't declared." },
              { text: "It's always there.",
                feedback: "Play the Unit 7 strap again - no Continue. Single-step templates never show it." }
            ]
          },
          {
            type: "predict",
            prompt: "\"steps\": \"2\" - how many times can the operator press Continue?",
            render: { html: ELECT_HTML, css: ELECT_CSS, js: ELECT_JS, autoplay: false },
            options: [
              { text: "Once.", correct: true,
                feedback: "The arrival IS step one. Continue covers the rest: steps minus one." },
              { text: "Twice.",
                feedback: "Count the phases: play() is the first, next() is the second. Two steps, one Continue." },
              { text: "As many as they like.",
                feedback: "The definition sets the count. After the last step, Continue has nothing left to call." }
            ]
          },
          {
            type: "fill",
            prompt: "The Election full-screen reveals its first result, then the second, then the third: three phases. Complete the definition.",
            render: { html: ELECT_HTML, css: ELECT_CSS, js: ELECT_JS, autoplay: false },
            code: 'window.SPXGCTemplateDefinition = {\n  "description": "Election reveal",\n  "steps": "{{blank}}",\n  "DataFields": [ ... ]\n};',
            bank: ["3", "2", "1"],
            answer: "3",
            feedback: {
              "2": "Count ALL phases including the arrival: the first result arrives with play(), then two Continues. Three steps.",
              "1": "One step means no Continue at all - the whole reveal would land at once."
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "The operator's button log on a three-step Election reveal reads: PLAY, CONTINUE, CONTINUE, STOP. Which functions ran, in order?",
            render: { html: ELECT_HTML, css: ELECT_CSS, js: ELECT_JS, autoplay: false },
            options: [
              { text: "play() -> next() -> next() -> stop()", correct: true,
                feedback: "Each Continue calls next(), and next() alone. STOP always means stop(), whatever step you're on." },
              { text: "play() -> next() -> play() -> stop()",
                feedback: "Continue never re-runs play() - the graphic is already on air. Each Continue calls next(), and next() alone." },
              { text: "play() -> next() -> next() -> next()",
                feedback: "STOP always means stop(), whatever step you're on - the out must work from any phase." }
            ]
          },
          {
            type: "predict",
            prompt: "A template defines a perfectly good next(), but its definition has no steps line. The operator wants the second phase. What happens?",
            options: [
              { text: "There's no Continue button to press - the phase is unreachable from the panel.", correct: true,
                feedback: "The definition describes; the panel obeys. Code the contract never calls might as well not exist - worth checking when a 'broken' multi-step lands on your desk." },
              { text: "Continue appears anyway, since next() exists.",
                feedback: "SPX reads the DEFINITION, not your function list. No declared steps, no button." },
              { text: "The template crashes.",
                feedback: "Nothing crashes - the graphic simply plays as a one-step. Silent, like most of this unit's failures." }
            ]
          }
        ]
      },

      {
        id: "8.7", title: "Why didn't it change?",
        concept: "When an edit does nothing, check the four suspects in order: id, selector typo, malformed value, field number.",
        explain: "You made the edit, pressed PLAY - and nothing changed. No error, no clue. This is normal, and it's almost always one of four suspects, in order: 1 wrong id (or a # inside getElementById); 2 a selector or class typo; 3 a missing unit or malformed value; 4 the wrong field number. Walk the list. Never guess.",
        exercises: [
          {
            type: "fix",
            prompt: "Ticket: 'Retyped the left team's name to RED HARBOR in the panel - the board still says NOVA FIVE.' Suspect 1 first: check every id this edit depends on.",
            render: { html: ARENA_HTML, css: ARENA_CSS, js: ARENA_JS.replace('document.getElementById("f0")', 'document.getElementById("#f0")'), autoplay: true },
            tokens: ['document.getElementById(', '"#f0"', ').textContent = d.f0;', 'document.getElementById(', '"f1"', ').textContent = d.f1;'],
            answer: 1, fixedToken: '"f0"',
            fixedRender: { html: ARENA_HTML.replace("NOVA FIVE", "RED HARBOR"), js: ARENA_JS },
            success: "getElementById wants the name alone - no hash. The edit reaches the board now.",
            feedback: {
              4: "That id is clean - no hash, and the element exists. The ticket says the LEFT team; check f0's line.",
              default: "Targeted edits only - the ticket points at f0. Suspect 1: is the id written WITHOUT the hash in getElementById?"
            }
          },
          {
            type: "fix",
            prompt: "Ticket: 'The map-score boxes render as plain text - no gold box behind them.' Suspect 1 clears (no ids involved). Suspect 2: compare every class name letter by letter.",
            render: { html: ARENA_HTML, css: ARENA_CSS.replace('.mapBox {', '.mapBoxx {'), js: ARENA_JS, autoplay: true },
            tokens: ['<span class="mapBox">2</span>', '<span class="mapBox">1</span>', '.mapBoxx {', '  background-color: #e8b90c;', '  color: #12131a;', '}'],
            answer: 2, fixedToken: ".mapBox {",
            fixedRender: { css: ARENA_CSS },
            success: "mapBoxx matched nothing, silently. When the uses agree with each other, suspect the rule.",
            feedback: {
              0: "Both spans agree with each other - mapBox, twice. When the USES agree, suspect the RULE.",
              1: "Both spans agree with each other - mapBox, twice. When the USES agree, suspect the RULE.",
              default: "Compare the class in the HTML with the selector in the CSS, letter by letter."
            }
          },
          {
            type: "fix",
            prompt: "Ticket: 'Moved the board down (top: 940) - on air it still hugs the top.' Suspects 1 and 2 clear. Suspect 3: read every value like a machine would.",
            render: { html: ARENA_HTML, css: ARENA_CSS.replace("top: 60px;", "top: 940;"), js: ARENA_JS, autoplay: true },
            tokens: ["#bugRoot {", "  position: absolute;", "  top: 940;", "  left: 560px;", "}"],
            answer: 2, fixedToken: "  top: 940px;",
            fixedRender: { css: ARENA_CSS.replace("top: 60px;", "top: 940px;") },
            success: "A number with no unit is a malformed value - the machine throws the whole declaration away. Silently, of course.",
            feedback: {
              3: "That one has its unit. Read the OTHER position value the way a machine would - something is missing.",
              default: "Suspect 3 is about values. One of these numbers is not a length the machine can use."
            }
          },
          {
            type: "fix",
            prompt: "Ticket: 'Editing Maps right does nothing - and editing Maps left changes BOTH scores.' Suspects 1-3 clear. Suspect 4: match every field number against the definition.",
            render: { html: ARENA_HTML, css: ARENA_CSS, js: ARENA_JS.replace('document.getElementById("f3").textContent = d.f3;', 'document.getElementById("f3").textContent = d.f2;'), autoplay: true },
            tokens: ['document.getElementById("f2")', '.textContent = d.f2;', 'document.getElementById("f3")', '.textContent = d.f2;'],
            answer: 3, fixedToken: ".textContent = d.f3;",
            fixedRender: { js: ARENA_JS },
            success: "Both boxes were drinking from f2. The element was right; the FIELD feeding it was wrong.",
            feedback: {
              2: "The element is right - getElementById(\"f3\") hits f3 exactly. The bug is the FIELD it's fed: read what's on the right of the equals sign.",
              default: "Read each line as element = field. One element is being fed another element's field."
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "New ticket, fresh template: 'The series label didn't change on air after I retyped it.' Which suspect do you check first, and where?",
            options: [
              { text: "Suspect 1: the getElementById line for that field in update() - is the id right, with no hash?", correct: true,
                feedback: "In order, always. Most tickets die at suspect 1, and checking it costs ten seconds." },
              { text: "Suspect 4 - field numbers feel likeliest.",
                feedback: "Maybe - but 'likeliest' is how guessing starts. The list is ordered so each check is quick and rules territory out. Suspect 1 first, every time." },
              { text: "Change things until it works.",
                feedback: "That's the random walk this lesson replaces. Every untargeted edit can add a SECOND bug - then you're debugging two." }
            ]
          }
        ]
      },

      {
        id: "8.8", title: "Edit without breaking",
        concept: "The do-not-rename list (play, stop, update, next, fN, SPXGCTemplateDefinition) plus one-change-then-play.",
        explain: "A template is yours to reshape - except the names other software calls. SPX looks for play, stop, update, next, the fN ids, and SPXGCTemplateDefinition BY NAME: rename any of them and the contract goes silent. Everything else is fair game. And one habit above all: one change, then play.",
        exercises: [
          {
            type: "predict", kernel: true,
            prompt: "A stranger's template, four names: #strap, play(), --accent, f0. Which may you safely rename (together with their uses)?",
            render: { html: FONT_HTML, css: FONT_CSS, autoplay: true },
            options: [
              { text: "#strap and --accent - the author's own names.", correct: true,
                feedback: "Yours to reshape: rename the rule AND its uses (remember 8.2) and nothing outside cares. play and f0 are contract names - SPX speaks them." },
              { text: "play() - it's just a function.",
                feedback: "SPX calls that exact name. Rename it and PLAY presses into silence - you saw it in 7.2. Contract names are frozen." },
              { text: "f0 - it's just an id.",
                feedback: "The fN ids are the handshake itself (7.7) - the operator's field f0 lands in the element f0 by NAME. Frozen." },
              { text: "None - never rename anything.",
                feedback: "Over-freezing. Most of a template IS yours; only the names other software calls are frozen." }
            ]
          },
          {
            type: "fix",
            prompt: "Ticket on the SKYWATCH panel: 'A helpful colleague clarified the code. Now the panel ignores everything typed in the operator panel.' The function body is untouched and correct. Restore the data flow.",
            render: { html: SKY_HTML, css: SKY_CSS, js: SKY_UPD_JS.replace("function update", "function refresh"), autoplay: false },
            tokens: ["function", "refresh", "(data) {", "  var d = JSON.parse(data);", "  ...three correct writes...", "}"],
            answer: 1, fixedToken: "update",
            fixedRender: { js: SKY_UPD_JS },
            success: "The wiring inside was fine - nothing CALLED it anymore. SPX delivers field edits to a function named update, exactly.",
            feedback: {
              default: "The body lines are fine - nothing calls the function anymore. SPX delivers field edits to one exact name. Check the card."
            }
          },
          {
            type: "predict",
            prompt: "Three edits went in at once on Morning Light: (a) --accent changed to green, (b) f1's default reworded in the definition, (c) function stop() renamed to stopNow(). Report: 'STOP does nothing anymore.' Which edit broke it?",
            options: [
              { text: "(c) - stop is a contract name. And one-change-then-play would have caught it in ten seconds.", correct: true,
                feedback: "Playing after EACH edit pins the breakage to the exact change that caused it. Batching gave this colleague three suspects instead of one." },
              { text: "(a) - the variable rename.",
                feedback: "Legal - a variable is yours (with its uses). Check each changed name against the card: one of the three touched a frozen name." },
              { text: "(b) - the default text.",
                feedback: "Legal - defaults are yours. Check each changed name against the card: one of the three touched a frozen name." }
            ]
          },
          {
            type: "fill",
            prompt: "Fill in the checklist card's do-not-rename list.",
            code: 'DO NOT RENAME:\nplay / stop / update / {{blank}}\nthe fN ids / SPXGCTemplateDefinition',
            bank: ["next", "--accent", "gsap"],
            answer: "next",
            feedback: {
              "--accent": "Yours to rename (with its uses). The frozen names are the ones SPX speaks - and next is one of them (8.6).",
              "gsap": "gsap is a tool you call - you'd never rename it, but it isn't part of the SPX contract. The card lists what SPX calls IN YOUR FILE."
            }
          },
          {
            type: "predict",
            prompt: "The producer wants the ARENA series label yellow AND the entrance faster. What's the disciplined way to make both changes?",
            render: ARENA,
            options: [
              { text: "Edit the color, PLAY and verify - then edit the duration, PLAY and verify.", correct: true,
                feedback: "One change, then play. Each test has exactly one possible cause." },
              { text: "Make both edits, then one PLAY at the end.",
                feedback: "Two changes in flight - if that play looks wrong, which one do you blame? One change, then play." },
              { text: "Make both edits and ship it - they're small.",
                feedback: "Small edits break contracts too (ask the stopNow colleague). Play after every change - it costs seconds and names the culprit." }
            ]
          }
        ]
      },

      {
        id: "8.9", title: "The other dialect (optional)",
        concept: "Some templates define no play/update at all - they read spxData and subscribe via spxRenderer.on.",
        explain: "One day you'll open a template with no play(), no update() - and it works anyway. It's the other SPX dialect: the template SUBSCRIBES to SPX's events with spxRenderer.on(...) and reads its fields straight from spxData - already unpacked, no JSON.parse. Your job today is only to recognize it.",
        exercises: [
          {
            type: "observe",
            prompt: "This Morning Light twin has no play() and no update(), yet PLAY works. Tap the line that hooks the template onto SPX's play event.",
            render: { html: ML_HTML, css: ML_CSS, autoplay: true },
            lines: [
              "window.top.spxRenderer.on('play', function () {",
              "  document.getElementById('f0').textContent = spxData.f0;",
              "  gsap.to('#ml_strap', { x: 0, opacity: 1, duration: 0.6 });",
              "});"
            ],
            answer: 0, highlight: "#no-hl",
            success: "spxRenderer.on is the subscription - and spxData (line 2) is the other tell-tale. Those two words name the dialect.",
            feedback: {
              1: "That line carries the OTHER tell-tale - spxData, the data side. The event hook is the spxRenderer.on line.",
              2: "GSAP lives happily in both dialects - it animates either way. The tell-tales are the SPX-flavored words.",
              default: "Look for the SPX-flavored word that subscribes to an event."
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "You open a downloaded template: no update() anywhere. Broken, or the other dialect?",
            options: [
              { text: "Check for the tell-tales first: if spxData / spxRenderer appear, it's the other dialect, working as designed.", correct: true,
                feedback: "'No play() = broken' is yesterday's rule. Two dialects exist; identify before you judge - or edit." },
              { text: "Broken - every template must define update().",
                feedback: "Only in the classic dialect. This one receives data through spxData and events through spxRenderer.on - no globals needed." },
              { text: "Add an update() to fix it.",
                feedback: "That's editing blind - 8.8's cardinal sin. An added update() would sit there uncalled... or fight the handlers that already do the job." }
            ]
          },
          {
            type: "predict",
            prompt: "In this dialect, the template reads spxData.f0. Where's the JSON.parse?",
            options: [
              { text: "There isn't one - spxData is already an object.", correct: true,
                feedback: "The classic dialect gets sealed freight (a JSON string) and unpacks it. This dialect gets the bundle pre-opened." },
              { text: "Hidden in spxRenderer.",
                feedback: "Nothing hidden to worry about: from where you stand, spxData is simply already readable. No parse line to write or fix." },
              { text: "It's missing - that's a bug.",
                feedback: "Reading .f0 straight off spxData WORKS - that's the point. If it were a string, 7.6 taught you what you'd see: nothing." }
            ]
          },
          {
            type: "predict",
            prompt: "Three snippets. Which one belongs to the OTHER dialect?",
            options: [
              { text: "window.top.spxRenderer.on('continue', function () { ... })", correct: true,
                feedback: "The subscription hook - spxRenderer is the tell-tale. (Note: this dialect says 'continue' where the classic one defines next().)" },
              { text: "function next() { revealResults(); }",
                feedback: "A global function under a contract name - that's the classic dialect." },
              { text: "gsap.to(\"#strap\", { x: 0, duration: 0.6 })",
                feedback: "Trick entry - GSAP belongs to BOTH dialects. It never marks one." }
            ]
          }
        ]
      },

      {
        id: "cp8", title: "Checkpoint: The download",
        concept: "Make a stranger's template ours - three tickets, the 8.7 method, the 8.8 habit.",
        explain: "You found a decent lower third on the internet: CleanLine LT3, variables named --c1/--c2, ids lt_wrap/lt_panel. Three change tickets. Work them in order - and play after every fix.",
        isCheckpoint: true,
        exercises: [
          {
            type: "fill",
            prompt: "Ticket 1 - rebrand to the NN card: panel #0a3d91, accent #e8b90c. The template is variable-driven; --c1 and --c2 are the dials. First dial: the panel.",
            render: { html: CL_HTML, css: CL_CSS, js: CL_JS_SLOW, autoplay: true },
            code: '/* cleanline lt3 - free for broadcast use - TK */\n:root { --c1: {{blank}}; --c2: #0b0f14; }\n#lt_wrap { position: absolute; left: 96px; bottom: 96px; opacity: 0; font-family: Arial, sans-serif; }\n#lt_panel { background-color: var(--c1); padding: 18px 28px; }\n#f0 { color: #ffffff; font-size: 44px; font-weight: 700; }\n#f1 { color: var(--c2); font-size: 26px; }\n.lt_tick { background-color: var(--c1); }',
            bank: ["#0a3d91", "#10b981", "0a3d91"],
            answer: "#0a3d91", slot: "css",
            success: "One dial, every panel-colored wire follows. Now PLAY and verify before touching anything else.",
            feedback: {
              "#10b981": "That's CleanLine's own green - the ticket says NN panel blue: #0a3d91.",
              "0a3d91": "The panel just lost its background entirely - a value with no # is malformed, and the machine threw the declaration away. Suspect 3."
            }
          },
          {
            type: "fill",
            prompt: "Ticket 1, second dial: the accent. NN accent gold is #e8b90c.",
            render: { html: CL_HTML, css: CL_CSS.replace("--c1: #10b981;", "--c1: #0a3d91;"), js: CL_JS_SLOW, autoplay: true },
            code: '/* cleanline lt3 - free for broadcast use - TK */\n:root { --c1: #0a3d91; --c2: {{blank}}; }\n#lt_wrap { position: absolute; left: 96px; bottom: 96px; opacity: 0; font-family: Arial, sans-serif; }\n#lt_panel { background-color: var(--c1); padding: 18px 28px; }\n#f0 { color: #ffffff; font-size: 44px; font-weight: 700; }\n#f1 { color: var(--c2); font-size: 26px; }\n.lt_tick { background-color: var(--c1); }',
            bank: ["#e8b90c", "#0b0f14", "e8b90c"],
            answer: "#e8b90c", slot: "css",
            success: "Ticket 1 done with two edits in :root - dials, not wires. Verified on air.",
            feedback: {
              "#0b0f14": "That's the stranger's original near-black. The NN card says accent gold: #e8b90c.",
              "e8b90c": "The title line just went to the default color - no #, no color. Malformed values fail silently. Suspect 3."
            }
          },
          {
            type: "fill",
            prompt: "Ticket 2 - swap the logo to the NN mark. The asset drawer lists nn-logo.png at the ROOT of the template folder (not inside logo/). Point the img at it.",
            render: {
              html: CL_HTML.replace('<div id="lt_panel">', '<div id="lt_panel"><img id="lt_logo" src="logo/nn-logo.png">'),
              css: CL_CSS_NN + '\n#lt_logo{display:inline-block;width:54px;height:54px;margin:0 0 8px;border-radius:8px;background:linear-gradient(135deg,#e8b90c,#b8860b);}',
              js: CL_JS_SLOW, autoplay: true
            },
            code: '<img id="lt_logo" src="{{blank}}">',
            bank: ["nn-logo.png", "logo/nn-logo.png", "NN Logo"],
            answer: "nn-logo.png",
            success: "You checked the value against the asset drawer - suspect 3 thinking, before the broken image ever aired.",
            feedback: {
              "logo/nn-logo.png": "The natural edit - and a broken image. The OLD file lived in logo/; the drawer has nn-logo.png at the root. Check the value against the drawer, like 2.5 taught.",
              "NN Logo": "That's a name, not a path. src wants the file's path exactly as the drawer spells it."
            }
          },
          {
            type: "fix",
            prompt: "Ticket 3 - 'The entrance feels slow and it lands wrong.' PLAY it: 2.4 seconds is an eternity on air. First fault: the duration. Find it.",
            render: { html: CL_HTML, css: CL_CSS_NN, js: CL_JS_SLOW, autoplay: true },
            tokens: ['gsap.fromTo("#lt_wrap",', "  { y: 160, opacity: 0 },", "  { y: 0, opacity: 1,", "    duration: 2.4,", '    ease: "power2.in" });'],
            answer: 3, fixedToken: "    duration: 0.6,",
            fixedRender: { js: CL_JS_TIMED },
            success: "0.6s - broadcast-sane. PLAY and verify... it's faster, but something still lands wrong.",
            feedback: {
              4: "That token IS also suspect - hold it for the next fix. The ticket's first word is 'slow': find the number that makes it slow.",
              default: "Landmark 4 thinking: the entrance lives in play(). Which value makes 'slow'?"
            }
          },
          {
            type: "fix",
            prompt: "Faster now - but watch the landing: it speeds INTO the frame and slams. Entrances ease out. Fix the direction.",
            render: { html: CL_HTML, css: CL_CSS_NN, js: CL_JS_TIMED, autoplay: true },
            tokens: ['gsap.fromTo("#lt_wrap",', "  { y: 160, opacity: 0 },", "  { y: 0, opacity: 1,", "    duration: 0.6,", '    ease: "power2.in" });'],
            answer: 4, fixedToken: '    ease: "power2.out" });',
            fixedRender: { js: CL_JS_FIXED },
            success: "Ins land softly (power2.out), outs leave in a hurry (power2.in). All three tickets verified on air.",
            feedback: {
              3: "The duration is fixed already. The LANDING is wrong - which token says how the motion finishes?",
              default: "5.4's taste, 6.3's spelling: an entrance decelerates. Find the token that makes this one accelerate."
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "Three tickets, and you pressed PLAY after each fix. A colleague batched all their edits and played once at the end - their render looks identical to yours. What did they lose?",
            render: { html: CL_HTML, css: CL_CSS_NN, js: CL_JS_FIXED, autoplay: true },
            options: [
              { text: "The culprit trail: when ticket 2 broke mid-way, they had three suspects instead of one.", correct: true,
                feedback: "All three tickets look right - but a mid-way breakage would name no culprit. Play after every change; each test has one possible cause." },
              { text: "Nothing - the final render is what ships.",
                feedback: "Until something breaks mid-way. Then a batcher debugs three edits at once; you debug one. The habit is graded because it's the job." },
              { text: "Time - batching is slower.",
                feedback: "Batching is FASTER - that's its temptation. What it costs is certainty about which edit broke what." }
            ]
          }
        ]
      }
    ]
  });
})();
