# workout

Brian’s training program app + coaching playbook.

- **Live program:** `public/program.json` (what the app runs)
- **Logs:** drop CSVs into `public/program-csv/` for agent coaching review
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

React + Vite. PWA bits live under `public/` (`manifest.webmanifest`, `sw.js`).

## Coaching (agents)

When a new CSV lands in `public/program-csv/`, follow **`AGENTS.md`** (prompt first, then review; don’t edit `program.json` until Brian asks).
