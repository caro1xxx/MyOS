import React from "react";
import styled from "styled-components";
import File from "./File";
import Setting from "./Setting";
import Shell from "./Shell";
type Props = {};

const Wrap = styled.div`
  background-color: #cacacacf;
  position: absolute;
  top: 2rem;
  bottom: 2rem;
  width: 60px;
  border-radius: 15px;
  right: 1rem;
  border: 1px solid #ddddddcf;
  word-wrap: break-word;
  text-align: center;
  padding: 10px 0px;
`;

const NavBar = (props: Props) => {
  return (
    <Wrap>
      <File zoomAnimation={"normal"} applicationCode={0}></File>
      <Setting zoomAnimation={"normal"} applicationCode={1}></Setting>
      <Shell zoomAnimation={"normal"} applicationCode={2}></Shell>
    </Wrap>
  );
};

export default NavBar;
