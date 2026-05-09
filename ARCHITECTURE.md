# Personal CRM Architecture Document

## 1. Existing site audit

### Current Stack
| Component | Technology | Version |
|-----------|------------|---------|
| Frontend Framework | React (Create React App) | 18.3.1 |
| Styling | Tailwind CSS | 4.1.18 |
| Animation | Framer Motion | 12.23.26 |
| Icons | Lucide React | 0.562.0 |
| Build Tool | react-scripts | 5.0.1 |

### Hosting & Deployment
- **Hosting**: Vercel (configured via `vercel.json`)
- **Deploy method**: Auto-deploy from GitHub on push to `main`
- **GitHub repo**: `github.com/ferwakeup/my-react-site.git`
- **CI/CD**: None — no `.github/workflows` directory exists
- **Build command**: `npm run build`
- **Output directory**: `build/`

### Repository Structure
```
/Users/fernandomartin/Documents/My React Website /
├── .git/
├── .gitignore           # Ignores: build/, node_modules/
├── build/               # CRA production build output
├── node_modules/
├── package.json
├── package-lock.json
├── public/
│   ├── index.html       # Entry HTML with Google Analytics
│   ├── hero.png
│   ├── favicon.png
│   ├── logos/           # Corporate logos (Intel, Motorola, Nokia, etc.)
│   └── insight-images/  # Carousel images
├── src/
│   ├── index.js         # React entry point
│   ├── App.jsx          # Main component (634 lines, monolithic)
│   └── App.css          # Tailwind imports
└── vercel.json          # Vercel deployment config
```

### Key Observations
- **Single-page application**: No routing library, view state managed via React useState
- **No backend**: Purely static site, contact form likely uses external service
- **No monorepo setup**: Single project, single package.json
- **No subdomains configured**: Main site only at fernando-martin.me

---

## 2. Proposed CRM integration structure

### Architecture Decision: Separate Repository

**Recommendation: Create a new separate repository** (`personal-crm` or `crm.fernando-martin.me`)

**Rationale:**
1. The existing site is a static React SPA deployed to Vercel — no backend capability
2. The CRM requires a Node.js/Express backend with persistent storage
3. Different deployment targets: Vercel (main site) vs. local Mac Mini (CRM)
4. Clean separation of concerns — portfolio site vs. internal tool
5. Independent release cycles and versioning

### Technology Stack for CRM
| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | React + Vite | Modern, fast build tool as specified |
| Backend | Node.js + Express | As specified, REST API |
| Auth | Bearer token | As specified, simple for single-user + agent |
| Data | Flat JSON file | As specified, `/data/crm.json` |
| Process Manager | launchd | Native macOS, no additional tooling |

### API Consumers
1. **CRM Web UI** — React frontend at `crm.fernando-martin.me`
2. **OpenClaw Agent** — External agent running on same Mac Mini

---

## 3. File & directory layout (show the tree)

### Proposed directory structure on Mac Mini

```
/Users/fernandomartin/
├── Documents/
│   └── My React Website /     # Existing portfolio (unchanged)
│
├── Projects/                   # New directory for self-hosted projects
│   └── personal-crm/           # New CRM repository
│       ├── .git/
│       ├── .gitignore
│       ├── .env                # API_PORT, AUTH_TOKEN, DATA_PATH
│       ├── package.json        # Workspaces or separate packages
│       │
│       ├── frontend/           # React + Vite
│       │   ├── package.json
│       │   ├── vite.config.js
│       │   ├── index.html
│       │   └── src/
│       │       ├── main.jsx
│       │       ├── App.jsx
│       │       └── components/
│       │
│       ├── backend/            # Express API
│       │   ├── package.json
│       │   ├── server.js       # Entry point
│       │   ├── routes/
│       │   │   └── contacts.js
│       │   ├── middleware/
│       │   │   └── auth.js     # Bearer token validation
│       │   └── lib/
│       │       └── storage.js  # JSON file read/write
│       │
│       └── scripts/
│           └── install-launchd.sh
│
├── Library/
│   └── LaunchAgents/
│       └── me.fernando-martin.crm.plist  # launchd service definition
│
└── data/                       # Persistent data outside of repo
    └── crm.json                # Contact database
```

