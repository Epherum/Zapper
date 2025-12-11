# Zapper — resume-friendly overview

### Elevator pitch
Zapper is a Next.js 14 + TypeScript workspace for shipping projects with less chaos. It pairs a polished dashboard with project, task, and comment workflows powered by Prisma and PostgreSQL. NextAuth (credentials + Google) keeps access simple while React Query and Framer Motion keep the UI responsive and lively.

### Product flow
- **Auth + onboarding:** Credentials are hashed through NextAuth; a quick-start admin account from the seed script unlocks the full dashboard.
- **Dashboard:** Personalized stats, charts, and recent items so contributors see what needs attention first.
- **Projects:** Create, edit, archive, assign managers/members, and jump into recent tasks. Project cards summarize dates, status, and workload.
- **Tasks:** Toggle between board (drag-and-drop) and list views. Each task carries status, priority, due dates, assignees, subtasks, and threaded comments.
- **Task detail:** Inline status/priority controls, subtask creation, comment feed, and metadata (timestamps, assignees, project links).

### Technical highlights
- **Stack:** Next.js 14, TypeScript, Prisma ORM on PostgreSQL, NextAuth (Google + credentials), React Query, Formik, Axios, React Beautiful DnD, Framer Motion, Chart.js, Sass modules.
- **Backend:** API routes under `src/pages/api` implement CRUD for users, roles, projects, tasks, subtasks, and comments, shaping Prisma records for the client.
- **Data model:** Profiles, organizations, projects, project members, tasks (with parent/child subtasks), and task comments (see `prisma/schema.prisma`).
- **State & UX:** React Query caches per-user/project data; drag-and-drop updates task status server-side; modals and overlays reuse shared context for consistent UX.
- **Tooling:** Prisma migrations and seed script (`npm run db:seed`) provision a demo org, project, tasks, and an admin login.

### What to highlight on a resume
- Built an authenticated product-delivery workspace with Prisma-backed API routes, typed React Query hooks, and animated UI patterns.
- Implemented project/task CRUD, board/list toggles, drag-and-drop status updates, subtasks, and comment threads to mirror real PM workflows.
- Secured access with NextAuth (Google + credentials) and bcrypt hashing; seeded environments for instant demos.
- Structured the data model for organizations, memberships, and task hierarchies to support multi-project teams.

### Future opportunities
- Enforce role-based access on API routes, add optimistic updates for comments/status changes, and wire analytics to real task history.
