"use client";

import { useState } from "react";
import ClassPicker from "@/components/ClassPicker";
import { ClassId } from "@/lib/types";
import { useGameStore } from "@/lib/store";

export default function CreateCharacterPage() {
  const createCharacter = useGameStore((s) => s.createCharacter);
  const [name, setName] = useState("");
  const [classId, setClassId] = useState<ClassId | null>(null);

  const canCreate = name.trim().length > 0 && classId !== null;

  return (
    <div className="flex min-h-dvh flex-col justify-center gap-6 px-4 py-10">
      <div className="text-center">
        <div className="text-3xl">⚔️</div>
        <h1 className="mt-2 font-display text-2xl font-bold text-slate-100">LifeQuest RPG</h1>
        <p className="mt-1 text-sm text-slate-400">
          Создай героя — он будет расти вместе с твоими реальными делами.
        </p>
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
          Имя героя
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          placeholder="Введи имя..."
          className="w-full rounded-xl border border-border bg-panel px-4 py-3 text-slate-100 outline-none placeholder:text-slate-600 focus:border-accent"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-wide text-slate-400">
          Выбери класс
        </label>
        <ClassPicker value={classId} onChange={setClassId} />
      </div>

      <button
        type="button"
        disabled={!canCreate}
        onClick={() => classId && createCharacter(name, classId)}
        className="rounded-xl bg-accent px-4 py-3 font-display font-semibold text-white transition-opacity disabled:opacity-30"
      >
        Начать приключение
      </button>
    </div>
  );
}
