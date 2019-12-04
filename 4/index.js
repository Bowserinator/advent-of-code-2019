const common = require('../common.js');

/**
 * Run the int byte code program on an array
 * of integers
 * @param {Array} data
 */
function solve(data) {
    let c = 0;
    for (let i = data[0]; i <= data[1]; i++) {
        let temp = '' + i;
        let found = 0;
        let works = true;

        for (let j = 0; j < temp.length - 1; j++) {
            if (temp[j] > temp[j + 1]) {
                works = false; break;
            }
        }

        if (works) {
            for (let d = 0; d < 10; d++) {
                d = '' + d;
                if (temp.includes(d.repeat(2))) {
                    works = works && true;
                    if (temp.includes(d.repeat(3))) {}
                    else found++;
                }
            }
            if (found == 0) works = false;
        }

        if (works) { c++; }
    }
    return c;
}

module.exports = {
    run: () => {
        let data = common.readInput('./4/input.txt');
        data = data.split('-').map(x => +x);

        return solve(data);
    }
}