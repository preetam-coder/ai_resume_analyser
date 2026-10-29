# Backend setup

The backend uses Groq for generation and Supabase Postgres for users, interview reports, and revoked JWTs.

1. Copy `.env.example` to `.env` and set `GROQ_API_KEY`, `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and `JWT_SECRET`.
2. Install dependencies with `npm ci`.
3. Start the API with `npm run dev` (port 3000).

Use Node.js 18 or newer for the built-in `fetch` used by the Supabase REST client.

The Supabase schema is in `supabase/schema.sql`. The `app_users`, `blacklisted_tokens`, and `interview_reports` tables have RLS enabled and are accessed by the backend with a server-side Supabase secret key. Do not put that key in the frontend or commit `.env`.
