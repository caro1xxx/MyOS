type setAttribute = React.Dispatch<
  React.SetStateAction<{
    marginTop: number;
    marginLeft: number;
    initHeight: number;
    initWidth: number;
    zIndex: number;
    MaximizeFlag: boolean;
    bodyOpacity: string;
    isDraggable: boolean;
    opacity: string;
    borderRadius: string;
  }>
>;

type attribute = {
  marginTop: number;
  marginLeft: number;
  initHeight: number;
  initWidth: number;
  zIndex: number;
  MaximizeFlag: boolean;
  bodyOpacity: string;
  isDraggable: boolean;
  opacity: string;
  borderRadius: string;
};

let downTopOptionsFlag: boolean, prevMouseLocation: number[];

// 鼠标移入顶部栏
export const mouseEnterTopOptions = (
  setAttribute: setAttribute,
  attribute: attribute
) => {
  setAttribute({
    marginTop: attribute.marginTop,
    marginLeft: attribute.marginLeft,
    initHeight: attribute.initHeight,
    initWidth: attribute.initWidth,
    zIndex: attribute.zIndex,
    MaximizeFlag: attribute.MaximizeFlag,
    bodyOpacity: attribute.bodyOpacity,
    isDraggable: true,
    opacity: "1",
    borderRadius: "0px 0px 10px 10px",
  });
};

// 鼠标移出顶部栏
export const mouseLeaveTopOptions = (
  setAttribute: setAttribute,
  attribute: attribute
) => {
  setAttribute({
    marginTop: attribute.marginTop,
    marginLeft: attribute.marginLeft,
    initHeight: attribute.initHeight,
    initWidth: attribute.initWidth,
    zIndex: attribute.zIndex,
    MaximizeFlag: attribute.MaximizeFlag,
    bodyOpacity: attribute.bodyOpacity,
    isDraggable: false,
    opacity: "0",
    borderRadius: "10px",
  });
};

// 鼠标按下顶部栏
export const mouseDwonTopOptions = (
  attribute: attribute,
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  downTopOptionsFlag = true;
  prevMouseLocation = [];
  prevMouseLocation[0] = e.pageX - attribute.marginLeft;
  prevMouseLocation[1] = e.pageY - attribute.marginTop;
};

// 鼠标松开顶部栏
export const mouseUpTopOptions = () => {
  downTopOptionsFlag = false;
};

// 开始拖拽
export const mouseDrag = (
  setAttribute: setAttribute,
  attribute: attribute,
  e: React.DragEvent<HTMLDivElement>
) => {
  // 如果flag没有标记,那么就不会继续执行拖拽,只有在鼠标移入了顶部栏的情况下才能进行拖拽
  if (!downTopOptionsFlag) return false;
  if (!prevMouseLocation) return false;
  setAttribute({
    marginTop: e.pageY - prevMouseLocation[1],
    marginLeft: e.pageX - prevMouseLocation[0],
    initHeight: attribute.initHeight,
    initWidth: attribute.initWidth,
    zIndex: attribute.zIndex,
    MaximizeFlag: attribute.MaximizeFlag,
    isDraggable: attribute.isDraggable,
    // 拖拽中的时候隐藏本体
    bodyOpacity: "0",
    opacity: "0",
    borderRadius: "10px",
  });
  return {
    top: e.pageY - prevMouseLocation[1],
    left: e.pageX - prevMouseLocation[0],
  };
};

// 拖拽结束
export const mouseDragEnd = (
  setAttribute: setAttribute,
  attribute: attribute,
  e: React.DragEvent<HTMLDivElement>
) => {
  if (!downTopOptionsFlag) return false;
  if (!prevMouseLocation) return false;
  setAttribute({
    marginTop: e.pageY - prevMouseLocation[1],
    marginLeft: e.pageX - prevMouseLocation[0],
    initHeight: attribute.initHeight,
    initWidth: attribute.initWidth,
    zIndex: attribute.zIndex,
    MaximizeFlag: attribute.MaximizeFlag,
    isDraggable: attribute.isDraggable,
    // 拖拽完成显示本体
    bodyOpacity: "1",
    opacity: "0",
    borderRadius: "10px",
  });
};
