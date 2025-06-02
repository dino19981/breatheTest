import { FC } from "react";
import { t } from "@lingui/core/macro";
import { BreathPhase } from "@/lib/session/hooks/useBreathTimer";

export const PhaseText: FC<{ phase: BreathPhase; active: boolean }> = ({
  phase,
  active,
}) => {
  if (!active) return null;

  function getText() {
    if (phase === "inhale") return t`Breathe in…`;
    if (phase === "exhale") return t`Breathe out…`;
    return t`Hold…`;
  }

  return <p className="text-xl font-semibold">{getText()}</p>;
};
