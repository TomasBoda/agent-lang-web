# Data Types
There are five data types that AgentLang supports, which are numeric literals, boolean literals, AgentList instances, AgentObject instances and Null values.

## Numeric Literal
Numeric literal is one of the two primitive data types in AgentLang. A numeric literal represents either an integer or a decimal number. Decimal numbers can have any number of decimal places, however, they are always rounded to up to eight decimal places in the simulation's output.

Numeric literals can be used in many ways, either as raw numeric values or in any numeric expression, such as binary or unary expressions or as parameters to function calls.

```
const integer_value = 3;
const decimal_value = 12.8;
const binary_expression = 6.5 * 2 / integer_value;
const random_value = random(10, 20);
```

## Boolean Literal
Boolean literal is the second of the two primitive data types in AgentLang. It represents a binary value, which can either be `true` or `false`.

Boolean literals can be expressed either explicitly, using the `true` or `false` keywords, or they can be the result of some expression, such as the relational expression (more on relational expression later).

```
const is_active = false;
const is_first = index() == 0;

property temperature: 10 = temperature + random(-3, 3);
const is_cold = temperature <= 9;
```

## AgentList
AgentList is a special data type representing an array of agent instances. This array cannot be defined explicitly, cannot be indexed and it only results from various built-in function calls.

The easiest way to retrieve an array of agent instances is to use the `agents` function, which returns the current array of agent instances of the specified type.

```
agent prey 10 {
    ...
}

agent predator 5 {
    property preys = agents(prey);
}
```

The `preys` property holds an array of agent instances of type `prey` with their most recent values.

There are numerous built-in functions used for retrieving or manipulating values of type AgentList, which will be described later in this chapter.

## AgentObject
AgentObject is a special data type representing one specific agent instance and its properties. It can be used to retrieve the property values of an agent and use them in later calculations.

Similarly to AgentList, AgentObject can only be retrieved by using specific built-in function calls, such as `min`.

```
agent person 10 {
    property x = ...;
    property y = ...;

    property closest_person =
        min(agents(person) | p -> dist(p.x, p.y, x, y));
}
```

The above example uses the `min` function together with a set comprehension expression to retrieve an agent instance of type `person` which is closest to the current person. We can now use the `closest_person` property to retrieve the agent's property values.

```
agent person 10 {
    property x = ...;
    property y = ...;

    const is_married = prob(0.5);
    property closest_person =
        min(agents(person) | p -> dist(p.x, p.y, x, y));

    property closest_is_married = closest_person.is_married;
}
```

## Null
Null is a special data type that represents an undefined or missing value. It is tightly bound to the AgentObject data type. Note the following example.

```
define range = 65;

agent person 10 {
    property x = ...;
    property y = ...;

    property close_people =
        filter(agents(person) | p -> dist(p.x, p.y, x, y) < range);
    property close_person =
        min(close_people | c -> dist(c.x, c.y, x, y));
}
```

The `close_person` property attempts to find an agent that is closest to the current agent, but is also in the visual range of 65. If there are no agents in this visual range, the `close_person` searches an empty array and cannot retrieve a specific agent instance. Therefore, it is assigned a Null value.

A problem with Null values, however, is that we cannot use it in other properties. More specifically, we cannot retrieve the agent's properties, since it does not hold any agent instance, rather a Null value. That is why AgentLang supports the `otherwise` operator, which tackles issues with Null values. The `otherwise` operator will be discussed later in this chapter.

[**Next:** Expressions](/documentation/language-specification/expressions)