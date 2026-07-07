// The live 1920x1080 stage, delivered as an iframe srcdoc string.
// Sandboxed (allow-scripts only): template HTML/CSS/JS runs in an isolated origin.
//
// Message protocol (app -> stage):
//   {__gfxLoad:{html,css,js,house,kind,mode,overlay,marker,autoplay}}  full template (re)load
//     marker:{x,y,label?}  draws a crosshair at stage px (x,y) with an (x, y) readout
//   {__gfxSet:{mode?,highlight?,cssOff?}}                  view state tweaks
//   {__gfxCmd:"play"|"stop"|"next"}                        lifecycle buttons
//   {__gfxUpdate:{f0:"...",...}}                            operator panel update
//   {__gfxProbe:{id,queries:[{sel,text?,style?}]}}          checker probe
// Stage -> app:  {__gfxReady:true} | {__gfxProbeResult:{id,results}} | {__gfxError:msg}

const APP_RENDERER_SRCDOC = String.raw`<!doctype html>
<meta charset="utf-8">
<style>
  html,body{margin:0;height:100%;overflow:hidden;background:#111;
    font-family:"Segoe UI",system-ui,sans-serif;}
  #frame{position:absolute;inset:0;overflow:hidden;}
  #frame.video{background:
    radial-gradient(120% 80% at 50% 0%, #2a3550 0%, #141a28 55%, #0a0e18 100%);}
  #frame.video::before{content:"";position:absolute;inset:0;
    background:
      linear-gradient(90deg,transparent 0 8%,rgba(255,255,255,.03) 8% 8.3%,transparent 8.3%),
      radial-gradient(60% 40% at 78% 34%, rgba(120,150,220,.18), transparent 60%),
      radial-gradient(40% 30% at 22% 30%, rgba(200,180,120,.10), transparent 60%),
      /* lower-third studio glow so a semi-transparent panel visibly reveals scene */
      radial-gradient(70% 46% at 50% 90%, rgba(150,170,215,.20), transparent 72%);}
  #frame.transparent{background:
    conic-gradient(#c9c9c9 90deg,#8f8f8f 0 180deg,#c9c9c9 0 270deg,#8f8f8f 0)
    0 0/40px 40px;}
  #stage{position:absolute;width:1920px;height:1080px;transform-origin:top left;}

  /* overlays live above the graphic, in stage coordinates */
  #overlay{position:absolute;inset:0;pointer-events:none;z-index:999;display:none;}
  #overlay.grid{display:block;background:
    repeating-linear-gradient(0deg,rgba(120,200,255,.14) 0 1px,transparent 1px 100px),
    repeating-linear-gradient(90deg,rgba(120,200,255,.14) 0 1px,transparent 1px 100px);}
  #overlay.grid::after{content:"";position:absolute;left:960px;top:0;bottom:0;
    border-left:1px solid rgba(120,200,255,.4);}
  #overlay.grid::before{content:"";position:absolute;top:540px;left:0;right:0;
    border-top:1px solid rgba(120,200,255,.4);}
  #overlay.safe{display:block;}
  #overlay.safe::before{content:"TITLE SAFE";position:absolute;inset:54px 96px;
    border:3px dashed rgba(232,185,12,.65);color:rgba(232,185,12,.8);
    font:700 24px/1 "Segoe UI",sans-serif;padding:10px;letter-spacing:.2em;}

  /* coordinate marker + live (x, y) readout, positioned in stage px */
  #marker{position:absolute;display:none;z-index:998;pointer-events:none;}
  #marker.on{display:block;}
  #marker::before,#marker::after{content:"";position:absolute;
    background:rgba(232,185,12,.98);box-shadow:0 0 0 1.5px rgba(0,0,0,.5);}
  #marker::before{left:-28px;top:-2px;width:56px;height:4px;}
  #marker::after{left:-2px;top:-28px;width:4px;height:56px;}
  #marker .rd{position:absolute;left:22px;top:14px;background:rgba(10,14,24,.9);
    color:#e8b90c;font:700 30px/1 "Segoe UI",sans-serif;padding:8px 14px;
    border-radius:5px;white-space:nowrap;letter-spacing:.04em;}

  /* friendly on-air error note - plain language, never raw JS jargon */
  #err{position:absolute;left:0;right:0;bottom:0;z-index:1000;display:none;
    background:linear-gradient(0deg,rgba(140,22,22,.97),rgba(122,18,18,.97));
    color:#fff;font:600 30px/1.35 "Segoe UI",sans-serif;padding:22px 40px;
    border-top:4px solid #ff5a5a;}
  #err.on{display:block;}
  #err::before{content:"GRAPHIC ERROR";display:block;font:800 18px/1 "Segoe UI",sans-serif;
    letter-spacing:.22em;color:#ffb3b3;margin-bottom:9px;}
</style>
<style id="house"></style>
<style id="tplcss"></style>
<div id="frame" class="video"><div id="stage"><div id="content"></div>
<div id="overlay"></div><div id="marker"><span class="rd"></span></div>
<div id="err"></div></div></div>
<script>
(function(){
  var frame=document.getElementById('frame'),
      stage=document.getElementById('stage'),
      content=document.getElementById('content'),
      overlay=document.getElementById('overlay'),
      marker=document.getElementById('marker'),
      markerRd=marker.querySelector('.rd'),
      errEl=document.getElementById('err'),
      houseStyle=document.getElementById('house'),
      tplcss=document.getElementById('tplcss');

  // Turn a raw JS error into a plain-language on-air note a beginner can read -
  // no null / undefined / TypeError / SyntaxError jargon ever reaches the student.
  function translateError(e){
    var name=(e&&e.name)||'', m=String((e&&e.message)||e||'');
    if(name==='SyntaxError') return "This code has a typo the player can't read - the graphic never started.";
    if(/of null/.test(m)) return "The code reached for an element that isn't on the page - it grabbed nothing.";
    if(/of undefined/.test(m)) return "The code read a value that was never set.";
    var nd=m.match(/(\w+) is not defined/);
    if(nd) return "The code used a name the page doesn't know: "+nd[1]+".";
    return "The graphic hit a snag and couldn't play.";
  }
  function showErr(e){
    var msg=translateError(e);
    errEl.textContent=msg; errEl.className='on';
    parent.postMessage({__gfxError:msg},'*');
  }
  function clearErr(){ errEl.className=''; errEl.textContent=''; }

  var HOUSE=[
    '#content .gfx{position:absolute;left:120px;bottom:120px;background:#0a3d91;',
    ' padding:22px 34px;border-radius:4px;box-shadow:0 10px 30px rgba(0,0,0,.45);',
    ' display:inline-block;min-width:520px;opacity:0;transform:translateY(46px);',
    ' transition:opacity .28s ease-in, transform .3s ease-in;}',
    '#stage.on #content .gfx{opacity:1;transform:translateY(0);',
    ' transition:opacity .45s ease-out, transform .5s cubic-bezier(.16,1,.3,1);}',
    '#content .gfx div{color:#fff;font-size:52px;font-weight:700;line-height:1.15;}',
    '#content .gfx div + div{font-size:34px;font-weight:400;color:#dbe4f5;margin-top:6px;}',
    '#content .gfx span{background:#e8b90c;color:#0a2a5e;font-weight:700;padding:0 10px;',
    ' border-radius:3px;margin-left:8px;font-size:.7em;vertical-align:middle;letter-spacing:1px;}',
    '#content .gfx img{height:60px;vertical-align:middle;margin-right:18px;display:inline-block;',
    ' background:linear-gradient(135deg,#e8b90c,#b8860b);border-radius:6px;min-width:60px;}',
    '#content .gfx img[src*="gold"]{background:linear-gradient(135deg,#ffd85e,#c9971f);}',
    '#content .gfx img.broken{background:#7a1e1e;}',
    /* corner bug - small channel mark, top-right title-safe corner, always glued there
       (matches the course convention taught in Unit 4: right:96px; top:54px) */
    '#content .gfx.bug{right:96px;top:54px;left:auto;bottom:auto;min-width:0;width:120px;height:120px;',
    ' padding:0;border-radius:14px;display:flex;flex-direction:column;align-items:center;',
    ' justify-content:center;text-align:center;background:rgba(10,42,145,.92);',
    ' transform:translateY(0) scale(.7);}',
    '#stage.on #content .gfx.bug{transform:translateY(0) scale(1);}',
    '#content .gfx.bug div{font-size:44px;font-weight:800;letter-spacing:2px;line-height:1;}',
    '#content .gfx.bug div + div{font-size:16px;font-weight:600;margin-top:4px;letter-spacing:1px;}',
    /* ticker - full-width crawl band pinned to the very bottom edge */
    '#content .gfx.ticker{left:0;right:0;bottom:0;width:1920px;min-width:0;border-radius:0;',
    ' box-sizing:border-box;padding:24px 60px;background:#0a2a5e;',
    ' box-shadow:0 -6px 24px rgba(0,0,0,.4);transform:translateY(140px);}',
    '#stage.on #content .gfx.ticker{transform:translateY(0);}',
    '#content .gfx.ticker div{font-size:40px;font-weight:600;white-space:nowrap;',
    ' overflow:hidden;text-overflow:ellipsis;}',
    /* full-screen - graphic that replaces the whole 1920x1080 frame */
    '#content .gfx.fullscreen{left:0;top:0;right:0;bottom:0;width:1920px;height:1080px;',
    ' min-width:0;border-radius:0;box-sizing:border-box;padding:140px 160px;box-shadow:none;',
    ' background:linear-gradient(140deg,#0a3d91 0%,#071f4a 100%);',
    ' display:flex;flex-direction:column;justify-content:center;',
    ' transform:translateY(0) scale(1.06);}',
    '#stage.on #content .gfx.fullscreen{transform:translateY(0) scale(1);}',
    '#content .gfx.fullscreen div{font-size:120px;line-height:1.04;}',
    '#content .gfx.fullscreen div + div{font-size:56px;font-weight:400;color:#dbe4f5;margin-top:24px;}',
    '.hl{outline:4px solid #ff3b3b !important;outline-offset:3px;',
    ' animation:hlpulse .9s ease-in-out infinite;}',
    '@keyframes hlpulse{0%,100%{outline-color:#ff3b3b}50%{outline-color:#ffd0d0}}'
  ].join('\n');
  var CSSOFF='#content, #content *{all:revert;font-size:40px;color:#000;background:#fff;}';

  function fit(){
    var fw=frame.clientWidth, fh=frame.clientHeight;
    var s=Math.min(fw/1920, fh/1080);
    stage.style.transform='scale('+s+')';
    stage.style.left=Math.round((fw-1920*s)/2)+'px';
    stage.style.top=Math.round((fh-1080*s)/2)+'px';
  }
  window.addEventListener('resize',fit);

  /* ---------------- tiny GSAP shim ---------------- */
  var EASES={
    'none':function(t){return t;}, 'linear':function(t){return t;},
    'power1.out':function(t){return 1-Math.pow(1-t,2);},
    'power1.in':function(t){return t*t;},
    'power2.out':function(t){return 1-Math.pow(1-t,3);},
    'power2.in':function(t){return t*t*t;},
    'power2.inOut':function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;},
    'back.out':function(t){var c=1.70158;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2);}
  };
  var PROPS=['x','y','scale','opacity'];
  var anims=[], rafOn=false;

  function gstate(el){
    if(!el.__g){
      var cs=getComputedStyle(el);
      el.__g={x:0,y:0,scale:1,opacity:parseFloat(cs.opacity)};
      if(isNaN(el.__g.opacity)) el.__g.opacity=1;
    }
    return el.__g;
  }
  function gapply(el){
    var g=el.__g;
    el.style.transform='translate('+g.x+'px,'+g.y+'px) scale('+g.scale+')';
    el.style.opacity=g.opacity;
  }
  function resolveTargets(t){
    if(typeof t==='string') return Array.prototype.slice.call(content.querySelectorAll(t));
    if(t && t.nodeType) return [t];
    return [];
  }
  function schedule(targets, mode, aVars, bVars, atTime){
    // mode: 'to' (current->b), 'from' (a->current), 'fromTo' (a->b)
    var vars = (mode==='fromTo')?bVars:aVars;
    var dur=(vars.duration!=null?vars.duration:0.5)*1000;
    var delay=(vars.delay||0)*1000;
    var stagger=(vars.stagger||0)*1000;
    var ease=EASES[vars.ease]||EASES['power1.out'];
    var endTime=atTime+delay+dur+stagger*Math.max(0,targets.length-1);
    targets.forEach(function(el,i){
      anims.push({el:el, mode:mode, a:aVars, b:bVars, ease:ease,
                  start:atTime+delay+i*stagger, dur:dur, init:false, done:false});
    });
    startRaf();
    return endTime;
  }
  function initAnim(an){
    var g=gstate(an.el), from={}, to={};
    PROPS.forEach(function(p){
      var av=(an.a&&an.a[p]!=null)?an.a[p]:null;
      var bv=(an.b&&an.b[p]!=null)?an.b[p]:null;
      if(an.mode==='to'){ if(av==null)return; from[p]=g[p]; to[p]=av; }
      else if(an.mode==='from'){ if(av==null)return; from[p]=av; to[p]=g[p]; }
      else { if(av==null&&bv==null)return;
             from[p]=(av!=null)?av:g[p]; to[p]=(bv!=null)?bv:g[p]; }
    });
    an.from=from; an.to=to; an.init=true;
    // snap to the from-state immediately
    for(var p in from){ g[p]=from[p]; } gapply(an.el);
  }
  function tick(now){
    var live=false;
    anims.forEach(function(an){
      if(an.done) return;
      if(now<an.start){ live=true; return; }
      if(!an.init) initAnim(an);
      var t=an.dur<=0?1:Math.min(1,(now-an.start)/an.dur);
      var e=an.ease(t), g=gstate(an.el);
      for(var p in an.from){ g[p]=an.from[p]+(an.to[p]-an.from[p])*e; }
      gapply(an.el);
      if(t>=1) an.done=true; else live=true;
    });
    anims=anims.filter(function(a){return !a.done;});
    if(live) requestAnimationFrame(tick); else rafOn=false;
  }
  function startRaf(){ if(!rafOn){ rafOn=true; requestAnimationFrame(tick); } }
  function nowMs(){ return performance.now(); }

  var gsap={
    to:function(t,v){ return schedule(resolveTargets(t),'to',v,null,nowMs()); },
    from:function(t,v){ return schedule(resolveTargets(t),'from',v,null,nowMs()); },
    fromTo:function(t,a,b){ return schedule(resolveTargets(t),'fromTo',a,b,nowMs()); },
    timeline:function(){
      var base=nowMs(), cursor=0;
      function pos(p, dur, vars){
        var start;
        if(p==null) start=cursor;
        else if(typeof p==='number') start=p*1000;
        else if(/^-=/.test(p)) start=cursor-parseFloat(p.slice(2))*1000;
        else if(/^\+=/.test(p)) start=cursor+parseFloat(p.slice(2))*1000;
        else start=cursor;
        return start;
      }
      var tl={
        to:function(t,v,p){ var s=pos(p); var end=schedule(resolveTargets(t),'to',v,null,base+s);
          cursor=Math.max(cursor,end-base); return tl; },
        from:function(t,v,p){ var s=pos(p); var end=schedule(resolveTargets(t),'from',v,null,base+s);
          cursor=Math.max(cursor,end-base); return tl; },
        fromTo:function(t,a,b,p){ var s=pos(p); var end=schedule(resolveTargets(t),'fromTo',a,b,base+s);
          cursor=Math.max(cursor,end-base); return tl; }
      };
      return tl;
    },
    killAll:function(){ anims=[]; }
  };
  window.gsap=gsap;

  /* ---------------- template lifecycle ---------------- */
  var handlers={play:null,stop:null,update:null,next:null};

  function loadTemplate(spec){
    gsap.killAll();
    stage.classList.remove('on');
    clearErr();
    handlers={play:null,stop:null,update:null,next:null};
    // reset per-element gsap state by rebuilding content
    var useHouse = (spec.house!=null)?spec.house:!spec.css;
    var html=(spec.html||'').trim();
    var KINDS={bug:1,ticker:1,fullscreen:1};
    var kindClass=(spec.kind&&KINDS[spec.kind])?(' '+spec.kind):'';
    content.innerHTML = useHouse ? '<div class="gfx'+kindClass+'">'+html+'</div>' : html;
    // The house stylesheet is always present (scoped to #content .gfx / .hl), so
    // custom-css templates can still opt into the house look by writing .gfx markup.
    houseStyle.textContent = HOUSE;
    tplcss.textContent = spec.css||'';
    // broken-image marker (house mode)
    content.querySelectorAll('img').forEach(function(im){
      var s=im.getAttribute('src')||'';
      if(!/\.(png|jpg|jpeg|svg)$/i.test(s)) im.classList.add('broken');
    });
    overlay.className = spec.overlay||'';
    // coordinate marker + (x, y) readout
    if(spec.marker && spec.marker.x!=null){
      marker.style.left=spec.marker.x+'px'; marker.style.top=spec.marker.y+'px';
      markerRd.textContent = (spec.marker.label!=null)
        ? spec.marker.label : ('('+spec.marker.x+', '+spec.marker.y+')');
      marker.className='on';
    } else { marker.className=''; }
    frame.className = (spec.mode==='transparent')?'transparent':'video';
    if(spec.js){
      try{
        var fn=new Function('gsap', spec.js +
          ';return {play:(typeof play!=="undefined")?play:null,' +
          'stop:(typeof stop!=="undefined")?stop:null,' +
          'update:(typeof update!=="undefined")?update:null,' +
          'next:(typeof next!=="undefined")?next:null};');
        handlers=fn(gsap);
      }catch(e){
        showErr(e);
      }
    }
    if(spec.autoplay) cmd('play');
    fit();
  }
  function cmd(c){
    try{
      if(c==='play'){ if(handlers.play) handlers.play(); else stage.classList.add('on'); }
      else if(c==='stop'){ if(handlers.stop) handlers.stop(); else stage.classList.remove('on'); }
      else if(c==='next'){ if(handlers.next) handlers.next(); }
    }catch(e){ showErr(e); }
  }

  window.addEventListener('message',function(e){
    var d=e.data||{};
    if(d.__gfxLoad) loadTemplate(d.__gfxLoad);
    else if(d.__gfxCmd) cmd(d.__gfxCmd);
    else if(d.__gfxUpdate){
      try{ if(handlers.update) handlers.update(JSON.stringify(d.__gfxUpdate)); }
      catch(err){ showErr(err); }
    }
    else if(d.__gfxSet){
      var s=d.__gfxSet;
      if(s.mode) frame.className=(s.mode==='transparent')?'transparent':'video';
      if('cssOff' in s) tplcss.textContent = s.cssOff ? CSSOFF : (s.restoreCss||'');
      if('highlight' in s){
        content.querySelectorAll('.hl').forEach(function(x){x.classList.remove('hl');});
        if(s.highlight){
          if(typeof s.highlight==='string'){
            var el=content.querySelector(s.highlight); if(el) el.classList.add('hl');
          } else {
            var els=content.querySelectorAll('div,span,img');
            if(els[s.highlight]) els[s.highlight].classList.add('hl');
          }
        }
      }
    }
    else if(d.__gfxProbe){
      var results=(d.__gfxProbe.queries||[]).map(function(q){
        var el=content.querySelector(q.sel);
        if(!el) return {exists:false};
        var r={exists:true, text:(el.textContent||'').trim()};
        if(q.style){ r.style={}; var cs=getComputedStyle(el);
          Object.keys(q.style).forEach(function(p){ r.style[p]=cs[p]; }); }
        return r;
      });
      parent.postMessage({__gfxProbeResult:{id:d.__gfxProbe.id,results:results}},'*');
    }
  });

  fit();
  parent.postMessage({__gfxReady:true},'*');
})();
</script>`;
