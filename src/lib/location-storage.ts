import { z } from "zod";
import type { SelectedLocation } from "@/types/location";

const LAST_LOCATION_STORAGE_KEY = "agroclima:last-location";

const lastLocationSchema = z.object({
  name: z.string().min(1).max(120),
  state: z.string().nullable(),
  country: z.string().nullable(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timezone: z.string().nullable(),
});

/** Persiste a última localidade selecionada. Falhas no storage são silenciosas. */
export function saveLastLocation(location: SelectedLocation): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LAST_LOCATION_STORAGE_KEY, JSON.stringify(location));
  } catch {
    // localStorage indisponível (modo privado, etc.): segue sem persistir.
  }
}

/** Recupera a última localidade persistida, validando o formato. */
export function getLastLocation(): SelectedLocation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_LOCATION_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    const result = lastLocationSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
