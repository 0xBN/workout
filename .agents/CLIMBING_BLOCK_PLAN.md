# Climbing Block Plan (draft)

Last updated: 2026-08-28 (Charlie/BPF dump distilled)

Working plan. Climbing-day checklists + info modal landed in v3.13.
Status: implemented in `public/program.json` and the app UI. Rotate skills on review.

## Athlete snapshot (this pass)

- Operating level: V6 stuck after ~5 years of fairly consistent climbing. Long-horizon goal V12.
- Mantra: do not pick the skill at the gym. Follow the prescription, put in time, log RPE.
- Finger treated as cleared (2026-08-28). Injury is historical.
- Max hangs: Friday only, 20mm half crimp 4x7s bodyweight, before board. Not twice a week.
- Keep Wednesday Norwegian 4x4. Do not stack a limit block that day.
- Live log: Google Sheet `10ApiDRmdFru5giLImN_FYTBvAUUopjU0RpvTPHPvmrg` tab `log` (anyone-with-link CSV pull works).

## Already live (v3.12, do not revert)

- Mon / Fri / Sat are different flow rows with glance subtitles (still too vague; this draft replaces them).
- Wednesday is 4x4 only. Cindy removed.
- Abrahangs: one daily session, 4-finger half crimp + 3-finger drag, 6x10s / 20s rest, ~40%, feet on floor.
- Tuesday optional sled at 90 lb added plates.
- Warmup order: dead bug after clamshells, shoulder circles after squat rocks.
- Max hangs still paused.
- Pull-ups 85→80 and suitcase 70→75 proposed, not applied.

## Locked week (Paradigm baseline)

One hard climbing day, one skill day, one engine day. Tuesday lift unchanged. Saturday open.

| Day | Stimulus | On-wall structure |
|---|---|---|
| Mon | Skill | Existing climbing warmup (timer). Ladder 4 sets. **3 sublimit problems**, RPE 7–8. **No limit block.** Gym, not board. |
| Tue | Lift | Unchanged. Sled optional. |
| Wed | Engine | 4x4 only. |
| Thu | Reset | Unchanged. |
| Fri | Hard | Existing climbing warmup (timer). **Max hangs 4x7s 20mm.** Ladder 4 sets. **3 limit boulders × 4 tries.** Then **2 sublimit problems**. Board, Kubos. |
| Sat | Open | One row: friends / new sets / skip. No skill. |
| Sun | Stretch | Unchanged. |

Limit tries not used stay unchecked. Stop when quality drops even if boxes remain. 3×4 is the middle of Paradigm’s 2–4 boulders / 3–5 tries.

### Prescribed skills (not a picker)

- **Monday:** silent feet / flagging. Gym, varied angles.
- **Friday:** steep, feet-on. Board. Same family (legs actually working), terrain that matches the wall.
- Do not start with a crimp-specific limit theme until a few board weeks stay quiet.

### Keep vs drop

- **Keep** the current PT climbing warmup (knee / QL / shoulder). After it, add the boulder ladder.
- **Do not** replace it with Paradigm’s 17-move general warmup (jumping jacks, neck circles, split jumps, etc.).
- Failed-beta rule (change one variable or move on) and 30-second “what worked” log live in the info modal for now, not as extra cards.

## App behavior to build

Climbing work blocks become **checklist + RPE** (same as lifts). Flow rows do not collect RPE.

- Warmup stays timer flow.
- Ladder / limit / sublimit are `ExerciseCard`s. No rest timer on limit attempts.
- Card title **is** the prescribed skill. One glance line: name + sets.
- Small info control on the block opens a **scrollable modal** (rules, stop criteria, skill explanation). Reusable later for 4x4, Abrahangs, sled. Do not dump rules into a permanent subtitle.

### Suggested cards

**Monday `skill_volume` (checklist)**

- Ladder — 4 sets (easy problems, quality only)
- Sublimit — silent feet / flagging — 3 sets, target RPE 7–8

**Friday `board_limit` (checklist)**

- Ladder — 4 sets
- Limit 1 — static lock-off / squeeze — 4 tries, RPE 9–10 (Charlie: not all limit is dyno-slapping)
- Limit 2 — steep feet-on — 4 tries, RPE 9–10
- Limit 3 — steep feet-on — 4 tries, RPE 9–10 (optional; skip if quality already dropped)
- Sublimit — guaranteed smash, same skill — 2 problems, intended intensity high, required grade easier. Stop the second you are not snappy.

