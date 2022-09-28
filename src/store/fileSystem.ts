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
  },
};

export const fileSystem = createSlice({
  name: "fileStack",
  initialState,
  reducers: {
    createFile: (state, actions) => {},
    commiteDeleteFileId: (state, actions) => {
      if (!actions.payload.id) return;
      state.value.deleteFileId = actions.payload.id;
    },
    deleteFile: (state) => {
      for (let i = 0; i < state.value.fileList.length; i++) {
        if (state.value.fileList[i].fileId === state.value.deleteFileId) {
          state.value.fileList.splice(i, 1);
          state.value.currentShowFile.splice(i, 1);
          break;
        }
      }
    },
    goback: (state) => {
      let obj = { ...state.value },
        flag = [];
      if (obj.currentPath.length === 1) return;
      obj.currentPath.pop();
      obj.currentShowFile = [];
      for (let i = 0; i < obj.fileList.length; i++) {
        // 每次循环都清空flag
        flag = [];
        // 循环currentPath
        for (let j = 0; j < obj.currentPath.length; j++) {
          // 判断location[j] === currentPath[j]
          if (obj.fileList[i].location[j] === obj.currentPath[j]) {
            flag.push(true);
          } else {
            flag.push(false);
          }
        }
        // 最终到这里flag会以数组的形式呈现,如:[true,false] 又或者[true,true,true]
        // every对flag内所有元素进行判断
        let res = flag.every((item) => {
          return item === true;
        });
        if (res) {
          obj.currentShowFile.push(obj.fileList[i]);
        }
      }
      state.value = obj;
    },
    go: (state, actions) => {
      let obj = { ...state.value },
        flag = [];
      // 先增加path
      obj.currentPath.push(actions.payload.path);
      // 情况当前显示文件列表
      obj.currentShowFile = [];
      // 依次获取文件库内的所有文件
      for (let i = 0; i < obj.fileList.length; i++) {
        // 每次循环都清空flag
        flag = [];
        // 循环currentPath
        for (let j = 0; j < obj.currentPath.length; j++) {
          // 判断location[j] === currentPath[j]
          if (obj.fileList[i].location[j] === obj.currentPath[j]) {
            flag.push(true);
          } else {
            flag.push(false);
          }
        }
        // 最终到这里flag会以数组的形式呈现,如:[true,false] 又或者[true,true,true]
        // every对flag内所有元素进行判断
        let res = flag.every((item) => {
          return item === true;
        });
        if (res) {
          obj.currentShowFile.push(obj.fileList[i]);
        }
      }
      state.value = obj;
    },
    initCurrentShowFile: (state) => {
      let obj = { ...state.value },
        flag = [];
      // 情况当前显示文件列表
      obj.currentShowFile = [];
      // 依次获取文件库内的所有文件
      for (let i = 0; i < obj.fileList.length; i++) {
        // 每次循环都清空flag
        flag = [];
        // 循环currentPath
        for (let j = 0; j < obj.currentPath.length; j++) {
          // 判断location[j] === currentPath[j]
          if (obj.fileList[i].location[j] === obj.currentPath[j]) {
            flag.push(true);
          } else {
            flag.push(false);
          }
        }
        // 最终到这里flag会以数组的形式呈现,如:[true,false] 又或者[true,true,true]
        // every对flag内所有元素进行判断
        let res = flag.every((item) => {
          return item === true;
        });
        if (res) {
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
