
exports.TableTop = class {

    constructor(w, h) {
        this.width = w || 5;
        this.height = h || 5;
        this.north = 0;
        this.east = 0;
        this.facing = 'N';
    }

    command(cmd) {
        cmd = cmd.trim().toUpperCase();
        if (cmd.indexOf('PLACE') === 0) {
            var params = cmd.substring('PLACE '.length).split(',');
            this.place(parseInt(params[0]), parseInt(params[1]), params[2]);
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
                console.log(this.report());
                break;
        }
    }

    place(n, e, f) {
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
        switch (this.facing) {
            case 'N':
                this.facing = 'W';
                break;
            case 'E':
                this.facing = 'N';
                break;
            case 'S':
                this.facing = 'E';
                break;
            case 'W':
                this.facing = 'S';
                break;
        }
    }

    right() {
        switch (this.facing) {
            case 'N':
                this.facing = 'E';
                break;
            case 'E':
                this.facing = 'S';
                break;
            case 'S':
                this.facing = 'W';
                break;
            case 'W':
                this.facing = 'N';
                break;
        }
    }

    report() {
        return this.north + ', ' + this.east + ', ' + this.facing;
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

