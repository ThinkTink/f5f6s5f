# Project Description

This program is a partially completed function parser. The entry point of the application is `main.ts`. The main function `computeFormula` takes in a formula as a raw string and evaluates it. This function takes in the following two parameters:

- **parameter: formula**
  - description: a raw string of the formula to be computed
  - example: `"2 + 11"`
- **parameter: inputData**
  - description: formulas can have reference variables in the format like this `"{reference}"`. This parameter is an object that contains the association between the name of the reference variable (in this example it is `reference`) and the value it gets evaluated to when the formula is calculated.
  - example: `{reference: "10"}`

Below are several examples to demonstrate the proper input format, along with what the expected output is for each:

- Input: `computeFormula("2 * 5", {})`
  - Expected output: `10`
- Input: `computeFormula("add({variable}, 4)", {variable: "8"})`
  - Expected output: `12`
- Input: `computeFormula("add({x}, 3, 5) + 5", {x: "4"})`
  - Expected output: `17`

For testing purposes, these three examples are currently being logged to the console when running the app.

# Getting Started

- System requirements
  - Node.JS >= 16.13 < 17
- Install dependencies
  ```
  yarn
  ```
- Run the program
  ```
  yarn compute
  ```

# Helpful Commands

- `yarn prettier`: Runs autoformatter to clean up your code and follow the conventions of the code base. Try to run this command before submitting your pull request!
