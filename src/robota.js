exports.TableTop = class TableTop{

    constructor(w, h) {
        this.width = w || 5;
        this.height = h || 5;
        this.north = 0;
        this.east = 0;
        this.facing = 'N';
        this.running = false;
    }

    command(cmd) {
        cmd = cmd.trim().toUpperCase();
        if (cmd.indexOf('PLACE') === 0) {
            var params = cmd.substring('PLACE '.length).split(',');
            this.place(parseInt(params[0]), parseInt(params[1]), params[2]);
            this.running = true;
            return;
        }

        if (!this.running) {
            return;
        }

        switch (cmd) {
            case 'MOVE':
                this.move();
                break;
            case 'LEFT':
                this.left();
                break;
            case 'RIGHT':
                this.right();
                break;
            case 'REPORT':
                console.log(this.report().replace(/ /g, ''));
                break;
        }
    }

    place(e, n, f) {
        this.north = n;
        this.east = e;
        this.facing = f;
        this._normaliseNorth();
        this._normaliseEast();
        this._normaliseFacing();
    }

    move() {
        switch (this.facing) {
            case 'N':
                this.north++;
                break;
            case 'E':
                this.east++;
                break;
            case 'S':
                this.north--;
                break;
            case 'W':
                this.east--;
                break;
        }
        this._normaliseNorth();
        this._normaliseEast();
    }

    left() {
        let directions = 'NWSE';
        this.facing = directions[(directions.indexOf(this.facing) + 1) % directions.length];
    }

    right() {
        let directions = 'ESWN';
        this.facing = directions[(directions.indexOf(this.facing) + 1) % directions.length];
    }

    report() {
        let directions = {
            N: 'NORTH',
            S: 'SOUTH',
            E: 'EAST',
            W: 'WEST',
        };
        return this.east + ', ' + this.north + ', ' + directions[this.facing];
    }

    _normaliseNorth() {
        if (this.north >= this.height) {
            this.north = this.height - 1;
        }

        if (this.north < 0) {
            this.north = 0;
        }
    }

    _normaliseEast() {
        if (this.east >= this.width) {
            this.east = this.width - 1;
        }

        if (this.east < 0) {
            this.east = 0;
        }
    }

    _normaliseFacing() {
        this.facing = this.facing.substring(0, 1);
        if ('NSEW'.indexOf(this.facing) < 0) {
            this.facing = 'N';
        }
    }
};

