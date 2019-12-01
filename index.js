/* Call index.js <day> to run */
const chalk = require('chalk');
const fs = require('fs');

/**
 * Outputs error message to console
 * @param {string} msg
 * @param {string} extra_help Optional additional help text
 */
function error(msg, extra_help=null) {
    console.log(chalk.red.bold('Error:'), chalk.red(msg));
    if (extra_help !== null)
        console.log(extra_help);
    process.exit(1);
}

/* ---------- Parsing ------------ */
let day = +process.argv[process.argv.length - 1];

// Error checking
if (Number.isNaN(day))
    error('Could not parse day number', 'Syntax: index.js <day: 1-25>');
if (day < 1 || day > 25)
    error('Day must be between 1 and 25 inclusive', 'Syntax: index.js <day: 1-25>');
if (Math.floor(day) !== day)
    error('Day must be an integer', 'Syntax: index.js <day: 1-25>');
if (!fs.existsSync(`./${day}`))
    error('Directory ./' + day + ' does not exist', 'Try creating it maybe?');

console.log(require(`./${day}/index.js`).run());
