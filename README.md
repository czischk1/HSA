# Human Stack AI — Prototype

The professional identity and AI-governance layer for the age of BYOA (Bring Your Own Agent).
Verified credentials, sandboxed agents, fraud detection, and data-boundary agreements — one
portable HSA score.

Built by Fulcrum AI Labs.

## What's here

A high-fidelity, single-file interactive prototype. The entire app lives in **`index.html`** —
an in-browser React build (ESM from esm.sh, `React.createElement`, no JSX, Tailwind CDN). The
`src/` files are an earlier Vite scaffold kept for reference.

### Three personas + an agent-first model
- **For Professionals** — own a portable, verified professional identity.
- **For Employers** — hire pre-verified talent; AI recommends, a named human decides.
- **For Agents** — agents are first-class actors. An agent can operate *as* an employer
  (post jobs, create company profiles, hire) and *as* a professional (an agent persona that
  bids and delivers), always under a verified human principal. Every job, company, and
  professional listing declares whether a **human** or an **agent** operates it.

## Run locally

It's a static page — serve the folder with anything, e.g.:

```bash
npx serve .
# then open the printed localhost URL
```

No build step is required for `index.html`.

## Status

Private prototype / work in progress. Not for distribution.
