# Hi!

This is my solution to the challenge. You can run the app with `npm start`.

This program uses a user's CLI inputs to do 2 things:

1. Create a grid
2. Place rovers in the grid, move them, and log their results

It makes a few key assumptions:

1. The program only creates one grid: change the grid's dimensions by restarting the program
2. Rovers aren't reused: they're unique to each user input
3. The program expects users to place and move rovers until its stopped

## Classes

The program in `app.js` runs on 3 lines:

```javascript
const Engine = require("./classes/Engine");

// Instantiate an engine instance
const engine = new Engine();

// Run the program that asks rover inputs in an infinite loop
engine.execute();
```

This is because under the hood there are 3 classes:

1. `Engine`: handles the interactions with the user, controls the grid and rovers, and how both of these share data (like the controller in an MVC framework)
2. `Grid`: stores the user's grid dimensions when the engine starts and uses its data to check if rovers are lost
3. `Rover`: instantiates rovers and encapsulates their data (position, orientation, and commands) and methods that control their movements

### Class relationships

Each engine instance stores a grid as its property to reference the dimensions.

With rover instances it's different: they aren't saved as a property of an engine and only function within an engine's `execute` instance method.

None of these classes share an inheritance relationship between them.

## Display module and UI decisions

I made the decision to extent how the program interacted with the user to make it more understandable and easy to use.

The 3 key decisions were:

1. Adding console logs with helpful information (`Display` module was helpful)
2. Being more flexible with what input's accepted from the user
3. Throwing errors with messages when inputs were incorrect

### `Display` module

The `Display` module stores variables and functions to display information to the user. This removes display-related complexity (e.g. long strings that'll be logged) from the classes.

### Regex and input flexibility

I used regex to account for variations in whitespace. This means that the following are all valid inputs:

```bash
(0, 1, N) FFFF
(0, 1, N) FRrlL
(0, 1, N) FRrlL
   (0, 1, N) FRrflL
   (0, 1, N)FRrflL
  ( 0, 1 , N ) FRrflL
(0,1,N) FRrlL
(0,1,N)FRrlL
```

But these are not valid (the first has whitespace after the commands):

```bash
(0, 1, N) FRrlL 
(0, 1, N) FRrf lL
```

### Throwing errors when inputs were incorrect

The program throws errors and stops executing in 3 cases:

1. The grid isn't given 2 non-negative integers
2. The rover's input is incorrectly formatter (e.g. no parentheses)
3. The rover is set to be placed outside the grid

This is because badly formatted inputs compromise the rest of the program.

## Testing

I tested 2 classes to 100% coverage with Jest unit tests: `Grid` and `Rover`. You can run the tests with `npm test`.

Future work would involve creating the integration tests for the `Engine` class.

I also frequently tested during development with `console.log` statements, which I later removed.

## Future work

These are ways to meaningfully extend the program:

- Catch input errors and have them request new user inputs to allow users to correct their mistake
- Add more logic to the engine to make it more user-friendly, e.g.:
  - Enter `I` to display the program's instructions
  - Enter `E` to exit the program
  - Enter `R` to restart the grid's dimensions
- Provide more specific error messages
  - E.g. "You missed parentheses in your inputs" rather than always "The rover's input was formatted incorrectly"
- Write `Engine` integration tests
- Extend `Rover`'s input parsing abilities to make it more user friendly
  - E.g. accept inputs with space but not comma separation and without parentheses

---

The below are my notes as I brainstormed and broke down the problem. They differ in parts with what I ended up implementing.

### Engine

Add more flexibility to the engine, such as by:

- More complex input logic for better UX: e.g. `I` to log instructions, `E` to exit
- Allowing the game to restart and change the grid's dimensions without exiting the program
- Expanding the `Engine`'s properties to store new information (e.g. total rovers created, total lost rovers)

- Input integrity for `Grid` and `Rover`
  - What if too many or too few spaces?
  - What if string has the wrong casing?
  - What if the wrong type? No inputs?
  - What if the string isn't formatted well? E.g. no parentheses around rover position
- How to exit the game through a CLI command to the engine?
- How can a game restart and change a grid's dimensions?
- How can you view the game's instructions?
- How to test?
  - Jest
- Where to do error handling?
- What extra data to store in these classes?
  - E.g. Store in engine each grid to run analyses (e.g. how many lost)

Problem
- Take commands and use them to move robots around
- World is modelled as a grid with size m x n
- Each robot has:
  - A position (x, y)
  - An orientation (N, E, S, W))
  - (0, 0) represents the most southwest corner of the grid
- Each robot can:
  - Move forward one space: F
  - Rotate left 90º: L
  - Rotate right 90º: R
- If the robot moves off the grid it's marked as "lost"
  - If it's lost, the robot records
    - Last valid grid position
    - Last orientation
- Program
  - Read inputs
  - Update robot
  - Print final states

Considerations
- Testing
- Error handling

Assumptions
- Only log to the console: a UI isn't needed

Deliverable
- Upload on Github and send link

Approach

1. Create solution based on inputs in the program
  2 classes: Grid and Robot
  - Grid is instantiated with a grid size
    - Needs an input to start
    - Can the grid dimensions change?
  - Robots are created within a grid
    - Robot stores the grid size
    - Robots are stored within the grid
    - Think of methods and data related to robots that should be stored in the grid (e.g. # of lost robots, # of non-lost robots, # robots, etc)

2. Create a solution based on CLI inputs
  - Program starts when you send 2 numbers: e.g. 16 and 8 -> this creates the grid
    - What if 2 numbers aren't sent? Raise something
  - Once a grid has been created, it takes in robots and their movements with
    - (m, n, orientation) [MOVEMENTS]
  - The grid then logs to the console the results of the operation
  - Each input of a robot and its actions is unique and is detached from previous inputs for the robot

  Classes
  - Engine: creates a grid and take commands
    - Properties
      - Grid object
    - Methods
      - createAndMoveRobot
        - Executes while true to create an infinite loop
        - takes user input and uses it to create a Robot and move it

  - Grid: sets the size of the grid
    - Used as reference by the robot so make sure it isn't off the grid
    - KEY QUESTION: is this class needed? If so, where should it be placed?
      - How do I pass the grid's dimensions to the robot? -> comparison probably done at the engine level?

  - Robot: starts at a location and moves based on inputs
    - Input: readline string
    - Properties
      - x: x position in grid (x, y)
      - y: y position in grid (x, y)
      - Orientation: N, E, W, S
      - Commands: array of string
        - Remove by doing shift() on the array
        - Get value of shift() (i.e. command)
        - Based on shift value change x, y or orientation
    - Instance methods
      - executeCommands: execute all commands until none remain
      - moveOrientation: execute a single orientation command (i.e. L, R)
      - moveForward: change x or y based on orientation
    - Static methods
      - Process string inputs: needed to initialize the robot

  Module
  - Display: stores display messages
    - Include it in the Engine class

  Considerations
  - What interfaces are public? Which private? How to enforce?
  - What if too many or too few spaces?
  - What if inputs aren't valid?
  - How can a game restart and change a grid's dimensions?
  - How can you view the game's instructions?
  - How to test?
  - How to do error handling?
  - Doesn't stop rover