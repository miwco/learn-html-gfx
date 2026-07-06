// The exercise player + course shell. Generic engine: reads COURSE_DATA (content/*.js)
// and renders whatever each exercise declares. Stage = sandboxed iframe (renderer.js).

/* ================= data + progress ================= */
const UNITS = (window.COURSE_DATA || []).slice().sort((a, b) => a.id - b.id);
const PKEY = 'gfx_progress_v1';
let progress = {};
try { progress = JSON.parse(localStorage.getItem(PKEY) || '{}'); } catch (e) { progress = {}; }
function saveProgress() { localStorage.setItem(PKEY, JSON.stringify(progress)); }
function lessonRec(id) {
  if (!progress[id]) progress[id] = { passed: false, attempts: 0, firstTry: 0, exSeen: 0, kernelOk: null };
  return progress[id];
}

function unitUnlocked(uIdx) {
  if (uIdx === 0) return true;
  const prev = UNITS[uIdx - 1];
  const cp = prev.lessons.filter(l => l.isCheckpoint);
  const gate = cp.length ? cp : prev.lessons.slice(-1);
  return gate.every(l => lessonRec(l.id).passed);
}
function lessonUnlocked(uIdx, lIdx) {
  if (!unitUnlocked(uIdx)) return false;
  if (lIdx === 0) return true;
  return lessonRec(UNITS[uIdx].lessons[lIdx - 1].id).passed;
}

/* ================= stage (iframe) ================= */
const stageWrap = document.getElementById('stage-wrap');
const frame = document.createElement('iframe');
frame.id = 'gfx';
frame.setAttribute('sandbox', 'allow-scripts');
frame.setAttribute('title', 'Live graphic');
frame.srcdoc = APP_RENDERER_SRCDOC;
stageWrap.appendChild(frame);

let gfxReady = false, pendingLoad = null, probeSeq = 0;
const probeWaiters = {};
let currentSpec = {};      // the render spec currently loaded

window.addEventListener('message', function (e) {
  const d = e.data || {};
  if (d.__gfxReady) {
    gfxReady = true;
    if (pendingLoad) { post({ __gfxLoad: pendingLoad }); pendingLoad = null; }
  } else if (d.__gfxProbeResult) {
    const w = probeWaiters[d.__gfxProbeResult.id];
    if (w) { delete probeWaiters[d.__gfxProbeResult.id]; w(d.__gfxProbeResult.results); }
  } else if (d.__gfxError) {
    // template JS errors surface as a friendly overlay note, never a raw crash
    nudge('The template hit an error: ' + d.__gfxError);
  }
});
function post(msg) { frame.contentWindow.postMessage(msg, '*'); }
function loadStage(spec) {
  currentSpec = Object.assign({}, spec);
  if (!gfxReady) { pendingLoad = currentSpec; return; }
  post({ __gfxLoad: currentSpec });
}
function patchStage(patch) {          // reload with some layers replaced
  loadStage(Object.assign({}, currentSpec, patch));
}
function probe(queries) {
  return new Promise(function (res) {
    const id = ++probeSeq;
    probeWaiters[id] = res;
    post({ __gfxProbe: { id: id, queries: queries } });
    setTimeout(function () {
      if (probeWaiters[id]) { delete probeWaiters[id]; res(null); }
    }, 1500);
  });
}

/* stage controls */
document.getElementById('btn-play').onclick = () => post({ __gfxCmd: 'play' });
document.getElementById('btn-stop').onclick = () => post({ __gfxCmd: 'stop' });
const btnNext = document.getElementById('btn-next');
btnNext.onclick = () => post({ __gfxCmd: 'next' });
const btnView = document.getElementById('btn-view');
let viewMode = 'video';
btnView.onclick = function () {
  viewMode = viewMode === 'video' ? 'transparent' : 'video';
  btnView.textContent = viewMode === 'transparent' ? 'Over video' : 'Transparency';
  post({ __gfxSet: { mode: viewMode } });
};

/* ================= DOM helpers ================= */
function el(tag, cls, txt) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (txt != null) n.textContent = txt;
  return n;
}
const $ = id => document.getElementById(id);

/* ================= views ================= */
const V = { home: $('home'), player: $('player') };
function show(view) {
  Object.keys(V).forEach(k => V[k].style.display = (k === view) ? 'block' : 'none');
  window.scrollTo(0, 0);
}

