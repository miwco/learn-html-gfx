// Unit 5 - Making It Move. Source of truth: lessons/unit-05.md
// Schema per app/SCHEMA.md. All motion is pure CSS: off-state + #stage.on state + transition
// (5.7: @keyframes). PLAY toggles the "on" class on the stage root #stage.
window.COURSE_DATA = window.COURSE_DATA || [];
COURSE_DATA.push({
  id: 5,
  title: "Making It Move",
  promise: "Animate a graphic on and off air so it feels professional, not PowerPoint.",
  lessons: [

    {
      id: "5.1", title: "Slide without breaking",
      concept: "transform: translate(x, y) slides a box from its pinned spot - the animation-safe way to move.",
      explain: "To animate a box you don't re-pin it - you slide it from where it's pinned. transform: translate(x, y) moves the box while its pin and the layout around it stay untouched. Broadcast motion is built on transforms, not on changing top and left.",
      exercises: [
        {
          type: "observe",
          prompt: "The strap has slid straight down from its pin. Tap the value that carried the move.",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); }`,
            overlay: "grid", autoplay: true
          },
          lines: ["transform: translate(", "  0px,", "  60px", ");"],
          answer: 2,
          highlight: "#strap",
          success: "The second slot is y - and y grows downward, like reading. Same grid as Unit 4.",
          feedback: {
            1: "That slot slides the strap sideways - and it reads 0px. Down lives in the second slot: translate(across, down).",
            default: "Look inside the parentheses: translate(across, down). Which number is not zero?"
          }
        },
        {
          type: "predict",
          prompt: "We set transform: translate(-500px, 0px). Where is the strap?",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(-500px, 0px); }`,
            overlay: "grid", autoplay: true
          },
          options: [
            { text: "Off screen, out the left edge.", correct: true,
              feedback: "Remember this spot - parking a graphic just off frame is exactly how entrances begin." },
            { text: "Off screen, out the right edge.",
              feedback: "Negative x slides left; positive slides right. Look at the render - it's gone out the LEFT side." },
            { text: "500px lower.",
              feedback: "That would be the second slot. The first slot only ever moves things across." }
          ]
        },
        {
          type: "fill",
          prompt: "Park the strap 60px below its pin, ready to rise on air.",
          code: `#strap {
  position: absolute;
  left: 120px;
  bottom: 96px;
  transform: translate(0px, {{blank}}px);
}`,
          bank: ["60", "-60", "0"],
          answer: "60",
          slot: "css",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 0px); }`,
            overlay: "grid", autoplay: true
          },
          success: "Parked 60px low. In 5.3 a transition will turn this parking spot into an entrance.",
          feedback: {
            "-60": "Look: the strap floats 60px ABOVE the panel line - negative y is up. It should wait BELOW its spot: y grows downward.",
            "0": "translate(0px, 0px) is no slide at all - the strap is still sitting at its pin, on air before its cue."
          }
        },
        {
          type: "predict",
          prompt: "After all that sliding we set transform: translate(0px, 0px). Where does the strap sit now?",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 0px); }`,
            overlay: "grid", autoplay: true
          },
          options: [
            { text: "Exactly at its pin: left 120px, bottom 96px.", correct: true,
              feedback: "The pin never moved. translate is a slide FROM the pin, and a zero slide is home." },
            { text: "Wherever it was last dragged.",
              feedback: "Transforms don't accumulate history - the current value is the whole story, and it reads zero." },
            { text: "The top left corner of the canvas.",
              feedback: "0,0 here means zero SLIDE, not the frame's corner. Canvas coordinates belong to top and left; translate counts from the pin." }
          ]
        },
        {
          type: "predict", kernel: true,
          prompt: "To move the ticker the designer keeps changing left - and the crawl stutters. Watch it. Which property should carry the motion instead?",
          render: {
            html: `<div id="ticker" style="position:absolute; left:0px; bottom:24px; width:1920px; overflow:hidden; background-color:#e8b90c; padding:12px 0;"><div id="ticker-text" style="color:#0a2a5e; font-family:Arial,sans-serif; font-size:34px; font-weight:700; white-space:nowrap;">HIFK 3 - 2 TPS  |  Berg hat-trick sinks TPS  |  Tickets for Saturday on sale now</div></div>`,
            css: `@keyframes crawl { 0% { transform: translate(1920px, 0px); } 100% { transform: translate(-1920px, 0px); } }
#ticker-text { animation: crawl 8s steps(16) infinite; }`,
            autoplay: true
          },
          options: [
            { text: "transform: translate(-200px, 0px);", correct: true,
              feedback: "Changing left re-measures the whole layout on every step. A transform slides the finished picture - same look, different machinery. Watch it glide now." },
            { text: "left: -160px;",
              feedback: "Still left, still re-measuring, still stuttering. The smooth mover is transform." },
            { text: "bottom: 24px;",
              feedback: "That pins the ticker's height - it doesn't move anything sideways, smoothly or otherwise." }
          ],
          applyOnAnswer: {
            css: `@keyframes crawl { 0% { transform: translate(1920px, 0px); } 100% { transform: translate(-1920px, 0px); } }
#ticker-text { animation: crawl 8s linear infinite; }`,
            play: true
          }
        }
      ]
    },

    {
      id: "5.2", title: "Grow and shrink",
      concept: "transform: scale() resizes from the element's own center - 1 normal, 0 nothing, 2 double; scale(0) is invisible but still there.",
      explain: "scale() resizes an element from its own middle: scale(1) is its normal size, scale(0) is nothing at all, scale(2) is double. A bug that pops on air starts at scale(0) - invisible, but still pinned, still in the code, ready to enter.",
      exercises: [
        {
          type: "predict",
          prompt: "Before air the bug must vanish completely. We dial it down to transform: scale(0.1). Look at the corner - is it gone?",
          render: {
            html: `<div id="bug" style="background-color:#e8b90c; color:#0a2a5e; font-family:Arial,sans-serif; font-size:44px; font-weight:700; padding:10px 18px; border-radius:6px;">NN</div>`,
            css: `#bug { position: absolute; right: 96px; top: 54px; transform: scale(0.1); }`,
            autoplay: true
          },
          options: [
            { text: "Not quite - a speck of logo still shows.", correct: true,
              feedback: "0.1 is a tenth-size bug, not no bug. NOTHING is exactly 0 - watch the corner clear." },
            { text: "Yes - 0.1 is close enough to zero.",
              feedback: "Look closer: a speck of gold is still on air. Close enough isn't a broadcast term - nothing is exactly 0." },
            { text: "It slid off screen.",
              feedback: "Scale never moves the pin - it only resizes. The speck is still sitting at right 96, top 54." }
          ],
          applyOnAnswer: {
            css: `#bug { position: absolute; right: 96px; top: 54px; transform: scale(0); }`,
            play: true
          }
        },
        {
          type: "predict",
          prompt: "Now we set scale(2). What's the risk up in that corner?",
          render: {
            html: `<div id="bug" style="background-color:#e8b90c; color:#0a2a5e; font-family:Arial,sans-serif; font-size:44px; font-weight:700; padding:10px 18px; border-radius:6px;">NN</div>`,
            css: `#bug { position: absolute; right: 96px; top: 54px; transform: scale(1); }`,
            overlay: "safe", autoplay: true
          },
          options: [
            { text: "The bug grows past the title-safe line.", correct: true,
              feedback: "Scaling happens from the element's center, so half the growth goes TOWARD the frame edge. Big things near corners break title-safe (Unit 4). Watch the breach." },
            { text: "The bug slides left.",
              feedback: "Scale changes size, never position - the pin holds." },
            { text: "The bug turns see-through.",
              feedback: "Size, not transparency. See-through is opacity's job (4.7)." }
          ],
          applyOnAnswer: {
            css: `#bug { position: absolute; right: 96px; top: 54px; transform: scale(2); }`,
            play: true
          }
        },
        {
          type: "predict", kernel: true,
          prompt: "The bug reads transform: scale(0). A colleague says: 'Someone deleted the bug from the template.' True or false?",
          render: {
            html: `<div id="bug" style="background-color:#e8b90c; color:#0a2a5e; font-family:Arial,sans-serif; font-size:44px; font-weight:700; padding:10px 18px; border-radius:6px;">NN</div>`,
            css: `#bug { position: absolute; right: 96px; top: 54px; transform: scale(0); }`,
            autoplay: true
          },
          options: [
            { text: "False - scale(0) draws it at no size; the element and its pin are still there.", correct: true,
              feedback: "Invisible but still there - the same idea as opacity 0, and exactly what makes it READY TO ENTER. One number brings it back." },
            { text: "True - nothing in the corner means nothing in the file.",
              feedback: "Check the code: #bug is right there. Deleted means gone from the file; scale(0) means drawn at no size. One of them can come back with a single number." }
          ]
        },
        {
          type: "fill",
          prompt: "The bug is on air before its cue. Park it ready to pop on air.",
          code: `#bug {
  position: absolute;
  right: 96px;
  top: 54px;
  transform: scale({{blank}});
}`,
          bank: ["0", "1", "2"],
          answer: "0",
          slot: "css",
          render: {
            html: `<div id="bug" style="background-color:#e8b90c; color:#0a2a5e; font-family:Arial,sans-serif; font-size:44px; font-weight:700; padding:10px 18px; border-radius:6px;">NN</div>`,
            css: `#bug { position: absolute; right: 96px; top: 54px; transform: scale(1); }`,
            autoplay: true
          },
          success: "Gone - but still pinned, still in the code, ready to enter.",
          feedback: {
            "1": "That's the bug at full size, already on air before PLAY. Ready to enter means nothing showing: 0.",
            "2": "Double size is an exit PROBLEM, not an entrance state. Ready to enter means nothing showing: 0."
          }
        },
        {
          type: "arrange",
          prompt: "Build ONE transform line that parks the score strap 40px below its pin AND at nothing size.",
          blocks: [
            "#score {",
            "  transform:",
            "  translate(0px, 40px)",
            "  scale(0)",
            "  ; }"
          ],
          slot: "css",
          render: {
            html: `<div id="score" style="position:absolute; left:120px; bottom:96px; background-color:#0a3d91; color:#ffffff; font-family:Arial,sans-serif; font-size:46px; font-weight:700; padding:16px 28px;">HIFK 3 - 2 TPS</div>`,
            css: "", house: false, autoplay: true
          },
          success: "It vanished - parked 40px low at nothing size, ready to enter. Both moves ride one transform line; a second transform: line would REPLACE the first.",
          feedback: {
            default: "One line: the property name first, then the slide, then the size, and the semicolon last - anything after a semicolon is ignored."
          }
        }
      ]
    },

    {
      id: "5.3", title: "Smooth change",
      concept: "transition: property duration - a standing rule that makes future changes to that property glide instead of snap.",
      explain: "A transition is a standing rule: 'when this property changes, glide - don't snap.' transition: transform 0.5s means any change to transform takes half a second. PLAY switches the stage to its on state and the later-written on rules take over; the transition turns that flip into motion. Trust the button for now - Unit 7 opens the buttons, Unit 8 shows the switch.",
      exercises: [
        {
          type: "predict",
          prompt: "This copy's transition line has been removed. Press PLAY. What happened?",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; }`
          },
          options: [
            { text: "The strap snapped on instantly - no motion.", correct: true,
              feedback: "Without the rule a change is a teleport. The two states are the WHERE; the transition is the HOW. The line is back now - press PLAY and watch." },
            { text: "Nothing appeared.",
              feedback: "Look again - the strap IS on air. It just arrived in zero time. Press STOP, then PLAY, and keep your eye on the lower third." },
            { text: "It moved, just slower.",
              feedback: "There was no slower - there was no journey at all. Zero seconds, teleport." }
          ],
          applyOnAnswer: {
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.5s; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; }`,
            play: false
          }
        },
        {
          type: "predict",
          prompt: "The rule reads transition: transform 0.5s. Press PLAY - which change glides, and which snaps?",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.5s; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; }`
          },
          options: [
            { text: "The slide glides; the fade snaps.", correct: true,
              feedback: "The transition names transform only. opacity changed too - but no rule covered it, so it snapped to full strength on the first frame." },
            { text: "Both glide.",
              feedback: "A transition only covers the properties it NAMES. Read the line: one property, one glide." },
            { text: "The fade glides; the slide snaps.",
              feedback: "Backwards - check which property the transition names: transform, the slide." }
          ]
        },
        {
          type: "fill",
          prompt: "Make the fade glide too.",
          code: `#strap {
  position: absolute;
  left: 120px;
  bottom: 96px;
  transform: translate(0px, 60px);
  opacity: 0;
  transition: transform 0.5s, {{blank}} 0.5s;
}
#stage.on #strap {
  transform: translate(0px, 0px);
  opacity: 1;
}`,
          bank: ["opacity", "color", ".on"],
          answer: "opacity",
          slot: "css",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.5s; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; }`
          },
          success: "Press STOP, then PLAY - slide and fade travel together now, half a second each.",
          feedback: {
            "color": "Nothing changes the text color between the two states. List what actually differs: transform and opacity. STOP, then PLAY - the fade still snaps.",
            ".on": "That's a selector, not a property. Transitions list PROPERTIES - the things that change."
          }
        },
        {
          type: "fix",
          prompt: "The weather strap still snaps on air even though the designer wrote a transition. Press PLAY, then tap what's wrong.",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Alexandra Rivera</div><div id="title" style="color:#dbe4f5; font-size:34px;">Weather</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: left 0.5s; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; }`
          },
          tokens: [
            "#strap {",
            "  transform: translate(0px, 60px);",
            "  opacity: 0;",
            "  transition:",
            "left",
            "0.5s;",
            "}",
            "#stage.on #strap {",
            "  transform: translate(0px, 0px);",
            "  opacity: 1;",
            "}"
          ],
          answer: 4,
          fixedToken: "transform",
          fixedRender: {
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.5s; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; }`,
            play: false
          },
          success: "left never changes here - the pin is constant (5.1's whole point). transform is what differs between the states. Press PLAY: Alexandra rises.",
          feedback: {
            5: "Half a second is fine. The glitch is the NAME - compare the two states: which property actually differs?",
            default: "Compare the off state and the on state: which property changes between them? The transition must name that one."
          }
        },
        {
          type: "predict", kernel: true,
          prompt: "The strap is on air. Nobody presses anything. What is the transition doing right now?",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.5s, opacity 0.5s; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; }`,
            autoplay: true
          },
          options: [
            { text: "Nothing - it's a rule waiting for a change.", correct: true,
              feedback: "A transition is not an action. It's a promise about FUTURE changes: whenever transform changes - PLAY, STOP, anything - the trip takes 0.5s. Press STOP: it governs the way back too." },
            { text: "Animating in a loop.",
              feedback: "Looping motion is a different tool - you'll build it in 5.7. A transition runs once per change, then waits." },
            { text: "Slowly fading the strap.",
              feedback: "Only a CHANGE starts a transition. No change, no motion - the strap just sits there, on air." }
          ]
        }
      ]
    },

    {
      id: "5.4", title: "Entrances ease out",
      concept: "Easing is the speed shape of a move; ease-out (fast start, gentle landing) is how graphics arrive; linear is how robots move.",
      explain: "Easing is the speed shape of a move. ease-out starts fast and lands gently - that's how real graphics arrive. linear moves at one constant speed - that's how conveyor belts move. From now on, every entrance you build decelerates.",
      exercises: [
        {
          type: "predict",
          prompt: "Three straps, three entrances. Press PLAY a few times (STOP resets) and watch how each arrives. Tap the one that goes on air tonight.",
          render: {
            html: `<div id="a" class="mini" style="left:200px;">A</div><div id="b" class="mini" style="left:760px;">B</div><div id="c" class="mini" style="left:1320px;">C</div>`,
            css: `.mini { position: absolute; bottom: 96px; background-color: #0a3d91; color: #ffffff; font-family: Arial, sans-serif; font-size: 44px; font-weight: 700; padding: 20px 60px; transform: translate(0px, 340px); }
#a { transition: transform 0.9s linear; }
#b { transition: transform 0.9s ease-out; }
#c { transition: transform 0.9s ease-in; }
#stage.on .mini { transform: translate(0px, 0px); }`
          },
          options: [
            { text: "Strap B", correct: true,
              feedback: "Fast off the line, gentle touchdown - that's ease-out. The eye reads deceleration as weight and intent." },
            { text: "Strap A",
              feedback: "A moves like a conveyor belt: one speed, no landing. That's linear. Watch B again - see it settle." },
            { text: "Strap C",
              feedback: "C creeps off the line and slams into place - a curve the wrong way round for an arrival. Hold that thought: it has a job, next lesson." }
          ]
        },
        {
          type: "predict", kernel: true,
          prompt: "Press PLAY: this entrance starts slow, then slams to a stop at full speed. Which curve is that?",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 340px); transition: transform 0.9s ease-in; }
