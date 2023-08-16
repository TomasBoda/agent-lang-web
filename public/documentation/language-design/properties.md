# Properties

In AgentLang, the agent's behaviour is modeled using its properties. Before understanding how agents work, we first need to understand how their properties work. Agent's properties are variables of different types, where each property type has a slightly different use case and behaviour.

## Types of Variables
There are three types of properties an agent can have:
1. the `variable` property
2. the `dynamic` property
3. the `const` property

### Variable
The `variable` property is the most commonly used property in AgentLang. It consists of two parts - the **initial value** and the **next value** to be calculated in the next step. The initial value is the most important part of the `variable` property, since other properties can be therefore directly dependent on it (even in the first step).

To define a `variable` property, use the `variable` keyword followed by the property's identifier, initial value and then the next value to be calculated.
```
variable x : 0 = x + choice(-1, 1);
```
This property is set to an initial value of `0` and in each next step, it is either incremented or decremented by `1`.

### Dynamic
The `dynamic` property is almost the same as the `variable` property, however, it does not define its initial value. Therefore, it can be directly dependent on the `variable` property. Moreover, it is recalculated in each step of the simulation and therefore provides a new value each step.

To define a `dynamic` property, use the `dynamic` keyword followed by the property's identifier and the next value to be calculated.
```
dynamic isFar = x > 200;
```
This property is directly dependent on the previously defined property `x` and contains a boolean value of `true` or `false`. If the property `x` is more than `200`, its value is `true`, otherise its `false`.

### Const
The `const` property is a special type of property which is calculated only in the first step of the simulation and its value does not change hroughout the course of the simulation. Due to that, it cannot contain any variable identifiers in its definition except for built-in functions that generate numeric or boolean values.

To define a `const` property, use the `const` keyword followed by the property's identifier and the value to be calculated.
```
const age = random(0, 21);
```
This property calculates a random value between `0` and `21` in the first step of the simulation and does not change throughout the course of the simulation.