/* ---------- home / path ---------- */
function renderHome() {
  const box = $('units');
  box.innerHTML = '';
  UNITS.forEach(function (u, ui) {
    const open = unitUnlocked(ui);
    const card = el('div', 'unit' + (open ? '' : ' locked'));
    const head = el('div', 'unit-head');
    head.appendChild(el('span', 'unit-no', String(u.id)));
    const ht = el('div', 'unit-titles');
    ht.appendChild(el('div', 'unit-title', u.title));
    ht.appendChild(el('div', 'unit-promise', u.promise || ''));
    head.appendChild(ht);
    const done = u.lessons.filter(l => lessonRec(l.id).passed).length;
    head.appendChild(el('span', 'unit-count', done + '/' + u.lessons.length));
    card.appendChild(head);

    const list = el('div', 'lesson-list');
    u.lessons.forEach(function (l, li) {
      const unlocked = lessonUnlocked(ui, li);
      const rec = lessonRec(l.id);
      const b = el('button', 'lesson-item' +
        (rec.passed ? ' passed' : unlocked ? ' open' : ' locked'));
      b.appendChild(el('span', 'li-id', l.id));
      b.appendChild(el('span', 'li-title', l.title + (l.isCheckpoint ? ' *' : '')));
      b.appendChild(el('span', 'li-state', rec.passed ? 'OK' : unlocked ? '>' : ''));
      if (unlocked) b.onclick = function () { startLesson(ui, li); };
      else b.disabled = true;
      list.appendChild(b);
    });
    card.appendChild(list);
    box.appendChild(card);
  });
}

/* ---------- player ---------- */
let cur = null;   // {ui, li, lesson, exIdx, correctFirstTry, kernelFirstTry, missedOnThis}

function startLesson(ui, li) {
  const lesson = UNITS[ui].lessons[li];
  cur = { ui: ui, li: li, lesson: lesson, exIdx: 0,
          firstTryCount: 0, kernelFirstTry: true, missedOnThis: false };
  show('player');
  renderExercise();
}

function renderExercise() {
  const lesson = cur.lesson;
  const ex = lesson.exercises[cur.exIdx];
  cur.missedOnThis = false;
  cur.solved = false;

  $('lesson-tag').textContent = 'Unit ' + UNITS[cur.ui].id + ' - ' + UNITS[cur.ui].title +
    '  /  ' + lesson.id + '  ' + lesson.title;
  $('concept').textContent = lesson.concept || '';
  const showExplain = cur.exIdx === 0;
  $('explain').textContent = showExplain ? (lesson.explain || '') : '';
  $('explain').style.display = showExplain && lesson.explain ? 'block' : 'none';

  const prog = $('progress'); prog.innerHTML = '';
  lesson.exercises.forEach(function (_, i) {
    prog.appendChild(el('span', 'dot' +
      (i < cur.exIdx ? ' done' : i === cur.exIdx ? ' cur' : '')));
  });

  const fb = $('feedback'); fb.className = 'feedback'; fb.innerHTML = '';
  $('continue').style.display = 'none';
  const code = $('code'); code.innerHTML = ''; code.style.display = 'none';
  const task = $('task'); task.innerHTML = '';
  $('panel').style.display = 'none'; $('panel').innerHTML = '';

  // stage
  const r = ex.render || {};
  viewMode = r.mode || 'video';
  btnView.textContent = viewMode === 'transparent' ? 'Over video' : 'Transparency';
  loadStage({ html: r.html || '', css: r.css || '', js: r.js || '',
              house: r.house, kind: r.kind, mode: viewMode, overlay: r.overlay || '',
              autoplay: !!r.autoplay });
  btnNext.style.display = (r.js && r.js.indexOf('next') >= 0) ? '' : 'none';

  (TYPES[ex.type] || TYPES.predict)(ex);
}

