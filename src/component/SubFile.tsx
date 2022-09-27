import React from "react";
import styled from "styled-components";
type Props = {
  title: string;
};

const Wrap = styled.div`
  font-size: 10px;
`;

const SubFile = (props: Props) => {
  return <Wrap>{props.title}</Wrap>;
};

export default SubFile;
