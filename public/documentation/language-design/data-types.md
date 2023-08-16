# Data Types

Agents are modeled using their properties. These properties can have different types. However, before understanding how agents and their properties work, we need to define what values can these properties store.

## Types of Values
In AgentLang, there are six primary data types:
1. the `number` value
2. the `boolean` value
3. the `identifier` value
4. the `lambda` value
5. the `agent` value
6. the `agents` value

### Number
The `number` value represents a plain numeric value. Numeric values can be integers, decimal numbers as well as negative numbers. Numeric values can be defined plainly, such as `12.5` or calculated using expressions, such as `5 * (3 - 6) - 10 / 2`.

### Boolean
The `boolean` value represents a binary value of either `true` or `false`. Boolean values can be defined plainly, such as `true` or calculated using comparison expressions or logical operators, such as `10 > 5 and 3 < 2`.

### Identifier
The `identifier` value can represent other property's identifier, which is calculated at runtime and produces a raw value. However, by this `identifier` we mean primarily agent identifiers.

For instance, when we use a built-in function `agents(...)` that returns an list of agents, we need to define what agents we want to retrieve. Therefore, the function `agents(...)` needs a parameter of type `identifier` which represents an agent's identifier to retrieve a list of agents of the same type, for instance `agents(person)`. The `identifier` value does not return any value and is used purely for agents for now.

### Lambda
The `lambda` value is a special type of value used only in built-in function for now.

Suppose we are modeling the development of an epidemic. We want to retrieve all agents of type `person` who are infected. In this case scenario, we can first retrieve all agents of type `person` using `agents(person)` and then pass these agents to the `filter(...)` function. In order to know how the `filter(...)` function behaves, we use `lambda` values.

In this case, we would filter infected agents of type `person` using the function `filter(agents(person) => p => p.infected == true)`. The `lambda` value first retrieves all agents of some type, then uses the property `p` to retrieve each agent individually and finally defines a condition which needs to be met. If this condition is satisfied, the agent is retrieved. Eventually, all agents who satisfy the condition are returned from the `filter(...)` function.

### Agent
The `agent` value represents one agent with all their current properties. To understand the `agent` value in context, let's look at the previously explained `lambda` value. In the `filter(agents(person) => p => p.infected == true)` function, the parameter `p` represents a value of type `agent`. Therefore, we can retrieve its property `p.infected`.

### Agents
the `agents` value represents a list of agents with all their current properties. To understand the `agents` value in context, let's again look at the previously explained `filter(...)` function. The `filter(agents(person) => p => p.infected == true)` function returns a value of type `agents`, where all the returned agents satisfy the condition in the `lambda` expression.