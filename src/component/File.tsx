import React from "react";
import withApplication from "./withApplication";
import "../style/animation.css";
type Props = {
  zoomAnimation: string;
  applicationCode: number;
};

const File = (props: Props) => {
  return (
    <svg
      className={props.zoomAnimation}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="7809"
      width={40}
      height={40}
    >
      <path
        d="M64 896V448h896v448H64zM64 256V128h256l128 128h512v128H64V256z"
        fill="#0590DF"
        p-id="7810"
      ></path>
    </svg>
  );
};

export default withApplication(File);
