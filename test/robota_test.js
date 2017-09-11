var assert = require('assert');

class TableTop {

  constructor(w, h) {
    this.width = w || 5;
    this.height = h || 5;
    this.north = 0;
    this.east = 0;
    this.facing = 'N';
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
    if ('NSEW'.indexOf(this.facing) < 0) {
      this.facing = 'N';
    }
  }
}

describe('TableTop', function () {
    describe('turning left', function () {
        it('north, should turn west', function () {
            r = new TableTop();
            r.left();
            pos = r.report();
            assert.equal(pos, '0, 0, W');
          });

        it('south, should turn east', function () {
            r = new TableTop();
            r.place(4, 4, 'S');
            r.left();
            pos = r.report();
            assert.equal(pos, '4, 4, E');
          });

        it('east, should turn north', function () {
            r = new TableTop();
            r.place(4, 4, 'E');
            r.left();
            pos = r.report();
            assert.equal(pos, '4, 4, N');
          });

        it('west, should turn south', function () {
            r = new TableTop();
            r.place(4, 4, 'W');
            r.left();
            pos = r.report();
            assert.equal(pos, '4, 4, S');
          });
      });

    describe('turning right', function () {
        it('north, should turn east', function () {
            r = new TableTop();
            r.right();
            pos = r.report();
            assert.equal(pos, '0, 0, E');
          });

        it('south, should turn west', function () {
            r = new TableTop();
            r.place(4, 4, 'S');
            r.right();
            pos = r.report();
            assert.equal(pos, '4, 4, W');
          });

        it('east, should turn south', function () {
            r = new TableTop();
            r.place(4, 4, 'E');
            r.right();
            pos = r.report();
            assert.equal(pos, '4, 4, S');
          });

        it('west, should turn north', function () {
            r = new TableTop();
            r.place(4, 4, 'W');
            r.right();
            pos = r.report();
            assert.equal(pos, '4, 4, N');
          });
      });

    describe('moving too far - should not move at all', function () {
        it('east', function () {
            r = new TableTop();
            r.place(4, 4, 'E');
            r.move();
            pos = r.report();
            assert.equal(pos, '4, 4, E');
          });

        it('south', function () {
            r = new TableTop();
            r.place(0, 4, 'S');
            r.move();
            pos = r.report();
            assert.equal(pos, '0, 4, S');
          });

        it('north', function () {
            r = new TableTop();
            r.place(4, 4, 'N');
            r.move();
            pos = r.report();
            assert.equal(pos, '4, 4, N');
          });

        it('west', function () {
            r = new TableTop();
            r.place(4, 0, 'W');
            r.move();
            pos = r.report();
            assert.equal(pos, '4, 0, W');
          });
      });

    describe('moving freely', function () {
        it('east', function () {
            r = new TableTop();
            r.place(1, 1, 'E');
            r.move();
            pos = r.report();
            assert.equal(pos, '1, 2, E');
          });

        it('north', function () {
            r = new TableTop();
            r.place(1, 1, 'N');
            r.move();
            pos = r.report();
            assert.equal(pos, '2, 1, N');
          });

        it('south', function () {
            r = new TableTop();
            r.place(1, 1, 'S');
            r.move();
            pos = r.report();
            assert.equal(pos, '0, 1, S');
          });

        it('west', function () {
            r = new TableTop();
            r.place(1, 1, 'W');
            r.move();
            pos = r.report();
            assert.equal(pos, '1, 0, W');
          });
      });

    describe('place robot on table top', function () {
        it('11E', function () {
            r = new TableTop();
            r.place(1, 1, 'E');
            pos = r.report();
            assert.equal(pos, '1, 1, E');
          });

        it('22W', function () {
            r = new TableTop();
            r.place(2, 2, 'W');
            pos = r.report();
            assert.equal(pos, '2, 2, W');
          });

        it('44W', function () {
            r = new TableTop();
            r.place(4, 4, 'W');
            pos = r.report();
            assert.equal(pos, '4, 4, W');
          });

        it('out of range too high', function () {
            r = new TableTop();
            r.place(6, 6, 'U');
            pos = r.report();
            assert.equal(pos, '4, 4, N');
          });

        it('out of range too high', function () {
            r = new TableTop();
            r.place(5, 5, 'U');
            pos = r.report();
            assert.equal(pos, '4, 4, N');
          });

        it('out of range too low', function () {
            r = new TableTop();
            r.place(-1, -1, 'T');
            pos = r.report();
            assert.equal(pos, '0, 0, N');
          });

        it('out of range bit of both', function () {
            r = new TableTop();
            r.place(-1, 7, 'T');
            pos = r.report();
            assert.equal(pos, '0, 4, N');
          });
      });
  });
