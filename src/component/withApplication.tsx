import React, { useState, useCallback } from "react";
import { useAppDispatch } from "../hooks";
import { increment } from "../store/execute";
type Props = {
  zoomAnimation: string;
  applicationCode: number;
};

const withApplication = (WapperComponent: (props: Props) => JSX.Element) => {
  const Application = (props: Props) => {
    const MemoWapperComponent = React.memo(WapperComponent);
    const dispatch = useAppDispatch();

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
      dispatch(increment(props.applicationCode));
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
