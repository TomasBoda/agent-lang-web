import { CodeItem } from "../screens/sandbox/model";

export class Examples {

    public static EPIDEMIC = `define speed = 1.5;
# infectivity distance #
define distance = 20;
# time to heal #
define timespan = 200;

agent person 50 {
    const w = 12;
    const h = 12;
    
    property angle: random(0, 2 * pi()) = angle + choice(-0.1, 0.1);
    
    property x: random(50, width() - 50) = (x + speed * cos(angle)) % width();
    property y: random(50, height() - 50) = (y + speed * sin(angle)) % height();

    # people in proximity #
    property infected_in_proximity = filter(agents(person) => p => dist(x, y, p.x, p.y) <= distance and p.infected == true);

    # remaining days to heal #
    property remaining: timespan = if infected then remaining - 1 else timespan;

    property should_infect = prob(0.4);
    property infected: prob(0.5) = (infected and remaining > 0) or (count(infected_in_proximity) > 0 and should_infect);

    property coloured = infected;
}`;

    public static SNOWFALL = `agent snowflake 200 {
    const speed = random(8, 15);

    property x: random(0, width()) = x;
    property y: random(0, height()) = (y + speed) % height();
    
    const w = 10;
    const h = 10;
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

    public static BOIDS = `define visual_range = 100;
define avoid_range = 20;
define centering_factor = 0.0005;
define avoid_factor = 0.005;
define matching_factor = 0.05;

# min and max speed #
define s_max = 6;
define s_min = 4;

agent boid 50 {

    # width and height #
    const w = 12;
    const h = 12;

    const x_init = random(100, width() - 100);
    const y_init = random(100, height() - 100);

    property x: x_init = (x + x_vel_limit) % width();
    property y: y_init = (y + y_vel_limit) % height();

    property x_vel: choice(-2, 2) = x_vel + x_sep + x_align + x_coh;
    property y_vel: choice(-2, 2) = y_vel + y_sep + y_align + y_coh;

    # speed #
    property s_sqrt = sqrt(x_vel * x_vel + y_vel * y_vel);
    property s = if s_sqrt == 0 then 1 else s_sqrt;

    # limit the velocity to min and max speed #
    property x_vel_limit = if s > s_max then x_vel / s * s_max else if s < s_min then x_vel / s * s_min else x_vel;
    property y_vel_limit = if s > s_max then y_vel / s * s_max else if s < s_min then y_vel / s * s_min else y_vel;

    # boids in close proximity #
    property boids_ar: empty() = filter(agents(boid) => b => dist(b.x, b.y, x, y) < avoid_range);
    # boids in visual range #
    property boids_vr: empty() = filter(agents(boid) => b => dist(b.x, b.y, x, y) < visual_range);
    # number of boids in visual range #
    property bvrc = count(boids_vr);

    # separation #
    property x_sep = sum(boids_ar => b => x - b.x) * avoid_factor;
    property y_sep = sum(boids_ar => b => y - b.y) * avoid_factor;

    # alignment #
    property x_align = if bvrc > 0 then (sum(boids_vr => b => b.x_vel) / bvrc - x_vel) * matching_factor else 0;
    property y_align = if bvrc > 0 then (sum(boids_vr => b => b.y_vel) / bvrc - y_vel) * matching_factor else 0;

    # cohesion #
    property x_coh = if bvrc > 0 then (sum(boids_vr => b => b.x) / bvrc - x) * centering_factor else 0;
    property y_coh = if bvrc > 0 then (sum(boids_vr => b => b.y) / bvrc - y) * centering_factor else 0;
}`;

    public static ALL: CodeItem[] = [
        { label: "Epidemic", code: Examples.EPIDEMIC, steps: 10000, delay: 20 },
        { label: "Snowfall", code: Examples.SNOWFALL, steps: 10000, delay: 20 },
        { label: "Forest Fire", code: Examples.FOREST_FIRE, steps: 100, delay: 1000 },
        { label: "Boid's Algorithm", code: Examples.BOIDS, steps: 10000, delay: 20 },
    ]
}