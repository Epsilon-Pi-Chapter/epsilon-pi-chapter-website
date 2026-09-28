create extension if not exists pgcrypto;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date date not null,
  start_time time,
  end_time time,
  location text,
  description text,
  category text not null default 'event',
  flyer_path text,
  recap text,
  recap_flyer_path text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (event_date, title)
);

create table if not exists public.ice_cold_tuesdays (
  id uuid primary key default gen_random_uuid(),
  entry_date date not null unique,
  title text not null default 'Ice Cold Tuesday',
  caption text,
  instagram_url text,
  thumbnail_path text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  title text,
  caption text,
  category text not null default 'Other',
  event_date date,
  event_id uuid references public.events(id) on delete set null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists gallery_images_storage_path_key on public.gallery_images(storage_path);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at before update on public.events for each row execute function public.set_updated_at();
drop trigger if exists ict_set_updated_at on public.ice_cold_tuesdays;
create trigger ict_set_updated_at before update on public.ice_cold_tuesdays for each row execute function public.set_updated_at();
drop trigger if exists gallery_set_updated_at on public.gallery_images;
create trigger gallery_set_updated_at before update on public.gallery_images for each row execute function public.set_updated_at();

alter table public.events enable row level security;
alter table public.ice_cold_tuesdays enable row level security;
alter table public.gallery_images enable row level security;

insert into storage.buckets (id, name, public)
values ('chapter-media', 'chapter-media', true)
on conflict (id) do update set public = true;

insert into public.events (event_date, category, title, start_time, location, description)
values
  ('2026-04-25', 'event', 'Brotherhood Cookout', '13:00', 'Student Center Lawn', 'An end-of-month fellowship gathering with music, food, and chapter updates for brothers and invited guests.'),
  ('2026-04-28', 'service', 'Study Hall and Mentorship Night', '18:30', 'Brown Hall, Room 214', 'An academic accountability night with upperclassmen support, planning time, and mentorship check-ins.'),
  ('2026-05-03', 'service', 'Community Cleanup', '09:00', 'Downtown Norfolk', 'A service day focused on neighborhood cleanup, visibility, and local impact.'),
  ('2026-05-10', 'event', 'Mother''s Day Appreciation Brunch', '11:30', 'Campus Dining Hall', 'A celebratory brunch honoring the women who continue to support the chapter and its mission.'),
  ('2026-05-18', 'event', 'Leadership Transition Meeting', '19:00', 'Chapter Meeting Room', 'Officer handoff, summer planning, and committee alignment for the next chapter term.')
on conflict (event_date, title) do nothing;

insert into public.ice_cold_tuesdays (entry_date, title, caption, instagram_url)
values ('2026-04-28', 'Ice Cold Tuesday', E'The greatest lessons in college don''t come from a syllabus, they come from life.\n\nBro. Cain & Bro. Greaux speak on what they''ve learned beyond the classroom as they prepare to graduate. From discipline to navigating real-world pressure.', 'https://www.instagram.com/reel/DXrwc-ckSv0/')
on conflict (entry_date) do nothing;
