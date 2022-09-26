import { configureStore } from "@reduxjs/toolkit";
import ExecuteStackState from "./execute";

export const store = configureStore({
  reducer: {
    actuators: ExecuteStackState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
