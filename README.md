# AI Resume Analyser

AI-assisted interview and resume preparation app. The frontend is in `Frontend/` and the API is in `Backend/`.

## Setup

1. Configure `Backend/.env` using `Backend/.env.example`. Keep API keys and the Supabase secret out of Git.
2. Apply `Backend/supabase/schema.sql` to the Supabase project.
3. Install and start the API: `cd Backend`, `npm ci`, then `npm run dev`.
4. In another terminal, install and start the frontend: `cd Frontend`, `npm ci`, then `npm run dev`.

The API uses Groq for AI generation and Supabase Postgres for application data.
