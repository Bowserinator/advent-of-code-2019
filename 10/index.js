// @ts-check
const common = require('../common.js');

function factor(n1, n2) {
    let r = [1];
    for (let i = 2; i <= Math.min(n1, n2); i++) {
        if (n1 % i == 0 && n2 % i == 0)
            r.push(i);
    }
    return r;
}

function canSeeAtLocation(data, x1, y1) {
    // if (data[y1][x1] !== '#')
    //     return [x1, y1, []];

    let can_see = [];

    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[0].length; x++) {
            // Asteroid can be spotted if no multiple exists
            let dx = x - x1;
            let dy = y - y1;

            if (dx === 0 && dy === 0)
                continue;
            if (data[y][x] !== '#')
                continue;

            let f_c = factor(Math.abs(dx), Math.abs(dy));
            let can_be_spotted = true;
            let gcf = Math.max.apply(null, f_c);
            let i = 1;

            while (true) {
                let tx = x1 + (dx / gcf) * i;
                let ty = y1 + (dy / gcf) * i;

                if (tx === x && ty === y)
                    break;
                if (data[ty][tx] === '#') {
                    can_be_spotted = false;
                    break;
                }

                i++;
            }

            // Check horz and vertical
            if (x1 === x) {
                let [ys, ys2] = [y, y1];
                if (y1 < y) [ys, ys2] = [y1, y];
                for (let ny = ys + 1; ny < ys2; ny++) {
                    if (data[ny][x] === '#'){
                        can_be_spotted = false;
                        break;
                    }
                }
            } else if (y1 === y) {
                let [xs, xs2] = [x, x1];
                if (x1 < x) [xs, xs2] = [x1, x];
                for (let nx = xs + 1; nx < xs2; nx++) {
                    if (data[y][nx] === '#'){
                        can_be_spotted = false;
                        break;
                    }
                }
            }
            if (can_be_spotted)
                can_see.push([x, y]);
        }
    }
    return [x1, y1, can_see];
}


function vaporize_until_none(data, x, y) {
    let see = canSeeAtLocation(data, x, y)[2];
    let required = 0;
    while (see.length > 0) {
        // Sort by angle
        see = see.sort((a, b) => {
            let [x1, y1] = [a[0], a[1]];
            let [x2, y2] = [b[0], b[1]];
            if (x1 == x && y1 < y)
                return -1;
            if (x2 == x && y2 < y)
                return 1;

            let angle1 = Math.atan2(y1 - y, x1 - x) + 3.1415 / 2;
            let angle2 = Math.atan2(y2 - y, x2 - x) + 3.1415 / 2;
            while (angle1 < 0) angle1 += 2 * 3.1415;
            while (angle2 < 0) angle2 += 2 * 3.1415;
            while (angle1 > 2 * 3.1415) angle1 -= 2 * 3.1415;
            while (angle2 > 2 * 3.1415) angle2 -= 2 * 3.1415;
            if (Math.abs(angle1 < 0.01)) angle1 = 0;
            if (Math.abs(angle2 < 0.01)) angle2 = 0;
            return angle1 - angle2;
        });

        for (let s of see) {
            required++;

            if (required === 200) {
                console.log('FOUND 200th at ', s)
                console.log(s[0] * 100 + s[1])
            }
            data[s[1]][s[0]] = required;
        }

        // Reset
        see = canSeeAtLocation(data, x, y)[2];
    }
    return [x, y, required];
}

/**
 * Run the int byte code program on an array
 * of integers
 * @param {Array} data
 */
function solve(data) {
    let r = [];
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[0].length; x++) {
            r.push(canSeeAtLocation(data, x, y));
        }
    }
    let best_station = r.sort((a, b) => b[2].length - a[2].length)[0];

    console.log('Best station at', best_station[0], best_station[1])
    vaporize_until_none(data, best_station[0], best_station[1]);
}

module.exports = {
    run: () => {
        let data = common.readInput('./10/input.txt');
        data = data.split('\n').map(x => x.split(''));
        
        let r = solve(data);
        return r;
    }
}