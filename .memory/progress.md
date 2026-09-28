# AgroClima Memory

## Current State
- **Fase 1 (preparação):** concluída.
- **Fase 2 (localização):** concluída — busca de cidade (debounce 300 ms, teclado, click-outside),
  geolocalização do navegador, última localidade em `localStorage`.
- **Fase 3 (providers):** concluída — Open-Meteo + WeatherAPI.com em paralelo via
  `Promise.allSettled`, normalização para `DailyForecast`, alinhamento por data local,
  cache em memória (~30 min) e resposta parcial quando uma fonte falha.
- `npm run lint` e `npm run build` passando.
- ⚠️ **Chave WeatherAPI inválida:** o `.env` tem `WEATHER_API_KEY` preenchida, mas a API
  responde `401 {"code":2006,"message":"API key is invalid."}`. A app funciona em modo
  parcial (só Open-Meteo) até o usuário corrigir a chave no `.env`.
- `zod` foi registrado no `package.json` (estava usado no code mas ausente).

## Important Files
- `PROJECT.md` — especificação principal (fonte da verdade).
- `README.md` — atualizado com status por fase, scripts, limitações (prob. de chuva do WeatherAPI).
- `src/app/page.tsx` — página principal (client component): busca + geolocalização + painel de previsão.
- `src/components/location/location-search.tsx` — busca com autocomplete, debounce, navegação por teclado.
- `src/components/location/geolocation-button.tsx` — Geolocation API com estados de erro em pt-BR.
- `src/lib/location-storage.ts` — persistência da última localidade em `localStorage` (validada com Zod).
- `src/lib/http.ts` — `fetchWithTimeout` (AbortSignal.timeout, 10 s por padrão).
- `src/lib/env.ts` — validação de env só no servidor; segredos nunca com `NEXT_PUBLIC_`.
- `src/lib/weather/constants.ts` — FORECAST_DAYS=3, timeout, TTL do cache, rótulos das fontes.
- `src/lib/weather/providers/open-meteo.ts` — daily com `relative_humidity_2m_mean`, `timezone=auto`, WMO codes → rótulos pt-BR.
- `src/lib/weather/providers/weather-api.ts` — `q=lat,lon&days=3`; `precipitationProbabilityPercent` sempre `null`
  (plano gratuito não fornece); erro `WeatherApiKeyMissingError` dedicado.
- `src/lib/weather/providers/index.ts` — registro `WEATHER_PROVIDERS`.
- `src/lib/weather/normalize.ts` — `alignForecastDays` (alinhamento por data YYYY-MM-DD).
- `src/schemas/forecast.ts` — Zod do `GET /api/forecast`.
- `src/types/forecast.ts` — `DailyForecast`, `WeatherSource`, `ForecastResponse`, `AlignedForecastDay`.
- `src/app/api/forecast/route.ts` — rota com cache em memória (Map + TTL 30 min),
  falha total → 502, parcial → 200 com `sourceStatus`.
- `src/app/api/locations/route.ts` — busca de cidade (Open-Meteo geocoding).
- `src/components/weather/forecast-panel.tsx` — chips de status por fonte, aviso de parcial
  (com mensagem da fonte), cards de 3 dias × 6 métricas × 2 fontes (OM/WA).

## Environment Notes
- Ambiente atual: macOS (Darwin arm64), Node 20.11.0 (o projeto declara Node 24.19.x;
  npm apenas avisa EBADENGINE e tudo funciona).
- A busca web e o acesso a `*.inmet.gov.br` estão bloqueados neste ambiente de sandbox
  (a decisão de usar INMET foi descartada a favor do WeatherAPI com chave do usuário).
- Dev server: `npm run dev` em background, log em `/tmp/agroclima-dev.log`.
  Para parar: `pkill -f "next dev"` (ou `lsof -ti:3000 | xargs kill`).

## Decisions
- WeatherAPI.com confirmada como fonte B (chave fornecida pelo usuário no `.env`).
- INMET descartada (seria por estação, sem geocodificação livre; o projeto manteve o plano original).
- Umidade diária da Open-Meteo: `relative_humidity_2m_mean` (disponível em daily, verificado ao vivo).
- WeatherAPI: `day.humidity` (média diária) comparada com a média diária da Open-Meteo —
  registrado como nota de compatibilidade (PROJECT.md §8.3).
- Probabilidade de chuva: WeatherAPI (free) não fornece → `null` (nunca zero); documentado no README.
- Rota `/api/forecast`: falha total → HTTP 502; falha parcial → 200 + `sourceStatus`
  (app não quebra). Cache em memória por localização com TTL de 30 min.
- `setState` em `useEffect` foi adiado para microtask por causa da regra
  `react-hooks/set-state-in-effect` (lint do React 19/Next 16).

## Validation History
- `npm run lint` passou (após corrigir set-state-in-effect).
- `npm run build` passou (rotas: `/` estática, `/api/forecast` e `/api/locations` dinâmicas).
- Teste manual no dev server:
  - `GET /api/locations?query=campinas` → 200, lista correta.
  - `GET /api/forecast?lat=-22.9056&lon=-47.0608&name=Campinas` → 200 parcial:
    open-meteo ok (3 dias completos), weather-api 401 (chave inválida) — comportamento
    de resposta parcial funcionando; 2ª chamada voltou `cached: true` em ~7 ms.
- Open-Meteo verificado ao vivo (curl) com todos os campos diários pedidos.

## Next Steps
1. **Ação do usuário:** corrigir a `WEATHER_API_KEY` no `.env` (API rejeita a atual:
   "API key is invalid."). Depois, retestar `/api/forecast` e conferir as 2 fontes.
2. Fase 4: cálculos (consolidate/compare) em `src/lib/weather/` + testes Vitest
   (`npm i -D vitest`, `tests/weather-calculations.test.ts`) — médias, diferença absoluta,
   divergência %, limites 10%/25%, concordância geral, alinhamento por data.
3. Estender `GET /api/forecast` para devolver a comparação consolidada (DailyComparison).
4. Fase 5: interface comparativa (cards, seletor de dia, gráficos Recharts).
5. Fase 6: Supabase (schema.sql, cliente server, snapshots, `/api/history`, página `/historico`).
6. Fase 7: PWA (manifest, ícones, service worker) + deploy Vercel.
7. Fase 8: documentação final (screenshots, decisões, limitações).

## Resume Rule
- Para continuar em outra máquina: ler `PROJECT.md` e depois este arquivo.