function markAnswer(ok) {
  if (!ok && !cur.missedOnThis) {
    cur.missedOnThis = true;
    const ex = cur.lesson.exercises[cur.exIdx];
    if (ex.kernel) cur.kernelFirstTry = false;
  }
}
function win(msg) {
  if (cur.solved) return;
  cur.solved = true;
  if (!cur.missedOnThis) cur.firstTryCount++;
  const fb = $('feedback');
  fb.className = 'feedback ok';
  fb.textContent = msg || 'Correct.';
  const last = cur.exIdx === cur.lesson.exercises.length - 1;
  $('continue').textContent = last ? 'Finish lesson' : 'Continue';
  $('continue').style.display = 'block';
}
function nudge(msg) {
  const fb = $('feedback');
  fb.className = 'feedback no';
  fb.textContent = msg || 'Try again.';
}
$('continue').onclick = function () {
  if (!cur) return;
  if (cur.exIdx < cur.lesson.exercises.length - 1) {
    cur.exIdx++;
    renderExercise();
  } else {
    const rec = lessonRec(cur.lesson.id);
    rec.attempts++;
    rec.passed = true;
    rec.exSeen = cur.lesson.exercises.length;
    rec.firstTry = cur.firstTryCount;
    rec.kernelOk = cur.kernelFirstTry;
    saveProgress();
    cur = null;
    renderHome();
    show('home');
  }
};
$('btn-home').onclick = function () { cur = null; renderHome(); show('home'); };

