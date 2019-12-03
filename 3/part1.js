const common = require('../common.js');

const isBetween = (a, b, c) => {
    if (a > c) [a, c] = [c, a];
    return a <= b && b <= c;
}

function generateWires(data2) {
    let x, y, dx, dy;
    let wires = [];
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
        wires.push([ix, iy, x, y, dx === 0]);
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
                intersects.push([wire2[0], wire1[1]]);
            }
        }
    }
    intersects = intersects.map(x => Math.abs(x[0]) + Math.abs(x[1])).sort((a, b) => a - b);
    return intersects[0] === 0 ? intersects[1] : intersects[0];
}

module.exports = {
    run: () => {
        let data = common.readInput('./3/input.txt').split('\n').map(x => x.split(','));
        // data = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7'.split('\n').map(x => x.split(','));
        return solve(data);
    }
}