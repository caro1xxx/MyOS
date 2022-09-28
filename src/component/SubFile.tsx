import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../hooks";
import { commiteDeleteFileId, go } from "../store/fileSystem";
type Props = {
  fileId: string;
  fileName: string;
  fileType: number;
  location: string[];
  updateDate: string;
};

const Wrap = styled.div`
  font-size: 10px;
  line-height: 20px;
  text-align: left;
  border-radius: 5px;
  height: 20px;
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-gap: 10px;
  :hover {
    background-color: #e2e2e2;
    border-radius: 5px;
  }
`;

const Block = styled.div`
  grid-column: span 7 / auto;
`;

const FileName = styled.div`
  text-align: center;
  grid-column: span 3 / auto;
  text-align: left;
`;

const UpdateDate = styled.div`
  grid-column: span 2 / auto;
`;

const SubFile = (props: Props) => {
  const dispatch = useAppDispatch();
  return (
    <Wrap
      onDoubleClick={(e) => {
        dispatch(go({ path: props.fileName }));
      }}
      onDrag={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        dispatch(commiteDeleteFileId({ id: props.fileId }));
      }}
      onDragEnd={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }}
      // onDragOver={(e) => {
      //   e.stopPropagation();
      //   e.nativeEvent.stopImmediatePropagation();
      // }}
      // onDragLeave={(e) => {
      //   e.stopPropagation();
      //   e.nativeEvent.stopImmediatePropagation();
      // }}
      // onDragEnter={(e) => {
      //   e.stopPropagation();
      //   e.nativeEvent.stopImmediatePropagation();
      // }}
    >
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
      <FileName draggable="true">{props.fileName}</FileName>
      <Block></Block>
      <UpdateDate>{props.updateDate}</UpdateDate>
      <div>{props.fileType}</div>
      <div style={{ overflow: "hidden" }}>{props.location}</div>
    </Wrap>
  );
};

export default SubFile;
