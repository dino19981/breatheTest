import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AudioSettingsState {
  socketEnabled: boolean;
  socketStatus: string;

  echoCancellation: boolean;
  noiseSuppression: boolean;
  autoGainControl: boolean;

  recordEnabled: boolean;
}

const initialState: AudioSettingsState = {
  socketEnabled: true,
  socketStatus: "disconnected",

  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,

  recordEnabled: true,
};

const audioSettingsSlice = createSlice({
  name: "audioSettings",
  initialState,
  reducers: {
    toggleSocketEnabled(state) {
      state.socketEnabled = !state.socketEnabled;
    },
    setSocketEnabled(state, action: PayloadAction<boolean>) {
      state.socketEnabled = action.payload;
    },
    setSocketStatus(state, action: PayloadAction<string>) {
      state.socketStatus = action.payload;
    },
    setAudioSetting: <
      K extends
        | "echoCancellation"
        | "noiseSuppression"
        | "autoGainControl"
        | "recordEnabled",
    >(
      state: AudioSettingsState,
      action: PayloadAction<{ key: K; value: AudioSettingsState[K] }>,
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const {
  toggleSocketEnabled,
  setSocketEnabled,
  setSocketStatus,
  setAudioSetting,
} = audioSettingsSlice.actions;

export default audioSettingsSlice.reducer;
