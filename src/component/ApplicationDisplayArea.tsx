import React, { useState } from "react";
import styled from "styled-components";
import AppFile from "../application/AppFile";
type Props = {};
const Wrap = styled.div`
  /* background-color: #cacacacf; */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 5rem;
  padding: 2px;
`;
const ApplicationDisplayArea = (props: Props) => {
  const MemoAppFile = React.memo(AppFile);
  return (
    <Wrap>
      <MemoAppFile></MemoAppFile>
    </Wrap>
  );
};

export default ApplicationDisplayArea;
