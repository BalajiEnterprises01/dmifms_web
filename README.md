# DM23 IFMS Push

Corporate marketing website for an **Integrated Facility Management Services** company,
with a built-in admin dashboard for editing site content. Content is stored as JSON
files (no database) and served via the Next.js App Router.

## Tech Stack
- **Next.js 16** (App Router) + **React 19** + React Compiler
- **TypeScript 5** (strict), path alias `@/* → src/*`
- **Tailwind CSS v4** + CSS variable theme tokens
- **shadcn** on **Base UI** (`@base-ui/react`), `lucide-react` icons
- **framer-motion** / `lottie-react` / `react-countup` animation
- **react-hook-form** + **Zod v4** validation
- **sonner** + **react-hot-toast** toasts, **next-themes**
- **nodemailer** (contact email — not yet wired), `sharp` image optimization

## Quick Start
```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

### Scripts
| Script              | Action            |
| ------------------- | ----------------- |
| `npm run dev`       | Dev server        |
| `npm run build`     | Production build  |
| `npm run start`     | Serve build       |
| `npm run lint`      | ESLint            |
| `npx tsc --noEmit`  | Typecheck         |

No test runner or DB migrations exist (this app has no database).

## Environment
| Variable | Purpose |
| -------- | ------- |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Admin login credentials |
| `ADMIN_SECRET` | Seed for the admin session cookie token |
| `NEXT_PUBLIC_SITE_EMAIL` / `NEXT_PUBLIC_SITE_PHONE` | Public contact details |
| `NEXT_PUBLIC_LINKEDIN_URL` / `NEXT_PUBLIC_X_URL` / `NEXT_PUBLIC_FACEBOOK_URL` | Social links |

`.env.example` currently lists only the `NEXT_PUBLIC_*` vars — set the `ADMIN_*`
vars too. Never commit real secrets. Fallback values in code are dev-only.

## How Content Works
There is **no database**. Each section of the site is a JSON file in `data/`
(`hero.json`, `services.json`, `industries.json`, …). Public pages read them via
`src/lib/jsonCMS.ts` (`readJSON`); the admin dashboard writes them back through the
API (`writeJSON`). To add a new editable section, create `data/<name>.json` and add
`<name>` to `ALLOWED_SECTIONS` in `src/app/api/content/[section]/route.ts`.

## Project Structure
```
src/app/(site)      Public marketing pages
src/app/(admin)     Admin dashboard (login + content editors)
src/app/api         Route handlers (the only place data is written)
src/components       sections / ui (shadcn) / admin / layout / common
src/lib              jsonCMS, auth, site-config, utils, animations
src/types            Shared content types
data/*.json          Content store (single source of truth)
public/images        Uploaded + static images
agent_docs/          Deep domain docs (00–21 + HOW-TO-WORK)
```

## API Endpoints
| Method | Route | Auth | Purpose |
| ------ | ----- | ---- | ------- |
| POST | `/api/auth` | — | Admin login (sets cookie) |
| POST | `/api/auth/logout` | — | Clear admin cookie |
| GET / PUT | `/api/content/[section]` | PUT: admin | Read / update a content section |
| GET / POST | `/api/services` | POST: admin | List / create services |
| GET / PUT / DELETE | `/api/services/[id]` | write: admin | Manage one service |
| POST | `/api/contact` | — | Contact form submit (currently logs only) |
| POST | `/api/upload` | admin | Image upload → `public/images/<folder>` |

Admin-guarded routes require a valid `dm23_admin_token` cookie
(`isAdminAuthenticated()` in `src/lib/auth.ts`).

## Documentation
| Topic                          | Location                            |
| ------------------------------ | ----------------------------------- |
| Start here                     | `agent_docs/00-start-here.md`       |
| Architecture & system design   | `agent_docs/01-architecture.md`     |
| Security & OWASP               | `agent_docs/02-security.md`         |
| API design & conventions       | `agent_docs/03-api-design.md`       |
| Database & caching             | `agent_docs/04-database.md`         |
| Performance & scaling          | `agent_docs/05-performance.md`      |
| Auth & RBAC                    | `agent_docs/06-auth.md`             |
| Environment & secrets          | `agent_docs/07-environment.md`      |
| Build & deployment             | `agent_docs/08-build-deploy.md`     |
| Code conventions               | `agent_docs/09-code-conventions.md` |
| Testing strategy               | `agent_docs/10-testing.md`          |
| Observability & monitoring     | `agent_docs/11-observability.md`    |
| Incident response              | `agent_docs/12-incident-response.md`|
| API versioning                 | `agent_docs/13-api-versioning.md`   |
| Frontend architecture          | `agent_docs/14-frontend-architecture.md` |
| Frontend UI/UX                 | `agent_docs/15-frontend-ui-ux.md`   |
| Token optimization             | `agent_docs/21-token-optimization.md` |
| How to work in this repo       | `agent_docs/HOW-TO-WORK.md`         |
| Architecture decisions (ADRs)  | `docs/adr/`                         |
| Security policy                | `SECURITY.md`                       |

## Security
This is a low-trust admin (base64 cookie token, no JWT/RBAC) suited to a single-editor
marketing site — review before exposing publicly. To report a vulnerability, see [SECURITY.md](SECURITY.md).
