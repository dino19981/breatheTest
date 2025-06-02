import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addSession } from "@/store/sessionsSlice";
import {
  TOLERANCE_RATIO,
  protocols,
  ProtocolName,
  Protocol,
} from "./useBreathTimer";
import { mapPrediction } from "../utils/mapPrediction";
import { BreathPhase } from "./useBreathTimer";

interface Params {
  socketEnabled: boolean;
  getSessionEvents: () => any[];
  phaseAt: (offset: number) => BreathPhase;
  protocolName: ProtocolName;
  sessionStart: number;
}

export const useSessionSaver = ({
  socketEnabled,
  getSessionEvents,
  phaseAt,
  protocolName,
  sessionStart,
}: Params) => {
  const dispatch = useDispatch();

  return useCallback(() => {
    let events: any[] = [];

    if (socketEnabled) {
      const raw = getSessionEvents().filter((e) => e.type === "prediction");
      const protocol = protocols[protocolName];

      events = raw.map((e: any) => {
        const offset = e.timestamp - sessionStart;
        const expected = phaseAt(offset);
        const durMs =
          expected in protocol ? protocol[expected as keyof Protocol] : 0;
        const tolMs = durMs * TOLERANCE_RATIO;

        const phases = [
          expected,
          phaseAt(offset - tolMs),
          phaseAt(offset + tolMs),
        ].map((p) => (p === "holdWithout" ? "hold" : p));
        const predictedPhase = mapPrediction(e.value);
        const mappedPrediction =
          predictedPhase === "holdWithout" ? "hold" : predictedPhase;
        const ok = phases.includes(mappedPrediction ?? "hold");

        return {
          ...e,
          actualPhase: e.predictionLabel,
          expectedPhase: expected,
          isCorrect: ok,
        };
      });
    }

    dispatch(
      addSession({
        id: uuidv4(),
        createdAt: Date.now(),
        events,
        isCorrect: events.length ? events.every((ev) => ev.isCorrect) : true,
      }),
    );
  }, [
    socketEnabled,
    getSessionEvents,
    phaseAt,
    protocolName,
    sessionStart,
    dispatch,
  ]);
};
