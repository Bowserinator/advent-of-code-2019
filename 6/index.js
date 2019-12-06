const common = require('../common.js');

function searchmap(m, rm, start, end, absstart, searched) {
    let dis = 0;
    if (!start || !end)
        return 1e99;
    if (start === absstart)
        return 1e99;
    if (searched[start])
        return 1e99;
    if (start == end)
        return 0;

    let s = start;
    searched[s] = true;
    dis++;

    let d = [];
    let possibles = [];

    if (!m[s])
        return 1e99;
    possibles = possibles.concat(m[s]);
    possibles = possibles.concat(rm[s]);

    for (let possible of possibles)
        d.push(searchmap(m, rm, possible, end, s, searched));
    dis += Math.min.apply(Math, d);
    return dis;
}

/**
 * Run the int byte code program on an array
 * of integers
 * @param {Array} data
 */
function solve(data) {
    let m = {};
    let rm = {};

    for (let line of data) {
        if (!m[line[0]])
            m[line[0]] = [];
        m[line[0]].push(line[1]);
        if (!rm[line[1]])
            rm[line[1]] = [];
        rm[line[1]].push(line[0]);
    }

    let start = 'YOU';
    let end = 'SAN';
    let searched = {};
    let dis = searchmap(m, rm, rm[start][0], end, start, searched);
    return dis - 1;
}

module.exports = {
    run: () => {
        let data = common.readInput('./6/input.txt').split('\n').map(x => x.split(')'));
        return solve(data);
    }
}