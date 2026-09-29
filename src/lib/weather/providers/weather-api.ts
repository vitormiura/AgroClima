import { getServerEnv } from "@/lib/env";
import { fetchWithTimeout } from "@/lib/http";
import type { DailyForecast } from "@/types/forecast";
import { FORECAST_DAYS, PROVIDER_TIMEOUT_MS } from "@/lib/weather/constants";

const WEATHER_API_FORECAST_URL = "https://api.weatherapi.com/v1/forecast.json";

/** Erro específico para a chave ausente: a UI exibe mensagem amigável. */
export class WeatherApiKeyMissingError extends Error {
  constructor() {
    super("WEATHER_API_KEY não configurada no servidor.");
    this.name = "WeatherApiKeyMissingError";
  }
}

interface WeatherApiCondition {
  text?: string;
  icon?: string;
  code?: number;
}

interface WeatherApiDayResponse {
  date?: string;
  day?: {
    mintemp_c?: number;
    maxtemp_c?: number;
    avghumidity?: number;
    totalprecip_mm?: number;
    daily_chance_of_rain?: number;
    maxwind_kph?: number;
    condition?: WeatherApiCondition;
  };
}

interface WeatherApiResponse {
  error?: { code?: number; message?: string };
  forecast?: { forecastday?: WeatherApiDayResponse[] };
}

function toNumberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/**
 * Consulta a WeatherAPI.com (unidades métricas) por coordenadas.
 * A chave existe apenas no servidor e nunca é logada.
 *
 * Campos diários conforme a documentação (forecastday[].day): mintemp_c, maxtemp_c,
 * avghumidity, totalprecip_mm, daily_chance_of_rain e maxwind_kph.
 */
export async function fetchWeatherApiForecast(latitude: number, longitude: number): Promise<DailyForecast[]> {
  const { weatherApiKey } = getServerEnv();
  if (!weatherApiKey) {
    throw new WeatherApiKeyMissingError();
  }

  const params = new URLSearchParams({
    key: weatherApiKey,
    q: `${latitude},${longitude}`,
    days: String(FORECAST_DAYS),
    aqi: "no",
    alerts: "no",
  });

  const response = await fetchWithTimeout(`${WEATHER_API_FORECAST_URL}?${params.toString()}`, {
    headers: { Accept: "application/json" },
    timeoutMs: PROVIDER_TIMEOUT_MS,
  });

  const data = (await response.json().catch(() => null)) as WeatherApiResponse | null;

  if (!response.ok || !data) {
    // Para erros 4xx/5xx com corpo legível, usa a mensagem da API (sem segredos).
    throw new Error(data?.error?.message ?? `WeatherAPI respondeu ${response.status}`);
  }

  if (data.error) {
    throw new Error(data.error.message ?? "Erro retornado pela WeatherAPI.");
  }

  const days: DailyForecast[] = [];

  for (const entry of data.forecast?.forecastday ?? []) {
    if (!entry.date) continue;
    const condition = entry.day?.condition;
    days.push({
      source: "weather-api",
      date: entry.date,
      temperatureMinC: toNumberOrNull(entry.day?.mintemp_c),
      temperatureMaxC: toNumberOrNull(entry.day?.maxtemp_c),
      humidityPercent: toNumberOrNull(entry.day?.avghumidity),
      precipitationMm: toNumberOrNull(entry.day?.totalprecip_mm),
      precipitationProbabilityPercent: toNumberOrNull(entry.day?.daily_chance_of_rain),
      windSpeedMaxKmh: toNumberOrNull(entry.day?.maxwind_kph),
      conditionCode: condition?.code != null ? String(condition.code) : null,
      conditionLabel: condition?.text ?? null,
    });
  }

  if (days.length === 0) {
    throw new Error("WeatherAPI não retornou dias de previsão.");
  }

  return days;
}
