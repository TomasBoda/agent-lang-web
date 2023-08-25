# Installation and Usage

The following chapter demonstrates the installation and usage of the AgentLang interpreter.

## Installation

To install the interpreter, clone the interpreter's GitHub repository to your local machine.
```sh
git clone https://github.com/TomasBoda/agent-lang-interpreter
```
Alternatively, you can add the interpreter as a submodule to your local project.
```sh
git submodule add https://github.com/TomasBoda/agent-lang-interpreter
```

## Usage
After cloning the repository to your local project, you can import the necessary objects to your project.
```typescript
import { Interpreter, InterpreterConfiguration } from '@/agent-lang-interpreter/src';
```
To run the interpreter, create an instance of the interpreter, initialize the interpreter configuration and subscribe to the `interpret` method. You will also need to install the `rxjs` library for the subscription to work.
```typescript
const interpreter: Interpreter = new Interpreter();
const config: InterpreterConfiguration = {
    steps: 100,
    delay: 500
};

const code = 'agent person 10 {}';

subscription = interpreter.interpret(code, config).subscribe(output => {
    console.log(output);
    // do something with the output
});
```
The subscription will receive new `output` every `delay` milliseconds for `steps` times.

[**Next:** Software Specification](/documentation/software-specification)