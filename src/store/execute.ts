import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      state.value.push({
        /**
         * 每一个创建的App的入栈信息
         */
        code: actions.payload, //app code
        id: nanoid(), //app id
        height: 400, // 初始化高度
        width: 600, //初始化宽度
        marginLeft: 100, //初始化左边距
        marginTop: 100, //初始化上边距
        zIndex: 10,
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
  },
});

export const {
  createApp,
  changeMarginTopAndLeft,
  promoteAppToTop,
  destoryApp,
} = ExecuteStackHandle.actions;
export const selectCount = (state: RootState) => state.actuators.value;
export default ExecuteStackHandle.reducer;
