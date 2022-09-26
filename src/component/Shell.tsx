import React from "react";
import withApplication from "./withApplication";
type Props = {
  zoomAnimation: string;
  applicationCode: number;
};

const Shell = (props: Props) => {
  return (
    <svg
      className={props.zoomAnimation}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="11969"
      width="40"
      height="40"
    >
      <path
        d="M917.504 835.584H106.496V188.416h810.496l0.512 647.168zM186.88 755.2h650.752v-486.4H186.88v486.4z"
        fill="#2B85FB"
        p-id="11970"
      ></path>
      <path
        d="M343.04 648.704l-56.32-56.32 88.064-88.064L286.72 415.744l56.32-56.832 144.896 144.896L343.04 648.704z m163.84-63.488h230.4v79.872H506.88v-79.872z"
        fill="#2B85FB"
        p-id="11971"
      ></path>
    </svg>
  );
};

export default withApplication(Shell);
