"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DailyComparison } from "@/types/comparison";

const OPEN_METEO_COLOR = "#2a78d6";
const WEATHER_API_COLOR = "#eb6834";

interface ChartPoint {
  label: string;
  omMax: number | null;
  omMin: number | null;
  waMax: number | null;
  waMin: number | null;
}

function dayLabel(date: string): string {
  const [, month, day] = date.split("-");
  return `${day}/${month}`;
}

function formatTooltipValue(value: number | string | null | undefined, dataKey: string | undefined): string {
  const map: Record<string, string> = {
    omMax: "OM · máx",
    omMin: "OM · mín",
    waMax: "WA · máx",
    waMin: "WA · mín",
  };
  const key = dataKey ?? "";
  const label = map[key] ?? key;
  if (value === null || value === undefined) return `${label}: —`;
  return `${label}: ${Number(value).toLocaleString("pt-BR")} °C`;
}

/**
 * Gráfico comparativo de temperatura (mín e máx) por dia, com as duas fontes.
 * Linhas contínuas: Open-Meteo. Linhas tracejadas: WeatherAPI.com.
 */
export function ForecastComparisonChart({ days }: { days: DailyComparison[] }) {
  const data: ChartPoint[] = days.map((day) => {
    const om = day.metrics.temperatureMaxC.sourceA;
    const omMin = day.metrics.temperatureMinC.sourceA;
    const wa = day.metrics.temperatureMaxC.sourceB;
    const waMin = day.metrics.temperatureMinC.sourceB;
    return {
      label: dayLabel(day.date),
      omMax: om,
      omMin,
      waMax: wa,
      waMin,
    };
  });

  const hasAnyValue = data.some(
    (point) => point.omMax !== null || point.omMin !== null || point.waMax !== null || point.waMin !== null
  );

  if (!hasAnyValue) return null;

  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">
        Temperatura ao longo dos dias
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        Contínuo: Open-Meteo · Tracejado: WeatherAPI.com
      </p>
      <div className="mt-4 h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              width={48}
              unit="°"
            />
            <Tooltip
              formatter={(value, dataKey) =>
                formatTooltipValue(
                  value as number | string | null | undefined,
                  String(dataKey ?? "")
                )
              }
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                fontSize: 12,
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value: string) => {
                const map: Record<string, string> = {
                  omMax: "Open-Meteo · máx",
                  omMin: "Open-Meteo · mín",
                  waMax: "WeatherAPI · máx",
                  waMin: "WeatherAPI · mín",
                };
                return map[value] ?? value;
              }}
            />
            <Line
              type="monotone"
              dataKey="omMax"
              stroke={OPEN_METEO_COLOR}
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="waMax"
              stroke={WEATHER_API_COLOR}
              strokeWidth={2.5}
              strokeDasharray="6 4"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="omMin"
              stroke={OPEN_METEO_COLOR}
              strokeWidth={1.75}
              strokeOpacity={0.55}
              dot={{ r: 2 }}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="waMin"
              stroke={WEATHER_API_COLOR}
              strokeWidth={1.75}
              strokeDasharray="6 4"
              strokeOpacity={0.55}
              dot={{ r: 2 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
