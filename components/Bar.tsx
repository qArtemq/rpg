import { cn, percent } from "@/lib/utils";

interface BarProps {
  value: number;
  max: number;
  colorClass: string;
  trackClass?: string;
  label?: string;
  rightLabel?: string;
  height?: "sm" | "md" | "lg";
}

export default function Bar({
  value,
  max,
  colorClass,
  trackClass = "bg-panel2",
  label,
  rightLabel,
  height = "md",
}: BarProps) {
  const pct = percent(value, max);
  const heightClass = height === "sm" ? "h-2" : height === "lg" ? "h-5" : "h-3";

  return (
    <div className="w-full">
      {(label || rightLabel) && (
        <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
          <span>{label}</span>
          <span className="tabular-nums text-slate-400">{rightLabel}</span>
        </div>
      )}
      <div className={cn("w-full overflow-hidden rounded-full", trackClass, heightClass)}>
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colorClass)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
