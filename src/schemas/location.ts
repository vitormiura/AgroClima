import { z } from "zod";

export const locationSearchQuerySchema = z.object({
  query: z.string().min(2, "A busca deve ter pelo menos 2 caracteres").max(100),
});

export const locationResultSchema = z.object({
  name: z.string(),
  state: z.string().nullable().optional(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string().nullable().optional(),
});

export const locationsResponseSchema = z.object({
  locations: z.array(locationResultSchema),
});

export type LocationSearchQuery = z.infer<typeof locationSearchQuerySchema>;
export type LocationResult = z.infer<typeof locationResultSchema>;
export type LocationsResponse = z.infer<typeof locationsResponseSchema>;