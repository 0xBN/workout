# Coaching Rules

## Review Priorities

- Review adherence trends first:
  - missed days
  - partially completed blocks
  - recurring skipped items
  - what gets done reliably vs what does not
- Review effort trends second:
  - exercises with consistently very low RPE
  - exercises with consistently very high RPE
  - signs that loading is too easy, too hard, or drifting
- Incorporate any user update into the review, especially:
  - new pain or tightness
  - schedule or adherence issues
  - unusual extra activity like long rides, hikes, or sports
  - time or energy constraints

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
