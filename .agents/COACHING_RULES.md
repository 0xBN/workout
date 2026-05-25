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

- Priority goal: climbing progression with longevity.
- Protect finger recovery.
- Keep right knee support work intact.
- Keep scoliosis-aware left QL and right-side McGill logic intact.
- Keep right-shoulder-friendly exercise selection intact unless the user asks otherwise.
- Protect left/right correctness in unilateral and side-biased movements.
- Progressively overload, but keep most working sets in the `RPE 6-8` zone when possible.
- Prefer high-compliance solutions over ideal-but-skipped solutions.
- If a recovery block is repeatedly skipped, reduce cognitive load before adding more work.
