# Global Variables
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