import { configureStore } from "@reduxjs/toolkit";
import ExecuteStackState from "./execute";
import fileSystem from "./fileSystem";

export const store = configureStore({
  reducer: {
    actuators: ExecuteStackState,
    fileState: fileSystem,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
