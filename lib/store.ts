"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  Achievement,
  Boss,
  Character,
  ClassId,
  EpicQuest,
  InventoryItem,
  Pet,
  Quest,
  Stats,
  ToastMessage,
} from "./types";
import {
  ACHIEVEMENT_DEFS,
  BOSS_TEMPLATES,
  CLASS_DEFS,
  DEFAULT_QUESTS,
  EPIC_QUESTS,
  PET_DEFS,
  STARTER_ITEMS,
} from "./data";

const EMPTY_STATS: Stats = {
  vitality: 0,
  intelligence: 0,
  strength: 0,
  agility: 0,
  focus: 0,
  wealth: 0,
  discipline: 0,
  luck: 0,
};

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function xpForNextLevel(level: number): number {
  return Math.round(100 * Math.pow(1.25, level - 1));
}

function makeBoss(index: number): Boss {
  const template = BOSS_TEMPLATES[index % BOSS_TEMPLATES.length];
  return {
    id: `boss-${index}`,
    name: template.name,
    icon: template.icon,
    maxHp: template.maxHp,
    hp: template.maxHp,
    rewardXp: template.rewardXp,
    rewardGold: template.rewardGold,
    defeated: false,
  };
}

function pushToast(
  toasts: ToastMessage[],
  toast: Omit<ToastMessage, "id">
): ToastMessage[] {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return [...toasts, { ...toast, id }];
}

interface GameState {
  character: Character | null;
  quests: Quest[];
  epics: EpicQuest[];
  items: InventoryItem[];
  pets: Pet[];
  achievements: Achievement[];
  bossIndex: number;
  boss: Boss;
  totalQuestsCompleted: number;
  toasts: ToastMessage[];
  hasHydrated: boolean;

  setHasHydrated: (value: boolean) => void;
  createCharacter: (name: string, classId: ClassId) => void;
  completeQuest: (questId: string) => void;
  toggleEpicStage: (epicId: string, stageId: string) => void;
  rest: () => void;
  toggleEquip: (itemId: string) => void;
  dismissToast: (toastId: string) => void;
  checkDailyReset: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      character: null,
      quests: DEFAULT_QUESTS,
      epics: EPIC_QUESTS,
      items: STARTER_ITEMS,
      pets: PET_DEFS.map((p) => ({ ...p, unlocked: false, level: 1 })),
      achievements: ACHIEVEMENT_DEFS.map((a) => ({ ...a, unlocked: false })),
      bossIndex: 0,
      boss: makeBoss(0),
      totalQuestsCompleted: 0,
      toasts: [],
      hasHydrated: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

      createCharacter: (name, classId) => {
        const classDef = CLASS_DEFS.find((c) => c.id === classId) ?? CLASS_DEFS[0];
        const stats = { ...EMPTY_STATS };
        classDef.primaryStats.forEach((key) => {
          stats[key] = 5;
        });
        set({
          character: {
            name: name.trim() || "Герой",
            classId: classDef.id,
            level: 1,
            xp: 0,
            xpToNext: xpForNextLevel(1),
            gold: 50,
            energy: 100,
            maxEnergy: 100,
            stats,
            streak: 0,
            lastActiveDay: null,
            createdAt: new Date().toISOString(),
          },
        });
      },

