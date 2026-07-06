// Deterministic canon/token scanner over app/content/*.js. Complements the
// human-judgment audit agents with mechanical checks that never miss a literal.
// Usage: node tools/audit_scan.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = path.join(__dirname, '..', 'app', 'content');
const files = fs.readdirSync(dir).filter(f => /^unit\d\d\.js$/.test(f)).sort();

// load all units into one context
const sandbox = { window: {} };
sandbox.window.COURSE_DATA = [];
sandbox.COURSE_DATA = sandbox.window.COURSE_DATA;
vm.createContext(sandbox);
const rawByUnit = {};
for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  rawByUnit[f] = src;
  vm.runInContext(src, sandbox, { filename: f });
}
const units = sandbox.window.COURSE_DATA;

const findings = [];
const add = (sev, loc, msg) => findings.push({ sev, loc, msg });

// ---- 1. encoding: non-ASCII / em dashes ----
for (const [f, src] of Object.entries(rawByUnit)) {
  const lines = src.split('\n');
  lines.forEach((ln, i) => {
    // em dash or any non-ASCII
    const m = ln.match(/[^\x00-\x7F]/);
    if (m) add('MINOR', `${f}:${i + 1}`, `non-ASCII char ${JSON.stringify(m[0])} (U+${m[0].codePointAt(0).toString(16)})`);
  });
}

// ---- 2. GSAP subset: methods + eases in any render.js / code the student sees ----
const GSAP_OK = new Set(['to', 'from', 'fromTo', 'timeline', 'killAll']);
const EASE_OK = new Set(['none', 'linear', 'power1.out', 'power1.in',
  'power2.out', 'power2.in', 'power2.inOut', 'back.out']);
function scanCodeString(s, loc) {
  if (typeof s !== 'string') return;
  // a gsap CALL: gsap.<method>(  - excludes filenames like gsap.min.js
  (s.match(/\bgsap\.([a-zA-Z]\w*)\s*\(/g) || []).forEach(m => {
    const meth = m.match(/gsap\.([a-zA-Z]\w*)/)[1];
    if (!GSAP_OK.has(meth)) add('BLOCKER', loc, `gsap.${meth}() is outside the shim subset (silently does nothing)`);
  });
  (s.match(/ease:\s*["']([^"']+)["']/g) || []).forEach(m => {
    const name = m.match(/["']([^"']+)["']/)[1];
    if (name.includes('{{')) return;   // a fill-in-the-blank slot, not a literal
    if (!EASE_OK.has(name)) add('BLOCKER', loc, `ease "${name}" is outside the shim subset`);
  });
}
// walk every exercise's code-bearing fields + render.js
function walkExercises(cb) {
  units.forEach(u => u.lessons.forEach(l => l.exercises.forEach((ex, i) => {
    cb(u, l, ex, i);
  })));
}
walkExercises((u, l, ex, i) => {
  const loc = `unit${String(u.id).padStart(2, '0')} ${l.id}#${i + 1}`;
  ['code', 'fixedToken', 'template', 'placeholder'].forEach(k => scanCodeString(ex[k], loc));
  (ex.lines || []).forEach(s => scanCodeString(s, loc));
  (ex.tokens || []).forEach(s => scanCodeString(s, loc));
  (ex.blocks || []).forEach(s => scanCodeString(s, loc));
  (ex.bank || []).forEach(s => scanCodeString(s, loc));
  if (ex.render) { scanCodeString(ex.render.js, loc); scanCodeString(ex.render.css, loc); }
  if (ex.applyOnAnswer) { scanCodeString(ex.applyOnAnswer.js, loc); scanCodeString(ex.applyOnAnswer.css, loc); }
  if (ex.fixedRender) scanCodeString(ex.fixedRender.js, loc);
});

// ---- 3. brand-color near-misses ----
const BRAND = { blue: '#0a3d91', amber: '#e8b90c' };
walkExercises((u, l, ex, i) => {
  const loc = `unit${String(u.id).padStart(2, '0')} ${l.id}#${i + 1}`;
  const blob = JSON.stringify(ex);
  (blob.match(/#[0-9a-fA-F]{6}/g) || []).forEach(hex => {
    const h = hex.toLowerCase();
    // near-miss to blue but not equal
    function near(a, b) {
      let d = 0; for (let k = 1; k < 7; k++) if (a[k] !== b[k]) d++;
      return d > 0 && d <= 1;
    }
    if (near(h, BRAND.blue)) add('MAJOR', loc, `hex ${hex} is a near-miss of brand blue ${BRAND.blue}`);
    if (near(h, BRAND.amber)) add('MAJOR', loc, `hex ${hex} is a near-miss of brand amber ${BRAND.amber}`);
  });
});

// ---- 4. Unit 5 must contain no JS in student-facing code (function/gsap/document) ----
units.filter(u => u.id === 5).forEach(u => u.lessons.forEach(l => l.exercises.forEach((ex, i) => {
  const loc = `unit05 ${l.id}#${i + 1}`;
  const seen = [ex.code, ...(ex.lines || []), ...(ex.tokens || []), ...(ex.blocks || []),
    ...(ex.bank || []), ex.template].filter(Boolean).join('\n');
  // JS tells that don't collide with CSS (animation-timing-function is CSS, not JS)
  if (/\bgsap\.|document\.|function\s+\w+\s*\(|getElementById|JSON\.|\.textContent/.test(seen))
    add('BLOCKER', loc, `Unit 5 student-facing code contains JavaScript (should be CSS-only)`);
})));

// ---- 5. Unit 6 student-facing code must not DEFINE functions ----
units.filter(u => u.id === 6).forEach(u => u.lessons.forEach(l => l.exercises.forEach((ex, i) => {
  const loc = `unit06 ${l.id}#${i + 1}`;
  const seen = [ex.code, ...(ex.lines || []), ...(ex.tokens || []), ...(ex.blocks || []),
    ...(ex.bank || []), ex.template].filter(Boolean).join('\n');
  if (/function\s+\w+\s*\(/.test(seen))
    add('MAJOR', loc, `Unit 6 student-facing code defines a function (definitions are Unit 7.1)`);
})));

// ---- 6. cast role pairing ----
const ROLE = {
  'Maria Kranz': 'News Anchor', 'Tomas Berg': 'Sports Reporter',
  'Alexandra Rivera': 'Weather', 'James Okafor': 'Political Correspondent',
  'Priya Nair': 'Economics Editor'
};
for (const [f, src] of Object.entries(rawByUnit)) {
  for (const [name, role] of Object.entries(ROLE)) {
    // find lines mentioning the presenter with a DIFFERENT known role adjacent
    const re = new RegExp(name.replace(' ', '\\s+') + '[^\\n]{0,60}', 'g');
    let m;
    while ((m = re.exec(src))) {
      for (const [other, orole] of Object.entries(ROLE)) {
        if (orole !== role && m[0].includes(orole))
          add('MAJOR', f, `"${name}" appears near role "${orole}" (expected "${role}")`);
      }
    }
  }
}

// ---- report ----
const order = { BLOCKER: 0, MAJOR: 1, MINOR: 2, NIT: 3 };
findings.sort((a, b) => order[a.sev] - order[b.sev]);
const counts = findings.reduce((c, f) => (c[f.sev] = (c[f.sev] || 0) + 1, c), {});
console.log('Units scanned:', units.map(u => u.id).join(', '));
console.log('Findings:', JSON.stringify(counts));
console.log('---');
findings.forEach(f => console.log(`[${f.sev}] ${f.loc}: ${f.msg}`));
if (!findings.length) console.log('(no mechanical findings)');
