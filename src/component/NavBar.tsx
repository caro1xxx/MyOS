import React from "react";
import styled from "styled-components";
import File from "./File";
import Setting from "./Setting";
type Props = {};

const Wrap = styled.div`
  background-color: #67e85bcf;
  position: absolute;
  top: 2rem;
  bottom: 2rem;
  width: 60px;
  border-radius: 15px;
  right: 1rem;
  border: 1px solid #abf3a4cf;
  word-wrap: break-word;
  text-align: center;
  padding: 10px 0px;
`;

const NavBar = (props: Props) => {
  return (
    <Wrap>
      <File zoomAnimation={"normal"}></File>
      <Setting zoomAnimation={"normal"}></Setting>
    </Wrap>
  );
};

export default NavBar;
