const fs = require('fs');

module.exports = {
    readInput: dir => fs.readFileSync(dir).toString(),
    sum: arr => arr.reduce((a, b) => a + b),
    parseNumberFile: dir => fs.readFileSync(dir).toString().split('\n').map(x => +x),
    unique: arr => [...new Set(arr)]
};