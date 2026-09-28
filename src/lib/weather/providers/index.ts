import type { DailyForecast, WeatherSource } from "@/types/forecast";
import { fetchOpenMeteoForecast } from "./open-meteo";
import { fetchWeatherApiForecast } from "./weather-api";

export interface WeatherProvider {
  id: WeatherSource;
  fetchDailyForecast: (latitude: number, longitude: number) => Promise<DailyForecast[]>;
}

/** Registro central das fontes meteorológicas do MVP. */
export const WEATHER_PROVIDERS: Record<WeatherSource, WeatherProvider> = {
  "open-meteo": {
    id: "open-meteo",
    fetchDailyForecast: fetchOpenMeteoForecast,
  },
  "weather-api": {
    id: "weather-api",
    fetchDailyForecast: fetchWeatherApiForecast,
  },
};

export const WEATHER_SOURCE_IDS = Object.keys(WEATHER_PROVIDERS) as WeatherSource[];

export { WeatherApiKeyMissingError } from "./weather-api";
