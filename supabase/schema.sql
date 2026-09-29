-- Estrutura do banco do AgroClima (PROJECT.md, seção 10).
-- Executar uma vez no Supabase: menu SQL Editor > New query > colar > Run.

create table if not exists public.locations (
  id bigint generated always as identity primary key,
  name text not null,
  state text,
  country text not null,
  latitude double precision not null,
  longitude double precision not null,
  created_at timestamptz not null default now(),
  unique (latitude, longitude)
);

create table if not exists public.forecast_snapshots (
  id bigint generated always as identity primary key,
  location_id bigint not null references public.locations(id) on delete cascade,
  source text not null check (source in ('open-meteo', 'weather-api')),
  forecast_date date not null,
  collected_at timestamptz not null default now(),
  temperature_min_c double precision,
  temperature_max_c double precision,
  humidity_percent double precision,
  precipitation_mm double precision,
  precipitation_probability_percent double precision,
  wind_speed_max_kmh double precision,
  raw_data jsonb
);

create index if not exists forecast_snapshots_lookup_idx
  on public.forecast_snapshots (location_id, forecast_date, collected_at desc);

-- O acesso é feito somente pelo servidor da aplicação (chave de serviço).
-- Com RLS ativado e sem políticas públicas, o navegador não consegue ler nem gravar.
alter table public.locations enable row level security;
alter table public.forecast_snapshots enable row level security;