/* ================= exercise types ================= */
const TYPES = {

  observe: function (ex) {
    $('task').appendChild(el('p', 'prompt', ex.prompt));
    const code = $('code'); code.style.display = 'block';
    ex.lines.forEach(function (line, i) {
      const row = el('button', 'codeline', line);
      row.onclick = function () {
        if (cur.solved) return;
        if (i === ex.answer) {
          row.classList.add('right');
          post({ __gfxSet: { highlight: (ex.highlight != null ? ex.highlight : i) } });
          post({ __gfxCmd: 'play' });
          markAnswer(true);
          win(ex.success || 'Yes - that is the line. Watch it light up on air.');
        } else {
          row.classList.add('wrong');
          setTimeout(() => row.classList.remove('wrong'), 600);
          markAnswer(false);
          nudge((ex.feedback && (ex.feedback[i] || ex.feedback.default)) || 'Not that one.');
        }
      };
      code.appendChild(row);
    });
  },

  predict: function (ex) {
    $('task').appendChild(el('p', 'prompt', ex.prompt));
    const opts = el('div', 'options');
    ex.options.forEach(function (o) {
      const b = el('button', 'option', o.text);
      b.onclick = function () {
        if (cur.solved) return;
        if (o.correct) {
          b.classList.add('right');
          if (ex.applyOnAnswer) {
            const p = ex.applyOnAnswer;
            patchStage({ html: p.html != null ? p.html : currentSpec.html,
                         css: p.css != null ? p.css : currentSpec.css,
                         js: p.js != null ? p.js : currentSpec.js,
                         autoplay: p.play !== false });
          }
          markAnswer(true); win(o.feedback);
        } else {
          b.classList.add('wrong');
          markAnswer(false); nudge(o.feedback);
        }
      };
      opts.appendChild(b);
    });
    $('task').appendChild(opts);
  },

  fill: function (ex) {
    $('task').appendChild(el('p', 'prompt', ex.prompt));
    const code = $('code'); code.style.display = 'block';
    const row = el('div', 'codefill');
    row.innerHTML = escapeHtml(ex.code).replace('{{blank}}',
      '<span class="blank" id="blank">&nbsp;&nbsp;&nbsp;</span>');
    code.appendChild(row);
    const bank = el('div', 'bank');
    ex.bank.forEach(function (chip) {
      const c = el('button', 'chip', chip);
      c.onclick = function () {
        if (cur.solved) return;
        $('blank').textContent = chip;
        if (ex.slot) {
          const patch = {}; patch[ex.slot] = ex.code.replace('{{blank}}', chip);
          patchStage(Object.assign(patch, { autoplay: true }));
        }
        if (chip === ex.answer) {
          c.classList.add('right'); markAnswer(true);
          win(ex.success || 'Right - and the graphic followed your choice live.');
        } else {
          c.classList.add('wrong'); markAnswer(false);
          setTimeout(function () {
            c.classList.remove('wrong');
            $('blank').innerHTML = '&nbsp;&nbsp;&nbsp;';
          }, 1400);
          nudge((ex.feedback && ex.feedback[chip]) || 'Not quite - look at the render.');
        }
      };
      bank.appendChild(c);
    });
    $('task').appendChild(bank);
  },

  fix: function (ex) {
    $('task').appendChild(el('p', 'prompt', ex.prompt));
    const code = $('code'); code.style.display = 'block';
    const row = el('div', 'codefill');
    ex.tokens.forEach(function (tok, i) {
      const t = el('button', 'token', tok);
      t.onclick = function () {
        if (cur.solved) return;
        if (i === ex.answer) {
          t.classList.add('right');
          if (ex.fixedToken) t.textContent = ex.fixedToken;
          if (ex.fixedRender) {
            patchStage(Object.assign({}, ex.fixedRender,
              { autoplay: ex.fixedRender.play !== false }));
          }
          markAnswer(true);
          win(ex.success || 'Fixed - watch the graphic recover.');
        } else {
          t.classList.add('wrong');
          setTimeout(() => t.classList.remove('wrong'), 600);
          markAnswer(false);
          nudge((ex.feedback && (ex.feedback[i] || ex.feedback.default)) || 'Not that token.');
        }
      };
      row.appendChild(t);
    });
    code.appendChild(row);
  },

  arrange: function (ex) {
    $('task').appendChild(el('p', 'prompt', ex.prompt));
    const code = $('code'); code.style.display = 'block';
    const target = el('div', 'arr-target');
    code.appendChild(target);
    const pool = el('div', 'bank');
    const blocks = ex.blocks.map((b, i) => ({ text: b, ord: i, distractor: false }))
      .concat((ex.distractors || []).map(b => ({ text: b, ord: -1, distractor: true })));
    // deterministic-ish shuffle
    blocks.sort((a, b) => (a.text.length * 7 + a.text.charCodeAt(0)) -
                          (b.text.length * 7 + b.text.charCodeAt(0)));
    const placed = [];
    function checkDone() {
      if (placed.length !== ex.blocks.length) return;
      const ok = placed.every((p, i) => p.ord === i);
      const hasDistractor = placed.some(p => p.distractor);
      if (ok && !hasDistractor) {
        if (ex.slot) {
          const patch = {}; patch[ex.slot] = placed.map(p => p.text).join('\n');
          patchStage(Object.assign(patch, { autoplay: true }));
        }
        markAnswer(true);
        win(ex.success || 'Assembled - and it plays.');
      } else {
        markAnswer(false);
        nudge((ex.feedback && ex.feedback.default) ||
          'The order is not right yet - tap blocks in the target to send them back.');
      }
    }
    blocks.forEach(function (blk) {
      const c = el('button', 'chip mono', blk.text);
      c.onclick = function () {
        if (cur.solved) return;
        if (c.parentNode === pool) {
          placed.push(blk); target.appendChild(c); c.classList.add('placed');
          checkDone();
        } else {
          placed.splice(placed.indexOf(blk), 1); pool.appendChild(c);
          c.classList.remove('placed');
          $('feedback').className = 'feedback';
        }
      };
      pool.appendChild(c);
    });
    $('task').appendChild(pool);
  },

  type: function (ex) {
    $('task').appendChild(el('p', 'prompt', ex.prompt));
    if (ex.code) {
      const code = $('code'); code.style.display = 'block';
      const row = el('div', 'codefill');
      row.innerHTML = escapeHtml(ex.code).replace('{{blank}}',
        '<span class="blank">your line</span>');
      code.appendChild(row);
    }
    const wrap = el('div', 'typewrap');
    const inp = document.createElement('input');
    inp.type = 'text'; inp.className = 'typein';
    inp.placeholder = ex.placeholder || '';
    inp.autocapitalize = 'off'; inp.autocomplete = 'off'; inp.spellcheck = false;
    const btn = el('button', 'bigbtn', 'Check');
    function norm(s) { return s.trim().replace(/\s+/g, ' ').replace(/'/g, '"'); }
    btn.onclick = function () {
      if (cur.solved) return;
      const answers = Array.isArray(ex.answer) ? ex.answer : [ex.answer];
      const ok = answers.some(a => norm(a) === norm(inp.value));
      if (ok) {
        if (ex.slot && ex.code) {
          const patch = {}; patch[ex.slot] = ex.code.replace('{{blank}}', inp.value);
          patchStage(Object.assign(patch, { autoplay: true }));
        }
        markAnswer(true); win(ex.success || 'Exactly right.');
      } else {
        markAnswer(false);
        nudge((ex.feedback && ex.feedback.default) || 'Compare with the pattern you learned.');
      }
    };
    wrap.appendChild(inp); wrap.appendChild(btn);
    $('task').appendChild(wrap);
  },

  build: function (ex) {
    $('task').appendChild(el('p', 'prompt', ex.prompt));
    if (ex.card) {
      const card = el('div', 'card');
      card.appendChild(el('div', 'card-h', 'RUNDOWN'));
      Object.keys(ex.card).forEach(k =>
        card.appendChild(el('div', 'card-r', k + ':  ' + ex.card[k])));
      $('task').appendChild(card);
    }
    const values = {};
    const slot = ex.slot || 'html';
    function draw() {
      const patch = {};
      patch[slot] = ex.template.replace(/\{\{(\w+)\}\}/g, (_, k) => values[k] || '');
      patchStage(Object.assign(patch, { autoplay: true }));
    }
    ex.fields.forEach(function (f) {
      const w = el('div', 'field');
      w.appendChild(el('div', 'field-l', f.label));
      const bank = el('div', 'bank');
      f.bank.forEach(function (chip) {
        const c = el('button', 'chip', chip);
        c.onclick = function () {
          if (cur.solved) return;
          bank.querySelectorAll('.chip').forEach(x => x.classList.remove('sel'));
          c.classList.add('sel');
          values[f.key] = chip; draw();
        };
        bank.appendChild(c);
      });
      w.appendChild(bank);
      $('task').appendChild(w);
    });
    const check = el('button', 'bigbtn', 'PLAY & check on air');
    check.onclick = function () {
      if (cur.solved) return;
      draw();
      const miss = ex.fields.filter(f => values[f.key] !== f.answer);
      if (!miss.length) { markAnswer(true); win(ex.successFeedback); }
      else {
        markAnswer(false);
        nudge('Compare with the card - check the ' +
          miss.map(f => f.label.toLowerCase()).join(' and ') + '.');
      }
    };
    $('task').appendChild(check);
  },

  operate: function (ex) {
    $('task').appendChild(el('p', 'prompt', ex.prompt));
    const panel = $('panel');
    panel.style.display = 'block';
    panel.appendChild(el('div', 'panel-h', 'SPX OPERATOR PANEL'));
    const inputs = {};
    (ex.panel || []).forEach(function (f) {
      const row = el('div', 'panel-row');
      row.appendChild(el('label', 'panel-l', f.label));
      let inp;
      if (f.options) {                       // dropdown (SPX 'dropdown' ftype)
        inp = document.createElement('select');
        f.options.forEach(function (o) {
          const opt = document.createElement('option');
          opt.value = o.value; opt.textContent = o.text;
          inp.appendChild(opt);
        });
        inp.value = f.value || (f.options[0] && f.options[0].value) || '';
      } else {
        inp = document.createElement('input');
        inp.value = f.value || '';
        inp.autocapitalize = 'off'; inp.spellcheck = false;
      }
      inp.className = 'panel-in';
      inputs[f.id] = inp;
      row.appendChild(inp);
      panel.appendChild(row);
    });
    const btns = el('div', 'panel-btns');
    const bU = el('button', 'pbtn', 'Update');
    const bP = el('button', 'pbtn play', 'Play');
    const bS = el('button', 'pbtn', 'Stop');
    bU.onclick = function () {
      const vals = {};
      Object.keys(inputs).forEach(k => vals[k] = inputs[k].value);
      post({ __gfxUpdate: vals });
    };
    bP.onclick = function () {
      post({ __gfxCmd: 'play' });
      // give the animation a beat, then check
      setTimeout(async function () {
        if (cur.solved) return;
        const results = await probe(ex.check || []);
        if (!results) return;
        const ok = results.every(function (r, i) {
          const q = ex.check[i];
          if (!r.exists) return false;
          if (q.text != null && r.text !== q.text) return false;
          if (q.style) return Object.keys(q.style).every(p => r.style[p] === q.style[p]);
          return true;
        });
        if (ok) { markAnswer(true); win(ex.successFeedback || 'On air, exactly as the rundown asked.'); }
        else {
          markAnswer(false);
          nudge((ex.feedback && ex.feedback.default) ||
            'Something on air does not match yet - Update first, then Play, and compare each line.');
        }
      }, 900);
    };
    bS.onclick = () => post({ __gfxCmd: 'stop' });
    btns.appendChild(bU); btns.appendChild(bP); btns.appendChild(bS);
    panel.appendChild(btns);
  }
};

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ================= boot ================= */
renderHome();
show('home');
