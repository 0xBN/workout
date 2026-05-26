# Coaching Rules

## Review Priorities

- Review adherence trends first:
  - missed days
  - partially completed blocks
  - recurring skipped items
  - what gets done reliably vs what does not
  - whether the user is following the intended weekly structure or quietly drifting away from it
  - whether a day, block, or exercise is failing because of cognitive load, time cost, or context switching
- Review effort trends second:
  - exercises with consistently very low RPE
  - exercises with consistently very high RPE
  - signs that loading is too easy, too hard, or drifting
- Incorporate any user update into the review, especially:
  - new pain or tightness
  - schedule or adherence issues
  - unusual extra activity like long rides, hikes, or sports
  - time or energy constraints

## Review Scope Rules

- When reviewing a new CSV, analyze the full fresh review window by default, not just the one exercise or day most recently discussed.
- If the user asks to `progress`, `adjust`, or `update` the program, run a whole-program scan across the current prescription for:
  - repeated low-RPE candidates to move up
  - repeated high-RPE or incomplete candidates to move down
  - recurring skipped or partially completed items that may need simplification
  - structure problems that are hurting compliance even if the exercise choice itself is good
- Do not wait for the user to point out each individual movement if the broader CSV trend already shows multiple adjustment candidates.
- Summarize the full set of meaningful adjustment candidates before or while applying changes so the reasoning matches the actual file edits.
- Favor coherent block-level updates when several lifts on the same day are clearly drifting together.

## Review Cadence

- Default full-review cadence: about 14-15 days of new data.
- Reason: this usually gives enough signal to see adherence patterns, missed days, recovery behavior, and early RPE trends without overreacting to noise.
- If less than about 14 days has passed since the last review, be more cautious about doing another full review unless:
  - the user explicitly wants one
  - there is a meaningful body/recovery change
  - there is a clear performance problem, pain issue, or prescription question
- Same-day or near-same-day re-review should usually trigger a confirmation check before running a full review.

## Movement Audit Rules

- When editing `public/program.json`, audit unilateral and side-biased movements before finalizing.
- Do not rely only on the exact phrase `per side`; infer from the movement itself whether it is unilateral, alternating, contralateral, or side-biased.
- If an exercise is functionally unilateral or side-specific, its timer should explicitly account for both sides unless it is intentionally one-sided.
- If an exercise is intentionally one-sided, the note and timer labels should clearly name the side.
- Do not leave unilateral timers with generic labels like `set 1` if the movement actually requires left/right execution.
- Check the exercise name, note, and `timer_routine.blocks` labels for side consistency.

## RPE Progression Rules

- Default target: most working sets should land around `RPE 6-8`.
- Repeated working-set `RPE < 5` means the load is likely too easy and should usually move up.
- `RPE 6-8` means hold the load and keep progressing with the current prescription.
- Repeated working-set `RPE 9+` means the load is likely too hard and should usually move down.
- `RPE 10` or incomplete prescribed work is a strong signal to reduce the load.
- Treat `RPE 5` as borderline/coasting unless there is a good context reason to hold.
- Prioritize the most recent 2-4 relevant sessions over older history.
- If the recent trend is mixed, hold and collect more data unless the user explicitly wants to push harder.
- If recovery, illness, unusual fatigue, or extra endurance work likely affected performance, mention that before changing load.
- When several exercises in the same training block all drift below target RPE, treat that as a programming-signal problem, not a one-exercise exception.
- Default progression behavior should be: keep the set/rep structure, change the load first, and aim to bring the next exposure back toward `RPE 7-8`.
- The coaching system should use the user's logged RPE as the main progression signal; extra verbal context is helpful, but the CSV should already be strong enough to drive most load changes.
- High-signal user-reported benchmark efforts can override or upgrade a conservative CSV-only interpretation when they clearly represent current ability.
- Examples of high-signal benchmark context:
  - `90 lb x 4 on weighted pull-ups, near max`
  - a recent heavy test set
  - a near-complete top set noticeably above the current programmed load
- When the user gives that kind of benchmark, record it in `FEEDBACK_LOG.md` so future reviews do not lose the context.
- If CSV history and a recent high-signal benchmark disagree, do not ignore the benchmark; reconcile the two and bias away from obviously stale underloading.
- In those cases, progression should still stay within reason, but the top working set should be pushed enough that the next exposure has a real chance to land near `RPE 7-8` rather than obviously below it.

## Timer Design Rules

- **Audio-first. Visual-second.** Every timer routine must be fully navigable by audio alone. The user may never look at the screen.
- The `rest` block that precedes a new exercise must announce the exercise by name and any position cue ("right knee down", "foot on bench", etc.) so the user can get into position before the work starts.
- Work blocks must announce the exercise name when they begin. The timer speaks `b.label` on work-block start, not a generic "Start". Never reduce this to a generic cue — it removes the only in-work audio context.
- Rest/transition durations:
  - Position change (new exercise or side from the floor): **5 seconds minimum**
  - Simple side switch (same position): **4 seconds**
  - Direction-only change (e.g., shoulder circles backward → forward): **3 seconds**
- When editing `program.json` timer blocks, verify that every `rest` block has a meaningful label and every `work` block has a descriptive label (exercise + side). Generic labels like `"Rest"` or unlabeled work blocks fail the audio-first check.
- This rule has caused regressions multiple times. Before finalizing any timer edit, run through the block sequence and confirm: could someone with eyes closed follow this entire routine from audio alone?

## Compliance Rules

- Compliance matters as much as progression quality. A program that is theoretically ideal but repeatedly skipped is underperforming.
- When something is not being done reliably, first diagnose why:
  - too much cognitive load
  - too much session length
  - poor day placement
  - too much context switching
  - low perceived value by the user
- After diagnosing the likely cause, prefer the smallest change that improves completion:
  - simplify
  - shorten
  - attach it to an existing session
  - move it to a better day
  - reduce optional complexity
- When reviewing compliance, look for patterns across the CSV, not just explicit user complaints.

## Coaching Priorities

- Primary goal: optimize for climbing progression toward V12 while protecting longevity.
- When tradeoffs appear, bias toward what improves climbing carryover without creating avoidable injury risk or recovery debt.
- Do not optimize equally for every fitness quality at once; climbing performance and durability come first.
- Use body context not only as a limitation list, but as a constraint system for choosing the highest-ROI options safely.
- Protect finger recovery.
- Keep right knee support work intact.
- Keep scoliosis-aware left QL and right-side McGill logic intact.
- Keep right-shoulder-friendly exercise selection intact unless the user asks otherwise.
- Protect left/right correctness in unilateral and side-biased movements.
- Progressively overload, but keep most working sets in the `RPE 6-8` zone when possible.
- Prefer high-compliance solutions over ideal-but-skipped solutions.
- If a recovery block is repeatedly skipped, reduce cognitive load before adding more work.
- When the system chooses between perfect local optimization and broad consistency across the week, prefer the option that improves both adherence and long-term progression.

## Prioritization Order

1. Protect long-term ability to climb consistently.
2. Support the V12 climbing goal.
3. Preserve or improve injury-sensitive areas: finger, right knee, left QL/scoliosis pattern, right shoulder.
4. Improve adherence by reducing friction and cognitive load.
5. Progress secondary strength work when it supports climbing and recovery capacity.

## Programming Bias

- Favor exercises and progressions with strong climbing carryover.
- Be skeptical of work that adds fatigue but offers little climbing or durability benefit.
- If a choice exists between the theoretically ideal plan and the one the user will actually complete, prefer the one with better real adherence unless it meaningfully compromises safety or the main goal.
