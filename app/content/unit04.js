// Unit 4 - On the Canvas. Source of truth: lessons/unit-04.md
// Schema per app/SCHEMA.md. Positioning unit: renders carry their own css (house off).
// Branding from Units 3 rides as hidden support inside render.html's <style> tag so
// slot:"css" exercises can replace the css layer; student-facing code introduces each
// position property only from its own lesson (absolute+top/left 4.2, right/bottom 4.3,
// margin 4.4, z-index 4.6, opacity 4.7).
// The plan's draggable-marker exercises (4.1 ex1/ex5, 4.5 ex3) are encoded as their
// nearest predict/fill equivalents - no draggable type exists in the schema.
// The nn-logo.png bug is rendered as a styled "NN" chip (no bundled image assets).
window.COURSE_DATA = window.COURSE_DATA || [];
(function () {

  // --- stage support (never student-facing) ---
  var MARKER_STYLE = "<style>.marker{position:absolute;width:26px;height:26px;border-radius:50%;background:#e8b90c;border:4px solid #ffffff;transform:translate(-50%,-50%);}</style>";
  var STRAP_HTML = "<style>#strap{background-color:#0a3d91;padding:22px 34px;}#strap div{color:#ffffff;font-size:52px;font-weight:700;font-family:Arial,sans-serif;}#title{font-size:34px;font-weight:400;color:#dbe4f5;}</style><div id=\"strap\"><div id=\"name\" class=\"line\">Maria Kranz</div><div id=\"title\" class=\"line\">News Anchor</div></div>";
  var BUG_HTML = "<style>#bug{background-color:#ffffff;color:#0a3d91;font-family:Arial,sans-serif;font-weight:700;font-size:40px;padding:10px 20px;}</style><div id=\"bug\">NN</div>";
  var BUG_WIDE_HTML = "<style>#bug{background-color:#ffffff;color:#0a3d91;font-family:Arial,sans-serif;font-weight:700;font-size:40px;padding:10px 20px;}</style><div id=\"bug\">NN ELECTION</div>";
  var TICKER_HTML = "<style>#ticker{background-color:#08265c;color:#ffffff;font-family:Arial,sans-serif;font-size:34px;padding:14px 28px;width:1920px;box-sizing:border-box;}</style><div id=\"ticker\">STORM WARNING FOR THE SOUTH COAST +++ HIFK 3 - 2 TPS +++</div>";
  var CROP_FRAME = "<div style=\"position:absolute;left:0;top:0;width:1920px;height:1080px;border:70px solid #000000;box-sizing:border-box;\"></div>";

  COURSE_DATA.push({
    id: 4,
    title: "On the Canvas",
    promise: "Put a bug in the corner and a lower third in the lower third.",
    lessons: [

      {
        id: "4.1", title: "The grid you can trust",
        concept: "The canvas is always exactly 1920x1080; a position is two pixel numbers counted from the top-left corner, and y grows downward.",
        explain: "Every graphic lives on the same frame: 1920 pixels wide, 1080 tall - always. A position is just two numbers counted from the top-left corner: x across, y down. y grows downward, like reading.",
        exercises: [
          {
            type: "predict",
            prompt: "The grid overlay is on - crosshairs and an (x, y) readout, yours for the rest of the course. The marker's readout says (960, 540). Which point of the frame is it sitting on?",
            render: { html: MARKER_STYLE + "<div class=\"marker\" style=\"left:960px;top:540px;\"></div>", css: "", house: false, mode: "video", autoplay: true, overlay: "grid" },
            options: [
              { text: "The exact center - half of 1920 across, half of 1080 down.", correct: true,
                feedback: "Half the width, half the height. The readout always shows (x, y), counted from the top-left corner." },
              { text: "The top-left corner.",
                feedback: "The top-left is (0, 0) - the corner we count FROM. (960, 540) is half the frame away in both directions: the center." },
              { text: "The bottom-right corner.",
                feedback: "The far corner is the FULL frame away: (1920, 1080). (960, 540) is only halfway - the center." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "y grows downward. A marker at y: 100 - is it near the top of the frame or near the bottom?",
            render: { html: MARKER_STYLE, css: "", house: false, mode: "video", autoplay: true, overlay: "grid" },
            options: [
              { text: "Near the top.", correct: true,
                feedback: "y counts DOWN from the top edge, like reading - y: 100 is 100 pixels below the top. There's the marker." },
              { text: "Near the bottom.",
                feedback: "That's the math-class habit - graphs grow upward. Screens count DOWN from the top edge: y: 100 is 100 pixels below the top." },
              { text: "Exactly in the middle.",
                feedback: "The middle is y: 540 - half of 1080. y: 100 is barely a tenth of the way down: near the top." }
            ],
            applyOnAnswer: { html: MARKER_STYLE + "<div class=\"marker\" style=\"left:960px;top:100px;\"></div>", play: true }
          },
          {
            type: "fill",
            prompt: "The top-left corner is (0, 0). The bottom-right corner is ( ____ , 1080 ). Fill the x.",
            code: "( {{blank}} , 1080 )",
            bank: ["1920", "960", "0", "1080"],
            answer: "1920",
            feedback: {
              "0": "That's the top-left - the corner we count FROM. The far corner is the full frame away: all of the width.",
              "960": "That's the center's x - halfway there. The corner is the whole 1920 across.",
              "1080": "That's the frame's HEIGHT - the y number, already filled in. x comes first, and the frame is wider than it is tall: 1920 across."
            }
          },
          {
            type: "predict",
            prompt: "Maria Kranz's strap sits at (120, 860). Alexandra Rivera's weather badge sits at (120, 200). Which one is closer to the top of the frame?",
            render: { html: MARKER_STYLE + "<div class=\"marker\" style=\"left:120px;top:860px;\"></div><div class=\"marker\" style=\"left:120px;top:200px;\"></div>", css: "", house: false, mode: "video", autoplay: true, overlay: "grid" },
            options: [
              { text: "The weather badge.", correct: true,
                feedback: "Smaller y = higher up. Both share x: 120, so they sit in the same column." },
              { text: "The strap.",
                feedback: "860 is the BIGGER y - and bigger y means further DOWN. The strap is near the bottom, where lower thirds live." },
              { text: "They're at the same height.",
                feedback: "Same x, yes - but height is y's job, and 200 and 860 are very different heights." }
            ]
          },
          {
            type: "predict",
            prompt: "The director wants a marker 40 pixels in from the RIGHT edge, vertically centered - the readout should say ( ? , 540). What's the x?",
            render: { html: MARKER_STYLE, css: "", house: false, mode: "video", autoplay: true, overlay: "grid" },
            options: [
              { text: "1880", correct: true,
                feedback: "The right edge sits at x: 1920, so 40 in from it is 1920 - 40 = 1880. Counting backwards from the right is clumsy - lesson 4.3 gives you a better way." },
              { text: "40",
                feedback: "That's 40 from the LEFT edge - the wrong side of the frame. The right edge sits at x: 1920, so count back from there." },
              { text: "1480",
                feedback: "That's 440 in from the right. 40 in from the right edge is 1920 - 40 = 1880." }
            ],
            applyOnAnswer: { html: MARKER_STYLE + "<div class=\"marker\" style=\"left:1880px;top:540px;\"></div>", play: true }
          }
        ]
      },

      {
        id: "4.2", title: "Pin it down",
        concept: "position: absolute plus top/left pins an element to exact coordinates - the broadcast way to place things.",
        explain: "Three lines pin an element to the frame: position: absolute; says 'place me by numbers', then top and left ARE the numbers - counted from the top-left corner, exactly like the grid overlay reads them.",
        exercises: [
          {
            type: "predict",
            prompt: "The position: absolute; line is switched OFF - and look: the strap sits at the top of the flow, wherever the browser drops it. top: 860px; left: 120px; are still written in the rule. What are they doing?",
            render: { html: STRAP_HTML, css: "#strap {\n  top: 860px;\n  left: 120px;\n}", house: false, mode: "video", autoplay: true, overlay: "grid" },
            options: [
              { text: "Nothing - they are ignored until position: absolute switches on place-by-numbers.", correct: true,
                feedback: "Switch it back on and the strap snaps to (120, 860). No position: absolute, no obedience." },
              { text: "Moving the strap a little.",
                feedback: "Watch again: the strap sits exactly where the flow drops it. The numbers change nothing until position: absolute is on." },
              { text: "They're saved for later.",
                feedback: "Not saved - actively ignored. The browser reads them and shrugs: this element isn't positioned by numbers." }
            ],
            applyOnAnswer: { css: "#strap {\n  position: absolute;\n  top: 860px;\n  left: 120px;\n}", play: true }
          },
          {
            type: "fill",
            prompt: "The grid overlay's crosshairs sit on the strap's target corner, reading (120, 860). Pin the strap there - fill the y.",
            code: "#strap {\n  position: absolute;\n  top: {{blank}}px;\n  left: 120px;\n}",
            bank: ["860", "120", "540", "1920"],
            answer: "860",
            slot: "css",
            render: { html: STRAP_HTML, css: "", house: false, mode: "video", autoplay: true, overlay: "grid" },
            feedback: {
              "120": "Swapped: top is the y number (down from the top), left is the x number (in from the left). Check the strap against the crosshair readout.",
              "540": "That's the center's y - the readout on the target says 860.",
              "1920": "1920 is the frame's full WIDTH - an x number, and off the y scale anyway. The readout says 860 down."
            }
          },
          {
            type: "fill", kernel: true,
            prompt: "The coordinates are written, but the strap is stuck at the top of the flow, ignoring them. One line is missing - pick it.",
            code: "#strap {\n  {{blank}}\n  top: 860px;\n  left: 120px;\n}",
            bank: ["position: absolute;", "padding: 860px;", "color: #0a3d91;"],
            answer: "position: absolute;",
            slot: "css",
            render: { html: STRAP_HTML, css: "#strap {\n  top: 860px;\n  left: 120px;\n}", house: false, mode: "video", autoplay: true, overlay: "grid" },
            feedback: {
              "padding: 860px;": "Padding grows space INSIDE the box (3.8) - look at the balloon. It never pins anything.",
              "color: #0a3d91;": "That paints the text - and the strap still ignores its numbers. Position isn't about paint."
            }
          },
          {
            type: "predict",
            prompt: "We change top: 860px to top: 200px. Where does the strap go?",
            render: { html: STRAP_HTML, css: "#strap {\n  position: absolute;\n  top: 860px;\n  left: 120px;\n}", house: false, mode: "video", autoplay: true, overlay: "grid" },
            options: [
              { text: "Near the top of the frame.", correct: true,
                feedback: "y grows downward - a smaller top means higher up. There it goes." },
              { text: "Near the bottom.",
                feedback: "y grows downward, like reading - a SMALLER top means higher up." },
              { text: "200px to the left.",
                feedback: "top moves along y only - up and down. Left-and-right is left's job." }
            ],
            applyOnAnswer: { css: "#strap {\n  position: absolute;\n  top: 200px;\n  left: 120px;\n}", play: true }
          },
          {
            type: "type",
            prompt: "Alexandra Rivera's weather strap, id=\"weather\", needs pinning at (120, 200). Write the whole rule.",
            answer: [
              "#weather { position: absolute; top: 200px; left: 120px; }",
              "#weather { position: absolute; left: 120px; top: 200px; }",
              "#weather { top: 200px; left: 120px; position: absolute; }",
              "#weather { top: 200px; position: absolute; left: 120px; }",
              "#weather { left: 120px; top: 200px; position: absolute; }",
              "#weather { left: 120px; position: absolute; top: 200px; }"
            ],
            placeholder: "#weather { ... }",
            slot: "css",
            render: { html: "<style>#weather{background-color:#0a3d91;padding:16px 26px;}#weather div{color:#ffffff;font-size:44px;font-weight:700;font-family:Arial,sans-serif;}#wtitle{font-size:30px;font-weight:400;color:#dbe4f5;}</style><div id=\"weather\"><div>Alexandra Rivera</div><div id=\"wtitle\">Weather</div></div>", css: "", house: false, mode: "video", autoplay: true, overlay: "grid" },
            feedback: {
              default: "Three lines: position: absolute; switches on place-by-numbers, then top: 200px; (the y) and left: 120px; (the x). And the markup says id=\"weather\" - hash = one of a kind, so the rule starts #weather."
            }
          }
        ]
      },

      {
        id: "4.3", title: "The other corners",
        concept: "right and bottom measure from the other edges - pin an element to the edge it belongs to.",
        explain: "right: 40px means 40 pixels in from the RIGHT edge; bottom counts up from the bottom. Pin to whichever edge the element belongs to - a corner bug belongs to the right edge, so count from it.",
        exercises: [
          {
            type: "predict",
            prompt: "The bug sits at right: 40px. We increase it to right: 200px. Which way does the bug slide?",
            render: { html: BUG_HTML, css: "#bug {\n  position: absolute;\n  top: 40px;\n  right: 40px;\n}", house: false, mode: "video", autoplay: true, overlay: "grid" },
            options: [
              { text: "Left - further in from the right edge.", correct: true,
                feedback: "right measures the gap to the right edge - grow the gap and the bug walks toward the middle." },
              { text: "Right, toward the edge.",
                feedback: "That would need a SMALLER number - right: 0 puts it at the edge itself. A bigger right pushes it further from that edge, toward the middle." },
              { text: "Down.",
                feedback: "right moves along x only. Up-and-down belongs to top and bottom." }
            ],
            applyOnAnswer: { css: "#bug {\n  position: absolute;\n  top: 40px;\n  right: 200px;\n}", play: true }
          },
          {
            type: "fill",
            prompt: "Pin the bug 40 in from the RIGHT edge (top clearance is already set).",
            code: "#bug {\n  position: absolute;\n  top: 40px;\n  {{blank}}: 40px;\n}",
            bank: ["right", "left", "bottom"],
            answer: "right",
            slot: "css",
            render: { html: BUG_HTML, css: "#bug {\n  position: absolute;\n  top: 40px;\n}", house: false, mode: "video", autoplay: true, overlay: "grid" },
            feedback: {
              "left": "left: 40px counts from the LEFT edge - the bug crossed the whole frame. The right edge needs right.",
              "bottom": "bottom counts up from the BOTTOM edge - and with top already pinned, the poor bug got stretched between the two. 40 in from the right needs right."
            }
          },
          {
            type: "fix", kernel: true,
            prompt: "The regular logo is 100px wide, so left: 1780px happened to leave 40px of clearance. Tonight the bug swaps to the wider election logo - and it bleeds off the right edge. Fix the rule so ANY logo keeps 40px of clearance from the right edge.",
            render: { html: BUG_WIDE_HTML, css: "#bug {\n  position: absolute;\n  top: 40px;\n  left: 1780px;\n}", house: false, mode: "video", autoplay: true, overlay: "grid" },
            tokens: ["#bug {", "  position: absolute;", "  top: 40px;", "  left: 1780px;", "}"],
            answer: 3,
            fixedToken: "  right: 40px;",
            fixedRender: { css: "#bug {\n  position: absolute;\n  top: 40px;\n  right: 40px;\n}", play: true },
            feedback: {
              2: "The top clearance is fine - the bleed is along x, the left/right axis.",
              default: "Count from the edge the bug belongs to and the clearance survives any logo. A recalculated left (like left: 1620px) works for THIS logo - and breaks again the next time the file changes."
            }
          },
          {
            type: "predict",
            prompt: "A colleague writes BOTH left: 120px and right: 40px on the strap, 'to be safe'. What happens?",
            render: { html: STRAP_HTML, css: "#strap {\n  position: absolute;\n  top: 860px;\n  left: 120px;\n}", house: false, mode: "video", autoplay: true },
            options: [
              { text: "The strap is forced to stretch between both anchors - it smears across almost the whole frame.", correct: true,
                feedback: "There's the smear. Pick the ONE edge the element belongs to and pin only that. (One graphic stretches on purpose - you'll meet it in 4.6.)" },
              { text: "The browser picks one and ignores the other.",
                feedback: "It obeys BOTH - and the only way to obey two anchors is to stretch between them. See the smear." },
              { text: "Nothing - more instructions is safer.",
                feedback: "Watch the render: the strap now spans from x: 120 to 40-from-the-right. Pick the ONE edge the element belongs to and pin only that." }
            ],
            applyOnAnswer: { css: "#strap {\n  position: absolute;\n  top: 860px;\n  left: 120px;\n  right: 40px;\n}", play: true }
          },
          {
            type: "fill",
            prompt: "The sports ticker runs along the very bottom of the frame. Pin it.",
            code: "#ticker {\n  position: absolute;\n  left: 0px;\n  {{blank}}: 0px;\n}",
            bank: ["bottom", "top", "right"],
            answer: "bottom",
            slot: "css",
            render: { html: TICKER_HTML, css: "#ticker {\n  position: absolute;\n  left: 0px;\n}", house: false, mode: "video", autoplay: true },
            feedback: {
              "top": "top: 0 pins to the TOP edge - the ticker is running across the sky. The bottom edge needs bottom.",
              "right": "right slides it along x - it can't put the ticker at the bottom. Which edge does a ticker belong to?"
            }
          }
        ]
      },

      {
        id: "4.4", title: "Space between",
        concept: "margin - space OUTSIDE a box, pushing neighbors away; padding stays inside.",
        explain: "Padding is space inside a box - between its edge and its content. Margin is space outside - it pushes the neighbors away. A gap between two lines is margin's job.",
        exercises: [
          {
            type: "predict",
            prompt: "Two bands of space in this strap: the gap between the blue panel's edge and the name (inside), and the gap between the name line and the gold title bar (between). Which one is the MARGIN?",
            render: { html: "<style>#strap{position:absolute;left:120px;top:840px;}#strap div{font-family:Arial,sans-serif;}#name{color:#ffffff;font-size:48px;font-weight:700;}#title{font-size:30px;font-weight:700;color:#08265c;}</style><div id=\"strap\"><div id=\"name\">Maria Kranz</div><div id=\"title\">News Anchor</div></div>", css: "#strap {\n  background-color: #0a3d91;\n  padding: 20px;\n}\n#title {\n  background-color: #e8b90c;\n  margin-top: 10px;\n}", house: false, mode: "video", autoplay: true },
            options: [
              { text: "The gap between the name line and the gold bar.", correct: true,
                feedback: "Space BETWEEN boxes is margin - it pushes the title bar away from the name. The band inside the panel's edge is padding." },
              { text: "The gap inside the panel's edge.",
                feedback: "The band inside the panel's edge is padding - inside space. The striped gap between the lines is margin, pushing the title bar away from the name." },
              { text: "Both.",
                feedback: "Two different properties: inside the edge is padding, between neighbors is margin." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "We want a BIGGER gap between the name line and the gold title bar - padding or margin?",
            render: { html: "<style>#strap{position:absolute;left:120px;top:840px;}#strap div{font-family:Arial,sans-serif;}#name{color:#ffffff;font-size:48px;font-weight:700;}#title{font-size:30px;font-weight:700;color:#08265c;}</style><div id=\"strap\"><div id=\"name\">Maria Kranz</div><div id=\"title\">News Anchor</div></div>", css: "#strap {\n  background-color: #0a3d91;\n  padding: 20px;\n}\n#title {\n  background-color: #e8b90c;\n  margin-top: 10px;\n}", house: false, mode: "video", autoplay: true },
            options: [
              { text: "Margin.", correct: true,
                feedback: "Space BETWEEN boxes is margin - it pushes the neighbor away. Watch the gap open." },
              { text: "Padding.",
                feedback: "Padding would grow the title's own box - the gold swells, its text floats in extra gold, and the gap barely changes. The space between boxes is margin." }
            ],
            applyOnAnswer: { css: "#strap {\n  background-color: #0a3d91;\n  padding: 20px;\n}\n#title {\n  background-color: #e8b90c;\n  margin-top: 30px;\n}", play: true }
          },
          {
            type: "fix",
            prompt: "The designer wanted a gap ABOVE the gold bar, but the bar grew instead - tall, with the text sitting low inside it. Tap the property to change.",
            render: { html: "<style>#strap{position:absolute;left:120px;top:840px;}#strap div{font-family:Arial,sans-serif;}#name{color:#ffffff;font-size:48px;font-weight:700;}#title{font-size:30px;font-weight:700;color:#08265c;}</style><div id=\"strap\"><div id=\"name\">Maria Kranz</div><div id=\"title\">News Anchor</div></div>", css: "#strap {\n  background-color: #0a3d91;\n  padding: 20px;\n}\n#title {\n  background-color: #e8b90c;\n  padding-top: 30px;\n}", house: false, mode: "video", autoplay: true },
            tokens: ["#title {", "  background-color: #e8b90c;", "  padding-top: 30px;", "}"],
            answer: 2,
            fixedToken: "  margin-top: 30px;",
            fixedRender: { css: "#strap {\n  background-color: #0a3d91;\n  padding: 20px;\n}\n#title {\n  background-color: #e8b90c;\n  margin-top: 30px;\n}", play: true },
            feedback: {
              1: "The gold is the design - the problem is where the extra 30px went: INSIDE the bar.",
              default: "The extra 30px went INSIDE the bar - padding. A gap above the bar is outside space: margin-top."
            }
          },
          {
            type: "predict",
            prompt: "What does margin: 10px (no side named) do to the title bar?",
            options: [
              { text: "Pushes its neighbors away on all four sides.", correct: true,
                feedback: "Bare margin works all the way around - same pattern as padding. One side needs a name: margin-top." },
              { text: "Only above it.",
                feedback: "One side needs a name: margin-top. The bare margin works all the way around - same pattern as padding." },
              { text: "Adds space inside the bar.",
                feedback: "Inside space is padding. Margin always works OUTSIDE the box's edge." }
            ]
          },
          {
            type: "fill",
            prompt: "Open a 12px gap above the title bar.",
            code: "#title { {{blank}}: 12px; }",
            bank: ["margin-top", "padding-top", "top"],
            answer: "margin-top",
            slot: "css",
            render: { html: "<style>#strap{position:absolute;left:120px;top:840px;background-color:#0a3d91;padding:20px;}#strap div{font-family:Arial,sans-serif;}#name{color:#ffffff;font-size:48px;font-weight:700;}#title{font-size:30px;font-weight:700;color:#08265c;background-color:#e8b90c;}</style><div id=\"strap\"><div id=\"name\">Maria Kranz</div><div id=\"title\">News Anchor</div></div>", css: "", house: false, mode: "video", autoplay: true },
            feedback: {
              "padding-top": "The bar swelled instead of moving - padding is inside space. Outside space: margin.",
              "top": "Coordinates again - and without position: absolute it's silently ignored (4.2). The gap between siblings is margin's job."
            }
          }
        ]
      },

      {
        id: "4.5", title: "Safe areas",
        concept: "Title-safe margins - nothing important lives at the very edge of the frame; standard homes for the strap and the bug.",
        explain: "Some TVs and stream players crop the edge of the picture. Everything important stays inside the title-safe area - the inner rectangle 96px in from the sides and 54px from the top and bottom. The strap and the bug have standard homes just inside it.",
        exercises: [
          {
            type: "predict",
            prompt: "The safe-area overlay joins the grid - the inner rectangle is title-safe, yours for the rest of the course. Where do lower thirds live?",
            render: { html: STRAP_HTML, css: "#strap {\n  position: absolute;\n  top: 860px;\n  left: 120px;\n}", house: false, mode: "video", autoplay: true, overlay: "safe" },
            options: [
              { text: "The lower band, just INSIDE the title-safe rectangle.", correct: true,
                feedback: "The lower third's own name says where it lives - and 'inside the line' keeps it on every screen." },
              { text: "The sliver below the safe line, closer to the edge.",
                feedback: "That sliver can be cropped off on some screens - the strap's home is INSIDE the line." },
              { text: "Dead center.",
                feedback: "Center stage is for full-screens and big moments. The lower third's own name says where it lives (0.1): the lower band, inside the line." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "A headline is placed at left: 8px. What's the risk?",
            render: { html: "<style>#headline{background-color:#0a3d91;color:#ffffff;font-family:Arial,sans-serif;font-size:44px;padding:14px 24px;}</style><div id=\"headline\">BREAKING: HARBOUR DEAL SIGNED</div>", css: "#headline {\n  position: absolute;\n  left: 8px;\n  top: 860px;\n}", house: false, mode: "video", autoplay: true, overlay: "safe" },
            options: [
              { text: "On some TVs and players its first letters are cut off.", correct: true,
                feedback: "This is that frame on an old TV - the crop just ate the first letters. Inside the line, always." },
              { text: "Nothing - it's on the canvas, so viewers see it.",
                feedback: "On YOUR preview, yes. But the edge of the canvas is NOT the edge of what every viewer sees - the old-TV view eats the first letters." },
              { text: "The graphic loads slower.",
                feedback: "Position never affects speed - the risk is cropping." }
            ],
            applyOnAnswer: { html: "<style>#headline{background-color:#0a3d91;color:#ffffff;font-family:Arial,sans-serif;font-size:44px;padding:14px 24px;}</style><div id=\"headline\">BREAKING: HARBOUR DEAL SIGNED</div>" + CROP_FRAME, play: true }
          },
          {
            type: "fill",
            prompt: "The overlay shows the bug's corner poking outside the title-safe line at right: 40px. Move it to the safe corner - how far in from the side?",
            code: "#bug {\n  position: absolute;\n  right: {{blank}}px;\n  top: 54px;\n}",
            bank: ["96", "40", "54", "120"],
            answer: "96",
            slot: "css",
            render: { html: BUG_HTML, css: "#bug {\n  position: absolute;\n  right: 40px;\n  top: 40px;\n}", house: false, mode: "video", autoplay: true, overlay: "safe" },
            feedback: {
              "40": "40 was last lesson's guess - the overlay shows it outside the line. Title-safe is 96 from the sides.",
              "54": "54 is the top-and-bottom clearance. The frame is wider than tall, and so is the safe border - the sides take 96.",
              "120": "120 is the strap's comfortable left offset - fine for the strap, but the bug's corner pocket sits exactly 96 in."
            }
          },
          {
            type: "fill",
            prompt: "NN's house card: the bug's home is right: 96px; top: ____px; - the title-safe clearance from the top edge.",
            code: "#bug {\n  position: absolute;\n  right: 96px;\n  top: {{blank}}px;\n}",
            bank: ["54", "96", "40"],
            answer: "54",
            slot: "css",
            render: { html: BUG_HTML, css: "#bug {\n  position: absolute;\n  right: 96px;\n  top: 40px;\n}", house: false, mode: "video", autoplay: true, overlay: "safe" },
            feedback: {
              "96": "Swapped: the frame is wider than tall, and so is the safe border - 96 on the sides, 54 top and bottom.",
              "40": "40 was the old guess - still outside the line. Top and bottom clearance is 54."
            }
          },
          {
            type: "predict",
            prompt: "Three graphics are on: the strap at (120, 860), a score bug at right: 10px; top: 20px, and the ticker tucked inside the safe line. On an old TV that crops the edges, ONE of these loses content. Which?",
            render: { html: "<style>#strap{position:absolute;left:120px;top:860px;background-color:#0a3d91;padding:18px 30px;}#strap div{color:#ffffff;font-size:44px;font-weight:700;font-family:Arial,sans-serif;}#scorebug{position:absolute;right:10px;top:20px;background-color:#ffffff;color:#0a3d91;font-family:Arial,sans-serif;font-weight:700;font-size:36px;padding:8px 16px;}#ticker{position:absolute;left:0px;bottom:54px;width:1920px;box-sizing:border-box;background-color:#08265c;color:#ffffff;font-family:Arial,sans-serif;font-size:32px;padding:12px 96px;}</style><div id=\"strap\"><div>Maria Kranz</div></div><div id=\"scorebug\">HIFK 3 - 2 TPS</div><div id=\"ticker\">STORM WARNING FOR THE SOUTH COAST</div>", css: "", house: false, mode: "video", autoplay: true, overlay: "safe" },
            options: [
              { text: "The score bug.", correct: true,
                feedback: "10 and 20 are deep inside the crop zone - HIFK's score is gone. Safe corner: 96 and 54." },
              { text: "The strap.",
                feedback: "That one keeps everything inside the title-safe line - it survives the crop. Look for the graphic hugging the frame edge." },
              { text: "The ticker.",
                feedback: "Its text is padded in past the safe line - it survives the crop. Look for the graphic hugging the frame edge." }
            ],
            applyOnAnswer: { html: "<style>#strap{position:absolute;left:120px;top:860px;background-color:#0a3d91;padding:18px 30px;}#strap div{color:#ffffff;font-size:44px;font-weight:700;font-family:Arial,sans-serif;}#scorebug{position:absolute;right:10px;top:20px;background-color:#ffffff;color:#0a3d91;font-family:Arial,sans-serif;font-weight:700;font-size:36px;padding:8px 16px;}#ticker{position:absolute;left:0px;bottom:54px;width:1920px;box-sizing:border-box;background-color:#08265c;color:#ffffff;font-family:Arial,sans-serif;font-size:32px;padding:12px 96px;}</style><div id=\"strap\"><div>Maria Kranz</div></div><div id=\"scorebug\">HIFK 3 - 2 TPS</div><div id=\"ticker\">STORM WARNING FOR THE SOUTH COAST</div>" + CROP_FRAME, play: true }
          }
        ]
      },

      {
        id: "4.6", title: "Who's on top",
        concept: "When boxes overlap, the one later in the code paints on top; z-index names the stacking order explicitly.",
        explain: "When two boxes overlap, the one written LATER in the code paints on top - like coats of paint. z-index is a number that overrides that order: the bigger number wins. For now you only need to read it.",
        exercises: [
          {
            type: "arrange",
            prompt: "The Election Night panel plays in - and swallows the bug. Order the two lines so the bug paints ON TOP of the panel.",
            blocks: ["<div id=\"panel\">ELECTION NIGHT</div>", "<div id=\"bug\">NN</div>"],
            slot: "html",
            render: {
              html: "<div id=\"bug\">NN</div><div id=\"panel\">ELECTION NIGHT</div>",
              css: "#panel { position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; background-color: #0a3d91; color: #ffffff; font-family: Arial, sans-serif; font-size: 110px; font-weight: 700; text-align: center; padding-top: 430px; }\n#bug { position: absolute; top: 54px; right: 96px; background-color: #ffffff; color: #0a3d91; font-family: Arial, sans-serif; font-weight: 700; font-size: 40px; padding: 10px 20px; }",
              house: false, mode: "video", autoplay: true
            },
            feedback: { default: "Later in the code paints on top - like coats of paint. The bug must be written AFTER the panel." }
          },
          {
            type: "predict", kernel: true,
            prompt: "In the code: #panel is written first, #bug second. On screen the panel fills the frame and the bug is a small logo up in the corner. Where they overlap, who paints on top?",
            render: {
              html: "<style>#panel{color:#ffffff;font-family:Arial,sans-serif;font-size:110px;font-weight:700;text-align:center;padding-top:430px;}#bug{background-color:#ffffff;color:#0a3d91;font-family:Arial,sans-serif;font-weight:700;font-size:40px;padding:10px 20px;}</style><div id=\"panel\">ELECTION NIGHT</div><div id=\"bug\">NN</div>",
              css: "#panel { position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; background-color: #0a3d91; }\n#bug { position: absolute; top: 54px; right: 96px; }",
              house: false, mode: "video", autoplay: true
            },
            options: [
              { text: "The bug - it comes later in the code.", correct: true,
                feedback: "Later wins, every time. The tiny bug sits on the full-screen panel purely by code order." },
              { text: "The panel - it's bigger and covers everything.",
                feedback: "Size and screen position never decide stacking. Only code order (and z-index) do - later wins, so the little bug sits on the big panel." },
              { text: "Whichever is higher up on screen.",
                feedback: "The screen is the RESULT of stacking, not the cause. Read the code order." }
            ]
          },
          {
            type: "fix",
            prompt: "Code order says the bug should win - it's written after the panel - yet it's hidden. Something is overriding the order. Tap the line responsible.",
            render: {
              html: "<style>#panel{color:#ffffff;font-family:Arial,sans-serif;font-size:110px;font-weight:700;text-align:center;padding-top:430px;}#bug{background-color:#ffffff;color:#0a3d91;font-family:Arial,sans-serif;font-weight:700;font-size:40px;padding:10px 20px;}</style><div id=\"panel\">ELECTION NIGHT</div><div id=\"bug\">NN</div>",
              css: "#panel { position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; background-color: #0a3d91; z-index: 10; }\n#bug { position: absolute; top: 54px; right: 96px; z-index: 5; }",
              house: false, mode: "video", autoplay: true
            },
            tokens: ["#panel { z-index: 10; }", "#bug { z-index: 5; }"],
            answer: 1,
            fixedToken: "#bug { z-index: 20; }",
            fixedRender: { css: "#panel { position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; background-color: #0a3d91; z-index: 10; }\n#bug { position: absolute; top: 54px; right: 96px; z-index: 20; }", play: true },
            feedback: {
              0: "That's the winner's number - now find the loser's. The BIGGER z-index wins, so the bug needs to beat 10.",
              default: "The HTML order is fine - the override lives in the style rules. Which property names the stacking order outright?"
            }
          },
          {
            type: "predict",
            prompt: "Two graphics never overlap on screen. Does their code order change anything you can see?",
            options: [
              { text: "No - paint order only shows where paint overlaps.", correct: true,
                feedback: "With no overlap there's nothing to win - both render exactly the same either way." },
              { text: "Yes, the later one looks stronger.",
                feedback: "Stacking isn't strength - with no overlap, there's nothing to win. Both render exactly the same either way." },
              { text: "Yes, the later one renders bigger.",
                feedback: "Order never changes size or position - only who covers whom, and only where they overlap." }
            ]
          },
          {
            type: "predict",
            prompt: "The ticker is written LAST in the body. During the strap's out animation it slides down and crosses the ticker. Who's on top during the crossing?",
            options: [
              { text: "The ticker.", correct: true,
                feedback: "Written last, paints last - even mid-animation." },
              { text: "The strap, because it's moving.",
                feedback: "Motion doesn't change stacking - code order (and z-index) still decide, every frame." },
              { text: "The strap, because it started higher on screen.",
                feedback: "Screen position again - it never decides. Read the code." }
            ]
          }
        ]
      },

      {
        id: "4.7", title: "See-through",
        concept: "opacity from 1 to 0 fades a whole element; at 0 it is invisible but still there.",
        explain: "opacity fades a whole element: 1 is solid, 0 is invisible - but still there, holding its place. NN's strap panel runs at 0.85 so the picture breathes through it.",
        exercises: [
          {
            type: "predict",
            prompt: "The strap panel is running over the busiest feed of the course - the HIFK-TPS crowd. Which opacity range keeps the strap readable over it?",
            render: { html: STRAP_HTML, css: "#strap {\n  position: absolute;\n  top: 860px;\n  left: 120px;\n  opacity: 0.85;\n}", house: false, mode: "video", autoplay: true },
            options: [
              { text: "Around 0.8-0.9.", correct: true,
                feedback: "NN's house value is 0.85: the picture breathes, the words hold." },
              { text: "Around 0.3-0.4.",
                feedback: "See the crowd through the letters at 0.35? Below about 0.7 a busy feed eats the text. Too thin for air." },
              { text: "Exactly 1.0 only.",
                feedback: "Readable, sure - but a solid slab feels heavy over video. NN trades a little solidity for air. Taste, not law." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "Two see-through effects in this frame: (A) the area AROUND the strap, where the match shows because nothing is painted there; (B) the strap panel itself, where the match glows through the blue. Which one is opacity?",
            render: { html: STRAP_HTML, css: "#strap {\n  position: absolute;\n  top: 860px;\n  left: 120px;\n  opacity: 0.85;\n}", house: false, mode: "video", autoplay: true },
            options: [
              { text: "B - the panel.", correct: true,
                feedback: "Painted, then faded to 0.85. Keying is no-paint; opacity is faded paint." },
              { text: "A - the area around the strap.",
                feedback: "That's keying - the empty stage from 1.3: nothing is drawn there at all, so there's nothing to fade. opacity fades something you DID draw." },
              { text: "Both.",
                feedback: "They look like cousins but work differently: around the strap there is NO element; the panel is an element at 85% strength. Only the panel involves opacity." }
            ]
          },
          {
            type: "predict",
            prompt: "opacity: 0 versus deleting the element - what's the difference on screen, and which one can come back?",
            options: [
              { text: "They look identical; the opacity-0 element is still there and can fade back in.", correct: true,
                feedback: "Invisible but still there is exactly how entrances begin - Unit 5 starts from this." },
              { text: "opacity: 0 leaves a grey ghost box.",
                feedback: "No ghost - 0 is fully invisible. The element is still in the file, just at zero strength." },
              { text: "They're the same in every way.",
                feedback: "On screen tonight, yes. But the deleted one is GONE; the opacity-0 one is waiting for its cue." }
            ]
          },
          {
            type: "fill",
            prompt: "Set the NN house panel.",
            code: "#strap { opacity: {{blank}}; }",
            bank: ["0.85", "85", "0.085", "1"],
            answer: "0.85",
            slot: "css",
            render: { html: "<style>#strap{position:absolute;left:120px;top:860px;background-color:#0a3d91;padding:22px 34px;}#strap div{color:#ffffff;font-size:52px;font-weight:700;font-family:Arial,sans-serif;}#title{font-size:34px;font-weight:400;color:#dbe4f5;}</style><div id=\"strap\"><div class=\"line\">Maria Kranz</div><div id=\"title\" class=\"line\">News Anchor</div></div>", css: "", house: false, mode: "video", autoplay: true },
            feedback: {
              "85": "opacity runs from 0 to 1 - 85 is off the scale, and the machine clamps it to solid 1. The house value is 0.85.",
              "0.085": "One zero too many - the panel all but vanished. That's under a tenth of full strength.",
              "1": "Fully solid - that's the default, not the NN look. The card says 0.85."
            }
          },
          {
            type: "predict",
            prompt: "The panel is #0a3d91 at opacity: 0.85 over bright match footage. Does the blue on air look exactly like the brand card?",
            render: { html: STRAP_HTML, css: "#strap {\n  position: absolute;\n  top: 860px;\n  left: 120px;\n  opacity: 0.85;\n}", house: false, mode: "video", autoplay: true },
            options: [
              { text: "No - the video mixes through and shifts the perceived color.", correct: true,
                feedback: "That's why designers check brand color at final opacity over REAL footage, not on a grey test screen." },
              { text: "Yes - hex is hex.",
                feedback: "At 0.85, the crowd's colors leak into the blue. The hex is exact; what viewers SEE is the mix." }
            ]
          }
        ]
      },

      {
        id: "4.8", title: "Review remix - over video",
        concept: "No new concept - a full lap of the canvas, over moving pictures, before the checkpoint.",
        explain: "Nothing new - a full lap of the canvas, over live pictures this time. This is the frame you'll dress in the checkpoint.",
        exercises: [
          {
            type: "observe",
            prompt: "Three graphics are pinned over the clip. One breaks title-safe. Tap its rule, then check it against the overlay.",
            render: { html: "<style>#strap{position:absolute;left:120px;top:860px;background-color:#0a3d91;padding:18px 30px;}#strap div{color:#ffffff;font-family:Arial,sans-serif;font-size:44px;font-weight:700;}#badge{position:absolute;top:20px;left:30px;background-color:#0a3d91;color:#ffffff;font-family:Arial,sans-serif;font-size:40px;font-weight:700;padding:12px 22px;}#bug{position:absolute;right:96px;top:54px;background-color:#ffffff;color:#0a3d91;font-family:Arial,sans-serif;font-weight:700;font-size:40px;padding:10px 20px;}</style><div id=\"strap\"><div>Maria Kranz</div></div><div id=\"badge\">James Okafor</div><div id=\"bug\">NN</div>", css: "", house: false, mode: "video", autoplay: true, overlay: "safe" },
            lines: [
              "#strap { position: absolute; left: 120px; top: 860px; }",
              "#badge { position: absolute; top: 20px; left: 30px; }",
              "#bug { position: absolute; right: 96px; top: 54px; }"
            ],
            answer: 1,
            highlight: "#badge",
            feedback: {
              default: "Check it against the overlay - that one sits inside the lines. Title-safe: 96 from the sides, 54 top and bottom. Which numbers are smaller than that?"
            }
          },
          {
            type: "fix",
            prompt: "The bug is pinned with left: 1900px - almost entirely off-frame over the moving clip. Fix the pin so it survives any logo.",
            render: { html: BUG_HTML, css: "#bug {\n  position: absolute;\n  top: 54px;\n  left: 1900px;\n}", house: false, mode: "video", autoplay: true, overlay: "safe" },
            tokens: ["#bug {", "  position: absolute;", "  top: 54px;", "  left: 1900px;", "}"],
            answer: 3,
            fixedToken: "  right: 96px;",
            fixedRender: { css: "#bug {\n  position: absolute;\n  top: 54px;\n  right: 96px;\n}", play: true },
            feedback: {
              2: "The bleed is along x - the top clearance is fine.",
              default: "A recalculated left would be back on-frame but broken again by the next wider logo - pin the near edge at the safe distance: right: 96px."
            }
          },
          {
            type: "predict",
            prompt: "The Election Night panel is written AFTER the bug in the code, no z-index anywhere. The panel plays in, filling the frame. Can you still see the bug?",
            options: [
              { text: "No - later in the code paints on top, and the panel is later.", correct: true,
                feedback: "Nothing about the bug's screen position protects it - code order decides." },
              { text: "Yes - the bug is in the corner, out of the way.",
                feedback: "The panel fills the FRAME, corner included - and being later in the code, it paints over everything. Code order decides." },
              { text: "Yes - small things always stay on top.",
                feedback: "Size never decides stacking - code order (and z-index) do." }
            ]
          },
          {
            type: "arrange", kernel: true,
            prompt: "Rebuild the strap's position rule from blocks - and leave the impostor out.",
            blocks: ["#strap {", "  position: absolute;", "  top: 860px;", "  left: 120px;", "}"],
            distractors: ["  padding: 860px;"],
            slot: "css",
            render: { html: STRAP_HTML, css: "", house: false, mode: "video", autoplay: true, overlay: "grid" },
            feedback: { default: "position: absolute; switches on place-by-numbers, then top (y) and left (x). padding: 860px would balloon the box - it never pins anything." }
          },
          {
            type: "predict",
            prompt: "The gap between two ticker headlines is too small - padding or margin?",
            options: [
              { text: "Margin.", correct: true,
                feedback: "Space BETWEEN boxes is margin - it pushes the neighbor away." },
              { text: "Padding.",
                feedback: "Padding would swell each headline's own box - the gold-bar lesson again. Space between neighbors is margin." }
            ]
          },
          {
            type: "predict",
            prompt: "The strap runs at opacity: 0.85 over the match clip. The crowd shows faintly THROUGH the blue panel, and fully AROUND the strap. Which is which?",
            render: { html: STRAP_HTML, css: "#strap {\n  position: absolute;\n  top: 860px;\n  left: 120px;\n  opacity: 0.85;\n}", house: false, mode: "video", autoplay: true },
            options: [
              { text: "Through the panel = opacity; around the strap = keying.", correct: true,
                feedback: "Faded paint versus no paint at all. That's the whole distinction." },
              { text: "Through the panel = keying; around the strap = opacity.",
                feedback: "Backwards: around the strap NOTHING is drawn - that's keying, the empty stage. The panel is drawn and faded - that's opacity." },
              { text: "Both are opacity.",
                feedback: "Around the strap there is no element to fade - that's keying. Only the panel carries opacity." }
            ]
          }
        ]
      },

      {
        id: "cp4", title: "Checkpoint: Dress the frame",
        concept: "Place every graphic where broadcast expects it, over a live clip.",
        explain: "A broadcast reference layout has arrived: bug top-right in the safe corner, branded strap at the standard lower-third home with its panel at house opacity, ticker along the bottom (given), everything title-safe, over a live news clip. Match the frame.",
        isCheckpoint: true,
        exercises: [
          {
            type: "build", kernel: true,
            prompt: "The structure and branding are done - the position rules are empty. Fill them from the reference card, then toggle the safe-area overlay and check nothing important crosses the lines.",
            card: {
              "bug home": "safe corner - right 96, top 54",
              "strap home": "left 120, top 860",
              "title gap": "10px above the gold bar",
              "panel": "house opacity 0.85"
            },
            template: "#bug {\n  {{bugpin}}\n  right: {{bugright}};\n  top: {{bugtop}};\n}\n#strap {\n  position: absolute;\n  top: {{straptop}};\n  left: {{strapleft}};\n  opacity: {{op}};\n}\n#title {\n  {{gapprop}}: 10px;\n}",
            slot: "css",
            fields: [
              { key: "bugpin", label: "Bug: switch on place-by-numbers", bank: ["position: absolute;", "padding: 96px;", "z-index: 10;"], answer: "position: absolute;" },
              { key: "bugright", label: "Bug: in from the right", bank: ["96px", "40px", "10px"], answer: "96px" },
              { key: "bugtop", label: "Bug: down from the top", bank: ["54px", "96px", "20px"], answer: "54px" },
              { key: "straptop", label: "Strap: down from the top", bank: ["860px", "540px", "200px"], answer: "860px" },
              { key: "strapleft", label: "Strap: in from the left", bank: ["120px", "860px", "8px"], answer: "120px" },
              { key: "gapprop", label: "Gap above the gold bar", bank: ["margin-top", "padding-top", "top"], answer: "margin-top" },
              { key: "op", label: "Panel opacity", bank: ["0.85", "85", "1"], answer: "0.85" }
            ],
            successFeedback: "Frame dressed: bug in the safe corner, strap at home, gap opened with margin, panel breathing at 0.85 - and nothing crosses the title-safe lines. This is the frame a channel would air.",
            render: {
              html: "<style>#strap{background-color:#0a3d91;padding:22px 34px;}#strap .line{color:#ffffff;font-size:52px;font-weight:700;font-family:Arial,sans-serif;}#title{font-size:34px;font-weight:400;color:#08265c;background-color:#e8b90c;}#bug{background-color:#ffffff;color:#0a3d91;font-family:Arial,sans-serif;font-weight:700;font-size:40px;padding:10px 20px;}#ticker{position:absolute;left:0px;bottom:54px;width:1920px;box-sizing:border-box;background-color:#08265c;color:#ffffff;font-family:Arial,sans-serif;font-size:32px;padding:12px 96px;}</style><div id=\"bug\">NN</div><div id=\"strap\"><div id=\"name\" class=\"line\">Maria Kranz</div><div id=\"title\" class=\"line\">News Anchor</div></div><div id=\"ticker\">STORM WARNING FOR THE SOUTH COAST +++ ELECTION NIGHT FRIDAY +++</div>",
              css: "", house: false, mode: "video", autoplay: true, overlay: "safe"
            }
          },
          {
            type: "predict",
            prompt: "Another operator pins the bug with left: 1724px - and tonight it lands pixel-perfect on the reference. Why do pros still write right: 96px?",
            options: [
              { text: "A wider special-event logo would bleed off - pinning the near edge keeps the clearance for ANY logo.", correct: true,
                feedback: "Matches tonight - but swap in a wider logo and it bleeds. Pin the edge the element belongs to." },
              { text: "left is slower for the machine to compute.",
                feedback: "Speed is identical - the difference is what happens the day the logo file changes width." },
              { text: "1724 is outside the canvas.",
                feedback: "It's a legal x on the 1920-wide frame - the problem is that it's tuned to ONE logo's width. right: 96px survives them all." }
            ]
          }
        ]
      }
    ]
  });
})();
