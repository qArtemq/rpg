import { clsx, type ClassValue } from "clsx";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function percent(value: number, max: number) {
  if (max <= 0) return 0;
  return clamp(Math.round((value / max) * 100), 0, 100);
}

export function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.HelpCircle;
}
