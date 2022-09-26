import React, { useState } from "react";
import styled from "styled-components";
import AppFile from "../application/AppFile";
import AppShell from "../application/AppShell";
import { useAppSelector } from "../hooks";
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
  // const MemoAppFile = React.memo(AppFile);
  const stack = useAppSelector((state) => state.actuators.value);
  return (
    <Wrap>
      {stack.map((item, index) => {
        return item === 0 ? (
          <AppFile></AppFile>
        ) : item === 1 ? (
          <AppShell></AppShell>
        ) : null;
      })}
    </Wrap>
  );
};

export default ApplicationDisplayArea;
