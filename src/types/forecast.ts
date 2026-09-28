export type WeatherSource = "open-meteo" | "weather-api";

export interface DailyForecast {
  source: WeatherSource;
  /** Data local da previsão no formato YYYY-MM-DD. */
  date: string;
  temperatureMinC: number | null;
  temperatureMaxC: number | null;
  humidityPercent: number | null;
  precipitationMm: number | null;
  precipitationProbabilityPercent: number | null;
  windSpeedMaxKmh: number | null;
  conditionCode?: string | number | null;
  conditionLabel?: string | null;
}

export type SourceStatus =
  | { status: "ok"; days: number }
  | { status: "error"; message: string };

export interface AlignedForecastDay {
  date: string;
  /** Previsão de cada fonte para a data. Fonte ausente = não respondeu ou não tem a data. */
  bySource: Partial<Record<WeatherSource, DailyForecast>>;
}

export interface ForecastResponse {
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  sourceStatus: Record<WeatherSource, SourceStatus>;
  days: AlignedForecastDay[];
  cached?: boolean;
}
