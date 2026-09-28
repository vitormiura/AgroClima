import type { AlignedForecastDay, DailyForecast, WeatherSource } from "@/types/forecast";
import { WEATHER_SOURCE_IDS } from "@/lib/weather/providers";

/** Normaliza uma data para a chave YYYY-MM-DD (parte da data local). */
export function normalizeDateKey(value: string): string {
  return value.slice(0, 10);
}

/**
 * Alinha os arrays de previsão das fontes pela data local.
 *
 * Datas presentes em apenas uma fonte aparecem com a outra ausente;
 * a comparação efetiva entre fontes (Fase 4) usa apenas datas
 * presentes nas duas.
 */
export function alignForecastDays(
  forecastsBySource: Partial<Record<WeatherSource, DailyForecast[]>>
): AlignedForecastDay[] {
  const byDate = new Map<string, AlignedForecastDay>();

  for (const sourceId of WEATHER_SOURCE_IDS) {
    const days = forecastsBySource[sourceId];
    if (!days) continue;

    for (const day of days) {
      const key = normalizeDateKey(day.date);
      if (!key) continue;

      const existing = byDate.get(key) ?? { date: key, bySource: {} };
      existing.bySource[sourceId] = day;
      byDate.set(key, existing);
    }
  }

  return Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));
}
