import React, { useState, useCallback } from "react";
import { useAppDispatch } from "../hooks";
import { createApp } from "../store/execute";
type Props = {
  zoomAnimation: string;
  applicationCode: number;
};

// navbar App HOC
const withApplication = (WapperComponent: (props: Props) => JSX.Element) => {
  const Application = (props: Props) => {
    const MemoWapperComponent = React.memo(WapperComponent);
    const dispatch = useAppDispatch();

    // App style
    const [applicationStyle, setApplicationStyle] = useState(
      props.zoomAnimation
    );

    // 鼠标移入
    const MouseEnter = useCallback(() => {
      setApplicationStyle("zoomIn");
    }, []);

    // 鼠标移出
    const MouseLeave = useCallback(() => {
      setApplicationStyle("restore");
    }, []);

    // 执行App
    const executeApplication = useCallback(() => {
      // 执行createApp向store新增一个App,
      // props.applicationCode:App code
      dispatch(createApp(props.applicationCode));
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
