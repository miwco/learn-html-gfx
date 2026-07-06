// Unit 0 - Welcome to On-Air. Source of truth: lessons/unit-00.md
// This file is the authoring exemplar for content units: schema per app/SCHEMA.md.
// Every exercise that names a graphic SHOWS that graphic on the stage: the render's
// `kind` (lowerthird | bug | ticker | fullscreen) matches the graphic in the prompt.
window.COURSE_DATA = window.COURSE_DATA || [];
COURSE_DATA.push({
  id: 0,
  title: "Welcome to On-Air",
  promise: "Name the graphics you see on TV, and say which language makes what.",
  lessons: [

    {
      id: "0.1", title: "The graphics you already know",
      concept: "The four everyday broadcast graphics and their names.",
      explain: "You've watched these your whole life - today they get names. Each one plays out on the screen above; name what you see. Every one of them is something you'll build in this course.",
      exercises: [
        {
          type: "predict",
          prompt: "A name strap just slid in, low on the screen. It's called a lower third. Why that name, do you think?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "It lives in the lower third of the picture.", correct: true,
              feedback: "Exactly - the position names it. Look where it sits: the bottom third of the frame." },
            { text: "It's one third of the screen wide.",
              feedback: "Widths vary - this one isn't a third wide. It's the position, not the size, that names it." },
            { text: "There are three of them.",
              feedback: "Just one strap, sitting in the lower third of the frame. Position is the clue." }
          ]
        },
        {
          type: "predict", kernel: true,
          prompt: "Now look at the top corner: a small channel mark sits up there and never leaves, all show long. What's that corner mark called?",
          render: { html: "<div>NN</div>", kind: "bug", mode: "video", autoplay: true },
          options: [
            { text: "The corner bug.", correct: true,
              feedback: "The bug is the one graphic that never leaves - so you always know the channel." },
            { text: "The lower third.",
              feedback: "Straps come and go with each story. This little mark stays put in the corner: it's the bug." },
            { text: "The ticker.",
              feedback: "The ticker is a moving band along the bottom. This is the still mark up in the corner: the bug." }
          ]
        },
        {
          type: "predict",
          prompt: "The election results just took over the whole picture, edge to edge. What kind of graphic fills the entire frame like this?",
          render: { html: "<div>ELECTION 2026</div><div>Live results tonight</div>", kind: "fullscreen", mode: "video", autoplay: true },
          options: [
            { text: "The full-screen.", correct: true,
              feedback: "Full-screens replace the picture on purpose - the whole frame becomes the graphic." },
            { text: "The ticker.",
              feedback: "A ticker is a thin band along the bottom. Covering the entire frame is the full-screen's job." },
            { text: "The corner bug.",
              feedback: "The bug is the smallest mark there is. Taking over the whole screen is the full-screen." }
          ]
        },
        {
          type: "predict",
          prompt: "Down at the very bottom edge, a band rides across with a headline crawling through it non-stop. Name it.",
          render: { html: "<div><span>BREAKING</span> Storm warning issued along the south coast tonight</div>", kind: "ticker", mode: "video", autoplay: true },
          options: [
            { text: "The ticker.", correct: true,
              feedback: "The ticker rides along the bottom, always moving, never done." },
            { text: "The lower third.",
              feedback: "A lower third belongs to one story and sits above the bottom edge. The crawling band is the ticker." },
            { text: "The full-screen.",
              feedback: "A full-screen covers everything. This thin band only rides the bottom edge: the ticker." }
          ]
        }
      ]
    },

    {
      id: "0.2", title: "It's a web page",
      concept: "Broadcast graphics are built with the same technology as websites.",
      explain: "That lower third above is not a video clip and not a picture file - it's a web page. If you can build a web page, you can build TV graphics.",
      exercises: [
        {
          type: "predict", kernel: true,
          prompt: "That exact strap could open in an ordinary browser tab, or play out live over the video like it is now. What's the difference between the web page and the on-air graphic?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "None - it's the same page, played out over the video.", correct: true,
              feedback: "That's the whole secret. One file, two screens." },
            { text: "The TV version is a video file.",
              feedback: "No video was rendered. The page itself is shown live on air - which is why its text can change every show." },
            { text: "TV needs a special image format.",
              feedback: "No conversion, no export. The channel's playout software shows the web page directly." }
          ]
        },
        {
          type: "predict",
          prompt: "So what do you actually need to be able to create modern broadcast graphics like this one?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "The same skills used to make web pages.", correct: true,
              feedback: "That's the plan for this course. The playout software - SPX with CasparCG - is free and open source." },
            { text: "An expensive broadcast-only design suite.",
              feedback: "The playout software this course targets is free and open source. The graphics themselves are plain web files." },
            { text: "A TV-engineering degree.",
              feedback: "The engineers keep the signal running. The graphics are made by people who learned exactly what you're about to learn." }
          ]
        },
        {
          type: "predict",
          prompt: "This strap is a file on disk. What does its name end in?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "lowerthird.html", correct: true,
              feedback: "An HTML page is live - its text can change every show." },
            { text: "lowerthird.mp4",
              feedback: "A video can't change tonight's presenter name. An HTML page is live - its text changes every show." },
            { text: "lowerthird.png",
              feedback: "A picture is frozen. The template has to update, animate, and respond - that takes a page, not a picture." }
          ]
        },
        {
          type: "predict",
          prompt: "This file is called a template, not just a page. Why?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "Parts of it - like the name - get filled in fresh for every show.", correct: true,
              feedback: "Exactly. In Unit 7 you'll see who fills them in, and how." },
            { text: "Because it's unfinished.",
              feedback: "It's completely finished - it just has slots. The design is fixed; tonight's content drops in." },
            { text: "Because it's a copy of another file.",
              feedback: "No copying involved: one template serves every episode, with new content each time." }
          ]
        }
      ]
    },

    {
      id: "0.3", title: "Three languages, three jobs",
      concept: "HTML says what's there; CSS says how it looks; JS says what it does.",
      explain: "Every graphic is built from three languages, and each has exactly one job. HTML is the content - the actual words and pieces. CSS is the styling - colour, font, size, position. JavaScript is the behaviour - the motion now, and the live data later. Same strap on screen, three layers.",
      exercises: [
        {
          type: "predict",
          prompt: "Look at the strap. The words themselves - \"Maria Kranz\" and \"News Anchor\" - are the job of which language?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "HTML - the content.", correct: true,
              feedback: "Right. HTML is what's there: the words and the pieces. Nothing exists on screen until HTML puts it there." },
            { text: "CSS - the styling.",
              feedback: "CSS dresses the words but never chooses them. The words themselves are HTML." },
            { text: "JavaScript - the behaviour.",
              feedback: "JS moves things and feeds in data later. The plain words on screen are HTML's job." }
          ]
        },
        {
          type: "predict",
          prompt: "Now the looks: the blue box, the white font, the size, the spot near the bottom. Which language controls all of that?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "CSS - the styling.", correct: true,
              feedback: "Yes. Colour, font, size, position - every look is CSS." },
            { text: "HTML - the content.",
              feedback: "HTML puts the words there but leaves them plain. The blue box and white font are CSS." },
            { text: "JavaScript - the behaviour.",
              feedback: "JS handles motion, not the resting look. A colour is a look: that's CSS." }
          ]
        },
        {
          type: "predict",
          prompt: "And the strap sliding up into frame, then back out again - the movement. Whose job is that?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "JavaScript - the behaviour.", correct: true,
              feedback: "Right. Motion and timing - how it enters, exits and changes - is JavaScript's job in this course." },
            { text: "CSS - the styling.",
              feedback: "Close - CSS can move things too, but here the choreography belongs to JS. Looks are CSS; motion is JS." },
            { text: "HTML - the content.",
              feedback: "HTML is only the words. How they move is behaviour: JavaScript." }
          ]
        },
        {
          type: "predict", kernel: true,
          prompt: "Time to prove it. When you answer, we switch this strap's CSS off. First predict: with CSS gone, what do you expect to lose?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "The looks - colour, font, position.", correct: true,
              feedback: "See it? The words survived - that's HTML - but every colour, font and position was CSS. It's naked now." },
            { text: "The words.",
              feedback: "The words are all still there, just undressed. Words are HTML's job, and HTML stayed put." },
            { text: "The graphic entirely.",
              feedback: "It's still there - only naked. HTML kept the words; only the CSS looks fell away." }
          ],
          applyOnAnswer: { css: "#content, #content * { all: revert; font-size: 40px; color: #000; background: #fff; }", play: true }
        },
        {
          type: "predict",
          prompt: "Three languages - which one will you meet first, starting in the very next unit?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "HTML - the content.", correct: true,
              feedback: "Content first: you can't dress or move what isn't there yet. CSS arrives in Unit 3, JavaScript in Unit 6." },
            { text: "CSS - the styling.",
              feedback: "You can't style something that doesn't exist yet. What's-there comes first: HTML." },
            { text: "JavaScript - the behaviour.",
              feedback: "You can't move something that doesn't exist yet. What's-there comes first: HTML." }
          ]
        }
      ]
    },

    {
      id: "cp0", title: "Checkpoint: Graphics spotter",
      concept: "Watch tonight's broadcast like a graphics person.",
      explain: "Real graphics play out above. Name each one, then answer the language questions - no code yet, just the eye.",
      isCheckpoint: true,
      exercises: [
        {
          type: "predict",
          prompt: "The broadcast opens. A strap slides in over the presenter. Name it.",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "Lower third", correct: true, feedback: "Named by where it lives - the bottom third." },
            { text: "Corner bug", feedback: "The bug is the small corner mark. This is the strap down in the lower third." },
            { text: "Full-screen", feedback: "The picture is still visible behind it - full-screens cover everything." }
          ]
        },
        {
          type: "predict", kernel: true,
          prompt: "Cut to sport. The score HIFK 3 - 2 TPS sits in the lower third, and a small NN mark stays up in the top corner the whole match. What is that corner mark called?",
          render: { house: false, mode: "video", autoplay: true,
            html: '<div class="gfx bug"><div>NN</div></div>' +
                  '<div class="gfx"><div>HIFK <span>3</span> - 2 TPS</div></div>' },
          options: [
            { text: "The corner bug", correct: true, feedback: "Always there in the corner, so you always know the channel - even mid-match." },
            { text: "The ticker", feedback: "The ticker is a band that moves along the bottom. The still mark up in the corner is the bug." },
            { text: "A lower third", feedback: "The score strap is the lower third here. The small mark up in the corner is the bug." }
          ]
        },
        {
          type: "predict",
          prompt: "Back to the studio strap. Its entrance feels too slow tonight. Which language would you touch to fix the timing?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "JavaScript", correct: true, feedback: "Motion and timing are JS's job - the choreography." },
            { text: "CSS", feedback: "Close - CSS can animate too, but in this course the choreography belongs to JS. Looks are CSS; motion is JS." },
            { text: "HTML", feedback: "HTML is what's there. The speed of the movement is what-it-does: JS." }
          ]
        },
        {
          type: "predict",
          prompt: "Last one: every graphic you saw tonight could be a file ending in .html - true?",
          render: { html: "<div>Maria Kranz</div><div>News Anchor</div>", kind: "lowerthird", mode: "video", autoplay: true },
          options: [
            { text: "True", correct: true,
              feedback: "True. And from the next lesson on, you'll be reading those files. Welcome to on-air." },
            { text: "False",
              feedback: "It's true - you saw it in 0.2: one file, two screens. Every graphic tonight can be a web page." }
          ]
        }
      ]
    }
  ]
});
