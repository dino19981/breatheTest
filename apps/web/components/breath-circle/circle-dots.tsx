interface DotsSvgProps {
  opacity: number;
}

export function DotsSvg({ opacity }: DotsSvgProps) {
  const rings = [
    { rPct: 6, dotR: 0.7, count: 6 },
    { rPct: 12, dotR: 0.66, count: 10 },
    { rPct: 18, dotR: 0.6, count: 14 },
    { rPct: 24, dotR: 0.54, count: 18 },
    { rPct: 30, dotR: 0.48, count: 22 },
    { rPct: 36, dotR: 0.44, count: 26 },
    { rPct: 42, dotR: 0.4, count: 30 },
    { rPct: 48, dotR: 0.36, count: 34 },
    { rPct: 54, dotR: 0.33, count: 38 },
    { rPct: 60, dotR: 0.3, count: 42 },
    { rPct: 66, dotR: 0.28, count: 46 },
    { rPct: 72, dotR: 0.26, count: 52 },
    { rPct: 78, dotR: 0.24, count: 58 },
    { rPct: 84, dotR: 0.22, count: 64 },
    { rPct: 90, dotR: 0.2, count: 70 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {rings.flatMap(({ rPct, dotR, count }, ringId) =>
        Array.from({ length: count }).map((_, i) => {
          const a = (2 * Math.PI * i) / count;
          const r = rPct * 0.5;
          const cx = 50 + r * Math.cos(a);
          const cy = 50 + r * Math.sin(a);
          return (
            <circle
              key={`${ringId}-${i}`}
              cx={cx}
              cy={cy}
              r={dotR}
              fill="#FFFFFF"
              fillOpacity={opacity}
            />
          );
        }),
      )}
    </svg>
  );
}
