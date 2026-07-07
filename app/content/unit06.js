// Unit 6 - Moving with GSAP. Source of truth: lessons/unit-06.md
// Schema per app/SCHEMA.md. Console-strip pedagogy is encoded as slot:"js"
// fill/build exercises (each chip pick re-runs the js live) and as render.js demos.
(function () {

  // The Nightly News strap + NN bug, resting look owned by CSS (Units 3-4).
  var CSS = '#strap { position: absolute; left: 120px; top: 860px; background-color: #0a3d91; padding: 22px 34px; } .line { color: #ffffff; font-size: 52px; font-weight: 700; font-family: Arial, sans-serif; } #title { font-size: 34px; font-weight: 400; color: #dbe4f5; }';
  var BUGCSS = CSS + ' #bug { position: absolute; right: 90px; top: 60px; width: 90px; height: 90px; background-color: #0a3d91; color: #ffffff; font-family: Arial, sans-serif; font-size: 40px; font-weight: 700; line-height: 90px; text-align: center; border-radius: 10px; }';
  var HTML = '<div id="strap"><div id="name" class="line">Maria Kranz</div><div id="title" class="line">News Anchor</div></div>';
  var HTMLB = HTML + '<div id="bug">NN</div>';

  // 6.6+ arrangement: strap wraps a panel; the lines rest at opacity 0 until tweened.
  var PHTML = '<div id="strap"><div id="panel"><div id="name" class="line">Maria Kranz</div><div id="title" class="line">News Anchor</div></div></div>';
  var PCSS_ON = '#strap { position: absolute; left: 120px; top: 860px; } #panel { background-color: #0a3d91; padding: 22px 34px; } .line { color: #ffffff; font-size: 52px; font-weight: 700; font-family: Arial, sans-serif; } #title { font-size: 34px; font-weight: 400; color: #dbe4f5; }';
  var PCSS = PCSS_ON + ' #name, #title { opacity: 0; }';

  // Timeline demos (render-side; PLAY replays them; snaps reset the off state).
  var TL66 = 'function play() { gsap.to("#panel", { x: -640, duration: 0 }); gsap.to("#name", { opacity: 0, duration: 0 }); gsap.to("#title", { opacity: 0, duration: 0 }); gsap.timeline().to("#panel", { x: 0, duration: 0.4, ease: "power2.out" }).to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" }).to("#title", { opacity: 1, duration: 0.3, ease: "power2.out" }) }';
  var TL67 = 'function play() { gsap.to("#panel", { x: -640, duration: 0 }); gsap.to("#name", { opacity: 0, duration: 0 }); gsap.to("#title", { opacity: 0, duration: 0 }); gsap.timeline().to("#panel", { x: 0, duration: 0.4, ease: "power2.out" }).to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2").to("#title", { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2") }';
  var TL67BLOB = 'function play() { gsap.to("#panel", { x: -640, duration: 0 }); gsap.to("#name", { opacity: 0, duration: 0 }); gsap.to("#title", { opacity: 0, duration: 0 }); gsap.timeline().to("#panel", { x: 0, duration: 0.4, ease: "power2.out" }).to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2").to("#title", { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.3") }';

  // 6.8: the inherited shelf block (fromTo throughout; the title ease is the planted bug).
  var TL68 = 'function play() { gsap.timeline().fromTo("#panel", { x: -640, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }).fromTo("#name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.2").fromTo("#title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.in" }, "-=0.1") }';
  var TL68FIX = 'function play() { gsap.timeline().fromTo("#panel", { x: -640, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }).fromTo("#name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.2").fromTo("#title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.1") }';

  // Checkpoint 6: the approved in/out pair.
  var CP6JS = 'function play() { gsap.to("#strap", { y: 0, opacity: 1, duration: 0 }); gsap.timeline().fromTo("#panel", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }).fromTo("#name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2").fromTo("#title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2") }\nfunction stop() { gsap.to("#strap", { y: 40, opacity: 0, duration: 0.3, ease: "power2.in" }) }';

  window.COURSE_DATA = window.COURSE_DATA || [];
  COURSE_DATA.push({
    id: 6,
    title: "Moving with GSAP",
    promise: "Read and adjust the GSAP animation in any template you're handed.",
    lessons: [

      {
        id: "6.1", title: "Asking a tool to move things",
        concept: "Calling a function: a tool's name, then its inputs in parentheses - nothing happens until the line runs.",
        explain: "Until now your code has described things. JavaScript gives instructions: gsap.to(\"#strap\", { x: 0 }) is a call - the tool's name, then its inputs: who to move, and the settings for the move. GSAP is the channel's animation toolkit, already loaded - trust it.",
        exercises: [
          {
            type: "observe",
            prompt: "Three lines just ran, one at a time: the strap slid right, the bug shrank away, the strap came home. Here is the first call, in pieces. Tap the piece that named WHICH element moves.",
            render: { html: HTMLB, css: BUGCSS, mode: "video", autoplay: true,
              js: 'function play() { gsap.timeline().to("#strap", { x: 200, duration: 0.6 }).to("#bug", { scale: 0, duration: 0.5 }, "+=0.3").to("#strap", { x: 0, duration: 0.6 }, "+=0.3") }' },
            lines: ['gsap.to', '"#strap"', '{ x: 200 }'],
            answer: 1,
            highlight: "#strap",
            success: "The target - the who. It outlines on air: the same #strap id string you wrote in Unit 3.",
            feedback: {
              0: "That's the tool's name - the same tool ran all three moves. The WHO is the first input, inside the parentheses.",
              2: "Those are the settings for the move - the WHAT. The WHO comes just before them: the target."
            }
          },
          {
            type: "predict",
            prompt: "gsap.to(\"#bug\", { scale: 1 }) is about to run. Which element is about to change?",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            options: [
              { text: "The NN bug.", correct: true,
                feedback: "Read the target: #bug. GSAP finds elements exactly the way Unit 3's selectors did - by id. Watch it pulse." },
              { text: "The strap.",
                feedback: "Read the target: #bug. GSAP finds elements exactly the way Unit 3's selectors did - by id." },
              { text: "Every element.",
                feedback: "A call moves only what its target names. One call, one target - here, the bug." }
            ],
            applyOnAnswer: { js: 'gsap.fromTo("#bug", { scale: 0.4 }, { scale: 1, duration: 0.5, ease: "back.out" })', play: true }
          },
          {
            type: "predict", kernel: true,
            prompt: "The line gsap.to(\"#strap\", { x: 200 }) is written, but it hasn't run yet. What is the strap doing right now?",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            options: [
              { text: "Nothing - a call is an instruction, and instructions happen only when they run.", correct: true,
                feedback: "Exactly. Written is not executed. CSS is; JavaScript does - when the line runs." },
              { text: "It has already moved 200 pixels right.",
                feedback: "The line existing changes nothing. CSS is; JavaScript does - and it does it when the line runs. Look: the strap sits at home." },
              { text: "It is drifting right slowly on its own.",
                feedback: "There's no halfway state. Before it runs: nothing. After it runs: the move. The call is an action, not a description." }
            ]
          },
          {
            type: "fill",
            prompt: "Give the call its target - slide the WHOLE strap 200 pixels right. Every chip runs live: watch what your pick actually moves.",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            code: 'gsap.to("{{blank}}", { x: 200 })',
            bank: ["#strap", "strap", "#name"],
            answer: "#strap",
            slot: "js",
            success: "The whole strap slid - target the wrapper and everything inside rides along.",
            feedback: {
              "strap": "Nothing moved: without the #, the tool goes looking for a TAG called strap and finds none. The # means find-the-id - the same hash from Unit 3's #name rules.",
              "#name": "Only the name line slid - that id belongs to one line inside the strap. The task says the WHOLE strap: target the wrapper that owns it all."
            }
          },
          {
            type: "arrange",
            prompt: "Build the call that shrinks the bug away.",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            blocks: ['gsap.to', '(', '"#bug"', ',', '{ scale: 0 }', ')'],
            slot: "js",
            success: "Target first, settings second - and the bug shrinks away on cue.",
            feedback: { default: "GSAP always hears WHO first, WHAT second: target, comma, settings - and the parentheses are the call's hands, holding ALL the inputs after the name." }
          }
        ]
      },

      {
        id: "6.2", title: "The settings object",
        concept: "The braces hold a settings list: property: value pairs, commas between pairs - CSS knobs wearing shorter names.",
        explain: "The second input is a settings list: braces, a colon inside each pair, a comma between pairs. Old friends, short names: x and y are Unit 5's translate, scale is scale, opacity is opacity. Careful - these braces are not a CSS rule: a rule IS, a call DOES.",
        exercises: [
          {
            type: "predict",
            prompt: "gsap.to(\"#strap\", { x: 300 }) just ran - the strap slid off to the right. What did the number 300 mean?",
            render: { html: HTMLB, css: BUGCSS, mode: "video", autoplay: true,
              js: 'function play() { gsap.to("#strap", { x: 0, duration: 0 }); gsap.to("#strap", { x: 300 }) }' },
            options: [
              { text: "300 pixels to the right of the strap's home spot.", correct: true,
                feedback: "x speaks pixels, exactly like translateX. Answering brings it home: x back to 0." },
              { text: "300 seconds.",
                feedback: "Nothing about time is in this call yet - time arrives next lesson. x speaks pixels, exactly like translateX." },
              { text: "300% size.",
                feedback: "Size is scale's job. x is sideways travel in pixels - Unit 5's translateX in a two-letter coat." }
            ],
            applyOnAnswer: { js: 'gsap.fromTo("#strap", { x: 300 }, { x: 0, duration: 0.5, ease: "power2.out" })', play: true }
          },
          {
            type: "predict",
            prompt: "gsap.to(\"#strap\", { x: -500, opacity: 0 }) runs. Where does the strap end up, and can we see it?",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            options: [
              { text: "500 pixels left of home - and invisible.", correct: true,
                feedback: "You've met this position before: it's the entrance's starting point from 5.1, now written in GSAP. Watch it go." },
              { text: "At home, visible.",
                feedback: "Read the pairs: x: -500 sends it left (minus = left, same as translate), opacity: 0 fades it out. Both happen." },
              { text: "500 pixels right and see-through.",
                feedback: "Minus goes LEFT. Positive x goes right - same compass as translateX(-500px) in Unit 5." }
            ],
            applyOnAnswer: { js: 'gsap.to("#strap", { x: -500, opacity: 0 })', play: true }
          },
          {
            type: "fill",
            prompt: "A stray call is about to resize the bug. It must stand at its normal, full size. Every chip runs live.",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            code: 'gsap.to("#bug", { scale: {{blank}} })',
            bank: ["1", "0", "100"],
            answer: "1",
            slot: "js",
            success: "Scale speaks in multiples: 1 = normal. The bug holds its full corner size.",
            feedback: {
              "0": "It shrank to NOTHING - scale 0 is the ready-to-enter size from 5.2. Full size is 1.",
              "100": "It filled the sky. Scale speaks in multiples, not percent: 1 = normal, 2 = double."
            }
          },
          {
            type: "fill",
            prompt: "Slide the strap 40 pixels DOWN.",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            code: 'gsap.to("#strap", { {{blank}}: 40 })',
            bank: ["y", "x", "scale"],
            answer: "y",
            slot: "js",
            success: "Positive y goes down, exactly like the 1920x1080 grid from Unit 4.",
            feedback: {
              "x": "It slid SIDEWAYS. Down is the y direction - positive y goes down, exactly like the 1920x1080 grid from Unit 4.",
              "scale": "It exploded to 40x size. Scale changes size, not place. Travel is x and y's job."
            }
          },
          {
            type: "fix",
            prompt: "This line just ran - and GSAP choked: the red overlay says the settings list broke. Tap the spot where the list broke.",
            render: { html: HTMLB, css: BUGCSS, mode: "video",
              js: 'gsap.to("#strap", { x: 0 opacity: 1 })' },
            tokens: ['gsap.to(', '"#strap",', '{ x: 0', 'opacity: 1 }', ')'],
            answer: 2,
            fixedToken: '{ x: 0,',
            fixedRender: { js: 'gsap.to("#strap", { x: 200, opacity: 0.3, duration: 0 }); gsap.to("#strap", { x: 0, opacity: 1 })' },
            success: "A comma between pairs, and the call runs. That red overlay is a LOUD failure - it tells you where to look. Remember Unit 3's silent ones? Loud errors are the friendly kind.",
            feedback: {
              3: "That pair is fine - property, colon, value. Colons glue a property to its value. What separates one PAIR from the next?",
              default: "The call's shell is fine - the braces hold the list. The break is INSIDE the list: every pair needs a comma before the next one."
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "Side by side: the CSS rule #strap { opacity: 1; } and the call gsap.to(\"#strap\", { opacity: 1 }). Both braces, both opacity: 1. What's the real difference?",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            options: [
              { text: "The rule states the strap's resting look; the call is an ACTION that animates it there when it runs.", correct: true,
                feedback: "Twins in looks, strangers in verbs: the rule sits in style and IS; the call sits in script and DOES." },
              { text: "Nothing - they're interchangeable.",
                feedback: "They look like twins but live in different rooms and speak different verbs: the rule sits in style and IS; the call sits in script and DOES - the moment it runs." },
              { text: "The JS one is wrong - pairs need semicolons.",
                feedback: "CSS separates with semicolons; a JS settings list separates with commas. Same idea, different grammar - you just fixed exactly that comma." }
            ]
          }
        ]
      },

      {
        id: "6.3", title: "How long, and how",
        concept: "duration = seconds; ease = the speed shape. The name is the CURVE, not the graphic's direction: entrances ease out, exits ease in.",
        explain: "Two more settings ride in the same braces: duration (seconds) and ease (the speed shape). \"power2.out\" lands gently - entrances. \"power2.in\" accelerates away - exits. \"none\" is the robot. Warning: .out and .in describe the curve, not whether the graphic is coming or going.",
        exercises: [
          {
            type: "fill",
            prompt: "The first line snaps the strap into the wings; the second brings it in. Swap the ease and replay each - tap the one that looks broadcast-quality for an entrance.",
            render: { html: HTML, css: CSS, mode: "video" },
            code: 'gsap.to("#strap", { y: 40, opacity: 0, duration: 0 })\ngsap.to("#strap", { y: 0, opacity: 1, duration: 0.5, ease: {{blank}} })',
            bank: ['"power2.out"', '"power2.in"', '"none"'],
            answer: '"power2.out"',
            slot: "js",
            success: "Fast start, gentle landing - the 5.4 arrival, by its GSAP name.",
            feedback: {
              '"none"': "Constant speed - the robot from 5.4. (Not always wrong: the ticker's endless crawl WANTS \"none\". Entrances don't.)",
              '"power2.in"': "It creeps off the line and slams into place - that's a LEAVING curve. Hold that thought for the next question."
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "A colleague's ENTRANCE animation says ease: \"power2.in\". It just replayed on stage. How will it feel on air?",
            render: { html: HTML, css: CSS, mode: "video", autoplay: true,
              js: 'function play() { gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power2.in" }) }' },
            options: [
              { text: "It starts slow and slams to a stop - an exit's curve pasted onto an entrance; wrong feel.", correct: true,
                feedback: "That slam is the tell. .in and .out name the CURVE, not the direction. Entrances ease out." },
              { text: "Correct - .in means the graphic is coming IN.",
                feedback: "The trap in the name: .in and .out describe the CURVE, not the direction. power2.out = decelerating arrival - use it to come in. power2.in = accelerating - use it to leave." },
              { text: "GSAP will refuse to run it.",
                feedback: "GSAP obeys happily - the machine has no taste. Ease direction is YOUR call, which is why you're being drilled on it." }
            ]
          },
          {
            type: "fill",
            prompt: "The spec card reads: \"Out: 0.3 seconds, accelerating.\" Set the duration - each chip plays the exit live.",
            render: { html: HTML, css: CSS, mode: "video" },
            code: 'gsap.to("#strap", { y: 40, opacity: 0, duration: {{blank}}, ease: "power2.in" })',
            bank: ["0.3", "0.5", "3"],
            answer: "0.3",
            slot: "js",
            success: "0.3 - crisp. The 5.5 rule still rules: outs run shorter than ins.",
            feedback: {
              "0.5": "That's the entrance's length. The 5.5 rule still rules: outs run SHORTER than ins - the card says 0.3.",
              "3": "Three full seconds off air - an eternity, and you just sat through it. GSAP durations are seconds; broadcast outs live around a third of one."
            }
          },
          {
            type: "predict",
            prompt: "Press PLAY, then STOP, and just WATCH the cycle. The out feels wrong twice over. Which TWO settings in the STOP call break Unit 5's exit rules? STOP: gsap.to(\"#strap\", { y: 40, opacity: 0, duration: 0.9, ease: \"power2.out\" })",
            render: { html: HTML, css: CSS, mode: "video", autoplay: true,
              js: 'function play() { gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }) }\nfunction stop() { gsap.to("#strap", { y: 40, opacity: 0, duration: 0.9, ease: "power2.out" }) }' },
            options: [
              { text: "duration: 0.9 (slower than the in) and ease: \"power2.out\" (a landing curve on a departure).", correct: true,
                feedback: "Both fixed: 0.3 and \"power2.in\". Say the exit rule-pair out loud: outs ease IN, and run FASTER." },
              { text: "y: 40 and opacity: 0.",
                feedback: "Those are right - fade and slide down is exactly the spec. The problem is HOW LONG and WHAT SHAPE." },
              { text: "Only the duration - the ease is fine.",
                feedback: "One more. power2.out is a landing curve on a DEPARTURE. Outs ease IN, and run faster." }
            ],
            applyOnAnswer: { js: 'function play() { gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }) }\nfunction stop() { gsap.to("#strap", { y: 40, opacity: 0, duration: 0.3, ease: "power2.in" }) }\nstop()', play: false }
          },
          {
            type: "predict",
            prompt: "The sports ticker crawls Tomas Berg's match report across the screen at constant speed, forever. Which ease does the crawl want?",
            render: {
              html: '<div id="ticker">HIFK 3 - 2 TPS +++ TOMAS BERG: LATE WINNER SEALS THE DERBY +++ MORE AT 23:00</div>',
              css: '#ticker { position: absolute; left: 0; right: 0; top: 986px; background-color: #0a3d91; color: #ffffff; font-family: Arial, sans-serif; font-size: 36px; font-weight: 700; padding: 16px 0; white-space: nowrap; }',
              js: 'gsap.fromTo("#ticker", { x: 1920 }, { x: -1920, duration: 14, ease: "none" })',
              mode: "video" },
            options: [
              { text: '"none"', correct: true,
                feedback: "The one place the robot is the pro choice: a crawl that eased would surge and stall." },
              { text: '"power2.out"',
                feedback: "A crawl has no landing - it never stops. Constant speed is the point: \"none\"." },
              { text: '"power2.in"',
                feedback: "Accelerating forever? The headlines would fly off unreadable. Constant crawl: \"none\"." }
            ]
          },
          {
            type: "predict",
            prompt: "Maria Kranz's strap is leaving the screen. Which ease?",
            render: { html: HTML, css: CSS, mode: "video" },
            options: [
              { text: '"power2.in"', correct: true,
                feedback: "Departures accelerate - watch it leave like it's needed elsewhere." },
              { text: '"power2.out"',
                feedback: "Read the name as the curve, not the direction: .out eases OUT OF ITS SPEED at the end - a landing shape. Departures accelerate: \"power2.in\"." },
              { text: '"none"',
                feedback: "Save the robot for the ticker. A strap leaves like it's needed elsewhere - accelerating." }
            ],
            applyOnAnswer: { js: 'gsap.to("#strap", { y: 40, opacity: 0, duration: 0.3, ease: "power2.in" })', play: true }
          }
        ]
      },

      {
        id: "6.4", title: "Enter from off-screen",
        concept: "gsap.from flips the arrow: the settings are the STARTING line; the element travels home to its CSS look.",
        explain: "gsap.to animates TO the settings. gsap.from flips the arrow: the settings are the starting line, and the element travels home - to the position and look your CSS already gives it. That's the standard entrance idiom: CSS owns the resting look, the animation owns the journey.",
        exercises: [
          {
            type: "predict",
            prompt: "Two lines with IDENTICAL settings: { y: 40, opacity: 0, duration: 0.5, ease: \"power2.out\" }. The to version slid the strap out; the from version - just replayed - brought it IN. In the from call, what do the settings describe?",
            render: { html: HTML, css: CSS, mode: "video", autoplay: true,
              js: 'function play() { gsap.from("#strap", { y: 40, opacity: 0, duration: 0.5, ease: "power2.out" }) }' },
            options: [
              { text: "Where the strap STARTS - it then travels to its CSS home.", correct: true,
                feedback: "Same settings, opposite journeys. from reads: start THERE, come home." },
              { text: "Where the strap ends up.",
                feedback: "That's to's reading - you just watched to make it leave. from flips the arrow: settings are the start, CSS home is the finish." },
              { text: "Both start and end.",
                feedback: "One set of braces can only hold one end. (Stating BOTH ends is real - next lesson.)" }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "gsap.from(\"#name\", { opacity: 0, duration: 0.5 }) finishes. What is the name line's opacity?",
            render: { html: HTML, css: CSS, mode: "video" },
            options: [
              { text: "1 - whatever the CSS gives it; the settings were only the starting line.", correct: true,
                feedback: "from starts at the settings and ends at the CSS resting look. Watch it happen." },
              { text: "0 - the call says opacity: 0.",
                feedback: "With to it would end at 0. This is from: it STARTS at 0 and comes home to the CSS look - fully visible." },
              { text: "0.5 - halfway.",
                feedback: "0.5 here is the duration - seconds, not opacity. The journey ends wherever CSS rests the element: opacity 1." }
            ],
            applyOnAnswer: { js: 'gsap.from("#name", { opacity: 0, duration: 0.5 })', play: true }
          },
          {
            type: "fill",
            prompt: "The NN bug pops in from nothing. Set the starting size - every chip replays the entrance.",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            code: 'gsap.from("#bug", { scale: {{blank}}, duration: 0.4, ease: "power2.out" })',
            bank: ["0", "1", "-1"],
            answer: "0",
            slot: "js",
            success: "From nothing, home to full size - the 5.2 pop, now one line long.",
            feedback: {
              "1": "Nothing happened: from scale 1 means start at normal size - no journey at all. The pop starts from nothing: 0.",
              "-1": "It flipped inside out on the way in. Scale doesn't go below nothing. 0 is fully shrunk - the 5.2 ready-to-enter size."
            }
          },
          {
            type: "fix",
            prompt: "PLAY should bring the strap IN - but watch: it sits at home, then slides down and vanishes. One word is wrong. Tap it.",
            render: { html: HTML, css: CSS, mode: "video", autoplay: true,
              js: 'function play() { gsap.to("#strap", { y: 40, opacity: 0, duration: 0.5, ease: "power2.out" }) }' },
            tokens: ['gsap.', 'to', '("#strap",', '{ y: 40, opacity: 0,', 'duration: 0.5, ease: "power2.out" })'],
            answer: 1,
            fixedToken: 'from',
            fixedRender: { js: 'function play() { gsap.from("#strap", { y: 40, opacity: 0, duration: 0.5, ease: "power2.out" }) }' },
            success: "Same settings, arrow flipped - now they're the perfect starting point and PLAY brings it in.",
            feedback: {
              3: "The settings are the perfect STARTING point - 40 down, invisible. The bug is the verb: to drove the strap TO that state. Flip the arrow.",
              default: "The settings are the perfect STARTING point. The bug is the verb: to drove the strap TO that state. Flip the arrow."
            }
          },
          {
            type: "predict",
            prompt: "gsap.from(\"#bug\", { scale: 0, duration: 0.4, ease: \"power2.out\" }) runs. Describe the motion.",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            options: [
              { text: "The bug grows from nothing to its normal corner size, landing gently.", correct: true,
                feedback: "Start at the settings, travel home to CSS. There it goes." },
              { text: "The bug shrinks away to nothing.",
                feedback: "That's the to reading again. Run the arrow: START at scale 0, travel to the CSS size." },
              { text: "The bug jumps to double size.",
                feedback: "Nothing here says 2. From 0, home to 1 - the pop you built in 5.2, now one line long." }
            ],
            applyOnAnswer: { js: 'gsap.from("#bug", { scale: 0, duration: 0.4, ease: "power2.out" })', play: true }
          }
        ]
      }
,

      {
        id: "6.5", title: "Full control",
        concept: "gsap.fromTo states both ends - the bulletproof choice when a move must be repeatable no matter what state it starts from.",
        explain: "gsap.fromTo takes the target and then TWO settings lists: the start, then the finish. More typing than from - and worth it: no matter where the graphic is when the call runs, the move begins from the same place every time. Duration and ease ride in the second list - they belong to the journey.",
        exercises: [
          {
            type: "predict",
            prompt: "Hammer PLAY twice, fast: this from entrance stutters - the second run catches the strap mid-flight and starts from a half-on state. The fromTo version (both ends stated) is identical every take. What made it reliable?",
            render: { html: HTML, css: CSS, mode: "video", autoplay: true,
              js: 'function play() { gsap.from("#strap", { y: 40, opacity: 0, duration: 0.5, ease: "power2.out" }) }' },
            options: [
              { text: "It states the start too, so every run begins from the same place.", correct: true,
                feedback: "Answering swaps it in - hammer PLAY as fast as you like now. Identical every time." },
              { text: "It's newer, so it runs faster.",
                feedback: "Same speed, same tool. The difference is the stated start: fromTo never has to guess where to begin." },
              { text: "Pressing PLAY twice is forbidden.",
                feedback: "Tell that to a live director. Replays happen - templates must survive them. That's fromTo's whole job." }
            ],
            applyOnAnswer: { js: 'function play() { gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }) }' }
          },
          {
            type: "predict",
            prompt: "gsap.fromTo(\"#title\", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: \"power2.out\" }) - which braces describe where the title line ENDS?",
            render: { html: HTML, css: CSS, mode: "video", autoplay: true,
              js: 'function play() { gsap.fromTo("#title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }) }' },
            options: [
              { text: "The second list: { y: 0, opacity: 1, ... }.", correct: true,
                feedback: "Read it as its name: from THIS, to THAT. Left to right." },
              { text: "The first list.",
                feedback: "The first list is the starting line - it's the from half. The destination is the second list, where duration and ease ride too." },
              { text: "Neither - CSS decides the end.",
                feedback: "That was from's trick. fromTo takes the wheel completely: both ends written, nothing left to guessing." }
            ]
          },
          {
            type: "build",
            prompt: "Finish the journey - the strap must end at home, fully visible. Each pick runs live; then PLAY & check.",
            render: { html: HTML, css: CSS, mode: "video" },
            template: 'gsap.fromTo("#strap", { y: 40, opacity: 0 }, { y: {{endy}}, opacity: {{endo}}, duration: 0.5, ease: "power2.out" })',
            slot: "js",
            fields: [
              { key: "endy", label: "End y (home)", bank: ["0", "40"], answer: "0" },
              { key: "endo", label: "End opacity (seen)", bank: ["1", "0"], answer: "1" }
            ],
            successFeedback: "Home is y: 0 (the resting spot CSS pinned in Unit 4), seen is opacity: 1 - and this entrance is bulletproof under replay."
          },
          {
            type: "arrange",
            prompt: "Build the bug's bulletproof pop: from nothing, to full size, landing gently.",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            blocks: ['gsap.fromTo("#bug",', '{ scale: 0 },', '{ scale: 1, duration: 0.4, ease: "power2.out" })'],
            slot: "js",
            success: "Start first, finish second - and the pop replays identically forever.",
            feedback: { default: "Run that and the bug SHRINKS AWAY - the pop written backwards. fromTo reads left to right: start first, finish second." }
          },
          {
            type: "predict", kernel: true,
            prompt: "A colleague trims your fromTo down to a plain from - \"less typing, same move.\" When does the difference bite?",
            render: { html: HTML, css: CSS, mode: "video", autoplay: true,
              js: 'function play() { gsap.from("#strap", { y: 40, opacity: 0, duration: 0.5, ease: "power2.out" }) }' },
            options: [
              { text: "The first time PLAY runs while the strap isn't fully off - from starts from whatever is on screen; fromTo always starts from its stated start.", correct: true,
                feedback: "Operators replay graphics at the worst moments. Templates that survive them use fromTo." },
              { text: "Never - they really are the same.",
                feedback: "Hammer PLAY on this from version. Same move on a calm day; only fromTo survives a busy gallery." },
              { text: "fromTo renders sharper pixels.",
                feedback: "The picture is identical. The difference is reliability under replay - a broadcast virtue, not a visual one." }
            ]
          }
        ]
      },

      {
        id: "6.6", title: "The timeline",
        concept: "gsap.timeline() plus chained .to calls: a queue of tweens, run in written order - the whole entrance as one object.",
        explain: "For a sequenced entrance the strap now wraps an inner #panel, and the blue background moves onto that panel - so the whole card slides in as one, then each line fades up inside it. One tween (GSAP's word for a single animation) moves one thing; a whole entrance is several moves in a row. So GSAP gives you a timeline: gsap.timeline() starts the sequence, and each chained .to adds the next move to the queue. Out of the box they run one after another, in the order written.",
        exercises: [
          {
            type: "observe",
            prompt: "Watch the entrance: the panel slides in, then the name fades up, then the title. Replay it with PLAY as often as you like. Tap the line that owns the LAST move.",
            render: { html: PHTML, css: PCSS, mode: "video", autoplay: true, js: TL66 },
            lines: [
              'gsap.timeline()',
              '  .to("#panel", { x: 0, duration: 0.4, ease: "power2.out" })',
              '  .to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" })',
              '  .to("#title", { opacity: 1, duration: 0.3, ease: "power2.out" })'
            ],
            answer: 3,
            highlight: "#title",
            success: "The queue runs top to bottom - the title lands last.",
            feedback: {
              0: "That's the spine - it starts the sequence but moves nothing itself.",
              1: "That's the opener - the first move in the queue. The queue runs top to bottom; the last line is the title's.",
              2: "The name lands second. The queue runs top to bottom; the last line is the title's."
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "Three chained .to calls: panel, name, title. Which tween runs SECOND - and when does it start?",
            render: { html: PHTML, css: PCSS, mode: "video", autoplay: true, js: TL66 },
            options: [
              { text: "The #name tween - it starts when the panel tween finishes.", correct: true,
                feedback: "A timeline is a queue: each .to waits for the one before it." },
              { text: "The #name tween - it starts at the same time as the panel.",
                feedback: "That would be a pile-up, and it's not what you watched. A timeline is a queue: each .to waits for the one before it. (Starting EARLY is real - next lesson - but you have to ask for it.)" },
              { text: "Whichever finishes loading first.",
                feedback: "Nothing races. The order on the page IS the order on air - top to bottom, one at a time." }
            ]
          },
          {
            type: "arrange",
            prompt: "The reference entrance plays on stage: panel in, then name, then title. Build the timeline that matches it.",
            render: { html: PHTML, css: PCSS, mode: "video", autoplay: true, js: TL66 },
            blocks: [
              'gsap.timeline()',
              '.to("#panel", { x: 0, duration: 0.4, ease: "power2.out" })',
              '.to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" })',
              '.to("#title", { opacity: 1, duration: 0.3, ease: "power2.out" })'
            ],
            success: "Spine first, then the queue in played order: panel, name, title.",
            feedback: { default: "The timeline is the spine - it must exist before moves can chain onto it, so it always leads. And on a timeline, written order is played order: watch the reference - the NAME lands before the title." }
          },
          {
            type: "fill",
            prompt: "The title step is missing from the queue. Add it - your pick re-runs the timeline live.",
            render: { html: PHTML, css: PCSS, mode: "video" },
            code: 'gsap.timeline()\n  .to("#panel", { x: 0, duration: 0.4, ease: "power2.out" })\n  .to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" })\n  .to("{{blank}}", { opacity: 1, duration: 0.3, ease: "power2.out" })',
            bank: ["#title", "title", "#name"],
            answer: "#title",
            slot: "js",
            success: "Each element gets its own tween - and the title finally lands.",
            feedback: {
              "title": "The title never appeared: no hash, no id lookup - same rule as every GSAP target: #title.",
              "#name": "The name faded up twice and the title never appeared. The name already has its step, one line up. The missing one is the title's."
            }
          },
          {
            type: "predict",
            prompt: "The panel tween moves only #panel - but the name and title live INSIDE the panel. When the panel slides in, where are they?",
            render: { html: PHTML, css: PCSS, mode: "video", autoplay: true, js: TL66 },
            options: [
              { text: "Riding inside it - children move with their parent - still invisible until their own tweens fade them up.", correct: true,
                feedback: "Boxes inside boxes, from way back in 2.1: children go where the parent goes." },
              { text: "Left behind at the edge of the screen.",
                feedback: "Boxes inside boxes, from way back in 2.1: children go where the parent goes. They arrive aboard the panel, then fade up on cue." },
              { text: "Already visible on the panel.",
                feedback: "Their opacity rests at 0 (the CSS resting-off look) - the ride in is invisible; the fade-up is their own tween." }
            ]
          },
          {
            type: "predict",
            prompt: "Durations: 0.4, then 0.3, then 0.3. How long is the whole entrance?",
            render: { html: PHTML, css: PCSS, mode: "video", autoplay: true, js: TL66 },
            options: [
              { text: "1.0 seconds - a queue adds up.", correct: true,
                feedback: "A full second is polite, verging on PowerPoint. Next lesson we tighten it the broadcast way." },
              { text: "0.4 seconds - they run together.",
                feedback: "Chained tweens queue; they don't stack. Add them: 0.4 + 0.3 + 0.3." },
              { text: "0.3 seconds - the shortest wins.",
                feedback: "No tween is dropped. One after another: a full 1.0s from first pixel to last." }
            ]
          }
        ]
      },

      {
        id: "6.7", title: "Overlap",
        concept: "The position parameter: \"-=0.2\" after the settings starts a tween 0.2s before the previous one finishes - overlap reads as one designed move.",
        explain: "A strict queue is polite - and polite reads as PowerPoint. Pros overlap: write a rider after the settings - \"-=0.2\" means start 0.2 seconds before the previous tween ends. It adjusts the START TIME - it is not a duration.",
        exercises: [
          {
            type: "predict",
            prompt: "The rider \"-=0.2\" was added to the name and title tweens - replay with PLAY and compare against yesterday's polite queue. What did the minus-number change?",
            render: { html: PHTML, css: PCSS, mode: "video", autoplay: true, js: TL67 },
            options: [
              { text: "When each tween STARTS, relative to the one before it.", correct: true,
                feedback: "The tweens keep their length - the rider slides their starts earlier, knitting three moves into one." },
              { text: "How fast each tween plays.",
                feedback: "Each tween keeps its full duration. The rider slides them earlier - start time, not speed." },
              { text: "The order of the tweens.",
                feedback: "Order stayed: panel, name, title. They just stopped waiting for each other's last breath." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "The title tween carries \"-=0.2\". What does it mean?",
            render: { html: PHTML, css: PCSS, mode: "video", autoplay: true, js: TL67 },
            options: [
              { text: "The title starts 0.2 seconds BEFORE the previous tween finishes.", correct: true,
                feedback: "The rider sits outside the braces and does one job: it moves the start time earlier." },
              { text: "The title tween lasts 0.2 seconds.",
                feedback: "Length lives INSIDE the braces, as duration. This rider sits OUTSIDE them and moves the start time earlier. The tween still runs its full 0.3s." },
              { text: "The title waits an extra 0.2 seconds.",
                feedback: "That would be \"+=0.2\" - plus pushes later, minus pulls earlier. Minus is the broadcast one: overlap, not gap." }
            ]
          },
          {
            type: "fill",
            prompt: "Tighten the name tween - start it 0.2s early. Each chip replays the whole entrance.",
            render: { html: PHTML, css: PCSS, mode: "video" },
            code: 'gsap.timeline()\n  .to("#panel", { x: 0, duration: 0.4, ease: "power2.out" })\n  .to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" }, "{{blank}}")\n  .to("#title", { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2")',
            bank: ["-=0.2", "+=0.2", "0.2s"],
            answer: "-=0.2",
            slot: "js",
            success: "Overlapped - the name arrives while the panel is still landing. One designed move.",
            feedback: {
              "+=0.2": "Plus adds a GAP after the panel lands - more PowerPoint, not less. Overlap pulls earlier: minus.",
              "0.2s": "The rider is written like arithmetic on the start time - minus-equals - and GSAP always speaks plain seconds, no units: \"-=0.2\"."
            }
          },
          {
            type: "fix",
            prompt: "Play it: Maria Kranz's name and her title arrive as one blob - the one-two hierarchy is gone. Tap the value that ate the gap.",
            render: { html: PHTML, css: PCSS, mode: "video", autoplay: true, js: TL67BLOB },
            tokens: [
              'gsap.timeline()',
              '.to("#panel", { x: 0, duration: 0.4, ease: "power2.out" })',
              '.to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2")',
              '.to("#title", { opacity: 1, duration: 0.3, ease: "power2.out" },',
              '"-=0.3")'
            ],
            answer: 4,
            fixedToken: '"-=0.1")',
            fixedRender: { js: 'function play() { gsap.to("#panel", { x: -640, duration: 0 }); gsap.to("#name", { opacity: 0, duration: 0 }); gsap.to("#title", { opacity: 0, duration: 0 }); gsap.timeline().to("#panel", { x: 0, duration: 0.4, ease: "power2.out" }).to("#name", { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2").to("#title", { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.1") }' },
            success: "The name lands, THEN the title - hierarchy restored. (-=0.2 would read fine too; -=0.4 would flip the order and the title would lead.)",
            feedback: {
              2: "The name-over-panel overlap reads fine. The blob is the TITLE starting with zero gap on the name - its rider ate the whole 0.3s tween.",
              default: "Those parts are right. The blob comes from a rider - the title's start time was pulled so early it lands WITH the name."
            }
          },
          {
            type: "predict",
            prompt: "A headlines panel - three stacked lines, one call: gsap.from(\".headline\", { y: 20, opacity: 0, duration: 0.3, ease: \"power2.out\", stagger: 0.1 }). What does stagger: 0.1 do?",
            render: {
              html: '<div id="strap"><div class="headline line">HIFK 3 - 2 TPS</div><div class="headline line">STORM WARNING FOR THE WEEKEND</div><div class="headline line">ELECTION DEBATE TONIGHT 21:00</div></div>',
              css: '#strap { position: absolute; left: 120px; top: 760px; background-color: #0a3d91; padding: 22px 34px; } .line { color: #ffffff; font-size: 36px; font-weight: 700; font-family: Arial, sans-serif; }',
              js: 'function play() { gsap.from(".headline", { y: 20, opacity: 0, duration: 0.3, ease: "power2.out", stagger: 0.1 }) }',
              mode: "video", autoplay: true },
            options: [
              { text: "Each headline starts 0.1s after the one before - built-in one-after-another for the whole family.", correct: true,
                feedback: "The class selector grabs all three (2.4's family label); stagger spaces their starts. You'll read this in pro templates constantly - recognizing it is enough for now." },
              { text: "All three wait 0.1s, then move together.",
                feedback: "That would be delay. Stagger SPACES THE FAMILY OUT: first at 0, second at 0.1, third at 0.2." },
              { text: "Each tween lasts 0.1s.",
                feedback: "Length is duration: 0.3, right there in the settings. Stagger only staggers the starts." }
            ]
          }
        ]
      },

      {
        id: "6.8", title: "Review remix",
        concept: "Nothing new: read, tune, and fix a stranger's GSAP - the unit's promise, rehearsed literally.",
        explain: "This entrance was written by someone who left the channel. Nothing new to learn - read it, tune it, fix it. This is the job.",
        exercises: [
          {
            type: "predict",
            prompt: "The inherited block: three chained fromTo tweens - panel (0.5s), name (0.25s, \"-=0.2\"), title (0.25s, \"-=0.1\"). Before you run it: in what order do they start, and do any overlap?",
            render: { html: PHTML, css: PCSS, mode: "video", autoplay: true, js: TL68 },
            options: [
              { text: "Panel, name, title - the name starts 0.2s before the panel lands, the title 0.1s before the name lands.", correct: true,
                feedback: "Written order is played order; the riders pull each start earlier. Now watch it - one line FEELS wrong. Next question." },
              { text: "All three at once - fromTo tweens always run together.",
                feedback: "The verb doesn't change the queue: chained tweens still run in written order. The riders overlap them - they don't stack them." },
              { text: "Panel, name, title - strictly one after another, no overlap.",
                feedback: "Look at the riders: \"-=0.2\" and \"-=0.1\" pull the starts earlier. Overlap, not queue." }
            ]
          },
          {
            type: "fix", kernel: true,
            prompt: "One tween's ease is wrong-direction. Play it, feel it, tap it.",
            render: { html: PHTML, css: PCSS, mode: "video", autoplay: true, js: TL68 },
            tokens: [
              '.fromTo("#panel", { x: -640, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" })',
              '.fromTo("#name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.2")',
              '.fromTo("#title", { y: 20, opacity: 0 },', '{ y: 0, opacity: 1, duration: 0.25,', 'ease: "power2.in" }, "-=0.1")'
            ],
            answer: 4,
            fixedToken: 'ease: "power2.out" }, "-=0.1")',
            fixedRender: { js: TL68FIX },
            success: "An accelerating curve on an ENTRANCE - the title was slamming into place. Entrances ease out; the name is the curve, not the direction.",
            feedback: {
              0: "The panel lands gently - a decelerating arrival. One line slams into place instead. Watch the title.",
              1: "The name lands gently - a decelerating arrival. One line slams into place instead. Watch the title.",
              default: "Those parts are fine. Feel the last moments of the entrance: which line SLAMS into place?"
            }
          },
          {
            type: "fill",
            prompt: "The producer wants the panel's entrance 20% faster. 20% off 0.5 is... (each chip replays the block)",
            render: { html: PHTML, css: PCSS, mode: "video" },
            code: 'gsap.timeline()\n  .fromTo("#panel", { x: -640, opacity: 0 }, { x: 0, opacity: 1, duration: {{blank}}, ease: "power2.out" })\n  .fromTo("#name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.2")\n  .fromTo("#title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.1")',
            bank: ["0.4", "0.3", "0.45"],
            answer: "0.4",
            slot: "js",
            success: "0.5 minus 20% (0.1) = 0.4. Crisper, hierarchy intact.",
            feedback: {
              "0.3": "That's 40% faster - the producer asked for 20%. 20% of 0.5 is 0.1.",
              "0.45": "That's 10% off. 20% of 0.5 is 0.1 - take the panel to 0.4."
            }
          },
          {
            type: "type",
            prompt: "The NN bug still pops in with old CSS. Rewrite it as one from-tween: from nothing, 0.4 seconds, landing gently. (One space after each comma and colon.)",
            render: { html: HTMLB, css: BUGCSS, mode: "video" },
            code: '{{blank}}',
            slot: "js",
            placeholder: 'gsap.from("#bug", { ... })',
            answer: [
              'gsap.from("#bug", { scale: 0, duration: 0.4, ease: "power2.out" })',
              'gsap.from("#bug", { scale: 0, ease: "power2.out", duration: 0.4 })',
              'gsap.from("#bug", { duration: 0.4, scale: 0, ease: "power2.out" })',
              'gsap.from("#bug", { duration: 0.4, ease: "power2.out", scale: 0 })',
              'gsap.from("#bug", { ease: "power2.out", scale: 0, duration: 0.4 })',
              'gsap.from("#bug", { ease: "power2.out", duration: 0.4, scale: 0 })',
              'gsap.from("#bug", { scale: 0, duration: 0.4, ease: "power2.out" });',
              'gsap.from("#bug", { scale: 0, ease: "power2.out", duration: 0.4 });'
            ],
            success: "One line, and the pop plays - from nothing, home to full size, gentle landing.",
            feedback: { default: "Pattern: gsap.from(\"#bug\", { scale: 0, duration: 0.4, ease: \"power2.out\" }) - the verb is from (start stated, CSS home is the finish), the start is scale: 0, the landing curve is power2.out." }
          },
          {
            type: "fix",
            prompt: "A fresh line pasted below the block fails LOUDLY - read the red overlay's hint, then tap the break.",
            render: { html: HTML, css: CSS, mode: "video",
              js: 'gsap.to("#strap", { y: 0 opacity: 1, duration: 0.3 })' },
            tokens: ['gsap.to("#strap",', '{ y: 0', 'opacity: 1,', 'duration: 0.3 })'],
            answer: 1,
            fixedToken: '{ y: 0,',
            fixedRender: { js: 'gsap.to("#strap", { y: 40, opacity: 0, duration: 0 }); gsap.to("#strap", { y: 0, opacity: 1, duration: 0.3 })' },
            success: "The missing comma between pairs - found from the overlay alone. Loud errors are the friendly kind.",
            feedback: { default: "The overlay points inside the settings list: every pair needs a comma before the next one. Which pair has lost its comma?" }
          },
          {
            type: "predict",
            prompt: "PLAY gets hammered twice mid-entrance (try it). Does this block stutter or hold?",
            render: { html: PHTML, css: PCSS, mode: "video", autoplay: true, js: TL68FIX },
            options: [
              { text: "It holds - every tween is a fromTo, so each starts from its stated start.", correct: true,
                feedback: "Check the verbs: the stranger used fromTo throughout. That choice is WHY the block is shelf-worthy." },
              { text: "It stutters - replays always break timelines.",
                feedback: "Hammer PLAY and watch: identical every take. Check the verbs - fromTo throughout, both ends stated. That's why it holds." },
              { text: "It refuses the second press.",
                feedback: "Nothing is refused - the second press simply restarts every tween from its stated start. fromTo throughout is what makes that safe." }
            ]
          }
        ]
      },

      {
        id: "cp6", title: "Checkpoint: The GSAP strap",
        concept: "The Checkpoint 5 motion spec, implemented the industry way: two timelines, fromTo repeatability, overlaps, correct eases.",
        explain: "The design department's spec card: In - panel up 40px + fade, 0.5s, decelerating; name and title follow, 0.4s each, overlapping by 0.2s. Out - whole strap down 40px + fade, 0.3s, accelerating. Must survive a double-PLAY. PLAY runs the IN box, STOP the OUT box - trust the wiring, Unit 7 opens it.",
        isCheckpoint: true,
        exercises: [
          {
            type: "build",
            prompt: "Build the ON PLAY timeline: pick the correct line for each step. Every pick runs live - check it against the spec card.",
            render: { html: PHTML, css: PCSS, mode: "video" },
            card: { "In": "panel slides up 40px + fades in, 0.5s, decelerating", "Lines": "name then title, 0.4s each, each overlapping by 0.2s", "Rule": "must survive a double-PLAY" },
            template: 'gsap.timeline()\n  {{p}}\n  {{n}}\n  {{t}}',
            slot: "js",
            fields: [
              { key: "p", label: "Panel tween (the opener)", bank: [
                '.fromTo("#panel", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })',
                '.to("#panel", { y: 40, opacity: 0, duration: 0.5, ease: "power2.out" })'
              ], answer: '.fromTo("#panel", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })' },
              { key: "n", label: "Name tween (second, overlapped)", bank: [
                '.fromTo("#name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")',
                '.fromTo("#name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "+=0.2")'
              ], answer: '.fromTo("#name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")' },
              { key: "t", label: "Title tween (last, overlapped)", bank: [
                '.fromTo("#title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")',
                '.fromTo("#title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.in" }, "-=0.2")'
              ], answer: '.fromTo("#title", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")' }
            ],
            successFeedback: "Three fromTo tweens, spec durations, entrance easing, both overlaps - the in-timeline is broadcast-ready."
          },
          {
            type: "build",
            prompt: "Build the ON STOP timeline. The spec: whole strap fades and slides down 40px, 0.3s, accelerating.",
            render: { html: PHTML, css: PCSS_ON, mode: "video" },
            card: { "Out": "whole strap down 40px + fade, 0.3s, accelerating" },
            template: 'gsap.timeline()\n  {{out}}',
            slot: "js",
            fields: [
              { key: "out", label: "The out tween", bank: [
                '.to("#strap", { y: 40, opacity: 0, duration: 0.3, ease: "power2.in" })',
                '.to("#strap", { y: 40, opacity: 0, duration: 0.9, ease: "power2.out" })',
                '.fromTo("#strap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power2.in" })'
              ], answer: '.to("#strap", { y: 40, opacity: 0, duration: 0.3, ease: "power2.in" })' }
            ],
            successFeedback: "One tween on the parent takes the whole strap out - children ride, 2.1's oldest lesson doing broadcast work. Shorter than the in, exit easing: approved."
          },
          {
            type: "predict", kernel: true,
            prompt: "Press PLAY, then double-tap PLAY mid-entrance. The replay is identical - no stutter. Why?",
            render: { html: PHTML, css: PCSS_ON, mode: "video", autoplay: true, js: CP6JS },
            options: [
              { text: "Every in-tween is a fromTo - each run starts from its stated start, wherever the strap was.", correct: true,
                feedback: "The spec's last line - must survive a double-PLAY - is exactly what fromTo buys." },
              { text: "Luck - the timing happened to line up.",
                feedback: "Hammer it again. Never stutters: every in-tween states both ends, so no run ever has to guess its start." },
              { text: "Timelines block replays automatically.",
                feedback: "Nothing is blocked - the second press restarts the timeline. It looks identical because fromTo states every start." }
            ]
          },
          {
            type: "predict",
            prompt: "The taste approval, re-asked from Checkpoint 5: press PLAY, then STOP. Does your out feel faster than your in - and should it?",
            render: { html: PHTML, css: PCSS_ON, mode: "video", autoplay: true, js: CP6JS },
            options: [
              { text: "Yes - 0.3s out against a longer, overlapped in. Exits accelerate away; entrances get the ceremony.", correct: true,
                feedback: "Spec met, taste approved. Next unit, PLAY and STOP stop being magic: you'll write the functions they call." },
              { text: "No - in and out should mirror each other exactly.",
                feedback: "Symmetry reads sluggish on air. The 5.5 rule survived into GSAP: outs run shorter and ease IN." },
              { text: "The out should be slower, to feel graceful.",
                feedback: "A slow out overstays its welcome - the director said lose it. Outs run FASTER than ins." }
            ]
          }
        ]
      }
    ]
  });
})();
