# QuickHire Backend

REST API for the QuickHire job portal — authentication, jobs, companies, applications, and user profiles, with role-based access (`admin`, `recruiter`, `candidate`).

## Tech Stack

- Node.js + Express 5
- TypeScript
- MongoDB + Mongoose
- JWT auth (access + refresh tokens), bcrypt password hashing
- Zod + express-validator for validation

## Getting Started

Prerequisites: Node.js and a running MongoDB instance.

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, demo accounts, etc.
npm run seed           # seed demo users, companies, jobs, applications
npm run dev            # http://localhost:5000
```

Scripts:

- `npm run dev` — run with ts-node-dev (auto-reload)
- `npm run build` — compile to `dist/`
- `npm start` — run compiled output
- `npm run seed` — seed database
- `npm run seed:fresh` — drop and re-seed

## Environment Variables

See `.env.example`:

| Variable                    | Description                                  |
| --------------------------- | -------------------------------------------- |
| `PORT`                      | Server port (default `5000`)                 |
| `DATABASE_URL`              | MongoDB connection string                    |
| `JWT_SECRET` / `JWT_EXPIRES_IN` | Access token secret & lifetime (`1d`)    |
| `JWT_REFRESH_SECRET` / `JWT_REFRESH_EXPIRES_IN` | Refresh token secret & lifetime (`7d`) |
| `BCRYPT_SALT_ROUNDS`        | bcrypt rounds (default `12`)                 |
| `DEMO_ADMIN_*` / `DEMO_RECRUITER_*` / `DEMO_CANDIDATE_*` | Demo accounts created by `npm run seed` |

## API

All routes are mounted under `/api` (e.g. `/api/auth/login`, `/api/jobs`). Protected routes require `Authorization: Bearer <token>`; role checks are enforced per route.

## Demo Accounts

Created by `npm run seed` from the `DEMO_*` variables:

| Role      | Email                    | Password      |
| --------- | ------------------------ | ------------- |
| Admin     | `admin@quickhire.app`    | `password123` |
| Recruiter | `recruiter@quickhire.app`| `password123` |
| Candidate | `candidate@quickhire.app`| `password123` |
