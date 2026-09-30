# AgroClima Memory

## Current State
- **Fases 1 a 5:** concluídas.
- **Fase 1 (preparação):** bootstrap Next.js + TS + Tailwind + shadcn.
- **Fase 2 (localização):** busca de cidade, geolocalização, última localidade em `localStorage`.
- **Fase 3 (providers):** Open-Meteo + WeatherAPI.com em paralelo, normalização, alinhamento por data,
  cache em memória (~30 min), resposta parcial. Chave WeatherAPI válida e testada ao vivo.
- **Fase 4 (cálculos + testes):** `src/lib/weather/compare.ts` (revisado, correto) + 30 testes Vitest
  passando (`npm test`). Fix da dev nos campos diários da WeatherAPI validado ao vivo
  (`mintemp_c`, `maxtemp_c`, `avghumidity`, `totalprecip_mm`, `daily_chance_of_rain`, `maxwind_kph`).
- **Fase 5 (interface comparativa):** concluída nesta sessão:
  - `src/components/layout/app-navbar.tsx` (sticky, logo Leaf, links Início/Comparar, aria-current)
  - `src/components/layout/app-footer.tsx` (fontes + disclaimer)
  - `src/components/location/search-card.tsx` (busca + geo + local selecionada, compartilhado)
  - `src/components/comparacao/forecast-comparison-chart.tsx` (Recharts 3, linhas OM contínuas /
    WA tracejadas, máx grossa + mín fina, tooltip pt-BR, nulls respeitados)
  - `page.tsx` (hero emerald + 3 destaques + busca col lateral + atalho p/ /comparar)
  - `comparar/page.tsx` (bandeau + CompararClient + explicação de concordância + footer)
  - `comparison-view.tsx` e `comparar-client.tsx` atualizados (SearchCard, gráfico entre resumo e cards)
- `npm run lint` ✅ · `npm run build` ✅ · `npm test` 30/30 ✅ · páginas 200 ✅
- Supabase (esboço da dev, Fase 6): `supabase/schema.sql` (RLS) + `src/lib/supabase/history.ts`
  (PostgREST, sem lib). `saveForecastSnapshots` AINDA NÃO chamado pela rota /api/forecast.

## Important Files
- `PROJECT.md` — especificação (fonte da verdade). `README.md` — Status por fase atual.
- `src/lib/weather/compare.ts` + `src/types/comparison.ts` — cálculos.
- `tests/weather-calculations.test.ts` + `vitest.config.mts` — testes (alias `@/`).
- `src/components/layout/*` — navbar/footer (nova identidade: emerald-600/teal + slate, fonte Geist).
- `src/components/location/search-card.tsx` — busca compartilhada nas 2 páginas.
- `src/components/comparacao/forecast-comparison-chart.tsx` — gráfico Recharts.
- `src/app/api/forecast/route.ts` — cache Map+TTL 30 min; 502 falha total; 200 parcial.
- `src/lib/weather/providers/*` — providers; `src/lib/env.ts`, `src/lib/http.ts`.
- `src/lib/supabase/history.ts` + `supabase/schema.sql` — a ligar na Fase 6.

## Environment Notes
- macOS arm64, Node 20.11.0 (projeto declara 24.19.x; npm só avisa).
- Ferramenta `create_new_file` falha intermitentemente ("contents argument is required") →
  criar arquivos via `cat > arquivo << 'EOF'` no terminal.
- `edit_existing_file`/`single_find_and_replace` às vezes "funcionam" mas não aplicam (glitch);
  SEMPRE conferir o arquivo (sed/grep) após editar e, se mudou o conteúdo além do esperado,
  re-aplicar. O buffer do editor do usuário + Ctrl+Z também sobrescreveu arquivos antes —
  pedir para fechar/reverter o arquivo no editor antes de editar.
- Dev server: `npm run dev` em background, log `/tmp/agroclima-dev.log`; parar com `pkill -f "next dev"`.
- Git: branch `feature/comparacao-concordancia` com tracking do origin.

## Decisions
- Fonte 2 = WeatherAPI.com (usuário trocou da OpenWeatherMap, onde a conta errada havia sido criada).
- Identidade visual Fase 5: verde emerald/teal + slate, cards brancos com borda leve, cantos 1.5rem,
  navbar sticky com blur, badge de página ativa em emerald.
- Gráfico: temperatura min/máx (a métrica com série mais contínua p/ 3 dias); 4 linhas
  (2 fontes × máx/mín) em vez de áreas para manter legível no mobile.
- Recharts 3.10.1; tooltip/legend customizados via `formatter`; `connectNulls=false`
  (ausência nunca é zero).
- Busca extraída em `SearchCard` para as duas páginas usarem o mesmo componente.

## Validation History
- Build passou após ajustar tipagem do `Tooltip.formatter` (Recharts 3: value/dataKey podem ser undefined).
- `GET /api/forecast` (Campinas): 2 fontes ok, 3 dias cada, prob. de chuva presente.
- HTML das páginas confirmado: navbar nas duas, hero, SearchCard, estados vazios.
- 30/30 testes continuam passando.

## Next Steps
1. Commit da Fase 5 (navbar, footer, search-card, gráfico, páginas, recharts, README).
2. Fase 6: ligar `saveForecastSnapshots` em `/api/forecast` (após a resposta, try/catch não bloqueante),
   criar `GET /api/history?lat&lon&limit` e página `/historico` + link na navbar.
   Lembrete: rodar `supabase/schema.sql` no SQL Editor do Supabase (RLS já habilitado no script).
3. Fase 7: PWA (`manifest.ts`, ícones em `public/icons`, service worker) + deploy Vercel.
4. Fase 8: screenshots + documentação final (decisões, limitações, roteiro de demo).

## Resume Rule
- Para continuar em outra máquina: ler `PROJECT.md` e depois este arquivo.
