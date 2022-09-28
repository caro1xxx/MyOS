import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks";
import { deleteFile } from "../store/fileSystem";
type Props = {};
const Wrap = styled.div`
  height: 50%;
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RecycleBin = (props: Props) => {
  const [attribute, setAttribute] = useState("#fff");
  const dispatch = useAppDispatch();
  return (
    <Wrap
      style={{ backgroundColor: attribute }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setAttribute("#ffff");
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setAttribute("#efefef");
      }}
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
      >
        <path
          d="M230.776 818.992c0 56.512 45.623 102.616 102.138 102.616h358.172c56.515 0 102.533-46.104 102.533-102.616V409.954H230.776v409.038z m383.756-332.575c0-14.115 11.457-25.582 25.584-25.582 14.127 0 25.584 11.467 25.584 25.582V793.41c0 14.14-11.457 25.583-25.584 25.583-14.127 0-25.584-11.443-25.584-25.583V486.417z m-127.918 0c0-14.115 11.456-25.582 25.584-25.582 14.127 0 25.583 11.467 25.583 25.582V793.41c0 14.14-11.456 25.583-25.583 25.583-14.128 0-25.584-11.443-25.584-25.583V486.417z m-127.919 0c0-14.115 11.457-25.582 25.584-25.582 14.127 0 25.584 11.467 25.584 25.582V793.41c0 14.14-11.457 25.583-25.584 25.583-14.127 0-25.584-11.443-25.584-25.583V486.417z m434.726-281.124H640.116v-51.451c0-28.256-23.108-50.88-51.365-50.88H435.25c-28.258 0-50.97 22.624-50.97 50.88v51.45h-153.7c-28.258 0-50.97 22.625-50.97 50.88v51.166c0 28.256 22.687 51.45 50.931 51.45h562.932c28.231 0 51.314-23.194 51.314-51.45v-51.166c0-28.254-23.108-50.88-51.365-50.88z m-204.472 0H435.446v-25.869c0-14.139 11.258-25.297 25.387-25.297h102.334c14.128 0 25.782 11.158 25.782 25.297v25.869z"
          fill="#dbdbdb"
          p-id="3998"
        ></path>
      </svg>
    </Wrap>
  );
};

export default RecycleBin;
