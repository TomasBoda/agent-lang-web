import { CodeItem } from "../screens/sandbox/model";

export class Examples {

    public static EPIDEMIC = `agent person 50 {
    const speed = 2;
    property angle: random(0, 2 * pi()) = angle + choice(-0.1, 0.1);

    property should_stay = prob(0.5);

    property xNew: 0 = (x + speed * cos(angle)) % width();
    property yNew: 0 = (y + speed * sin(angle)) % height();

    property x: random(50, width() - 50) = if should_stay then x else xNew;
    property y: random(50, height() - 50) = if should_stay then y else yNew;

    const distance = 20;

    property people = agents(person);
    property close_people = filter(people => p => dist(x, y, p.x, p.y) <= distance);
    property close_infected = filter(close_people => c => c.infected == true);

    const timespan = 200;
    property remaining: timespan = if infected then remaining - 1 else timespan;

    property should_infect = prob(0.4);
    property infected: prob(0.5) = (infected and remaining > 0) or (count(close_infected) > 0 and should_infect);

    property coloured: false = infected;
}`;

    public static SNOWFALL = `agent snowflake 200 {
    const speed = random(10, 20);

    property x: random(0, width()) = x;
    property y: random(0, height()) = (y + speed) % height();
}`;

    public static FOREST_FIRE = `agent tree 64 {
    const offset = 100;
    const size = height() - 2 * offset;
    const spacing = size / 8;

    const x = offset + floor(index() % 8) * spacing;
    const y = offset + floor(index() / 8) * spacing;

    property trees = agents(tree);
    property in_proximity = filter(trees => t => dist(x, y, t.x, t.y) <= spacing);

    property top_tree = min(in_proximity => t => t.y);
    property bot_tree = max(in_proximity => t => t.y);
    property lef_tree = min(in_proximity => t => t.x);
    property rig_tree = max(in_proximity => t => t.x);

    property top_col = top_tree.coloured otherwise false;
    property bot_col = bot_tree.coloured otherwise false;
    property lef_col = lef_tree.coloured otherwise false;
    property rig_col = rig_tree.coloured otherwise false;

    const probability = prob(0.9);
    property should_color: false = top_col or bot_col or lef_col or rig_col and probability;

    property coloured: index() == 0 = if coloured then true else should_color;
}`;

    public static FLOCKING = `define turn_factor = 0.2;
define visual_range = 100;
define protected_range = 40;
define centering_factor = 0.0005;
define avoid_factor = 0.0005;
define matching_factor = 0.05;

define max_s = 6;
define min_s = 4;

define margin = 50;

agent boid 50 {

    const w = 12;
    const h = 12;

    const sx = random(100, width() - 100);
    const sy = random(100, height() - 100);

    property x: sx = (x + vx_s) % width();
    property y: sy = (y + vy_s) % height();

    property vx: choice(-2, 2) = vx + close_dx * avoid_factor + xvel_avg_s + xpos_avg_s;
    property vy: choice(-2, 2) = vy + close_dy * avoid_factor + yvel_avg_s + ypos_avg_s;

    property xvel_avg_s: 0 = if xvel_avg == 0 then 0 else (xvel_avg - vx) * matching_factor;
    property yvel_avg_s: 0 = if yvel_avg == 0 then 0 else (yvel_avg - vy) * matching_factor;

    property xpos_avg_s: 0 = if xpos_avg == 0 then 0 else (xpos_avg - x) * centering_factor;
    property ypos_avg_s: 0 = if ypos_avg == 0 then 0 else (ypos_avg - y) * centering_factor;

    property speed_p: 0 = sqrt(vx * vx + vy * vy);
    property s: 1 = if speed_p == 0 then 1 else speed_p;

    property vx_s: 0 = if s > max_s then vx / s * max_s else if s < min_s then vx / s * min_s else vx;
    property vy_s: 0 = if s > max_s then vy / s * max_s else if s < min_s then vy / s * min_s else vy;

    property boids: empty() = agents(boid);
    property boids_pr: empty() = filter(boids => b => dist(b.x, b.y, x, y) < protected_range);
    property boids_vr: empty() = filter(boids => b => dist(b.x, b.y, x, y) < visual_range);

    property close_dx: 0 = sum(boids_pr => b => x - b.x);
    property close_dy: 0 = sum(boids_pr => b => y - b.y);

    property xvel_avg_p: 0 = sum(boids_vr => b => b.vx);
    property yvel_avg_p: 0 = sum(boids_vr => b => b.vy);
    property xvel_avg: 0 = if count(boids_vr) > 0 then xvel_avg_p / count(boids_vr) else 0;
    property yvel_avg: 0 = if count(boids_vr) > 0 then yvel_avg_p / count(boids_vr) else 0;

    property xpos_avg_p: 0 = sum(boids_vr => b => b.x);
    property ypos_avg_p: 0 = sum(boids_vr => b => b.y);
    property xpos_avg: 0 = if count(boids_vr) > 0 then xpos_avg_p / count(boids_vr) else 0;
    property ypos_avg: 0 = if count(boids_vr) > 0 then ypos_avg_p / count(boids_vr) else 0;
}`;

    public static ALL: CodeItem[] = [
        { label: "Epidemic", code: Examples.EPIDEMIC, steps: 10000, delay: 20 },
        { label: "Snowfall", code: Examples.SNOWFALL, steps: 10000, delay: 20 },
        { label: "Forest Fire", code: Examples.FOREST_FIRE, steps: 100, delay: 1000 },
        { label: "Boid's Flocking Algorithm", code: Examples.FLOCKING, steps: 10000, delay: 20 },
    ]
}