# Main Functionality

## Interpreter
The interpreter will be a standalone program responsible for running the **AgentLang** source code. Its input will be a single string containing the source code, and it will repeatedly output an array of agents and their properties each step of the simulation, with a short delay between each step (in milliseconds). The user will be able to specify the delay time to suit their specific use case.

## Web interface
The web interface will consist of the following parts.
- source code editor
- table-based editor
- visualisation
- control panel

### Source code editor
The source code editor will be an editable component featuring line numbers and syntax highlighting. It is used for editing the **AgentLang** source code.

### Table-based editor
The table-based editor is an interactive, almost no-code editor for modeling agent-based simulations. It is an alternative to writing **AgentLang** source code. Both the source code and the table-based editor are equivalent and mutually convertible, meaning that after editing one, the other is updated too and the user can choose which option they want to use, or they can switch between the two options.

The table consists of rows and columns. Columns represent individual agent attributes (`VARIABLE`, `CONST` and `DYNAMIC`) and rows represent individual agents. After running the simulation, the table cells are updated in real-time.

When the simulation is not running, the most recent values are shown in the table. The user can edit individual user attribute formulas. After editing an attribute formula, the agent values are recalculated based on their most recent values, meaning that  for instance the `DYNAMIC` attributes will be recalculated based on the latest `VARIABLE` and `CONST` attributes. The user can edit an attribute by selecting its cell (clicking on it) and writing a formula to an input field shown next to the table. After clicking "Save", the new formula is saved and the remaining values dependent on this attribute are recalculated and updated.

### Visualisation
The visualisation will be a two-dimensional grid displaying agents and their attributes. **AgentLang** is built upon a two-dimensional system, meaning that the agents can move in a two-dimensional space based on their coordinates. Each step of the simulation, the agents' attributes are recalculated and the visualisation is updated in real-time.

### Control panel
The control panel serves as a configuration panel, mainly for the visualisation. The user will be able to **start**, **stop** and **reset** the visualisation, set the default `x` and `y` agent coordinate attributes or change the color of the agents based on their attributes.
