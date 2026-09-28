import type { WeatherSource } from "@/types/forecast";

/** Quantidade de dias de previsão comparados pelo MVP. */
export const FORECAST_DAYS = 3;

/** Timeout padrão para consultas às APIs externas (ms). */
export const PROVIDER_TIMEOUT_MS = 10_000;

/** Duração do cache em memória das previsões (ms). */
export const FORECAST_CACHE_TTL_MS = 30 * 60 * 1000;

/** Rótulos exibíveis para cada fonte. */
export const SOURCE_LABELS: Record<WeatherSource, string> = {
  "open-meteo": "Open-Meteo",
  "weather-api": "WeatherAPI.com",
};
