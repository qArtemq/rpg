export type ClassId = "warrior" | "mage" | "rogue";

export type StatKey =
  | "vitality"
  | "intelligence"
  | "strength"
  | "agility"
  | "focus"
  | "wealth"
  | "discipline"
  | "luck";

export type Stats = Record<StatKey, number>;

export type QuestCategory = "daily" | "weekly" | "main" | "side" | "epic";

export interface Quest {
  id: string;
  title: string;
  description?: string;
  category: QuestCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  xp: number;
  gold: number;
  energyCost: number;
  damage: number;
  stat: StatKey;
  done: boolean;
  repeatable: boolean;
}

export interface EpicStage {
  id: string;
  title: string;
  done: boolean;
}

export interface EpicQuest {
  id: string;
  title: string;
  description?: string;
  stages: EpicStage[];
}

export interface Boss {
  id: string;
  name: string;
  icon: string;
  maxHp: number;
  hp: number;
  rewardXp: number;
  rewardGold: number;
  defeated: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  slot: "weapon" | "shield" | "boots" | "backpack" | "trinket" | "consumable";
  bonus?: Partial<Stats>;
  equipped?: boolean;
  quantity: number;
}

export interface Pet {
  id: string;
  name: string;
  icon: string;
  level: number;
  unlocked: boolean;
  requirement: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface RegionDef {
  id: string;
  name: string;
  icon: string;
  statFocus: StatKey | "home" | "boss";
  position: { x: number; y: number };
  connections: string[];
}

export interface CharacterClassDef {
  id: ClassId;
  name: string;
  icon: string;
  tagline: string;
  color: string;
  primaryStats: StatKey[];
}

export interface Character {
  name: string;
  classId: ClassId;
  level: number;
  xp: number;
  xpToNext: number;
  gold: number;
  energy: number;
  maxEnergy: number;
  stats: Stats;
  streak: number;
  lastActiveDay: string | null;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  lines: string[];
  kind: "reward" | "levelup" | "boss" | "achievement";
}
