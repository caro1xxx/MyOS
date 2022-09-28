import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { clickFolder } from "../utils/fileMethod";
import { FILELIST, INITCURRENTPATH } from "../utils/ENV";
interface File {
  fileId: string;
  fileName: string;
  fileType: number;
  location: string[];
  updateDate: string;
}

interface init {
  value: {
    fileList: Array<File>;
    currentShowFile: Array<File>;
    deleteFileId?: string;
    currentPath: string[];
    recycleFile?: Array<File>;
  };
}

const initialState: init = {
  value: {
    fileList: FILELIST,
    currentShowFile: [],
    currentPath: [INITCURRENTPATH],
    recycleFile: [],
  },
};

export const fileSystem = createSlice({
  name: "fileStack",
  initialState,
  reducers: {
    // 创建文件
    createFile: (state, actions) => {},
    // 提交需要删除文件的id
    commiteDeleteFileId: (state, actions) => {
      if (!actions.payload.id) return;
      state.value.deleteFileId = actions.payload.id;
    },
    // 删除文件
    deleteFile: (state) => {
      let res: File | null = null;
      for (let i in state.value.fileList) {
        if (state.value.fileList[i].fileId === state.value.deleteFileId) {
          res = state.value.fileList[i];
          state.value.fileList.splice(Number(i), 1);
          break;
        }
      }
      for (let i in state.value.currentShowFile) {
        if (
          state.value.currentShowFile[i].fileId === state.value.deleteFileId
        ) {
          res = state.value.currentShowFile[i];
          state.value.currentShowFile.splice(Number(i), 1);
          break;
        }
      }
      if (res === null) return;
      state.value.recycleFile?.push(res);
    },
    // 返回上一级
    goback: (state) => {
      let obj = { ...state.value };
      if (obj.currentPath.length === 1) return;
      obj.currentPath.pop();
      obj = clickFolder(obj);
      state.value = obj;
    },
    // 进入文件夹
    go: (state, actions) => {
      let obj = { ...state.value };
      // 先增加path
      obj.currentPath.push(actions.payload.path);
      obj = clickFolder(obj);
      state.value = obj;
    },
    // 初始化root文件夹列表
    initCurrentShowFile: (state) => {
      let obj = { ...state.value };
      obj = clickFolder(obj);
      state.value = obj;
    },
    // 恢复文件
    restoreFile: (state, actions) => {
      let obj = { ...state.value };
      if (!obj.recycleFile) return;
      let res: File | null = null;
      for (let i in obj.recycleFile) {
        if (obj.recycleFile[i].fileId === actions.payload.fileId) {
          res = obj.recycleFile[i];
          obj.recycleFile.splice(Number(i), 1);
          break;
        }
      }
      if (res === null) return;
      state.value.fileList.push(res);
      obj = clickFolder(obj);
      state.value = obj;
    },
  },
});

export const {
  createFile,
  commiteDeleteFileId,
  deleteFile,
  goback,
  go,
  initCurrentShowFile,
  restoreFile,
} = fileSystem.actions;
export const selectCount = (state: RootState) => state.fileState.value;
export default fileSystem.reducer;
