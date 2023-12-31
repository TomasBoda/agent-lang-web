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

    public static FOREST_FIRE = `agent tree 225 {
    const x = 100 + floor(index() % 15) * 10;
    const y = 100 + floor(index() / 15) * 10;
    
    property trees = agents(tree);

    property top = filter(trees => n => n.y == y - 10 and n.x == x);
    property bot = filter(trees => n => n.y == y + 10 and n.x == x);
    property lef = filter(trees => n => n.y == y and n.x == x - 10);
    property rig = filter(trees => n => n.y == y and n.x == x + 10);

    property topTree = min(top => t => t.x);
    property botTree = min(bot => t => t.x);
    property lefTree = min(lef => t => t.x);
    property rigTree = min(rig => t => t.x);

    property topCol = topTree.coloured otherwise false;
    property botCol = botTree.coloured otherwise false;
    property lefCol = lefTree.coloured otherwise false;
    property rigCol = rigTree.coloured otherwise false;

    const probability = prob(0.7);
    property shouldColour: false = topCol or botCol or lefCol or rigCol and probability;

    property coloured: index() == 0 = if coloured then true else shouldColour;
}`

    public static ALL: CodeItem[] = [
        { label: "Epidemic", code: Examples.EPIDEMIC, steps: 10000, delay: 20 },
        { label: "Snowfall", code: Examples.SNOWFALL, steps: 10000, delay: 20 },
        { label: "Forest Fire", code: Examples.FOREST_FIRE, steps: 100, delay: 1000 },
    ]
}