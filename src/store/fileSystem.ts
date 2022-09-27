import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
interface File {
  fileId: string;
  fileName: string;
  fileType: number;
  location: string;
}

interface init {
  value: Array<File>;
}

const initialState: init = {
  value: [{ fileId: "1", fileName: "abc", fileType: 1, location: "1111" }],
};

export const fileSystem = createSlice({
  name: "fileStack",
  initialState,
  reducers: {
    createApp: (state, actions) => {},
  },
});

export const { createApp } = fileSystem.actions;
export const selectCount = (state: RootState) => state.fileState.value;
export default fileSystem.reducer;
