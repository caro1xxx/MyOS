import React, { useState } from "react";
type Props = {
  zoomAnimation: string;
  applicationCode: number;
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

    const executeApplication = () => {
      console.log(props.applicationCode);
    };

    return (
      <div
        onMouseEnter={MouseEnter}
        onMouseLeave={MouseLeave}
        onClick={executeApplication}
      >
        {
          <WapperComponent
            zoomAnimation={applicationStyle}
            applicationCode={props.applicationCode}
          ></WapperComponent>
        }
      </div>
    );
  };
  return Application;
};

export default withApplication;
