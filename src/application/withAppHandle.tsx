import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  changeMarginTopAndLeft,
  promoteAppToTop,
  destoryApp,
  MarkAppMaximize,
} from "../store/execute";
import {
  mouseEnterTopOptions,
  mouseLeaveTopOptions,
  mouseDwonTopOptions,
  mouseUpTopOptions,
  mouseDrag,
  mouseDragEnd,
} from "../utils/AppDragHandler";
import { useAppDispatch } from "../hooks";
import { getScreenAreaAvailable, executeMaximize } from "../utils/AppRelated";

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
  code: number;
  id: string;
  height: number;
  width: number;
  marginLeft: number;
  marginTop: number;
  zIndex: number;
  MaximizeFlag: boolean;
};

// 不同App窗口的HOC
const withAppHandle = (WapperComponent: (props: Props) => JSX.Element) => {
  const ReturnHandleApp = (props: Props) => {
    const MemoWapperComponent = React.memo(WapperComponent);
    const dispatch = useAppDispatch();

    // 监听MaximizeFlag是否被标记,如果MaximizeFlag产生变化说明窗口被缩小了
    // 那么就重新获取stack中App原来的坐标
    useEffect(() => {
      if (!props.MaximizeFlag) {
        setAttribute({
          marginTop: props.marginTop,
          marginLeft: props.marginLeft,
          initHeight: props.height,
          initWidth: props.width,
          zIndex: props.zIndex,
          MaximizeFlag: props.MaximizeFlag,
          bodyOpacity: "1",
          isDraggable: false,
          opacity: "none",
          borderRadius: "10px",
        });
      }
    }, [props.MaximizeFlag]);
    /**
     * app顶部选项属性
     *
     * 这里初始化App属性的时候需要获取store中的当前的App的样式进行初始化
     */
    const [attribute, setAttribute] = useState({
      marginTop: props.marginTop,
      marginLeft: props.marginLeft,
      initHeight: props.height,
      initWidth: props.width,
      // zIndex用于控制App的显示层级
      zIndex: props.zIndex,
      MaximizeFlag: props.MaximizeFlag,
      // opacity:用于控制App top options的显示
      opacity: "none",
      bodyOpacity: "none",
      isDraggable: false,
      borderRadius: "10px",
    });

    // 点击App body,将当前App的zindex提升1
    const clickApp = () => {
      if (props.zIndex === 11) return false;
      // 提交该App
      dispatch(promoteAppToTop({ id: props.id }));
      return false;
    };

    // 最大化
    const maximize = async () => {
      let result = await getScreenAreaAvailable();
      // 执行最大化
      await executeMaximize(result, attribute, setAttribute);
      // 提交该App最大化
      dispatch(MarkAppMaximize({ id: props.id }));
    };

    return (
      <Wrap
        draggable={attribute.isDraggable}
        onDrag={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          let res = mouseDrag(setAttribute, attribute, e);
          // changeMarginTopAndLeft({
          //   id: props.id,
          //   left: res.left,
          //   top: res.top,
          // });
        }}
        onDragEnd={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          mouseDragEnd(setAttribute, attribute, e);
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          e.preventDefault();
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          clickApp();
        }}
        style={{
          position: "absolute",
          height: attribute.initHeight,
          width: attribute.initWidth,
          marginTop: attribute.marginTop + "px",
          marginLeft: attribute.marginLeft + "px",
          zIndex: props.zIndex,
          opacity: attribute.bodyOpacity,
        }}
      >
        <Top
          style={{ opacity: attribute.opacity }}
          onMouseEnter={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            mouseEnterTopOptions(setAttribute, attribute);
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            mouseLeaveTopOptions(setAttribute, attribute);
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            mouseDwonTopOptions(attribute, e);
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            mouseUpTopOptions();
          }}
        >
          {/* 红黄蓝options */}
          <RedTopBlock
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              dispatch(destoryApp({ id: props.id }));
            }}
          ></RedTopBlock>
          <YellowTopBlock></YellowTopBlock>
          <GreenTopBlock
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              maximize();
            }}
          ></GreenTopBlock>
        </Top>
        <MemoWapperComponent
          MaximizeFlag={attribute.MaximizeFlag}
          borderRadius={attribute.borderRadius}
          zIndex={props.zIndex}
          id={props.id}
          height={attribute.initHeight}
          code={props.code}
          marginLeft={attribute.marginLeft}
          marginTop={attribute.marginTop}
          width={props.width}
        ></MemoWapperComponent>
      </Wrap>
    );
  };
  return ReturnHandleApp;
};

export default withAppHandle;
