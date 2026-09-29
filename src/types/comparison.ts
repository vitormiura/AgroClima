// Tipos da comparação entre fontes (PROJECT.md, seções 7 e 9 — Fase 4).

import type { DailyForecast } from "@/types/forecast";

export type AgreementLevel = "high" | "medium" | "low" | "unavailable";

export interface MetricComparison {
  sourceA: number | null;
  sourceB: number | null;
  consolidated: number | null;
  absoluteDifference: number | null;
  percentageDivergence: number | null;
  agreement: AgreementLevel;
}

export type MetricKey = Exclude<
  keyof DailyForecast,
  "source" | "date" | "conditionCode" | "conditionLabel"
>;

export interface DailyComparison {
  date: string;
  metrics: Record<MetricKey, MetricComparison>;
  overallAgreement: AgreementLevel;
}
