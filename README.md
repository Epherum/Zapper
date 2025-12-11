# Zapper

Team workspace for projects, tasks, and delivery health built with Next.js 14, Prisma, and NextAuth. Authenticated users land on a personalized dashboard, drill into projects, manage tasks in board/list views, and collaborate through subtasks and comments.

## Key features
- Email/Google auth via NextAuth with credential hashing and session handling.
- Project hub with create/edit/archive, membership assignments, and manager selection.
- Task board (drag-and-drop) and list views with statuses, priorities, due dates, and assignees.
- Task detail pages with subtasks, threaded comments, and inline status/priority controls.
- React Query–powered data fetching and optimistic UI for task/project CRUD.
- Animated, responsive UI using Framer Motion, Sass modules, and custom components.

## Tech stack
- Next.js 14 + TypeScript
- Prisma ORM on PostgreSQL
- NextAuth (Credentials + Google)
- React Query, Formik, Axios
- React Beautiful DnD, Framer Motion, Chart.js
- Sass modules

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` with the values below.
3. Apply database schema and seed demo data:
   ```bash
   npx prisma migrate dev
   npm run db:seed
   ```
4. Run the app:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000.

### Environment variables
```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DB"  # optional shadow URL
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-32-hex"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

The seed script creates an admin account you can use to sign in:
- Email: `admin@example.com`
- Password: `Password123!`

### Useful scripts
- `npm run dev` – start Next.js in development.
- `npm run build` / `npm start` – production build and serve.
- `npm run lint` – run ESLint.
- `npm run prisma:migrate` – run Prisma migrations in dev.
- `npm run prisma:studio` – open Prisma Studio.
- `npm run db:seed` – seed the database with demo data.

## Project structure
- `src/pages` – Next.js pages (dashboard, projects, task details, and API routes).
- `src/components` – UI building blocks (boards, lists, overlays, charts, navigation).
- `src/contexts` – React context for task/project modal state.
- `src/lib` – Prisma client, API helpers, auth/validation utilities.
- `prisma/` – Prisma schema and seed script.

## Notes
- API routes under `src/pages/api` back the UI with Prisma-backed CRUD for projects, tasks, comments, roles, and users.
- Drag-and-drop moves update task status via the API; list view supports inline edit/delete.
- Charts and dashboard metrics are driven by cached queries for the signed-in user.
