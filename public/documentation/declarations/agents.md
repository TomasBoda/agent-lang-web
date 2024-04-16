# Agents
Agent is the main building block of a simulation. It represents an agent model and its properties and is used for generating a set of agents for the simulation. Agents are always declared in the top-level program scope and they cannot be nested. Defining multiple agent models is also supported.

To declare an agent, we use the following production rule:

```
agent_declaration:
    | "agent" identifier agent_count "{" "}"
    | "agent" identifier agent_count "{" agent_body "}"
```

Below is an example of an `agent` declaration.

```
agent car 20 {
    ...
}
```

AgentLang also supports multiple agent model declarations. To define multiple agent models, declare them one after another in the program scope.

```
agent car 20 {
    ...
}

agent pedestrian 60 {
    ...
}
```

Note that the `agent_count` parameter does not have to be a numeric literal explicitly. We can define a global variable with a numeric value and use this variable's identifier as the `agent_count` parameter.

```
define car_count = 20;

agent car car_count {
...
}
```

More about global variables will be explained later in this chapter.

After defining agent models, AgentLang will generate the corresponding number of agents for each agent model and evaluate their properties at runtime.