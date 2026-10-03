"use client";

import { CLASS_DEFS } from "@/lib/data";
import { ClassId } from "@/lib/types";
import { cn, getIcon } from "@/lib/utils";

interface ClassPickerProps {
  value: ClassId | null;
  onChange: (id: ClassId) => void;
}

export default function ClassPicker({ value, onChange }: ClassPickerProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {CLASS_DEFS.map((cls) => {
        const Icon = getIcon(cls.icon);
        const active = value === cls.id;
        return (
          <button
            key={cls.id}
            type="button"
            onClick={() => onChange(cls.id)}
            className={cn(
              "rounded-2xl border p-4 text-left transition-all",
              active
                ? "border-accent bg-panel2 shadow-glow"
                : "border-border bg-panel hover:border-slate-600"
            )}
          >
            <Icon className="mb-2 text-accent" size={28} />
            <div className="font-display text-lg font-semibold text-slate-100">{cls.name}</div>
            <p className="mt-1 text-xs text-slate-400">{cls.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {cls.primaryStats.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-panel2 px-2 py-0.5 text-[10px] uppercase text-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
