# Workout App Agent Notes

## Purpose

This repo uses CSV workout logs dropped into `public/program-csv/` for coaching review before any program changes are made.

## File Map

- `AGENTS.md`: root workflow entrypoint
- `.agents/BODY_CONTEXT.md`: physical constraints and non-negotiables
- `.agents/COACHING_RULES.md`: coaching rules, progression logic, and movement-audit rules
- `FEEDBACK_LOG.md`: rolling coaching history and change reasoning
- `public/program.json`: live workout program used by the app
- `public/program-csv/`: CSV drop folder for review input

## CSV Review Workflow

When a new CSV log is added to `public/program-csv/`, the agent should:

1. Read the newest CSV file in `public/program-csv/`.
2. Prompt the user with one short question only: `Anything new to body, schedule, or energy since last review?`
3. Accept a short natural-language reply. Do not ask a long checklist unless the user explicitly wants one.
4. Compare the CSV against the current live program in `public/program.json`.
5. Read `.agents/BODY_CONTEXT.md` for physical constraints and non-negotiables.
6. Read `.agents/COACHING_RULES.md` for coaching rules, movement-audit logic, and progression rules.
7. Read `FEEDBACK_LOG.md` for the most recent review date and recurring trends.
8. Use the most recent feedback entry date as the default lower bound for fresh log parsing.
9. Parse CSV entries from that date forward by default, unless the user asks for a longer historical review.
10. Use earlier feedback entries to identify repeated themes and trends over time.
11. Give coaching feedback before changing the program.
12. Avoid editing `public/program.json` until the user explicitly asks for changes.
13. After giving feedback, append a new dated entry to `FEEDBACK_LOG.md`.

## User Prompt Style

- Default assumption: the user will drop a CSV and then wait for the agent to prompt them.
- Ask only one lightweight follow-up question after the CSV drop.
- Preferred prompt: `Anything new to body, schedule, or energy since last review?`
- Accept short voice-style updates.
- Do not force structured answers.
- If the user says `nothing else`, continue with the review.
- If the user mentions one important new factor, treat that as sufficient context.

## Notes Storage

- Keep the root `AGENTS.md` lightweight and focused on the flow.
- Keep richer coach-facing context and rules in `.agents/`.
- Keep coaching history and reasoning in `FEEDBACK_LOG.md`.
- Keep `public/program.json` focused on the current live plan, not historical rationale.
