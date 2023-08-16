# Conditional Expressions

Sometimes we need to change the value of some property based on some condition. For this purpose, AgentLang supports conditional expressions.

## Syntax
Conditional expressions are defined using three main keywords:
1. the `if` keyword
2. the `then` keyword
3. the `else` keyword

### Condition
After the `if` keyword, we need to define the condition which will be evaluated. The condition must return a value of type `boolean`.

### Consequent
After the condition has been defined, we use the `then` keyword followed by an expression which will be evaluated and returned if the condition is satisfied. The consequent expression can return a value of any type, based on the property's datatype.

### Alternate
After the consequent expression has been defined, we use the `else` keyword followed by an expression which will be evaluated and returned if the condition is not satisfied. The alternate expression can return a value of any type, based on the property's datatype.

## Usage
To use a conditional expression to calculate a property's value, we use the following syntax.
```
dynamic isInfected = choice(true, false);

const forwardAngle = 0;
const backwardAngle = pi();

dynamic direction = if isInfected forwardAngle else backwardAngle;
```
In this example, we want the agent to move in a direction of `forwardAngle` if they are infected, otherwise in a direction of `backwardAngle`.

## Nesting
Conditional expressions can be nested without the need to use parentheses, but their usage is highly recomenned for cleaner code and readability.