### Absolute paths summary
| Resource | Absolute Path |
|----------|---------------|
| CRM repo root | `/Users/fernandomartin/Projects/personal-crm/` |
| Backend entry | `/Users/fernandomartin/Projects/personal-crm/backend/server.js` |
| Frontend dist | `/Users/fernandomartin/Projects/personal-crm/frontend/dist/` |
| Data file | `/Users/fernandomartin/data/crm.json` |
| launchd plist | `~/Library/LaunchAgents/me.fernando-martin.crm.plist` |

---

## 4. Process management approach

### Recommendation: launchd (native macOS)

**Why launchd over pm2:**
- Native to macOS — no additional runtime dependency
- Automatic restart on crash
- Automatic start on login/boot
- Logs to system log or custom path
- Already familiar pattern on Mac (no pm2 currently installed)

### Proposed launchd plist

File: `~/Library/LaunchAgents/me.fernando-martin.crm.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>me.fernando-martin.crm</string>

    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>/Users/fernandomartin/Projects/personal-crm/backend/server.js</string>
    </array>

    <key>WorkingDirectory</key>
    <string>/Users/fernandomartin/Projects/personal-crm/backend</string>

    <key>EnvironmentVariables</key>
    <dict>
        <key>NODE_ENV</key>
        <string>production</string>
        <key>PORT</key>
        <string>3456</string>
        <key>DATA_PATH</key>
        <string>/Users/fernandomartin/data/crm.json</string>
    </dict>

    <key>RunAtLoad</key>
    <true/>

    <key>KeepAlive</key>
    <true/>

    <key>StandardOutPath</key>
    <string>/Users/fernandomartin/Library/Logs/crm-stdout.log</string>

    <key>StandardErrorPath</key>
    <string>/Users/fernandomartin/Library/Logs/crm-stderr.log</string>
</dict>
</plist>
```

### Service management commands
```bash
# Load and start
launchctl load ~/Library/LaunchAgents/me.fernando-martin.crm.plist

# Stop and unload
launchctl unload ~/Library/LaunchAgents/me.fernando-martin.crm.plist

# Check status
launchctl list | grep crm

# View logs
tail -f ~/Library/Logs/crm-stdout.log
tail -f ~/Library/Logs/crm-stderr.log
```

**Note:** The node path should be verified. Current node location:
```bash
which node  # Likely /opt/homebrew/bin/node on Apple Silicon
```

---

## 5. Cloudflare tunnel config change (show the diff)

### Current Status: UNKNOWN

**Finding:** `cloudflared` is NOT installed on this Mac Mini.

Checked locations:
- `~/.cloudflared/` — does not exist
- `/etc/cloudflared/` — does not exist
- `/opt/homebrew/etc/cloudflared/` — does not exist
- `which cloudflared` — not found

**Implication:** The Cloudflare tunnel is either:
1. Configured via Cloudflare Zero Trust dashboard (remotely managed tunnel)
2. Running on a different machine that proxies to this Mac Mini
3. Not yet set up

### Proposed config.yml addition (once cloudflared location is confirmed)

If using a local `config.yml`:

```yaml
# Existing tunnel configuration (assumed)
tunnel: <TUNNEL_UUID>
credentials-file: /path/to/credentials.json

ingress:
  # Existing: main site (if routed through tunnel)
  - hostname: fernando-martin.me
    service: https://my-react-site.vercel.app
    # Or if served locally:
    # service: http://localhost:3000

  # NEW: CRM subdomain
  - hostname: crm.fernando-martin.me
    service: http://localhost:3456

  # Catch-all (required)
  - service: http_status:404
```

### If using Cloudflare Dashboard (Zero Trust)

Add a new **Public Hostname** entry:
| Field | Value |
|-------|-------|
| Subdomain | `crm` |
| Domain | `fernando-martin.me` |
| Type | HTTP |
| URL | `localhost:3456` |

