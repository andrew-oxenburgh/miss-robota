var assert = require('assert');

var { TableTop } = require('../src/robota');

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
                r.place(4, 4, 'SOUTH');
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

        describe('program - written statements', function () {
            it('1', function () {
                r = new TableTop();
                r.command('PLACE 1,2,NORTH');
                assert.equal(r.report(), '1, 2, N');
                r.command('move');
                assert.equal(r.report(), '2, 2, N');
                r.command(' MOVE');
                assert.equal(r.report(), '3, 2, N');
                r.command('MOVE ');
                assert.equal(r.report(), '4, 2, N');
                r.command('MOVE');
                assert.equal(r.report(), '4, 2, N');
                r.command('RIGHT');
                assert.equal(r.report(), '4, 2, E');
                r.command('RIGHT');
                assert.equal(r.report(), '4, 2, S');
                r.command('RIGHT');
                assert.equal(r.report(), '4, 2, W');
                r.command('RIGHT');
                assert.equal(r.report(), '4, 2, N');
                r.command('LEFT');
                assert.equal(r.report(), '4, 2, W');
                r.command('LEFT');
                assert.equal(r.report(), '4, 2, S');
                r.command('LEFT');
                assert.equal(r.report(), '4, 2, E');
                r.command('LEFT');
                assert.equal(r.report(), '4, 2, N');
                r.command('report');
            });
        });

        describe('program - multiple statements', function () {
            it('1', function () {
                r = new TableTop();
                r.place(1, 2, 'W');
                assert.equal(r.report(), '1, 2, W');
                r.move();
                assert.equal(r.report(), '1, 1, W');
                r.move();
                assert.equal(r.report(), '1, 0, W');
                r.move();
                assert.equal(r.report(), '1, 0, W');
                r.move();
                assert.equal(r.report(), '1, 0, W');
                r.move();
                assert.equal(r.report(), '1, 0, W');
                r.left();
                assert.equal(r.report(), '1, 0, S');
                r.left();
                assert.equal(r.report(), '1, 0, E');
                r.left();
                assert.equal(r.report(), '1, 0, N');
                r.move();
                assert.equal(r.report(), '2, 0, N');
                r.move();
                assert.equal(r.report(), '3, 0, N');
                r.move();
                assert.equal(r.report(), '4, 0, N');
                r.move();
                assert.equal(r.report(), '4, 0, N');
                r.move();
                assert.equal(r.report(), '4, 0, N');
                r.move();
                assert.equal(r.report(), '4, 0, N');
                r.right();
                assert.equal(r.report(), '4, 0, E');
                r.move();
                assert.equal(r.report(), '4, 1, E');
                r.move();
                assert.equal(r.report(), '4, 2, E');
                r.move();
                assert.equal(r.report(), '4, 3, E');
                r.move();
                assert.equal(r.report(), '4, 4, E');
                r.move();
                assert.equal(r.report(), '4, 4, E');
                r.right();
                assert.equal(r.report(), '4, 4, S');
                r.right();
                assert.equal(r.report(), '4, 4, W');
                r.right();
                assert.equal(r.report(), '4, 4, N');
                r.right();
                assert.equal(r.report(), '4, 4, E');
            });
        });

    });
