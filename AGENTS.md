# Workout App Agent Notes

## Purpose

This repo uses CSV workout logs dropped into `public/program-csv/` for coaching review before any program changes are made.

## CSV Review Workflow

When a new CSV log is added to `public/program-csv/`, the agent should:

1. Read the newest CSV file in `public/program-csv/`.
2. Compare it against the current live program in `public/program.json`.
3. Read `.agents/BODY_CONTEXT.md` for physical constraints and non-negotiables.
4. Read `FEEDBACK_LOG.md` for the most recent review date and recurring trends.
5. Use the most recent feedback entry date as the default lower bound for fresh log parsing.
6. Parse CSV entries from that date forward by default, unless the user asks for a longer historical review.
7. Use earlier feedback entries to identify repeated themes and trends over time.
8. Review adherence trends first:
   - missed days
   - partially completed blocks
   - recurring skipped items
   - what gets done reliably vs what does not
9. Review effort trends second:
   - exercises with consistently very low RPE
   - exercises with consistently very high RPE
   - signs that loading is too easy, too hard, or drifting
10. Give coaching feedback before changing the program.
11. Avoid editing `public/program.json` until the user explicitly asks for changes.
12. After giving feedback, append a new dated entry to `FEEDBACK_LOG.md`.

## Coaching Priorities

- Priority goal: climbing progression with longevity.
- Protect finger recovery.
- Keep right knee support work intact.
- Keep scoliosis-aware left QL and right-side McGill logic intact.
- Keep right-shoulder-friendly exercise selection intact unless the user asks otherwise.
- Prefer high-compliance solutions over ideal-but-skipped solutions.
- If a recovery block is repeatedly skipped, reduce cognitive load before adding more work.

## Notes Storage

- Keep instructions and workflow rules in `AGENTS.md`.
- Keep physical context and injury constraints in `.agents/BODY_CONTEXT.md`.
- Keep coaching history in `FEEDBACK_LOG.md`.
- Append new feedback by date in one rolling file so trends are easy to inspect.
