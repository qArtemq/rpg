"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useGameStore } from "@/lib/store";
import { getIcon } from "@/lib/utils";

const ICON_BY_KIND: Record<string, string> = {
  reward: "Sparkles",
  levelup: "Trophy",
  boss: "Skull",
  achievement: "Gift",
};

export default function ToastStack() {
  const toasts = useGameStore((s) => s.toasts);
  const dismissToast = useGameStore((s) => s.dismissToast);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) => setTimeout(() => dismissToast(t.id), 2600));
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts, dismissToast]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = getIcon(ICON_BY_KIND[toast.kind] ?? "Sparkles");
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto w-full max-w-xs rounded-xl border border-accent/40 bg-panel/95 px-4 py-3 shadow-glow backdrop-blur"
            >
              <div className="flex items-center gap-2 font-display text-sm font-semibold text-accent">
                <Icon size={16} />
                {toast.title}
              </div>
              <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-slate-300">
                {toast.lines.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
