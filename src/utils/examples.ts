import { CodeItem } from "../screens/sandbox/model";

export class Examples {

    public static EPIDEMIC = `agent person 50 {
    const speed = 2;
    property angle: random(0, 2 * pi()) = angle + choice(-0.1, 0.1);

    property shouldStay = prob(0.5);

    property xNew: 0 = (x + speed * cos(angle)) % width();
    property yNew: 0 = (y + speed * sin(angle)) % height();

    property x: random(50, width() - 50) = if shouldStay then x else xNew;
    property y: random(50, height() - 50) = if shouldStay then y else yNew;

    const distance = 20;

    property people = agents(person);
    property closePeople = filter(people => p => sqrt((p.x - x) * (p.x - x) + (p.y - y) * (p.y - y)) <= distance);
    property closeInfected = filter(closePeople => c => c.infected == true);

    const timespan = 200;
    property remaining: timespan = if infected then remaining - 1 else timespan;

    property shouldInfect = prob(0.4);
    property infected: prob(0.5) = (infected and remaining > 0) or (count(closeInfected) > 0 and shouldInfect);

    property coloured: false = infected;
}`;

    public static SNOWFALL = `agent snowflake 200 {
    const speed = random(10, 20);

    property x: random(0, width()) = x;
    property y: random(0, height()) = (y + speed) % height();
}`;

    public static ALL: CodeItem[] = [
        { label: "Epidemic", code: Examples.EPIDEMIC, steps: 10000, delay: 20 },
        { label: "Snowfall", code: Examples.SNOWFALL, steps: 10000, delay: 20 },
    ]
}