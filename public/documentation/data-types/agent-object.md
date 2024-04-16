# AgentObject
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