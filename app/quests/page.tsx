"use client";

import { useEffect, useMemo, useState } from "react";
import QuestCard from "@/components/QuestCard";
import { STAT_DEFS } from "@/lib/data";
import { useGameStore } from "@/lib/store";
import { QuestCategory, StatKey } from "@/lib/types";

const TABS: { key: QuestCategory; label: string }[] = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "main", label: "Main" },
  { key: "side", label: "Side" },
];

export default function QuestsPage() {
  const quests = useGameStore((s) => s.quests);
  const epics = useGameStore((s) => s.epics);
  const completeQuest = useGameStore((s) => s.completeQuest);
  const toggleEpicStage = useGameStore((s) => s.toggleEpicStage);
  const [tab, setTab] = useState<QuestCategory>("daily");
  const [statFilter, setStatFilter] = useState<StatKey | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stat = params.get("stat") as StatKey | null;
    if (stat) setStatFilter(stat);
  }, []);

  const filtered = useMemo(() => {
    if (statFilter) {
      return quests.filter((q) => q.stat === statFilter);
    }
    return quests.filter((q) => q.category === tab);
  }, [quests, tab, statFilter]);

  const statDef = statFilter ? STAT_DEFS.find((s) => s.key === statFilter) : null;

  return (
    <div className="space-y-4 pb-4">
      <h1 className="font-display text-xl font-bold text-slate-100">⚔️ Quests</h1>

      {statDef ? (
        <div className="flex items-center justify-between rounded-full border border-accent/40 bg-panel2 px-3 py-1.5 text-xs text-accent">
          <span>Регион: {statDef.label}</span>
          <button onClick={() => setStatFilter(null)} className="underline">
            Сбросить
          </button>
        </div>
      ) : (
        <div className="flex gap-2 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === t.key
                  ? "border-accent bg-accent/20 text-accent"
                  : "border-border bg-panel text-slate-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500">Нет квестов в этой категории.</p>
        )}
        {filtered.map((quest) => (
          <QuestCard key={quest.id} quest={quest} onComplete={completeQuest} />
        ))}
      </div>

      {!statFilter && (
        <section className="pt-2">
          <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
            🗺️ Epic Quests
          </h2>
          <div className="space-y-3">
            {epics.map((epic) => {
              const doneCount = epic.stages.filter((s) => s.done).length;
              return (
                <div key={epic.id} className="rounded-xl border border-border bg-panel p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-100">{epic.title}</span>
                    <span className="text-xs text-slate-500">
                      {doneCount}/{epic.stages.length}
                    </span>
                  </div>
                  {epic.description && (
                    <p className="mt-1 text-xs text-slate-500">{epic.description}</p>
                  )}
                  <div className="mt-2 space-y-1">
                    {epic.stages.map((stage) => (
                      <button
                        key={stage.id}
                        onClick={() => toggleEpicStage(epic.id, stage.id)}
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-panel2"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                            stage.done
                              ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                              : "border-border text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                        <span className={stage.done ? "text-slate-500 line-through" : "text-slate-200"}>
                          {stage.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
