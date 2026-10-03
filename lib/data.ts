import {
  Achievement,
  CharacterClassDef,
  EpicQuest,
  InventoryItem,
  Pet,
  Quest,
  RegionDef,
  StatKey,
} from "./types";

export const CLASS_DEFS: CharacterClassDef[] = [
  {
    id: "warrior",
    name: "Воин",
    icon: "Sword",
    tagline: "Сила, выносливость, ближний бой с ленью",
    color: "red",
    primaryStats: ["strength", "vitality", "discipline"],
  },
  {
    id: "mage",
    name: "Маг",
    icon: "Sparkles",
    tagline: "Интеллект, концентрация, магия знаний",
    color: "blue",
    primaryStats: ["intelligence", "focus", "wealth"],
  },
  {
    id: "rogue",
    name: "Разбойник",
    icon: "Zap",
    tagline: "Ловкость, удача, скорость исполнения",
    color: "emerald",
    primaryStats: ["agility", "luck", "focus"],
  },
];

export const STAT_DEFS: { key: StatKey; label: string; icon: string; hint: string }[] = [
  { key: "vitality", label: "Vitality", icon: "Heart", hint: "спорт, сон, здоровье" },
  { key: "intelligence", label: "Intelligence", icon: "Brain", hint: "учёба, чтение" },
  { key: "strength", label: "Strength", icon: "Dumbbell", hint: "тренировки" },
  { key: "agility", label: "Agility", icon: "Wind", hint: "активность" },
  { key: "focus", label: "Focus", icon: "Target", hint: "работа, концентрация" },
  { key: "wealth", label: "Wealth", icon: "Coins", hint: "финансовые задачи" },
  { key: "discipline", label: "Discipline", icon: "Flame", hint: "ежедневные привычки" },
  { key: "luck", label: "Luck", icon: "Clover", hint: "достижения, streak" },
];

export const DEFAULT_QUESTS: Quest[] = [
  { id: "d1", title: "Выпить стакан воды", category: "daily", difficulty: 1, xp: 10, gold: 2, energyCost: 0, damage: 10, stat: "vitality", done: false, repeatable: true },
  { id: "d2", title: "Тренировка 30+ минут", category: "daily", difficulty: 3, xp: 80, gold: 15, energyCost: 20, damage: 80, stat: "strength", done: false, repeatable: true },
  { id: "d3", title: "Учёба / чтение 30 минут", category: "daily", difficulty: 2, xp: 50, gold: 10, energyCost: 15, damage: 50, stat: "intelligence", done: false, repeatable: true },
  { id: "d4", title: "Лечь спать вовремя", category: "daily", difficulty: 1, xp: 20, gold: 5, energyCost: 0, damage: 20, stat: "discipline", done: false, repeatable: true },
  { id: "s1", title: "Убрать комнату", category: "side", difficulty: 1, xp: 30, gold: 5, energyCost: 10, damage: 30, stat: "discipline", done: false, repeatable: true },
  { id: "s2", title: "Купить продукты", category: "side", difficulty: 1, xp: 25, gold: 5, energyCost: 10, damage: 25, stat: "wealth", done: false, repeatable: true },
  { id: "s3", title: "Разобрать сообщения / почту", category: "side", difficulty: 1, xp: 20, gold: 5, energyCost: 5, damage: 20, stat: "focus", done: false, repeatable: true },
  { id: "m1", title: "Сделать рабочую задачу", category: "main", difficulty: 4, xp: 150, gold: 40, energyCost: 30, damage: 100, stat: "focus", done: false, repeatable: true },
  { id: "m2", title: "Выучить 10 новых слов", category: "main", difficulty: 2, xp: 60, gold: 12, energyCost: 15, damage: 60, stat: "intelligence", done: false, repeatable: true },
  { id: "w1", title: "Выполнить 20 заданий за неделю", category: "weekly", difficulty: 5, xp: 300, gold: 100, energyCost: 0, damage: 150, stat: "discipline", done: false, repeatable: false },
];

