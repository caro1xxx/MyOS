/**
 * PrevMousePos:上一次鼠标坐标
 * MouseDownTopFlag:mouse是否被按下
 */
let PrevMousePos: number[], MouseDownTopFlag: boolean;
type setAttrType = React.Dispatch<
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

type Attr = {
  marginTop: number;
  marginLeft: number;
  initHeight: number;
  initWidth: number;
  MaximizeFlag: boolean;
  zIndex: number;
  opacity: string;
  borderRadius: string;
};

/**
 * 鼠标按下事件处理
 * @param attribute App style
 * @param CurrentMousePos mouse pos
 * @returns Promise
 */
export const MouseDownTopHandler = (
  attribute: Attr,
  CurrentMousePos: number[]
) => {
  PrevMousePos = [];
  // 保存当前鼠标坐标
  PrevMousePos[0] = CurrentMousePos[0] - attribute.marginLeft;
  PrevMousePos[1] = CurrentMousePos[1] - attribute.marginTop;
  MouseDownTopFlag = true;
  return Promise.resolve();
};

/**
 *
 * @param attribute  App style
 * @param setAttribute set App style
 * @param CurrentMousePos mouse pos
 * @param id  current App唯一标识
 * @returns 处理完毕后的App唯一标识,marginLeft和marginTop
 */
export const MouseMoveTopHandler = (
  attribute: Attr,
  setAttribute: setAttrType,
  CurrentMousePos: number[],
  id: string
) => {
  const attr = { ...attribute };
  if (!MouseDownTopFlag) return Promise.resolve("no enter options");
  setAttribute({
    marginTop: CurrentMousePos[1] - PrevMousePos[1],
    marginLeft: CurrentMousePos[0] - PrevMousePos[0],
    initHeight: attr.initHeight,
    initWidth: attr.initWidth,
    MaximizeFlag: attr.MaximizeFlag,
    zIndex: attr.zIndex,
    opacity: "1",
    borderRadius: "0px 0px 10px 10px",
  });
  return Promise.resolve([
    CurrentMousePos[1] - PrevMousePos[1],
    CurrentMousePos[0] - PrevMousePos[0],
    id,
  ]);
};

/**
 * 鼠标松开
 * @returns
 */
export const MouseUpTopHandler = () => {
  MouseDownTopFlag = false;
  return Promise.resolve();
};
