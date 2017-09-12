var fs = require('fs');
var readline = require('readline');
var { TableTop } = require('./robota');

var argv = require('minimist')(process.argv.slice(2), {
    alias: {
        filename: '-f', interactive: '-i',
    }, });

var table = new TableTop(argv.width, argv.height);

if (argv.interactive) {
    var repl = require('repl');
    function initializeContext(context) {
        context.table = table;
    }

    console.log("REMINDER: you'll need a PLACE command to start this.");

    var r = repl.start({ prompt: '> ', eval: table.command.bind(table) });
    initializeContext(r);

}else if (argv.filename) {
    var rl = readline.createInterface({
        input: fs.createReadStream(argv.filename),
        output: process.stdout,
        terminal: false,
    });
    rl.on('line', function (line) {
        table.command(line); //or parse line
    });
}else {
    var stdin = process.openStdin();

    var data = '';

    stdin.on('data', function (chunk) {
        data += chunk;
    });

    stdin.on('end', function () {
        let lines = data.split('\n');
        for (line in lines) {
            table.command(lines[line]);
        }
    });

}

