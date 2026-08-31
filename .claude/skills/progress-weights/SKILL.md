---
description: Bump weighted-lift loads based on RPE trends. Narrow tool — not the full coaching review.
---

# /progress-weights

Bump `working_weight` values for weighted lifts based on RPE trends from the log.

## Step 1 — Fetch the live log

Pull the shared sheet CSV (same source the app writes):

`https://docs.google.com/spreadsheets/d/10ApiDRmdFru5giLImN_FYTBvAUUopjU0RpvTPHPvmrg/gviz/tq?tqx=out:csv&sheet=log`

Do not use `public/program-csv/` unless Brian explicitly points at a file there.

## Step 2 — Read the program

Read `public/program.json`. The weighted exercises to review are in `blocks.lift_full_body.exercises` — any exercise with a `working_weight` field:
- `lb2` Weighted pull-ups
- `lb3` Bulgarian split squat
- `lb4` Romanian deadlift
- `lb5` Overhead press
- `lb6` Suitcase hold

Note: the log may use old exercise IDs (`ll1`, `ll2`, etc.) from a previous program version. Match by `exercise_name` column, not `exercise_id`.

## Step 3 — Find top sets

For each weighted exercise, group log rows by `date`. Within each session, the **top set** is the row with the highest numeric `weight` for that exercise. Collect the top set `weight` and `rpe` for each session, sorted by date descending.

## Step 4 — Apply progression rules

Apply the RPE Progression Rules in `.agents/COACHING_RULES.md` to the most recent 2–4 logged top sets per exercise. If a high-signal benchmark was reported, reconcile per those rules and log it to `FEEDBACK_LOG.md`.

Standard bump increments (mechanical, not policy):
- RDL (barbell): +10 lb
- Weighted pull-ups (added weight): +5 lb
- BSS, OHP (dumbbell — total weight): +5 lb
- Suitcase hold (single DB): +5 lb

Round the new weight to the nearest 5 lb.

## Step 5 — Present the report

Show a compact table:

```
Exercise            Current   Recent top sets (date → wt @ RPE)             Recommendation
────────────────────────────────────────────────────────────────────────────────────────────
Weighted pull-ups   80 lb     2026-05-20 → 80 @ 7 | 2026-05-13 → 80 @ 6   hold
Romanian deadlift   205 lb    2026-05-20 → 205 @ 5 | 2026-05-13 → 195 @ 4  ↑ 215 lb
...
```

If any exercise has fewer than 2 logged sessions, note "not enough data" for that row.

## Step 6 — Confirm and apply

Ask: **"Apply these changes to program.json? (yes / no / edit)"**

- **yes** — update `working_weight` for every exercise marked with ↑ or ↓, leave holds unchanged.
- **no** — exit without changes.
- **edit** — let the user specify per-exercise overrides before applying.

After applying, confirm which fields were updated.
