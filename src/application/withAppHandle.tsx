import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  MouseDownTopHandler,
  MouseUpTopHandler,
  MouseMoveTopHandler,
} from "../utils/AppDragHandler";
type Props = {
  borderRadius: string;
};

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
  opacity: 1;
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

const withAppHandle = (WapperComponent: (props: Props) => JSX.Element) => {
  const ReturnHandleApp = () => {
    const MemoWapperComponent = React.memo(WapperComponent);

    // app顶部选项属性
    const [attribute, setAttribute] = useState({
      marginTop: 100,
      marginLeft: 100,
      initHeight: 300,
      opacity: "none",
      borderRadius: "10px",
    });

    // mouse enter options
    // const MouseEnterTop = async (
    //   e: React.MouseEvent<HTMLDivElement, MouseEvent>
    // ) => {
    //   const attr = { ...attribute };
    //   setAttribute({
    //     marginTop: attr.marginTop,
    //     marginLeft: attr.marginLeft,
    //     initHeight: attr.initHeight,
    //     opacity: "1",
    //     borderRadius: "0px 0px 10px 10px",
    //   });
    //   await MouseEnterTopHandler([e.clientX, e.clientY]);
    //   return false;
    // };

    // mouse down options
    const MouseDownTop = async (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      const attr = { ...attribute };
      setAttribute({
        marginTop: attr.marginTop,
        marginLeft: attr.marginLeft,
        initHeight: attr.initHeight,
        opacity: "1",
        borderRadius: "0px 0px 10px 10px",
      });
      await MouseDownTopHandler(attr, [e.pageX, e.pageY]);
      return false;
    };

    // mouse move options
    const MouseMoveTop = async (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      const attr = { ...attribute };
      setAttribute({
        marginTop: attr.marginTop,
        marginLeft: attr.marginLeft,
        initHeight: attr.initHeight,
        opacity: "1",
        borderRadius: "0px 0px 10px 10px",
      });
      await MouseMoveTopHandler(attr, setAttribute, [e.pageX, e.pageY]);
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
      const attr = { ...attribute };
      setAttribute({
        marginTop: attr.marginTop,
        marginLeft: attr.marginLeft,
        initHeight: attr.initHeight,
        opacity: "0",
        borderRadius: "10px",
      });
      return false;
    };

    return (
      <Wrap
        style={{
          height: attribute.initHeight,
          position: "absolute",
          marginTop: attribute.marginTop + "px",
          marginLeft: attribute.marginLeft + "px",
        }}
      >
        <Top
          onMouseLeave={(e) => MouseLeaveTop(e)}
          onMouseDown={(e) => MouseDownTop(e)}
          onMouseUp={(e) => MouseUpTop(e)}
          onMouseMove={(e) => MouseMoveTop(e)}
          style={{ opacity: attribute.opacity }}
        >
          <RedTopBlock></RedTopBlock>
          <YellowTopBlock></YellowTopBlock>
          <GreenTopBlock></GreenTopBlock>
        </Top>
        <MemoWapperComponent
          borderRadius={attribute.borderRadius}
        ></MemoWapperComponent>
      </Wrap>
    );
  };
  return ReturnHandleApp;
};

export default withAppHandle;
