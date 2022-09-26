import React, { useEffect, useState, Fragment } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import styled from "styled-components";
import BackgroundItem from "../component/BackgroundItem";
import NavBar from "../component/NavBar";
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
          return <BackgroundItem key={nanoid()}></BackgroundItem>;
        })}
      </Wrap>
      <NavBar></NavBar>
    </Fragment>
  );
};

export default Home;