export const EPIC_QUESTS: EpicQuest[] = [
  {
    id: "e1",
    title: "⚔️ Путь разработчика",
    description: "Создать и опубликовать свой проект",
    stages: [
      { id: "e1s1", title: "Придумать идею", done: false },
      { id: "e1s2", title: "Сделать дизайн", done: false },
      { id: "e1s3", title: "Написать MVP", done: false },
      { id: "e1s4", title: "Протестировать", done: false },
      { id: "e1s5", title: "Опубликовать", done: false },
    ],
  },
];

export const BOSS_TEMPLATES: {
  name: string;
  icon: string;
  maxHp: number;
  rewardXp: number;
  rewardGold: number;
}[] = [
  { name: "ЛЕНЬ", icon: "Moon", maxHp: 600, rewardXp: 200, rewardGold: 100 },
  { name: "ПРОКРАСТИНАЦИЯ", icon: "Hourglass", maxHp: 900, rewardXp: 300, rewardGold: 150 },
  { name: "ХАОС", icon: "Tornado", maxHp: 1200, rewardXp: 400, rewardGold: 200 },
  { name: "ДОЛГИ", icon: "Banknote", maxHp: 1500, rewardXp: 500, rewardGold: 250 },
  { name: "ЭКЗАМЕН", icon: "GraduationCap", maxHp: 1800, rewardXp: 650, rewardGold: 300 },
];

export const ACHIEVEMENT_DEFS: Omit<Achievement, "unlocked">[] = [
  { id: "a1", title: "First Blood", description: "Выполнить первый квест", icon: "Medal" },
  { id: "a2", title: "Adventurer", description: "Выполнить 100 заданий", icon: "Swords" },
  { id: "a3", title: "Unstoppable", description: "7 дней streak подряд", icon: "Flame" },
  { id: "a4", title: "Boss Slayer", description: "Победить первого босса", icon: "Skull" },
  { id: "a5", title: "Scholar", description: "Набрать 500 очков Intelligence", icon: "BookOpen" },
  { id: "a6", title: "Millionaire", description: "Заработать 1000 золота", icon: "Coins" },
];

export const PET_DEFS: Omit<Pet, "unlocked" | "level">[] = [
  { id: "p1", name: "Волк", icon: "Dog", requirement: "7 дней streak подряд" },
  { id: "p2", name: "Кот", icon: "Cat", requirement: "50 ежедневных заданий" },
  { id: "p3", name: "Маленький дракон", icon: "Flame", requirement: "Достичь 10 уровня" },
  { id: "p4", name: "Енот", icon: "PawPrint", requirement: "Особое достижение (скоро)" },
];

export const STARTER_ITEMS: InventoryItem[] = [
  { id: "i1", name: "Iron Sword", icon: "Sword", slot: "weapon", bonus: { strength: 3 }, equipped: true, quantity: 1 },
  { id: "i2", name: "Wooden Shield", icon: "Shield", slot: "shield", bonus: { vitality: 5 }, equipped: true, quantity: 1 },
  { id: "i3", name: "Traveler Boots", icon: "Footprints", slot: "boots", bonus: { agility: 2 }, equipped: true, quantity: 1 },
  { id: "i4", name: "Adventurer Backpack", icon: "Backpack", slot: "backpack", equipped: true, quantity: 1 },
];

export const REGION_DEFS: RegionDef[] = [
  { id: "capital", name: "Kingdom", icon: "Castle", statFocus: "focus", position: { x: 50, y: 6 }, connections: ["mountain"] },
  { id: "mountain", name: "Mountain of Knowledge", icon: "Mountain", statFocus: "intelligence", position: { x: 50, y: 24 }, connections: ["capital", "home", "market"] },
  { id: "home", name: "Home", icon: "Home", statFocus: "home", position: { x: 14, y: 46 }, connections: ["mountain", "village"] },
  { id: "village", name: "Training Grounds", icon: "Warehouse", statFocus: "strength", position: { x: 50, y: 46 }, connections: ["home", "market", "forest"] },
  { id: "market", name: "Market", icon: "Store", statFocus: "wealth", position: { x: 86, y: 46 }, connections: ["mountain", "village"] },
  { id: "forest", name: "Dark Forest", icon: "Trees", statFocus: "agility", position: { x: 50, y: 68 }, connections: ["village", "dungeon"] },
  { id: "dungeon", name: "Dungeon", icon: "Skull", statFocus: "boss", position: { x: 50, y: 90 }, connections: ["forest"] },
];
