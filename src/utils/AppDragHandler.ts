let PrevMousePos: number[], MouseDownTopFlag: boolean;

type setAttrType = (
  value: React.SetStateAction<{
    marginTop: number;
    marginLeft: number;
    initHeight: number;
    opacity: string;
    borderRadius: string;
  }>
) => void;

type Attr = {
  marginTop: number;
  marginLeft: number;
  initHeight: number;
  opacity: string;
  borderRadius: string;
};

export const MouseDownTopHandler = (
  attribute: Attr,
  CurrentMousePos: number[]
) => {
  PrevMousePos = [];
  PrevMousePos[0] = CurrentMousePos[0] - attribute.marginLeft;
  PrevMousePos[1] = CurrentMousePos[1] - attribute.marginTop;
  MouseDownTopFlag = true;
  return Promise.resolve();
};

export const MouseMoveTopHandler = (
  attribute: Attr,
  setAttribute: setAttrType,
  CurrentMousePos: number[]
) => {
  const attr = { ...attribute };
  if (!MouseDownTopFlag) return Promise.resolve("no enter options");
  setAttribute({
    marginTop: CurrentMousePos[1] - PrevMousePos[1],
    marginLeft: CurrentMousePos[0] - PrevMousePos[0],
    initHeight: attr.initHeight,
    opacity: "1",
    borderRadius: "0px 0px 10px 10px",
  });
  return Promise.resolve();
};

export const MouseUpTopHandler = () => {
  MouseDownTopFlag = false;
  return Promise.resolve();
};
