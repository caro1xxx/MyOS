import React, { useCallback } from "react";
import styled from "styled-components";
import withAppHandle from "./withAppHandle";
type Props = {
  borderRadius: string;
};

const Wrap = styled.div`
  background-color: white;
  color: black;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
`;

const Body = styled.div``;

const AppShell = (props: Props) => {
  return (
    <Wrap style={{ borderRadius: props.borderRadius }}>
      {/* <Body>{stack}</Body> */}
      <div>shell</div>
    </Wrap>
  );
};

export default withAppHandle(AppShell);
