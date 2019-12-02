const common = require('../common.js');
const CODES = [1, 2];

/**
 * Run the int byte code program on an array
 * of integers
 * @param {Array} data
 */
function solve(data) {
    let pos = 0;

    while (CODES.includes(data[pos])) {
        let newpos = data[pos + 3];

        if (data[pos] === 1) // Addition code
            data[newpos] = data[data[pos + 1]] + data[data[pos + 2]];
        else if (data[pos] === 2)
            data[newpos] = data[data[pos + 1]] * data[data[pos + 2]];
        pos += 4;
    }
    return data[0];
}

module.exports = {
    run: () => {
        let data = common.readInput('./2/input.txt').split(',').map(x => +x);;

        // Part 2
        for (let a = 0; a < 100; a++) {
            for (let b = 0; b < 100; b++) {
                let copy = [...data];
                copy[1] = a;
                copy[2] = b;
                if (solve(copy) === 19690720)
                    return 100 * a + b;
            }
        }

        return -1;
    }
}