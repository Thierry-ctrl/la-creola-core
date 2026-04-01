# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS v4

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── la-creola/          # La Creola restaurant website (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## La Creola Website

### Brand Direction: "Golden Hour"
- **Primary:** Terracotta `#C4734F`
- **Secondary:** Deep Gold `#B8923A`
- **Accent:** Muted Teal `#3D7A7A`
- **Background:** Warm Cream `#FBF6F0`
- **Typography:** Cormorant Garamond (headlines) + Inter (body)
- **Feel:** Warm, sunset-inspired, quietly luxurious

### Pages
- **Homepage:** Hero with CTA, essentials strip, concept section, menu highlights, weekly events, gallery, chef story, social proof, footer with newsletter
- **Menu:** Full HTML menu organized by categories (Start Your Journey, From the Ocean, From the Land, Sweet Endings, The Bar) with RWF prices and dietary icons
- **Events:** Weekly recurring events (Thirsty Thursday, Friday BBQ, Saturday Live Cooking, Sunday Brunch)
- **Private Dining:** Space info (main dining, rooftop, pergola) + inquiry form
- **About:** Vedish's journey from Mauritius to Kigali
- **Reserve:** Reservation form with all fields
- **Contact:** Full contact info and directions

### Key Features
- Mobile-first responsive design
- WhatsApp floating button (wa.me/250793084995)
- EN/FR language toggle (visual)
- Sticky Reserve header button
- Smooth scroll animations (Framer Motion)
- Newsletter signup in footer

### API Endpoints
- `POST /api/reservations` - Submit reservation inquiry
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/inquiries` - Submit private event/catering inquiry
- `GET /api/healthz` - Health check

### Database Tables
- `reservations` - Reservation inquiries (name, email, phone, date, time, guests, occasion, notes)
- `newsletter_subscribers` - Newsletter subscriptions (email, firstName)
- `inquiries` - Private event/catering inquiries (name, email, phone, eventType, guestCount, preferredDate, message)

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — only emit `.d.ts` files during typecheck
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server with routes for health, reservations, newsletter, and inquiries.

### `artifacts/la-creola` (`@workspace/la-creola`)

La Creola restaurant website. React + Vite + Tailwind CSS with Cormorant Garamond + Inter typography. Uses generated React Query hooks for API calls.

### `lib/db` (`@workspace/db`)

Database layer with Drizzle ORM. Tables: reservations, newsletter_subscribers, inquiries.

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI 3.1 spec and Orval codegen config. Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from OpenAPI spec.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from OpenAPI spec.
