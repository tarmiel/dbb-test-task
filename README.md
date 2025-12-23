# Forms Dashboard (DBB - Test task)

Mini-app for managing forms with role-based access, validation, SSR/SSG, and REST API.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Test Users:**

- Any email + "Admin" role → full CRUD access
- Any email + "Individual" role → read-only access

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Zustand (auth/toasts)

## What's Implemented

### Authentication & Authorization

- Cookie-based auth (no NextAuth) — simple role stored in cookie
- Middleware protects `/forms/*` routes; admin-only for `/forms/new` and `/forms/[id]`
- Zustand store syncs auth state client-side

### Forms CRUD

- **List** (`/forms`): SSR fetch, sortable by date, filterable by status
- **Create/Edit** (`/forms/new`, `/forms/[id]`): Admin-only, validated forms
- **Delete**: Confirmation dialog, admin-only

### API Routes

| Method | Endpoint         | Auth  |
| ------ | ---------------- | ----- |
| GET    | `/api/forms`     | -     |
| GET    | `/api/forms/:id` | -     |
| POST   | `/api/forms`     | Admin |
| PUT    | `/api/forms/:id` | Admin |
| DELETE | `/api/forms/:id` | Admin |

### Landing Page (`/`)

- SSG with hero section, next/image optimization
- SEO: OpenGraph + Twitter Card metadata

## Implementation Decisions

### Project structure

Feature/domain based architecture, but in a simplified way, avoiding unnecessary abstraction like api-client or excessive destructuring of logic defining most of the related data closer. Mostly followed by bulletproof-react pattern

Followed bulletproof-react pattern:

```
src/
├── app/           # Routes only (thin)
├── components/    # Shared UI primitives
├── features/      # feature/domain based modules (auth, forms)
│   └── forms/
│       ├── api/
│       ├── components/
│       ├── schemas/
│       └── data/
│── stores/        # Global stores
│── types/         # shared types used across the application
└── utils/         # shared utility functions
```

### UI

I prefer to use ready-made headless UI libraries for the best accessibility and customization. I would have preferred to use shadcn, but in this case, I decided not to complicate things. Nevertheless, the reused components were implemented by drawing inspiration from or copying shadcn components.

### Data layer

Components never access formsStore directly; all data goes through Route Handlers via HTTP.

This is the most common and stable approach I’ve used in practice. It mirrors real setups with a clear frontend–API boundary with external backend and keeps the architecture predictable. With this model, switching to a real backend later is more straightforward.

### File-Based forms Storage

Requirement allowed in-memory or JSON file. Started with in-memory singelton, but chose JSON file (`src/data/forms.json`) because:

- Data persists across server restarts during development
- Easy to inspect/reset data manually
- Seed data loads automatically if file is empty

## Screenshots

> screenshots here

## Lighthouse Score

> desktop Lighthouse score here (target: Performance ≥ 90)
