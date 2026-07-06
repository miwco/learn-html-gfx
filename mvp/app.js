// The exercise player. A generic engine: it reads COURSE (content.js) as data and
// renders whatever exercise type each step declares. The live graphic lives in a
// sandboxed iframe (renderer.js); the app talks to it only via postMessage.

/* ---------- flatten the course into a linear list of steps ---------- */
const STEPS = [];
COURSE.units.forEach(function (u) {
  u.lessons.forEach(function (l) {
    l.exercises.forEach(function (ex, i) {
      STEPS.push({ unit: u, lesson: l, ex: ex, first: i === 0,
                   exNo: i + 1, exCount: l.exercises.length });
    });
  });
});

let pos = 0;                 // index into STEPS
let solved = false;         // current step answered correctly
const seenLessons = new Set();

/* ---------- the sandboxed renderer iframe ---------- */
const stageWrap = document.getElementById('stage-wrap');
const frame = document.createElement('iframe');
frame.id = 'gfx';
frame.setAttribute('sandbox', 'allow-scripts');
frame.setAttribute('title', 'Live graphic');
frame.srcdoc = RENDERER_SRCDOC;
stageWrap.appendChild(frame);

let gfxReady = false;
let lastRender = {};                 // remembers current spec so PLAY/toggle work
let pendingRender = null;
window.addEventListener('message', function (e) {
  if (e.data && e.data.__gfxReady) {
    gfxReady = true;
    if (pendingRender) { sendRender(pendingRender); pendingRender = null; }
  }
});
function sendRender(spec) {
  lastRender = Object.assign({}, lastRender, spec);
  const msg = Object.assign({ __gfx: true }, lastRender);
  if (!gfxReady) { pendingRender = spec; return; }
  frame.contentWindow.postMessage(msg, '*');
}
function resetRender(base) {
  // fresh spec (don't inherit previous highlight/cssOff etc.)
  lastRender = { bodyHTML: '', mode: 'video', playing: false,
                 highlight: null, cssOff: false, jsOff: false };
  if (base) sendRender(base);
}

/* ---------- stage controls (PLAY / STOP / view toggle) ---------- */
const btnPlay = document.getElementById('btn-play');
const btnStop = document.getElementById('btn-stop');
const btnView = document.getElementById('btn-view');
btnPlay.onclick = function () { sendRender({ playing: true }); };
btnStop.onclick = function () { sendRender({ playing: false }); };
btnView.onclick = function () {
  const m = lastRender.mode === 'transparent' ? 'video' : 'transparent';
  btnView.textContent = m === 'transparent' ? 'Show over video' : 'Show transparency';
  sendRender({ mode: m });
};

/* ---------- helpers ---------- */
function el(tag, cls, txt) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (txt != null) n.textContent = txt;
  return n;
}
function codeFromFill(ex, value) {
  return ex.code.replace('{{blank}}', value);
}
function bodyFromTemplate(tpl, values) {
  return tpl.replace(/\{\{(\w+)\}\}/g, function (_, k) { return values[k] || ''; });
}

/* ---------- render the current step ---------- */
const elLessonTag = document.getElementById('lesson-tag');
const elConcept = document.getElementById('concept');
const elExplain = document.getElementById('explain');
const elTask = document.getElementById('task');
const elFeedback = document.getElementById('feedback');
const elContinue = document.getElementById('continue');
const elProgress = document.getElementById('progress');
const elCode = document.getElementById('code');

