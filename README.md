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

1. Adding console logs with helpful information (see the `Display` module)
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

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 grid.js  |     100 |      100 |     100 |     100 |
 rover.js |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------

Test Suites: 2 passed, 2 total
Tests:       36 passed, 36 total
Snapshots:   0 total
Time:        0.833 s, estimated 1 s

Future work would involve creating the integration tests for the `Engine` class.

I also frequently tested during development with `console.log` statements, which I later removed.

## Future work

These are ways to meaningfully extend the program:

- Catch input errors and have them request new user inputs to allow users to correct their mistake instead of stopping the program
- Add more logic to the engine to make it more user-friendly, e.g.:
  - Enter `I` to display the program's instructions
  - Enter `E` to exit the program
  - Enter `R` to restart the grid's dimensions
- Provide more specific error messages
  - E.g. "You missed parentheses in your inputs" rather than always "The rover's input was formatted incorrectly"
- Write `Engine` integration tests
- Extend `Rover`'s input parsing abilities to make it more user friendly
  - E.g. accept inputs with space but not comma separation and without parentheses
