# Workout App Agent Notes

## Purpose

Coaching review for Brian’s training program. The **live log** is a shared Google Sheet the app writes to. Agents **fetch that sheet** for review — do not wait for a manual CSV drop.

## Log source (canonical)

| | |
|--|--|
| Spreadsheet ID | `10ApiDRmdFru5giLImN_FYTBvAUUopjU0RpvTPHPvmrg` |
| Tab | `log` |
| App constant | `SHEET_ID` in `src/App.jsx` (same ID) |
| CSV export URL | `https://docs.google.com/spreadsheets/d/10ApiDRmdFru5giLImN_FYTBvAUUopjU0RpvTPHPvmrg/gviz/tq?tqx=out:csv&sheet=log` |

Fetch with curl / WebFetch / scripts (sheet is shared for agent pull). Parse rows like a CSV.  
`public/program-csv/` is **legacy** (old manual exports) — prefer the live sheet; only use a dropped file if Brian explicitly points at one.

## File Map

- `AGENTS.md`: root workflow entrypoint
- `.agents/BODY_CONTEXT.md`: physical constraints and non-negotiables
- `.agents/COACHING_RULES.md`: coaching rules, progression logic, and movement-audit rules
- `.agents/CLIMBING_BLOCK_PLAN.md`: working draft for Mon/Fri climbing blocks (not live until written into `program.json`)
- `FEEDBACK_LOG.md`: rolling coaching history and change reasoning
- `public/program.json`: live workout program used by the app
- `public/program-csv/`: legacy CSV drops only

## Review workflow

When Brian asks for a coaching review / `rollup` on training / drops a “review my log” style ask:

1. Read this workflow fully before acting.
2. Read `.agents/COACHING_RULES.md`, `.agents/BODY_CONTEXT.md`, and `FEEDBACK_LOG.md` before prompting the user.
3. **Fetch the live `log` sheet** (URL above). Do not narrate the fetch.
4. Prompt immediately with the last review jog plus the review check-in.
   - Exact last feedback date + elapsed time since that review.
   - Acknowledge the log is ready for review (from the live sheet).
   - Ask if ready for review.
   - If last review was today / `0 days ago`: light confirm — `Last review was today. Are you sure you want another full review now?`
   - Then one lightweight update question.
   - Keep this first prompt short.
   - No adherence/effort findings, takeaways, or summaries yet.
   - Do not narrate workflow or “gathering context.”
5. Accept a short natural-language reply. No long checklist unless Brian wants one.
6. Compare the fresh log slice against `public/program.json`.
7. Default lower bound for “fresh” rows: most recent `FEEDBACK_LOG.md` entry date (unless Brian asks for longer history).
8. Use earlier feedback entries for repeated themes over time.
9. In the review, mention last feedback date + elapsed time (e.g. `Last review was 2026-05-25, about 2 weeks ago.`).
10. Coaching feedback before any program change.
11. Clarifying questions only when needed to safely change the prescription.
12. If clear, go feedback → recommendation.
13. On progression / program-change asks: scan the full fresh log slice, not one exercise or day.
14. Progression pass candidates: repeated low RPE → load up; high RPE / incomplete → load down; skips / missed days → compliance; structural cognitive load.
15. Prefer one coherent progression/compliance pass over piecemeal edits.
16. Do not claim `program.json` was updated unless the file changed.
17. Do not edit `program.json` until Brian explicitly asks.
18. After feedback, append a dated entry to `FEEDBACK_LOG.md` (note: live sheet pull).

## User prompt style

- Trigger: Brian asks for review (or similar) — agent fetches the sheet, then prompts.
- Preferred: `Last review was YYYY-MM-DD, about X days/weeks ago. Ready for review? Anything new to body, schedule, or energy since last review?`
- Same-day: `Last review was today. Are you sure you want another full review now? If so, anything new to body, schedule, or energy since the last review?`
- Short first message only; no front-loaded summary.
- Accept short voice-style updates; `nothing else` → continue.
- Clarify only when data is genuinely ambiguous.

## Notes storage

- Keep this file focused on the flow.
- Richer coach rules in `.agents/`.
- History in `FEEDBACK_LOG.md`.
- `public/program.json` = current live plan only.
