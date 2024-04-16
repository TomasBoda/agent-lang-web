## Utility Functions
`agents(identifier): AgentList` - returns the list of all agents of the provided type.

`count(AgentList): number` - takes an AgentList value as a parameter and returns the number of this AgentList value.

`empty(): AgentList` - returns an empty array of agents and is used primarily in defining default property values in case of topological errors.

`prob(number): boolean` - takes a decimal numeric value between 0 and 1 representing a probability ratio and returns a boolean value based on this probability. If we use `prob(0.8)`, we have a 80% chance of getting a `true` value and a 20% change of getting a `false` value as a result.

`dist(number, number, number, number): number` - calculates the distance between two points in a two-dimensional space. The parameters represent `x1`, `y1`, `x2` and `y2` values.

`find_by_coordinates(AgentList, number, number): AgentObject` - returns an AgentObject holding an agent whose coordinates match the two numeric `x` and `y` values.