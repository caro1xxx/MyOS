import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import type { RootState } from "./store";
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
    fileList: [
      {
        fileId: nanoid(),
        fileName: "Document",
        fileType: 0,
        location: ["root"],
        updateDate: "2022/02/02",
      },
      {
        fileId: nanoid(),
        fileName: "Application",
        fileType: 0,
        location: ["root"],
        updateDate: "2022/02/02",
      },
      {
        fileId: nanoid(),
        fileName: "Disk",
        fileType: 0,
        location: ["root"],
        updateDate: "2022/02/02",
      },
      {
        fileId: nanoid(),
        fileName: "Desktop",
        fileType: 0,
        location: ["root"],
        updateDate: "2022/02/02",
      },
      {
        fileId: nanoid(),
        fileName: "Download",
        fileType: 0,
        location: ["root"],
        updateDate: "2022/02/02",
      },
      {
        fileId: nanoid(),
        fileName: "MyOSConfig",
        fileType: 0,
        location: ["root", "Document"],
        updateDate: "2022/02/02",
      },
    ],
    currentShowFile: [],
    currentPath: ["root"],
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
      for (let i = 0; i < state.value.fileList.length; i++) {
        if (state.value.fileList[i].fileId === state.value.deleteFileId) {
          res = state.value.fileList[i];
          state.value.fileList.splice(i, 1);
          break;
        }
      }
      for (let i = 0; i < state.value.currentShowFile.length; i++) {
        if (
          state.value.currentShowFile[i].fileId === state.value.deleteFileId
        ) {
          res = state.value.currentShowFile[i];
          state.value.currentShowFile.splice(i, 1);
          break;
        }
      }
      if (res === null) return;
      state.value.recycleFile?.push(res);
    },
    // 返回上一级
    goback: (state) => {
      let obj = { ...state.value },
        flag = [];
      if (obj.currentPath.length === 1) return;
      obj.currentPath.pop();
      // 情况当前显示文件列表
      obj.currentShowFile = [];
      // 依次获取文件库内的所有文件
      for (let i = 0; i < obj.fileList.length; i++) {
        flag = [];
        for (let j = 0; j < obj.currentPath.length; j++) {
          if (obj.fileList[i].location[j] === obj.currentPath[j]) {
            if (obj.currentPath.length < obj.fileList[i].location.length) {
              flag.push(false);
            }
            flag.push(true);
          } else {
            flag.push(false);
          }
        }
        if (!flag.includes(false)) {
          obj.currentShowFile.push(obj.fileList[i]);
        }
      }
      state.value = obj;
    },
    // 进入文件夹
    go: (state, actions) => {
      let obj = { ...state.value },
        flag = [];
      // 先增加path
      obj.currentPath.push(actions.payload.path);
      // 情况当前显示文件列表
      obj.currentShowFile = [];
      // 依次获取文件库内的所有文件
      for (let i = 0; i < obj.fileList.length; i++) {
        flag = [];
        for (let j = 0; j < obj.currentPath.length; j++) {
          if (obj.fileList[i].location[j] === obj.currentPath[j]) {
            if (obj.currentPath.length < obj.fileList[i].location.length) {
              flag.push(false);
            }
            flag.push(true);
          } else {
            flag.push(false);
          }
        }
        if (!flag.includes(false)) {
          obj.currentShowFile.push(obj.fileList[i]);
        }
      }
      state.value = obj;
    },
    // 初始化root文件夹列表
    initCurrentShowFile: (state) => {
      let obj = { ...state.value },
        flag = [];
      // 情况当前显示文件列表
      obj.currentShowFile = [];
      // 依次获取文件库内的所有文件
      for (let i = 0; i < obj.fileList.length; i++) {
        flag = [];
        for (let j = 0; j < obj.currentPath.length; j++) {
          if (obj.fileList[i].location[j] === obj.currentPath[j]) {
            if (obj.currentPath.length < obj.fileList[i].location.length) {
              flag.push(false);
            }
            flag.push(true);
          } else {
            flag.push(false);
          }
        }
        if (!flag.includes(false)) {
          obj.currentShowFile.push(obj.fileList[i]);
        }
      }
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
} = fileSystem.actions;
export const selectCount = (state: RootState) => state.fileState.value;
export default fileSystem.reducer;
