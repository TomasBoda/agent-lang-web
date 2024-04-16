# Core Library
The AgentLang's core library consists of several built-in functions necessary for agent manipulation as well as mathematical calculations. Below is the complete list of built-in functions and their usage.

## Mathematical Functions
`sqrt(number): number` - calculates the square root of a numeric value.

`abs(number): number` - calculates the absolute value of a numeric value.

`floor(number): number` - calculates the floor value of a decimal numeric value.

`ceil(number): number` - calculates the ceil value of a decimal numeric value.

`round(number): number` - calculates the rounded value of a decimal numeric value.

`sin(number): number` - calculates the sine value of a numeric value.

`cos(number): number` - calculates the cosine value of a numeric value.

`tan(number): number` - calculates the tangent value of a numeric value.

`atan(number): number` - calculates the arc tangent value of a numeric value.

`pi(): number` - returns the value of Pi (3.14...).

## Agent Manipulation Functions
`filter(SetComprehension): AgentList` - takes a comprehension argument with a boolean expression as its value and returns a filtered list of agents based on this value.

`sum(SetComprehension): number` - takes a set comprehension argument with a numeric expression as its value and returns a sum of these values (from all agents).

`min(SetComprehension): AgentObject` - takes a set comprehension argument with a numeric expression as its value and returns an agent object with the minimum corresponding value.

`max(SetComprehension): AgentObject` - takes a set comprehension argument with a numeric expression as its value and returns an agent object with the maximum corresponding value.

## Utility Functions
`agents(identifier): AgentList` - returns the list of all agents of the provided type.

`count(AgentList): number` - takes an AgentList value as a parameter and returns the number of this AgentList value.

`empty(): AgentList` - returns an empty array of agents and is used primarily in defining default property values in case of topological errors.

`prob(number): boolean` - takes a decimal numeric value between 0 and 1 representing a probability ratio and returns a boolean value based on this probability. If we use `prob(0.8)`, we have a 80\% chance of getting a `true` value and a 20\% change of getting a `false` value as a result.

`dist(number, number, number, number): number` - calculates the distance between two points in a two-dimensional space. The parameters represent `x1`, `y1`, `x2` and `y2` values.

`find_by_coordinates(AgentList, number, number): AgentObject` - returns an AgentObject holding an agent whose coordinates match the two numeric `x` and `y` values.

## Special Functions
`width(): number` - returns the current width of the visualisation grid, which was provided in the interpreter's configuration.

`height(): number` - returns the current height of the visualisation grid, which was provided in the interpreter's configuration.

`index(): number` - returns the numeric index of the current agent, starting from 0.

`step(): number` - returns the value of the current step, starting from 0.