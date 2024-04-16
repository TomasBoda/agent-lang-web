# Declarations
Declarations are the top-level constructs of the AgentLang language. They are used to declare agents, properties and global variables.

## Agents
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

## Properties
Properties are essential in defining the behaviour of an agent model. They can be understood as variables with a value defined based on some inline expression. Agents can have any number of properties, either independent or dependent on each other. AgentLang supports two types of properties, which are `property` and `const`, each having its specific use case.

### Const
Property of type `const` is a special kind of property, which holds a constant value during the entire runtime of the simulation. It is calculated only once as the agent is generated.

To declare a `const` property, use the following grammar production rule:

```
property_declaration:
    "const" identifier "=" expression ";"
```

Below is an example of a `const` declaration holding a numeric value.

```
const max_speed = 260;
```

Properties of type `const` are used in cases when we need to for instance generate random initial coordinates of agents, since they are calculated only once at the beginning of the simulation.

```
const x_spawn = random(100, 200);
const y_spawn = random(100, 200);

property x: x_spawn = x + 1;
property y: y_spawn = y + 1;
```

### Property
Property of type `property` is the most commonly used type of property in AgentLang. It is recalculated in each step of the simulation for every agent, based on the most current values.

To declare a `property` property, use the following grammar production rule:

```
property_declaration:
    "property" identifier "=" expression ";"
```

Below is an example of a `property` declaration that holds a random numeric value between 5 and 10 in each step of the simulation.

```
property current_speed = random(5, 10);
```

However, what if we want to set the property to some initial value and use this property's value in its own declaration?

```
property x = x + 1;
```

In the above example, it is not possible. The `x` property is incremented by 1 in each step of the simulation, however, it is not set to any default value to start with. That is why AgentLang supports default property values.

To declare a `property` with a default value, we use the following production rule.

```
property_declaration:
    "property" identifier ":" expression "=" expression ";"
```

The expression after the semicolon is used to initialise the `property` to some default value in the first step of the simulation. In each next step, the second expression is used to recalculate its value.

```
property x: 15 = x + 1;
property y: 5 = y * 2;
```

A better example would be the earlier example with the current speed. We want the agent to accelarate, so we increment its speed by one.

```
const initial_speed = 0;
property speed: initial_speed = speed + 1;
```

In this way, the speed is set to 0 in the first step and is incremented by 1 in each following step, producing values 1, 2, 3, 4 and so on.

However, this is not the only use case of default property values. Suppose the following exaggerated example, where we have two properties, where each depends on the other.

```
property a = b + 1;
property b = a + 2;
```

This example would throw an error, since there is a cycle in the property declarations. In order to fix this issue, we need to assign a default value to one of the properties, so that the interpreter knows which property will be evaluated first, so that the other property can calculate its value based on the first property.

```
property a = b + 1;
property b: 0 = a + 2;
```

The above example would work, since at least one of the properties is initialised with a default value. This topic, however, concerns the topological sorting mechanism implemented in the AgentLang's interpreter, which will be explained later in this thesis.

## Global Variables
Apart from agent and property declarations, AgentLang supports the declaration of global variables which can be reused among all agent models as constant values. Global variables are always declared in the top-level program scope and the best practice is to declare them before all agent declarations. However, it is not necessary, since the AgentLang interpreter has a built-in mechanism for declaration reordering, so that the global variables are always evaluated before agent declarations.

To declare a global variable, we use the following production rule.

```
define_declaration:
    "define" identifier "=" expression ";"
```

Below is an example of usage of global variable declarations.

```
define person_count = 120;
define default_speed = 5;

agent person person_count {
    const speed = default_speed / 2;
}

agent car 10 {
    const speed = default_speed * 3;
}
```

Note that global variables cannot contain any identifiers or function calls in their definitions. They are plain constant values which can only hold numeric or boolean literals.

[**Next:** Data Types](/documentation/language-specification/data-types)