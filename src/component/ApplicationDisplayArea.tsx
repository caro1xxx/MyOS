import React from "react";
import styled from "styled-components";
import AppFile from "../application/AppFile";
import AppShell from "../application/AppShell";
import { useAppSelector } from "../hooks";
type Props = {};
const Wrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 5rem;
  padding: 2px;
`;
const ApplicationDisplayArea = (props: Props) => {
  // 获取App stack中的所有项
  const ExecuteStack = useAppSelector((state) => state.actuators.value);
  return (
    <Wrap>
      {/* 渲染所以项 */}
      {ExecuteStack.map((item, index) => {
        // item.code:每个App的唯一标识(不是App code)
        /**
         * 0 :文件夹
         * 1 :设置
         * 0 :shell
         * ...
         */
        return item.code === 0 ? (
          // borderRadius:控制鼠标是否移入App top options
          <AppFile key={item.id} {...item} borderRadius={"10px"}></AppFile>
        ) : item.code === 1 ? (
          <AppShell key={item.id} {...item} borderRadius={"10px"}></AppShell>
        ) : null;
      })}
    </Wrap>
  );
};

export default ApplicationDisplayArea;
