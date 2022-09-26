import React, { useState } from "react";
import styled from "styled-components";
type Props = {
  borderRadius: string;
};

const Wrap = styled.div`
  height: 400px;
  width: 600px;
  margin-top: 100px;
  margin-left: 100px;
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

const withAppHandle = (WapperComponent: (props: Props) => JSX.Element) => {
  const ReturnHandleApp = () => {
    /**
     * 不能将File进行memo,因为File的props会随
     * 着鼠标移入移除改变,如果缓存了就失效了
     */
    const [attribute, setAttribute] = useState({
      initHeight: 300,
      opacity: "none",
      borderRadius: "10px",
    });

    const MouseEnterTop = () => {
      setAttribute({
        initHeight: 300,
        opacity: "1",
        borderRadius: "0px 0px 10px 10px",
      });
    };

    const MouseLeaveTop = () => {
      setAttribute({
        initHeight: 300,
        opacity: "0",
        borderRadius: "10px",
      });
    };

    return (
      <Wrap style={{ height: attribute.initHeight, position: "relative" }}>
        <Top
          onMouseEnter={MouseEnterTop}
          onMouseLeave={MouseLeaveTop}
          style={{ opacity: attribute.opacity }}
        >
          <RedTopBlock></RedTopBlock>
          <YellowTopBlock></YellowTopBlock>
          <GreenTopBlock></GreenTopBlock>
        </Top>
        <WapperComponent
          borderRadius={attribute.borderRadius}
        ></WapperComponent>
      </Wrap>
    );
  };
  return ReturnHandleApp;
};

export default withAppHandle;
