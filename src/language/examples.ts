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

    public static FLOCKING = `define center_factor = 0.005;

define visual_range = 20;

define avoid_distance = 50;
define avoid_factor = 0.05;

define match_factor = 0.05;

define speed_limit = 10;

define margin = 100;
define turn_factor = 1;

agent bird 50 {

    const x_spawn = random(100, width() - 100);
    const y_spawn = random(100, height() - 100);
    const x_velocity_spawn = random(-1, 1) * 10;
    const y_velocity_spawn = random(-1, 1) * 10;

    property birds: empty() = agents(bird);

    property neighbours: empty() = filter(birds => b => dist(b.x, b.y, x, y) < visual_range);
    property neighbour_count: 1 = if count(neighbours) == 0 then 1 else count(neighbours);

    property x_fly_to_center: width() / 2 = if count(neighbours) == 0 then width() / 2 else sum(neighbours => n => n.x) / neighbour_count;
    property y_fly_to_center: height() / 2 = if count(neighbours) == 0 then height() / 2 else sum(neighbours => n => n.y) / neighbour_count;

    property x_center: width() / 2 = (x_fly_to_center - x) * center_factor;
    property y_center: height() / 2 = (y_fly_to_center - y) * center_factor;

    property avoid_neighbours: empty() = filter(birds => b => dist(b.x, b.y, x, y) < avoid_distance);

    property x_avoid: 0 = sum(avoid_neighbours => n => x - n.x) * avoid_factor;
    property y_avoid: 0 = sum(avoid_neighbours => n => y - n.y) * avoid_factor;

    property x_do_match: 0 = sum(neighbours => n => n.x_velocity) / neighbour_count;
    property y_do_match: 0 = sum(neighbours => n => n.y_velocity) / neighbour_count;

    property x_match: 0 = (x_do_match - x) * match_factor;
    property y_match: 0 = (y_do_match - y) * match_factor;

    property x_velocity: y_velocity_spawn = x_center + x_avoid + x_match;
    property y_velocity: y_velocity_spawn = y_center + y_avoid + y_match;

    property speed: 0 = sqrt(x_velocity * x_velocity + y_velocity * y_velocity);

    property x_speed: 0 = if speed > speed_limit then x_velocity / speed * speed_limit else x_velocity;
    property y_speed: 0 = if speed > speed_limit then y_velocity / speed * speed_limit else y_velocity;

    property x_move: 0 = if x < margin then x_move + turn_factor else if x > width() - margin then x_move - turn_factor else x_speed;
    property y_move: 0 = if y < margin then y_move + turn_factor else if y > height() - margin then y_move - turn_factor else y_speed;

    property x: x_spawn = x + x_move;
    property y: y_spawn = y + y_move;
}`;

    public static ALL: CodeItem[] = [
        { label: "Epidemic", code: Examples.EPIDEMIC, steps: 10000, delay: 20 },
        { label: "Snowfall", code: Examples.SNOWFALL, steps: 10000, delay: 20 },
        { label: "Forest Fire", code: Examples.FOREST_FIRE, steps: 100, delay: 1000 },
        { label: "Flocking", code: Examples.FLOCKING, steps: 10000, delay: 20 },
    ]
}