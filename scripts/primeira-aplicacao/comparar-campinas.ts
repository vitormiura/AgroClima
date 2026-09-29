// Primeira aplicação do protótipo — MODO DE DEMONSTRAÇÃO.
// Usa as respostas reais salvas das APIs (Campinas-SP, consultas de 28/09/2026 às 20h29 e 20h33)
// e aplica as mesmas regras de comparação usadas pela página /comparar (src/lib/weather/compare.ts).
// Executar na raiz do projeto: npx tsx scripts/primeira-aplicacao/comparar-campinas.ts

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { compareDay } from "@/lib/weather/compare";
import type { AgreementLevel, MetricKey } from "@/types/comparison";
import type { DailyForecast } from "@/types/forecast";

const dir = join(process.cwd(), "scripts", "primeira-aplicacao");
const readJson = (file: string) => JSON.parse(readFileSync(join(dir, file), "utf-8"));

// Conversão das respostas salvas para o modelo interno DailyForecast.
const om = readJson("openmeteo_campinas.json").daily;
const openMeteo: DailyForecast[] = om.time.map((date: string, i: number) => ({
  source: "open-meteo",
  date,
  temperatureMinC: om.temperature_2m_min[i],
  temperatureMaxC: om.temperature_2m_max[i],
  humidityPercent: om.relative_humidity_2m_mean[i],
  precipitationMm: om.precipitation_sum[i],
  precipitationProbabilityPercent: om.precipitation_probability_max[i],
  windSpeedMaxKmh: om.wind_speed_10m_max[i],
}));

const weatherApi: DailyForecast[] = readJson("weatherapi_campinas.json").forecast.forecastday.map(
  (d: { date: string; day: Record<string, number> }) => ({
    source: "weather-api",
    date: d.date,
    temperatureMinC: d.day.mintemp_c,
    temperatureMaxC: d.day.maxtemp_c,
    humidityPercent: d.day.avghumidity,
    precipitationMm: d.day.totalprecip_mm,
    precipitationProbabilityPercent: d.day.daily_chance_of_rain,
    windSpeedMaxKmh: d.day.maxwind_kph,
  }),
);

const LABELS: Record<MetricKey, string> = {
  temperatureMinC: "Temperatura mínima (°C)",
  temperatureMaxC: "Temperatura máxima (°C)",
  humidityPercent: "Umidade relativa (%)",
  precipitationMm: "Precipitação (mm)",
  precipitationProbabilityPercent: "Prob. de chuva (%)",
  windSpeedMaxKmh: "Vento máximo (km/h)",
};
const AGREEMENT_PT: Record<AgreementLevel, string> = {
  high: "Alta",
  medium: "Média",
  low: "Baixa",
  unavailable: "Indisponível",
};
const fmt = (value: number | null, suffix = "") =>
  value === null ? "—" : value.toFixed(1).replace(".", ",") + suffix;

for (const dayA of openMeteo) {
  const dayB = weatherApi.find((d) => d.date === dayA.date);
  if (!dayB) continue; // compara apenas datas presentes nas duas fontes
  const day = compareDay(dayA.date, dayA, dayB);
  console.log(`\n${day.date} — concordância geral: ${AGREEMENT_PT[day.overallAgreement]}`);
  console.table(
    Object.entries(day.metrics).map(([key, m]) => ({
      Variável: LABELS[key as MetricKey],
      "Open-Meteo": fmt(m.sourceA),
      WeatherAPI: fmt(m.sourceB),
      Consolidado: fmt(m.consolidated),
      Diferença: fmt(m.absoluteDifference),
      Divergência: fmt(m.percentageDivergence, "%"),
      Concordância: AGREEMENT_PT[m.agreement],
    })),
  );
}
