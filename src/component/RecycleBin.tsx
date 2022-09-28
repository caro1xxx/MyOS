import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteFile } from "../store/fileSystem";
import { nanoid } from "nanoid";
type Props = {};
const Wrap = styled.div`
  height: 50%;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`;

const RecycleFileList = styled.div`
  font-size: 12px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;

  height: 20px;
  line-height: 20px;
  span {
    overflow: hidden;
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap;
    width: 3rem;
  }
`;

const RecycleBin = (props: Props) => {
  const dispatch = useAppDispatch();
  const recycleFile = useAppSelector(
    (state) => state.fileState.value.recycleFile
  );
  return (
    <Wrap
      style={{ display: recycleFile?.length === 0 ? "flex" : "inline-block" }}
      onDrop={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        dispatch(deleteFile());
      }}
    >
      <svg
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3997"
        width="40"
        height="40"
        style={{ display: recycleFile?.length === 0 ? "inline-block" : "none" }}
      >
        <path
          d="M230.776 818.992c0 56.512 45.623 102.616 102.138 102.616h358.172c56.515 0 102.533-46.104 102.533-102.616V409.954H230.776v409.038z m383.756-332.575c0-14.115 11.457-25.582 25.584-25.582 14.127 0 25.584 11.467 25.584 25.582V793.41c0 14.14-11.457 25.583-25.584 25.583-14.127 0-25.584-11.443-25.584-25.583V486.417z m-127.918 0c0-14.115 11.456-25.582 25.584-25.582 14.127 0 25.583 11.467 25.583 25.582V793.41c0 14.14-11.456 25.583-25.583 25.583-14.128 0-25.584-11.443-25.584-25.583V486.417z m-127.919 0c0-14.115 11.457-25.582 25.584-25.582 14.127 0 25.584 11.467 25.584 25.582V793.41c0 14.14-11.457 25.583-25.584 25.583-14.127 0-25.584-11.443-25.584-25.583V486.417z m434.726-281.124H640.116v-51.451c0-28.256-23.108-50.88-51.365-50.88H435.25c-28.258 0-50.97 22.624-50.97 50.88v51.45h-153.7c-28.258 0-50.97 22.625-50.97 50.88v51.166c0 28.256 22.687 51.45 50.931 51.45h562.932c28.231 0 51.314-23.194 51.314-51.45v-51.166c0-28.254-23.108-50.88-51.365-50.88z m-204.472 0H435.446v-25.869c0-14.139 11.258-25.297 25.387-25.297h102.334c14.128 0 25.782 11.158 25.782 25.297v25.869z"
          fill="#dbdbdb"
          p-id="3998"
        ></path>
      </svg>
      <div>
        {recycleFile?.map((item) => {
          return (
            <RecycleFileList key={nanoid()}>
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1460"
                width="15"
                height="15"
              >
                <path
                  d="M855.04 385.024q19.456 2.048 38.912 10.24t33.792 23.04 21.504 37.376 2.048 54.272q-2.048 8.192-8.192 40.448t-14.336 74.24-18.432 86.528-19.456 76.288q-5.12 18.432-14.848 37.888t-25.088 35.328-36.864 26.112-51.2 10.24l-567.296 0q-21.504 0-44.544-9.216t-42.496-26.112-31.744-40.96-12.288-53.76l0-439.296q0-62.464 33.792-97.792t95.232-35.328l503.808 0q22.528 0 46.592 8.704t43.52 24.064 31.744 35.84 12.288 44.032l0 11.264-53.248 0q-40.96 0-95.744-0.512t-116.736-0.512-115.712-0.512-92.672-0.512l-47.104 0q-26.624 0-41.472 16.896t-23.04 44.544q-8.192 29.696-18.432 62.976t-18.432 61.952q-10.24 33.792-20.48 65.536-2.048 8.192-2.048 13.312 0 17.408 11.776 29.184t29.184 11.776q31.744 0 43.008-39.936l54.272-198.656q133.12 1.024 243.712 1.024l286.72 0z"
                  p-id="1461"
                  fill="#056de8"
                ></path>
              </svg>
              <span>{item.fileName}</span>
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5800"
                width="17"
                height="17"
              >
                <path
                  d="M396.8 200.533333l64 64L384 341.333333h298.666667c119.466667 0 213.333333 93.866667 213.333333 213.333334s-93.866667 213.333333-213.333333 213.333333H298.666667v-85.333333h384c72.533333 0 128-55.466667 128-128s-55.466667-128-128-128H170.666667l226.133333-226.133334z"
                  fill="#444444"
                  p-id="5801"
                ></path>
              </svg>
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6812"
                width="15"
                height="15"
              >
                <path
                  d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z"
                  fill="#444444"
                  p-id="6813"
                ></path>
              </svg>
            </RecycleFileList>
          );
        })}
      </div>
    </Wrap>
  );
};

export default RecycleBin;
