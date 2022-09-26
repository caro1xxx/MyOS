import React from "react";
import styled from "styled-components";
type Props = {
  initHeight: number;
  opacity: string;
  setAttribute: React.Dispatch<
    React.SetStateAction<{
      initHeight: number;
      opacity: string;
    }>
  >;
};

const Wrap = styled.div`
  height: 400px;
  width: 600px;
`;

const Top = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
  height: 25px;
  border-radius: 10px 10px 0px 0px;
  opacity: 0;
`;

const RedTopBlock = styled.div`
  background-color: red;
  display: inline-block;
  position: absolute;
  top: 4px;
  left: 10px;
  height: 15px;
  width: 15px;
  border-radius: 100px;
`;
const GreenTopBlock = styled.div`
  background-color: green;
  display: inline-block;
  position: absolute;
  top: 4px;
  left: 50px;
  height: 15px;
  width: 15px;
  border-radius: 100px;
`;
const YellowTopBlock = styled.div`
  background-color: yellow;
  display: inline-block;
  position: absolute;
  top: 4px;
  left: 30px;
  height: 15px;
  width: 15px;
  border-radius: 100px;
`;

const withAppHandle = (WapperComponent: (props: Props) => JSX.Element) => {
  const returnHandleApp = (props: Props) => {
    const MouseEnterTop = () => {
      props.setAttribute({
        initHeight: 300,
        opacity: "1",
      });
    };

    const MouseLeaveTop = () => {
      props.setAttribute({
        initHeight: 300,
        opacity: "0",
      });
    };

    return (
      <Wrap style={{ height: props.initHeight, position: "relative" }}>
        <Top
          onMouseEnter={MouseEnterTop}
          onMouseLeave={MouseLeaveTop}
          style={{ opacity: props.opacity }}
        >
          <RedTopBlock></RedTopBlock>
          <YellowTopBlock></YellowTopBlock>
          <GreenTopBlock></GreenTopBlock>
        </Top>
        <WapperComponent {...props}></WapperComponent>
      </Wrap>
    );
  };
  return returnHandleApp;
};

export default withAppHandle;
