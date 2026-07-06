// Validates app/content/*.js against app/SCHEMA.md's rules.
// Usage: node tools/validate_content.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = path.join(__dirname, '..', 'app', 'content');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
const TYPES = ['observe', 'predict', 'fill', 'fix', 'arrange', 'type', 'build', 'operate'];
let problems = [], warnings = [];

const sandbox = { window: {} };
sandbox.window.COURSE_DATA = [];
sandbox.COURSE_DATA = sandbox.window.COURSE_DATA;
vm.createContext(sandbox);

for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  try {
    vm.runInContext(src, sandbox, { filename: f });
  } catch (e) {
    problems.push(`${f}: SYNTAX/RUNTIME ERROR: ${e.message}`);
  }
}

const units = sandbox.window.COURSE_DATA;
const ids = units.map(u => u.id);
console.log(`Loaded units: [${ids.join(', ')}]`);

for (const u of units) {
  const tag = `unit ${u.id}`;
  if (!u.title) problems.push(`${tag}: missing title`);
  if (!Array.isArray(u.lessons) || !u.lessons.length) {
    problems.push(`${tag}: no lessons`); continue;
  }
  let unitHasCheckpoint = false;
  for (const l of u.lessons) {
    const lt = `${tag} / ${l.id}`;
    if (!l.id || !l.title) problems.push(`${lt}: missing id/title`);
    if (l.isCheckpoint) unitHasCheckpoint = true;
    if (!Array.isArray(l.exercises) || !l.exercises.length) {
      problems.push(`${lt}: no exercises`); continue;
    }
    const kernels = l.exercises.filter(e => e.kernel).length;
    if (kernels === 0 && !l.isCheckpoint && !/remix|review/i.test(l.title))
      warnings.push(`${lt}: no kernel exercise`);
    if (kernels > 1) warnings.push(`${lt}: ${kernels} kernels (expected 1)`);
    l.exercises.forEach(function (ex, i) {
      const et = `${lt} ex${i + 1}(${ex.type})`;
      if (!TYPES.includes(ex.type)) { problems.push(`${et}: unknown type`); return; }
      if (!ex.prompt) problems.push(`${et}: missing prompt`);
      if (ex.type === 'predict') {
        if (!ex.options || !ex.options.length) problems.push(`${et}: no options`);
        else if (ex.options.filter(o => o.correct).length !== 1)
          problems.push(`${et}: needs exactly 1 correct option`);
      }
      if (ex.type === 'observe') {
        if (!Array.isArray(ex.lines) || ex.answer == null || !ex.lines[ex.answer])
          problems.push(`${et}: lines/answer invalid`);
      }
      if (ex.type === 'fill') {
        if (!ex.code || ex.code.indexOf('{{blank}}') < 0)
          problems.push(`${et}: code missing {{blank}}`);
        if (!ex.bank || !ex.bank.includes(ex.answer))
          problems.push(`${et}: answer not in bank`);
      }
      if (ex.type === 'fix') {
        if (!Array.isArray(ex.tokens) || ex.answer == null || !ex.tokens[ex.answer])
          problems.push(`${et}: tokens/answer invalid`);
      }
      if (ex.type === 'arrange') {
        if (!Array.isArray(ex.blocks) || ex.blocks.length < 2)
          problems.push(`${et}: blocks invalid`);
      }
      if (ex.type === 'type') {
        if (!ex.answer) problems.push(`${et}: missing answer`);
      }
      if (ex.type === 'build') {
        if (!ex.template || !Array.isArray(ex.fields) || !ex.fields.length)
          problems.push(`${et}: template/fields invalid`);
        else ex.fields.forEach(fl => {
          if (!fl.bank || !fl.bank.includes(fl.answer))
            problems.push(`${et}: field ${fl.key} answer not in bank`);
          if (ex.template.indexOf('{{' + fl.key + '}}') < 0)
            warnings.push(`${et}: field ${fl.key} not in template`);
        });
      }
      if (ex.type === 'operate') {
        if (!ex.panel || !ex.panel.length) problems.push(`${et}: no panel fields`);
        if (!ex.check || !ex.check.length) problems.push(`${et}: no checks`);
        if (!ex.render || !ex.render.js || ex.render.js.indexOf('update') < 0)
          problems.push(`${et}: render.js missing update()`);
      }
      // render sanity
      if (ex.render && ex.render.js) {
        const bad = (ex.render.js.match(/gsap\.(\w+)/g) || [])
          .map(s => s.slice(5)).filter(m => !['to', 'from', 'fromTo', 'timeline', 'killAll'].includes(m));
        if (bad.length) problems.push(`${et}: unsupported gsap.${bad[0]}`);
        const eases = (ex.render.js.match(/ease:\s*["']([^"']+)["']/g) || []);
        eases.forEach(e => {
          const name = e.match(/["']([^"']+)["']/)[1];
          if (!['none', 'linear', 'power1.out', 'power1.in', 'power2.out', 'power2.in',
                'power2.inOut', 'back.out'].includes(name))
            problems.push(`${et}: unsupported ease "${name}"`);
        });
      }
    });
  }
  if (!unitHasCheckpoint) warnings.push(`${tag}: no lesson marked isCheckpoint`);
}

console.log('\n--- PROBLEMS (' + problems.length + ') ---');
problems.forEach(p => console.log('  ' + p));
console.log('--- WARNINGS (' + warnings.length + ') ---');
warnings.forEach(w => console.log('  ' + w));
process.exit(problems.length ? 1 : 0);
