import { useCallback, useRef, useState, useEffect } from "react";
import { BreathPhase } from "./useBreathTimer";
import {
  SocketStatus,
  SocketFailure,
  BaseEvent,
  PredictionSocketPayload,
  PredictionEvent,
  SetOptimisticPredictionParams,
} from "./types/breathSocket.types";
import {
  OPTIMISTIC_PREDICTION_PROBABILITY_THRESHOLD,
  WEBSOCKET_BASE_URL,
} from "@/lib/constants";
import { formUrl } from "./utils/breathSocket.utils";
import { mapPhaseToPrediction } from "@/components/breath-circle/utils";
import { bn } from "@/utils/common";

export function useBreathSocket({
  currentPhase,
}: {
  currentPhase: BreathPhase;
}) {
  const [socketStatus, setSocketStatus] = useState<SocketStatus>("Idle");
  const [socketFailure, setSocketFailure] = useState<SocketFailure>("none");

  const [prediction, setPrediction] = useState<number | null>(null);
  const [predictionIdx, setPredictionIdx] = useState<number | null>(null);
  const [predictionLabel, setPredictionLabel] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const sessionEventsRef = useRef<BaseEvent[]>([]);
  const predictionEventsRef = useRef<PredictionEvent[]>([]);

  const processAndSetPrediction = useCallback(
    (predictionData: PredictionSocketPayload) => {
      if (typeof predictionData.prediction !== "number") return;

      setOptimisticPrediction({
        probabilities: predictionData.probabilities ?? [],
        prediction: predictionData.prediction,
        predictionLabel: predictionData.prediction_label,
      });

      const ev: PredictionEvent = {
        type: "prediction",
        value: predictionData.prediction,
        predictionLabel: predictionData.prediction_label,
        confidence: predictionData.confidence,
        probabilities: predictionData.probabilities,
        inferenceTime: predictionData.inference_time,
        timestamp: Date.now(),
        realPhase: currentPhase,
        isSuccessfulPrediction:
          prediction === mapPhaseToPrediction[currentPhase],
      };

      sessionEventsRef.current.push(ev);
      predictionEventsRef.current.push(ev);
    },
    [currentPhase],
  );

  const setOptimisticPrediction = useCallback(
    ({
      probabilities,
      prediction,
      predictionLabel,
    }: SetOptimisticPredictionParams) => {
      function handlePhasePrediction(probIndex: number, label: string) {
        // console.log("probabilities", {
        //   inhaleProb: probabilities[1],
        //   exhaleProb: probabilities[2],
        //   holdProb: probabilities[0],
        // });
        const prob = probabilities[probIndex] ?? 0;
        const lastEvent = predictionEventsRef.current.at(-1);
        // if (currentPhase !== lastEvent?.realPhase) {
        //   setPrediction(probIndex);
        //   setPredictionLabel(label);
        //   setPredictionIdx(probIndex);
        //   return true;
        // }

        const isOptimisticPredicted = bn(prob).gt(
          OPTIMISTIC_PREDICTION_PROBABILITY_THRESHOLD,
        );
        // console.log("isOptimisticPredicted", isOptimisticPredicted);
        if (isOptimisticPredicted) {
          setPrediction(probIndex);
          setPredictionLabel(label);
          setPredictionIdx((index) => (index || 0) + 1);
          return true;
        }

        return false;
      }

      // console.log("sessionEventsRef", sessionEventsRef.current);

      if (currentPhase === "inhale" && handlePhasePrediction(1, "inhale")) {
        return;
      }

      if (currentPhase === "exhale" && handlePhasePrediction(2, "exhale")) {
        return;
      }

      if (
        (currentPhase === "hold" || currentPhase === "holdWithout") &&
        handlePhasePrediction(0, "hold")
      ) {
        return;
      }

      console.log("predictionLabel", predictionLabel);
      setPrediction(prediction);
      setPredictionLabel(predictionLabel);
      setPredictionIdx((index) => (index || 0) + 1);
    },
    [currentPhase],
  );

  const connectSocket = useCallback(
    ({
      skipRecording = false,
      inputDeviceSampleRate,
    }: {
      skipRecording?: boolean;
      inputDeviceSampleRate: number;
    }) => {
      if (
        wsRef.current &&
        (wsRef.current.readyState === WebSocket.OPEN ||
          wsRef.current.readyState === WebSocket.CONNECTING)
      ) {
        return;
      }

      const url = formUrl({
        record: !skipRecording,
        resampleFrom: inputDeviceSampleRate,
        url: WEBSOCKET_BASE_URL,
      });

      const ws = new WebSocket(url);
      wsRef.current = ws;
      setSocketStatus("Connecting");

      ws.onopen = () => {
        setSocketStatus("Connected");
        sessionEventsRef.current.push({
          type: "connected",
          timestamp: Date.now(),
        });
      };

      ws.onerror = (err) => {
        console.error("[useBreathSocket] WebSocket error:", err);
        setSocketStatus("Error");
        setSocketFailure("error");
        sessionEventsRef.current.push({
          type: "error",
          error: new Error("WebSocket error:" + err),
          timestamp: Date.now(),
        });
      };

      ws.onclose = () => {
        setSocketStatus("Closed");
        setSocketFailure("closed");
        sessionEventsRef.current.push({
          type: "closed",
          timestamp: Date.now(),
        });
      };
    },
    [],
  );

  useEffect(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.onmessage = (event) => {
        try {
          const data: PredictionSocketPayload = JSON.parse(event.data);
          processAndSetPrediction(data);
        } catch (err) {
          console.warn("[useBreathSocket] JSON parse error:", err);
        }
      };
    }
  }, [processAndSetPrediction, wsRef.current?.readyState]);

  const disconnectSocket = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setSocketStatus("Closed");
      setPrediction(null);
      setPredictionIdx(null);
      setPredictionLabel(null);
    }
  }, []);

  const sendAudioData = useCallback((buffer: ArrayBuffer) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(buffer);
      // sessionEventsRef.current.push({
      //   type: "audio_sent",
      //   size: buffer.byteLength,
      //   timestamp: Date.now(),
      // });
    }
  }, []);

  const getSessionEvents = useCallback(() => sessionEventsRef.current, []);

  return {
    socketStatus,
    socketFailure,
    prediction,
    predictionIdx,
    predictionLabel,
    connectSocket,
    disconnectSocket,
    sendAudioData,
    getSessionEvents,
  };
}
