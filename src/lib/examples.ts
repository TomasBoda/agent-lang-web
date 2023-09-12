
export interface Example {
    label: string;
    code: string;
}
export class Examples {

    public static EPIDEMIC = `agent person 30 {
\tconst speed = 4;
\tvariable angle: random(0, 2 * pi()) = angle + choice(-0.1, 0.1);

\tdynamic shouldStay = prob(0.5);

\tdynamic xNew = (x + speed * cos(angle)) % width();
\tdynamic yNew = (y + speed * sin(angle)) % height();

\tvariable x: random(50, width() - 50) = if shouldStay then x else xNew;
\tvariable y: random(50, height() - 50) = if shouldStay then y else yNew;

\tconst distance = 20;

\tdynamic people = agents(person);
\tdynamic closePeople = filter(people => p => sqrt((p.x - x) * (p.x - x) + (p.y - y) * (p.y - y)) <= distance);
\tdynamic closeInfected = filter(closePeople => c => c.infected == true);

\tconst timespan = 200;
\tvariable remaining: timespan = if infected then remaining - 1 else timespan;

\tdynamic shouldInfect = prob(0.4);
\tvariable infected: prob(0.5) = (infected and remaining > 0) or (count(closeInfected) > 0 and shouldInfect);

\tvariable coloured: false = infected;
}`;

    public static FLOCKING = `agent leader 5 {
\tconst speed = 5;
\tvariable angle: random(0, 2 * pi()) = angle + choice(-0.1, 0.1);

\tvariable x: random(50, width() - 50) = (x + speed * cos(angle)) % width();
\tvariable y: random(50, height() - 50) = (y + speed * sin(angle)) % height();

\tconst coloured = true;
}

agent follower 20 {
\tdynamic leaders = agents(leader);
\tdynamic closestLeader = min(leaders => l => sqrt((l.x - x) * (l.x - x) + (l.y - y) * (l.y - y)));

\tdynamic xLeaderIncrease = if x < closestLeader.x then 3 else -3;
\tdynamic yLeaderIncrease = if y < closestLeader.y then 3 else -3;

\tdynamic followers = agents(follower);
\tdynamic closestFollower = min(followers => f => sqrt((f.x - x) * (f.x - x) + (f.y - y) * (f.y - y)));

\tconst distance = 20;

\tdynamic xFollowerIncrease = if abs(x - closestFollower.x) < distance then (if x - closestFollower.x > 0 then 3 else -3) else 0;
\tdynamic yFollowerIncrease = if abs(y - closestFollower.y) < distance then (if y - closestFollower.y > 0 then 3 else -3) else 0;

\tvariable x: random(50, width() - 50) = x + xLeaderIncrease + xFollowerIncrease;
\tvariable y: random(50, height() - 50) = y + yLeaderIncrease + yFollowerIncrease;

\tconst coloured = false;
}`;

    public static ALL: Example[] = [
        { label: "Epidemic", code: Examples.EPIDEMIC },
        { label: "Flocking", code: Examples.FLOCKING },
    ]
}