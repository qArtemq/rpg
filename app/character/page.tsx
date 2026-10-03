"use client";

import Bar from "@/components/Bar";
import StatRow from "@/components/StatRow";
import { CLASS_DEFS } from "@/lib/data";
import { useGameStore } from "@/lib/store";
import { getIcon } from "@/lib/utils";

export default function CharacterPage() {
  const character = useGameStore((s) => s.character);
  const items = useGameStore((s) => s.items);
  const achievements = useGameStore((s) => s.achievements);
  const totalQuestsCompleted = useGameStore((s) => s.totalQuestsCompleted);

  if (!character) return null;

  const classDef = CLASS_DEFS.find((c) => c.id === character.classId) ?? CLASS_DEFS[0];
  const ClassIcon = getIcon(classDef.icon);
  const equipped = items.filter((i) => i.equipped);
  const unlockedAchievements = achievements.filter((a) => a.unlocked);

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/40 bg-panel2 shadow-glow">
          <ClassIcon size={32} className="text-accent" />
        </div>
        <div>
          <div className="font-display text-xl font-bold text-slate-100">{character.name}</div>
          <div className="text-sm text-slate-400">
            {classDef.name} · Level {character.level}
          </div>
        </div>
      </div>

      <Bar
        value={character.xp}
        max={character.xpToNext}
        colorClass="bg-gradient-to-r from-xp to-blue-300"
        label="XP до следующего уровня"
        rightLabel={`${character.xp} / ${character.xpToNext}`}
      />

      <section>
        <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
          Характеристики
        </h2>
        <StatRow stats={character.stats} />
      </section>

      <section>
        <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
          Экипировка
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {equipped.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 rounded-xl border border-border bg-panel p-2"
              >
                <Icon size={18} className="text-accent" />
                <div>
                  <div className="text-xs font-medium text-slate-200">{item.name}</div>
                  {item.bonus && (
                    <div className="text-[10px] text-slate-500">
                      {Object.entries(item.bonus)
                        .map(([k, v]) => `+${v} ${k}`)
                        .join(" · ")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
          Достижения ({unlockedAchievements.length}/{achievements.length})
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {achievements.map((a) => {
            const Icon = getIcon(a.icon);
            return (
              <div
                key={a.id}
                className={`rounded-xl border p-2 ${
                  a.unlocked ? "border-amber-600/50 bg-amber-950/20" : "border-border bg-panel opacity-50"
                }`}
              >
                <Icon size={16} className={a.unlocked ? "text-amber-400" : "text-slate-500"} />
                <div className="mt-1 text-xs font-medium text-slate-200">{a.title}</div>
                <div className="text-[10px] text-slate-500">{a.description}</div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="text-center text-xs text-slate-600">
        Всего выполнено квестов: {totalQuestsCompleted}
      </div>
    </div>
  );
}