function render() {
  const s = STEPS[pos];
  solved = false;
  elFeedback.className = 'feedback';
  elFeedback.innerHTML = '';
  elContinue.style.display = 'none';
  elCode.innerHTML = '';
  elCode.style.display = 'none';
  elTask.innerHTML = '';

  // lesson header (only when the lesson changes)
  const isNewLesson = s.first || !seenLessons.has(s.lesson.id);
  elLessonTag.textContent = 'Unit ' + s.unit.id + ' - ' + s.unit.title +
    '  /  ' + s.lesson.id + '  ' + s.lesson.title +
    (s.lesson.isCheckpoint ? '  *' : '');
  elConcept.textContent = s.lesson.concept;
  elExplain.textContent = (isNewLesson || s.exNo === 1) ? s.lesson.explain : '';
  elExplain.style.display = elExplain.textContent ? 'block' : 'none';
  seenLessons.add(s.lesson.id);

  // progress dots for this lesson
  elProgress.innerHTML = '';
  for (let i = 0; i < s.exCount; i++) {
    const d = el('span', 'dot' + (i < s.exNo - 1 ? ' done' : i === s.exNo - 1 ? ' cur' : ''));
    elProgress.appendChild(d);
  }

  // set the stage
  const r = s.ex.render || {};
  resetRender({
    bodyHTML: r.bodyHTML || (s.ex.renderFromCode ? '' : (r.bodyHTML || '')),
    mode: r.mode || 'video',
    playing: !!r.autoplay
  });
  btnView.textContent = (r.mode === 'transparent') ? 'Show over video' : 'Show transparency';

  DISPATCH[s.ex.type](s);
}

