# AgentList
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