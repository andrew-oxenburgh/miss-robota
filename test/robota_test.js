var assert = require('assert');

var { TableTop } = require('../src/robota');

describe('TableTop', function () {
        describe('turning left', function () {
            it('north, should turn west', function () {
                r = new TableTop();
                r.left();
                pos = r.report();
                assert.equal(pos, '0, 0, WEST');
            });

            it('south, should turn east', function () {
                r = new TableTop();
                r.place(4, 4, 'SOUTH');
                r.left();
                pos = r.report();
                assert.equal(pos, '4, 4, EAST');
            });

            it('east, should turn north', function () {
                r = new TableTop();
                r.place(4, 4, 'E');
                r.left();
                pos = r.report();
                assert.equal(pos, '4, 4, NORTH');
            });

            it('west, should turn south', function () {
                r = new TableTop();
                r.place(4, 4, 'W');
                r.left();
                pos = r.report();
                assert.equal(pos, '4, 4, SOUTH');
            });
        });

        describe('turning right', function () {
            it('north, should turn east', function () {
                r = new TableTop();
                r.right();
                pos = r.report();
                assert.equal(pos, '0, 0, EAST');
            });

            it('south, should turn west', function () {
                r = new TableTop();
                r.place(4, 4, 'S');
                r.right();
                pos = r.report();
                assert.equal(pos, '4, 4, WEST');
            });

            it('east, should turn south', function () {
                r = new TableTop();
                r.place(4, 4, 'E');
                r.right();
                pos = r.report();
                assert.equal(pos, '4, 4, SOUTH');
            });

            it('west, should turn north', function () {
                r = new TableTop();
                r.place(4, 4, 'W');
                r.right();
                pos = r.report();
                assert.equal(pos, '4, 4, NORTH');
            });
        });

        describe('moving too far - should not move at all', function () {
            it('east', function () {
                r = new TableTop();
                r.place(4, 4, 'E');
                r.move();
                pos = r.report();
                assert.equal(pos, '4, 4, EAST');
            });

            it('south', function () {
                r = new TableTop();
                r.place(0, 4, 'S');
                r.move();
                pos = r.report();
                assert.equal(pos, '0, 4, SOUTH');
            });

            it('north', function () {
                r = new TableTop();
                r.place(4, 4, 'N');
                r.move();
                pos = r.report();
                assert.equal(pos, '4, 4, NORTH');
            });

            it('west', function () {
                r = new TableTop();
                r.place(4, 0, 'W');
                r.move();
                pos = r.report();
                assert.equal(pos, '4, 0, WEST');
            });
        });

        describe('moving freely', function () {
            it('east', function () {
                r = new TableTop();
                r.place(1, 1, 'E');
                r.move();
                pos = r.report();
                assert.equal(pos, '1, 2, EAST');
            });

            it('north', function () {
                r = new TableTop();
                r.place(1, 1, 'N');
                r.move();
                pos = r.report();
                assert.equal(pos, '2, 1, NORTH');
            });

            it('south', function () {
                r = new TableTop();
                r.place(1, 1, 'S');
                r.move();
                pos = r.report();
                assert.equal(pos, '0, 1, SOUTH');
            });

            it('west', function () {
                r = new TableTop();
                r.place(1, 1, 'W');
                r.move();
                pos = r.report();
                assert.equal(pos, '1, 0, WEST');
            });
        });

        describe('place robot on table top', function () {
            it('11E', function () {
                r = new TableTop();
                r.place(1, 1, 'E');
                pos = r.report();
                assert.equal(pos, '1, 1, EAST');
            });

            it('22W', function () {
                r = new TableTop();
                r.place(2, 2, 'W');
                pos = r.report();
                assert.equal(pos, '2, 2, WEST');
            });

            it('44W', function () {
                r = new TableTop();
                r.place(4, 4, 'W');
                pos = r.report();
                assert.equal(pos, '4, 4, WEST');
            });

            it('out of range too high', function () {
                r = new TableTop();
                r.place(6, 6, 'U');
                pos = r.report();
                assert.equal(pos, '4, 4, NORTH');
            });

            it('out of range too high', function () {
                r = new TableTop();
                r.place(5, 5, 'U');
                pos = r.report();
                assert.equal(pos, '4, 4, NORTH');
            });

            it('out of range too low', function () {
                r = new TableTop();
                r.place(-1, -1, 'T');
                pos = r.report();
                assert.equal(pos, '0, 0, NORTH');
            });

            it('out of range bit of both', function () {
                r = new TableTop();
                r.place(-1, 7, 'T');
                pos = r.report();
                assert.equal(pos, '0, 4, NORTH');
            });
        });

        describe('program - written statements', function () {
            it('1', function () {
                r = new TableTop();
                r.command('PLACE 1,2,NORTH');
                assert.equal(r.report(), '1, 2, NORTH');
                r.command('move');
                assert.equal(r.report(), '2, 2, NORTH');
                r.command(' MOVE');
                assert.equal(r.report(), '3, 2, NORTH');
                r.command('MOVE ');
                assert.equal(r.report(), '4, 2, NORTH');
                r.command('MOVE');
                assert.equal(r.report(), '4, 2, NORTH');
                r.command('RIGHT');
                assert.equal(r.report(), '4, 2, EAST');
                r.command('RIGHT');
                assert.equal(r.report(), '4, 2, SOUTH');
                r.command('RIGHT');
                assert.equal(r.report(), '4, 2, WEST');
                r.command('RIGHT');
                assert.equal(r.report(), '4, 2, NORTH');
                r.command('LEFT');
                assert.equal(r.report(), '4, 2, WEST');
                r.command('LEFT');
                assert.equal(r.report(), '4, 2, SOUTH');
                r.command('LEFT');
                assert.equal(r.report(), '4, 2, EAST');
                r.command('LEFT');
                assert.equal(r.report(), '4, 2, NORTH');
                r.command('report');
            });
        });

        describe('program - multiple statements', function () {
            it('1', function () {
                r = new TableTop();
                r.place(1, 2, 'W');
                assert.equal(r.report(), '1, 2, WEST');
                r.move();
                assert.equal(r.report(), '1, 1, WEST');
                r.move();
                assert.equal(r.report(), '1, 0, WEST');
                r.move();
                assert.equal(r.report(), '1, 0, WEST');
                r.move();
                assert.equal(r.report(), '1, 0, WEST');
                r.move();
                assert.equal(r.report(), '1, 0, WEST');
                r.left();
                assert.equal(r.report(), '1, 0, SOUTH');
                r.left();
                assert.equal(r.report(), '1, 0, EAST');
                r.left();
                assert.equal(r.report(), '1, 0, NORTH');
                r.move();
                assert.equal(r.report(), '2, 0, NORTH');
                r.move();
                assert.equal(r.report(), '3, 0, NORTH');
                r.move();
                assert.equal(r.report(), '4, 0, NORTH');
                r.move();
                assert.equal(r.report(), '4, 0, NORTH');
                r.move();
                assert.equal(r.report(), '4, 0, NORTH');
                r.move();
                assert.equal(r.report(), '4, 0, NORTH');
                r.right();
                assert.equal(r.report(), '4, 0, EAST');
                r.move();
                assert.equal(r.report(), '4, 1, EAST');
                r.move();
                assert.equal(r.report(), '4, 2, EAST');
                r.move();
                assert.equal(r.report(), '4, 3, EAST');
                r.move();
                assert.equal(r.report(), '4, 4, EAST');
                r.move();
                assert.equal(r.report(), '4, 4, EAST');
                r.right();
                assert.equal(r.report(), '4, 4, SOUTH');
                r.right();
                assert.equal(r.report(), '4, 4, WEST');
                r.right();
                assert.equal(r.report(), '4, 4, NORTH');
                r.right();
                assert.equal(r.report(), '4, 4, EAST');
            });
        });

    });
