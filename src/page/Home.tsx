import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
type Props = {};

const Home = (props: Props) => {
  let navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("token") === undefined) {
      // navigate("/login");
    }
  });
  return <div style={{ color: "#fff" }}>Home</div>;
};

export default Home;
