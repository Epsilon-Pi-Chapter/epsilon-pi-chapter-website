alter table public.events
  add column if not exists room_number text;
