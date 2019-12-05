const common = require('../common.js');

/**
 * Run the int byte code program on an array
 * of integers
 * @param {Array} data
 */
function solve(data, input) {
    let pos = 0;

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

        if (instr === 1) // Addition code
            data[newpos] = val1 + val2;
        else if (instr === 2)
            data[newpos] = val1 * val2;
        else if (instr === 3)
            data[newpos2] = input;
        else if (instr === 4)
            console.log('OUTPUT: ', data[newpos2]);
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

        //console.log("> ", mode1, mode2, mode3);
        //console.log(instr, val1, val2, newpos, newpos2)
        //console.log(data)

        pos += inc;
    }
    return data;
}

module.exports = {
    run: () => {
        let data = common.readInput('./5/input.txt').split(',').map(x => +x);
        // data = '3,3,1105,-1,9,1101,0,0,12,4,12,99,1'.split(',').map(x => +x);
        let r = solve(data, 5);
        // return r[r.length - 1];
    }
}