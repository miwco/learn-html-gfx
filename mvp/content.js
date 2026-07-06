// Course content as DATA (the architecture the brief asks for: exercises are data,
// the player is a generic engine). This MVP encodes a taste of Unit 0 plus Unit 1
// fully playable through Checkpoint 1.
//
// Exercise types the player understands:
//   observe  - tap the code line/element responsible; cross-lights the render
//   predict  - multiple choice; each option carries its own feedback; optional
//              applyOnAnswer updates the render so the student SEES the outcome
//   fill     - a code slice with a {{blank}}; pick a chip; render updates live
//   fix      - tap the wrong token among the code; render corrects on success
//   arrange  - order shuffled blocks (Parsons); assembled code drives the render
//   build    - checkpoint: fill several fields, PLAY, compare to a target card
//
// Every exercise may carry a `render` spec: { bodyHTML, mode }. The player owns
// PLAY/STOP and the video/transparency toggle around it.

const COURSE = {
  units: [
    /* ---------------- UNIT 0 (taste) ---------------- */
    {
      id: 0, title: "Welcome to On-Air",
      lessons: [
        {
          id: "0.1", title: "The graphics you already know",
          concept: "The four everyday broadcast graphics and their names.",
          explain: "You've watched these your whole life - today they get names. " +
            "Every one is something you'll build in this course.",
          exercises: [
            {
              type: "predict",
              prompt: "This name strap sits in the lower part of the frame. " +
                "It's called a lower third. Why 'lower third'?",
              render: { bodyHTML: "<div>Maria Kranz</div><div>News Anchor</div>",
                        mode: "video", autoplay: true },
              options: [
                { text: "It lives in the lower third of the picture.", correct: true,
                  feedback: "Exactly - position names it, not size or content." },
                { text: "It is one third of the screen wide.",
                  feedback: "Widths vary. It's the position that names it - look where it sits." },
                { text: "There are always three of them.",
                  feedback: "Just one, sitting in the lower third of the frame." }
              ]
            },
            {
              type: "predict",
              prompt: "The channel wants viewers to always know what they're watching, " +
                "no matter when they tune in. Which graphic does that job?",
              options: [
                { text: "The corner bug (the little logo in the corner).", correct: true,
                  feedback: "The bug is the one that never leaves the screen." },
                { text: "The lower third.",
                  feedback: "Straps come and go with the story. The bug is always there." },
                { text: "The ticker.",
                  feedback: "The ticker carries headlines - the bug carries the channel's identity." }
              ]
            }
          ]
        },
        {
          id: "0.3", title: "Three languages, three jobs",
          concept: "HTML says what's there; CSS says how it looks; JS says what it does.",
          explain: "Everything on stage is HTML. How it's dressed and lit is CSS. " +
            "How it enters and changes is JavaScript. Try switching them off.",
          exercises: [
            {
              type: "predict",
              prompt: "Watch: we switch CSS OFF. What did we just lose?",
              render: { bodyHTML: "<div>Maria Kranz</div><div>News Anchor</div>",
                        mode: "video", autoplay: true, cssOffOnAnswer: true },
              options: [
                { text: "The looks - colours, fonts, position.", correct: true,
                  feedback: "The words survived (HTML), PLAY still works (JS) - " +
                    "but every colour, font and position was CSS." },
                { text: "The words.",
                  feedback: "Read the corner - the words are all still there, just undressed." },
                { text: "The graphic entirely.",
                  feedback: "It's still there - naked. Only its appearance was CSS." }
              ]
            },
            {
              type: "predict",
              prompt: "Which language do you touch to make the entrance slower?",
              options: [
                { text: "JavaScript - it owns the motion.", correct: true,
                  feedback: "What's there = HTML. How it looks = CSS. What it does = JS." },
                { text: "HTML.",
                  feedback: "HTML is the words and structure - not the motion." },
                { text: "CSS.",
                  feedback: "CSS dresses it; the choreography is JavaScript's job." }
              ]
            }
          ]
        }
      ]
    },

    /* ---------------- UNIT 1 (full) ---------------- */
    {
      id: 1, title: "Hello, Graphic",
      lessons: [
        {
          id: "1.1", title: "Graphics are code",
          concept: "Each visible thing corresponds to a line of code.",
          explain: "You know the graphic is a web page. Now open one: each thing on " +
            "screen comes from one line. The code always says what the screen says.",
          exercises: [
            {
              type: "observe",
              prompt: "Tap the line of code that puts the presenter's NAME on screen.",
              render: { bodyHTML: "<div>NIGHTLY NEWS</div><div>Maria Kranz</div>" +
                        "<div>News Anchor</div>", mode: "video", autoplay: true },
              lines: ["<div>NIGHTLY NEWS</div>", "<div>Maria Kranz</div>",
                      "<div>News Anchor</div>"],
              answer: 1,
              feedback: {
                0: "That's the show label at the top. Match the words to the name exactly.",
                2: "That line makes the smaller second line. Look for the name itself."
              }
            },
            {
              type: "predict",
              prompt: "We change <div>Maria Kranz</div> to <div>Tomas Berg</div> " +
                "and press PLAY. What happens?",
              render: { bodyHTML: "<div>NIGHTLY NEWS</div><div>Maria Kranz</div>" +
                        "<div>News Anchor</div>", mode: "video" },
              applyOnAnswer: { bodyHTML: "<div>NIGHTLY NEWS</div><div>Tomas Berg</div>" +
                        "<div>News Anchor</div>", play: true },
              options: [
                { text: "The strap shows Tomas Berg instead.", correct: true,
                  feedback: "The graphic is drawn live from the code, every time." },
                { text: "Nothing changes until we film new video.",
                  feedback: "It isn't video - it's drawn live from the code." },
                { text: "Both lines change.",
                  feedback: "Only the line we edited changes. Each screen line has its own code." }
              ]
            }
          ]
        },
        {
          id: "1.2", title: "PLAY and STOP",
          concept: "An operator plays a graphic on air and stops it off; the template responds.",
          explain: "In a control room an operator presses PLAY to bring a graphic on air " +
            "and STOP to take it off. Your template decides what those do.",
          exercises: [
            {
              type: "predict",
              prompt: "Press PLAY above, watch the strap arrive, then answer: what did PLAY do?",
              render: { bodyHTML: "<div>Maria Kranz</div><div>News Anchor</div>",
                        mode: "video" },
              options: [
                { text: "Brought the graphic on air.", correct: true,
                  feedback: "PLAY performs the graphic - like pressing play on a song." },
                { text: "Started the studio video.",
                  feedback: "The video was already running - the operator controls the graphic on top." },
                { text: "Saved the file.",
                  feedback: "Nothing was saved - PLAY performs the graphic." }
              ]
            },
            {
              type: "predict",
              prompt: "The director says: 'Lose the strap.' Which button does the operator press?",
              options: [
                { text: "STOP", correct: true,
                  feedback: "PLAY brings a graphic ON air; STOP takes it off." },
                { text: "PLAY",
                  feedback: "PLAY brings a graphic ON air. To remove it, press STOP." }
              ]
            }
          ]
        },
        {
          id: "1.3", title: "The empty stage",
          concept: "A fixed 1920x1080 canvas with a transparent background, over the video.",
          explain: "Your graphic is drawn on an invisible sheet 1920x1080, laid over the " +
            "video. Anywhere you don't draw stays see-through. Flip to the checker view.",
          exercises: [
            {
              type: "predict",
              prompt: "Flip the view toggle above to transparency. What does the checkerboard mean?",
              render: { bodyHTML: "<div>Maria Kranz</div><div>News Anchor</div>",
                        mode: "transparent", autoplay: true },
              options: [
                { text: "Nothing is drawn there - the video shows through.", correct: true,
                  feedback: "The checker is how we show 'see-through'. On air, the picture fills it." },
                { text: "The graphic is broken.",
                  feedback: "The opposite of broken - it's how we display transparency." },
                { text: "That's the studio floor.",
                  feedback: "The checker never goes on air - it means 'transparent'." }
              ]
            },
            {
              type: "predict",
              prompt: "We play this same template during a football match instead of the news. " +
                "What appears behind the strap?",
              options: [
                { text: "The match video.", correct: true,
                  feedback: "The template has no video of its own - it rides on top of whatever's showing." },
                { text: "The news studio.",
                  feedback: "The template doesn't contain the studio - it rides on top of any feed." },
                { text: "A checkerboard.",
                  feedback: "Checker is preview-only. On air: the program picture." }
              ]
            }
          ]
        },
        {
          id: "1.4", title: "Tag anatomy",
          concept: "An element = opening tag + content + closing tag.",
          explain: "Each piece is an element: an opening tag like <div>, the content, " +
            "and a closing tag like </div>. Tags are instructions and never show on screen.",
          exercises: [
            {
              type: "fix",
              prompt: "The strap's second line vanished. The 'Sports Tonight' element was " +
                "never closed, so it swallowed the line after it. Tap the tag that's wrong.",
              render: { bodyHTML: "<div>Sports Tonight<div>Tomas Berg</div>",
                        mode: "video", autoplay: true },
              tokens: ["<div>", "Sports Tonight", "<div>", "Tomas Berg", "</div>"],
              answer: 2,
              fixedToken: "</div>",
              fixedRender: { bodyHTML: "<div>Sports Tonight</div><div>Tomas Berg</div>",
                             play: true },
              feedback: { default: "Line 2 is fine. Something earlier was opened and never closed - " +
                "find the second opening tag that should be a closing tag." }
            },
            {
              type: "fill",
              prompt: "Complete the element that puts James Okafor on the strap.",
              code: "<div>James Okafor{{blank}}",
              bank: ["</div>", "<div>", "<//div>"],
              answer: "</div>",
              render: { mode: "video", autoplay: true },
              renderFromCode: true,
              feedback: {
                "<div>": "That OPENS another element. Closing tags carry one slash: </div>",
                "<//div>": "One slash only - </div>"
              }
            }
          ]
        },
        {
          id: "1.5", title: "Change the words",
          concept: "The text between the tags is exactly what shows - edit it, nothing else.",
          explain: "To change what a graphic says, change the text between the tags. " +
            "The tags stay; the words are yours.",
          exercises: [
            {
              type: "fill",
              prompt: "Make the strap show Alexandra Rivera. Watch what each choice does.",
              code: "<div>{{blank}}</div>",
              bank: ["Alexandra Rivera", "<Alexandra Rivera>", "\"Alexandra Rivera\""],
              answer: "Alexandra Rivera",
              render: { mode: "video", autoplay: true },
              renderFromCode: true,
              feedback: {
                "<Alexandra Rivera>": "Angle brackets create TAGS - watch the name vanish. " +
                  "A name is content: no brackets.",
                "\"Alexandra Rivera\"": "See the quote marks on air? Content shows exactly as " +
                  "written - quotes included. Leave them out."
              }
            },
            {
              type: "predict",
              prompt: "You change <div>HIFK 3 - 2 TPS</div> to <div>HIFK 4 - 2 TPS</div> " +
                "and press PLAY. What does the score bug show?",
              render: { bodyHTML: "<div>HIFK 3 - 2 TPS</div>", mode: "video" },
              applyOnAnswer: { bodyHTML: "<div>HIFK 4 - 2 TPS</div>", play: true },
              options: [
                { text: "HIFK 4 - 2 TPS", correct: true,
                  feedback: "The screen shows exactly what the code says." },
                { text: "HIFK 3 - 2 TPS",
                  feedback: "We changed the 3 to a 4 - the screen follows the code." }
              ]
            }
          ]
        },
        {
          id: "1.6", title: "div and span",
          concept: "<div> is its own line; <span> marks a piece inside a line.",
          explain: "A <div> gets its own line. A <span> wraps a few words inside a line - " +
            "like just the score - so that piece can get its own look (here, a highlight).",
          exercises: [
            {
              type: "observe",
              prompt: "The '3' is highlighted on screen. Tap the code responsible.",
              render: { bodyHTML: "<div>HIFK <span>3</span> - 2 TPS</div>",
                        mode: "video", autoplay: true },
              lines: ["<div>HIFK ", "<span>3</span>", " - 2 TPS</div>"],
              answer: 1,
              feedback: { default: "The highlight comes from the span wrapping the 3." }
            },
            {
              type: "predict",
              prompt: "We change the span around the 3 into a div: <div>3</div>. What happens?",
              render: { bodyHTML: "<div>HIFK <span>3</span> - 2 TPS</div>", mode: "video",
                        autoplay: true },
              applyOnAnswer: { bodyHTML: "<div>HIFK <div>3</div> - 2 TPS</div>", play: true },
              options: [
                { text: "The 3 breaks onto its own line - the score falls apart.", correct: true,
                  feedback: "A div always takes its own line. That's the div-vs-span difference." },
                { text: "The highlight gets brighter.",
                  feedback: "It's not about strength - it's about whether the piece gets its own line." },
                { text: "Nothing changes.",
                  feedback: "Watch the render - a div always takes its own line." }
              ]
            },
            {
              type: "fill",
              prompt: "Highlight only the word LIVE inside the line.",
              code: "<div><{{blank}}>LIVE</span> from the Arena</div>",
              bank: ["span", "div"],
              answer: "span",
              render: { mode: "video", autoplay: true },
              renderFromCode: true,
              feedback: {
                "div": "A div would push LIVE onto its own line, splitting the sentence. " +
                  "To mark words inside a line: span."
              }
            }
          ]
        },
        {
          id: "cp1", title: "Checkpoint 1: Retitle the strap",
          concept: "Put it together: change the strap to tonight's rundown, then play it.",
          explain: "Tonight's rundown: James Okafor, Political Correspondent, with an " +
            "EXCLUSIVE badge. Fill each part, then press PLAY and check it on air.",
          isCheckpoint: true,
          exercises: [
            {
              type: "build",
              prompt: "Set each part of the strap to match tonight's rundown card, then PLAY.",
              card: { name: "James Okafor", title: "Political Correspondent", badge: "EXCLUSIVE" },
              // template with three fillable fields; each has its own word bank
              template: "<div>{{name}} <span>{{badge}}</span></div><div>{{title}}</div>",
              fields: [
                { key: "name", label: "Name line",
                  bank: ["James Okafor", "Maria Kranz", "Tomas Berg"], answer: "James Okafor" },
                { key: "title", label: "Title line",
                  bank: ["Political Correspondent", "News Anchor", "Sports Reporter"],
                  answer: "Political Correspondent" },
                { key: "badge", label: "Badge",
                  bank: ["EXCLUSIVE", "LIVE", "BREAKING"], answer: "EXCLUSIVE" }
              ],
              mode: "video",
              successFeedback: "On air, and it matches the rundown card. That's a real edit to " +
                "a real template - you just did the job."
            }
          ]
        }
      ]
    }
  ]
};
