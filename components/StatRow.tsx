import { STAT_DEFS } from "@/lib/data";
import { Stats } from "@/lib/types";
import { getIcon } from "@/lib/utils";

interface StatRowProps {
  stats: Stats;
}

export default function StatRow({ stats }: StatRowProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {STAT_DEFS.map((def) => {
        const Icon = getIcon(def.icon);
        const value = stats[def.key] ?? 0;
        return (
          <div key={def.key} className="rounded-xl border border-border bg-panel p-3">
            <div className="flex items-center gap-2 text-slate-300">
              <Icon size={16} className="text-accent" />
              <span className="text-xs uppercase tracking-wide">{def.label}</span>
            </div>
            <div className="mt-1 font-display text-xl font-bold text-slate-100">{value}</div>
            <div className="text-[10px] text-slate-500">{def.hint}</div>
          </div>
        );
      })}
    </div>
  );
}
