import type { Priority, Status } from "../types/ticket";

export const STATUS_LABELS: Record<Status, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function formatRelative(iso: string): string {
  const diffMs = new Date(iso).getTime() - Date.now();
  const abs = Math.abs(diffMs);

  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  const rtf = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  });

  if (abs < minute) {
    return "Just now";
  }

  if (abs < hour) {
    return rtf.format(Math.round(diffMs / minute), "minute");
  }

  if (abs < day) {
    return rtf.format(Math.round(diffMs / hour), "hour");
  }

  if (abs < 30 * day) {
    return rtf.format(Math.round(diffMs / day), "day");
  }

  return new Date(iso).toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    dateStyle: "medium",
  });
}