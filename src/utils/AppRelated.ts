export const getScreenAreaAvailable = () => {
  return Promise.resolve({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth,
  });
};

type attr = {
  marginTop: number;
  marginLeft: number;
  initHeight: number;
  initWidth: number;
  MaximizeFlag: boolean;
  zIndex: number;
  opacity: string;
  borderRadius: string;
};

type setAttr = React.Dispatch<
  React.SetStateAction<{
    marginTop: number;
    marginLeft: number;
    initHeight: number;
    initWidth: number;
    MaximizeFlag: boolean;
    zIndex: number;
    opacity: string;
    borderRadius: string;
  }>
>;

export const executeMaximize = (
  value: { height: number; width: number },
  attribute: attr,
  setAttribute: setAttr
) => {
  let incrementalWidth: number = value.width - attribute.initWidth;
  let incrementalHeight: number = value.height - attribute.initHeight;
  setAttribute({
    marginTop: 0,
    marginLeft: 0,
    initHeight: attribute.initHeight + incrementalHeight,
    initWidth: attribute.initWidth + incrementalWidth,
    MaximizeFlag: true,
    zIndex: attribute.zIndex,
    opacity: "1",
    borderRadius: "0px 0px 10px 10px",
  });
  return false;
};
