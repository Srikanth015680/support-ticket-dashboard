const PALETTE = [
  "bg-teal-100 text-teal-800",
  "bg-sky-100 text-sky-800",
  "bg-violet-100 text-violet-800",
  "bg-amber-100 text-amber-800",
  "bg-rose-100 text-rose-800",
  "bg-lime-100 text-lime-800",
];

function getInitials(email: string): string {
  const username = email.split("@")[0] ?? "";
  const parts = username.split(/[._-]+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return username.slice(0, 2).toUpperCase() || "?";
}

function getColor(email: string): string {
  let hash = 0;

  for (const char of email) {
    hash = (hash * 31 + char.charCodeAt(0)) % PALETTE.length;
  }

  return PALETTE[hash];
}

interface AvatarProps {
  email: string;
  size?: "sm" | "lg";
}

export default function Avatar({
  email,
  size = "sm",
}: AvatarProps) {
  const dimensions =
    size === "lg"
      ? "h-12 w-12 text-base"
      : "h-8 w-8 text-xs";

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-semibold ${dimensions} ${getColor(email)}`}
    >
      {getInitials(email)}
    </span>
  );
}