var fs = require('fs');
var readline = require('readline');
var { TableTop } = require('./robota');
var argv = require('minimist')(process.argv.slice(2), { alias: { filename: '-f' } });

var table = new TableTop();

var rl = readline.createInterface({
    input: fs.createReadStream(argv.filename),
    output: process.stdout,
    terminal: false,
});
rl.on('line', function (line) {
    table.command(line); //or parse line
});

