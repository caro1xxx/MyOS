import React, { useState } from "react";
import styled from "styled-components";
import File from "../application/AppFile";
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
  const [attribute, setAttribute] = useState({
    initHeight: 300,
    opacity: "none",
  });

  return (
    <Wrap>
      <File
        initHeight={attribute.initHeight}
        opacity={attribute.opacity}
        setAttribute={setAttribute}
      ></File>
    </Wrap>
  );
};

export default ApplicationDisplayArea;
