import { CheckCircle2, CircleHelp, TriangleAlert, CircleDot } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AgreementLevel } from "@/types/comparison";

const STYLES: Record<AgreementLevel, { label: string; className: string; Icon: typeof CheckCircle2 }> = {
  high: {
    label: "Alta concordância",
    className: "border-emerald-200 bg-emerald-50 text-emerald-800",
    Icon: CheckCircle2,
  },
  medium: {
    label: "Média concordância",
    className: "border-amber-200 bg-amber-50 text-amber-800",
    Icon: CircleDot,
  },
  low: {
    label: "Baixa concordância",
    className: "border-rose-200 bg-rose-50 text-rose-800",
    Icon: TriangleAlert,
  },
  unavailable: {
    label: "Sem comparação",
    className: "border-slate-200 bg-slate-50 text-slate-600",
    Icon: CircleHelp,
  },
};

export function AgreementBadge({ level, compact = false }: { level: AgreementLevel; compact?: boolean }) {
  const { label, className, Icon } = STYLES[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-medium",
        compact ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className,
      )}
    >
      <Icon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden />
      {compact ? label.replace(" concordância", "") : label}
    </span>
  );
}
