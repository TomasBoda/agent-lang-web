# What is AgentLang

**AgentLang** is a programming language designed exclusively for modeling agent-based simulations. Its syntax and structure allow for quick understanding and simple use, making it easier to create powerful agent-based models fast, even for people with limited to none programming experience.

Below is an example simulation which generates a set of snowflakes and simulates snowfall.
```
agent snowflake 200 {
    const speed = random(10, 20);

    property x: random(0, width()) = x;
    property y: random(0, height()) = (y + speed) % height();
}
```
The above program generates 200 snowflakes at random `x` and `y` positions, each having a random fall speed (between `10` and `20`). In each step of the simulation, the `y` coordinate is incremented by the snowflake's speed.