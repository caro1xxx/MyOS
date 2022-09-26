import React from "react";
import orange from "../image/orangeTree.svg";
import styled from "styled-components";
type Props = {};

const Img = styled.img`
  transform: rotate(-30deg);
`;

const BackgroundItem = (props: Props) => {
  return <Img src={orange}></Img>;
};
export default BackgroundItem;
