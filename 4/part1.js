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
        if (/(.).*\1/.test(i)) {
            let works = true;
            for (let j = 0; j < temp.length - 1; j++) {
                if (temp[j] > temp[j + 1]) {
                    works = false; break;
                }
            }
            if (works) c++;
        }
    }
    return c;
}

module.exports = {
    run: () => {
        let data = common.readInput('./4/input.txt');
        data = '123257-647015';
        data = data.split('-').map(x => +x);

        return solve(data);
    }
}