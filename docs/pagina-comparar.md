# Página /comparar — comparação e concordância entre fontes (Fase 4)

Acrescenta ao projeto as regras de consolidação, divergência e concordância (PROJECT.md, seção 9)
e a página `localhost:3000/comparar`. Reaproveita o que já existe no projeto: a rota `/api/forecast`,
os tipos de `src/types/forecast.ts`, a busca (`LocationSearch`), a geolocalização (`GeolocationButton`)
e o `location-storage`. **Todos os arquivos abaixo são novos; nenhum arquivo existente é alterado.**

| Arquivo | Função |
|---|---|
| `src/types/comparison.ts` | Tipos `MetricComparison`, `DailyComparison`, `AgreementLevel` |
| `src/lib/weather/compare.ts` | Regras de cálculo (funções puras) e `compareAlignedDays()` |
| `src/components/comparacao/agreement-badge.tsx` | Selo de concordância (ícone + texto) |
| `src/components/comparacao/comparison-view.tsx` | Abas dos dias, resumo e cards por variável |
| `src/components/comparacao/comparar-client.tsx` | Busca + chamada a `/api/forecast` + comparação |
| `src/app/comparar/page.tsx` | Página `/comparar` |
| `src/lib/supabase/history.ts` | Gravação/leitura do histórico via REST do Supabase (pronto, ainda não ligado) |
| `supabase/schema.sql` | Criação das tabelas `locations` e `forecast_snapshots` |
| `scripts/primeira-aplicacao/` | Script e respostas reais salvas da primeira aplicação (28/09/2026) |

## Correções necessárias no código existente (arquivo `correcoes-weatherapi-gitignore.patch`)

1. **`src/lib/weather/providers/weather-api.ts`** lê campos que não existem na resposta da
   WeatherAPI.com. Os nomes corretos (documentação e resposta real salva em
   `scripts/primeira-aplicacao/weatherapi_campinas.json`) são `mintemp_c`, `maxtemp_c`,
   `avghumidity`, `totalprecip_mm`, `daily_chance_of_rain` e `maxwind_kph`. O plano gratuito
   **fornece** `daily_chance_of_rain`. Sem a correção, a WeatherAPI aparece com "—" em quase tudo.
2. **`.gitignore`** passou a ignorar só `.env`, então `.env.local` (com a chave) pode ir para o
   GitHub. Correção: `.env*` e `!.env.example`.

Aplicar na raiz do projeto: `git apply correcoes-weatherapi-gitignore.patch`

## Como rodar

1. `.env.local` na raiz com `WEATHER_API_KEY=...` (reiniciar o `npm run dev` após editar).
2. `npm run dev` e abrir `http://localhost:3000/comparar`.

Script da primeira aplicação: `npx tsx scripts/primeira-aplicacao/comparar-campinas.ts`

## Ligar o histórico (Supabase)

1. Criar projeto em supabase.com e executar `supabase/schema.sql` no **SQL Editor**.
2. Preencher `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` no `.env.local`.
3. Em `src/app/api/forecast/route.ts`, depois de montar a resposta com sucesso, chamar:

```ts
import { saveForecastSnapshots } from "@/lib/supabase/history";
// ...
await saveForecastSnapshots(
  { name: response.location.name, country: "Brasil", latitude: lat, longitude: lon },
  response.days.flatMap((day) => Object.values(day.bySource).filter(Boolean) as DailyForecast[]),
);
```

A função nunca derruba a previsão: se o banco falhar ou não estiver configurado, apenas não grava.
