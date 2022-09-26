import React, { useState, useCallback } from "react";
type Props = {
  zoomAnimation: string;
  applicationCode: number;
};

const withApplication = (WapperComponent: (props: Props) => JSX.Element) => {
  const Application = (props: Props) => {
    const MemoWapperComponent = React.memo(WapperComponent);

    const [applicationStyle, setApplicationStyle] = useState(
      props.zoomAnimation
    );
    const MouseEnter = useCallback(() => {
      setApplicationStyle("zoomIn");
    }, []);

    const MouseLeave = useCallback(() => {
      setApplicationStyle("restore");
    }, []);

    const executeApplication = useCallback(() => {
      console.log(props.applicationCode);
    }, []);

    return (
      <div
        onMouseEnter={MouseEnter}
        onMouseLeave={MouseLeave}
        onClick={executeApplication}
      >
        {
          <MemoWapperComponent
            zoomAnimation={applicationStyle}
            applicationCode={props.applicationCode}
          ></MemoWapperComponent>
        }
      </div>
    );
  };
  return Application;
};

export default withApplication;
