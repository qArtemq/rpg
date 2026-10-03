import { Boss } from "@/lib/types";
import { getIcon } from "@/lib/utils";
import Bar from "./Bar";

interface BossPanelProps {
  boss: Boss;
}

export default function BossPanel({ boss }: BossPanelProps) {
  const Icon = getIcon(boss.icon);

  return (
    <div className="rounded-2xl border border-rose-900/50 bg-gradient-to-br from-panel to-rose-950/20 p-4">
      <div className="flex items-center gap-2 text-rose-400">
        <Icon size={18} />
        <span className="font-display text-sm font-semibold tracking-wide">
          БОСС: {boss.name}
        </span>
      </div>
      <div className="mt-2">
        <Bar
          value={boss.hp}
          max={boss.maxHp}
          colorClass="bg-gradient-to-r from-rose-600 to-rose-400"
          rightLabel={`${boss.hp} / ${boss.maxHp}`}
          height="lg"
        />
      </div>
    </div>
  );
}
