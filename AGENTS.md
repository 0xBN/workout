# Workout App Agent Notes

## Purpose

This repo uses CSV workout logs dropped into `public/program-csv/` for coaching review before any program changes are made.

## CSV Review Workflow

When a new CSV log is added to `public/program-csv/`, the agent should:

1. Read the newest CSV file in `public/program-csv/`.
2. Prompt the user with one short question only: `Anything new to body, schedule, or energy since last review?`
3. Accept a short natural-language reply. Do not ask a long checklist unless the user explicitly wants one.
4. Compare the CSV against the current live program in `public/program.json`.
5. Read `.agents/BODY_CONTEXT.md` for physical constraints and non-negotiables.
6. Read `FEEDBACK_LOG.md` for the most recent review date and recurring trends.
7. Use the most recent feedback entry date as the default lower bound for fresh log parsing.
8. Parse CSV entries from that date forward by default, unless the user asks for a longer historical review.
9. Use earlier feedback entries to identify repeated themes and trends over time.
10. Review adherence trends first:
   - missed days
   - partially completed blocks
   - recurring skipped items
   - what gets done reliably vs what does not
11. Review effort trends second:
   - exercises with consistently very low RPE
   - exercises with consistently very high RPE
   - signs that loading is too easy, too hard, or drifting
12. Incorporate any user update into the review, especially:
   - new pain or tightness
   - schedule or adherence issues
   - unusual extra activity like long rides, hikes, or sports
   - time or energy constraints
13. Give coaching feedback before changing the program.
14. Avoid editing `public/program.json` until the user explicitly asks for changes.
15. After giving feedback, append a new dated entry to `FEEDBACK_LOG.md`.

## User Prompt Style

- Default assumption: the user will drop a CSV and then wait for the agent to prompt them.
- Ask only one lightweight follow-up question after the CSV drop.
- Preferred prompt: `Anything new to body, schedule, or energy since last review?`
- Accept short voice-style updates.
- Do not force structured answers.
- If the user says `nothing else`, continue with the review.
- If the user mentions one important new factor, treat that as sufficient context.

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
