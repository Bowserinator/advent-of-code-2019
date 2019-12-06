const common = require('../common.js');

/**
 * Run the int byte code program on an array
 * of integers
 * @param {Array} data
 */
function solve(data) {
    let m = {};
    let rm = {};
    let already = {};

    for (let line of data) {
        m[line[0]] = line[1];
        rm[line[1]] = line[0];
    }

    let count = 0;
    for (let line of data) {
        count++;

        let t = line[0];
        while (m[t]) {
            if (t != line[0])
                count++;
            t = rm[t];
        }
    }
    return count;
}

module.exports = {
    run: () => {
        let data = common.readInput('./6/input.txt').split('\n').map(x => x.split(')'));
        return solve(data);
        // return r[r.length - 1];
    }
}