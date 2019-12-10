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
    if (data[y1][x1] !== '#')
        return 0;

    let f = 0;
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
            f += can_be_spotted ? 1 : 0;

            if (!can_be_spotted && x1 == 6 && y1 == 3)
                console.log(x1, y1, " can't spot ", x, y)
        }
    }
    return f;
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
    return Math.max.apply(null, r);
}

module.exports = {
    run: () => {
        let data = common.readInput('./10/input.txt');
        data = data.split('\n');
        
        return solve(data);
    }
}