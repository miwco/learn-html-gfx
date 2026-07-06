// Unit 3 - House Style. Source of truth: lessons/unit-03.md
// Schema per app/SCHEMA.md. CSS-era unit: exercises carry their own render css,
// so the house style is OFF (house: false) - the strap gets dressed lesson by lesson.
// Hidden stage-support styling (position, base type) rides inside render.html's own
// <style> tag so slot:"css" exercises can replace the css layer without undressing
// the stage. Student-facing code respects the unit's property ordering.
window.COURSE_DATA = window.COURSE_DATA || [];
(function () {

  // --- stage support (never student-facing) ---
  var STRAP = "<div class=\"nn\"><div>Maria Kranz</div><div>News Anchor</div></div>";
  var SUP_NAKED = "<style>.nn{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;}</style>";
  var SUP_WHITE = "<style>.nn{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;color:#ffffff;}</style>";
  var PANEL_MARKUP = "<div id=\"panel\"><div id=\"name\" class=\"line\">Maria Kranz</div><div id=\"title\" class=\"line\">News Anchor</div></div>";
  var SUP_PANEL = "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;}</style>";
  var SUP_PANEL_WHITE = "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;color:#ffffff;}</style>";

  COURSE_DATA.push({
    id: 3,
    title: "House Style",
    promise: "Restyle a lower third to match any channel's brand.",
    lessons: [

      {
        id: "3.1", title: "A rule of style",
        concept: "CSS rule anatomy: selector { property: value; } - who, then what - and rules live inside <style>, not on stage.",
        explain: "Looks are written as rules in the style room: first WHO (the selector), then in braces WHAT to change and what to change it TO - div { background-color: black; }. The rule changes how elements look; it never appears on screen itself.",
        exercises: [
          {
            type: "observe",
            prompt: "The seal is off the style room - and the strap is suddenly naked. This one rule puts the black panel back. Tap the part that says WHO gets styled.",
            render: { html: SUP_NAKED + STRAP, css: "div { background-color: black; color: white; }", house: false, mode: "video", autoplay: true },
            lines: ["div", "{", "background-color:", "black;", "}"],
            answer: 0,
            feedback: {
              2: "That's the property - the WHAT to change. The who stands at the very front, before the braces.",
              3: "That's the value - what it changes TO. The who stands at the very front, before the braces.",
              default: "Braces only fence the what-part in. The WHO - the selector - stands at the very front."
            }
          },
          {
            type: "observe",
            prompt: "Same rule. Now tap the part that says WHAT to change.",
            render: { html: SUP_NAKED + STRAP, css: "div { background-color: black; color: white; }", house: false, mode: "video", autoplay: true },
            lines: ["div", "{", "background-color:", "black;", "}"],
            answer: 2,
            feedback: {
              0: "That's the who - the selector. The property sits inside the braces: which look are we changing?",
              3: "That's the value - the answer. The property is the question being answered: which look are we changing?",
              default: "Inside the braces: first the property (what to change), then the value (what to change it to)."
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "Read this rule like a sentence: div { color: white; }. What does it say?",
            render: { html: SUP_NAKED + STRAP, css: "div { background-color: black; }", house: false, mode: "video", autoplay: true },
            options: [
              { text: "The divs: make their text white.", correct: true,
                feedback: "Who, then what: the divs get white text - watch it flip live." },
              { text: "Make a new div named color.",
                feedback: "Rules never create elements - the body decides what exists, the style room only decides how it looks." },
              { text: "Put the word 'white' inside the div.",
                feedback: "Nothing in the style room ever shows on screen. Who, then what: divs get white text." }
            ],
            applyOnAnswer: { css: "div { background-color: black; color: white; }", play: true }
          },
          {
            type: "fill",
            prompt: "The director wants the strap's text white. Complete the rule.",
            code: "div { color: {{blank}}; }",
            bank: ["white", "bright", "div"],
            answer: "white",
            slot: "css",
            render: { html: "<style>.nn{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;background-color:black;}</style>" + STRAP, css: "", house: false, mode: "video", autoplay: true },
            feedback: {
              "bright": "Nothing changed - the machine only knows real color names, and 'bright' isn't one, so the rule failed quietly. Try the color's actual name.",
              "div": "div is the WHO - it's already written before the braces. Inside the braces goes the what: a property and its value."
            }
          },
          {
            type: "predict",
            prompt: "ON AIR the strap's second line reads 'background-color: black' - the style words are showing on screen, like the quote marks in Unit 1. What went wrong?",
            render: { html: "<style>.nn{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;background:#ffffff;color:#000000;}</style><div class=\"nn\"><div>Maria Kranz</div><div>background-color: black</div></div>", css: "", house: false, mode: "video", autoplay: true },
            options: [
              { text: "The rule was written on stage - in the body - instead of in the style room.", correct: true,
                feedback: "Moved into <style>, it becomes div { background-color: black; } - the panel appears and the stray line vanishes." },
              { text: "The color name is wrong.",
                feedback: "The color is fine - the ADDRESS is wrong. Anything between an element's tags is content, and content shows exactly as written." },
              { text: "It needs quote marks.",
                feedback: "Quotes would show on air too (remember 1.5). Style words don't belong on stage at all - they live in <style>, in the head." }
            ],
            applyOnAnswer: { html: SUP_WHITE + "<div class=\"nn\"><div>Maria Kranz</div></div>", css: "div { background-color: black; }", play: true }
          },
          {
            type: "arrange",
            prompt: "Assemble the rule that paints the strap's panel black.",
            blocks: ["div", "{", "background-color:", "black", ";", "}"],
            slot: "css",
            render: { html: SUP_WHITE + STRAP, css: "", house: false, mode: "video", autoplay: true },
            feedback: { default: "Who, then what, then to-what: the selector first, then the property, a colon, the value - and the semicolon is the full stop of the style sentence." }
          }
        ]
      },

      {
        id: "3.2", title: "Styling by tag",
        concept: "An element selector hits EVERY element of that tag - div { } styles all divs, span { } all spans.",
        explain: "A tag selector styles every element with that tag name - write span { ... } once and ALL spans obey. One rule, many elements.",
        exercises: [
          {
            type: "predict",
            prompt: "The rule span { color: yellow; } is written once in the style room. Look at the score strap: how many elements did it change?",
            render: { html: "<style>.nn{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;color:#ffffff;background-color:black;padding:14px 24px;}</style><div class=\"nn\">HIFK <span>3</span> - <span>2</span> TPS</div>", css: "span { color: yellow; }", house: false, mode: "video", autoplay: true },
            options: [
              { text: "Both - the 3 and the 2 flipped together.", correct: true,
                feedback: "One rule, many elements - a tag selector reaches every span it can find." },
              { text: "Only the 3.",
                feedback: "Look again: the 2 flipped too. A tag selector reaches EVERY span, not just the first one it meets." },
              { text: "None - the rule is waiting to be used.",
                feedback: "It's already working: both scores are yellow. Rules apply the moment they exist." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "We add a third span around LIVE: <span>LIVE</span>. With span { color: yellow; } in the style room, how many elements are yellow now?",
            render: { html: "<style>.nn{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;color:#ffffff;background-color:black;padding:14px 24px;}</style><div class=\"nn\">HIFK <span>3</span> - <span>2</span> TPS</div>", css: "span { color: yellow; }", house: false, mode: "video", autoplay: true },
            options: [
              { text: "3", correct: true,
                feedback: "Every span, always - including ones added later. That's why tag selectors are powerful and dangerous." },
              { text: "1",
                feedback: "A tag selector isn't first-come-first-served. It styles every element carrying that tag name." },
              { text: "2",
                feedback: "The new LIVE span is a span like the others - the rule picks it up the moment it exists." }
            ],
            applyOnAnswer: { html: "<style>.nn{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;color:#ffffff;background-color:black;padding:14px 24px;}</style><div class=\"nn\">HIFK <span>3</span> - <span>2</span> TPS <span>LIVE</span></div>", play: true }
          },
          {
            type: "observe",
            prompt: "In Unit 1 the score turned yellow 'by magic'. The hidden CSS is now visible. Tap the rule that was hidden all along.",
            render: { html: "<style>.nn{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;color:#ffffff;background-color:black;padding:14px 24px;}.nn span{color:#111111;}</style><div class=\"nn\">HIFK <span>3</span> - 2 TPS</div>", css: "span { background-color: yellow; }", house: false, mode: "video", autoplay: true },
            lines: ["<div>HIFK <span>3</span> - 2 TPS</div>", "span { background-color: yellow; }"],
            answer: 1,
            feedback: {
              0: "The stage only says what exists. The look came from the style room - it was there the whole time, sealed.",
              default: "The magic was a rule: it lives in the style room, not in the markup."
            }
          },
          {
            type: "fix",
            prompt: "The designer wrote a rule but the scores never changed - and nothing looks broken. Find the token that reaches nobody.",
            render: { html: "<style>.nn{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;color:#ffffff;background-color:black;padding:14px 24px;}</style><div class=\"nn\">HIFK <span>3</span> - <span>2</span> TPS</div>", css: "scores { color: yellow; }", house: false, mode: "video", autoplay: true },
            tokens: ["scores", "{", "color:", "yellow;", "}"],
            answer: 0,
            fixedToken: "span",
            fixedRender: { css: "span { color: yellow; }", play: true },
            feedback: {
              3: "yellow is fine. The rule reaches NOBODY - the who is a tag name that doesn't exist.",
              default: "Nothing is broken - and that's the trap. CSS fails SILENTLY: a selector that matches nothing simply does nothing. Remember this feeling; you'll hunt this exact bug in Unit 8."
            }
          },
          {
            type: "predict",
            prompt: "The director wants ONLY the home score yellow, not both. Can span { ... } do that?",
            options: [
              { text: "No - a tag selector always hits every span. We need a way to name just one.", correct: true,
                feedback: "Exactly. You already invented those names in Unit 2 - ids and classes. Next lesson they pay off." },
              { text: "Yes - it takes the first span.",
                feedback: "Tag selectors don't pick favourites; both scores changed earlier. To single one out we need its NAME." },
              { text: "Yes - write the rule twice.",
                feedback: "Twice the rule, same crowd: it still addresses every span. Selecting ONE element needs a different kind of who." }
            ]
          }
        ]
      },

      {
        id: "3.3", title: "Dot and hash",
        concept: ".line selects by class, #name selects by id - the names invented in Unit 2, now paying off.",
        explain: "A dot selects a CLASS: .line styles every element wearing class=\"line\". A hash selects an ID: #name styles the one element with id=\"name\". Dot = family, hash = one of a kind.",
        exercises: [
          {
            type: "observe",
            prompt: ".line styles two elements here. One of them is the name line. Tap the OTHER one.",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;background-color:black;color:#7b8db3;}</style>" + PANEL_MARKUP, css: ".line { color: white; }\n#name { color: yellow; }", house: false, mode: "video", autoplay: true },
            lines: ["<div id=\"panel\">", "  <div id=\"name\" class=\"line\">Maria Kranz</div>", "  <div id=\"title\" class=\"line\">News Anchor</div>", "</div>"],
            answer: 2,
            highlight: "#title",
            feedback: {
              0: "The panel carries an id, not class=\"line\". Dot rules only find elements WEARING the class.",
              1: "Yes - but that's the one you were given. Classes are shared: find the other wearer.",
              default: "Dot rules reach the whole family - every element wearing class=\"line\"."
            }
          },
          {
            type: "predict",
            prompt: ".line vs #name - which changes more elements here?",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;background-color:black;color:#7b8db3;}</style>" + PANEL_MARKUP, css: ".line { color: white; }\n#name { color: yellow; }", house: false, mode: "video", autoplay: true },
            options: [
              { text: ".line - it hits both lines; #name hits exactly one.", correct: true,
                feedback: "Two wearers of the class, one carrier of the id. Dot = family, hash = one of a kind." },
              { text: "#name",
                feedback: "An id is one of a kind by Unit 2's rule - a hash can only ever find one element." },
              { text: "They tie.",
                feedback: "Count the wearers: two elements carry the class, one carries the id." }
            ]
          },
          {
            type: "fill", kernel: true,
            prompt: "Only the name line should turn yellow - dot or hash?",
            code: "{{blank}}name { color: yellow; }",
            bank: ["#", "."],
            answer: "#",
            slot: "css",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;background-color:black;}.line{color:#ffffff;}</style>" + PANEL_MARKUP, css: "", house: false, mode: "video", autoplay: true },
            feedback: {
              ".": "Nothing happened - dot means CLASS, and no element carries class=\"name\". The name badge is an id, one of a kind: hash. Dot = family, hash = one of a kind."
            }
          },
          {
            type: "fix",
            prompt: "The lines won't take their style. Find the mismatch between the selector and the markup.",
            render: { html: "<style>.nn{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;background-color:black;color:#4a5a78;}</style><div class=\"nn\"><div class=\"line\">Maria Kranz</div><div class=\"line\">News Anchor</div></div>", css: "#line { color: white; }", house: false, mode: "video", autoplay: true },
            tokens: ["#line", "{", "color:", "white;", "}"],
            answer: 0,
            fixedToken: ".line",
            fixedRender: { css: ".line { color: white; }", play: true },
            feedback: {
              default: "The markup is fine - compare it with the selector, character by character, like the ticker typo in Unit 2. The markup says class=\"line\" - a class needs a dot. The hash went looking for id=\"line\", found nobody, and failed silently."
            }
          },
          {
            type: "predict",
            prompt: "Quick call: style EVERY headline in the ticker - dot or hash?",
            options: [
              { text: "Dot - the headlines share a class.", correct: true,
                feedback: "Dot = family. One rule, every headline." },
              { text: "Hash - grab them by id.",
                feedback: "Dot = family, hash = one of a kind. Same choice you made in Unit 2 when you handed out the names - now it decides who the rule reaches." }
            ]
          },
          {
            type: "predict",
            prompt: "And the strap's one-and-only background panel, id=\"panel\" - dot or hash?",
            options: [
              { text: "Hash - one of a kind, one id.", correct: true,
                feedback: "Hash = one of a kind. #panel finds exactly that one element." },
              { text: "Dot - safer to use a class.",
                feedback: "Dot = family, hash = one of a kind. The markup says id=\"panel\", so the rule needs the hash." }
            ]
          }
        ]
      },

      {
        id: "3.4", title: "Paint it",
        concept: "color colors the text, background-color colors the box - two properties, two different surfaces.",
        explain: "Every element has two paintable surfaces: the words and the box behind them. color paints the words; background-color paints the box. Never let the two whites meet.",
        exercises: [
          {
            type: "predict",
            prompt: "The panel rule carries both paints: #panel { background-color: black; color: white; }. Which property painted the WORDS white?",
            render: { html: SUP_PANEL + PANEL_MARKUP, css: "#panel {\n  background-color: black;\n  color: white;\n}", house: false, mode: "video", autoplay: true },
            options: [
              { text: "color", correct: true,
                feedback: "color owns the words, background-color owns the box. Two properties, two surfaces." },
              { text: "background-color",
                feedback: "Switch background-color off in your head: the BOX goes, the words stay white. The words listen only to color." },
              { text: "Both together.",
                feedback: "One property, one surface - each paint lands on exactly one of them." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "We change the panel rule's color: white to color: navy. Does the box change?",
            render: { html: SUP_PANEL + PANEL_MARKUP, css: "#panel {\n  background-color: black;\n  color: white;\n}", house: false, mode: "video", autoplay: true },
            options: [
              { text: "No - the words turn navy. color means the text, always.", correct: true,
                feedback: "Barely readable, isn't it? And notice BOTH lines changed: the lines sit inside the panel, so they inherit its text color." },
              { text: "Yes - the box turns navy.",
                feedback: "Look again: the words changed, the box didn't. The box listens only to background-color." },
              { text: "Both the box and the words.",
                feedback: "One property, one surface. To paint both you need both properties." }
            ],
            applyOnAnswer: { css: "#panel {\n  background-color: black;\n  color: navy;\n}", play: true }
          },
          {
            type: "fill",
            prompt: "Make the title line grey.",
            code: "#title { {{blank}}: grey; }",
            bank: ["color", "background-color"],
            answer: "color",
            slot: "css",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;background-color:black;color:white;}</style>" + PANEL_MARKUP, css: "", house: false, mode: "video", autoplay: true },
            feedback: {
              "background-color": "See the grey box? That painted the SURFACE BEHIND the words. To touch the words themselves: color."
            }
          },
          {
            type: "predict",
            prompt: "The presenter's name has vanished on air - just a white box in the lower third. The words are still there. Why can't we see them?",
            render: { html: SUP_PANEL + PANEL_MARKUP, css: "#panel { background-color: white; }\n.line { color: white; }", house: false, mode: "video", autoplay: true },
            options: [
              { text: "White words on a white panel - the two whites met.", correct: true,
                feedback: "Broadcast's oldest gotcha, caught. Flip either paint and the name is back. On a real channel this goes out to a million sofas." },
              { text: "The text was deleted.",
                feedback: "Tap the body: the words are still in their divs. White-on-white is INVISIBLE, not gone." },
              { text: "PLAY wasn't pressed.",
                feedback: "It's on air - the white box is right there covering the video. The problem is paint, not playout." }
            ],
            applyOnAnswer: { css: "#panel { background-color: white; }\n.line { color: black; }", play: true }
          },
          {
            type: "predict",
            prompt: "We delete the background-color line entirely. What shows behind the white words on air?",
            render: { html: SUP_PANEL + PANEL_MARKUP, css: "#panel { background-color: black; }\n.line { color: white; }", house: false, mode: "video", autoplay: true },
            options: [
              { text: "The program video - an unpainted box is see-through.", correct: true,
                feedback: "The empty stage rule from Unit 1, now under your control: paint covers, no paint keys." },
              { text: "A white box.",
                feedback: "White would need to be PAINTED. Remove the paint and the box goes back to transparent." },
              { text: "A black box.",
                feedback: "Black is a color like any other - no rule, no paint, video shows through." }
            ],
            applyOnAnswer: { css: ".line { color: white; }", play: true }
          }
        ]
      },

      {
        id: "3.5", title: "Brand colors",
        concept: "Hex codes like #0a3d91 - exact colors, read in pairs (red/green/blue), copied from the brand card, never invented.",
        explain: "A hex code is a color's exact recipe: #, then three pairs - red, green, blue. You never calculate one; you COPY it from the brand card, character by character. NN's card: primary #0a3d91 (deep blue), accent #e8b90c (amber).",
        exercises: [
          {
            type: "predict",
            prompt: "The card's blue is #0a3d91 - read in pairs, left to right: red, green, blue. Which two characters carry the RED amount?",
            render: { html: SUP_PANEL_WHITE + PANEL_MARKUP, css: "#panel { background-color: #0a3d91; }", house: false, mode: "video", autoplay: true },
            options: [
              { text: "0a", correct: true,
                feedback: "Pairs read left to right: red, green, blue - and 0a is almost nothing, which is why this color runs cold." },
              { text: "3d",
                feedback: "That's the middle pair - green. Red rides first." },
              { text: "91",
                feedback: "Last pair is blue - and it's the biggest here, which is why the color IS blue." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "Three values from the card's family. Which one is probably the amber accent?",
            options: [
              { text: "#e8b90c", correct: true,
                feedback: "Big red, big green, almost no blue - red plus green makes yellow-amber. You read it, you didn't calculate it." },
              { text: "#0a3d91",
                feedback: "Its biggest pair is the last one - blue. Lots of blue and little red is a cool color, not amber." },
              { text: "#111111",
                feedback: "All three pairs tiny and equal - that's almost black. Amber needs the warm pairs (red, green) turned up." }
            ]
          },
          {
            type: "fill",
            prompt: "Apply the card's primary to the panel - copy it character by character.",
            code: "#panel { background-color: {{blank}}; }",
            bank: ["#0a3d91", "#0a3d19", "0a3d91", "blue"],
            answer: "#0a3d91",
            slot: "css",
            render: { html: SUP_PANEL_WHITE + PANEL_MARKUP, css: "", house: false, mode: "video", autoplay: true },
            feedback: {
              "#0a3d19": "Look at the panel - visibly off-brand, a murky green-tinged dark. Two characters got swapped. Brand hexes are copied character by character, never from memory.",
              "0a3d91": "The panel lost its paint entirely - without the # the machine doesn't read it as a color at all. The rule failed silently, like the ghost selector in 3.2.",
              "blue": "It's blue - but not NN's blue. Put them side by side and the brand check fails. Channels use exact codes."
            }
          },
          {
            type: "fix",
            prompt: "The panel lost its blue - video shows straight through behind the text. Count the characters.",
            render: { html: SUP_PANEL_WHITE + PANEL_MARKUP, css: "#panel { background-color: #0a3d9; }", house: false, mode: "video", autoplay: true },
            tokens: ["#panel", "{", "background-color:", "#0a3d9;", "}"],
            answer: 3,
            fixedToken: "#0a3d91;",
            fixedRender: { css: "#panel { background-color: #0a3d91; }", play: true },
            feedback: {
              default: "Both are fine - the rule REACHES the panel. Read the value: is it a complete recipe? Five characters isn't a color, so the machine ignored the whole line - silently. A hex is always # plus six."
            }
          },
          {
            type: "predict",
            prompt: "A designer says: 'I'll work out our blue's hex in my head.' What's the professional move instead?",
            options: [
              { text: "Copy it from the brand card - brand hexes are copied, never invented.", correct: true,
                feedback: "The card is the truth. Copy, paste, check the render." },
              { text: "Use blue, it's close enough.",
                feedback: "On a brand check, close fails. The reference compares exact values - you saw the two blues clash a moment ago." },
              { text: "Tweak by eye until it looks right.",
                feedback: "Your screen isn't the viewer's screen. The card is the truth - copy it." }
            ]
          }
        ]
      },

      {
        id: "3.6", title: "The channel's typeface",
        concept: "font-family picks the typeface, written as a list - the first available face wins.",
        explain: "font-family: Archivo, sans-serif; asks for the brand face first, with backups after the commas. The machine walks the list left to right and uses the first face it actually has. Names with spaces wear quote marks.",
        exercises: [
          {
            type: "predict",
            prompt: "The brand card gained a line: typeface Archivo - clean strokes, no little feet on the letters. Look at the strap on air. Verdict?",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-size:44px;background-color:#0a3d91;color:#ffffff;}</style>" + PANEL_MARKUP, css: ".line { font-family: Georgia, serif; }", house: false, mode: "video", autoplay: true },
            options: [
              { text: "Off-brand - this face wears serifs, the card's specimen doesn't.", correct: true,
                feedback: "Compare letter shapes with the card's specimen - the card is the truth, not taste. Look at the a and the g." },
              { text: "On-brand - it's white and big, close enough.",
                feedback: "The typeface is part of the brand, same as the hex. Bookish serifs against a clean sans specimen fails the check." },
              { text: "Can't tell without the hex codes.",
                feedback: "Hex is for color - a typeface is judged against the card's letter specimen." }
            ]
          },
          {
            type: "predict", kernel: true,
            prompt: "The playout machine doesn't have Archivo installed. What does font-family: Archivo, sans-serif; show on air?",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-size:44px;background-color:#0a3d91;color:#ffffff;}</style>" + PANEL_MARKUP, css: ".line { font-family: Georgia, serif; }", house: false, mode: "video", autoplay: true },
            options: [
              { text: "The next name on the list - a standard sans-serif face.", correct: true,
                feedback: "That's the whole point of the list: the show goes on, in the nearest safe face - close, not identical." },
              { text: "Nothing - the text disappears.",
                feedback: "Text never vanishes over a missing font - the list exists exactly for this. The machine walks it left to right and uses the first face it owns." },
              { text: "Both fonts mixed together.",
                feedback: "One face at a time. The list is a ranked queue of backups, not a blend." }
            ],
            applyOnAnswer: { css: ".line { font-family: Archivo, sans-serif; }", play: true }
          },
          {
            type: "fill",
            prompt: "Ask for the brand face, with the safe backup after it.",
            code: ".line { font-family: {{blank}}, sans-serif; }",
            bank: ["Archivo", "sans-serif", "bold"],
            answer: "Archivo",
            slot: "css",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-size:44px;background-color:#0a3d91;color:#ffffff;}</style>" + PANEL_MARKUP, css: "", house: false, mode: "video", autoplay: true },
            feedback: {
              "sans-serif": "That's already there - it's the backup. The first seat belongs to the brand face from the card.",
              "bold": "bold is a WEIGHT, not a typeface - weights arrive next lesson. font-family only takes face names."
            }
          },
          {
            type: "fix",
            prompt: "The weather strap won't take its face - it renders in the default. Something is missing AROUND the name - tap where.",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-size:44px;background-color:#0a3d91;color:#ffffff;}</style><div id=\"panel\"><div class=\"line\">Alexandra Rivera</div><div class=\"line\">Weather</div></div>", css: ".line { font-family: Archivo Narrow, sans-serif; }", house: false, mode: "video", autoplay: true },
            tokens: [".line", "{", "font-family:", "Archivo Narrow,", "sans-serif;", "}"],
            answer: 3,
            fixedToken: "\"Archivo Narrow\",",
            fixedRender: { css: ".line { font-family: \"Archivo Narrow\", sans-serif; }", play: true },
            feedback: {
              4: "The backup is a built-in keyword - it never needs quotes. Look at the name with the SPACE in it.",
              default: "A name with a space wears quote marks - without them some playout machines misread the list. Rule of thumb: space in the name, quotes around it. (You'll meet fonts properly again in Unit 8.)"
            }
          },
          {
            type: "predict",
            prompt: "True or false: listing two fonts makes the text use both at once.",
            options: [
              { text: "False", correct: true,
                feedback: "The list is a fallback queue. First available face wins, and only that one renders." },
              { text: "True",
                feedback: "Watch the fallback again: only one face ever shows. The commas mean 'or else', not 'and also'." }
            ]
          }
        ]
      },

      {
        id: "3.7", title: "Size and weight",
        concept: "font-size in px on the fixed 1080p canvas, and font-weight to separate the name from the title.",
        explain: "On the 1920x1080 canvas a pixel is a fixed, honest unit: font-size: 44px is the same size on every machine. font-weight: bold or normal sets how heavy the letters are. Big and bold for the name, smaller and lighter for the title - that contrast is broadcast's type hierarchy.",
        exercises: [
          {
            type: "predict",
            prompt: "The title has been set to font-size: 12px - look for it on the stage. The card says 28px, and everything under 24px is in the red zone. Why is the red zone red?",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;background-color:#0a3d91;color:#ffffff;}</style>" + PANEL_MARKUP, css: "#name { font-size: 44px; font-weight: bold; }\n#title { font-size: 12px; }", house: false, mode: "video", autoplay: true },
            options: [
              { text: "TV is read from across a room - broadcast type has a minimum size.", correct: true,
                feedback: "From the sofa, 12px is dust. The card's 28px is chosen for the living room, not the desk." },
              { text: "Small text is against the rules of CSS.",
                feedback: "CSS allows any size - the ROOM doesn't. The limit is the viewer's sofa, not the machine." },
              { text: "12px is not a real size.",
                feedback: "It's real - look how the render accepts it. It's just unreadable from the sofa, which is where your viewer sits." }
            ],
            applyOnAnswer: { css: "#name { font-size: 44px; font-weight: bold; }\n#title { font-size: 28px; font-weight: normal; }", play: true }
          },
          {
            type: "predict", kernel: true,
            prompt: "The card says: name 44px bold, title 28px normal. Which rule styles the TITLE correctly?",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;background-color:#0a3d91;color:#ffffff;}</style>" + PANEL_MARKUP, css: "#name { font-size: 44px; font-weight: bold; }", house: false, mode: "video", autoplay: true },
            options: [
              { text: "#title { font-size: 28px; font-weight: normal; }", correct: true,
                feedback: "Hierarchy restored: big bold name, smaller lighter title - exactly the card." },
              { text: "#title { font-size: 44px; font-weight: bold; }",
                feedback: "Now the title shouts as loudly as the name - the hierarchy on the card (big bold name, smaller lighter title) is gone." },
              { text: "#name { font-size: 28px; font-weight: normal; }",
                feedback: "The properties are right but the selector reaches the wrong element - the WHO decides where the style lands. That would shrink the NAME." }
            ],
            applyOnAnswer: { css: "#name { font-size: 44px; font-weight: bold; }\n#title { font-size: 28px; font-weight: normal; }", play: true }
          },
          {
            type: "fill",
            prompt: "Set the name's weight per the card.",
            code: "#name { font-weight: {{blank}}; }",
            bank: ["bold", "normal", "44px"],
            answer: "bold",
            slot: "css",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;background-color:#0a3d91;color:#ffffff;}#name{font-size:44px;}#title{font-size:28px;}</style>" + PANEL_MARKUP, css: "", house: false, mode: "video", autoplay: true },
            feedback: {
              "normal": "Now the name whispers like the title. The card wants the name heavier: bold.",
              "44px": "44px is a SIZE, not a weight - the machine ignored the line, silently. Weight words here: bold, normal."
            }
          },
          {
            type: "fix",
            prompt: "The designer set 28 but the title never changed - it sits at the tiny default. Find what's missing.",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;background-color:#0a3d91;color:#ffffff;}#name{font-size:44px;font-weight:bold;}</style>" + PANEL_MARKUP, css: "#title { font-size: 28; }", house: false, mode: "video", autoplay: true },
            tokens: ["#title", "{", "font-size:", "28;", "}"],
            answer: 3,
            fixedToken: "28px;",
            fixedRender: { css: "#title { font-size: 28px; }", play: true },
            feedback: {
              default: "The selector is fine - it reaches the title. Read the value: 28 WHAT? A bare number isn't a length - without px the machine drops the whole line, silently. This exact bug is one of Unit 8's four usual suspects: remember it."
            }
          },
          {
            type: "type",
            prompt: "Write the full rule for the title: size 28px, weight normal.",
            answer: [
              "#title { font-size: 28px; font-weight: normal; }",
              "#title { font-weight: normal; font-size: 28px; }",
              "#title {font-size: 28px; font-weight: normal;}",
              "#title {font-weight: normal; font-size: 28px;}"
            ],
            placeholder: "#title { ... }",
            slot: "css",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;background-color:#0a3d91;color:#ffffff;}#name{font-size:44px;font-weight:bold;}</style>" + PANEL_MARKUP, css: "", house: false, mode: "video", autoplay: true },
            feedback: {
              default: "Two declarations, each ending with a semicolon: font-size: 28px; and font-weight: normal;. 28 needs its unit - px - and the markup says id=\"title\": one of a kind, so hash."
            }
          }
        ]
      },

      {
        id: "3.8", title: "Breathing room",
        concept: "padding - space INSIDE the box, between the panel's edge and its content.",
        explain: "padding: 20px pushes a box's edge 20 pixels away from what's inside it, on all sides. The content stays put; the box grows around it. Text touching a panel edge is the surest sign of an amateur graphic.",
        exercises: [
          {
            type: "predict",
            prompt: "The panel's padding is about to slide from 0px up to 40px. What is that number actually moving?",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;color:#ffffff;}#name{font-size:44px;font-weight:bold;}#title{font-size:28px;}</style>" + PANEL_MARKUP, css: "#panel {\n  background-color: #0a3d91;\n  padding: 0px;\n}", house: false, mode: "video", autoplay: true },
            options: [
              { text: "The gap inside the panel, between its edge and the words.", correct: true,
                feedback: "Watch: the words never moved - the panel's edge walked outward around them." },
              { text: "The strap slides across the screen.",
                feedback: "Watch the words: they never moved. Padding is INSIDE space - moving boxes around the frame is Unit 4's job." },
              { text: "The words get bigger.",
                feedback: "The type stayed at its card sizes - only the panel's edge walked outward." }
            ],
            applyOnAnswer: { css: "#panel {\n  background-color: #0a3d91;\n  padding: 40px;\n}", play: true }
          },
          {
            type: "predict", kernel: true,
            prompt: "We give the panel padding: 20px. Does the text move, or the panel's edge?",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;color:#ffffff;}#name{font-size:44px;font-weight:bold;}#title{font-size:28px;}</style>" + PANEL_MARKUP, css: "#panel {\n  background-color: #0a3d91;\n  padding: 0px;\n}", house: false, mode: "video", autoplay: true },
            options: [
              { text: "The edge - it's pushed outward, away from the content.", correct: true,
                feedback: "Text still, panel grown. Padding grows the box around its content." },
              { text: "The text shrinks to make room.",
                feedback: "Padding never touches the content - it grows the BOX around it." },
              { text: "The whole strap moves 20px across the screen.",
                feedback: "That would be OUTSIDE space - a different property, waiting in Unit 4. Padding only breathes inside the box." }
            ],
            applyOnAnswer: { css: "#panel {\n  background-color: #0a3d91;\n  padding: 20px;\n}", play: true }
          },
          {
            type: "fill",
            prompt: "Give the panel its breathing room.",
            code: "#panel {\n  background-color: #0a3d91;\n  font-size: 44px;\n  {{blank}}: 20px;\n}",
            bank: ["padding", "font-size", "color"],
            answer: "padding",
            slot: "css",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;color:#ffffff;}</style>" + PANEL_MARKUP, css: "#panel {\n  background-color: #0a3d91;\n  font-size: 44px;\n}", house: false, mode: "video", autoplay: true },
            feedback: {
              "font-size": "That resized the TYPE - and broke the card's spec; the second font-size wins. The property for inside space is padding.",
              "color": "A color can't be 20px, so the rule failed silently. Space inside the box: padding."
            }
          },
          {
            type: "fix",
            prompt: "The headline is glued to its panel edge - crammed edge-to-edge. Fix the rule that's starving it.",
            render: { html: "<style>.headline{position:absolute;left:120px;top:880px;color:#ffffff;font-family:Arial,sans-serif;font-size:34px;}</style><div class=\"headline\">STORM WARNING FOR THE SOUTH COAST</div>", css: ".headline {\n  background-color: #0a3d91;\n  padding: 0px;\n}", house: false, mode: "video", autoplay: true },
            tokens: [".headline {", "  background-color: #0a3d91;", "  padding:", "  0px;", "}"],
            answer: 3,
            fixedToken: "  12px;",
            fixedRender: { css: ".headline {\n  background-color: #0a3d91;\n  padding: 12px;\n}", play: true },
            feedback: {
              1: "The blue is the design - the problem is space, not paint. Zero padding is legal, and always looks wrong on air.",
              default: "Smaller type would still touch the edge - the missing thing is space, not size. Look at the value feeding the padding."
            }
          },
          {
            type: "predict",
            prompt: "Two straps, identical brand. Tap the broadcast-clean one.",
            render: { html: "<style>.demo{position:absolute;left:120px;font-family:Arial,sans-serif;color:#ffffff;font-size:40px;background-color:#0a3d91;}.a{top:760px;padding:20px 32px;}.b{top:930px;padding:0px;}</style><div class=\"demo a\">A - Maria Kranz, News Anchor</div><div class=\"demo b\">B - Maria Kranz, News Anchor</div>", css: "", house: false, mode: "video", autoplay: true },
            options: [
              { text: "A - the one with breathing room.", correct: true,
                feedback: "Real channel graphics always leave breathing room - from now on, so do yours." },
              { text: "B - tighter is cleaner.",
                feedback: "Look at the gap between the words and the panel edge. Text touching the edge is the surest sign of an amateur graphic." }
            ]
          }
        ]
      },

      {
        id: "3.9", title: "Review remix",
        concept: "No new concept - a lap of the style room across Units 1-3 before the rebrand job.",
        explain: "Nothing new - a quick lap of the style room before the rebrand job.",
        exercises: [
          {
            type: "fix",
            prompt: "The title won't style. Compare the selector with the markup, character by character.",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;font-size:44px;background-color:#0a3d91;color:#7b8db3;}</style>" + PANEL_MARKUP, css: "#titel { color: white; }", house: false, mode: "video", autoplay: true },
            tokens: ["#titel", "{", "color:", "white;", "}"],
            answer: 0,
            fixedToken: "#title",
            fixedRender: { css: "#title { color: white; }", play: true },
            feedback: {
              default: "The markup matches Unit 2's strap - the mismatch is on the style side. Machines don't forgive typos."
            }
          },
          {
            type: "predict", kernel: true,
            prompt: "A third line is added inside the strap: <div class=\"line\">LIVE</div>. How many elements does .line { color: white; } hit now?",
            options: [
              { text: "3", correct: true,
                feedback: "The new line wears the class too - dot rules reach every wearer, including ones added later." },
              { text: "2",
                feedback: "The new line wears the class too - dot rules reach every wearer, including ones added later." },
              { text: "1",
                feedback: "Dot = family. Every element wearing class=\"line\" obeys - all three." }
            ]
          },
          {
            type: "arrange",
            prompt: "Rebuild the NN panel rule from the brand card.",
            blocks: ["#panel", "{", "background-color:", "#0a3d91", ";", "}"],
            slot: "css",
            render: { html: SUP_PANEL_WHITE + PANEL_MARKUP, css: "", house: false, mode: "video", autoplay: true },
            feedback: { default: "Who, then what, then to-what - and the semicolon closes the line." }
          },
          {
            type: "predict",
            prompt: "The brand card is on your desk. Which value is NN amber?",
            options: [
              { text: "#e8b90c", correct: true,
                feedback: "Warm pairs up, blue pair down - that's amber, straight off the card." },
              { text: "#0a3d91",
                feedback: "That's the primary - its biggest pair is blue. Amber runs warm." },
              { text: "#c0b9e8",
                feedback: "Its blue pair is the big one - that's a cool lilac. Amber runs warm: big red and green, tiny blue." }
            ]
          },
          {
            type: "fix",
            prompt: "The name ignores its size and renders tiny. Find what's missing.",
            render: { html: "<style>#panel{position:absolute;left:120px;top:860px;font-family:Arial,sans-serif;background-color:#0a3d91;color:#ffffff;}#title{font-size:28px;}</style>" + PANEL_MARKUP, css: "#name { font-size: 44; }", house: false, mode: "video", autoplay: true },
            tokens: ["#name", "{", "font-size:", "44;", "}"],
            answer: 3,
            fixedToken: "44px;",
            fixedRender: { css: "#name { font-size: 44px; }", play: true },
            feedback: {
              default: "44 what? A bare number isn't a length - without px the whole line is silently dropped."
            }
          },
          {
            type: "predict",
            prompt: "The playout machine has no Archivo. With font-family: Archivo, sans-serif; - what shows on air?",
            options: [
              { text: "The next face on the list - a standard sans-serif.", correct: true,
                feedback: "The list is a fallback queue: first available face wins, the show goes on." },
              { text: "No text at all.",
                feedback: "Text never vanishes over a missing font - the machine walks the list and uses the first face it owns." },
              { text: "Archivo, downloaded automatically.",
                feedback: "Nothing downloads by itself - that trick (called @font-face) waits in Unit 8. Tonight, the backup face carries the show." }
            ]
          }
        ]
      },

      {
        id: "cp3", title: "Checkpoint: Rebrand it",
        concept: "Dress the Checkpoint 2 strap for a brand-new channel, from the card alone.",
        explain: "NN launches a sister channel: NN Sport. A new brand card has arrived. Take the strap you rebuilt in Checkpoint 2 and dress it for the new channel - the reference render is your target.",
        isCheckpoint: true,
        exercises: [
          {
            type: "build", kernel: true,
            prompt: "Fill the style room from the NN Sport brand card, then check the strap over video.",
            card: {
              channel: "NN Sport",
              primary: "#0b6e3d",
              text: "white",
              typeface: "\"Barlow Condensed\" (note the space)",
              name: "44px bold",
              title: "26px normal",
              padding: "20px"
            },
            template: "#panel {\n  background-color: {{bg}};\n  padding: {{pad}};\n}\n.line {\n  color: {{textcolor}};\n  font-family: {{face}}, sans-serif;\n}\n#name {\n  font-size: {{namesize}};\n  font-weight: {{nameweight}};\n}\n#title {\n  font-size: {{titlesize}};\n  font-weight: {{titleweight}};\n}",
            slot: "css",
            fields: [
              { key: "bg", label: "Panel color", bank: ["#0b6e3d", "green", "#0b6e3", "#0a3d91"], answer: "#0b6e3d" },
              { key: "pad", label: "Panel padding", bank: ["20px", "0px", "20"], answer: "20px" },
              { key: "textcolor", label: "Line color", bank: ["white", "#0b6e3d", "black"], answer: "white" },
              { key: "face", label: "Brand face", bank: ["\"Barlow Condensed\"", "Barlow Condensed", "bold"], answer: "\"Barlow Condensed\"" },
              { key: "namesize", label: "Name size", bank: ["44px", "26px", "44"], answer: "44px" },
              { key: "nameweight", label: "Name weight", bank: ["bold", "normal"], answer: "bold" },
              { key: "titlesize", label: "Title size", bank: ["26px", "44px", "26"], answer: "26px" },
              { key: "titleweight", label: "Title weight", bank: ["normal", "bold"], answer: "normal" }
            ],
            successFeedback: "NN Sport is on air: panel on the card's exact green, both lines in the quoted brand face with a fallback standing by, hierarchy intact, panel breathing. Brand check passed.",
            render: {
              html: "<style>#panel{position:absolute;left:120px;top:860px;}</style><div id=\"panel\"><div id=\"name\" class=\"line\">Tomas Berg</div><div id=\"title\" class=\"line\">Sports Reporter</div></div>",
              css: "", house: false, mode: "video", autoplay: true
            }
          },
          {
            type: "predict",
            prompt: "A colleague submits the same strap with background-color: green. It looks green on their screen. Does it pass the brand check?",
            options: [
              { text: "No - it's green, but not NN Sport's green. The check compares exact values.", correct: true,
                feedback: "Copy the card's code, character by character - that's the whole ritual." },
              { text: "Yes - green is green.",
                feedback: "Put them side by side: the keyword green is a different shade from #0b6e3d. On a brand check, close fails." },
              { text: "Only if the typeface also fails.",
                feedback: "Each property is checked on its own - one off-brand color is already a fail." }
            ]
          }
        ]
      }
    ]
  });
})();
