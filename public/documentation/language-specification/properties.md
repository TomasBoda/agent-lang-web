# Properties

In AgentLang, the agent's behaviour is modeled using its properties. Before understanding how agents work, we first need to understand how their properties work. Agent's properties are variables of different types, where each property type has a slightly different use case and behaviour.

## Types of Variables
There are two types of properties an agent can have:
1. the `property` property
2. the `const` property

### Property
The `property` property is the most commonly used property in AgentLang. It consists of up to two parts - the **initial value** and the **next value** to be calculated in the next step. The initial value is used when we need the property to be initialized with a certain value upon which further properties will be calculated upon.

To define a `property` property, use the `property` keyword followed by the property's identifier, optionally an initial value and then the next value to be calculated.
```
property x: 0 = x + choice(-1, 1);
```
This property is set to an initial value of `0` and in each next step, it is either incremented or decremented by `1`.

To define a `property` property with no initial value, just omit the initial value.
```
property value = random(0, 100);
```
This property will have a new random value between `0` and `100` in each step of the simulation.

Sometimes it is necessary to use the initial values, especially if the property depends on itself, such as in the below case scenario.
```
property x: random(0, width()) = x + 10;
```
The property `x` needs to be initially set to a constant value before it can access this value in the next step.

### Const
The `const` property is a special type of property which is **calculated only in the first step** of the simulation and its value does not change hroughout the course of the simulation. Due to that, it cannot contain any variable identifiers in its definition except for built-in functions that generate numeric or boolean values.

To define a `const` property, use the `const` keyword followed by the property's identifier and the value to be calculated.
```
const age = random(0, 21);
```
This property calculates a random value between `0` and `21` in the first step of the simulation and does not change throughout the course of the simulation.

[**Next:** Agents](/documentation/language-design/agents)