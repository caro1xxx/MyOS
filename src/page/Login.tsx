import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { SystemHelp } from "../utils/SystemOuput";
import { useNavigate } from "react-router-dom";
import {
  ExecuteCommand,
  fillUpCommand,
  findCommand,
  checkPassword,
  ErrorHandle,
} from "../utils/SystemCommand";
type Props = {};

const Wrap = styled.div`
  position: absolute;
  background-color: black;
  width: 100%;
  top: 0px;
  bottom: 0px;
  font-size: 18px;
  color: #12c063;
`;

const Input = styled.input`
  position: absolute;
  outline: none;
  background-color: black;
  font-size: 18px;
  border: none;
  color: #12c063;
  font-weight: 500;
  width: 50%;
  overflow: hidden;
`;

const Prefix = styled.div`
  position: relative;
  background-color: black;
  font-weight: 500;
  line-height: 20px;
  font-size: 18px;
  width: 100%;
  height: 100%;
  color: #12c063;
`;

const Login = (props: Props) => {
  // 指令记录栈
  const [content, setContent] = useState([
    ["System: ", "Initialization complete"],
    ["System: ", "Welcome to MyOS ! ^v^"],
    ["System: ", ...SystemHelp()],
  ]);

  // 输入栈
  const [currentInput, setCurrentInput] = useState("");

  // 输入框offsetTop
  const offsetTop = useRef(null);
  // 输入框改变
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.target.value);
  };
  // enter事件
  const enter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (currentInput === "" && event.code !== "ArrowUp") return;
    // 分割command
    const currentInputSlice = currentInput.split(" ");
    switch (event.code) {
      case "Enter":
        // 首先 入栈
        setContent([...content, ["Unknown@MyOS: ", currentInput]]);

        // 执行指令
        ExecuteCommand(setContent, currentInput)
          .then(
            (value) => {
              switch (currentInputSlice[0]) {
                // clear指令 => 增加滚动条高度 63 三行
                case "clear":
                  // setTop(-(offsetTop as any).current.offsetTop);
                  window.scrollTo(0, (offsetTop as any).current.offsetTop + 63);
                  break;
                // login指令 => 增加滚动条高度 21 一行
                case "login":
                  setCurrentInput("Please enter Password");
                  document.documentElement.scrollTop -= 21;
                  break;
              }
            },
            (rason) => {
              // 如果返回reject,那么保存错误信息到stack中
              setContent([
                ...content,
                ["Unknown@MyOS: ", currentInput],
                ["System: ", rason],
              ]);
              // 增加 42 两行
              document.documentElement.scrollTop -= 42;
            }
          )
          .catch((error) => {
            console.log("error:", error);
          })
          // 无论指令正确还是错误都要清空当前行的指令
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
    }
  };

  // 初始化useNavigate
  let navigate = useNavigate();
  const Verification = () => {
    if (checkPassword(currentInput)) {
      navigate("/");
    } else {
      setContent([
        ...content,
        ["System: ", ErrorHandle("Password error: ", currentInput)],
      ]);
      setCurrentInput("");
    }
  };

  return (
    <Wrap>
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
              ) : item.includes("found") ? (
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
        {/* 判断记录栈中的最新一条指令是否包含login,如果包含就说明是登录操作,那么提示输入密码 */}
        {content[content.length - 1][1].includes("login") ? (
          <span>
            <span>Please enter Password:&nbsp;</span>
            <Input
              value={currentInput}
              onChange={(event) => {
                inputChange(event);
              }}
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  Verification();
                }
              }}
              type={"password"}
            ></Input>
          </span>
        ) : (
          // 反之就是普通指令
          <span>
            <span>Unknown@MyOS:&nbsp;</span>
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
          </span>
        )}
      </Prefix>
      <div>{currentInput}</div>
    </Wrap>
  );
};

export default Login;
