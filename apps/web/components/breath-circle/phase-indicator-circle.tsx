export function PhaseIndicatorCircle({ angle }: { angle: number }) {
  return (
    <div
      className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-black/90 to-black/40 dark:from-white/90 dark:to-white/40 backdrop-blur-sm border border-black/30 dark:border-white/30 shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:shadow-[0_0_8px_rgba(255,255,255,0.3)]"
      style={{
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(180px)`,
      }}
    />
  );
}
