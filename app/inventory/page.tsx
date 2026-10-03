"use client";

import { Coins } from "lucide-react";
import { useGameStore } from "@/lib/store";
import { getIcon } from "@/lib/utils";

export default function InventoryPage() {
  const character = useGameStore((s) => s.character);
  const items = useGameStore((s) => s.items);
  const pets = useGameStore((s) => s.pets);
  const toggleEquip = useGameStore((s) => s.toggleEquip);

  if (!character) return null;

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-slate-100">🎒 Inventory</h1>
        <div className="flex items-center gap-1 text-gold">
          <Coins size={16} />
          <span className="font-display font-semibold">{character.gold}</span>
        </div>
      </div>

      <section>
        <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
          Equipment
        </h2>
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <button
                key={item.id}
                onClick={() => toggleEquip(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                  item.equipped ? "border-accent/50 bg-panel2" : "border-border bg-panel"
                }`}
              >
                <Icon size={22} className={item.equipped ? "text-accent" : "text-slate-400"} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-100">{item.name}</div>
                  <div className="text-[10px] uppercase text-slate-500">{item.slot}</div>
                  {item.bonus && (
                    <div className="text-[10px] text-emerald-400">
                      {Object.entries(item.bonus)
                        .map(([k, v]) => `+${v} ${k}`)
                        .join(" · ")}
                    </div>
                  )}
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    item.equipped ? "bg-accent/20 text-accent" : "bg-panel2 text-slate-500"
                  }`}
                >
                  {item.equipped ? "Equipped" : "Equip"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-slate-300">
          Pets
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {pets.map((pet) => {
            const Icon = getIcon(pet.icon);
            return (
              <div
                key={pet.id}
                className={`rounded-xl border p-3 text-center ${
                  pet.unlocked ? "border-emerald-600/50 bg-emerald-950/20" : "border-border bg-panel opacity-50"
                }`}
              >
                <Icon size={24} className={`mx-auto ${pet.unlocked ? "text-emerald-400" : "text-slate-500"}`} />
                <div className="mt-1 text-xs font-medium text-slate-200">{pet.name}</div>
                <div className="text-[10px] text-slate-500">
                  {pet.unlocked ? `Lv. ${pet.level}` : pet.requirement}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
