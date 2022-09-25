export const SystemHelp = () => {
  // 头行
  let result = ["\n"];
  for (let i = 0; i < 43; i++) {
    result.push("-");
  }
  result.push("\n");
  result.push("|");
  for (let i = 0; i < 10; i++) {
    result.push(" ");
  }
  result.push("command");
  for (let i = 0; i < 10; i++) {
    result.push(" ");
  }
  result.push("|");
  for (let i = 0; i < 10; i++) {
    result.push(" ");
  }
  result.push("effect");
  for (let i = 0; i < 10; i++) {
    result.push(" ");
  }
  result.push("|");
  result.push("\n");
  for (let i = 0; i < 43; i++) {
    result.push("-");
  }

  // 内容1
  result.push("\n");
  result.push("|");
  for (let i = 0; i < 10; i++) {
    result.push(" ");
  }
  result.push("- adduser");
  for (let i = 0; i < 10; i++) {
    result.push(" ");
  }
  result.push("|");
  for (let i = 0; i < 6; i++) {
    result.push(" ");
  }
  result.push("Create User");
  for (let i = 0; i < 4; i++) {
    result.push(" ");
  }
  result.push("|");
  result.push("\n");
  for (let i = 0; i < 43; i++) {
    result.push("-");
  }

  // 内容2
  result.push("\n");
  result.push("|");
  for (let i = 0; i < 10; i++) {
    result.push(" ");
  }
  result.push("- login");
  for (let i = 0; i < 14; i++) {
    result.push(" ");
  }
  result.push("|");
  for (let i = 0; i < 2; i++) {
    result.push(" ");
  }
  result.push("Enter the system");
  for (let i = 0; i < 1; i++) {
    result.push(" ");
  }
  result.push("|");
  result.push("\n");
  for (let i = 0; i < 43; i++) {
    result.push("-");
  }

  // 内容3
  result.push("\n");
  result.push("|");
  for (let i = 0; i < 10; i++) {
    result.push(" ");
  }
  result.push("- clear");
  for (let i = 0; i < 14; i++) {
    result.push(" ");
  }
  result.push("|");
  for (let i = 0; i < 5; i++) {
    result.push(" ");
  }
  result.push("Clear screen");
  for (let i = 0; i < 5; i++) {
    result.push(" ");
  }
  result.push("|");
  result.push("\n");
  for (let i = 0; i < 43; i++) {
    result.push("-");
  }

  return result;
};
