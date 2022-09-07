import { removeWhitespaceTokens, Token, TokenType } from "./lexer";

export type Node = {
  token: Token;
  children: Array<Node>;
};

function getLastNode(nodes: Array<Node>): Node | undefined {
  return nodes[nodes.length - 1];
}

function insertNode(nodes: Array<Node>, node: Node): void {
  const lastNode = getLastNode(nodes);
  if (
    lastNode &&
    lastNode.token.type === TokenType.OPERATOR &&
    lastNode.children.length <= 1
  ) {
    lastNode.children.push(node);
  } else {
    nodes.push(node);
  }
}

function getFunctionParameterTokens(tokens: Array<Token>): {
  tokens: Array<Token>;
  newPosition: number;
} {
  const returnTokens: Array<Token> = [];
  const brackets: Array<string> = [];
  let i;
  for (i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === TokenType.BRACKET) {
      if (token.value === ")" && brackets[brackets.length - 1] === "(") {
        brackets.pop();

        if (brackets.length === 0) {
          i++;
          break;
        }
      }
    }
    if (token.value === "(") {
      brackets.push(token.value);
      if (i === 0) {
        continue;
      }
    }

    if (i !== 0) {
      returnTokens.push(token);
    }
  }

  return { tokens: returnTokens, newPosition: i };
}

export default function generateParseTree(tokens: Array<Token>): Array<Node> {
  const nodes: Array<Node> = [];

  const nonWhitespaceTokens = removeWhitespaceTokens(tokens);
  for (let i = 0; i < nonWhitespaceTokens.length; i++) {
    const token = nonWhitespaceTokens[i];

    if (
      [TokenType.NUMBER, TokenType.STRING, TokenType.INPUT_VARIABLE].includes(
        token.type,
      )
    ) {
      insertNode(nodes, { token, children: [] });
    } else if (token.type === TokenType.OPERATOR) {
      const lastNode = getLastNode(nodes) as Node;
      nodes.pop();
      nodes.push({ token, children: [lastNode] });
    } else if (
      [TokenType.START_QUOTE, TokenType.END_QUOTE].includes(token.type)
    ) {
      continue;
    } else if (token.type === TokenType.FUNCTION) {
      const { tokens: functionParameterTokens, newPosition } =
        getFunctionParameterTokens(nonWhitespaceTokens.slice(i + 1));
      i += newPosition;
      insertNode(nodes, {
        token,
        children: generateParseTree(functionParameterTokens),
      });
    }
  }

  return nodes;
}
