# Main Functionality

## Interpreter
The interpreter is a standalone program responsible for running the AgentLang source code. Its input is a single string containing the source code, and it repeatedly outputs an array of agents and their properties each step of the simulation, with a short delay between each step (in milliseconds). The user is able to specify the delay time to suit the needs of the simulation.

## Web interface
The web interface will consist of the following parts.
- source code editor
- spreadsheet editor
- visualisation
- toolbar

### Source code editor
The source code editor is an editable component featuring syntax highlighting. It is used for editing the AgentLang source code.

### Spreadsheet editor
The spreadsheet editor is an interactive, almost no-code editor for modeling agent-based simulations. It is an alternative to writing AgentLang source code. Both the source code and the table-based editor are equivalent and mutually convertible, meaning that after editing one, the other is updated too and the user can choose which option they want to use, or they can switch between the two options.

The spreadsheet editor consists of rows and columns. Columns represent individual agent attributes (`variable`, `const` and `dynamic`) and rows represent individual agents. After running the simulation, the table cells are updated in real-time.

When the simulation is not running, the most recent values are shown in the spreadsheet. The user can edit individual user attribute formulas. After editing an attribute formula, the agent values are recalculated based on their most recent values, meaning that  for instance the `property` attributes will be recalculated based on the latest `property` and `const` attributes. The user can edit an attribute by selecting its cell (clicking on it) and writing a formula to an input field shown next to the table. After clicking "Save", the new formula is saved and the remaining values dependent on this attribute are recalculated and updated.

### Visualisation
The visualisation is a two-dimensional grid displaying agents and their attributes. AgentLang is built upon a two-dimensional system, meaning that the agents can move in a two-dimensional space based on their coordinates. Each step of the simulation, the agents' attributes are recalculated and the visualisation is updated in real-time.

### Toolbar
The toolbar serves as a configuration panel, mainly for the visualisation. The user is able to **start**, **stop** and **reset** the visualisation as well as set the `delay` and `steps` parameters for the visualisation.

[**Next:** Language Design](/documentation/language-design)
