# Agents

In an agent-based model, **agent** is the main building block of the simulation. An agent represents one unit or entity with defined properties and behaviour. A simulation consists of numerous agents of various types and behaviours who interact with each other in an isolated environment.

## Defining an Agent
In AgentLang, you can define an agent by using the `agent` keyword followed by its identifier and the number of agents to be generated in the simulation.
```
agent person 10 { ... }
```
This code will generate 10 agents of type `person`. The space between the curly braces in where the agent's properties are defined.

Let's define an agent of type `person` which is able to move in a two-dimensional space.
```
agent person 5 {
    property x : 0 = x + choice(-1, 1);
    property y : 0 = y + choice(-1, 1);
}
```
The above agent defines two properties, `x` and `y` both of which are initially set to `0`. In each step of the simulation, both `x` and `y` are either incremented or decremented by `1`, independently from each other. In this way, we modeled an agent who randomly moves in a two-dimensional space.

## Multiple Agent Types
In AgentLang, we can define multiple agents with different behaviours which either behave independently from each other, or interact with each other.

Let's define two agents of types `person` and `building`. Agents of type `person` will move in a two-dimensional space and agents of type `building` will spawn at random coordinates and will not move throughout the course of the simulation.
```
agent person 10 {
    property x : 0 = x + choice(-1, 1);
    property y : 0 = y + choice(-1, 1);
}

agent building 5 {
    property x = random(0, 200);
    property y = random(0, 200);
}
```
The agents of type `building` spawn at random coordinates in a two-dimensional space.

Let's model a situation where we need the agents of type `person` to know whether there are any buildings in their proximity.
```
agent building 5 {
    property x = random(0, 200);
    property y = random(0, 200);
}

agent person 10 {
    property x : 0 = x + choice(-1, 1);
    property y : 0 = y + choice(-1, 1);

    property buildings: empty() = agents(building);
    property distance = 10;
    property inProximity = filter(buildings => b => sqrt((x - b.x) * (x - b.x) + (y - b.y) * (y - b.y)) < distance);

    property isBuildingNear = count(inProximity) > 0;
}
```
In each step of the simulation, the agents of type `person` move in some direction, retrieve agents of type `building` that are in the radius of `const distance = 10` from them and check whether there are buildings in their proximity. The final `boolean` value is stored in the property `isBuildingNear`.

### Conclusion
In this way, we can model any number of agents and their interactions with each other to create complex simulations.

[**Next:** Conditional Expressions](/documentation/language-design/conditional-expressions)