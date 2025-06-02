import { BreathPhase } from "../useBreathTimer";

export type SocketStatus =
  | "Idle"
  | "Connecting"
  | "Connected"
  | "Error"
  | "Closed";
export type SocketFailure = "none" | "error" | "closed";

export interface BaseEvent {
  type: string;
  timestamp: number;
  size?: number;
  error?: Error;
}

export interface PredictionSocketPayload {
  prediction: number;
  prediction_label: string;
  confidence?: number;
  probabilities?: number[];
  inference_time?: number;
}

export interface PredictionEvent extends BaseEvent {
  type: "prediction";
  value: number;
  predictionLabel: string;
  confidence?: number;
  probabilities?: number[];
  inferenceTime?: number;
  realPhase?: BreathPhase;
  isSuccessfulPrediction?: boolean;
}

export interface FormUrlParams {
  record: boolean;
  resampleFrom: number;
  url: string;
}

export interface SetOptimisticPredictionParams {
  probabilities: number[];
  prediction: number;
  predictionLabel: string;
}
