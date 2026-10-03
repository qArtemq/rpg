"use client";

import Link from "next/link";
import { REGION_DEFS } from "@/lib/data";
import { useGameStore } from "@/lib/store";
import { getIcon } from "@/lib/utils";

export default function WorldPage() {
  const boss = useGameStore((s) => s.boss);

  return (
    <div className="space-y-4 pb-4">
      <h1 className="font-display text-xl font-bold text-slate-100">🗺️ World Map</h1>
      <p className="text-xs text-slate-500">
        Каждый регион — это категория реальных дел. Нажми на регион, чтобы увидеть связанные
        квесты.
      </p>

      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-border bg-panel">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {REGION_DEFS.flatMap((region) =>
            region.connections
              .filter((targetId) => targetId > region.id)
              .map((targetId) => {
                const target = REGION_DEFS.find((r) => r.id === targetId);
                if (!target) return null;
                return (
                  <line
                    key={`${region.id}-${targetId}`}
                    x1={`${region.position.x}%`}
                    y1={`${region.position.y}%`}
                    x2={`${target.position.x}%`}
                    y2={`${target.position.y}%`}
                    stroke="#2a3152"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                );
              })
          )}
        </svg>

        {REGION_DEFS.map((region) => {
          const Icon = getIcon(region.icon);
          const href =
            region.statFocus === "home" || region.statFocus === "boss"
              ? "/"
              : `/quests?stat=${region.statFocus}`;
          return (
            <Link
              key={region.id}
              href={href}
              style={{ left: `${region.position.x}%`, top: `${region.position.y}%` }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-panel2 text-accent shadow-glow transition-transform hover:scale-110">
                <Icon size={20} />
              </span>
              <span className="whitespace-nowrap rounded-full bg-bg/80 px-2 py-0.5 text-[10px] text-slate-300">
                {region.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="rounded-xl border border-rose-900/50 bg-panel p-3 text-sm text-rose-300">
        👹 Текущий мировой босс: <span className="font-semibold">{boss.name}</span> — {boss.hp}/
        {boss.maxHp} HP
      </div>
    </div>
  );
}
