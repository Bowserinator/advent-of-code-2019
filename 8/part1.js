const common = require('../common.js');

/**
 * Run the int byte code program on an array
 * of integers
 * @param {Array} data
 */
function solve(data) {

}

module.exports = {
    run: () => {
        let data = common.readInput('./8/input.txt').split('');
        let max0, maxi;
        max0 = -1;

        for (let i = 0; i < data.length / 25 / 6; i++) {
            let zero = 0;
            for (let j = i * 25 * 6; j < 25 * 6 + i * 25 * 6; j++) {
                if (data[j] == '0')
                    zero++;
            }
            if (max0 === -1 || zero < max0) {
                max0 = zero;
                maxi = i;
            }
        }

        let one = 0;
        let two = 0;

        for (let j = maxi * 25 * 6; j < 25 * 6 + maxi * 25 * 6; j++) {
            if (data[j] == 1)
                one++;
            else if (data[j] == 2)
                two++;
        }

        return one * two;
    }
}