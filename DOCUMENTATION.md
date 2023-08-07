# Introduction

## What is AgentLang
AgentLang is an interpreted programming language designed for modeling agent-based simulations. It is designed to be user-friendly, simplistic, yet powerful and able to handle large-scale agent-based models.

## Main Features
Some of the main AgentLang features include:
- multiple agent definitions
- visualisation
- mathematical calculations
- large library of built-in functions

## Usage
The interpreter for AgentLang was built in TypeScript and its usage is currently limited to TypeScript only. To run the interpreter, initialize an `Interpreter` instance and subscribe to its `interpret` method. `InterpreterConfiguration` needs to be passed to the method as well.
```typescript
const interpreter: Interpreter = new Interpreter();
const config: InterpreterConfig = { steps: 100, delay: 200 };

interpreter.interpret(code, config).subscribe(output => console.log(output));
```