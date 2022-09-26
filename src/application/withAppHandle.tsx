import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { changeMarginTopAndLeft, promoteAppToTop } from "../store/execute";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  MouseDownTopHandler,
  MouseUpTopHandler,
  MouseMoveTopHandler,
} from "../utils/AppDragHandler";

const Wrap = styled.div`
  height: 400px;
  width: 600px;
`;

const Top = styled.div`
  position: absolute;
  background-color: #e2e2e2;
  top: -25px;
  width: 100%;
  padding: 0px 10px;
  height: 25px;
  border-radius: 10px 10px 0px 0px;
  opacity: 0;
`;

const RedTopBlock = styled.div`
  background-color: red;
  display: inline-block;
  position: absolute;
  top: 5px;
  left: 10px;
  height: 12px;
  width: 12px;
  border-radius: 100px;
`;
const GreenTopBlock = styled.div`
  background-color: green;
  display: inline-block;
  position: absolute;
  top: 5px;
  left: 50px;
  height: 12px;
  width: 12px;
  border-radius: 100px;
`;
const YellowTopBlock = styled.div`
  background-color: yellow;
  display: inline-block;
  position: absolute;
  top: 5px;
  left: 30px;
  height: 12px;
  width: 12px;
  border-radius: 100px;
`;

type Props = {
  borderRadius: string;
  zIndex: number;
};

// 不同App窗口的HOC
const withAppHandle = (WapperComponent: (props: Props) => JSX.Element) => {
  const ReturnHandleApp = () => {
    const MemoWapperComponent = React.memo(WapperComponent);
    // 获取 App stack中的所有App
    const ExecuteStack = useAppSelector((state) => state.actuators.value);
    // App stack大小
    const ExecuteStackLength = ExecuteStack.length;
    const dispatch = useAppDispatch();
    // app顶部选项属性
    /**
     * 这里初始化App属性的时候需要获取store中的当前的App的样式进行初始化
     * ExecuteStackLength - 1就是stack中最近打开的App
     */
    const [attribute, setAttribute] = useState({
      marginTop: ExecuteStack[ExecuteStackLength - 1].marginTop,
      marginLeft: ExecuteStack[ExecuteStackLength - 1].marginLeft,
      initHeight: ExecuteStack[ExecuteStackLength - 1].height,
      // zIndex用于控制App的显示层级
      zIndex: ExecuteStack[ExecuteStackLength - 1].zIndex,
      // opacity:用于控制App top options的显示
      opacity: "none",
      borderRadius: "10px",
    });

    // mouse down options
    const MouseDownTop = async (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      setAttribute({
        marginTop: attribute.marginTop,
        marginLeft: attribute.marginLeft,
        initHeight: attribute.initHeight,
        zIndex: attribute.zIndex,
        opacity: "1",
        borderRadius: "0px 0px 10px 10px",
      });
      await MouseDownTopHandler(attribute, [e.pageX, e.pageY]);
      return false;
    };

    // mouse move options
    const MouseMoveTop = async (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      setAttribute({
        marginTop: attribute.marginTop,
        marginLeft: attribute.marginLeft,
        initHeight: attribute.initHeight,
        zIndex: attribute.zIndex,
        opacity: "1",
        borderRadius: "0px 0px 10px 10px",
      });
      // 这一步执行返回的结果就是鼠标move之后的marginLeft和marginTop,我们需要提交到store中
      let res = await MouseMoveTopHandler(
        attribute,
        setAttribute,
        [e.pageX, e.pageY],
        ExecuteStack[ExecuteStackLength - 1].id
      );
      // 提交
      dispatch(
        changeMarginTopAndLeft({
          left: res[0],
          top: res[1],
          id: res[2], // App唯一标识
        })
      );
      return false;
    };

    // mouse up options
    const MouseUpTop = async (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      await MouseUpTopHandler();
      return false;
    };

    // mouse leave options
    const MouseLeaveTop = async (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      await MouseUpTopHandler();
      setAttribute({
        marginTop: attribute.marginTop,
        marginLeft: attribute.marginLeft,
        initHeight: attribute.initHeight,
        zIndex: attribute.zIndex,
        opacity: "0",
        borderRadius: "10px",
      });
      return false;
    };

    // 点击App body,将当前App的zindex提升1
    const clickApp = () => {
      const id = ExecuteStack[ExecuteStackLength - 1].id;
      setAttribute({
        marginTop: attribute.marginTop,
        marginLeft: attribute.marginLeft,
        initHeight: attribute.initHeight,
        zIndex: ExecuteStack[ExecuteStackLength - 1].zIndex + 1,
        opacity: "0",
        borderRadius: "10px",
      });
      dispatch(promoteAppToTop(id));
      return false;
    };

    return (
      <Wrap
        onClick={clickApp}
        style={{
          position: "absolute",
          height: attribute.initHeight,
          marginTop: attribute.marginTop + "px",
          marginLeft: attribute.marginLeft + "px",
          zIndex: attribute.zIndex,
        }}
      >
        <Top
          onMouseLeave={(e) => MouseLeaveTop(e)}
          onMouseDown={(e) => MouseDownTop(e)}
          onMouseUp={(e) => MouseUpTop(e)}
          onMouseMove={(e) => MouseMoveTop(e)}
          style={{ opacity: attribute.opacity }}
        >
          {/* 红黄蓝options */}
          <RedTopBlock></RedTopBlock>
          <YellowTopBlock></YellowTopBlock>
          <GreenTopBlock></GreenTopBlock>
        </Top>
        <MemoWapperComponent
          // 这里的圆角是为了控制当App top options显示时,App body就应该取消左上和右上的圆角
          borderRadius={attribute.borderRadius}
          zIndex={attribute.zIndex}
        ></MemoWapperComponent>
      </Wrap>
    );
  };
  return ReturnHandleApp;
};

export default withAppHandle;
