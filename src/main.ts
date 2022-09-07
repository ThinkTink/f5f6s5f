import Lexer, { Token } from "./lexer";
import { validate, ValidationError } from "./validation";
import generateParseTree from "./parser";
import { evaluate } from "./evaluate";

export default function computeFormula(
  formula: string,
  inputData: Record<string, string>,
): string {

  const lexer = new Lexer(formula);
  const tokens: Array<Token> = lexer.lex();
  const errors: Array<ValidationError> = validate(tokens);

  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors));
  }
  const parseTree = generateParseTree(tokens);

  return evaluate(parseTree, inputData);
}

if (module === require.main) {
  // Modify to test different formulas
  console.log(computeFormula("2 * 5", {}));
  console.log();
  console.log(computeFormula("add({variable}, 4)", { variable: "8" }));
  console.log();
  console.log(computeFormula("add({x}, 3, 5) + 5", { x: "4" }));
}
