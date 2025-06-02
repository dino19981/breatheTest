import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SessionEvent = {
  type: string;
  timestamp: number;
  confidence: number;
  inferenceTime: number;
  isCorrect: boolean;
  phase: string;
  predictionLabel: string;
  probabilities: number[];
  value: number;
  actualPhase: string;
  expectedPhase: string;
};

export type Session = {
  id: string;
  createdAt: number;
  events: SessionEvent[];
  isCorrect: boolean;
};

type State = {
  sessions: Session[];
  isBreathSessionActive: boolean;
};

const initialState: State = {
  sessions: [],
  isBreathSessionActive: false,
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,

  reducers: {
    addSession: (state, action: PayloadAction<Session>) => {
      state.sessions.push(action.payload);
    },
    resetSessions: (state) => {
      state.sessions = [];
    },
    setSessionActive(state, action) {
      state.isBreathSessionActive = action.payload;
    },
  },
});

export const { addSession, resetSessions, setSessionActive } =
  sessionsSlice.actions;
export default sessionsSlice.reducer;
