import {
  PRIORITY_LABELS,
  STATUS_LABELS,
} from "../lib/format";
import type { Priority, Status } from "../types/ticket";
import { FlagIcon } from "./Icons";

const STATUS_STYLES: Record<
  Status,
  { chip: string; dot: string }
> = {
  OPEN: {
    chip: "bg-blue-50 text-blue-700 ring-blue-200",
    dot: "bg-blue-500",
  },
  IN_PROGRESS: {
    chip: "bg-amber-50 text-amber-800 ring-amber-200",
    dot: "bg-amber-500",
  },
  RESOLVED: {
    chip: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
};

const PRIORITY_STYLES: Record<Priority, string> = {
  LOW: "bg-slate-100 text-slate-600 ring-slate-200",
  MEDIUM: "bg-orange-50 text-orange-700 ring-orange-200",
  HIGH: "bg-red-50 text-red-700 ring-red-200",
};

const PRIORITY_ICON_COLORS: Record<Priority, string> = {
  LOW: "text-slate-400",
  MEDIUM: "text-orange-500",
  HIGH: "text-red-500",
};

const chip =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset";

export function StatusBadge({ status }: { status: Status }) {
  const style = STATUS_STYLES[status];

  return (
    <span className={`${chip} ${style.chip}`}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
      />
      {STATUS_LABELS[status]}
    </span>
  );
}

export function PriorityIcon({
  priority,
}: {
  priority: Priority;
}) {
  return (
    <FlagIcon
      width={15}
      height={15}
      className={PRIORITY_ICON_COLORS[priority]}
    />
  );
}

export function PriorityBadge({
  priority,
}: {
  priority: Priority;
}) {
  return (
    <span className={`${chip} ${PRIORITY_STYLES[priority]}`}>
      <FlagIcon width={13} height={13} />
      {PRIORITY_LABELS[priority]}
    </span>
  );
}