**Action required:** Fernando to confirm where/how the Cloudflare tunnel is configured.

---

## 6. Deploy pipeline extension (show the workflow addition)

### Current pipeline
The existing portfolio site has **no CI/CD pipeline** — it relies on:
1. Git push to GitHub
2. Vercel auto-detects push and builds/deploys

### Proposed CRM deployment approach

Since the CRM runs locally on the Mac Mini (not Vercel), a different approach is needed.

**Option A: Manual deploy script (Recommended for simplicity)**

File: `/Users/fernandomartin/Projects/personal-crm/scripts/deploy.sh`

```bash
#!/bin/bash
set -e

PROJECT_DIR="/Users/fernandomartin/Projects/personal-crm"
PLIST="$HOME/Library/LaunchAgents/me.fernando-martin.crm.plist"

echo "=== Deploying Personal CRM ==="

cd "$PROJECT_DIR"

# Pull latest
git pull origin main

# Install backend dependencies
cd backend
npm ci --production

# Build frontend
cd ../frontend
npm ci
npm run build

# Restart service
launchctl unload "$PLIST" 2>/dev/null || true
launchctl load "$PLIST"

echo "=== Deploy complete ==="
launchctl list | grep crm
```

**Option B: GitHub Actions with self-hosted runner (if automation desired later)**

File: `.github/workflows/deploy.yml`

```yaml
name: Deploy CRM

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: self-hosted  # Mac Mini as self-hosted runner

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24'

      - name: Install backend dependencies
        working-directory: ./backend
        run: npm ci --production

      - name: Build frontend
        working-directory: ./frontend
        run: |
          npm ci
          npm run build

      - name: Restart service
        run: |
          launchctl unload ~/Library/LaunchAgents/me.fernando-martin.crm.plist || true
          launchctl load ~/Library/LaunchAgents/me.fernando-martin.crm.plist
```

**Recommendation:** Start with Option A (manual script). Add GitHub Actions self-hosted runner only if frequent automated deploys become necessary.

---

## 7. Risks & conflicts

### Low Risk
| Risk | Impact | Mitigation |
|------|--------|------------|
| Port conflict | CRM won't start if 3456 is taken | Verified port 3456 is currently free |
| Node version mismatch | Potential runtime errors | Pin Node version in `.nvmrc` or engines field |

### Medium Risk
| Risk | Impact | Mitigation |
|------|--------|------------|
| Data loss (crm.json) | All contacts lost | Implement backup script; consider git-tracking data file in separate private repo |
| Service not starting on reboot | CRM unavailable | Test launchd KeepAlive; add monitoring/alerting |
| Bearer token exposure | Unauthorized API access | Store token in `.env` (gitignored); use strong random token |

### High Risk
| Risk | Impact | Mitigation |
|------|--------|------------|
| Cloudflare tunnel not configured | CRM inaccessible from internet | **Blocker** — Fernando must confirm tunnel setup before proceeding |
| Mac Mini offline/restarted | CRM down | Ensure launchd `RunAtLoad` is true; consider UPS for hardware |

### No Conflicts Detected
- The existing portfolio site on Vercel is **completely independent** — no shared code, no shared deployment
- Port 3456 does not conflict with any running services
- No existing data directories will be overwritten

---

## 8. Open questions for Fernando (max 3)

1. **Cloudflare tunnel configuration**: Where is the Cloudflare tunnel configured? Is it managed via the Zero Trust dashboard, a config file on another machine, or not yet set up? (This is a **blocker** for external access to `crm.fernando-martin.me`.)

2. **Node.js path**: The launchd plist needs the absolute path to Node. Is it `/opt/homebrew/bin/node` (Homebrew on Apple Silicon), `/usr/local/bin/node`, or managed via nvm/fnm? (Run `which node` to confirm.)

3. **Backup strategy for crm.json**: Do you want automatic backups of the CRM data file? Options include: (a) git-track in a private repo, (b) cron job copying to iCloud/Dropbox, (c) manual backups only.

---

Ready to proceed to Prompt 2: Backend.
