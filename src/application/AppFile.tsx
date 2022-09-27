import React from "react";
import styled from "styled-components";
import withAppHandle from "./withAppHandle";
import { useAppSelector } from "../hooks";
import { nanoid } from "nanoid";
import SubFile from "../component/SubFile";
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

const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
  height: 100%;
`;

const Main = styled.div`
  grid-column: span 5 / auto;
`;

const TableofContents = styled.div`
  border-left: 1px solid #e5e5e5;
  padding: 0px 10px;
  height: 100%;
`;

const Path = styled.div`
  color: #0d6efd;
  font-size: 20px;
  width: 100%;
  height: 20px;
  line-height: 20px;
  padding-left: 10px;
  border-left: 5px #0d6efd solid;
  margin-bottom: 20px;
`;

const SubFileArea = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
`;

const AppFile = (props: Props) => {
  const subFile = useAppSelector((state) => state.fileState.value);
  return (
    <Wrap
      style={{
        borderRadius: props.borderRadius,
        // 控制是否高亮
        backgroundColor: props.zIndex === 10 ? "#d0d0d0bb" : "#fff",
      }}
    >
      <Body>
        <Main>
          <Path>root/</Path>
          <SubFileArea>
            {subFile.map((item, index) => {
              return <SubFile title={item.fileId} key={nanoid()}></SubFile>;
            })}
          </SubFileArea>
        </Main>
        <TableofContents>
          {/* {["Application", "Download", "Desktop", "Disk"].map((item) => {
            return <Contents key={nanoid()}>{item}</Contents>;
          })} */}
        </TableofContents>
      </Body>
    </Wrap>
  );
};

export default withAppHandle(AppFile);
