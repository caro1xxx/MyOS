import React, { useEffect, useState, Fragment } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import styled from "styled-components";
import BackgroundItem from "../component/BackgroundItem";
import NavBar from "../component/NavBar";
import ApplicationDisplatArea from "../component/ApplicationDisplayArea";
import { useAppDispatch } from "../hooks";
import { exitMaximize } from "../store/execute";
type Props = {};

const Wrap = styled.div`
  background-color: #aad9a6;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: -10;
`;

const Home = (props: Props) => {
  // memo 优化
  const MemoApplicationDisplayArea = React.memo(ApplicationDisplatArea);
  const MemoNavBar = React.memo(NavBar);
  const MemoBackgroundItem = React.memo(BackgroundItem);
  const dispatch = useAppDispatch();
  const [renderNumber, setRenderNumber] = useState({
    sumNumber: [0],
  });

  useEffect(() => {
    setRenderNumber({
      sumNumber: [
        ...new Array(
          Number.parseInt(
            (document.documentElement.clientHeight / 100) *
              (document.documentElement.clientWidth / 100) +
              ""
          )
        ).fill(0),
      ],
    });
    /**
     * 这个Effect是为了监听App的最小化事件[shfit + Q],如果监听到那么就提交退出最大化
     */
    document.onkeydown = function (e) {
      if (e.code === "ShiftLeft") {
        document.onkeydown = function (e) {
          if (e.code === "KeyQ") {
            dispatch(exitMaximize());
          }
        };
      }
    };
    // 销毁
    return () => {
      document.onkeydown = null;
    };
  }, []);

  // let navigate = useNavigate();
  // useEffect(() => {
  //   if (Cookies.get("token") === undefined) {
  //     navigate("/login");
  //   }
  // });

  return (
    <Fragment>
      <Wrap>
        {renderNumber.sumNumber.map((item, index) => {
          return <MemoBackgroundItem key={nanoid()}></MemoBackgroundItem>;
        })}
      </Wrap>
      <MemoNavBar></MemoNavBar>
      <MemoApplicationDisplayArea></MemoApplicationDisplayArea>
    </Fragment>
  );
};

export default Home;
