# Gamification Plan (Deliverable 5, Phase 2)

**The one rule (from the brief, and from Deliverable 4):** gamification *decorates* the
mastery model - it never distorts it. The progression model deliberately shipped with no
rewards inside it so this layer can sit entirely on top. That gives one hard test every
mechanic below must pass:

> **The distortion test:** if a mechanic could make a student do something the pedagogy
> would not want - rush a lesson, dodge hard material, grind for points, protect a
> streak instead of learning - it is cut or redesigned. Every mechanic names the
> learning behavior it reinforces; if it can't, it doesn't ship.

A second principle, specific to this audience (adult broadcast students, many in
classrooms): **competence-based, not compulsion-based.** The dopamine hooks that suit a
solo teenager learning Spanish on a bus can backfire on adults who feel infantilized, and
on a classroom where a teacher - not a leaderboard - sets the pace. So the loud
mechanics (streaks, leagues) are **opt-in and teacher-disableable**, and the quiet ones
(competency badges, mastery progress) are the spine.

---

## 1. The reward currency: XP tied to *mastery events*, not activity

**What it is:** XP is awarded for **advancing a skill's state**, not for time spent or
taps made. Concretely, XP is minted only on:

| Event | XP | Learning behavior reinforced |
|---|---|---|
| Lesson passed first time | base | completing a real learning unit |
| Kernel exercise correct **first try** | bonus | the discrimination that *is* the concept (Deliverable 4 kernels) |
| Skill reaches `secure` (correct in 2+ later contexts) | bonus | durable retention, not cramming |
| Checkpoint passed clean (no remediation) | large | demonstrated unit mastery |
| Warm-up deck review that *advances* an interval | small | honoring spaced repetition |

**What earns nothing:** replaying a passed lesson, retrying after a miss, tapping through
an Observe you've already done. This is the anti-distortion core: **you cannot farm XP by
repetition.** The only way to more XP is more *mastery*, so the incentive and the
pedagogy point the same direction.

**Why not XP-per-exercise (the Duolingo default):** it rewards volume, which invites
speed-running and answer-memorization. Tying XP to first-try kernels and
state-advancement means the fastest way to "win" is to actually understand - exactly the
behavior we want.

## 2. Progress you can feel: the mastery meter, not a fuel gauge

**What it is:** the primary progress display is a **per-unit mastery ring** that fills as
that unit's skills move `introduced -> secure`. It can sit below 100% even after the
checkpoint is passed, and it *rises later* as spaced review secures skills in other
contexts.

**Learning behavior:** makes retention visible. A student sees Unit 3's ring quietly
complete while they're working in Unit 5 - concrete proof that "nothing you learn is
allowed to fade" (the Deliverable 4 contract). It rewards coming back and reviewing
*without* a punishment for not.

**Distinct from XP:** XP is lifetime and only goes up; the mastery ring is current-state
and reflects *strength decay* if a skill goes long unseen (it dims, never empties). Dimming
prompts review; it never revokes access or XP.

## 3. Streaks - redesigned as a "practice habit", opt-in, and unbreakable-by-life

The classic daily streak is the most distortion-prone mechanic there is (it rewards
showing up, punishes rest days, and drives streak-protection behavior over learning). Kept,
but rebuilt:

- **It counts *learning days*, not logins.** A day counts only if you passed a lesson or
  advanced >=3 review intervals - opening the app does nothing.
- **Streak freezes are automatic and free** (weekends off by default; configurable). The
  goal is a *habit*, so missing Tuesday shouldn't nuke three weeks of real progress.
- **Teacher-disableable per class**, and **off by default in classroom mode** - a teacher's
  syllabus, not a streak, should pace a cohort.
- **Learning behavior:** distributed practice (the single most robust finding in learning
  science). The redesign keeps that benefit while removing the anxiety and the
  streak-protection grinding.

**Cut:** streak leaderboards, streak-loss shaming, "you're about to lose your streak!"
push spam. None reinforces learning; all reinforce compulsion.

## 4. Lives / hearts -> **replaced** with "diagnostic tries"

Hearts (lose a life per wrong answer, run out, get locked out or paywalled) **fail the
distortion test outright**: they punish the exact exploration - guessing, being wrong,
seeing the visible consequence - that Deliverable 1-3's "beginner-safe error experience"
is built on. Our whole error pedagogy is *wrong answers produce a visible, explained
result*. Hearts would tax that. **Cut entirely.**

**Replacement - the same UI real estate, inverted meaning:** a small **"insight" counter**
that goes *up* when a student recovers from a mistake - i.e. gets a kernel right on the
retry after missing it first. Being wrong then understanding is the most valuable learning
event there is; we *reward* it rather than charging for it.

- **Learning behavior:** reframes error as progress, protecting the safe-to-fail
  environment while still giving the "resource that responds to performance" feel hearts
  provide - just pointed the right way.

## 5. Badges - tied to *real competencies*, in the broadcast vernacular

Badges are the mechanic that best survives the distortion test, because a badge for a
*demonstrated skill* is just a certificate. Every badge maps to a competency an
employer or a gallery would recognize:

