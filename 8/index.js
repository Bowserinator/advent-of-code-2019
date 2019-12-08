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
        // data = '0222112222120000';
        const w = 25;
        const h = 6;

        let img = [];
        for (let i = 0; i < w * h; i++) {
            img.push(2);
        }

        for (let i = 0; i < data.length / w / h; i++) {
            for (let j = i * w * h; j < w * h + i * w * h; j++) {
                // console.log(data[j])
                if (img[j - i * w * h] == 2 && data[j] != '2')
                    img[j - i * w * h] = data[j];
            }
            // console.log('--', img.join(''))
        }

        let r = img.join('');
        let o = '';
        for (let i = 0; i < r.length; i++) {
            if (i % w == 0)
                o += '\n'
            // o += r[i];
            o += [' ', '1', ' '][r[i]];
        }

        return o;
    }
}