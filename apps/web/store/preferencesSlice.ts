import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PreferencesState {
  language: string;
  theme: string;
  backgroundMusic: boolean;
  voiceGuides: boolean;
  breathingPace: "slow" | "medium" | "fast";
  analyticsEnabled: boolean;
  units: "metric" | "imperial";
  weekStart: "monday" | "sunday";
  voiceVolume: number;
  musicVolume: number;
  hapticsEnabled: boolean;
}

const initialState: PreferencesState = {
  language: "en",
  theme: "system",
  backgroundMusic: true,
  voiceGuides: true,
  breathingPace: "medium",
  analyticsEnabled: true,
  units: "metric",
  weekStart: "monday",
  voiceVolume: 70,
  musicVolume: 40,
  hapticsEnabled: false,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setPreference: <K extends keyof PreferencesState>(
      state: PreferencesState,
      action: PayloadAction<{ key: K; value: PreferencesState[K] }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setPreference } = preferencesSlice.actions;
export default preferencesSlice.reducer;
