import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
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
  value: [
    {
      fileId: nanoid(),
      fileName: "Document/",
      fileType: 0,
      location: "root/",
    },
    {
      fileId: nanoid(),
      fileName: "Application/",
      fileType: 0,
      location: "root/",
    },
    {
      fileId: nanoid(),
      fileName: "Disk/",
      fileType: 0,
      location: "root/",
    },
    {
      fileId: nanoid(),
      fileName: "Desktop/",
      fileType: 0,
      location: "root/",
    },
    {
      fileId: nanoid(),
      fileName: "Download/",
      fileType: 0,
      location: "root/",
    },
  ],
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
