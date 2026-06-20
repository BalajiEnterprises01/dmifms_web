# DM23 IFMS — Corporate Website + JSON-CMS Admin
# Stack: Next.js 16 (App Router) + React 19 + TypeScript (strict) + Tailwind v4
# Status: MVP / pre-production (no database — JSON-file content store)

---

## What This Is
Marketing/corporate site for an Integrated Facility Management Services company,
plus a self-built admin dashboard that edits site content. **There is no database.**
All content lives as JSON files in `data/` and is read/written through `src/lib/jsonCMS.ts`.

## Active Stack
- **Framework**: Next.js 16.2.1 App Router + React 19.2 + React Compiler (`reactCompiler: true`)
- **Language**: TypeScript 5, `strict: true`, path alias `@/*` → `src/*`
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) + CSS variables (theme tokens)
- **UI**: shadcn (`components.json`) on Base UI (`@base-ui/react`), `lucide-react` icons, `cva` + `clsx` + `tailwind-merge` (`cn()` in `lib/utils.ts`)
- **Animation**: framer-motion (helpers in `lib/animations.ts`), `lottie-react`, `react-countup`
- **Forms/validation**: react-hook-form + `@hookform/resolvers` + Zod v4
- **Toasts**: sonner + react-hot-toast
- **Theme**: next-themes
- **Email**: nodemailer (installed, NOT wired yet — see Known Gaps)
- **Images**: next/image + sharp; `remotePatterns` allows `images.unsplash.com`

## Commands
```
dev:        npm run dev        (next dev)
build:      npm run build      (next build)
start:      npm run start
lint:       npm run lint       (eslint)
typecheck:  npx tsc --noEmit   (no script defined; run manually)
```
No test runner and no migrations exist (no DB). Don't invent them.

## Project Map (App Router, route groups)
```
src/app/(site)/...        Public pages: about, services/[slug], industries, process,
                          staffing, waste-management, additional-services, contact, privacy, terms
src/app/(admin)/admin/... Admin dashboard (login + (dashboard)/<section> editors)
src/app/api/...           Route handlers — the ONLY place data is written
  api/auth, api/auth/logout          admin login/logout (cookie)
  api/content/[section]              GET/PUT a content section (whitelisted)
  api/services, api/services/[id]    services CRUD
  api/contact                        contact form submit
  api/upload                         image upload → public/images/<folder>
src/components/sections   Page sections (Hero, About, Services, Industries, ...)
src/components/ui         shadcn primitives (button, card, dialog, table, ...)
src/components/admin      Admin shell (Header, Sidebar, EditServiceModal)
src/components/layout|common
src/lib                   jsonCMS, auth, site-config, utils, animations
src/types/index.ts        Shared content types (HeroData, Service, ...)
data/*.json               Content store — single source of truth
agent_docs/               Deep domain docs (numbered 00–09)
```

## Layer Rules (NEVER BREAK)
```
Public page (server)  →  read content via lib/jsonCMS (readJSON)  →  data/*.json
Admin edit (client)   →  fetch /api/...  →  route handler  →  jsonCMS (writeJSON)
```
- Components never touch `fs` or `data/` directly — go through `lib/jsonCMS.ts`.
- Default to **Server Components**. Add `"use client"` only when you need state/effects/handlers.
- Business/data logic lives in `lib/` and route handlers, not in components.

## Non-Negotiable Rules
- **Zero `any`.** Add/extend types in `src/types/index.ts`. Validate ALL API inputs with Zod (see `api/contact`).
- **Every write route checks auth first:** `if (!(await isAdminAuthenticated())) → 401`. Applies to every mutating handler (PUT/POST/DELETE) — `api/content`, `api/services`, `api/upload`, etc.
- **Content only via jsonCMS** `readJSON`/`writeJSON` — never raw `fs` elsewhere.
- **Whitelist new sections:** adding a `data/<x>.json` editable via API means adding `<x>` to `ALLOWED_SECTIONS` in `api/content/[section]/route.ts`.
- **Secrets in env, never hardcoded.** Fallback secrets currently in code are dev-only and MUST be set in prod: `ADMIN_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_EMAIL/PHONE`, `NEXT_PUBLIC_LINKEDIN/X/FACEBOOK_URL` (see `lib/site-config.ts`).
- **CSS colors via CSS variables / Tailwind tokens only** — no hardcoded hex/rgb in components.
- **Animate `transform` + `opacity` only** — never layout properties.
- **Uploads:** keep the type allowlist + 5MB cap in `api/upload` when changing it.
- Async UI states: handle loading + error + success (forms use RHF + sonner).

## Known Gaps / Tech-Debt (fix deliberately, don't paper over)
- **Contact form does not send email** — `api/contact` only `console.log`s. nodemailer is installed but unwired.
- **Admin auth is weak:** token is `base64(ADMIN_SECRET)` in an httpOnly cookie — not JWT, no expiry check, no RBAC. Hardcoded fallback creds in `api/auth/route.ts`.
- **No tests, no typecheck script.**

## → For domain-specific guidance: read agent_docs/00-start-here.md
