export const functions: Record<string, (inputs: Array<string>) => string> = {
  upper: Upper,
  lower: Lower,
  concat: Concatenate,
  add: Add,
  subtract: Subtract,
};

export const operators: Record<string, (inputs: Array<string>) => string> = {
  "+": Add,
  "-": Subtract,
  "*": Multiply,
  "&": Concatenate,
  "/": Divide,
};

export function operate(
  operationType: string,
  isFunction: boolean,
  inputs: Array<string>,
) {
  let operateFunc;
  if (isFunction) {
    operateFunc = functions[operationType];
  } else {
    operateFunc = operators[operationType];
  }

  if (operateFunc) {
    return operateFunc(inputs);
  } else {
    return "";
  }
}

function Upper(inputs: Array<string>): string {
  if (inputs.length > 0) {
    return inputs[0].toUpperCase();
  }
  {
    return "";
  }
}

function Lower(inputs: Array<string>): string {
  if (inputs.length > 0) {
    return inputs[0].toLowerCase();
  }
  {
    return "";
  }
}

function Concatenate(inputs: Array<string>): string {
  return inputs.join("");
}

function Add(inputs: Array<string>): string {
  let sum = 0;
  for (const input of inputs) {
    sum += Number(input);
  }
  return String(sum);
}

function Subtract(inputs: Array<string>): string {
  let total = Number(inputs[0]);
  for (let i = 1; i < inputs.length; i++) {
    total -= Number(inputs[i]);
  }
  return String(total);
}

function Multiply(inputs: Array<string>): string {
  let total = Number(inputs[0]);
  for (let i = 1; i < inputs.length; i++) {
    total *= Number(inputs[i]);
  }
  return String(total);
}

function Divide(inputs: Array<string>): string {
  let total = Number(inputs[0]);
  for (let i = 1; i < inputs.length; i++) {
    total /= Number(inputs[i]);
  }
  return String(total);
}
