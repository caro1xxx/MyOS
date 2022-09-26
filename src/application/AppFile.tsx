import React from "react";
import styled from "styled-components";
import withAppHandle from "./withAppHandle";
type Props = {
  initHeight: number;
  opacity: string;
};

const Wrap = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const File = (props: Props) => {
  return <Wrap>File</Wrap>;
};

export default withAppHandle(File);
