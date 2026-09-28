"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CloudSun, MapPin, Sparkles } from "lucide-react";
import { GeolocationButton } from "@/components/location/geolocation-button";
import { LocationSearch } from "@/components/location/location-search";
import { ForecastPanel } from "@/components/weather/forecast-panel";
import { getLastLocation, saveLastLocation } from "@/lib/location-storage";
import type { LocationResult } from "@/schemas/location";
import type { ForecastResponse } from "@/types/forecast";
import type { SelectedLocation } from "@/types/location";

export default function Home() {
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
      setForecast(data);
    } catch {
      if (requestId !== requestIdRef.current) return;
      setError(
        "Não foi possível carregar a previsão. Verifique sua conexão e tente novamente."
      );
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
    [loadForecast]
  );

  // Restaura a última localidade persistida (após o mount, sem mismatch de hidratação).
  useEffect(() => {
    let active = true;
    // Fora do ciclo síncrono do efeito, como callback de "external system".
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

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-4 sm:px-6">
        <header className="flex items-center justify-between rounded-full border border-white/60 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-950 p-1.5 text-white">
              <CloudSun className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
                AgroClima
              </p>
              <p className="text-sm text-slate-600">
                Comparação simples de previsões meteorológicas.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Pré-MVP
          </span>
        </header>

        <section className="mt-6 rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-sm backdrop-blur sm:p-6">
          <h1 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
            Buscar previsão do tempo
          </h1>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Compare a Open-Meteo e a WeatherAPI.com para a sua cidade.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex-1">
              <LocationSearch onSelect={handleSelect} />
            </div>
            <GeolocationButton onSelect={handleSelect} disabled={isLoading} />
          </div>

          {selected && (
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              <MapPin className="h-3.5 w-3.5" />
              {selected.name}
              <span className="text-sky-500">
                ({selected.latitude.toFixed(4)}, {selected.longitude.toFixed(4)})
              </span>
            </p>
          )}
        </section>

        <section className="mt-4 flex-1">
          {selected ? (
            <ForecastPanel forecast={forecast} isLoading={isLoading} error={error} />
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-slate-300 bg-white/50 p-10 text-center">
              <MapPin className="h-8 w-8 text-slate-300" />
              <p className="max-w-sm text-sm leading-6 text-slate-500">
                Busque uma cidade ou use sua localização para ver a previsão comparada
                entre as duas fontes.
              </p>
            </div>
          )}
        </section>

        <footer className="pb-6 pt-8 text-center text-xs leading-5 text-slate-400">
          Fontes meteorológicas: Open-Meteo e WeatherAPI.com. Previsões de 3 dias.
          <br />
          Projeto acadêmico — os valores exibidos não substituem alertas
          meteorológicos oficiais.
        </footer>
      </div>
    </main>
  );
}
