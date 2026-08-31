# workout

Brian’s training program app + coaching playbook.

- **Live program:** `public/program.json` (what the app runs)
- **Live log:** Google Sheet tab `log` (app writes here; agents fetch for coaching — see `AGENTS.md`)
- **Coaching doctrine:** `AGENTS.md` + `.agents/` + `FEEDBACK_LOG.md`

Related (separate repos — don’t merge):

- [`interval-timer`](https://github.com/0xBN/interval-timer) — URL-driven timer that runs hangboard / interval flows in real life  
- [`life-ops`](https://github.com/0xBN/life-ops) — personal/work ops playbook (points here; doesn’t own the program)

## Dev

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

React + Vite. PWA bits under `public/` (`manifest.webmanifest`, `sw.js`).  
Sheet ID is hardcoded in `src/App.jsx` (`SHEET_ID`) — same spreadsheet agents pull for review.

## Coaching (agents)

On review asks: fetch the shared **`log`** sheet, then follow **`AGENTS.md`** (prompt first; don’t edit `program.json` until Brian asks).  
`public/program-csv/` is legacy manual exports only.
