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

const AppSetting = (props: Props) => {
  return (
    <Wrap
      style={{
        borderRadius: props.borderRadius,
        backgroundColor: props.zIndex === 10 ? "#d0d0d0bb" : "#fff",
        zIndex: props.zIndex,
      }}
    >
      <div>setting</div>
    </Wrap>
  );
};

export default withAppHandle(AppSetting);
