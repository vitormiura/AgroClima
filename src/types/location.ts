export interface LocationData {
  name: string;
  state?: string | null;
  country: string;
  latitude: number;
  longitude: number;
  timezone?: string | null;
}

/**
 * Localidade selecionada na interface (busca por nome ou geolocalização).
 * Para geolocalização, `state` e `country` ficam nulos porque o nome é genérico.
 */
export interface SelectedLocation {
  name: string;
  state: string | null;
  country: string | null;
  latitude: number;
  longitude: number;
  timezone: string | null;
}
