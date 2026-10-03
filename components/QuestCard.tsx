"use client";

import { motion } from "framer-motion";
import { Check, Swords, Zap } from "lucide-react";
import { STAT_DEFS } from "@/lib/data";
import { Quest } from "@/lib/types";
import { getIcon } from "@/lib/utils";

const CATEGORY_LABEL: Record<Quest["category"], string> = {
  daily: "Daily",
  weekly: "Weekly",
  main: "Main",
  side: "Side",
  epic: "Epic",
};

interface QuestCardProps {
  quest: Quest;
  onComplete: (id: string) => void;
}

export default function QuestCard({ quest, onComplete }: QuestCardProps) {
  const statDef = STAT_DEFS.find((s) => s.key === quest.stat);
  const StatIcon = getIcon(statDef?.icon ?? "Star");

  return (
    <motion.div
      layout
      animate={{ opacity: quest.done ? 0.6 : 1 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl border p-3 ${
        quest.done ? "border-border/60 bg-panel/60" : "border-border bg-panel"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-panel2 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-400">
              {CATEGORY_LABEL[quest.category]}
            </span>
            <span className="flex items-center text-xs text-amber-400">
              {"★".repeat(quest.difficulty)}
              <span className="text-slate-600">{"★".repeat(5 - quest.difficulty)}</span>
            </span>
          </div>
          <div
            className={`mt-1 font-medium ${
              quest.done ? "text-slate-500 line-through" : "text-slate-100"
            }`}
          >
            {quest.title}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-xp">
              <Zap size={12} /> +{quest.xp} XP
            </span>
            <span className="flex items-center gap-1 text-gold">🪙 +{quest.gold}</span>
            {quest.damage > 0 && (
              <span className="flex items-center gap-1 text-rose-400">
                <Swords size={12} /> -{quest.damage} HP
              </span>
            )}
            <span className="flex items-center gap-1">
              <StatIcon size={12} /> {quest.stat}
            </span>
          </div>
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.85 }}
          disabled={quest.done}
          onClick={() => onComplete(quest.id)}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
            quest.done
              ? "border-emerald-700 bg-emerald-900/40 text-emerald-400"
              : "border-border bg-panel2 text-slate-300 hover:border-accent hover:text-accent"
          }`}
        >
          <Check size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}
