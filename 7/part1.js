const common = require('../common.js');

/**
 * Run the int byte code program on an array
 * of integers
 * @param {Array} data
 */
function solve(data, input1, input2) {
    let pos = 0;
    let inputs = 0;
    data = [...data];

    while (true) {
        let s = data[pos] + '';
        let inc = 0;

        while (s.length < 5)
            s = '0' + s;

        let instr = +(s.slice(-2));
        let mode1 = +(s.slice(-3, -2));
        let mode2 = +(s.slice(-4, -3));
        let mode3 = +(s.slice(-5, -4));

        let val1 = mode1 === 0 ? data[data[pos + 1]] : data[pos + 1];
        let val2 = mode2 === 0 ? data[data[pos + 2]] : data[pos + 2];
        let newpos = mode3 === 0 ? data[pos + 3] : pos + 3;
        let newpos2 = mode3 === 0 ? data[pos + 1] : pos + 1;

        if (instr === 1) { // Addition code
            data[newpos] = val1 + val2;
        }
        else if (instr === 2) {
            data[newpos] = val1 * val2;
        }
        else if (instr === 3) {
            data[newpos2] = inputs === 0 ? input1 : input2;
            inputs++;
        }
        else if (instr === 4) {
            return data[newpos2];
        }
        else if (instr === 5) {
            if (val1 !== 0) pos = val2;
            else inc = 3;
        }
        else if (instr === 6) {
            if (val1 === 0) pos = val2;
            else inc = 3;
        }
        else if (instr === 7) {
            data[newpos] = val1 < val2 ? 1 : 0;
            inc = 4;
        }
        else if (instr === 8) {
            data[newpos] = val1 === val2 ? 1 : 0;
            inc = 4;
        }

        else break;

        if (instr >= 1 && instr <= 2)
            inc = 4;
        else if (instr >= 3 && instr <= 4)
            inc = 2;

        pos += inc;
    }
    return -1;
}

module.exports = {
    run: () => {
        let max = 0;
        let max2 = '';
        for (let A = 0; A <= 4; A++) {
        for (let B = 0; B <= 4; B++) {
        for (let C = 0; C <= 4; C++) {
        for (let D = 0; D <= 4; D++) {
        for (let E = 0; E <= 4; E++) {
            if ([...new Set([A, B, C, D, E])].length !== 5)
                continue;

            let data = common.readInput('./7/input.txt').split(',').map(x => +x);
            // data = '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0'.split(',').map(x => +x);
            let x = solve(data, A, 0);
            x = solve(data, B, x);
            x = solve(data, C, x);
            x = solve(data, D, x);
            x = solve(data, E, x);
            if (x > max) {
                max = x;
                max2 = [A, B, C, D, E].join(', ');
            }
        }}}}}
        console.log('Not the answer, but combo: ', max2);
        return max; // 21825090
    }
}