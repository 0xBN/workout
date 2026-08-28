# Workout App Agent Notes

## Purpose

This repo uses CSV workout logs dropped into `public/program-csv/` for coaching review before any program changes are made.

## File Map

- `AGENTS.md`: root workflow entrypoint
- `.agents/BODY_CONTEXT.md`: physical constraints and non-negotiables
- `.agents/COACHING_RULES.md`: coaching rules, progression logic, and movement-audit rules
- `.agents/CLIMBING_BLOCK_PLAN.md`: working draft for Mon/Fri climbing blocks (not live until written into `program.json`)
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
   - Acknowledge that the CSV is ready for review.
   - Ask if the user is ready for review.
   - If the last review was the same day or `0 days ago`, add a light confirmation check such as: `Last review was today. Are you sure you want another full review now?`
   - Then ask the one lightweight update question.
   - Keep this first prompt short.
   - Do not include adherence findings, effort findings, coaching takeaways, or review summaries yet.
   - Do not narrate the workflow.
   - Do not announce that files are being read or that context is being gathered.
   - Do not describe internal next steps before the user answers.
5. Accept a short natural-language reply. Do not ask a long checklist unless the user explicitly wants one.
6. Compare the CSV against the current live program in `public/program.json`.
7. Use the most recent feedback entry date as the default lower bound for fresh log parsing.
8. Parse CSV entries from that date forward by default, unless the user asks for a longer historical review.
9. Use earlier feedback entries to identify repeated themes and trends over time.
10. In the review, explicitly mention the last feedback date and the elapsed time since that review, for example: `Last review was 2026-05-25, about 2 weeks ago.`
11. Give coaching feedback before changing the program.
12. Ask clarifying questions only if they are needed to safely refine or change the prescription.
13. If no clarification is needed, proceed directly from feedback to recommendation.
14. When the user asks for progression or program changes, review the full fresh CSV slice, not just one highlighted exercise or one named day.
15. In that progression pass, scan for all meaningful candidates:
   - lifts or exercises with repeated low RPE that likely need load increases
   - lifts or exercises with repeated high RPE or incomplete work that may need load decreases
   - recurring skipped items, missed days, or partial completions that point to a compliance problem
   - sessions or blocks whose structure is creating unnecessary cognitive load
16. Prefer one coherent progression/compliance pass over piecemeal edits when the user is asking for a broader adjustment.
17. Do not claim that the program was updated unless the actual file changes were made in `public/program.json`.
18. Avoid editing `public/program.json` until the user explicitly asks for changes.
19. After giving feedback, append a new dated entry to `FEEDBACK_LOG.md`.

## User Prompt Style

- Default assumption: the user will drop a CSV and then wait for the agent to prompt them.
- Surface the last review date and elapsed time immediately after the CSV drop.
- Acknowledge that the CSV is ready for review.
- Ask if the user is ready for review.
- If the last review was today, ask for a quick confirmation before doing another full review.
- Ask only one lightweight follow-up question after that.
- Preferred prompt shape: `Last review was YYYY-MM-DD, about X days/weeks ago. Ready for review? Anything new to body, schedule, or energy since last review?`
- Same-day variant: `Last review was today. Are you sure you want another full review now? If so, anything new to body, schedule, or energy since the last review?`
- Keep the first post-drop response to a short acknowledgment and question only.
- Do not front-load the review summary before the user answers.
- Do not narrate internal workflow or file-reading steps to the user.
- Do not announce that context has been gathered.
- Accept short voice-style updates.
- Do not force structured answers.
- If the user says `nothing else`, continue with the review.
- If the user mentions one important new factor, treat that as sufficient context.
- Before changing the prescription, ask clarifying questions only when the feedback or data is genuinely ambiguous.

## Notes Storage

- Keep the root `AGENTS.md` lightweight and focused on the flow.
- Keep richer coach-facing context and rules in `.agents/`.
- Keep coaching history and reasoning in `FEEDBACK_LOG.md`.
- Keep `public/program.json` focused on the current live plan, not historical rationale.
