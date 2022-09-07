import { Node } from "./parser";
import { operate } from "./operations";
import { TokenType } from "./lexer";

type InputData = Record<string, string>;

export function evaluate(parseTree: Array<Node>, inputData: InputData): string {
  let result = "";

  for (const node of parseTree) {
    result += evaluateRecursive(node, inputData);
  }

  return result;
}

function evaluateRecursive(node: Node, input: InputData): string {
  if (!node) {
    return "";
  }

  if (
    node.token.type === TokenType.OPERATOR ||
    node.token.type === TokenType.FUNCTION
  ) {
    const inputs = node.children.map((n: Node) => evaluateRecursive(n, input));
    return operate(
      node.token.value,
      node.token.type === TokenType.FUNCTION,
      inputs,
    );
  } else if (node.token.type === TokenType.INPUT_VARIABLE) {
    return input[node.token.value] || "";
  } else if (
    node.token.type === TokenType.STRING ||
    node.token.type === TokenType.NUMBER
  ) {
    return String(node.token.value);
  }
  return "";
}
