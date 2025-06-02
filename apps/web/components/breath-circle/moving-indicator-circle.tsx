export function MovingIndicatorCircle({
  active,
  phase,
  phaseProgress,
}: {
  active: boolean;
  phase: string;
  phaseProgress: number;
}) {
  const getRotationAngle = () => {
    if (!active || !phase) return 0;
    const baseAngle =
      phase === "inhale"
        ? 0
        : phase === "hold"
          ? 90
          : phase === "exhale"
            ? 180
            : phase === "holdWithout"
              ? 270
              : 0;

    const nextAngle =
      phase === "inhale"
        ? 90
        : phase === "hold"
          ? 180
          : phase === "exhale"
            ? 270
            : phase === "holdWithout"
              ? 360
              : 0;

    return baseAngle + (nextAngle - baseAngle) * phaseProgress;
  };

  return (
    <div
      className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-200 dark:to-slate-300 backdrop-blur-sm border border-slate-200/40 dark:border-slate-300/40 shadow-[0_0_20px_rgba(255,255,255,0.6)] dark:shadow-[0_0_20px_rgba(255,255,255,0.8)] z-50 pointer-events-none"
      style={{
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${getRotationAngle()}deg) translate(180px)`,
      }}
    />
  );
}
