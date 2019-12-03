const common = require('../common.js');

const isBetween = (a, b, c) => {
    if (a > c) [a, c] = [c, a];
    return a <= b && b <= c;
}

function computeStepCount(wire, x, y) {
    let current_delta = Math.abs(wire[0] - wire[2] + wire[1] - wire[3]);
    let intersect_delta = 0;

    if (wire[0] != wire[2])
        intersect_delta += Math.abs(wire[0] - x);
    else
        intersect_delta += Math.abs(wire[1] - y);
    return wire[5] - current_delta + intersect_delta;
}

function generateWires(data2) {
    let x, y, dx, dy;
    let wires = [];
    let steps = 0;
    x = 0; y = 0;

    for (let data of data2) {
        let delta = +(data.slice(1));
        let [ix, iy] = [x, y];

        if (data[0] === 'R')
            [dx, dy] = [delta, 0];
        else if (data[0] === 'L')
            [dx, dy] = [-delta, 0];
        else if (data[0] === 'U')
            [dx, dy] = [0, delta];
        else
            [dx, dy] = [0, -delta];
        x += dx;
        y += dy;
        steps += Math.abs(delta);
        wires.push([ix, iy, x, y, dx === 0, steps]);
    }
    return wires;
}

/**
 * Run the int byte code program on an array
 * of integers
 * @param {Array} data2
 */
function solve(data2) {
    let [wires1, wires2] = [generateWires(data2[0]), generateWires(data2[1])];
    let intersects = [];

    for (let i = 0; i < wires1.length; i++) {
        for (let j = 0; j < wires2.length; j++) {
            let [wire1, wire2] = [wires1[i], wires2[j]];

            // Same wires don't intersect
            if (wire1[4] === wire2[4]) continue;

            // Make sure wire1 is horz
            if (wire1[4]) [wire1, wire2] = [wire2, wire1];

            // Verify wire1 x bounds wire2 and wire2 y bounds wire1
            if (isBetween(wire1[0], wire2[0], wire1[2]) && isBetween(wire2[1], wire1[1], wire2[3])) {
                if (wire1[0] == wire2[0] && wire1[1] == wire2[1])
                    continue;

                let [ix, iy] = [wire2[0], wire1[1]];
                let sum1 = computeStepCount(wire1, ix, iy);
                let sum2 = computeStepCount(wire2, ix, iy);

                intersects.push(sum1 + sum2);
            }
        }
    }
    intersects = intersects.sort((a, b) => a - b).filter(x => x > 0);
    return intersects[0];
}

module.exports = {
    run: () => {
        let data = common.readInput('./3/input.txt').split('\n').map(x => x.split(','));
        // data = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7'.split('\n').map(x => x.split(','));
        // data = 'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83'.split('\n').map(x => x.split(','));
        // data = 'R8,U5,L5,D3\nU7,R6,D4,L4'.split('\n').map(x => x.split(','));
        return solve(data);
    }
}