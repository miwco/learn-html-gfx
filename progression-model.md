# Progression & Mastery Model (Deliverable 4)

How the course decides what a student may do next, what "passed" means, when concepts
return, and where experienced learners may skip ahead. Mastery gates, not time gates;
failure produces targeted remediation, never punishment. (Anything reward-shaped -
XP, streaks, hearts - is deliberately absent here: the model must stand on its own,
and Phase 2 gamification may only decorate it.)

---

## 1. Skill atoms

The unit of tracking is the **skill**: one lesson's one new concept. ~65 skills across
Units 0-9 (review remixes and checkpoints introduce none). Each skill carries:

| Field | Meaning |
|---|---|
| `state` | `locked` -> `introduced` (lesson passed) -> `secure` (correct in 2+ later contexts) |
| `strength` | 0-5, raised by correct answers (more when first-try, more still in *recycled* contexts), lowered by misses |
| `last_seen` | drives the review scheduler (section 5) |
| `kernel_record` | pass/fail history on the skill's kernel exercises specifically |

Every skill also names its **kernel exercise(s)**: the discrimination that *is* the
concept (already marked in the lesson plans - e.g. 1.6's div-vs-span switch, 5.5's
asymmetric out, 7.7's crossed-wires fix). Kernels are what gates test; the other
exercises are practice around them.

## 2. Path structure (structural, not visual)

A **linear spine** of 10 units - deliberate, because every unit consumes the previous
one's output (the strap literally carries forward). Within a unit:

```
[lesson] -> [lesson] -> ... -> [review remix] -> [CHECKPOINT gate] -> next unit
                                                      |
optional nodes (8.9, 9.9) hang off the spine          +-- remediation loops back
and never gate anything                                   to named lessons
```

- **Lessons unlock sequentially** within a unit (each assumes the previous).
- **The checkpoint is the only unit gate.** All lessons incl. the review remix must be
  completed to attempt it; passing it unlocks the next unit.
- **Everything already passed stays open forever** - free replay with fresh variant
  content (names, values, and code details are drawn from variant pools so replays are
  practice, not recall of answers).
- **Unit 9 branches once:** 9.1 -> 9.2 -> Capstone A (mandatory first - it is the
  canonical no-scaffold build), then Capstones B/C/D in any order, then 9.7 -> 9.8.
  Graduation = all four capstones pass the 9.7 checklist. 9.9 optional.

Node states the app must render: `locked` / `available` / `passed` /
`due-for-review` (see section 5).

## 3. Prerequisite graph

Unit-level spine: `0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9`.

The load-bearing cross-unit edges (the "recycles" lines, formalized). These are what
remediation and test-out validation check against:

| Edge | Why it's load-bearing |
|---|---|
| 2.3 (id) -> 3.3, 6.1, 7.3, 7.7 | ids become selectors, GSAP targets, getElementById handles, and the fN convention |
| 2.6 (skeleton) -> 3.1, 7.8 | the two seals: `<style>` and the definition open exactly where promised |
| 1.3 + 4.5 (canvas/safe) -> 9.3-9.6 | every capstone is graded on them |
| 4.7 (opacity) + 5.1 (translate) -> 5.3, 6.2 | the animated properties; all motion is transforms + opacity |
| 5.4/5.5 (easing taste) -> 6.3, 9.7 | the same taste re-spelled in GSAP, then codified in the checklist |
| 6.1 (calling) -> 7.1 (defining) | the deliberate one-unit gap between call and define |
| 7.7 (f0 handshake) -> 8.5, 8.7, 9.2 | the data pipeline every later wiring rides on |
| 3.2 et al. (silent failures) -> 8.7 | every planted silent failure feeds the four-suspect method |

Practical use: when a student fails a gate, the blame is assigned to a *skill*, and
this graph says which earlier skill to re-check if the remediation lesson itself
doesn't stick (e.g. failing 7.3 twice pulls 2.3 into the warm-up deck).

## 4. Gating rules

### Lesson level
- **Pass** = the lesson's stated accuracy bar (typically >=4/5 or >=5/6) **and** its
  kernel exercise(s) correct. Kernels missed but bar met -> a fresh kernel variant is
  asked at the end (already specified in several lessons, e.g. 1.3, 1.6); pass hinges
  on that.
- **Fail once** -> immediate retry of the missed material as *variants* (never the
  same items verbatim).
- **Fail twice** -> **micro-review**: the lesson's learner-facing explanation
  re-presented with its Observe exercise, then 2-3 fresh variants of the kernel only.
  Pass that, and the lesson is passed - the student never re-grinds what they got
  right.
- Lessons are 3-7 minutes; a failed lesson never costs more than ~4 extra minutes.

### Unit level (checkpoints)
- Pass criteria and failure->lesson mappings are specified per checkpoint in the
  lesson plans; the model's general rules:
  - **Diagnosis over verdict**: the checker names the failing *skill* in learner
    terms and links the remediation lesson (as written in every checkpoint spec).
  - **Remediate, then re-attempt with variants**: after the linked micro-review, the
    checkpoint re-runs with fresh content (new brand card, new presenter, reshuffled
    Parsons blocks and distractors).
  - **No attempt limits, no lockouts.** The cost of failure is the targeted review,
    which is the point.
- **Capstone gating (Unit 9)**: capstones are graded by the 9.7 checklist engine plus
  the taste-approval replay; a capstone can be "returned with notes" (specific
  checklist items) any number of times, mirroring real delivery.

## 5. Spaced review - three channels

1. **Authored recycling (deterministic).** Every lesson's "Recycles" list is a
   content guarantee: each skill reappears inside later *teaching* in a new context.
   Authoring rule (already satisfied by Units 0-9, to be re-audited when lessons 3-9
   are written in full): **every skill appears in at least two later lessons in at
   least one other unit.** Unit 8 is structurally the whole-course recycle; Unit 9
   forces retrieval by construction.
2. **Review remixes (adaptive).** Each unit's end-of-unit remix draws its 6 exercises
   weighted by lowest `strength` within Units <= current, with the fixed anchors named
   in the lesson plans always included.
3. **The warm-up deck (scheduled).** Outside the path, a standing 5-exercise mixed
   session assembled from skills that are **due**: intervals expand
   `1 -> 3 -> 7 -> 21 days` per skill, reset toward 1 on a miss, advanced on a hit.
   Two design guards: (a) a due skill that the authored path will naturally revisit
   within the student's next ~2 lessons is *not* double-drilled; (b) the deck is
   optional-but-offered at session start - the path itself never blocks on it.
   Skills at strength 5 with `secure` state surface at most monthly.

Session shape this produces (a typical 10-minute sitting): warm-up deck (~2 min,
optional) -> one new lesson (~5 min) -> next lesson or replay (~3 min).

## 6. Placement & test-out

- **Per-unit test-out = that unit's checkpoint at a higher bar**: the checkpoint
  passed clean (no hints, no remediation loop) **plus** a 3-item "kernel sampler"
  drawn from the unit's kernel exercises. Passing seeds all the unit's skills at
  `strength 4, introduced` (not 5/secure - they still enter the review scheduler,
  catching bluffed knowledge later).
- **Test-out is available for Units 0-6 only.** Units 7-9 are always played: the SPX
  contract, the reading-fluency method, and the capstones are the course's actual
  product, are new even to experienced web developers, and are fast for them anyway.
  (A React developer clears 7.1-7.6 in minutes but must still meet the f0 handshake,
  the definition, and the operator.)
- **Placement flow for self-identified non-beginners:** an opening question ("Have you
  built web pages before?") offers *chained test-outs*: attempt Unit 1's, on success
  immediately offer Unit 2's, and so on; the first failure drops the student into that
  unit with everything earlier marked passed. Unit 0 is included in the chain (its
  checkpoint takes ~3 minutes) because its vocabulary and three-jobs model are assumed
  by all feedback text.
- **One attempt per unit per day** on test-outs (variants make brute-forcing
  pointless, but the cooldown nudges honest placement); the normal path is always
  available instead.

## 7. What the app must record (feeds Phase 3)

Per student: per-skill `state/strength/last_seen/kernel_record`; per-exercise
first-try correctness (to weight remixes and the deck); per-checkpoint attempt
diagnoses (which skill was blamed - also the teacher dashboard's core signal later);
capstone checklist results per item. Nothing else is needed to run this model.

---

## Summary of the contract this model makes with the student

1. You only ever face code made of things you've been taught (or that is sealed and
   scheduled to open).
2. You advance by demonstrating the concept, not by spending time.
3. Failing tells you *which* idea to revisit and costs minutes, not progress.
4. Nothing you learn is allowed to fade: it returns inside real lessons, in remixes,
   and in the warm-up deck.
5. If you already know something, prove it once - cleanly - and skip it. The SPX
   craft itself is never skipped.
