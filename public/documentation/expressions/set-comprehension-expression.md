# Set Comprehension Expression
While being classified as expression, the set comprehension expression is rather a syntactical structure that an expression. It cannot be used on its own, only as a parameter to set comprehension-specific built-in functions. They are mainly used for traversing arrays of agent instances and manipulating them in some way. Use cases include filtering of agents, summing certain agent properties or finding a specific agent instance based on some condition.

There are several built-in functions that take set comprehension expression as their parameter, some of which are `filter`, `sum`, `min` and `max`.

To define a set comprehension expression, we use the following production rule:

```
set_comprehension_expression:
    | expression "|" identifier "->" expression
```

We start with an expression holding a value of type AgentList, followed by a divider `|`. Then, we declare the set comprehension parameter name, which is any identifier we choose, such as `item` followed again by an arrow `->`. This parameter is used to access each agent instance in the array, one by one. The final part of the set comprehension expression is an expression representing a condition based on which to manipulate the agent instances.

```
define range = 60;

agent person 120 {
    property x = x + random(-1, 1);
    property y = y + random(-1, 1);

    property people = agents(person);
    property in_proximity =
        filter(people | p -> dist(p.x, p.y, x, y) <= range);
}
```

The `filter` function takes a set comprehension expression as a parameter. We use the `p` parameter to access each individual agent instance and their properties. Finally, the right-hand side of the set comprehension expression is used for filtering the agent array based on the proximity of each agent instance to the current agent. The result of `in_proximity` property is a filtered array of agents of type `person`.