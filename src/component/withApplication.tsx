import React, { useState } from "react";

type Props = {
  zoomAnimation: string;
};

const withApplication = (WapperComponent: (props: Props) => JSX.Element) => {
  const Application = (props: Props) => {
    const [applicationStyle, setApplicationStyle] = useState(
      props.zoomAnimation
    );
    const MouseEnter = () => {
      setApplicationStyle("zoomIn");
    };

    const MouseLeave = () => {
      setApplicationStyle("restore");
    };

    return (
      <div onMouseEnter={MouseEnter} onMouseLeave={MouseLeave}>
        {<WapperComponent zoomAnimation={applicationStyle}></WapperComponent>}
      </div>
    );
  };
  return Application;
};

export default withApplication;
