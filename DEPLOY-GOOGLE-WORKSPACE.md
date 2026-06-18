# Hosting Human Stack AI in Google Workspace (fulcrumlabsinc.com)

Serve `index.html` as a **Google Apps Script web app**, gated so that **only people
signed in to a `@fulcrumlabsinc.com` account** can open it. Your Google login *is* the
password — no separate auth to manage.

Two methods below. The app is a single ~1 MB `index.html`, so **Method B (clasp CLI) is
recommended** — pasting 1 MB into the web editor is slow and error-prone.

The app uses no `localStorage`, cookies, `window.top/parent`, or pop-ups, so it runs in the
Apps Script sandbox **unchanged** — paste/push `index.html` exactly as-is.

---

## Method A — Manual (no tools, fine for quick tests)

1. Go to **https://script.google.com** signed in as your **fulcrumlabsinc.com** account →
   **New project**.
2. **File → New → HTML file**, name it `index` (Apps Script saves it as `index.html`).
   Open your local `index.html`, select-all, and paste its full contents in. *(Large file —
   give the editor a moment.)*
3. Open `Code.gs` (the default script file) and replace its contents with the `Code.gs` in
   this repo.
4. **Deploy → New deployment** → gear icon → **Web app**. Set:
   - **Description:** `Human Stack AI`
   - **Execute as:** `Me`
   - **Who has access:** **Anyone within Fulcrum Labs Inc** ← the domain gate
5. **Deploy**, authorize when prompted, and copy the **Web app URL**
   (`https://script.google.com/a/macros/fulcrumlabsinc.com/s/.../exec`).
6. Open it yourself to confirm it renders, then share that URL with colleagues. People
   outside the domain hit a Google sign-in wall and are blocked.

---

## Method B — clasp CLI (recommended for this 1 MB file)

[clasp](https://github.com/google/clasp) pushes local files straight into an Apps Script
project. This repo is already set up for it: `Code.gs`, `appsscript.json`, and `.claspignore`
(which makes clasp push **only** those two files + `index.html`, ignoring the Vite configs).

```bash
# one-time
npm install -g @google/clasp
clasp login          # opens a browser; sign in as your fulcrumlabsinc.com account

# from this repo's root (C:/Users/Admin/projects/humanstackai-prototype)
clasp create --type webapp --title "Human Stack AI"   # creates .clasp.json (gitignored)
clasp push           # uploads index.html + Code.gs + appsscript.json

# deploy as a web app
clasp deploy --description "Human Stack AI"
```

`appsscript.json` already sets `webapp.access = "DOMAIN"` (domain-gated) and
`executeAs = "USER_DEPLOYING"`. After `clasp deploy`, get the web-app URL with
`clasp deployments`, or open the project (`clasp open`) → **Deploy → Manage deployments** to
copy the URL and confirm access is **Anyone within Fulcrum Labs Inc**.

### Updating after the first deploy — one command

Use the included **`sync-and-deploy.sh`** (run from Git Bash). It copies your latest
`Documents/humanstackai-prototype/index.html` into this repo, commits + pushes to GitHub,
runs `clasp push`, and bumps the live web app:

```bash
./sync-and-deploy.sh "optional commit message"
```

To make it bump the **same** production `/exec` URL each time, save your deployment id once:

```bash
clasp deployments                 # copy the deployment id
echo <DEPLOYMENT_ID> > .deploy-id # gitignored; the script reads it
```

Without `.deploy-id`, the script still syncs + `clasp push`es (the `/dev` test URL reflects
it immediately); it just won't bump the production deployment.

---

## Notes & gotchas

- **Domain gate vs. link sharing:** `DOMAIN` access = anyone in your Workspace org who has
  the link. There's no per-person allow-list in plain Apps Script; for that, use Cloudflare
  Access or restrict by sharing the URL narrowly.
- **First-load check:** the app pulls React/Tailwind from CDNs at runtime. This works inside
  the Apps Script sandbox, but do a quick smoke test on first deploy (open the URL, click
  through For Professionals / For Employers / For Agents).
- **Embedding in a Google Site:** because `doGet` sets `XFrameOptionsMode.ALLOWALL`, you can
  later drop the web-app URL into a Google Sites **Embed** block to give it a friendlier
  internal address.
- **Custom domain (e.g. `hsa.fulcrumlabsinc.com`):** Apps Script web apps can't use a custom
  domain. If you want that, host on Firebase Hosting / Cloud Storage instead (public by
  default; gate with Identity-Aware Proxy).
