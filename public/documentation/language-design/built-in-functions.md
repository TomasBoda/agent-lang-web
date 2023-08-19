# Built-in Functions

This chapter introduces the complete list of built-in functions of the AgentLang programming language. These functions are divided into two main categories.
- **numeric** functions
- **boolean** functions
- **agent** functions
- **special** functions

## Numeric Functions
These functions are used to calculate numeric values.

### 1. `random`
This function returns a random decimal number between the specified bounds.
#### Parameters
This function takes two parameters.
1. `min` type `number` - the lower bound of the random value
2. `max` type `number` - the upper bound of the random value

This function **returns** a value of type `number`.

### 2. `choice`
This function returns a random value chosen from the two values specified.
#### Parameters
This function takes two parameters.
1. `option_1` type `number` - the first option to choose from
2. `option_2` type `number` - the second option to choose from

This function **returns** a value of type `number`.

### 3. `sqrt`
This function returns a square root of the value specified.
#### Parameters
This function takes one parameter.
1. `value` type `number` - the value to calculate

This function **returns** a value of type `number`.

### 4. `abs`
This function returns the absolute value of the value specified.
#### Parameters
This function takes one parameter.
1. `value` type `number` - the value to calculate

This function **returns** a value of type `number`.

### 5. `floor`
This function returns the floor value of the value specified.
#### Parameters
This function takes one parameter.
1. `value` type `number` - the value to calculate

This function **returns** a value of type `number`.

### 6. `ceil`
This function returns the ceil value of the value specified.
#### Parameters
This function takes one parameter.
1. `value` type `number` - the value to calculate

This function **returns** a value of type `number`.

### 7. `round`
This function returns a rounded (whole) number of the decimal number specified.
#### Parameters
This function takes one parameter.
1. `value` type `number` - the value to round

This function **returns** a value of type `number`.

### 7. `sin`
This function returns the sine of the value specified.
#### Parameters
This function takes one parameter.
1. `value` type `number` - the value to calculate

This function **returns** a value of type `number`.

### 8. `cos`
This function returns the cosine of the value specified.
#### Parameters
This function takes one parameter.
1. `value` type `number` - the value to calculate

This function **returns** a value of type `number`.

### 9. `tan`
This function returns the tangent of the value specified.
#### Parameters
This function takes one parameter.
1. `value` type `number` - the value to calculate

This function **returns** a value of type `number`.

### 10. `pi`
This function returns the value of pi.
#### Parameters
This function takes no parameters.

This function **returns** a value of type `number`.

## Boolean Functions
These functions are used to calculate boolean values.

### 1. `choice`
This function returns a random value chosen from the two values specified.
#### Parameters
This function takes two parameters.
1. `option_1` type `boolean` - the first option to choose from
2. `option_2` type `boolean` - the second option to choose from

This function **returns** a value of type `boolean`.

### 2. `prob`
This function returns the result of a random action based on some probability.
#### Parameters
This function takes one parameter.
1. `probability` type `number` - the probability of the action, a number in the interval `[0, 1]`.

This function **returns** a value of type `boolean`.

## Agent Functions
These functions are used to calculate agent values.

### 1. `agents`
This function returns an array of agents of a certain type.
#### Parameters
This function takes one parameter.
1. `type` type `identifier` - identifier of the agent's type

This function **returns** a value of type `agents`.

### 2. `empty`
This function returns an empty array of agents. It is used to initialize `variable` properties of agents.
#### Parameters
This function takes no parameters.

This function **returns** a value of type `agents`.

### 3. `count`
This function returns the count of agents in an array of agents.
#### Parameters
This function takes one parameter.
1. `agents` type `agents` - the array of agents

This function **returns** a value of type `number`.

### 4. `filter`
This function filters an array of agents by a condition.
#### Parameters
This function takes one parameter.
1. `condition` type `lambda` - the lambda expression to filter the agents by

This function **returns** a value of type `agents`.

### 5. `max`
This function returns one agent from an array of agents with the maximum value calculated by a condition.
#### Parameters
This function takes one parameter.
1. `condition` type `lambda` - the lambda expression to calculate the agent with the maximum value

This function **returns** a value of type `agent`.

### 6. `min`
This function returns one agent from an array of agents with the minimum value calculated by a condition.
#### Parameters
This function takes one parameter.
1. `condition` type `lambda` - the lambda expression to calculate the agent with the minimum value

This function **returns** a value of type `agent`.

## Special Functions
These are special runtime functions that return runtime values.

### 7. `step`
This function returns the current step of the simulation.
#### Parameters
This function takes no parameters.

This function **returns** a value of type `number`.

[**Next:** Code Sandbox](/documentation/code-sandbox)
