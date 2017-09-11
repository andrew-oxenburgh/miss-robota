# miss-robota
a very simple robot moving around in 2d space

## Usage:

```
git clone https://github.com/andrew-oxenburgh/miss-robota.git
cd miss-robota
npm install && npm run qa
node src/parser.js --filename FILENAME
node src/parser.js --filename FILENAME --width 100 --height 100
npm run test-a
npm run test-b
npm run test-c
```

You can optionally set width and height of the tabletop using the --width --height flags. Defaults to 5. (no unit tests for this)

Also, I added running the test scripts into ```package.json```

## Assumptions

1. Can have multiple PLACE statements
1. Will accept command in lower case, and needing trimming
1. JSCS - airbnb preferences, with different spacing. Just chose one.
1. I've got mocha tests for the core functionality. The wrapper stuff in parser.js is not unit tested.
1. Will ignore invalid commands
1. I've used switch statements a lot, where I might have been able to use an array, but this works.
1. I used '_' prefixes to indicate private functions. I know this isn't standard, but just by convention.
1. Ignores all statements before a PLACE statement.

### Specification

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.

There are no other obstructions on the table surface.

The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

The application that can read in commands of the following form

```
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
```

PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.

The origin (0,0) can be considered to be the SOUTH WEST most corner.

The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.

MOVE will move the toy robot one unit forward in the direction it is currently facing.

LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

REPORT will announce the X,Y and F of the robot.

Any move that would cause the robot to fall must be ignored.

### Example Input and Output:

#### a)

```
PLACE 0,0,NORTH
MOVE
REPORT
```

Output: 0,1,NORTH

#### b)

```
PLACE 0,0,NORTH
LEFT
REPORT
```
Output: 0,0,WEST

#### c)

```
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
```
Output: 3,3,NORTH
