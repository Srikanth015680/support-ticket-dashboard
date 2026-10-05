import type { ReactNode } from "react";

import { AlertIcon, CheckIcon } from "./Icons";

interface NoticeProps {
  tone: "success" | "error";
  children: ReactNode;
}

const TONES = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-red-200 bg-red-50 text-red-900",
} as const;

export default function Notice({
  tone,
  children,
}: NoticeProps) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm font-medium ${TONES[tone]}`}
    >
      {tone === "success" ? (
        <CheckIcon className="shrink-0" />
      ) : (
        <AlertIcon className="shrink-0" />
      )}

      {children}
    </div>
  );
}