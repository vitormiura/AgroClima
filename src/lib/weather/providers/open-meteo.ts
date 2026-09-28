import { fetchWithTimeout } from "@/lib/http";
import type { DailyForecast } from "@/types/forecast";
import { FORECAST_DAYS, PROVIDER_TIMEOUT_MS } from "@/lib/weather/constants";

const OPEN_METEO_FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

interface OpenMeteoDailyArrays {
  time?: string[];
  temperature_2m_min?: (number | null)[];
  temperature_2m_max?: (number | null)[];
  relative_humidity_2m_mean?: (number | null)[];
  precipitation_sum?: (number | null)[];
  precipitation_probability_max?: (number | null)[];
  wind_speed_10m_max?: (number | null)[];
  weather_code?: (number | null)[];
}

interface OpenMeteoForecastResponse {
  daily?: OpenMeteoDailyArrays | null;
  error?: boolean;
  reason?: string;
}

/** Rótulos curtos (pt-BR) para os WMO weather codes mais comuns. */
const WMO_CONDITION_LABELS: Record<number, string> = {
  0: "Céu limpo",
  1: "Predominantemente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Nevoeiro",
  48: "Nevoeiro com geada",
  51: "Garoa fraca",
  53: "Garoa moderada",
  55: "Garoa intensa",
  56: "Garoa congelante fraca",
  57: "Garoa congelante intensa",
  61: "Chuva fraca",
  63: "Chuva moderada",
  65: "Chuva forte",
  66: "Chuva congelante fraca",
  67: "Chuva congelante forte",
  71: "Neve fraca",
  73: "Neve moderada",
  75: "Neve forte",
  77: "Grãos de neve",
  80: "Pancadas de chuva fracas",
  81: "Pancadas de chuva moderadas",
  82: "Pancadas de chuva fortes",
  85: "Pancadas de neve fracas",
  86: "Pancadas de neve fortes",
  95: "Trovoada",
  96: "Trovoada com granizo fraco",
  99: "Trovoada com granizo forte",
};

function toNumberOrNull(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/**
 * Consulta a Open-Meteo em unidades métricas, timezone=auto e
 * retorna 3 dias já no contrato interno DailyForecast.
 */
export async function fetchOpenMeteoForecast(latitude: number, longitude: number): Promise<DailyForecast[]> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    daily: [
      "temperature_2m_min",
      "temperature_2m_max",
      "relative_humidity_2m_mean",
      "precipitation_sum",
      "precipitation_probability_max",
      "wind_speed_10m_max",
      "weather_code",
    ].join(","),
    timezone: "auto",
    forecast_days: String(FORECAST_DAYS),
  });

  const response = await fetchWithTimeout(`${OPEN_METEO_FORECAST_URL}?${params.toString()}`, {
    headers: { Accept: "application/json" },
    timeoutMs: PROVIDER_TIMEOUT_MS,
  });

  if (!response.ok) {
    throw new Error(`Open-Meteo respondeu ${response.status}`);
  }

  const data = (await response.json()) as OpenMeteoForecastResponse;
  const daily = data.daily;

  if (data.error || !daily?.time) {
    throw new Error(data.reason ?? "Open-Meteo não retornou dados diários.");
  }

  return daily.time.map((date, index) => {
    const code = daily.weather_code?.[index];
    return {
      source: "open-meteo" as const,
      date,
      temperatureMinC: toNumberOrNull(daily.temperature_2m_min?.[index]),
      temperatureMaxC: toNumberOrNull(daily.temperature_2m_max?.[index]),
      humidityPercent: toNumberOrNull(daily.relative_humidity_2m_mean?.[index]),
      precipitationMm: toNumberOrNull(daily.precipitation_sum?.[index]),
      precipitationProbabilityPercent: toNumberOrNull(daily.precipitation_probability_max?.[index]),
      windSpeedMaxKmh: toNumberOrNull(daily.wind_speed_10m_max?.[index]),
      conditionCode: toNumberOrNull(code),
      conditionLabel: typeof code === "number" ? WMO_CONDITION_LABELS[code] ?? null : null,
    };
  });
}
