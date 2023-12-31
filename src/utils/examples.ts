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
    property closePeople = filter(people => p => dist(x, y, p.x, p.y) <= distance);
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

    public static FOREST_FIRE = `agent tree 64 {
    const offset = 100;
    const size = width() - 2 * offset;
    const spacing = size / 8;

    const x = offset + floor(index() % 8) * spacing;
    const y = offset + floor(index() / 8) * spacing;

    property trees = agents(tree);
    property inProximity = filter(trees => t => dist(x, y, t.x, t.y) <= spacing);

    property topTree = min(inProximity => t => t.y);
    property botTree = max(inProximity => t => t.y);
    property lefTree = min(inProximity => t => t.x);
    property rigTree = max(inProximity => t => t.x);

    property topCol = topTree.coloured otherwise false;
    property botCol = botTree.coloured otherwise false;
    property lefCol = lefTree.coloured otherwise false;
    property rigCol = rigTree.coloured otherwise false;

    const probability = prob(0.9);
    property shouldColour: false = topCol or botCol or lefCol or rigCol and probability;

    property coloured: index() == 0 = if coloured then true else shouldColour;
}`;

    public static FLOCKING = `agent bird 50 {
    const sr = 50;
    const ar = 500;
    const cr = 500;

    const maxTurnAngle = 10;
    const maxSpeed = 5;

    const xSpawn = random(50, width() - 50);
    const ySpawn = random(50, height() - 50);

    property birds: empty() = agents(bird);

    property xSeparation: 0 = sum(birds => b => if dist(x, y, b.x, b.y) < sr then x - b.x else 0);
    property ySeparation: 0 = sum(birds => b => if dist(x, y, b.x, b.y) < sr then y - b.y else 0);

    property xAlignment: 0 = sum(birds => b => if dist(x, y, b.x, b.y) < ar then cos(b.angle) else 0);
    property yAlignment: 0 = sum(birds => b => if dist(x, y, b.x, b.y) < ar then sin(b.angle) else 0);

    property xCohesion: 0 = sum(birds => b => if dist(x, y, b.x, b.y) < cr then b.x else 0);
    property yCohesion: 0 = sum(birds => b => if dist(x, y, b.x, b.y) < cr then b.y else 0);

    property xTotal: 0 = (xSeparation + xAlignment + xCohesion) / 500;
    property yTotal: 0 = (ySeparation + yAlignment + yCohesion) / 500;

    property angle: random(0, 2 * pi()) = atan(yAlignment, xAlignment);

    property x: xSpawn = (x + xTotal) % width();
    property y: ySpawn = (y + yTotal) % height();

    const coloured = false;
}`;

    public static ALL: CodeItem[] = [
        { label: "Epidemic", code: Examples.EPIDEMIC, steps: 10000, delay: 20 },
        { label: "Snowfall", code: Examples.SNOWFALL, steps: 10000, delay: 20 },
        { label: "Forest Fire", code: Examples.FOREST_FIRE, steps: 100, delay: 1000 },
        { label: "Flocking", code: Examples.FLOCKING, steps: 10000, delay: 20 },
    ]
}