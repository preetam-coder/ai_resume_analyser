create table if not exists public.app_users (
    id uuid primary key default gen_random_uuid(),
    username text not null,
    email text not null,
    password_hash text not null,
    created_at timestamptz not null default now()
);

create unique index if not exists app_users_username_lower_key on public.app_users (lower(username));
create unique index if not exists app_users_email_lower_key on public.app_users (lower(email));

create table if not exists public.blacklisted_tokens (
    id uuid primary key default gen_random_uuid(),
    token text not null unique,
    created_at timestamptz not null default now()
);

create table if not exists public.interview_reports (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.app_users(id) on delete cascade,
    resume text,
    self_description text,
    job_description text not null,
    match_score numeric check (match_score between 0 and 100),
    technical_questions jsonb not null default '[]'::jsonb,
    behavioral_questions jsonb not null default '[]'::jsonb,
    skill_gaps jsonb not null default '[]'::jsonb,
    preparation_plan jsonb not null default '[]'::jsonb,
    title text not null,
    created_at timestamptz not null default now()
);

create index if not exists interview_reports_user_created_at_idx
    on public.interview_reports (user_id, created_at desc);

alter table public.app_users enable row level security;
alter table public.blacklisted_tokens enable row level security;
alter table public.interview_reports enable row level security;

revoke all on public.app_users, public.blacklisted_tokens, public.interview_reports from anon, authenticated;
grant usage on schema public to service_role;
grant all privileges on public.app_users, public.blacklisted_tokens, public.interview_reports to service_role;
