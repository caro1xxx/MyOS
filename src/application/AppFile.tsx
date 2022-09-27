import React from "react";
import styled from "styled-components";
import withAppHandle from "./withAppHandle";
type Props = {
  borderRadius: string;
  zIndex: number;
};

const Wrap = styled.div`
  color: black;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
  user-select: none;
`;

const Body = styled.div``;

const AppFile = (props: Props) => {
  return (
    <Wrap
      style={{
        borderRadius: props.borderRadius,
        // 控制是否高亮
        backgroundColor: props.zIndex === 10 ? "#d0d0d0bb" : "#fff",
      }}
    >
      <Body>{props.zIndex}</Body>
    </Wrap>
  );
};

export default withAppHandle(AppFile);
