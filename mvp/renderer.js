// The live graphic renderer, delivered as an iframe srcdoc string.
// Sandboxed (allow-scripts only) so student/exercise HTML runs in an isolated
// origin and can never touch the app. The app talks to it via postMessage:
//   { bodyHTML, mode: 'video'|'transparent', playing: bool, highlight: idx|null,
//     cssOff: bool, jsOff: bool }
// This is the hidden "boilerplate" the course promises: the fixed 1920x1080 stage,
// the NN house-style CSS, and the PLAY/STOP animation. Students only ever supply
// bodyHTML; the stage does the rest.

const RENDERER_SRCDOC = `<!doctype html>
<meta charset="utf-8">
<style>
  html,body{margin:0;height:100%;overflow:hidden;background:#111;
    font-family:"Segoe UI",system-ui,sans-serif;}
  /* the frame that letterboxes the fixed-size stage into whatever space we have */
  #frame{position:absolute;inset:0;overflow:hidden;}
  /* program feed vs transparency checker */
  #frame.video{background:
    radial-gradient(120% 80% at 50% 0%, #2a3550 0%, #141a28 55%, #0a0e18 100%);}
  #frame.transparent{background:
    conic-gradient(#c9c9c9 90deg,#8f8f8f 0 180deg,#c9c9c9 0 270deg,#8f8f8f 0)
    0 0/40px 40px;}
  /* faux studio detail so 'over video' reads as broadcast, not a plain gradient */
  #frame.video::before{content:"";position:absolute;inset:0;
    background:
      linear-gradient(90deg,transparent 0 8%,rgba(255,255,255,.03) 8% 8.3%,transparent 8.3%),
      radial-gradient(60% 40% at 78% 34%, rgba(120,150,220,.18), transparent 60%),
      radial-gradient(40% 30% at 22% 30%, rgba(200,180,120,.10), transparent 60%);}
  /* the canvas is ALWAYS 1920x1080; #frame scales it to fit and centres it */
  #stage{position:absolute;width:1920px;height:1080px;transform-origin:top left;}

  /* ---- NN house style (the hidden CSS the course reveals in Unit 3) ---- */
  .gfx{position:absolute;left:120px;bottom:120px;
    background:#0a3d91;padding:22px 34px;border-radius:4px;
    box-shadow:0 10px 30px rgba(0,0,0,.45);
    display:inline-block;min-width:520px;
    /* start state: below + invisible, ready to animate in */
    opacity:0;transform:translateY(46px);
    transition:opacity .28s ease-in, transform .3s ease-in;}
  #stage.on .gfx{opacity:1;transform:translateY(0);
    transition:opacity .45s ease-out, transform .5s cubic-bezier(.16,1,.3,1);}
  .gfx div{color:#fff;font-size:52px;font-weight:700;line-height:1.15;
    letter-spacing:.2px;}
  .gfx div div{font-weight:700;}
  .gfx div div + div, .gfx > div + div{font-size:34px;font-weight:400;
    color:#dbe4f5;margin-top:6px;}
  .gfx span{background:#e8b90c;color:#0a2a5e;font-weight:700;
    padding:0 10px;border-radius:3px;margin-left:8px;font-size:.7em;
    vertical-align:middle;letter-spacing:1px;}
  .gfx img{height:60px;vertical-align:middle;margin-right:18px;
    display:inline-block;
    /* stand-in logo when the file isn't a real asset */
    background:linear-gradient(135deg,#e8b90c,#b8860b);border-radius:6px;
    min-width:60px;object-fit:contain;}
  .gfx img[src*="gold"]{background:linear-gradient(135deg,#ffd85e,#c9971f);}
  .gfx img.broken{background:#7a1e1e;position:relative;}
  .gfx img.broken::after{content:"?";color:#fff;position:absolute;inset:0;
    display:grid;place-items:center;font-size:40px;}

  /* CSS-OFF demo (lesson 0.3): strip the house style to naked text top-left */
  #stage.cssoff .gfx{all:unset;position:absolute;top:16px;left:16px;
    display:block;color:#000;background:#fff;padding:2px;font-size:40px;
    opacity:1;transform:none;}
  #stage.cssoff .gfx *{all:unset;display:block;color:#000;background:#fff;
    font-size:40px;}
  #stage.cssoff .gfx span{display:inline;}

  /* highlight for Observe 'tap the code' cross-lighting */
  .hl{outline:4px solid #ff3b3b;outline-offset:3px;border-radius:3px;
    animation:pulse .9s ease-in-out infinite;}
  @keyframes pulse{0%,100%{outline-color:#ff3b3b}50%{outline-color:#ffd0d0}}
</style>
<div id="frame" class="video"><div id="stage"></div></div>
<script>
  var frame = document.getElementById('frame');
  var stage = document.getElementById('stage');

  function fit(){
    var fw = frame.clientWidth, fh = frame.clientHeight;
    var s = Math.min(fw / 1920, fh / 1080);
    stage.style.transform = 'scale(' + s + ')';
    // centre the scaled 1920x1080 box inside the frame (letterbox)
    stage.style.left = Math.round((fw - 1920 * s) / 2) + 'px';
    stage.style.top  = Math.round((fh - 1080 * s) / 2) + 'px';
  }
  window.addEventListener('resize', fit);

  function render(msg){
    if (typeof msg.bodyHTML === 'string'){
      // wrap loose lines in the .gfx panel unless the HTML already is one
      var html = msg.bodyHTML.trim();
      stage.innerHTML = '<div class="gfx">' + html + '</div>';
      // mark broken image sources so the "missing logo" lesson reads visually
      stage.querySelectorAll('img').forEach(function(im){
        var s = im.getAttribute('src') || '';
        if (!/\\.(png|jpg|jpeg|svg)$/i.test(s)) im.classList.add('broken');
      });
    }
    frame.className = (msg.mode === 'transparent') ? 'transparent' : 'video';
    stage.classList.toggle('on', !!msg.playing && !msg.jsOff);
    stage.classList.toggle('cssoff', !!msg.cssOff);
    // clear + apply highlight
    stage.querySelectorAll('.hl').forEach(function(e){e.classList.remove('hl');});
    if (msg.highlight != null){
      var els = stage.querySelectorAll('.gfx div, .gfx span, .gfx img');
      if (els[msg.highlight]) els[msg.highlight].classList.add('hl');
    }
    fit();
  }

  window.addEventListener('message', function(e){
    if (e.data && e.data.__gfx) render(e.data);
  });
  fit();
  // tell the parent we're ready
  parent.postMessage({__gfxReady:true}, '*');
</script>`;
