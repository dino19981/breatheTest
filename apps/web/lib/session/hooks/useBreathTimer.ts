import { useEffect, useRef, useState } from "react";

type BaseProtocol = {
  inhale: number;
  exhale: number;
};

type FullProtocol = BaseProtocol & {
  hold: number;
  holdWithout: number;
};

export const protocols = {
  Focus: {
    inhale: 4000,
    hold: 4000,
    exhale: 4000,
    holdWithout: 4000,
  },

  Relaxation: {
    inhale: 4000,
    exhale: 6000,
  },
  Energy: {
    inhale: 2000,
    hold: 1000,
    exhale: 2000,
    holdWithout: 1000,
  },
} as const;

export type ProtocolName = keyof typeof protocols;
export type Protocol = (typeof protocols)[ProtocolName];
export type BreathPhase = keyof FullProtocol;

const FULL_ORDER: BreathPhase[] = ["inhale", "hold", "exhale", "holdWithout"];
const SIMPLE_ORDER: BreathPhase[] = ["inhale", "exhale"];
export const TOLERANCE_RATIO = 0.25;

type ProtocolWithPhase<P extends Protocol> = P extends FullProtocol
  ? P
  : BaseProtocol;

export function useBreathTimer(
  active: boolean,
  paused = false,
  protocolName: ProtocolName = "Focus",
) {
  const protocol = protocols[protocolName];
  const isFullProtocol = "hold" in protocol;
  const ORDER = isFullProtocol ? FULL_ORDER : SIMPLE_ORDER;
  const CYCLE_MS = ORDER.reduce((sum, p) => {
    const phase = p as keyof ProtocolWithPhase<typeof protocol>;
    return sum + (protocol[phase] || 0);
  }, 0);

  const [phase, setPhase] = useState<BreathPhase>("inhale");

  const idxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advancePhase = () => {
    idxRef.current = (idxRef.current + 1) % ORDER.length;
    const next = ORDER[idxRef.current];
    if (next) {
      setPhase(next);
    }
  };

  useEffect(() => {
    if (!active) {
      clearTimeout(timerRef.current as unknown as number);
      idxRef.current = 0;
      setPhase("inhale");
      return;
    }

    if (paused) {
      clearTimeout(timerRef.current as unknown as number);
      return;
    }

    const phaseKey = phase as keyof ProtocolWithPhase<typeof protocol>;
    const duration = protocol[phaseKey] || 0;
    timerRef.current = setTimeout(advancePhase, duration);

    return () => clearTimeout(timerRef.current as unknown as number);
  }, [active, paused, phase, protocol]);

  const phaseAt = (offsetMs: number): BreathPhase => {
    let rest = ((offsetMs % CYCLE_MS) + CYCLE_MS) % CYCLE_MS;

    for (const p of ORDER) {
      const phaseKey = p as keyof ProtocolWithPhase<typeof protocol>;
      const seg = protocol[phaseKey] || 0;
      if (rest < seg) return p;
      rest -= seg;
    }

    return "inhale";
  };

  return { phase, phaseAt };
}
