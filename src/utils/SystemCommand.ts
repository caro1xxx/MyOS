export const command = ["clear"];

export const ExecuteCommand = (
  stack: React.Dispatch<React.SetStateAction<string[][]>>,
  command: string
) => {
  switch (command) {
    case "clear":
      return Promise.resolve();
    default:
      return Promise.reject(ErrorCommand(command));
  }
};

export const ErrorCommand = (command: string) => {
  return `command not found: ${command}`;
};

export const fillUpCommand = (
  inputingStack: React.Dispatch<React.SetStateAction<string>>,
  commandIncomplete: string
) => {
  if (commandIncomplete === "") return;
  command.map((item, index) => {
    if (item.includes(commandIncomplete)) {
      inputingStack(item);
    }
  });
};

/**
 *
 * @param direction true=>向上,false=>向下
 */
let currentIndex: number,
  prevIndex: number,
  currentLength: number,
  prevLength: number;
export const findCommand = (record: string[][]) => {
  let commandList: string[] = [];
  record.map((item, index) => {
    for (let i = 1; i < item.length; i++) {
      if (item[0] != "System: ") {
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