| Badge | Earned by (competency) |
|---|---|
| **Clean Keyer** | shipped a graphic with correct transparency over both bright and dark video (9.7 checklist) |
| **Safe Hands** | placed a lower third and bug fully title-safe, unaided (Checkpoint 4) |
| **Good Timing** | animated an entrance/exit with correct easing asymmetry - out faster, both eased right (Checkpoint 5/6) |
| **Wired It** | operator-drove a template you wired via the f0 handshake (Checkpoint 7) |
| **Field Repair** | fixed an unfamiliar template using the four-suspect method (Unit 8) |
| **On Air** | delivered all four capstones past checklist (graduation) |
| **Second Take** | recovered 10 kernels on the retry after a first-try miss (rewards the insight loop from #4) |

**Learning behavior:** each badge is a retrieval-and-transfer goal that names a
job-relevant skill, so pursuing badges *is* pursuing competence. Badges are shown as a
**reel** (broadcast term) the student can share - and, crucially, that a teacher can read
as a skills inventory. No badges for streaks, speed, or volume.

## 6. Leagues / leaderboards - **off by default, cooperative when on**

Competitive leagues are high-distortion (they reward speed and volume, and demoralize the
bottom of the table - poison in a graded classroom). So:

- **Default: no leaderboard.** Individual mastery is the game.
- **Classroom opt-in, cooperative framing:** a teacher may enable a **cohort goal** - a
  shared "shows delivered" tally the *whole class* fills toward a target (e.g. "40
  capstones shipped this term"). This reinforces peer support, not rivalry, and can't
  demoralize a struggling student because it's additive.
- **Optional head-to-head only as a time-boxed "GFX jam"** a teacher schedules: a build
  challenge judged on the 9.7 checklist, not on speed. Competence remains the axis.
- **Learning behavior (cohort goal):** social accountability and belonging without the
  status-anxiety of ranked ladders.

## 7. Daily goal - **a mastery target, phrased in minutes for honesty**

- The student picks a daily commitment (Casual / Regular / Serious = ~1 / ~2 / ~3 lessons).
- **Met by mastery events, displayed as minutes** ("~10 min") so it's an honest promise
  about time, not a lie about difficulty.
- Missing it does nothing punitive; meeting it fills the day's ring and (if on) counts the
  streak day.
- **Learning behavior:** self-set goals and implementation intentions - the student
  commits in advance, which raises follow-through, without the app dictating a pace.

## 8. Teacher / classroom layer (the brief assumes a dashboard is wanted)

This audience is largely in Mirko's classes, so the teacher layer isn't an afterthought -
it's where the gamification is *governed*:

- **Per-class toggles** for every loud mechanic: streaks, cohort goal, GFX jams,
  head-to-head. A teacher can run the course as pure mastery with zero game layer if they
  choose.
- **Skills-inventory view** (built directly on Deliverable 4's recorded data): per student
  and per class, which skills are `introduced` vs `secure`, which checkpoint diagnoses
  recur (i.e. what the *class* is collectively struggling with - a signal to reteach).
- **Assign & gate by syllabus:** the teacher, not the app's unlock logic, may open/close
  units to match the term - overriding the linear spine where their course needs it.
- **Capstone review queue:** capstones "returned with notes" surface to the teacher, who
  can add their own notes - turning the checklist engine into a grading aid.
- **Learning behavior reinforced (for the teacher's students):** timely reteaching of
  class-wide gaps, and human feedback on real deliverables - the highest-leverage
  interventions there are.

## 9. What we explicitly cut, and why

| Cut | Why it fails the distortion test |
|---|---|
| XP per exercise / per tap | rewards volume -> speed-running, answer memorization |
| Hearts / lives / lockouts | taxes the safe-to-fail error pedagogy the course is built on |
| Ranked competitive leagues | rewards speed; demoralizes strugglers; toxic in a graded class |
| Timed "beat the clock" drills | the curriculum must not depend on typing/tapping speed (brief, section 4) |
| Loss-aversion push notifications | drive compulsion and streak-protection, not learning |
| Gems/lootboxes/paid power-ups | monetizes friction the pedagogy wants to remove |
| Cosmetic-only rewards untied to skill | harmless but noise; every reward here names a competence |

## 10. How the layer switches on (rollout)

Gamification is **additive and reversible**: the app is fully functional as pure mastery
(the MVP ships with the game layer off). Mechanics turn on in order of
distortion-safety: **badges + mastery ring first** (pure decoration of competence),
**XP + daily goal next**, **streaks (opt-in) and cohort goals last**, each behind a
setting a teacher controls. If any mechanic is later found to bend behavior the wrong way,
it can be switched off without touching the learning path - which is the whole point of
having designed the pedagogy first.

---

### Summary

Every mechanic here points the student at the same thing the pedagogy does: **understand
the concept, retain it, transfer it, ship the real graphic.** XP is minted by mastery, not
motion; progress is shown as retention; errors are rewarded, not charged for; badges are
competencies in broadcast language; competition is cooperative and optional; and a teacher
can govern or silence the whole layer. The loud, compulsion-driven mechanics of the genre
are cut on principle, not omitted by accident.
