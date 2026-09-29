"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, CloudSun, Loader2, MapPin } from "lucide-react";

import { ComparisonView } from "@/components/comparacao/comparison-view";
import { GeolocationButton } from "@/components/location/geolocation-button";
import { LocationSearch } from "@/components/location/location-search";
import { getLastLocation, saveLastLocation } from "@/lib/location-storage";
import { SOURCE_LABELS } from "@/lib/weather/constants";
import type { LocationResult } from "@/schemas/location";
import type { ForecastResponse, WeatherSource } from "@/types/forecast";
import type { SelectedLocation } from "@/types/location";

/** Página de comparação: reaproveita a busca, a geolocalização e a rota /api/forecast do projeto. */
export function CompararClient() {
  const [selected, setSelected] = useState<SelectedLocation | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const loadForecast = useCallback(async (location: SelectedLocation) => {
    const requestId = ++requestIdRef.current;
    setIsLoading(true);
    setError(null);
    setForecast(null);
    const params = new URLSearchParams({
      lat: String(location.latitude),
      lon: String(location.longitude),
      name: location.name,
    });
    try {
      const response = await fetch(`/api/forecast?${params.toString()}`);
      const data = (await response.json()) as ForecastResponse;
      if (requestId !== requestIdRef.current) return;
      if (!data.days || data.days.length === 0) {
        setError("Nenhuma fonte meteorológica respondeu. Tente novamente em instantes.");
      } else {
        setForecast(data);
      }
    } catch {
      if (requestId !== requestIdRef.current) return;
      setError("Não foi possível carregar a previsão. Verifique sua conexão e tente novamente.");
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  }, []);

  const handleSelect = useCallback(
    (location: LocationResult | SelectedLocation) => {
      const normalized: SelectedLocation = {
        name: location.name,
        state: location.state ?? null,
        country: location.country ?? null,
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone ?? null,
      };
      saveLastLocation(normalized);
      setSelected(normalized);
      void loadForecast(normalized);
    },
    [loadForecast],
  );

  useEffect(() => {
    let active = true;
    void Promise.resolve().then(() => {
      if (!active) return;
      const last = getLastLocation();
      if (last) {
        setSelected(last);
        void loadForecast(last);
      }
    });
    return () => {
      active = false;
    };
  }, [loadForecast]);

  const failed = forecast
    ? (Object.entries(forecast.sourceStatus) as [WeatherSource, ForecastResponse["sourceStatus"][WeatherSource]][])
        .filter(([, status]) => status.status === "error")
    : [];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex-1">
            <LocationSearch onSelect={handleSelect} />
          </div>
          <GeolocationButton onSelect={handleSelect} disabled={isLoading} />
        </div>
        {selected && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-800">
            <MapPin className="h-3.5 w-3.5" />
            {selected.name}
            {selected.state ? `, ${selected.state}` : ""} ({selected.latitude.toFixed(4)},{" "}
            {selected.longitude.toFixed(4)})
          </p>
        )}
      </div>

      {!selected && !isLoading && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center">
          <CloudSun className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-3 font-medium text-slate-900">Escolha uma cidade para comparar as previsões</p>
          <p className="mt-1 text-sm text-slate-600">
            O AgroClima consulta duas fontes e mostra, para os próximos três dias, o valor consolidado e o
            quanto elas concordam.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-6 text-slate-700">
          <Loader2 className="h-5 w-5 animate-spin" />
          Consultando as fontes…
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-900">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {forecast && (
        <>
          {failed.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-medium">Comparação parcial: uma das fontes não respondeu.</p>
              <ul className="mt-1 list-disc pl-5">
                {failed.map(([source, status]) => (
                  <li key={source}>
                    {SOURCE_LABELS[source]}: {status.status === "error" ? status.message : ""}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <ComparisonView key={`${forecast.location.latitude},${forecast.location.longitude}`} data={forecast} />
        </>
      )}
    </div>
  );
}
