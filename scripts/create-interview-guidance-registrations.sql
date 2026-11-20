-- Backs the site-wide "UPPCS 2026 – Interview Guidance Programme" registration
-- popup (components/interview-guidance/registration-popup.tsx) and its server
-- action (lib/actions/interview-guidance.ts). Run this manually against the
-- Supabase project — it is not applied automatically.

create table if not exists interview_guidance_registrations (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  mobile_no text not null,
  roll_no text,
  medium text not null check (medium in ('Hindi', 'English')),
  interview_preference text not null check (interview_preference in ('Online', 'Offline')),
  daf_pdf_url text,
  daf_pdf_public_id text,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'completed')),
  created_at timestamptz not null default now()
);

alter table interview_guidance_registrations enable row level security;

create policy "Public can submit interview guidance registrations"
  on interview_guidance_registrations for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated staff can view interview guidance registrations"
  on interview_guidance_registrations for select
  to authenticated
  using (true);

create policy "Authenticated staff can update interview guidance registrations"
  on interview_guidance_registrations for update
  to authenticated
  using (true);
