export const command = ["clear"];

// 执行指令
export const ExecuteCommand = (
  stack: React.Dispatch<React.SetStateAction<string[][]>>,
  command: string
) => {
  // 分割command
  const commandSlice = command.split(" ");
  switch (commandSlice[0]) {
    case "clear":
      return Promise.resolve();
    case "login":
      return login(commandSlice).then(
        (value) => {
          return Promise.resolve(value);
        },
        (rason) => {
          return Promise.reject(ErrorHandle(rason[0], rason[1]));
        }
      );
    default:
      return Promise.reject(ErrorCommand(command));
  }
};

// 错误指令
export const ErrorCommand = (command: string) => {
  return `command not found: ${command}`;
};

// 错误处理
export const ErrorHandle = (errorInfo: string, command: string) => {
  return `${errorInfo}:${command}`;
};

/**
 *
 * @param inputingStack setState
 * @param commandIncomplete 正在输入的指令
 * @returns
 */
// 上下查找指令
export const fillUpCommand = (
  inputingStack: React.Dispatch<React.SetStateAction<string>>,
  commandIncomplete: string
) => {
  if (commandIncomplete === "") return;
  command.map((item, index) => {
    if (item.includes(commandIncomplete)) {
      inputingStack(item);
    }
    return false;
  });
};

// tab查找指令
let currentIndex: number,
  prevIndex: number,
  currentLength: number,
  prevLength: number;
export const findCommand = (record: string[][]) => {
  let commandList: string[] = [];
  record.map((item, index) => {
    for (let i = 1; i < item.length; i++) {
      if (item[0] !== "System: ") {
        commandList.push(item[i]);
      }
    }
    currentLength = commandList.length;
    currentIndex = commandList.length - 1;
  });
  if (currentLength === prevLength) {
    if (prevIndex - 1 < 0) return "";
    prevIndex -= 1;
    return commandList[prevIndex];
  } else {
    prevLength = currentLength;
    prevIndex = currentIndex;
    return commandList[currentIndex];
  }
};

// login 指令
export const login = (commandSlice: string[]) => {
  return new Promise((resolve, reject) => {
    let loginUser = commandSlice[1];
    if (loginUser === "root") {
      return resolve(loginUser);
    } else {
      return reject(["No user found", loginUser]);
    }
  });
};

// 验证密码

export const checkPassword = (password: string) => {
  if (password === "4896") {
    return true;
  }
};