**Saturday `optional_volume`**

- Open session — 1 set. Skip is fine.

## User template (source material, condensed)

Session idea we are implementing, not as a gym-time taxonomy scroll:

- Pre-pick (now: we prescribe) one skill.
- Ladder: 3–4 easy, no grade chasing.
- Limit: quality attempts, RPE 9–10, rest 3–5 min, no side problems mid-rest. Stop on quality drop or try cap.
- Sublimit: RPE 7–8, 2–3 problems, same skill. Hard stop if fingers fade or hurt.
- New sets / friends: only if it serves today’s skill, else Saturday open day.
- Log: what worked, what didn’t, one thing next time (modal reminder; sheet notes later if needed).

Highest-leverage themes for this plateau: footwork / flagging, steep tension, later crimp finger strength.

## Charlie Schreiber / Paradigm — what kind of coach

Systems coach, not a drill-of-the-week guy. CSCS + climbing coach. Diagnosis for a stuck V6 is almost always **structure**, not effort: random mixed sessions that feel hard but reset instead of stacking.

Core formula: **right phase, right load, right order, right quality for you.**

Sequence he actually uses (do not skip around):

1. Capacity — handle work and recover
2. Strength — raise the ceiling (recruitment, heavy, full rest)
3. Power / RFD — express that ceiling fast (fresh only)
4. Power endurance — repeat high output (4x4s, circuits; short cycles)
5. Perform / peak

Session question is **what am I building today?** Modes: capacity, strength, power, performance. Do not mix them into one fried-fingers session.

Load = volume × intensity. Spikes vs chronic load (ACWR) cause the “best month then pulley” pattern. Green days: leave able to be good tomorrow. Drag the plan forward; never force a losing session.

Skill is **deliberate practice** on problems you can actually attend to, not hoping technique appears on a project.

Limit bouldering is his main on-wall max-strength *and* power tool: 2–3 boulders, one of them **static lock-down / squeeze harder than you need**. Stop an attempt when pump or fade starts — that has become PE and blunts the strength signal.

Sublimit “guaranteed power”: slightly easier, hit as hard and fast as you can, successful contacts. Stop when not snappy. This is the backup so a limit day still got a real stimulus if you only stuck 20 moves.

Power hates fatigue. Two quality max-strength exposures a week is enough; other days exist to **not ruin those two**. PE is 2 sessions per ~8 days, about 3 weeks for a boulderer, not year-round next to limit + hangboard.

BPF packaging: 8-day on/off microcycle that **can convert to a 7-day week** (our week is allowed). Four climbing days + supplemental + rest. One dedicated finger-loading session per microcycle. Tracks V4–V6 / V7–V9 / V10–V13. Brian sits at the top of the V4–V6 track, stuck.

Injury stance: if it hurts, you are not underloading. Find pain-free, add a tiny bit, if next day is stiff you did too much.

### How this maps to us (no more dump needed)

- Our Mon skill / Fri hard / Wed 4x4 / Sat open is a 7-day version of his “protect the quality day.”
- Weekly 4x4 year-round is **more PE than he would run in a strength/power block**. Keep it because Brian asked; treat it as the engine maintenance dose, not a third hard day. Friday must stay short and stop at fade.
- Daily Abrahangs at 40% is tissue work, not his once-per-cycle max finger day. Fine. Do not add max hangs on top of Friday limit yet.
- First skill family (feet / flagging / steep feet-on) matches what he would give a plateaued V6 before a crimp-max phase.

**Do not need more pastes** unless Brian wants to copy a specific BPF V4–V6 session PDF (exact drills, RPEs, videos). Sales videos, webinar Q&A, and load-type lectures are enough to know the coach. More of that will not change the next write.

## Still out of scope this pass

- Pull-up and suitcase load bumps
- Unpausing max hangs
- Replacing Abrahangs density (10/20) with max hangs
- Week-1 / week-2 mesocycle rotator in the app
- Publishing a public skill taxonomy picker

Climbing-day checklists and the info modal are in v3.13.