/* ---------- per-type builders ---------- */
const DISPATCH = {

  observe: function (s) {
    const ex = s.ex;
    elTask.appendChild(el('p', 'prompt', ex.prompt));
    elCode.style.display = 'block';
    ex.lines.forEach(function (line, i) {
      const row = el('button', 'codeline');
      row.textContent = line;
      row.onclick = function () {
        if (solved) return;
        if (i === ex.answer) {
          row.classList.add('right');
          sendRender({ highlight: ex.answer, playing: true });
          win('Yes - that is the line. Watch it light up on air.');
        } else {
          row.classList.add('wrong');
          setTimeout(function () { row.classList.remove('wrong'); }, 600);
          nudge((ex.feedback && ex.feedback[i]) ||
            (ex.feedback && ex.feedback.default) || 'Not that one - match the words.');
        }
      };
      elCode.appendChild(row);
    });
  },

  predict: function (s) {
    const ex = s.ex;
    elTask.appendChild(el('p', 'prompt', ex.prompt));
    const opts = el('div', 'options');
    ex.options.forEach(function (o) {
      const b = el('button', 'option');
      b.textContent = o.text;
      b.onclick = function () {
        if (solved) return;
        if (o.correct) {
          b.classList.add('right');
          if (ex.applyOnAnswer) {
            sendRender({ bodyHTML: ex.applyOnAnswer.bodyHTML,
                         playing: ex.applyOnAnswer.play !== false });
          }
          if (ex.render && ex.render.cssOffOnAnswer) sendRender({ cssOff: true });
          win(o.feedback);
        } else {
          b.classList.add('wrong');
          nudge(o.feedback);
        }
      };
      opts.appendChild(b);
    });
    elTask.appendChild(opts);
  },

  fill: function (s) {
    const ex = s.ex;
    elTask.appendChild(el('p', 'prompt', ex.prompt));
    elCode.style.display = 'block';
    const codeRow = el('div', 'codefill');
    codeRow.innerHTML = ex.code.replace('{{blank}}',
      '<span class="blank" id="blank">&nbsp;&nbsp;&nbsp;</span>');
    elCode.appendChild(codeRow);
    const bank = el('div', 'bank');
    // preview the empty code live
    if (ex.renderFromCode) sendRender({ bodyHTML: '', playing: true });
    ex.bank.forEach(function (chip) {
      const c = el('button', 'chip');
      c.textContent = chip;
      c.onclick = function () {
        if (solved) return;
        document.getElementById('blank').textContent = chip;
        if (ex.renderFromCode) {
          sendRender({ bodyHTML: codeFromFill(ex, chip), playing: true });
        }
        if (chip === ex.answer) {
          c.classList.add('right');
          win('That is it - and the graphic updated live as you chose.');
        } else {
          c.classList.add('wrong');
          setTimeout(function () {
            c.classList.remove('wrong');
            document.getElementById('blank').innerHTML = '&nbsp;&nbsp;&nbsp;';
            if (ex.renderFromCode) sendRender({ bodyHTML: '', playing: true });
          }, 1400);
          nudge((ex.feedback && ex.feedback[chip]) || 'Not quite - look at the render.');
        }
      };
      bank.appendChild(c);
    });
    elTask.appendChild(bank);
  },

  fix: function (s) {
    const ex = s.ex;
    elTask.appendChild(el('p', 'prompt', ex.prompt));
    elCode.style.display = 'block';
    const row = el('div', 'codefill');
    ex.tokens.forEach(function (tok, i) {
      const t = el('button', 'token');
      t.textContent = tok;
      t.onclick = function () {
        if (solved) return;
        if (i === ex.answer) {
          t.classList.add('right');
          t.textContent = ex.fixedToken;
          if (ex.fixedRender) {
            sendRender({ bodyHTML: ex.fixedRender.bodyHTML,
                         playing: ex.fixedRender.play !== false });
          }
          win('Fixed - the closing tag was the culprit. Watch the line reappear.');
        } else {
          t.classList.add('wrong');
          setTimeout(function () { t.classList.remove('wrong'); }, 600);
          nudge((ex.feedback && ex.feedback.default) || 'Not that token - look earlier.');
        }
      };
      row.appendChild(t);
    });
    elCode.appendChild(row);
  },

  build: function (s) {
    const ex = s.ex;
    elTask.appendChild(el('p', 'prompt', ex.prompt));
    // rundown card
    const card = el('div', 'card');
    card.appendChild(el('div', 'card-h', 'RUNDOWN'));
    card.appendChild(el('div', 'card-r', 'Name:  ' + ex.card.name));
    card.appendChild(el('div', 'card-r', 'Title: ' + ex.card.title));
    card.appendChild(el('div', 'card-r', 'Badge: ' + ex.card.badge));
    elTask.appendChild(card);

    const values = {};
    function draw() {
      sendRender({ bodyHTML: bodyFromTemplate(ex.template, values), playing: true });
    }
    ex.fields.forEach(function (f) {
      const wrap = el('div', 'field');
      wrap.appendChild(el('div', 'field-l', f.label));
      const bank = el('div', 'bank');
      f.bank.forEach(function (chip) {
        const c = el('button', 'chip');
        c.textContent = chip;
        c.onclick = function () {
          if (solved) return;
          bank.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('sel'); });
          c.classList.add('sel');
          values[f.key] = chip;
          draw();
        };
        bank.appendChild(c);
      });
      wrap.appendChild(bank);
      elTask.appendChild(wrap);
    });

    const check = el('button', 'bigbtn', 'PLAY & check on air');
    check.onclick = function () {
      if (solved) return;
      const ok = ex.fields.every(function (f) { return values[f.key] === f.answer; });
      sendRender({ bodyHTML: bodyFromTemplate(ex.template, values), playing: true });
      if (ok) {
        win(ex.successFeedback);
      } else {
        const miss = ex.fields.filter(function (f) { return values[f.key] !== f.answer; })
          .map(function (f) { return f.label.toLowerCase(); });
        nudge('Compare with the card - check the ' + miss.join(' and ') + '.');
      }
    };
    elTask.appendChild(check);
  }
};

/* ---------- feedback + advance ---------- */
function win(msg) {
  solved = true;
  elFeedback.className = 'feedback ok';
  elFeedback.textContent = msg || 'Correct.';
  const last = pos === STEPS.length - 1;
  elContinue.textContent = last ? 'Finish' : 'Continue';
  elContinue.style.display = 'block';
}
function nudge(msg) {
  elFeedback.className = 'feedback no';
  elFeedback.textContent = msg || 'Try again.';
}
elContinue.onclick = function () {
  if (pos === STEPS.length - 1) { finish(); return; }
  pos++;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function finish() {
  document.getElementById('player').style.display = 'none';
  const done = document.getElementById('done');
  done.style.display = 'block';
}

/* ---------- go ---------- */
render();
