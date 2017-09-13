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
            r.place(4, 0, 'S');
            r.move();
            pos = r.report();
            assert.equal(pos, '4, 0, SOUTH');
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
            r.place(0, 4, 'W');
            r.move();
            pos = r.report();
            assert.equal(pos, '0, 4, WEST');
        });
    });

    describe('moving freely', function () {
        it('east', function () {
            r = new TableTop();
            r.place(1, 1, 'E');
            r.move();
            pos = r.report();
            assert.equal(pos, '2, 1, EAST');
        });

        it('north', function () {
            r = new TableTop();
            r.place(1, 1, 'N');
            r.move();
            pos = r.report();
            assert.equal(pos, '1, 2, NORTH');
        });

        it('south', function () {
            r = new TableTop();
            r.place(1, 1, 'S');
            r.move();
            pos = r.report();
            assert.equal(pos, '1, 0, SOUTH');
        });

        it('west', function () {
            r = new TableTop();
            r.place(1, 1, 'W');
            r.move();
            pos = r.report();
            assert.equal(pos, '0, 1, WEST');
        });
    });

    describe('place', function () {
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
            r.place(3, 6, 'U');
            pos = r.report();
            assert.equal(pos, '3, 4, NORTH');
        });

        it('out of range too high', function () {
            r = new TableTop();
            r.place(5, 3, 'U');
            pos = r.report();
            assert.equal(pos, '4, 3, NORTH');
        });

        it('out of range too low', function () {
            r = new TableTop();
            r.place(-1, -1, 'T');
            pos = r.report();
            assert.equal(pos, '0, 0, NORTH');
        });

        it('out of range bit of both', function () {
            r = new TableTop();
            r.place(7, -1, 'T');
            pos = r.report();
            assert.equal(pos, '4, 0, NORTH');
        });
    });

    let check = function (r, cmd, pos) {
        r.command(cmd);
        assert.equal(r.report(), pos);
    };

    describe('program - written statements', function () {
        describe('place statement should', function () {
            it('accept extra spaces', function () {
                r = new TableTop();
                check(r, 'PLACE  2 , 1 , WEST  ', '2, 1, WEST');
            });

            it('accept extra commas', function () {
                r = new TableTop();
                check(r, 'PLACE  2 , 1 , SOUTH ,, ', '2, 1, SOUTH');
            });

            it('handle no params - not move ', function () {
                r = new TableTop();
                check(r, 'PLACE', '0, 0, NORTH');
            });
        });

        it('lots of statements', function () {
            r = new TableTop();
            check(r, 'PLACE 2,1,NORTH', '2, 1, NORTH');
            check(r, 'MOVE', '2, 2, NORTH');
            check(r, 'MOVE', '2, 3, NORTH');
            check(r, 'MOVE', '2, 4, NORTH');
            check(r, 'MOVE', '2, 4, NORTH');
            check(r, 'MOVE', '2, 4, NORTH');
            check(r, 'MOVE', '2, 4, NORTH');
            check(r, 'right', '2, 4, EAST');
            check(r, 'RIGHT', '2, 4, SOUTH');
            check(r, ' RIGHT ', '2, 4, WEST');
            check(r, 'RIGHT ', '2, 4, NORTH');
            check(r, 'LEFT ', '2, 4, WEST');
            check(r, 'LEFT ', '2, 4, SOUTH');
            check(r, 'MOVE', '2, 3, SOUTH');
            check(r, 'MOVE', '2, 2, SOUTH');
            check(r, 'MOVE', '2, 1, SOUTH');
            check(r, 'MOVE', '2, 0, SOUTH');
            check(r, 'MOVE', '2, 0, SOUTH');
            check(r, 'MOVE', '2, 0, SOUTH');
            check(r, 'MOVE', '2, 0, SOUTH');
            check(r, 'REPORT', '2, 0, SOUTH');
        });

        it('ignore statements before initial PLACE', function () {
            r = new TableTop();
            check(r, 'MOVE', '0, 0, NORTH');
            check(r, 'RIGHT', '0, 0, NORTH');
            check(r, 'LEFT', '0, 0, NORTH');
            check(r, 'REPORT', '0, 0, NORTH');
            check(r, 'PLACE 2,1,NORTH', '2, 1, NORTH');
            check(r, 'MOVE', '2, 2, NORTH');
            check(r, 'MOVE', '2, 3, NORTH');
        });

        it('handle empty statements', function () {
            r = new TableTop();
            check(r, ' ', '0, 0, NORTH');
            check(r, '', '0, 0, NORTH');
            check(r, 'UNKNOWN', '0, 0, NORTH');
        });
    });
});
