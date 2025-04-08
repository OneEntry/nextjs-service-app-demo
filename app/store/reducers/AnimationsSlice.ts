'use client';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type InitialStateType = {
  readyState: boolean;
};

const initialState: InitialStateType = {
  readyState: false,
};

export const animationsSlice = createSlice({
  name: 'animations-slice',
  initialState,
  reducers: {
    setReadyState(state, action: PayloadAction<{ value: boolean }>) {
      state.readyState = action.payload.value;
    },
  },
});

export const { setReadyState } = animationsSlice.actions;

export const getReadyState = (state: {
  animationsReducer: {
    readyState: boolean;
  };
}) => state.animationsReducer;

export default animationsSlice.reducer;