#stage.on #strap { transform: translate(0px, 0px); }`
          },
          options: [
            { text: "ease-in", correct: true,
              feedback: "Slow start, fast finish - acceleration. Fine for leaving; wrong for arriving." },
            { text: "ease-out",
              feedback: "ease-out is the mirror: fast start, gentle landing. What you just watched sped up INTO the stop." },
            { text: "linear",
              feedback: "linear never changes speed. This move clearly accelerated." }
          ]
        },
        {
          type: "fill",
          prompt: "The entrance is a conveyor belt. Give it its landing.",
          code: `#strap {
  position: absolute;
  left: 120px;
  bottom: 96px;
  transform: translate(0px, 340px);
  transition: transform 0.9s {{blank}};
}
#stage.on #strap {
  transform: translate(0px, 0px);
}`,
          bank: ["ease-out", "ease-in", "linear"],
          answer: "ease-out",
          slot: "css",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 340px); transition: transform 0.9s linear; }
#stage.on #strap { transform: translate(0px, 0px); }`
          },
          success: "Press STOP, then PLAY: fast off the line, gentle landing. Every entrance from here on decelerates.",
          feedback: {
            "ease-in": "Press STOP, then PLAY - feel that thud at the end? Entrances DECELERATE: ease-out.",
            "linear": "STOP, then PLAY - technically it arrived. Nobody designed that. ease-out."
          }
        },
        {
          type: "predict",
          prompt: "LINEAR and EASE-OUT race side by side. Press PLAY and watch the finish. In the last tenth of the move, which strap is moving slower?",
          render: {
            html: `<div id="lin" class="mini" style="left:300px;">LINEAR</div><div id="out" class="mini" style="left:1100px;">EASE-OUT</div>`,
            css: `.mini { position: absolute; bottom: 96px; background-color: #0a3d91; color: #ffffff; font-family: Arial, sans-serif; font-size: 44px; font-weight: 700; padding: 20px 50px; transform: translate(0px, 420px); }
#lin { transition: transform 1.2s linear; }
#out { transition: transform 1.2s ease-out; }
#stage.on .mini { transform: translate(0px, 0px); }`
          },
          options: [
            { text: "EASE-OUT - it has almost parked before it stops.", correct: true,
              feedback: "That end-of-move slowdown is the entire trick. Once you can see it here, you'll start seeing it at full speed - on every channel." },
            { text: "LINEAR - constant speed means slow.",
              feedback: "Constant means constant: LINEAR is still at full speed when it stops dead. Play it again and watch the last moment." },
            { text: "They finish the same way.",
              feedback: "Same moment, different manner: one brakes, one slams. Watch the final stretch again." }
          ]
        },
        {
          type: "predict",
          prompt: "The NN bug pops in with scale over 0.3s. Which easing does its transition want? Press PLAY to check your taste.",
          render: {
            html: `<div id="bug" style="background-color:#e8b90c; color:#0a2a5e; font-family:Arial,sans-serif; font-size:44px; font-weight:700; padding:10px 18px; border-radius:6px;">NN</div>`,
            css: `#bug { position: absolute; right: 96px; top: 54px; transform: scale(0); transition: transform 0.3s ease-out; }
#stage.on #bug { transform: scale(1); }`
          },
          options: [
            { text: "ease-out", correct: true,
              feedback: "Entrances decelerate - slide or grow, same taste rule. One rule, every property." },
            { text: "ease-in",
              feedback: "That bug would SLAM to full size. Arrivals land gently." },
            { text: "linear",
              feedback: "Robot bug. Same conveyor-belt problem, smaller box." }
          ]
        }
      ]
    },

    {
      id: "5.5", title: "Exits ease in, and faster",
      concept: "Outs accelerate away (ease-in) and run shorter than ins - each direction carried by the rule in force after the change.",
      explain: "Exits are entrances mirrored, and then some: an out accelerates away (ease-in) and runs SHORTER than the in. The graphic arrives like it matters and leaves like it's needed elsewhere. House pattern: in 0.5s ease-out, out 0.3s ease-in.",
      exercises: [
        {
          type: "predict",
          prompt: "Both straps are on air. Press STOP and watch the two exits (PLAY brings them back). Which exit belongs on air?",
          render: {
            html: `<div id="a" class="mini" style="left:260px;">A</div><div id="b" class="mini" style="left:1060px;">B</div>`,
            css: `.mini { position: absolute; bottom: 96px; background-color: #0a3d91; color: #ffffff; font-family: Arial, sans-serif; font-size: 44px; font-weight: 700; padding: 20px 60px; transform: translate(0px, 420px); }
#a { transition: transform 1s ease-out; }
#b { transition: transform 0.3s ease-in; }
#stage.on .mini { transform: translate(0px, 0px); transition: transform 0.6s ease-out; }`,
            autoplay: true
          },
          options: [
            { text: "Strap B - gone in a crisp 0.3s.", correct: true,
              feedback: "The other one hangs around like it forgot something. Outs accelerate, and they're gone." },
            { text: "Strap A - the gentle glide.",
              feedback: "A lands gently WHILE leaving - an entrance played backwards. Leaving means speeding up: ease-in, and shorter." }
          ]
        },
        {
          type: "predict", kernel: true,
          prompt: "The in is 0.5s ease-out. Which is the right out? (Press PLAY, then STOP, to feel the house pattern.)",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.3s ease-in, opacity 0.3s ease-in; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; transition: transform 0.5s ease-out, opacity 0.5s ease-out; }`
          },
          options: [
            { text: "0.3s ease-in", correct: true,
              feedback: "Mirror the curve, drop the time. That asymmetry is the whole lesson - and most of what separates pro motion from 'just reverse it'." },
            { text: "0.5s ease-out",
              feedback: "That's the entrance, copied. Outs flip the curve AND run shorter." },
            { text: "0.8s ease-in",
              feedback: "Right curve, wrong clock - an out never outstays its in." },
            { text: "0.3s ease-out",
              feedback: "Quick, but it decelerates WHILE leaving - backwards. Accelerate away: ease-in." }
          ]
        },
        {
          type: "predict",
          prompt: "STOP takes the stage out of its on state. Two transition lines exist - one in the base rule, one in the #stage.on rule. Which carries the way OUT?",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.3s ease-in, opacity 0.3s ease-in; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; transition: transform 0.5s ease-out, opacity 0.5s ease-out; }`,
            autoplay: true
          },
          options: [
            { text: "The base rule's - it's what remains in force after the on state is gone.", correct: true,
              feedback: "With on gone, the #stage.on rule no longer applies. What remains is in force - and its transition drives the exit. One transition per direction: that's how ins and outs get different speeds in pure CSS." },
            { text: "The #stage.on rule's.",
              feedback: "That rule just switched off with its state. It carried the way IN." },
            { text: "They average out.",
              feedback: "CSS doesn't negotiate. One rule set is in force after the change; its transition runs." }
          ]
        },
        {
          type: "fill",
          prompt: "Tune the out in the base rule: shorter than the in, accelerating.",
          code: `#strap {
  position: absolute;
  left: 120px;
  bottom: 96px;
  transform: translate(0px, 60px);
  opacity: 0;
  transition: transform {{blank}}, opacity 0.3s ease-in;
}
#stage.on #strap {
  transform: translate(0px, 0px);
  opacity: 1;
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}`,
          bank: ["0.3s ease-in", "0.5s ease-out", "1s ease-in", "0.3s ease-out"],
          answer: "0.3s ease-in",
          slot: "css",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.5s ease-out, opacity 0.3s ease-in; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; transition: transform 0.5s ease-out, opacity 0.5s ease-out; }`
          },
          success: "PLAY, then STOP: in 0.5s ease-out, out 0.3s ease-in. Arrives like it matters, leaves like it's needed elsewhere.",
          feedback: {
            "0.5s ease-out": "That's the entrance, copied into the exit. PLAY, then STOP - it leaves like it's arriving. Outs flip the curve and drop the time.",
            "1s ease-in": "Right curve, wrong clock - PLAY, then STOP, and count. An out never outstays its in.",
            "0.3s ease-out": "Quick, but watch it brake on the way out - arrival body language on a departure. Accelerate away: ease-in."
          }
        },
        {
          type: "predict",
          prompt: "The weather strap is on air. Press STOP and watch it leave. What's wrong with this out?",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Alexandra Rivera</div><div id="title" style="color:#dbe4f5; font-size:34px;">Weather</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.6s ease-out, opacity 0.6s ease-out; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; transition: transform 0.5s ease-out, opacity 0.5s ease-out; }`,
            autoplay: true
          },
          options: [
            { text: "It floats away gently - an entrance played in reverse.", correct: true,
              feedback: "Exactly: deceleration is arrival body language. This out needs to accelerate and be gone." },
            { text: "It's too fast.",
              feedback: "The opposite - it's SLOWER and softer than the house 0.3s. Play it out again." },
            { text: "It snaps.",
              feedback: "It glides alright - the problem is the SHAPE of the glide, not its absence." }
          ]
        },
        {
          type: "fix",
          prompt: "Fix that out. Tap the line that's wrong.",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Alexandra Rivera</div><div id="title" style="color:#dbe4f5; font-size:34px;">Weather</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.6s ease-out, opacity 0.6s ease-out; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; transition: transform 0.5s ease-out, opacity 0.5s ease-out; }`,
            autoplay: true
          },
          tokens: [
            "#strap {",
            "  transform: translate(0px, 60px);",
            "  opacity: 0;",
            "  transition: transform 0.6s ease-out, opacity 0.6s ease-out;",
            "}",
            "#stage.on #strap {",
            "  transform: translate(0px, 0px);",
            "  opacity: 1;",
            "  transition: transform 0.5s ease-out, opacity 0.5s ease-out;",
            "}"
          ],
          answer: 3,
          fixedToken: "  transition: transform 0.3s ease-in, opacity 0.3s ease-in;",
          fixedRender: {
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.3s ease-in, opacity 0.3s ease-in; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; transition: transform 0.5s ease-out, opacity 0.5s ease-out; }`,
            play: true
          },
          success: "Press STOP: accelerates away in 0.3s, gone. The base rule owns the out; the on rule owns the in.",
          feedback: {
            8: "That transition carries the ENTRANCE - it's already right. The out lives in the rule that remains when the on state is gone.",
            default: "The exit is carried by the rule in force AFTER the change - the base rule. Find its transition."
          }
        }
      ]
    },

    {
      id: "5.6", title: "One after another",
      concept: "transition-delay - same move, later start; a small stagger between lines reads as designed.",
      explain: "transition-delay holds a move at the starting line: same speed, same length, later start. Give the title line a 0.12s delay and it lands a beat after the name - a stagger reads as designed; everything-at-once reads as cheap. (One honest aside: this delay also runs on the way out - at 0.12s you'll never see it, and Unit 6's timelines give in and out separate delays properly.)",
      exercises: [
        {
          type: "predict",
          prompt: "Each line now makes its own entrance. The title's delay is set to 0.4s - a whole move-length. Press PLAY. How does the strap read?",
          render: {
            html: `<div id="strap" style="position:absolute; left:120px; bottom:96px; background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" class="line" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" class="line" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `.line { transform: translate(0px, 40px); opacity: 0; transition: transform 0.4s ease-out, opacity 0.4s ease-out; }
#title { transition-delay: 0.4s; }
#stage.on .line { transform: translate(0px, 0px); opacity: 1; }`
          },
          options: [
            { text: "Two events - name... pause... title. Late, not designed.", correct: true,
              feedback: "Past about a quarter second the title reads as LATE, not choreographed. The house beat is 0.1-0.15s - felt, not noticed. The delay is 0.12s now: press PLAY." },
            { text: "A designed stagger.",
              feedback: "Play it again: the name lands, the screen waits, then the title. Past about 0.25s a beat becomes a wait." },
            { text: "One single move.",
              feedback: "Watch once more - the title starts a full move-length after the name. You can't miss it." }
          ],
          applyOnAnswer: {
            css: `.line { transform: translate(0px, 40px); opacity: 0; transition: transform 0.4s ease-out, opacity 0.4s ease-out; }
#title { transition-delay: 0.12s; }
#stage.on .line { transform: translate(0px, 0px); opacity: 1; }`,
            play: false
          }
        },
        {
          type: "predict", kernel: true,
          prompt: "We set transition-delay: 0.2s on the title. What changes about its move?",
          render: {
            html: `<div id="strap" style="position:absolute; left:120px; bottom:96px; background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" class="line" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" class="line" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `.line { transform: translate(0px, 40px); opacity: 0; transition: transform 0.4s ease-out, opacity 0.4s ease-out; }
#title { transition-delay: 0.2s; }
#stage.on .line { transform: translate(0px, 0px); opacity: 1; }`
          },
          options: [
            { text: "It starts 0.2s later - same speed, same length.", correct: true,
              feedback: "Delay never touches speed. Duration owns speed; delay only moves the starting gun." },
            { text: "It moves slower.",
              feedback: "Press PLAY and watch - once it goes, it's exactly as fast as the name line. Only the START moved." },
            { text: "It runs 0.2s shorter.",
              feedback: "Nothing was taken off the move - it all still happens, just later." }
          ]
        },
        {
          type: "predict",
          prompt: "Now BOTH lines get transition-delay: 0.2s. Press PLAY. What does the viewer see?",
          render: {
            html: `<div id="strap" style="position:absolute; left:120px; bottom:96px; background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" class="line" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" class="line" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `.line { transform: translate(0px, 40px); opacity: 0; transition: transform 0.4s ease-out, opacity 0.4s ease-out; transition-delay: 0.2s; }
#stage.on .line { transform: translate(0px, 0px); opacity: 1; }`
          },
          options: [
            { text: "The whole entrance starts a beat late - lines together again.", correct: true,
              feedback: "Equal delays cancel: no stagger, just lateness. A stagger is a DIFFERENCE between delays." },
            { text: "A stagger.",
              feedback: "Staggering needs the lines to start at DIFFERENT times - these two wait out the same 0.2s side by side." },
            { text: "Nothing changes.",
              feedback: "Something changed alright: PLAY now does nothing for a fifth of a second. Directors notice." }
          ]
        },
        {
          type: "fill",
          prompt: "Name lands first, title a beat behind.",
          code: `.line {
  transform: translate(0px, 40px);
  opacity: 0;
  transition: transform 0.4s ease-out, opacity 0.4s ease-out;
}
#title {
  transition-delay: {{blank}};
}
#stage.on .line {
  transform: translate(0px, 0px);
  opacity: 1;
}`,
          bank: ["0.12s", "0.4s", "-0.12s"],
          answer: "0.12s",
          slot: "css",
          render: {
            html: `<div id="strap" style="position:absolute; left:120px; bottom:96px; background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" class="line" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" class="line" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `.line { transform: translate(0px, 40px); opacity: 0; transition: transform 0.4s ease-out, opacity 0.4s ease-out; }
#stage.on .line { transform: translate(0px, 0px); opacity: 1; }`
          },
          success: "Press STOP, then PLAY: name leads, title lands a felt-not-noticed 0.12s behind.",
          feedback: {
            "0.4s": "A whole move-length of waiting - two separate events, not one designed move. Keep the beat near a tenth of a second.",
            "-0.12s": "No time machines: a delay can't start a move before the button. To make the title lead you'd move the delay to the OTHER line."
          }
        },
        {
          type: "fix",
          prompt: "Press PLAY: the title lands first and the name trails - the hierarchy is upside-down. The headline leads. Tap what's wrong.",
          render: {
            html: `<div id="strap" style="position:absolute; left:120px; bottom:96px; background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" class="line" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" class="line" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `.line { transform: translate(0px, 40px); opacity: 0; transition: transform 0.4s ease-out, opacity 0.4s ease-out; }
#name { transition-delay: 0.12s; }
#stage.on .line { transform: translate(0px, 0px); opacity: 1; }`
          },
          tokens: [
            ".line {",
            "  transform: translate(0px, 40px);",
            "  opacity: 0;",
            "  transition: transform 0.4s ease-out, opacity 0.4s ease-out;",
            "}",
            "#name {",
            "  transition-delay: 0.12s;",
            "}"
          ],
          answer: 5,
          fixedToken: "#title {",
          fixedRender: {
            css: `.line { transform: translate(0px, 40px); opacity: 0; transition: transform 0.4s ease-out, opacity 0.4s ease-out; }
#title { transition-delay: 0.12s; }
#stage.on .line { transform: translate(0px, 0px); opacity: 1; }`,
            play: false
          },
          success: "The name is the headline; the title supports it (Unit 3's hierarchy). Press PLAY: the leader lands first.",
          feedback: {
            6: "0.12s is the house beat - the LENGTH is fine. Look at which line is wearing it.",
            default: "The move itself is right. Ask who waits: the delay should sit on the supporting line, not the headline."
          }
        },
        {
          type: "predict",
          prompt: "A designer wants a bigger gap BETWEEN the name and the title while they fly in. Which property?",
          render: {
            html: `<div id="strap" style="position:absolute; left:120px; bottom:96px; background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" class="line" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" class="line" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `.line { transform: translate(0px, 40px); opacity: 0; transition: transform 0.4s ease-out, opacity 0.4s ease-out; }
#title { transition-delay: 0.12s; }
#stage.on .line { transform: translate(0px, 0px); opacity: 1; }`
          },
          options: [
            { text: "margin", correct: true,
              feedback: "Margin is space on SCREEN; delay is space in TIME. The gap between boxes never belonged to animation (4.4)." },
            { text: "transition-delay",
              feedback: "Delay changes WHEN the title moves, not WHERE it sits. The on-screen gap would end up exactly the same." },
            { text: "padding",
              feedback: "Padding is space INSIDE a box - between its edge and its text (3.8). Between two boxes: margin." }
          ]
        }
      ]
    },

    {
      id: "5.7", title: "Choreography",
      concept: "@keyframes writes a named routine with percentage stops; animation performs it - and infinite loops it forever.",
      explain: "A transition can only travel from A to B. @keyframes writes a whole routine - named stops from 0% to 100% - and animation performs it. The percentages are progress through the routine, not pixels and not seconds. And a routine can repeat forever: that's the ticker's engine.",
      exercises: [
        {
          type: "predict",
          prompt: "The pop routine is frozen at its 60% stop, where transform: scale(1.15). The routine ends at scale(1). Next to where it finally lands, what size is the bug right now?",
          render: {
            html: `<div id="bug" style="background-color:#e8b90c; color:#0a2a5e; font-family:Arial,sans-serif; font-size:44px; font-weight:700; padding:10px 18px; border-radius:6px;">NN</div>`,
            css: `#bug { position: absolute; right: 96px; top: 54px; transform: scale(1.15); }`,
            autoplay: true
          },
          options: [
            { text: "A little over full size.", correct: true,
              feedback: "Right - 1.15 is bigger than 1. The routine deliberately overshoots PAST the target, then settles back to full size. That overshoot is what makes a pop feel alive. Watch it run at full speed." },
            { text: "Still smaller than full - not there yet.",
              feedback: "The other way round: 1.15 is bigger than 1, not smaller. It's mid-overshoot, a touch past full size." },
            { text: "Exactly full size.",
              feedback: "Full size is scale(1), where it ENDS at 100%. At the 60% stop it's at scale(1.15) - a little past full." }
          ],
          applyOnAnswer: {
            css: `#bug { position: absolute; right: 96px; top: 54px; transform: scale(0); }
@keyframes pop { 0% { transform: scale(0); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
#stage.on #bug { transform: scale(1); animation-name: pop; animation-duration: 0.4s; }`,
            play: true
          }
        },
        {
          type: "predict", kernel: true,
          prompt: "Read the routine cold: pop runs 0% scale(0), 60% scale(1.15), 100% scale(1), with animation-duration: 0.4s. What happens at 60%?",
          render: {
            html: `<div id="bug" style="background-color:#e8b90c; color:#0a2a5e; font-family:Arial,sans-serif; font-size:44px; font-weight:700; padding:10px 18px; border-radius:6px;">NN</div>`,
            css: `#bug { position: absolute; right: 96px; top: 54px; transform: scale(0); }
@keyframes pop { 0% { transform: scale(0); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
#stage.on #bug { transform: scale(1); animation-name: pop; animation-duration: 0.4s; }`
          },
          options: [
            { text: "The bug has overshot to 1.15 - slightly too big, about to settle back.", correct: true,
              feedback: "You read a routine: at 60% OF THE WAY THROUGH, scale is 1.15. Stops are progress markers." },
            { text: "The bug is 60 pixels wide.",
              feedback: "Percent of the ROUTINE, not pixels. The size at that stop is whatever the stop says: scale(1.15)." },
            { text: "It's 0.6 seconds in.",
              feedback: "Only if the duration were 1s. This routine runs 0.4s, so 60% lands at 0.24s. Stops are progress, not clock time - the same routine can run at any speed." },
            { text: "The bug is 60% see-through.",
              feedback: "That would be opacity - this routine animates scale. Keyframes change exactly the properties they name." }
          ]
        },
        {
          type: "arrange",
          prompt: "Rebuild the routine: pop in, overshoot, settle - then press PLAY.",
          blocks: [
            "@keyframes pop {",
            "  0% { transform: scale(0); }",
            "  60% { transform: scale(1.15); }",
            "  100% { transform: scale(1); }",
            "}",
            "#stage.on #bug { animation-name: pop; animation-duration: 0.4s; }"
          ],
          slot: "css",
          render: {
            html: `<div id="bug" style="position:absolute; right:96px; top:54px; background-color:#e8b90c; color:#0a2a5e; font-family:Arial,sans-serif; font-size:44px; font-weight:700; padding:10px 18px; border-radius:6px;">NN</div>`,
            css: "", house: false
          },
          success: "Enter at 0, overshoot at 60, land at 100 - the routine ends where its LAST stop says: exactly scale(1). Press STOP, then PLAY, and watch it settle.",
          feedback: {
            default: "A routine reads 0% to 100%: start at nothing, overshoot past full (1.15), settle at exactly 1. The landing is the last stop."
          }
        },
        {
          type: "fill",
          prompt: "The sports ticker's crawl dies after one lap. It must never stop.",
          code: `@keyframes crawl {
  0%   { transform: translate(1920px, 0px); }
  100% { transform: translate(-1920px, 0px); }
}
#ticker-text {
  animation-name: crawl;
  animation-duration: 8s;
  animation-timing-function: linear;
  animation-iteration-count: {{blank}};
}`,
          bank: ["infinite", "100", "1"],
          answer: "infinite",
          slot: "css",
          render: {
            html: `<div id="ticker" style="position:absolute; left:0px; bottom:24px; width:1920px; overflow:hidden; background-color:#e8b90c; padding:12px 0;"><div id="ticker-text" style="color:#0a2a5e; font-family:Arial,sans-serif; font-size:34px; font-weight:700; white-space:nowrap;">HIFK 3 - 2 TPS  |  Berg hat-trick sinks TPS  |  Tickets for Saturday on sale now</div></div>`,
            css: `@keyframes crawl { 0% { transform: translate(1920px, 0px); } 100% { transform: translate(-1920px, 0px); } }
#ticker-text { animation-name: crawl; animation-duration: 8s; animation-timing-function: linear; }`,
            autoplay: true
          },
          success: "Lap after lap, forever - the ticker's engine. And notice: no PLAY needed. This routine isn't waiting for a state.",
          feedback: {
            "100": "A hundred laps at 8s is under a quarter hour - and then it stops. Live. On air. News never ends: infinite.",
            "1": "One lap and done - the ticker goes dark eight seconds into the show. Watch it die."
          }
        },
        {
          type: "predict",
          prompt: "The crawl is surging and stalling on every lap. Which timing does it want: animation-timing-function: ___?",
          render: {
            html: `<div id="ticker" style="position:absolute; left:0px; bottom:24px; width:1920px; overflow:hidden; background-color:#e8b90c; padding:12px 0;"><div id="ticker-text" style="color:#0a2a5e; font-family:Arial,sans-serif; font-size:34px; font-weight:700; white-space:nowrap;">HIFK 3 - 2 TPS  |  Berg hat-trick sinks TPS  |  Tickets for Saturday on sale now</div></div>`,
            css: `@keyframes crawl { 0% { transform: translate(1920px, 0px); } 100% { transform: translate(-1920px, 0px); } }
#ticker-text { animation-name: crawl; animation-duration: 5s; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }`,
            autoplay: true
          },
          options: [
            { text: "linear", correct: true,
              feedback: "The one move where the robot wins. A crawl never arrives and never leaves - it just travels. Constant speed reads as calm. Watch it now." },
            { text: "ease-out",
              feedback: "Entrances decelerate - but a crawl has no entrance to land. It slows to a near-stop at the end of every lap, then lurches." },
            { text: "ease-in",
              feedback: "It would crawl away from every lap start, then sprint. Watch the render - seasick yet?" }
          ],
          applyOnAnswer: {
            css: `@keyframes crawl { 0% { transform: translate(1920px, 0px); } 100% { transform: translate(-1920px, 0px); } }
#ticker-text { animation-name: crawl; animation-duration: 8s; animation-timing-function: linear; animation-iteration-count: infinite; }`,
            play: true
          }
        },
        {
          type: "predict",
          prompt: "Could a TRANSITION alone perform the overshoot-and-settle?",
          render: {
            html: `<div id="bug" style="background-color:#e8b90c; color:#0a2a5e; font-family:Arial,sans-serif; font-size:44px; font-weight:700; padding:10px 18px; border-radius:6px;">NN</div>`,
            css: `#bug { position: absolute; right: 96px; top: 54px; transform: scale(0); }
@keyframes pop { 0% { transform: scale(0); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
#stage.on #bug { transform: scale(1); animation-name: pop; animation-duration: 0.4s; }`
          },
          options: [
            { text: "No - a transition travels start to end; the overshoot needs a middle stop.", correct: true,
              feedback: "That's the dividing line: two states, use a transition; a routine with stops in between, write keyframes." },
            { text: "Yes, with a longer duration.",
              feedback: "Duration changes how LONG the trip takes, never its shape - A to B stays A to B." },
            { text: "Yes, with ease-out.",
              feedback: "Easing shapes the SPEED, never the path. No easing goes past the target and comes back." }
          ]
        }
      ]
    },

    {
      id: "5.8", title: "Review remix",
      concept: "Nothing new - one full lap: on air, off air, and everything that makes the trip smooth.",
      explain: "Six quick jobs from across Units 1-5. Every one ends the same way: press PLAY, press STOP, and watch the full cycle earn its keep.",
      exercises: [
        {
          type: "fix",
          prompt: "Job one (5.3): the score strap snaps on PLAY. Find the broken word and fix it, then play the cycle.",
          render: {
            html: `<div id="score" style="background-color:#0a3d91; color:#ffffff; font-family:Arial,sans-serif; font-size:46px; font-weight:700; padding:16px 28px;">HIFK 3 - 2 TPS</div>`,
            css: `#score { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: left 0.5s; }
#stage.on #score { transform: translate(0px, 0px); opacity: 1; }`
          },
          tokens: [
            "#score {",
            "  transform: translate(0px, 60px);",
            "  opacity: 0;",
            "  transition:",
            "left",
            "0.5s;",
            "}",
            "#stage.on #score {",
            "  transform: translate(0px, 0px);",
            "  opacity: 1;",
            "}"
          ],
          answer: 4,
          fixedToken: "transform",
          fixedRender: {
            css: `#score { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.5s; }
#stage.on #score { transform: translate(0px, 0px); opacity: 1; }`,
            play: false
          },
          success: "left never changes - the pin holds still (5.1); transform is what differs. PLAY, then STOP: the slide glides both ways now.",
          feedback: {
            5: "The clock is fine. The transition watches a property that never changes - compare the two states.",
            default: "Compare the off state and the on state: which property actually differs? The transition must name that one."
          }
        },
        {
          type: "fix",
          prompt: "Job two (5.5): press STOP - James Okafor's strap dawdles away like an entrance in reverse. Fix the out.",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">James Okafor</div><div id="title" style="color:#dbe4f5; font-size:34px;">Political Correspondent</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.6s ease-out, opacity 0.6s ease-out; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; transition: transform 0.5s ease-out, opacity 0.5s ease-out; }`,
            autoplay: true
          },
          tokens: [
            "#strap {",
            "  transform: translate(0px, 60px);",
            "  opacity: 0;",
            "  transition: transform 0.6s ease-out, opacity 0.6s ease-out;",
            "}",
            "#stage.on #strap {",
            "  transform: translate(0px, 0px);",
            "  opacity: 1;",
            "  transition: transform 0.5s ease-out, opacity 0.5s ease-out;",
            "}"
          ],
          answer: 3,
          fixedToken: "  transition: transform 0.3s ease-in, opacity 0.3s ease-in;",
          fixedRender: {
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 60px); opacity: 0; transition: transform 0.3s ease-in, opacity 0.3s ease-in; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; transition: transform 0.5s ease-out, opacity 0.5s ease-out; }`,
            play: true
          },
          success: "Press STOP: 0.3s ease-in, gone like it's needed elsewhere. Outs flip the curve and run shorter - and they live in the base rule.",
          feedback: {
            8: "That rule carries the entrance - it's already right. The out lives in the rule that remains after STOP.",
            default: "Outs accelerate away and run shorter than ins. Which rule is in force after STOP takes the on state away?"
          }
        },
        {
          type: "predict",
          prompt: "Job three (5.4): branding stripped - motion only. Press PLAY and read the two arrivals. Which silhouette is ease-out?",
          render: {
            html: `<div id="a" class="sil" style="left:300px;">A</div><div id="b" class="sil" style="left:1160px;">B</div>`,
            css: `.sil { position: absolute; bottom: 96px; width: 460px; height: 110px; background-color: #454c59; color: #8a90a0; font-family: Arial, sans-serif; font-size: 40px; font-weight: 700; text-align: center; line-height: 110px; transform: translate(0px, 320px); }
#a { transition: transform 1s ease-in; }
#b { transition: transform 1s ease-out; }
#stage.on .sil { transform: translate(0px, 0px); }`
          },
          options: [
            { text: "B", correct: true,
              feedback: "Fast off the line, gentle landing - deceleration you can now spot naked. A crept, then slammed: ease-in." },
            { text: "A",
              feedback: "A creeps off the line and slams into place - acceleration, ease-in. The one that LANDS gently is the ease-out." }
          ]
        },
        {
          type: "arrange",
          prompt: "Job four (5.7): the bug's pop got shuffled in an update. Rebuild it: enter, overshoot, settle at full size - then press PLAY.",
          blocks: [
            "@keyframes pop {",
            "  0% { transform: scale(0); }",
            "  60% { transform: scale(1.15); }",
            "  100% { transform: scale(1); }",
            "}",
            "#stage.on #bug { animation-name: pop; animation-duration: 0.4s; }"
          ],
          slot: "css",
          render: {
            html: `<div id="bug" style="position:absolute; right:96px; top:54px; background-color:#e8b90c; color:#0a2a5e; font-family:Arial,sans-serif; font-size:44px; font-weight:700; padding:10px 18px; border-radius:6px;">NN</div>`,
            css: "", house: false
          },
          success: "Settled at scale(1). Press STOP, then PLAY again - overshoot-and-settle, the pop that feels alive.",
          feedback: {
            default: "0% is where it starts (nothing), 60% the overshoot (1.15), 100% the landing (exactly 1) - the routine rests where its last stop says."
          }
        },
        {
          type: "fill",
          prompt: "Job five (5.6): rebuild the weather strap's stagger - the name leads, the title lands a beat behind. Which selector wears the delay?",
          code: `.line {
  transform: translate(0px, 40px);
  opacity: 0;
  transition: transform 0.4s ease-out, opacity 0.4s ease-out;
}
{{blank}} {
  transition-delay: 0.12s;
}
#stage.on .line {
  transform: translate(0px, 0px);
  opacity: 1;
}`,
          bank: ["#title", "#name", ".line"],
          answer: "#title",
          slot: "css",
          render: {
            html: `<div id="strap" style="position:absolute; left:120px; bottom:96px; background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" class="line" style="color:#ffffff; font-size:52px; font-weight:700;">Alexandra Rivera</div><div id="title" class="line" style="color:#dbe4f5; font-size:34px;">Weather</div></div>`,
            css: `.line { transform: translate(0px, 40px); opacity: 0; transition: transform 0.4s ease-out, opacity 0.4s ease-out; }
#stage.on .line { transform: translate(0px, 0px); opacity: 1; }`
          },
          success: "STOP, then PLAY: Alexandra leads, Weather follows 0.12s behind - felt, not noticed.",
          feedback: {
            "#name": "Press STOP, then PLAY - now the headline trails its own support line. Upside-down: the delay belongs on the supporting line.",
            ".line": "That delays BOTH lines - equal delays cancel the stagger (you proved that in 5.6). A stagger is a difference between delays."
          }
        },
        {
          type: "predict",
          prompt: "Job six (5.1/5.2): before PLAY the off state reads transform: translate(0px, 40px) scale(0); opacity: 0. Where is the strap, what size, and is it deleted?",
          render: {
            html: `<div id="strap" style="background-color:#0a3d91; padding:22px 34px; font-family:Arial,sans-serif;"><div id="name" style="color:#ffffff; font-size:52px; font-weight:700;">Maria Kranz</div><div id="title" style="color:#dbe4f5; font-size:34px;">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; transform: translate(0px, 40px) scale(0); opacity: 0; transition: transform 0.3s ease-in, opacity 0.3s ease-in; }
#stage.on #strap { transform: translate(0px, 0px) scale(1); opacity: 1; transition: transform 0.5s ease-out, opacity 0.5s ease-out; }`
          },
          options: [
            { text: "40px below its pin, at no size, invisible - and very much still in the code, ready to enter.", correct: true,
              feedback: "Reading the parked state cold: below the pin (y grows down), nothing size, opacity zero - three ready switches, one PLAY. Press it." },
            { text: "Deleted - there's nothing on screen.",
              feedback: "Nothing SHOWING is not nothing THERE. scale(0) and opacity 0 park it; the element and its pin wait in the file. Press PLAY." },
            { text: "40px above its pin at full size, just transparent.",
              feedback: "Positive y slides DOWN (y grows downward), and scale(0) is no size at all. Read all three values again." }
          ]
        }
      ]
    },

    {
      id: "cp5", title: "Checkpoint: On air, off air",
      concept: "Build a full motion spec - in, out, stagger - and fly it over live video.",
      explain: "A motion spec arrives from the NN design department. IN: strap slides up 40px and fades in, 0.5s, decelerating; title follows 120ms behind. OUT: fade + slide down, 0.3s, accelerating. PLAY switches the stage to its on state; STOP switches it back - trust it for now, Unit 7 opens the buttons, Unit 8 shows the switch.",
      isCheckpoint: true,
      exercises: [
        {
          type: "build", kernel: true,
          prompt: "Assemble the motion values to the spec, then PLAY & check - and press STOP too: the out is part of the spec.",
          card: {
            "IN": "slide up 40px + fade, 0.5s, decelerating",
            "IN stagger": "title lands 120ms behind the name",
            "OUT": "fade + slide down, 0.3s, accelerating"
          },
          template: `#strap {
  position: absolute; left: 120px; bottom: 96px;
  background-color: #0a3d91; padding: 24px 34px;
  transform: translate(0px, {{park}}px);
  opacity: 0;
  transition: transform {{outdur}} {{outease}}, opacity {{outdur}} {{outease}};
}
.line { font-family: Arial, sans-serif; color: #ffffff; font-size: 52px; font-weight: 700;
  opacity: 0; transition: opacity {{outdur}} {{outease}}; }
#title { font-size: 34px; font-weight: 400; color: #dbe4f5; }
#stage.on #strap {
  transform: translate(0px, 0px);
  opacity: 1;
  transition: transform {{indur}} {{inease}}, opacity {{indur}} {{inease}};
}
#stage.on .line { opacity: 1; transition: opacity {{indur}} {{inease}}; }
#stage.on #title { transition-delay: {{delay}}; }`,
          slot: "css",
          fields: [
            { key: "park", label: "Parking offset (px below the pin)",
              bank: ["40", "60", "-40"], answer: "40" },
            { key: "indur", label: "IN duration",
              bank: ["0.5s", "0.3s", "1s"], answer: "0.5s" },
            { key: "inease", label: "IN curve",
              bank: ["ease-out", "ease-in", "linear"], answer: "ease-out" },
            { key: "outdur", label: "OUT duration",
              bank: ["0.3s", "0.5s", "0.8s"], answer: "0.3s" },
            { key: "outease", label: "OUT curve",
              bank: ["ease-in", "ease-out", "linear"], answer: "ease-in" },
            { key: "delay", label: "Title delay (IN)",
              bank: ["0.12s", "0.4s", "0s"], answer: "0.12s" }
          ],
          successFeedback: "To spec: parks 40 low, rises 0.5s decelerating with the title a beat behind, and leaves in 0.3s accelerating. Press STOP, then PLAY, and watch your full cycle.",
          render: {
            html: `<div id="strap"><div id="name" class="line">Maria Kranz</div><div id="title" class="line">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; background-color: #0a3d91; padding: 24px 34px; }
.line { font-family: Arial, sans-serif; color: #ffffff; font-size: 52px; font-weight: 700; }
#title { font-size: 34px; font-weight: 400; color: #dbe4f5; }`
          }
        },
        {
          type: "predict",
          prompt: "The taste replay: press PLAY, let it land, press STOP. Watch your in, then your out. Does the out feel FASTER than the in - does it leave like it's needed elsewhere?",
          render: {
            html: `<div id="strap"><div id="name" class="line">Maria Kranz</div><div id="title" class="line">News Anchor</div></div>`,
            css: `#strap { position: absolute; left: 120px; bottom: 96px; background-color: #0a3d91; padding: 24px 34px; transform: translate(0px, 40px); opacity: 0; transition: transform 0.3s ease-in, opacity 0.3s ease-in; }
.line { font-family: Arial, sans-serif; color: #ffffff; font-size: 52px; font-weight: 700; opacity: 0; transition: opacity 0.3s ease-in; }
#title { font-size: 34px; font-weight: 400; color: #dbe4f5; }
#stage.on #strap { transform: translate(0px, 0px); opacity: 1; transition: transform 0.5s ease-out, opacity 0.5s ease-out; }
#stage.on .line { opacity: 1; transition: opacity 0.5s ease-out; }
#stage.on #title { transition-delay: 0.12s; }`
          },
          options: [
            { text: "Yes - shorter, accelerating, gone. Arrives like it matters, leaves like it's needed elsewhere.", correct: true,
              feedback: "That's the whole unit in one cycle. Numbers get you to spec; your eye keeps you there. Welcome to motion that isn't PowerPoint." },
            { text: "No - the out feels as slow as the in, or softer.",
              feedback: "Then re-watch against the spec: the out must run 0.3s ease-in against the 0.5s ease-out in - strictly shorter, curve flipped (5.5). Play the cycle again and watch the leave." }
          ]
        }
      ]
    }
  ]
});
