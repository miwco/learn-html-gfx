// Unit 1 - Hello, Graphic. Source of truth: lessons/unit-01.md
// Schema per app/SCHEMA.md. House style is automatic (no css in renders this unit).
window.COURSE_DATA = window.COURSE_DATA || [];
COURSE_DATA.push({
  id: 1,
  title: "Hello, Graphic",
  promise: "Read a tiny template and point at the code that makes each thing appear.",
  lessons: [

    {
      id: "1.1", title: "Graphics are code",
      concept: "Each visible thing on screen corresponds to a line of code - the code always says exactly what the screen says.",
      explain: "You know the graphic is a web page. Now open one: each thing on screen comes from one line in the file. Match the words on screen to the words in the code - they are always identical.",
      exercises: [
        {
          type: "observe", kernel: true,
          prompt: "Tap the line of code that puts the presenter's name on screen.",
          render: { html: "<div>NIGHTLY NEWS</div><div>Maria Kranz</div><div>News Anchor</div>", autoplay: true },
          lines: ["<div>NIGHTLY NEWS</div>", "<div>Maria Kranz</div>", "<div>News Anchor</div>"],
          answer: 1,
          feedback: {
            0: "That's the show label at the top of the strap. The code always says exactly what the screen says.",
            2: "That line makes the smaller second line. Look for the words that match the name exactly."
          }
        },
        {
          type: "observe",
          prompt: "Now tap the line that makes the smaller line, 'News Anchor'.",
          render: { html: "<div>NIGHTLY NEWS</div><div>Maria Kranz</div><div>News Anchor</div>", autoplay: true },
          lines: ["<div>NIGHTLY NEWS</div>", "<div>Maria Kranz</div>", "<div>News Anchor</div>"],
          answer: 2,
          feedback: {
            0: "That's the show label at the top of the strap. Look for the words that match 'News Anchor' exactly.",
            1: "That line makes the presenter's name. Match the words on screen to the words in the code - they're always identical."
          }
        },
        {
          type: "predict",
          prompt: "If we change <div>Maria Kranz</div> to <div>Tomas Berg</div>, what happens on screen?",
          render: { html: "<div>NIGHTLY NEWS</div><div>Maria Kranz</div><div>News Anchor</div>", autoplay: true },
          options: [
            { text: "The strap shows Tomas Berg instead.", correct: true,
              feedback: "Watch it happen. The graphic is drawn live from the code - the screen always says what the code says." },
            { text: "Nothing changes until we film new video.",
              feedback: "The graphic isn't video - it's drawn live from the code, every time." },
            { text: "The graphic breaks.",
              feedback: "Changing the words never breaks a graphic. The text in the file is simply what the screen shows." },
            { text: "Both lines change.",
              feedback: "Only the line we edited changes. Each screen line has its own code line." }
          ],
          applyOnAnswer: { html: "<div>NIGHTLY NEWS</div><div>Tomas Berg</div><div>News Anchor</div>", play: true }
        },
        {
          type: "observe",
          prompt: "A different graphic - the hockey score strap. Tap the code that produced the score.",
          render: { html: "<div>SPORTS TONIGHT</div><div>HIFK 3 - 2 TPS</div><div>LIVE</div>", autoplay: true },
          lines: ["<div>SPORTS TONIGHT</div>", "<div>HIFK 3 - 2 TPS</div>", "<div>LIVE</div>"],
          answer: 1,
          feedback: { default: "Match the words on screen to the words in the code - they're always identical." }
        },
        {
          type: "predict",
          prompt: "The screen shows Alexandra Rivera. Which code made it?",
          render: { html: "<div>Alexandra Rivera</div>", autoplay: true },
          options: [
            { text: "<div>Alexandra Rivera</div>", correct: true,
              feedback: "The words between the tags are the words on screen - always." },
            { text: "<div>Maria Kranz</div>",
              feedback: "The code says Maria Kranz - so that's what the screen would say." },
            { text: "Alexandra Rivera <div></div>",
              feedback: "Close - but here the name sits outside the tags. You'll learn in lesson 1.4 why that matters. The safe rule: the words live between the tags." }
          ]
        }
      ]
    },

    {
      id: "1.2", title: "PLAY and STOP",
      concept: "An operator plays a graphic on air and stops it off; the template responds to those two commands.",
      explain: "In a control room, an operator presses PLAY to bring a graphic on air and STOP to take it off. Your template decides what those buttons do - that's what makes it a template and not a picture.",
      exercises: [
        {
          type: "predict", kernel: true,
          prompt: "Press PLAY on the stage - the strap animates in. Press STOP - it leaves. Now: what did PLAY do?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>" },
          options: [
            { text: "Brought the graphic on air.", correct: true,
              feedback: "That's the operator's whole job in one button: PLAY performs the graphic on air." },
            { text: "Started the studio video.",
              feedback: "The video was already running - the operator only controls the graphic on top of it." },
            { text: "Saved the file.",
              feedback: "Nothing was saved - PLAY performs the graphic, like pressing play on a song." }
          ]
        },
        {
          type: "predict",
          prompt: "The director says: 'Lose the strap.' Which button does the operator press?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", autoplay: true },
          options: [
            { text: "STOP", correct: true,
              feedback: "STOP takes the graphic off air - the strap animates out." },
            { text: "PLAY",
              feedback: "PLAY brings a graphic ON air. To take it off, the operator presses STOP." }
          ]
        },
        {
          type: "predict",
          prompt: "You just played this strap in, then out. Think back to Unit 0: a corner bug and a full-screen title come and go the same way every show. Of those three graphics, how many arrive with an animation?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", autoplay: true },
          options: [
            { text: "All three.", correct: true,
              feedback: "Broadcast graphics almost never pop on. They animate in and animate out - by Unit 5, you'll be the one making that motion." },
            { text: "Only the strap.",
              feedback: "Even the little corner bug fades in. Broadcast graphics almost never pop on - they animate in and out." },
            { text: "None.",
              feedback: "Watch again - nothing pops on. Broadcast graphics animate in and animate out, always." }
          ]
        },
        {
          type: "fill",
          prompt: "The person in the control room who plays the graphics is called the ...",
          code: "the {{blank}}",
          bank: ["operator", "presenter", "editor"],
          answer: "operator",
          feedback: {
            "presenter": "The presenter is on camera. The operator sits at the graphics desk - you'll meet their screen in Unit 7.",
            "editor": "The editor cuts the story's pictures. The person at the graphics desk is the operator - you'll meet their screen in Unit 7."
          }
        },
        {
          type: "predict",
          prompt: "You press PLAY on the stage and the strap comes in. Which button takes it back off air - PLAY or STOP?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>" },
          options: [
            { text: "STOP", correct: true,
              feedback: "Full cycle complete: PLAY on, STOP off. That's the rhythm of every graphic on air." },
            { text: "PLAY",
              feedback: "PLAY already brought it on. The button that takes a graphic OFF air is STOP." }
          ]
        }
      ]
    },

    {
      id: "1.3", title: "The empty stage",
      concept: "The canvas is a fixed 1920x1080 frame with a transparent background, laid over the program video.",
      explain: "Your graphic is drawn on an invisible sheet exactly 1920 pixels wide and 1080 tall, laid over the video. Anywhere you don't draw stays see-through - that's why the news picture shows behind the strap.",
      exercises: [
        {
          type: "predict", kernel: true,
          prompt: "Here is the same strap over a checkerboard instead of the studio feed. What does the checkerboard mean?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", mode: "transparent", autoplay: true },
          options: [
            { text: "Nothing is drawn there - the video will show through.", correct: true,
              feedback: "Exactly. The checkerboard is the preview pattern for 'transparent' - on air, the program picture fills it." },
            { text: "The graphic is broken.",
              feedback: "It's the opposite of broken: the checkerboard is how we show see-through. On air, the program picture fills it." },
            { text: "That's the studio floor.",
              feedback: "The checkerboard never goes on air - it's a preview pattern that means 'transparent'." }
          ]
        },
        {
          type: "predict",
          prompt: "We play this same template during a football match instead of the news. What appears behind the strap?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", mode: "video", autoplay: true },
          options: [
            { text: "The match video.", correct: true,
              feedback: "The template rides on top of whatever the channel is showing - news, football, anything." },
            { text: "The news studio.",
              feedback: "The template doesn't contain any video. It rides on top of whatever the channel is showing." },
            { text: "A checkerboard.",
              feedback: "Checkerboard is preview-only. On air: the program picture." }
          ]
        },
        {
          type: "predict",
          prompt: "A designer fills the entire background with dark blue. What happens on air?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", autoplay: true },
          options: [
            { text: "The video is completely covered by blue.", correct: true,
              feedback: "Painted areas cover the video. Full-screen graphics do exactly this on purpose. A lower third must never." },
            { text: "The blue becomes invisible.",
              feedback: "Only undrawn areas are see-through. Painted areas cover the video." },
            { text: "Only the strap shows.",
              feedback: "Everything you draw shows - including a background you didn't mean to draw." }
          ],
          applyOnAnswer: {
            html: '<div class="gfx fullscreen"><div>&nbsp;</div></div>' +
                  '<div class="gfx"><div>Maria Kranz</div><div>News Anchor</div></div>',
            css: '#content .gfx.fullscreen{background:#0a1e4a;}',
            play: true
          }
        },
        {
          type: "fill",
          prompt: "The canvas is always the same size. Complete it.",
          code: "canvas: {{blank}} pixels",
          bank: ["1920 x 1080", "1280 x 720"],
          answer: "1920 x 1080",
          feedback: {
            "1280 x 720": "That's HD's little sibling. Broadcast graphics for SPX are authored at full HD: 1920 x 1080."
          }
        },
        {
          type: "predict",
          prompt: "The same strap, dropped in three places at once: floating mid-frame, sitting in the lower area, stretched full width. Which one looks like a real lower third?",
          render: {
            house: false, autoplay: true, mode: "video",
            html: '<div class="ph mid"><div>Maria Kranz</div><div>News Anchor</div></div>' +
                  '<div class="ph low"><div>Maria Kranz</div><div>News Anchor</div></div>' +
                  '<div class="ph wide"><div>Maria Kranz</div><div>News Anchor</div></div>',
            css: '.ph{position:absolute;background:#0a3d91;padding:16px 28px;border-radius:4px;' +
                 'box-shadow:0 8px 24px rgba(0,0,0,.4);}' +
                 '.ph div{color:#fff;font-size:38px;font-weight:700;line-height:1.15;}' +
                 '.ph div + div{font-size:24px;font-weight:400;color:#dbe4f5;margin-top:5px;}' +
                 '.mid{left:660px;top:420px;}' +
                 '.low{left:120px;bottom:130px;}' +
                 '.wide{left:0;right:0;bottom:0;border-radius:0;text-align:center;}'
          },
          options: [
            { text: "Sitting in the lower area.", correct: true,
              feedback: "That's the spot that named it. Unit 4 teaches exactly where - and why." },
            { text: "Floating mid-frame.",
              feedback: "Lower thirds live in the lower part of the frame - the lower third of it. Unit 4 teaches exactly where." },
            { text: "Stretched full width.",
              feedback: "Lower thirds live in the lower part of the frame - the lower third of it. Unit 4 teaches exactly where." }
          ]
        }
      ]
    },

    {
      id: "1.4", title: "Tag anatomy",
      concept: "An element = opening tag + content + closing tag.",
      explain: "Each piece of a graphic is written as an element: an opening tag like <div>, the content, and a closing tag like </div>. Tags are instructions and never show on screen; the content is what shows.",
      exercises: [
        {
          type: "observe", kernel: true,
          prompt: "This element is split into its three parts. Tap the opening tag.",
          render: { html: "<div>Maria Kranz</div>", autoplay: true },
          lines: ["<div>", "Maria Kranz", "</div>"],
          answer: 0,
          feedback: {
            1: "That's the content - the part that shows on screen. Tags wear angle brackets.",
            2: "That one has a slash - the slash means closing. Opening tags have none."
          }
        },
        {
          type: "predict",
          prompt: "What shows on screen from <div>Tomas Berg</div>?",
          options: [
            { text: "Tomas Berg", correct: true,
              feedback: "Only the content between the tags shows - watch it land on the strap." },
            { text: "<div>Tomas Berg</div>",
              feedback: "Tags never appear on screen - they're instructions to the machine. Only the content between them shows." },
            { text: "div",
              feedback: "The tag's name is for the machine too. Viewers only ever see content." }
          ],
          applyOnAnswer: { html: "<div>Tomas Berg</div>", play: true }
        },
        {
          type: "fix",
          prompt: "'Tomas Berg' is still on screen, but it came up as a big heading, not the small second line: the 'Sports Tonight' element never closes, so it swallowed the line after it. Tap the tag that's wrong.",
          render: { html: "<div>Sports Tonight<div>\n<div>Tomas Berg</div>", autoplay: true },
          tokens: ["<div>", "Sports Tonight", "<div>", "<div>", "Tomas Berg", "</div>"],
          answer: 2,
          fixedToken: "</div>",
          fixedRender: { html: "<div>Sports Tonight</div>\n<div>Tomas Berg</div>", play: true },
          feedback: {
            0: "That opening tag is fine - 'Sports Tonight' needs it. Look at how that element ends.",
            1: "The words are fine. The problem is a tag: something was opened and never closed.",
            default: "Line 2 is fine. The problem starts earlier: something was opened and never closed."
          }
        },
        {
          type: "fill",
          prompt: "Complete the element.",
          code: "<div>Alexandra Rivera{{blank}}",
          bank: ["</div>", "<div>", "<//div>", "(/div)"],
          answer: "</div>",
          slot: "html",
          render: { autoplay: true },
          feedback: {
            "<div>": "That opens another element. Closing tags carry one slash before the name: </div>.",
            "<//div>": "One slash only - </div>.",
            "(/div)": "See it stuck on screen? Tags always use angle brackets < >, never parentheses - the machine read that as content."
          }
        },
        {
          type: "arrange",
          prompt: "Build the element that puts James Okafor on the strap.",
          blocks: ["<div>", "James Okafor", "</div>"],
          slot: "html",
          render: { autoplay: true },
          feedback: { default: "An element reads left to right: opening tag, then content, then closing tag." }
        },
        {
          type: "predict",
          prompt: "True or false: the viewer at home can see the word 'div'.",
          options: [
            { text: "False", correct: true,
              feedback: "Never. Tags are instructions - only content ever reaches the screen." },
            { text: "True",
              feedback: "Never. If a viewer ever does see a tag on air, something is broken - you'll fix exactly that bug in Unit 2." }
          ]
        }
      ]
    },

    {
      id: "1.5", title: "Change the words",
      concept: "The text between the tags is exactly what shows - editing it (and nothing else) changes the screen.",
      explain: "To change what a graphic says, change the text between the tags - nothing else. The tags stay; the words are yours.",
      exercises: [
        {
          type: "observe",
          prompt: "Maria Kranz just became Tomas Berg on screen. Tap the only part of the element that changed in the code.",
          render: { html: "<div>Tomas Berg</div><div>News Anchor</div>", autoplay: true },
          lines: ["<div>", "Tomas Berg", "</div>"],
          answer: 1,
          feedback: {
            0: "The tags didn't move. Edits happen between them.",
            2: "The tags didn't move. Edits happen between them."
          }
        },
        {
          type: "fill", kernel: true,
          prompt: "Make the strap show Alexandra Rivera.",
          code: "<div>{{blank}}</div>",
          bank: ["Alexandra Rivera", "<Alexandra Rivera>", "\"Alexandra Rivera\""],
          answer: "Alexandra Rivera",
          slot: "html",
          render: { html: "<div>Maria Kranz</div>", autoplay: true },
          feedback: {
            "<Alexandra Rivera>": "The name vanished - the machine took it for a tag. Angle brackets create tags; a name is content - no brackets.",
            "\"Alexandra Rivera\"": "See the quote marks on screen? Content shows exactly as written - quotes included. Leave them out."
          }
        },
        {
          type: "build",
          prompt: "Tonight's rundown changed - a new presenter is on. Update both lines to match the card, then press PLAY.",
          card: { name: "James Okafor", title: "Political Correspondent" },
          template: "<div>{{name}}</div>\n<div>{{title}}</div>",
          slot: "html",
          fields: [
            { key: "name", label: "Name line", bank: ["James Okafor", "Maria Kranz", "Political Correspondent"],
              answer: "James Okafor" },
            { key: "title", label: "Title line", bank: ["Political Correspondent", "News Anchor", "James Okafor"],
              answer: "Political Correspondent" }
          ],
          successFeedback: "On air this is exactly how it will read - always match the card, capitals included.",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", autoplay: true }
        },
        {
          type: "predict",
          prompt: "The strap's line came up empty, and 'Maria Kranz' shows as small plain text with no styling. The code reads <div></div>Maria Kranz. What happened?",
          render: { html: "<div></div>Maria Kranz", autoplay: true },
          options: [
            { text: "The name sits outside the tags, so the element between them holds nothing.", correct: true,
              feedback: "Right - and watch: moved back between the tags, the name fills the strap and gets its styling. Content belongs between the opening and closing tag." },
            { text: "The name is spelled wrong.",
              feedback: "Spelling is fine - position isn't. Where does content belong relative to the tags?" },
            { text: "PLAY wasn't pressed.",
              feedback: "It's on air already - just in the wrong place. The code decides where, not the button." }
          ],
          applyOnAnswer: { html: "<div>Maria Kranz</div>", play: true }
        },
        {
          type: "predict",
          prompt: "You change <div>HIFK 3 - 2 TPS</div> to <div>HIFK 4 - 2 TPS</div> and press PLAY. What does the score strap show?",
          render: { html: "<div>HIFK 3 - 2 TPS</div>", autoplay: true },
          options: [
            { text: "HIFK 4 - 2 TPS", correct: true,
              feedback: "Goal confirmed. The text between the tags is exactly what shows." },
            { text: "Still HIFK 3 - 2 TPS",
              feedback: "The screen always says what the code says - and the code now says 4." },
            { text: "The graphic breaks.",
              feedback: "Changing the words never breaks a graphic - remember 1.1. The text in the file is what the screen shows." }
          ],
          applyOnAnswer: { html: "<div>HIFK 4 - 2 TPS</div>", play: true }
        }
      ]
    },

    {
      id: "1.6", title: "div and span",
      concept: "A div makes a line/box of its own; a span marks a piece inside a line so it can be treated differently.",
      explain: "A <div> gets its own line or box on screen. A <span> wraps a few words inside a line - like just the score, or just the word LIVE - so that piece can get its own look.",
      exercises: [
        {
          type: "observe",
          prompt: "The 3 is highlighted on screen. Tap the code responsible.",
          render: { html: "<div>HIFK <span>3</span> - 2 TPS</div>", autoplay: true },
          lines: ["<div>", "  HIFK", "  <span>3</span>", "  - 2 TPS", "</div>"],
          answer: 2,
          feedback: { default: "The highlight covers only the 3. Look for the tags wrapped around exactly that piece - a span inside the line." }
        },
        {
          type: "predict",
          prompt: "We wrap the 2 in a <span> as well. What changes?",
          render: { html: "<div>HIFK <span>3</span> - 2 TPS</div>", autoplay: true },
          options: [
            { text: "The 2 gets the same highlight.", correct: true,
              feedback: "There it is. Spans mark pieces inside a line so they can share a look." },
            { text: "The 2 moves to its own line.",
              feedback: "That's what a div would do. Spans stay in the line." },
            { text: "Nothing.",
              feedback: "Spans exist exactly so a piece of a line can be treated differently - here, highlighted." }
          ],
          applyOnAnswer: { html: "<div>HIFK <span>3</span> - <span>2</span> TPS</div>", play: true }
        },
        {
          type: "predict", kernel: true,
          prompt: "We change the span around the 3 into a div: <div>3</div>. What happens?",
          render: { html: "<div>HIFK <span>3</span> - 2 TPS</div>", autoplay: true },
          options: [
            { text: "The 3 breaks onto its own line - the score falls apart.", correct: true,
              feedback: "See it fall apart? A div always takes its own line - that's the whole difference." },
            { text: "The highlight gets brighter.",
              feedback: "div vs span isn't about strength - it's about whether the piece gets its own line." },
            { text: "Nothing changes.",
              feedback: "Try it - watch the render. A div always takes its own line." }
          ],
          applyOnAnswer: { html: "<div>HIFK <div>3</div> - 2 TPS</div>", play: true }
        },
        {
          type: "fill",
          prompt: "Highlight only the word LIVE - without breaking the sentence.",
          code: "<div>{{blank}} from the Arena</div>",
          bank: ["<span>LIVE</span>", "<div>LIVE</div>"],
          answer: "<span>LIVE</span>",
          slot: "html",
          render: { autoplay: true },
          feedback: {
            "<div>LIVE</div>": "See it? The div pushed LIVE onto its own line, splitting the sentence. To mark words inside a line: span."
          }
        },
        {
          type: "arrange",
          prompt: "Build the away-team line with the score highlighted.",
          blocks: ["<div>", "TPS ", "<span>", "2", "</span>", "</div>"],
          slot: "html",
          render: { autoplay: true },
          feedback: { default: "The div wraps the whole line; the span wraps only the 2, inside it. Inside-out, like boxes." }
        },
        {
          type: "predict",
          prompt: "Two jobs: a new LINE for the presenter's title, and a highlighted WORD inside a headline. Which tag gets which?",
          options: [
            { text: "Line: div. Word: span.", correct: true,
              feedback: "Own line -> div. Inside a line -> span. That rule carries the whole course." },
            { text: "Line: span. Word: div.",
              feedback: "Own line -> div. Inside a line -> span." },
            { text: "Both get a div.",
              feedback: "A div around the word would break the headline apart. Inside a line -> span." }
          ]
        }
      ]
    },

    {
      id: "cp1", title: "Checkpoint: Retitle the strap",
      concept: "Change every word on a real strap and put it on air.",
      explain: "Tonight's rundown card: Sofia Lindqvist - Chief Political Editor, and the badge must read EXCLUSIVE. Update the strap, play it out, and read the transparency view.",
      isCheckpoint: true,
      exercises: [
        {
          type: "build", kernel: true,
          prompt: "Update the name, the title line and the badge to match tonight's card. The wrapper box stays as it is - you only edit text.",
          card: { name: "Sofia Lindqvist", title: "Chief Political Editor", badge: "EXCLUSIVE" },
          template: "<div>\n  <div>{{name}} <span>{{badge}}</span></div>\n  <div>{{title}}</div>\n</div>",
          slot: "html",
          fields: [
            { key: "name", label: "Name", bank: ["Sofia Lindqvist", "Sofia Lindquist", "Maria Kranz"],
              answer: "Sofia Lindqvist" },
            { key: "badge", label: "Badge", bank: ["EXCLUSIVE", "LIVE", "exclusive"],
              answer: "EXCLUSIVE" },
            { key: "title", label: "Title", bank: ["Chief Political Editor", "News Anchor", "Political Editor"],
              answer: "Chief Political Editor" }
          ],
          successFeedback: "Every word matches the card - check the spelling and capitals against it, always. Press PLAY and watch it over the video: broadcast-ready.",
          render: { html: "<div>\n  <div>Maria Kranz <span>LIVE</span></div>\n  <div>News Anchor</div>\n</div>", autoplay: true }
        },
        {
          type: "predict",
          prompt: "Flip to the transparency view: why is everything around the strap checkered?",
          render: { html: "<div>\n  <div>Sofia Lindqvist <span>EXCLUSIVE</span></div>\n  <div>Chief Political Editor</div>\n</div>", mode: "transparent", autoplay: true },
          options: [
            { text: "Nothing is drawn there - on air, the program picture shows through.", correct: true,
              feedback: "Checkpoint cleared. One strap, three edits, played over video and read in transparency - you can retitle any strap now." },
            { text: "The graphic is broken.",
              feedback: "The opposite - the checkerboard is the preview pattern for 'transparent'. On air the program picture fills it." },
            { text: "The checkerboard goes on air behind the strap.",
              feedback: "The checkerboard never goes on air - it only marks the see-through areas in preview." }
          ]
        }
      ]
    }
  ]
});
