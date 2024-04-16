# Null
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