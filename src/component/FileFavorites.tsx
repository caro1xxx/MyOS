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
const FileFavorites = (props: Props) => {
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
      }}
    >
      <svg
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2521"
        width="40"
        height="40"
      >
        <path
          d="M669.781333 130.752c71.637333-11.093333 138.901333 11.477333 193.344 64.533333 55.317333 53.930667 81.834667 124.992 74.282667 199.530667-7.466667 73.642667-46.549333 146.368-112.32 210.474667-18.346667 17.898667-67.669333 66.218667-138.453333 135.637333-31.829333 31.232-65.706667 64.448-99.84 97.984L553.6 871.466667l-13.184 12.949333a40.554667 40.554667 0 0 1-56.832 0l-114.602667-112.64-24.213333-23.722667a677626.346667 677626.346667 0 0 0-145.856-142.762666C133.141333 541.184 94.08 468.48 86.613333 394.816c-7.552-74.538667 18.944-145.6 74.282667-199.530667 54.442667-53.056 121.706667-75.605333 193.344-64.533333 53.162667 8.213333 107.093333 34.688 157.781333 76.949333 50.709333-42.24 104.618667-68.736 157.781334-76.949333z"
          fill="#dbdbdb"
          p-id="2522"
        ></path>
      </svg>
    </Wrap>
  );
};

export default FileFavorites;
