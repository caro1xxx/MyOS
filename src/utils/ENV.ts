import { nanoid } from "nanoid";
export const FILELIST = [
  {
    fileId: nanoid(),
    fileName: "Document",
    fileType: 0,
    location: ["root"],
    updateDate: "2022/02/02",
  },
  {
    fileId: nanoid(),
    fileName: "Application",
    fileType: 0,
    location: ["root"],
    updateDate: "2022/02/02",
  },
  {
    fileId: nanoid(),
    fileName: "Disk",
    fileType: 0,
    location: ["root"],
    updateDate: "2022/02/02",
  },
  {
    fileId: nanoid(),
    fileName: "Desktop",
    fileType: 0,
    location: ["root"],
    updateDate: "2022/02/02",
  },
  {
    fileId: nanoid(),
    fileName: "Download",
    fileType: 0,
    location: ["root"],
    updateDate: "2022/02/02",
  },
  {
    fileId: nanoid(),
    fileName: "MyOSConfig",
    fileType: 0,
    location: ["root", "Document"],
    updateDate: "2022/02/02",
  },
];

export const INITCURRENTPATH = "root";