      completeQuest: (questId) => {
        const state = get();
        const character = state.character;
        if (!character) return;

        const quest = state.quests.find((q) => q.id === questId);
        if (!quest || quest.done) return;

        if (character.energy < quest.energyCost) {
          set({
            toasts: pushToast(state.toasts, {
              title: "Недостаточно энергии",
              lines: ["Отдохни, чтобы восстановить силы 💤"],
              kind: "reward",
            }),
          });
          return;
        }

        let xp = character.xp + quest.xp;
        let level = character.level;
        let xpToNext = character.xpToNext;
        let leveledUp = false;
        while (xp >= xpToNext) {
          xp -= xpToNext;
          level += 1;
          xpToNext = xpForNextLevel(level);
          leveledUp = true;
        }

        const stats = { ...character.stats };
        stats[quest.stat] = (stats[quest.stat] ?? 0) + Math.max(1, quest.difficulty);

        const today = todayKey();
        let streak = character.streak;
        if (character.lastActiveDay !== today) {
          streak += 1;
        }

        const updatedCharacter: Character = {
          ...character,
          xp,
          level,
          xpToNext,
          gold: character.gold + quest.gold,
          energy: Math.max(0, character.energy - quest.energyCost),
          stats,
          streak,
          lastActiveDay: today,
        };

        let boss = { ...state.boss, hp: Math.max(0, state.boss.hp - quest.damage) };
        let bossIndex = state.bossIndex;
        let toasts = pushToast(state.toasts, {
          title: "Квест выполнен!",
          lines: [
            `+${quest.xp} XP`,
            `+${quest.gold} Gold`,
            quest.damage ? `-${quest.damage} HP боссу` : "",
          ].filter(Boolean),
          kind: "reward",
        });

        if (boss.hp <= 0 && !boss.defeated) {
          const defeatedName = boss.name;
          const rewardXp = boss.rewardXp;
          const rewardGold = boss.rewardGold;

          updatedCharacter.gold += rewardGold;
          let bonusXp = updatedCharacter.xp + rewardXp;
          while (bonusXp >= updatedCharacter.xpToNext) {
            bonusXp -= updatedCharacter.xpToNext;
            updatedCharacter.level += 1;
            updatedCharacter.xpToNext = xpForNextLevel(updatedCharacter.level);
            leveledUp = true;
          }
          updatedCharacter.xp = bonusXp;

          toasts = pushToast(toasts, {
            title: `BOSS DEFEATED: ${defeatedName}`,
            lines: [`+${rewardXp} XP`, `+${rewardGold} Gold`],
            kind: "boss",
          });

          bossIndex += 1;
          boss = makeBoss(bossIndex);
        }

        if (leveledUp) {
          toasts = pushToast(toasts, {
            title: "LEVEL UP!",
            lines: [`Теперь ты ${updatedCharacter.level} уровня`],
            kind: "levelup",
          });
        }

        const totalQuestsCompleted = state.totalQuestsCompleted + 1;

        const achievements = state.achievements.map((a) => {
          if (a.unlocked) return a;
          if (a.id === "a1" && totalQuestsCompleted >= 1) return { ...a, unlocked: true };
          if (a.id === "a2" && totalQuestsCompleted >= 100) return { ...a, unlocked: true };
          if (a.id === "a3" && updatedCharacter.streak >= 7) return { ...a, unlocked: true };
          if (a.id === "a4" && bossIndex > state.bossIndex) return { ...a, unlocked: true };
          if (a.id === "a5" && updatedCharacter.stats.intelligence >= 500) return { ...a, unlocked: true };
          if (a.id === "a6" && updatedCharacter.gold >= 1000) return { ...a, unlocked: true };
          return a;
        });

        const pets = state.pets.map((p) => {
          if (p.unlocked) return p;
          if (p.id === "p1" && updatedCharacter.streak >= 7) return { ...p, unlocked: true };
          if (p.id === "p2" && totalQuestsCompleted >= 50) return { ...p, unlocked: true };
          if (p.id === "p3" && updatedCharacter.level >= 10) return { ...p, unlocked: true };
          return p;
        });

        const quests = state.quests.map((q) => (q.id === questId ? { ...q, done: true } : q));

        set({
          character: updatedCharacter,
          quests,
          boss,
          bossIndex,
          toasts,
          totalQuestsCompleted,
          achievements,
          pets,
        });
      },

      toggleEpicStage: (epicId, stageId) => {
        const epics = get().epics.map((epic) => {
          if (epic.id !== epicId) return epic;
          return {
            ...epic,
            stages: epic.stages.map((s) => (s.id === stageId ? { ...s, done: !s.done } : s)),
          };
        });
        set({ epics });
      },

      rest: () => {
        const state = get();
        if (!state.character) return;
        const energy = Math.min(state.character.maxEnergy, state.character.energy + 30);
        set({
          character: { ...state.character, energy },
          toasts: pushToast(state.toasts, {
            title: "Отдых",
            lines: ["+30 Energy"],
            kind: "reward",
          }),
        });
      },

      toggleEquip: (itemId) => {
        const items = get().items.map((item) =>
          item.id === itemId ? { ...item, equipped: !item.equipped } : item
        );
        set({ items });
      },

      dismissToast: (toastId) => {
        set({ toasts: get().toasts.filter((t) => t.id !== toastId) });
      },

      checkDailyReset: () => {
        const state = get();
        if (!state.character) return;
        const today = todayKey();
        const last = state.character.lastActiveDay;
        if (last === today) return;

        let streak = state.character.streak;
        if (last) {
          const lastDate = new Date(`${last}T00:00:00`);
          const todayDate = new Date(`${today}T00:00:00`);
          const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / 86400000);
          if (diffDays === 2) {
            streak = Math.max(0, streak - 1);
          } else if (diffDays > 2) {
            streak = 0;
          }
        }

        const quests = state.quests.map((q) =>
          q.category === "daily" && q.repeatable ? { ...q, done: false } : q
        );

        set({
          quests,
          character: { ...state.character, streak },
        });
      },

      resetGame: () => {
        set({
          character: null,
          quests: DEFAULT_QUESTS.map((q) => ({ ...q, done: false })),
          epics: EPIC_QUESTS.map((e) => ({ ...e, stages: e.stages.map((s) => ({ ...s, done: false })) })),
          items: STARTER_ITEMS,
          pets: PET_DEFS.map((p) => ({ ...p, unlocked: false, level: 1 })),
          achievements: ACHIEVEMENT_DEFS.map((a) => ({ ...a, unlocked: false })),
          bossIndex: 0,
          boss: makeBoss(0),
          totalQuestsCompleted: 0,
          toasts: [],
        });
      },
    }),
    {
      name: "lifequest-save",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
