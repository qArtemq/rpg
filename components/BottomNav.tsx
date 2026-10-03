"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Swords, User, Backpack } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/world", label: "World", icon: Map },
  { href: "/quests", label: "Quests", icon: Swords },
  { href: "/character", label: "Character", icon: User },
  { href: "/inventory", label: "Inventory", icon: Backpack },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-panel/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[11px] transition-colors",
                active ? "text-accent" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
