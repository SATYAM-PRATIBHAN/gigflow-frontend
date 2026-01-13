import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isColdStart: false,
  isLoading: false,
  requestStartTime: null,
};

const coldStartSlice = createSlice({
  name: "coldStart",
  initialState,
  reducers: {
    startColdStartDetection: (state) => {
      state.requestStartTime = Date.now();
      state.isLoading = true;
    },
    detectColdStart: (state) => {
      const elapsed = Date.now() - state.requestStartTime;
      // If request takes more than 3 seconds, assume it's a cold start
      if (elapsed > 3000) {
        state.isColdStart = true;
      }
    },
    completeColdStart: (state) => {
      state.isColdStart = false;
      state.isLoading = false;
      state.requestStartTime = null;
    },
    resetColdStart: (state) => {
      state.isColdStart = false;
      state.isLoading = false;
      state.requestStartTime = null;
    },
  },
});

export const {
  startColdStartDetection,
  detectColdStart,
  completeColdStart,
  resetColdStart,
} = coldStartSlice.actions;

export default coldStartSlice.reducer;
