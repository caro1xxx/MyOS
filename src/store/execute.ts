import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { nanoid } from "nanoid";
interface Item {
  code: number;
  id: string;
  height: number;
  width: number;
  marginLeft: number;
  marginTop: number;
  zIndex: number;
  MaximizeFlag: boolean;
}

interface init {
  value: Array<Item>;
}

const initialState: init = {
  value: [],
};

export const ExecuteStackHandle = createSlice({
  name: "ExecuteStack",
  initialState,
  reducers: {
    createApp: (state, actions) => {
      // 先将stack中的所有App图层降级
      state.value.forEach((item, index) => {
        state.value[index].zIndex = 10;
      });
      state.value.push({
        /**
         * 每一个创建的App的入栈信息
         */
        code: actions.payload, //app code
        id: nanoid(), //app id
        height: document.documentElement.clientHeight / 2, // 初始化高度
        width: document.documentElement.clientWidth / 2, //初始化宽度
        marginLeft: document.documentElement.clientWidth / 5, //初始化左边距
        marginTop: document.documentElement.clientHeight / 5, //初始化上边距
        zIndex: 11,
        MaximizeFlag: false,
      });
    },
    // 提交App的marginTop和marginLeft变化
    changeMarginTopAndLeft: (state, action) => {
      const marginTopAndLeft = { ...action.payload };
      state.value.forEach((item, index) => {
        if (marginTopAndLeft.id === item.id) {
          item.marginLeft = marginTopAndLeft.left;
          item.marginTop = marginTopAndLeft.top;
        }
      });
    },
    // 提升App 的 z-index,相当于将该id的App置于最顶层
    // 并且要遍历所有App,将除该App之外的App zindex置为10
    promoteAppToTop: (state, action) => {
      state.value.forEach((item, index) => {
        if (action.payload.id === item.id) {
          state.value[index].zIndex = 11;
        } else {
          state.value[index].zIndex = 10;
        }
      });
    },
    // 销毁App
    destoryApp: (state, action) => {
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].id === action.payload.id) {
          state.value.splice(i, 1);
          break;
        }
      }
    },
    // 标记该App全屏
    MarkAppMaximize: (state, action) => {
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].id === action.payload.id) {
          state.value[i].MaximizeFlag = true;
          break;
        }
      }
    },
    // 退出全屏
    exitMaximize: (state) => {
      for (let i = 0; i < state.value.length; i++) {
        if (state.value[i].MaximizeFlag) {
          state.value[i].MaximizeFlag = false;
          break;
        }
      }
    },
  },
});

export const {
  createApp,
  changeMarginTopAndLeft,
  promoteAppToTop,
  destoryApp,
  exitMaximize,
  MarkAppMaximize,
} = ExecuteStackHandle.actions;
export const selectCount = (state: RootState) => state.actuators.value;
export default ExecuteStackHandle.reducer;
