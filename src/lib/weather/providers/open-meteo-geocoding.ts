import type { LocationResult } from "@/schemas/location";

const OPEN_METEO_GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function searchLocations(query: string): Promise<LocationResult[]> {
  const params = new URLSearchParams({
    name: query,
    count: "10",
    language: "pt",
    format: "json",
  });

  const response = await fetch(`${OPEN_METEO_GEOCODING_URL}?${params.toString()}`, {
    headers: {
      Accept: "application/json",
    },
    // Timeout de 10 segundos
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Erro na busca de localidades: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.results || !Array.isArray(data.results)) {
    return [];
  }

  return data.results.map((result: Record<string, unknown>) => ({
    name: result.name as string,
    state: (result.admin1 as string | null) ?? null,
    country: result.country as string,
    latitude: result.latitude as number,
    longitude: result.longitude as number,
    timezone: (result.timezone as string | null) ?? null,
  }));
}