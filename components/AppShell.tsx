"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store";
import BottomNav from "./BottomNav";
import ToastStack from "./ToastStack";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const character = useGameStore((s) => s.character);
  const hasHydrated = useGameStore((s) => s.hasHydrated);
  const checkDailyReset = useGameStore((s) => s.checkDailyReset);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && character) {
      checkDailyReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, character?.name]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!character && pathname !== "/create") {
      router.replace("/create");
    }
    if (character && pathname === "/create") {
      router.replace("/");
    }
  }, [character, hasHydrated, pathname, router]);

  if (!hasHydrated) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md items-center justify-center bg-bg text-slate-400">
        <div className="text-center">
          <div className="animate-pulse text-3xl">⚔️</div>
          <div className="mt-2 text-xs uppercase tracking-wide">Loading...</div>
        </div>
      </div>
    );
  }

  const showNav = !!character && pathname !== "/create";

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-bg pb-24 text-slate-100">
      <ToastStack />
      <main className="px-4 pt-6">{children}</main>
      {showNav && <BottomNav />}
    </div>
  );
}
