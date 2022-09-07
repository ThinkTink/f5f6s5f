import {
  isTokenValue,
  Token,
  removeWhitespaceTokens,
  TokenType,
} from "./lexer";

export type ValidationError = {
  token: Token;
  error: string;
};

function valueExpectedNext(previousToken: Token | undefined) {
  if (!previousToken) {
    return true;
  }

  if (
    previousToken.type === TokenType.OPERATOR ||
    previousToken.type === TokenType.COMMA ||
    (previousToken.type === TokenType.BRACKET && previousToken.value === "(")
  ) {
    return true;
  }
  return false;
}

export function validate(tokens: Array<Token>): Array<ValidationError> {
  const errors: Array<ValidationError> = [];
  const nonWhitespaceTokens: Array<Token> = removeWhitespaceTokens(tokens);
  let previousToken: Token | undefined;

  for (let i = 0; i < nonWhitespaceTokens.length; i++) {
    const token = nonWhitespaceTokens[i];
    previousToken = nonWhitespaceTokens[i - 1];

    if (token.type === TokenType.NUMBER) {
      if (!valueExpectedNext(previousToken)) {
        errors.push({
          token,
          error: `Unexpected number '${token.value}'`,
        });
      }
    }

    if (token.type === TokenType.FUNCTION) {
      if (!valueExpectedNext(previousToken)) {
        errors.push({
          token,
          error: `Unexpected function '${token.value}'`,
        });
      }
    }

    if (token.type === TokenType.START_QUOTE) {
      if (!valueExpectedNext(previousToken)) {
        errors.push({
          token,
          error: "Unexpected string",
        });
      }
    }

    if (token.type === TokenType.COMMA) {
      if (!isTokenValue(previousToken)) {
        errors.push({
          token,
          error: `Unexpected comma '${token.value}'`,
        });
      }
    }
  }

  return errors;
}
