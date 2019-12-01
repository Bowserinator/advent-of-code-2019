const common = require('../common.js');

/**
 * How much fuel does <mass> take
 * @param {number} mass
 */
function doFuelCalc(mass) {
    return Math.floor(+mass / 3) - 2;
}

/**
 * How much fuel does <mass> take, also
 * considering mass of fuel
 * @param {number} mass
 */
function doFuelCalcWithFuel(mass) {
    let total = 0;
    let fuel_val = doFuelCalc(mass);

    while (fuel_val > 0) {
        total += fuel_val;
        fuel_val = doFuelCalc(fuel_val);
    }
    return total;
}

module.exports = {
    run: () => {
        let data = common.parseNumberFile('./1/input.txt');
        return common.sum(data.map(doFuelCalcWithFuel));
    }
}