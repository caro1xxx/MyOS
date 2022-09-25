import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { SystemHelp } from "../utils/SystemOuput";
import {
  ExecuteCommand,
  fillUpCommand,
  findCommand,
} from "../utils/SystemCommand";
type Props = {};

const Wrap = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
  position: relative;
  background-color: black;
  width: 100%;
  font-size: 18px;
  color: #12c063;
  font-weight: 500;
  font-family: "Raleway", sans-serif;
`;

const Input = styled.input`
  position: absolute;
  outline: none;
  background-color: black;
  font-size: 18px;
  border: none;
  color: #12c063;
  font-weight: 500;
  font-family: "Raleway", sans-serif;
  width: 50%;
  overflow: hidden;
`;

const Prefix = styled.div`
  position: relative;
  background-color: black;
  font-weight: 500;
  font-family: "Raleway", sans-serif;
  font-size: 18px;
  width: 100%;
  height: 1000px;
  color: #12c063;
`;

const Login = (props: Props) => {
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  const [content, setContent] = useState([
    ["System: ", "Initialization complete"],
    ["System: ", "Welcome to MyOS ! ^v^"],
    ["System: ", ...SystemHelp()],
  ]);

  const [currentInput, setCurrentInput] = useState("");

  const offsetTop = useRef(null);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.target.value);
  };
  const enter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.code) {
      case "Enter":
        // 入栈
        setContent([...content, ["Unknown@MyOS: ", currentInput]]);
        ExecuteCommand(setContent, currentInput)
          .then(
            (res) => {
              if (currentInput === "clear") {
                document.documentElement.scrollTop += (
                  offsetTop as any
                ).current.offsetTop;
              }
            },
            (rason) => {
              setContent([
                ...content,
                ["Unknown@MyOS: ", currentInput],
                ["System: ", rason],
              ]);
            }
          )
          .finally(() => {
            setCurrentInput("");
          });
        break;
      case "Tab":
        fillUpCommand(setCurrentInput, currentInput);
        break;
      case "ArrowUp":
        setCurrentInput(findCommand(content));
        break;
      case "ArrowDown":
        setCurrentInput(findCommand(content));
        break;
    }
  };

  return (
    <Wrap style={{ height: height + "px" }}>
      {content.map((item, index) => {
        return (
          <div
            key={nanoid()}
            onChange={() => {
              return false;
            }}
          >
            {item.map((item, index) => {
              return item === " " ? (
                <span key={nanoid()}>&nbsp;</span>
              ) : item === "\n" ? (
                <div key={nanoid()}>{item}</div>
              ) : item.includes("not found") ? (
                <span key={nanoid()} style={{ color: "red" }}>
                  {item}
                </span>
              ) : (
                item
              );
            })}
          </div>
        );
      })}
      <Prefix ref={offsetTop}>
        Unknown@MyOS:&nbsp;
        <Input
          value={currentInput}
          onChange={(event) => {
            inputChange(event);
          }}
          onKeyDown={(event) => {
            if (event.code === "Tab") event.preventDefault();
            enter(event);
          }}
        ></Input>
      </Prefix>
    </Wrap>
  );
};

export default Login;
