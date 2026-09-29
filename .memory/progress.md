# AgroClima Memory

## Current State
- **Fase 1 (preparação):** concluída.
- **Fase 2 (localização):** concluída — busca de cidade (debounce 300 ms, teclado, click-outside),
  geolocalização do navegador, última localidade em `localStorage`.
- **Fase 3 (providers):** concluída — Open-Meteo + WeatherAPI.com em paralelo via
  `Promise.allSettled`, normalização para `DailyForecast`, alinhamento por data local,
  cache em memória (~30 min) e resposta parcial quando uma fonte falha.
  Chave WeatherAPI atendida e validada ao vivo (2 fontes ok, 3 dias cada).
- **Fase 4 (cálculos e testes):** concluída.
  - Cálculos por outra dev em `src/lib/weather/compare.ts` + `src/types/comparison.ts`
    (revisado: fórmulas e limites 10%/25% conferidos e corretos).
  - Fix dela no provider WeatherAPI: nomes reais dos campos diários (`mintemp_c`,
    `maxtemp_c`, `avghumidity`, `totalprecip_mm`, `daily_chance_of_rain`, `maxwind_kph`)
    — validado com resposta real da API (prob. de chuva voltou 6% em Campinas).
  - Testes: `npm i -D vitest@^3` + `vitest.config.mts` + `tests/weather-calculations.test.ts`
    (30 testes, todos passando; `npm test` no package.json).
- **Bônus da dev (já na branch):** página `/comparar` (seletor de 3 dias, cards com
  consolidado + badges de concordância, aviso de parcial) e Supabase em fase inicial
  (`supabase/schema.sql` com RLS + `src/lib/supabase/history.ts` via PostgREST, sem lib).
  O `saveForecastSnapshots` ainda NÃO está chamado pela rota /api/forecast.
- `npm run lint`, `npm run build` e `npm test` passando.

## Important Files
- `PROJECT.md` — especificação principal (fonte da verdade).
- `README.md` — Status por fase atualizado (Fases 1-4 concluídas).
- `src/lib/weather/compare.ts` — funções puras de consolidação/divergência/concordância.
- `src/types/comparison.ts` — `AgreementLevel`, `MetricComparison`, `DailyComparison`, `MetricKey`.
- `tests/weather-calculations.test.ts` — 30 testes das regras da seção 9/16 do PROJECT.md.
- `vitest.config.mts` — alias `@/` + include `tests/**/*.test.ts`.
- `src/app/comparar/page.tsx` + `src/components/comparacao/*` — página de comparação.
- `src/lib/supabase/history.ts` + `supabase/schema.sql` — persistência (a ligar na rota).
- `src/app/api/forecast/route.ts` — rota com cache em memória (Map + TTL 30 min),
  falha total → 502, parcial → 200 com `sourceStatus`.
- `src/lib/weather/providers/weather-api.ts` — campos diários corrigidos pela dev.
- `src/lib/env.ts` — validação de env só no servidor; segredos nunca com `NEXT_PUBLIC_`.
- `src/lib/http.ts` — `fetchWithTimeout`.
- `src/lib/location-storage.ts` — última localidade em `localStorage` (Zod).
- `src/components/location/location-search.tsx` / `geolocation-button.tsx` — busca + geo.
- `src/components/weather/forecast-panel.tsx` — painel da página inicial.

## Environment Notes
- Ambiente atual: macOS (Darwin arm64), Node 20.11.0 (projeto declara 24.19.x; npm só avisa).
- A busca web e `*.inmet.gov.br` estão bloqueados no sandbox (INMET foi descartada;
  a fonte 2 final é WeatherAPI.com).
- Atenção: a ferramenta `create_new_file` falhava intermitentemente nesta máquina
  ("contents argument is required"); usar `cat > arquivo << 'EOF'` como alternativa.
- Dev server: `npm run dev` em background, log em `/tmp/agroclima-dev.log`.
  Parar: `pkill -f "next dev"`.
- Git: branch `feature/comparacao-concordancia` tem tracking de `origin` configurado
  (antes o `git pull` falhava por falta de upstream).

## Decisions
- WeatherAPI.com é a fonte 2 (o usuário primeiro criou conta errada na OpenWeatherMap;
  depois criou na WeatherAPI.com e a chave ativou e funciona).
- Probabilidade de chuva do WeatherAPI: usar `daily_chance_of_rain` (existe na resposta
  real do plano atual); quando o plano não fornecer → null (nunca zero).
- `compareAlignedDays` fixa Open-Meteo = fonte A e WeatherAPI = fonte B.
- Valores de divergência/concordância armazenados SEM arredondar; arredondar só na UI.
- Vitest v3 (compatível com Node 20 desta máquina e com Node 24 do projeto).
- Supabase via PostgREST (fetch) em vez de `@supabase/supabase-js` (decisão da dev;
  aceita — menos dependências, só servidor).
- `compare.ts` usa `sourceA?.[key] ?? null` — DailyForecast nunca tem undefined nos campos, ok.

## Validation History
- `npm run lint` passou (após corrigir set-state-in-effect na página inicial).
- `npm run build` passou (rotas: `/`, `/comparar`, `/api/forecast`, `/api/locations`).
- `npm test`: 30/30 passando (um teste meu inicial falhou por erro meu na expectativa
  da concordância geral: média 2,2 → "medium", não "low"; corrigi o teste, não o código).
- Ao vivo: `GET /api/forecast?lat=-22.9056&lon=-47.0608&name=Campinas` → 2 fontes ok
  (open-meteo 3 dias, weather-api 3 dias), prob. de chuva presente nas duas.

## Next Steps
1. Commitar: README, package.json/lock, tests/, vitest.config.mts (Fase 4 completa).
2. Fase 5: gráficos comparativos (Recharts) na página /comparar + polir cards/seletor.
3. Fase 6: ligar `saveForecastSnapshots` na rota /api/forecast (após consulta, sem
   bloquear resposta), criar `GET /api/history` e página `/historico`.
   Obs.: executar `supabase/schema.sql` no SQL Editor do Supabase e conferir RLS.
4. Fase 7: PWA (manifest.ts, ícones, service worker) + deploy Vercel.
5. Fase 8: documentação final (screenshots, decisões, limitações).

## Resume Rule
- Para continuar em outra máquina: ler `PROJECT.md` e depois este arquivo.
