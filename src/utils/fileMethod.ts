export const clickFolder = (obj: any) => {
  let flag = [];
  // 情况当前显示文件列表
  obj.currentShowFile = [];
  // 依次获取文件库内的所有文件
  for (let i = 0; i < obj.fileList.length; i++) {
    flag = [];
    for (let j = 0; j < obj.currentPath.length; j++) {
      if (obj.fileList[i].location[j] === obj.currentPath[j]) {
        if (obj.currentPath.length < obj.fileList[i].location.length) {
          flag.push(false);
        }
        flag.push(true);
      } else {
        flag.push(false);
      }
    }
    if (!flag.includes(false)) {
      obj.currentShowFile.push(obj.fileList[i]);
    }
  }
  return obj;
};
