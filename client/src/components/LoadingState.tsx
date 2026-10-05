interface LoadingStateProps {
  label?: string;
}

export default function LoadingState({
  label = "Loading…",
}: LoadingStateProps) {
  return (
    <div role="status" className="divide-y divide-line">
      <span className="sr-only">{label}</span>

      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 px-5 py-4"
        >
          <div className="h-8 w-8 animate-pulse rounded-full bg-line" />

          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-1/3 animate-pulse rounded bg-line" />
            <div className="h-3 w-1/4 animate-pulse rounded bg-line/70" />
          </div>

          <div className="hidden h-5 w-20 animate-pulse rounded-full bg-line sm:block" />
        </div>
      ))}
    </div>
  );
}