import React from "react";
import styled from "styled-components";
import withAppHandle from "./withAppHandle";
import { useAppSelector, useAppDispatch } from "../hooks";
import { nanoid } from "nanoid";
import SubFile from "../component/SubFile";
import FileFavorites from "../component/FileFavorites";
import RecycleBin from "../component/RecycleBin";
import FileGoBack from "../component/FileGoBack";
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

const AppFile = (props: Props) => {
  const subFile = useAppSelector(
    (state) => state.fileState.value.currentShowFile
  );
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
          <div>
            <FileGoBack></FileGoBack>
            {subFile.map((item, index) => {
              return <SubFile {...item} key={nanoid()}></SubFile>;
            })}
          </div>
        </Main>
        <TableofContents>
          <FileFavorites></FileFavorites>
          <RecycleBin></RecycleBin>
        </TableofContents>
      </Body>
    </Wrap>
  );
};

export default withAppHandle(AppFile);
