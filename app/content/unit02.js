// Unit 2 - Naming the Parts. Source of truth: lessons/unit-02.md
// Schema per app/SCHEMA.md. House style automatic; ids/classes appear from 2.3 on.
window.COURSE_DATA = window.COURSE_DATA || [];
COURSE_DATA.push({
  id: 2,
  title: "Naming the Parts",
  promise: "Change any text or image in a template and know exactly which element you touched.",
  lessons: [

    {
      id: "2.1", title: "Boxes inside boxes",
      concept: "Elements can contain elements; children sit inside their parent's box and move with it.",
      explain: "Elements can live inside other elements. The strap is one big box; the name line and the title line are boxes inside it. Move the parent, and everything inside moves with it.",
      exercises: [
        {
          type: "observe", kernel: true,
          prompt: "Tap the element that contains the whole strap.",
          render: { html: "<div>\n  <div>Maria Kranz</div>\n  <div>News Anchor</div>\n</div>", autoplay: true },
          lines: ["<div>", "  <div>Maria Kranz</div>", "  <div>News Anchor</div>", "</div>"],
          answer: 0,
          feedback: {
            1: "That box holds one line. Look for the box that holds both lines - it wraps everything.",
            2: "That box holds one line. Look for the box that holds both lines - it wraps everything.",
            3: "Close - that tag ends the outer box. Tap where the box opens."
          }
        },
        {
          type: "predict",
          prompt: "Press PLAY - the whole strap slides in as one piece. Did we animate each line separately?",
          render: { html: "<div>\n  <div>Maria Kranz</div>\n  <div>News Anchor</div>\n</div>" },
          options: [
            { text: "No - the parent moved, and everything inside moved with it.", correct: true,
              feedback: "One parent, one move. That's why the wrapper box exists." },
            { text: "Yes, each line was animated on its own.",
              feedback: "Watch again: both lines move in perfect lockstep. One parent, one move - that's why the wrapper box exists." },
            { text: "The lines aren't related.",
              feedback: "They're siblings inside the same parent - the outline exercise showed the box that owns them both." }
          ]
        },
        {
          type: "predict",
          prompt: "We add <div>LIVE</div> inside the outer div, after the title line. Where does it appear?",
          render: { html: "<div>\n  <div>Maria Kranz</div>\n  <div>News Anchor</div>\n</div>", autoplay: true },
          options: [
            { text: "Inside the strap, as a third line.", correct: true,
              feedback: "There it is - children live, and move, inside their parent's box." },
            { text: "Outside the strap.",
              feedback: "It was placed inside the parent's tags, so it lives - and moves - inside the strap." },
            { text: "On top of the name.",
              feedback: "New children join the stack in code order: after the title means below the title." }
          ],
          applyOnAnswer: { html: "<div>\n  <div>Maria Kranz</div>\n  <div>News Anchor</div>\n  <div>LIVE</div>\n</div>", play: true }
        },
        {
          type: "arrange",
          prompt: "Build the sports strap: both lines inside one parent.",
          blocks: ["<div>", "  <div>Tomas Berg</div>", "  <div>Sports Reporter</div>", "</div>"],
          slot: "html",
          render: { autoplay: true },
          feedback: { default: "Both lines belong between the parent's opening <div> and its closing </div> - a block placed after the final </div> is no longer inside the wrapper." }
        },
        {
          type: "arrange",
          prompt: "In this arrangement the title line 'News Anchor' landed after the wrapper's closing </div>, outside the parent. Rebuild the strap so both lines sit between the parent's opening and closing tags.",
          blocks: ["<div>", "  <div>Maria Kranz</div>", "  <div>News Anchor</div>", "</div>"],
          slot: "html",
          render: { html: "<div>\n  <div>Maria Kranz</div>\n</div>\n<div>News Anchor</div>", autoplay: true },
          feedback: { default: "The title belongs between the parent's opening and closing tags - above the final </div>, not after it." }
        }
      ]
    },

    {
      id: "2.2", title: "Reading the tree",
      concept: "Closing tags match the most recently opened tag; indentation mirrors nesting.",
      explain: "Boxes close from the inside out - a closing tag always ends the most recently opened box. Indentation doesn't change anything on screen; it's there so YOU can see what's inside what.",
      exercises: [
        {
          type: "observe",
          prompt: "Tap the closing tag that belongs to the OUTER div.",
          render: { html: "<div>\n  <div>Maria Kranz</div>\n  <div>News Anchor</div>\n</div>", autoplay: true },
          lines: ["<div>", "  <div>Maria Kranz</div>", "  <div>News Anchor</div>", "</div>"],
          answer: 3,
          feedback: {
            0: "That's where the outer box opens. Its closing partner is elsewhere - boxes close from the inside out.",
            1: "That line's </div> closes the line opened just before it. Inside-out: the outer box closes last.",
            2: "That line's </div> closes the line opened just before it. Inside-out: the outer box closes last."
          }
        },
        {
          type: "predict",
          prompt: "The same strap flattened to one line: <div><div>Maria Kranz</div><div>News Anchor</div></div> - how many elements is this?",
          render: { html: "<div><div>Maria Kranz</div><div>News Anchor</div></div>", autoplay: true },
          options: [
            { text: "3", correct: true,
              feedback: "Same strap, same three boxes - only the line breaks are gone." },
            { text: "1",
              feedback: "Count opening tags: three divs open, three close. Layout on the page doesn't change the structure." },
            { text: "5",
              feedback: "Closing tags don't create new elements - each pair is ONE element." }
          ]
        },
        {
          type: "fix", kernel: true,
          prompt: "These tags close in the wrong order: <div><span>LIVE</div></span>. Boxes must close inside-out - tap the first closing tag that's out of place.",
          render: { html: "<div><span>LIVE</div></span>", autoplay: true },
          tokens: ["<div>", "<span>", "LIVE", "</div>", "</span>"],
          answer: 3,
          fixedToken: "</span>",
          fixedRender: { html: "<div><span>LIVE</span></div>", play: true },
          success: "Right - inside-out: the span opened last, so it closes first. It looks the same on screen (the browser quietly patches this one), but correct nesting keeps styles and scripts pointing at the right box.",
          feedback: {
            0: "The openers are fine - LIVE should be a span inside a div. The problem is the closing order.",
            1: "The openers are fine - LIVE should be a span inside a div. The problem is the closing order.",
            2: "The word is fine. The problem is the closing order around it.",
            4: "Nearly - the first tag out of place is the </div>: the span opened last, so it must close first."
          }
        },
        {
          type: "arrange",
          prompt: "Put the score strap back together - the indentation shows what lives inside what.",
          blocks: ["<div>", "  <div>HIFK <span>3</span></div>", "  <div>TPS <span>2</span></div>", "</div>"],
          slot: "html",
          render: { autoplay: true },
          feedback: { default: "Indent means 'I live inside the line above me one level up'. Both score lines live inside the strap." }
        },
        {
          type: "predict",
          prompt: "In <div><div>HIFK <span>3</span></div></div> - which element is the span's parent?",
          render: { html: "<div><div>HIFK <span>3</span></div></div>", autoplay: true },
          options: [
            { text: "The line div it sits in.", correct: true,
              feedback: "The parent is the box immediately around it - one level out, no more." },
            { text: "The outer strap div.",
              feedback: "That's its grandparent. The parent is the box immediately around it." },
            { text: "Another span next to it.",
              feedback: "Siblings sit side by side; neither contains the other." }
          ]
        }
      ]
    },

    {
      id: "2.3", title: "The id",
      concept: "id=\"...\" inside an opening tag gives one element a unique name; each id appears once per template.",
      explain: "You can give an element a name tag, written inside its opening tag: <div id=\"name\">. An id must be unique - it points to exactly one element, so styles (Unit 3) and live data (Unit 7) can find it.",
      exercises: [
        {
          type: "observe",
          prompt: "Tap the element whose id is 'title'.",
          render: { html: "<div>\n  <div id=\"name\">Maria Kranz</div>\n  <div id=\"title\">News Anchor</div>\n</div>", autoplay: true },
          lines: ["<div>", "  <div id=\"name\">Maria Kranz</div>", "  <div id=\"title\">News Anchor</div>", "</div>"],
          answer: 2,
          highlight: "#title",
          feedback: {
            1: "That one's id is 'name'. Read the id inside each opening tag.",
            default: "The wrapper carries no id here. Read the id inside each opening tag - one of them says title."
          }
        },
        {
          type: "predict",
          prompt: "Where does an id live?",
          options: [
            { text: "Inside the opening tag.", correct: true,
              feedback: "Settings like id ride inside the opening tag - never on screen." },
            { text: "Between the tags.",
              feedback: "Between the tags is content - it would show on air! (Remember the quote marks in 1.5.) Settings like id ride inside the opening tag." },
            { text: "In the closing tag.",
              feedback: "Closing tags carry nothing but the slash and the name." }
          ]
        },
        {
          type: "fill", kernel: true,
          prompt: "This element holds whoever is presenting tonight. Give it a sensible id.",
          code: "<div id=\"{{blank}}\">Alexandra Rivera</div>",
          bank: ["name", "Alexandra", "div"],
          answer: "name",
          feedback: {
            "Alexandra": "The content changes every show - the id is the element's JOB, which stays the same. Tomorrow this element still holds a name, just not Alexandra's.",
            "div": "That's the tag's type, not a name you chose. Ids describe the element's role in YOUR graphic."
          }
        },
        {
          type: "fix",
          prompt: "Both lines carry id=\"name\", but an id must point to exactly one element. Tap the line that should get a different id.",
          render: { html: "<div>\n  <div id=\"name\">Maria Kranz</div>\n  <div id=\"name\">News Anchor</div>\n</div>", autoplay: true },
          tokens: ["<div id=\"name\">Maria Kranz</div>", "<div id=\"name\">News Anchor</div>"],
          answer: 1,
          fixedToken: "<div id=\"title\">News Anchor</div>",
          fixedRender: { html: "<div>\n  <div id=\"name\">Maria Kranz</div>\n  <div id=\"title\">News Anchor</div>\n</div>", play: true },
          success: "Right - ids don't change how the strap looks, but now each line has its own name, so CSS and JavaScript can point at exactly one of them.",
          feedback: {
            0: "That one really IS the name - it's the title line that needs an id of its own."
          }
        },
        {
          type: "predict",
          prompt: "<div id=\"name\">Tomas Berg</div> - what shows on screen?",
          options: [
            { text: "Tomas Berg", correct: true,
              feedback: "Only content shows. Everything inside the opening tag stays invisible." },
            { text: "name",
              feedback: "Ids are for the machine and for you - never for the viewer." },
            { text: "id=\"name\"",
              feedback: "Everything inside the opening tag stays invisible. Only content shows." }
          ],
          applyOnAnswer: { html: "<div id=\"name\">Tomas Berg</div>", play: true }
        },
        {
          type: "type",
          prompt: "Write the opening tag for a div with the id \"score\".",
          answer: ["<div id=\"score\">", "<div id='score'>"],
          placeholder: "<div ...>",
          slot: "html",
          code: "{{blank}}3</div>",
          feedback: { default: "Pattern: <div id=\"score\"> - the id rides inside the opening tag, its value in quotes. This course writes double quotes, like the pros' templates." }
        }
      ]
    },

    {
      id: "2.4", title: "The class",
      concept: "class=\"...\" is a shared label many elements can carry; ids for one-of-a-kind parts, classes for families.",
      explain: "A class is a label many elements can share: class=\"line\". When several parts should look or behave the same, give them the same class. One-of-a-kind parts get an id; families get a class.",
      exercises: [
        {
          type: "predict",
          prompt: "The score strap: <span class=\"score\">3</span> ... <span class=\"score\">2</span>. Which elements carry the class 'score'?",
          render: { html: "<div>HIFK <span class=\"score\">3</span> - <span class=\"score\">2</span> TPS</div>", autoplay: true },
          options: [
            { text: "Both spans - the 3 and the 2.", correct: true,
              feedback: "Classes are shared labels - every element wearing one belongs to the family." },
            { text: "Only the home score.",
              feedback: "Classes are shared - keep looking. The away score wears the same label." },
            { text: "The whole strap.",
              feedback: "Only elements with class=\"score\" in their opening tag carry it - here, the two spans." }
          ]
        },
        {
          type: "predict", kernel: true,
          prompt: "Both strap lines carry class=\"line\". Next unit we'll give that class the channel's font. How many elements change?",
          render: { html: "<div>\n  <div id=\"name\" class=\"line\">Maria Kranz</div>\n  <div id=\"title\" class=\"line\">News Anchor</div>\n</div>", autoplay: true },
          options: [
            { text: "2", correct: true,
              feedback: "One label, applied everywhere it's worn. That's the power of a class." },
            { text: "1",
              feedback: "Both lines wear the label, so both change - that's exactly why we used a class and not an id." },
            { text: "Every element in the template.",
              feedback: "Only the elements CARRYING the class. The wrapper div has no class=\"line\", so it's untouched." }
          ]
        },
        {
          type: "fill",
          prompt: "Give the away team's score the same label as the home team's.",
          code: "<span class=\"{{blank}}\">2</span>",
          bank: ["score", "away", "span"],
          answer: "score",
          feedback: {
            "away": "Then the two scores would be different families and couldn't share a look. Same job, same class.",
            "span": "That's the tag type again - the class is the label YOU choose."
          }
        },
        {
          type: "predict",
          prompt: "Two parts: the strap's one-and-only background panel, and every headline in the ticker. Which gets an id, which a class?",
          options: [
            { text: "Panel: id. Headlines: class.", correct: true,
              feedback: "One of a kind -> id. A family that shares a look -> class." },
            { text: "Panel: class. Headlines: id.",
              feedback: "One of a kind -> id. A family that shares a look -> class." },
            { text: "Both get ids.",
              feedback: "Ids are unique - three headlines can't share one. Families get a class." }
          ]
        },
        {
          type: "fix",
          prompt: "All three headlines should carry class=\"headline\", but one is misspelled, so in Unit 3 it won't pick up the shared style. Read the class names and tap the odd one out.",
          render: {
            house: false, autoplay: true, mode: "video",
            html: '<div class="hlrow">' +
                  '<div class="headline">Storm warning issued for the west coast</div>' +
                  '<div class="headlnie">Parliament votes on the budget tonight</div>' +
                  '<div class="headline">HIFK wins the derby 4 - 2</div></div>',
            css: '.hlrow{position:absolute;left:0;right:0;bottom:0;background:#0a2a5e;' +
                 'box-sizing:border-box;padding:22px 60px;}' +
                 '.hlrow div{color:#fff;font-size:32px;font-weight:600;line-height:1.5;}'
          },
          tokens: [
            "<div class=\"headline\">Storm warning issued for the west coast</div>",
            "<div class=\"headlnie\">Parliament votes on the budget tonight</div>",
            "<div class=\"headline\">HIFK wins the derby 4 - 2</div>"
          ],
          answer: 1,
          fixedToken: "<div class=\"headline\">Parliament votes on the budget tonight</div>",
          fixedRender: {
            html: '<div class="hlrow">' +
                  '<div class="headline">Storm warning issued for the west coast</div>' +
                  '<div class="headline">Parliament votes on the budget tonight</div>' +
                  '<div class="headline">HIFK wins the derby 4 - 2</div></div>',
            play: true
          },
          success: "Right - 'headlnie' is the typo. Class names must match exactly, letter for letter, or the shared styling you add in Unit 3 skips this line.",
          feedback: {
            default: "That class is spelled right. Compare the three class names letter by letter - one of them is off."
          }
        }
      ]
    },

    {
      id: "2.5", title: "Pictures",
      concept: "<img src=\"...\"> shows an image from a file; no closing tag; src names the file.",
      explain: "<img src=\"nn-logo.png\"> puts an image on screen. There's no closing tag - the picture IS the content - and src (source) says which file to show.",
      exercises: [
        {
          type: "observe",
          prompt: "Tap the code that shows the channel logo.",
          render: { html: "<div>\n  <img src=\"nn-logo.png\">\n  <div id=\"name\">Maria Kranz</div>\n  <div id=\"title\">News Anchor</div>\n</div>", autoplay: true },
          lines: ["<div>", "  <img src=\"nn-logo.png\">", "  <div id=\"name\">Maria Kranz</div>", "  <div id=\"title\">News Anchor</div>", "</div>"],
          answer: 1,
          feedback: { default: "The logo is a picture - pictures come from img tags, and src names the file." }
        },
        {
          type: "predict", kernel: true,
          prompt: "We change src=\"nn-logo.png\" to src=\"nn-logo-gold.png\". What happens?",
          render: { html: "<div>\n  <img src=\"nn-logo.png\">\n  <div id=\"name\">Maria Kranz</div>\n  <div id=\"title\">News Anchor</div>\n</div>", autoplay: true },
          options: [
            { text: "The gold version of the logo shows.", correct: true,
              feedback: "src is live: point it at another file and the picture follows." },
            { text: "Nothing.",
              feedback: "src is live: point it at another file and the picture follows." },
            { text: "The text turns gold.",
              feedback: "src only chooses the IMAGE file - text isn't involved." }
          ],
          applyOnAnswer: { html: "<div>\n  <img src=\"nn-logo-gold.png\">\n  <div id=\"name\">Maria Kranz</div>\n  <div id=\"title\">News Anchor</div>\n</div>", play: true }
        },
        {
          type: "fill",
          prompt: "Show the sun icon on the weather strap.",
          code: "<img {{blank}}=\"weather-icon-sun.png\">",
          bank: ["src", "id", "file"],
          answer: "src",
          feedback: {
            "id": "An id names the element; it doesn't load anything. The attribute that points at a file is src.",
            "file": "Good guess - but the attribute's real name is src, short for SOURCE."
          }
        },
        {
          type: "fix",
          prompt: "The logo is missing on air - a broken-image marker sits in its place. Find the problem.",
          render: { html: "<img src=\"nn-logo.pgn\">", autoplay: true },
          tokens: ["<img", "src=", "\"nn-logo.pgn\"", ">"],
          answer: 2,
          fixedToken: "\"nn-logo.png\"",
          fixedRender: { html: "<img src=\"nn-logo.png\">", play: true },
          feedback: {
            default: "The tag and attribute are fine. Read the VALUE carefully - does that file exist in the asset drawer?"
          }
        },
        {
          type: "predict",
          prompt: "Two versions of the logo over video: one PNG with a solid white box behind it, one with a transparent background. Which file belongs on a lower third?",
          render: { html: "<div>\n  <img src=\"nn-logo.png\">\n  <div id=\"name\">Maria Kranz</div>\n  <div id=\"title\">News Anchor</div>\n</div>", autoplay: true },
          options: [
            { text: "The transparent one.", correct: true,
              feedback: "Anything you draw covers the video - so overlay images must carry transparent backgrounds." },
            { text: "The one with the white box.",
              feedback: "Remember the empty stage: anything you draw covers the video. A white box on air is a designer's nightmare - use images with transparent backgrounds." }
          ]
        },
        {
          type: "arrange",
          prompt: "Build the tag that puts the club crest on the score strap.",
          blocks: ["<img", "src=", "\"hifk-crest.png\"", ">"],
          slot: "html",
          render: { autoplay: true },
          feedback: { default: "Pattern: <img src=\"file\"> - tag name first, then the src attribute pointing at the file, then close the bracket." }
        }
      ]
    },

    {
      id: "2.6", title: "The skeleton",
      concept: "Every template shares one frame: head for settings, body for what's on screen.",
      explain: "Around the code you've been editing there's always the same frame. The head holds settings: the looks (style) and the template's control-panel definition. The body holds everything that appears on screen. Today you learn the floor plan - each room opens later.",
      exercises: [
        {
          type: "observe", kernel: true,
          prompt: "Tap the section where the strap's elements live.",
          lines: [
            "<html>",
            "  <head>",
            "    <style> ... the looks ... </style>",
            "    <script> ... the template definition ... </script>",
            "  </head>",
            "  <body>",
            "    <div> ... the strap you know ... </div>",
            "    <script> ... the moves and the data ... </script>",
            "  </body>",
            "</html>"
          ],
          answer: 5,
          feedback: {
            1: "The head holds settings - nothing in it is ever drawn on screen.",
            2: "The head holds settings - nothing in it is ever drawn on screen.",
            3: "The head holds settings - nothing in it is ever drawn on screen.",
            6: "Right neighbourhood - that IS the strap. The SECTION it lives in is the body.",
            default: "Everything that appears on screen lives in one section: the body."
          }
        },
        {
          type: "observe",
          prompt: "Tap the section that decides the graphic's LOOKS - colors, fonts. We open it next unit.",
          lines: [
            "<html>",
            "  <head>",
            "    <style> ... the looks ... </style>",
            "    <script> ... the template definition ... </script>",
            "  </head>",
            "  <body>",
            "    <div> ... the strap you know ... </div>",
            "    <script> ... the moves and the data ... </script>",
            "  </body>",
            "</html>"
          ],
          answer: 2,
          feedback: {
            3: "That's the template definition - the operator's fields. The looks live in the style block, just above.",
            default: "The looks live in the head, in the style block - it opens in Unit 3."
          }
        },
        {
          type: "predict",
          prompt: "A colleague says: 'The fields the operator can edit are described in the head.' True or false?",
          options: [
            { text: "True", correct: true,
              feedback: "That's the template definition - the seal comes off in Unit 7." },
            { text: "False",
              feedback: "It's true: the head carries the template's settings, including the list of operator fields. Unit 7 opens that seal." }
          ]
        },
        {
          type: "predict",
          prompt: "Where would you add a third strap line?",
          options: [
            { text: "Inside the strap's div, in the body.", correct: true,
              feedback: "On-screen elements live in the body - and children live inside their parent." },
            { text: "In the head.",
              feedback: "The head never draws anything. On-screen elements live in the body." },
            { text: "After </html>.",
              feedback: "Outside the frame nothing exists - the template ends at </html>." }
          ]
        },
        {
          type: "fill",
          prompt: "One label left to place: the head's second block, describing the operator's fields, is the template ...",
          code: "<script> ... the template {{blank}} ... </script>",
          bank: ["definition", "style", "body"],
          answer: "definition",
          feedback: {
            "style": "The style block is the head's FIRST room - the looks. The second script describes the operator's fields: the definition.",
            "body": "The body is the other half of the frame - everything on screen. This block is the template definition."
          }
        }
      ]
    },

    {
      id: "2.7", title: "Review remix",
      concept: "No new concept - spaced retrieval across Units 1-2 before the checkpoint.",
      explain: "Nothing new - a quick lap of everything the strap has taught you.",
      exercises: [
        {
          type: "observe",
          prompt: "Tap the element with id 'title'.",
          render: { html: "<div>\n  <img src=\"nn-logo.png\">\n  <div id=\"name\" class=\"line\">Maria Kranz</div>\n  <div id=\"title\" class=\"line\">News Anchor</div>\n</div>", autoplay: true },
          lines: ["<div>", "  <img src=\"nn-logo.png\">", "  <div id=\"name\" class=\"line\">Maria Kranz</div>", "  <div id=\"title\" class=\"line\">News Anchor</div>", "</div>"],
          answer: 3,
          highlight: "#title",
          feedback: { default: "Read the id inside each opening tag - exactly one element says id=\"title\"." }
        },
        {
          type: "fix",
          prompt: "The same mistake again: <div><span>LIVE</div></span>. Tap the first closing tag that's out of place.",
          render: { html: "<div><span>LIVE</div></span>", autoplay: true },
          tokens: ["<div>", "<span>", "LIVE", "</div>", "</span>"],
          answer: 3,
          fixedToken: "</span>",
          fixedRender: { html: "<div><span>LIVE</span></div>", play: true },
          success: "Right - inside-out again: the span closes before the div. No visible change here, but on a real badge with its own colour this is exactly what keeps the style on the word and not the whole line.",
          feedback: {
            4: "Nearly - the first tag out of place is the </div>: the span opened last, so it must close first.",
            default: "Boxes close from the inside out. The span opened last, so it must close first - before the div."
          }
        },
        {
          type: "fix",
          prompt: "The channel logo is missing on air. Find the problem and fix it.",
          render: { html: "<img src=\"nn-logo.npg\">", autoplay: true },
          tokens: ["<img", "src=", "\"nn-logo.npg\"", ">"],
          answer: 2,
          fixedToken: "\"nn-logo.png\"",
          fixedRender: { html: "<img src=\"nn-logo.png\">", play: true },
          feedback: { default: "The tag and attribute are fine. Read the VALUE letter by letter against the asset drawer." }
        },
        {
          type: "predict",
          prompt: "We change the span around the 3 into a div. What happens to the line?",
          render: { html: "<div>HIFK <span>3</span> - 2 TPS</div>", autoplay: true },
          options: [
            { text: "The 3 breaks onto its own line - the score falls apart.", correct: true,
              feedback: "A div always takes its own line. Inside a line -> span." },
            { text: "Nothing changes.",
              feedback: "Watch the render. A div always takes its own line." },
            { text: "The highlight gets stronger.",
              feedback: "div vs span isn't about strength - it's about whether the piece gets its own line." }
          ],
          applyOnAnswer: { html: "<div>HIFK <div>3</div> - 2 TPS</div>", play: true }
        },
        {
          type: "arrange", kernel: true,
          prompt: "Rebuild the full strap: logo first, then the name line, then the title line - all inside the wrapper.",
          blocks: [
            "<div>",
            "  <img src=\"nn-logo.png\">",
            "  <div id=\"name\" class=\"line\">Maria Kranz</div>",
            "  <div id=\"title\" class=\"line\">News Anchor</div>",
            "</div>"
          ],
          slot: "html",
          render: { autoplay: true },
          feedback: { default: "Wrapper opens first and closes last; the three children sit inside, in order: logo, name, title." }
        },
        {
          type: "predict",
          prompt: "The strap over the checkerboard. What will the viewer at home see in the checkered areas?",
          render: { html: "<div>\n  <div id=\"name\" class=\"line\">Maria Kranz</div>\n  <div id=\"title\" class=\"line\">News Anchor</div>\n</div>", mode: "transparent", autoplay: true },
          options: [
            { text: "The program picture - checkerboard means transparent.", correct: true,
              feedback: "Nothing drawn, nothing shown: the video fills every checkered area on air." },
            { text: "A checkerboard.",
              feedback: "The checkerboard never goes on air - it's a preview pattern that means 'transparent'." },
            { text: "Nothing - the graphic is broken.",
              feedback: "It's the opposite of broken: checkerboard is how the preview shows see-through." }
          ]
        }
      ]
    },

    {
      id: "cp2", title: "Checkpoint: Rebuild the strap",
      concept: "Rebuild the strap's full structure from its surviving pieces, then put it on air.",
      explain: "The intern deleted the strap's structure. The pieces survived. Rebuild it exactly, then put it on air - and beware: two of the pieces don't belong.",
      isCheckpoint: true,
      exercises: [
        {
          type: "arrange", kernel: true,
          prompt: "Rebuild the strap exactly: logo, then name, then title, all inside the wrapper. Two leftover pieces are traps - reject them.",
          blocks: [
            "<div>",
            "  <img src=\"nn-logo.png\">",
            "  <div id=\"name\" class=\"line\">Maria Kranz</div>",
            "  <div id=\"title\" class=\"line\">News Anchor</div>",
            "</div>"
          ],
          distractors: ["</div>", "<div id=\"name\">"],
          slot: "html",
          render: { autoplay: true },
          feedback: { default: "Check: all three children inside the wrapper, in order; ids matching each line's job; both lines wearing class=\"line\"; every opened box closed inside-out. Traps stay out." }
        },
        {
          type: "predict",
          prompt: "Press PLAY: logo, name and title all slide in as one piece. Which element makes that possible?",
          render: { html: "<div>\n  <img src=\"nn-logo.png\">\n  <div id=\"name\" class=\"line\">Maria Kranz</div>\n  <div id=\"title\" class=\"line\">News Anchor</div>\n</div>" },
          options: [
            { text: "The wrapper div - move the parent and everything inside moves with it.", correct: true,
              feedback: "Checkpoint cleared. Structure, ids, classes, the logo - you can name every part of this template and target the right one." },
            { text: "The class \"line\".",
              feedback: "The class is a shared label for looks - it doesn't group the elements into one moving box. The parent does." },
            { text: "The img tag.",
              feedback: "The img is just one child. The box that carries all three children is the wrapper div - the parent." }
          ]
        }
      ]
    }
  ]
});
