"use client";

import { Coins, Zap } from "lucide-react";
import Bar from "@/components/Bar";
import BossPanel from "@/components/BossPanel";
import QuestCard from "@/components/QuestCard";
import { CLASS_DEFS } from "@/lib/data";
import { useGameStore } from "@/lib/store";
import { getIcon } from "@/lib/utils";

export default function HomePage() {
  const character = useGameStore((s) => s.character);
  const quests = useGameStore((s) => s.quests);
  const boss = useGameStore((s) => s.boss);
  const completeQuest = useGameStore((s) => s.completeQuest);
  const rest = useGameStore((s) => s.rest);

  if (!character) return null;

  const classDef = CLASS_DEFS.find((c) => c.id === character.classId) ?? CLASS_DEFS[0];
  const ClassIcon = getIcon(classDef.icon);
  const dailyQuests = quests.filter((q) => q.category === "daily");
  const doneToday = dailyQuests.filter((q) => q.done).length;

  return (
    <div className="space-y-5 pb-4">
      <header className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/40 bg-panel2 shadow-glow">
          <ClassIcon size={28} className="text-accent" />
        </div>
        <div className="flex-1">
          <div className="font-display text-lg font-bold leading-tight text-slate-100">
            {character.name}
          </div>
          <div className="text-xs text-slate-400">
            {classDef.name} · Level {character.level}
          </div>
        </div>
        <div className="text-right text-xs text-slate-400">
          🔥 Streak
          <div className="font-display text-lg font-bold text-amber-400">{character.streak}</div>
        </div>
      </header>

      <Bar
        value={character.xp}
        max={character.xpToNext}
        colorClass="bg-gradient-to-r from-xp to-blue-300"
        label="XP"
        rightLabel={`${character.xp} / ${character.xpToNext}`}
      />

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-border bg-panel p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-rose-400">
            <Zap size={14} />
          </div>
          <div className="font-display font-bold text-slate-100">{character.energy}</div>
          <div className="text-[10px] text-slate-500">Energy</div>
        </div>
        <div className="rounded-xl border border-border bg-panel p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-gold">
            <Coins size={14} />
          </div>
          <div className="font-display font-bold text-slate-100">{character.gold}</div>
          <div className="text-[10px] text-slate-500">Gold</div>
        </div>
        <button
          onClick={rest}
          className="rounded-xl border border-border bg-panel p-2 text-center transition-colors hover:border-accent"
        >
          <div className="text-center text-base">💤</div>
          <div className="font-display text-xs font-semibold text-slate-200">Отдых</div>
          <div className="text-[10px] text-slate-500">+30 Energy</div>
        </button>
      </div>

      <BossPanel boss={boss} />

      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
            Today&rsquo;s Quests
          </h2>
          <span className="text-xs text-slate-500">
            {doneToday}/{dailyQuests.length}
          </span>
        </div>
        <div className="space-y-2">
          {dailyQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} onComplete={completeQuest} />
          ))}
        </div>
      </section>
    </div>
  );
}
