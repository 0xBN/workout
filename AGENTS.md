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

1. Read this workflow file fully before acting.
2. Read `.agents/COACHING_RULES.md`, `.agents/BODY_CONTEXT.md`, and `FEEDBACK_LOG.md` before prompting the user.
3. Read the newest CSV file in `public/program-csv/`.
4. Prompt the user immediately with the last review jog plus the review check-in.
   - Include the exact last feedback date.
   - Include the elapsed time since that review.
   - Ask if the user is ready for review.
   - Then ask the one lightweight update question.
5. Accept a short natural-language reply. Do not ask a long checklist unless the user explicitly wants one.
6. Compare the CSV against the current live program in `public/program.json`.
7. Use the most recent feedback entry date as the default lower bound for fresh log parsing.
8. Parse CSV entries from that date forward by default, unless the user asks for a longer historical review.
9. Use earlier feedback entries to identify repeated themes and trends over time.
10. In the review, explicitly mention the last feedback date and the elapsed time since that review, for example: `Last review was 2026-05-25, about 2 weeks ago.`
11. Give coaching feedback before changing the program.
12. Avoid editing `public/program.json` until the user explicitly asks for changes.
13. After giving feedback, append a new dated entry to `FEEDBACK_LOG.md`.

## User Prompt Style

- Default assumption: the user will drop a CSV and then wait for the agent to prompt them.
- Surface the last review date and elapsed time immediately after the CSV drop.
- Ask if the user is ready for review.
- Ask only one lightweight follow-up question after that.
- Preferred prompt shape: `Last review was YYYY-MM-DD, about X days/weeks ago. Ready for review? Anything new to body, schedule, or energy since last review?`
- Accept short voice-style updates.
- Do not force structured answers.
- If the user says `nothing else`, continue with the review.
- If the user mentions one important new factor, treat that as sufficient context.

## Notes Storage

- Keep the root `AGENTS.md` lightweight and focused on the flow.
- Keep richer coach-facing context and rules in `.agents/`.
- Keep coaching history and reasoning in `FEEDBACK_LOG.md`.
- Keep `public/program.json` focused on the current live plan, not historical rationale.
