"use client";

import { useState } from "react";
import { Loader2, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SelectedLocation } from "@/types/location";

interface GeolocationButtonProps {
  onSelect: (location: SelectedLocation) => void;
  disabled?: boolean;
}

type GeolocationStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; message: string };

function messageForGeolocationError(error: GeolocationPositionError): string {
  if (error.code === error.PERMISSION_DENIED) {
    return "Permissão de localização negada. Você pode buscar a cidade pelo nome.";
  }
  if (error.code === error.POSITION_UNAVAILABLE) {
    return "Não foi possível obter sua posição no momento.";
  }
  if (error.code === error.TIMEOUT) {
    return "A busca por localização demorou demais. Tente novamente.";
  }
  return "Não foi possível obter sua localização.";
}

export function GeolocationButton({ onSelect, disabled = false }: GeolocationButtonProps) {
  const [status, setStatus] = useState<GeolocationStatus>({ state: "idle" });

  function handleGeolocate() {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      setStatus({ state: "error", message: "Seu navegador não oferece geolocalização." });
      return;
    }

    setStatus({ state: "loading" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus({ state: "idle" });
        onSelect({
          name: "Minha localização",
          state: null,
          country: null,
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? null,
        });
      },
      (error) => {
        setStatus({ state: "error", message: messageForGeolocationError(error) });
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 }
    );
  }

  return (
    <div className="flex flex-col items-start gap-1.5">
      <Button
        type="button"
        variant="outline"
        disabled={disabled || status.state === "loading"}
        onClick={handleGeolocate}
        className="min-h-11 w-full sm:w-auto"
      >
        {status.state === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LocateFixed className="h-4 w-4" />
        )}
        Usar minha localização
      </Button>
      {status.state === "error" && (
        <p role="alert" className="text-xs leading-5 text-red-600">
          {status.message}
        </p>
      )}
    </div>
  );
}
