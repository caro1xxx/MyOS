import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface ExecuteStackState {
  value: number[];
}

const initialState: ExecuteStackState = {
  value: [],
};

export const ExecuteStackHandle = createSlice({
  name: "ExecuteStack",
  initialState,
  reducers: {
    increment: (state, actions) => {
      state.value = [...state.value, actions.payload];
      console.log(state.value);
    },
  },
});

export const { increment } = ExecuteStackHandle.actions;
export const selectCount = (state: RootState) => state.actuators.value;
export default ExecuteStackHandle.reducer;
