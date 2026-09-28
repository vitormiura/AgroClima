export type WeatherSource = "open-meteo" | "weather-api";

export interface DailyForecast {
  source: WeatherSource;
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

export interface LocationData {
  name: string;
  state?: string | null;
  country: string;
  latitude: number;
  longitude: number;
  timezone?: string | null;
}