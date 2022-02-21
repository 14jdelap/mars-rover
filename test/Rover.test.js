const Rover = require("../src/classes/Rover");

let rover;

describe("Correctly instantiate when it's given valid inputs", () => {
  // Rover position and orientation always within parentheses and comma-sepatated
  // Rover commands start after the closing parentheses and are only F, R or L
  // String processing is case insensitive

  test("No space between characters", () => {
    const input = "(0,0,N)FF";
    const rover = new Rover(input, 10, 10);

    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("N");
    expect(rover.commands.join("")).toBe("FF");
    expect(rover.lost).toBe(false);
  });

  test("Spaces between every character (except commands)", () => {
    const input = "  ( 0 , \n0 , \tN ) FF   ";
    const rover = new Rover(input, 10, 10);

    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("N");
    expect(rover.commands.join("")).toBe("FF");
    expect(rover.lost).toBe(false);
  });

  test("String with normal formatting", () => {
    const input = "(0, 0, N) FF";
    const rover = new Rover(input, 10, 10);

    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("N");
    expect(rover.commands.join("")).toBe("FF");
    expect(rover.lost).toBe(false);
  });

  test("Characters are in mixed case", () => {
    const input = "(0, 0, n) Ff";
    const rover = new Rover(input, 10, 10);

    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("N");
    expect(rover.commands.join("")).toBe("FF");
    expect(rover.lost).toBe(false);
  });
});

describe("Raise error when input is invalid", () => {
  test("No parentheses", () => {
      const input = "0, 0, n Ff";

      try {
        const rover = new Rover(input, 10, 10);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe("The rover's input is invalid");
      }
  });

  test("Commands are space-separated", () => {
    const input = "(0, 0, n) F f";

    try {
      const rover = new Rover(input, 10, 10);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("The rover's input is invalid");
    }
  });

  test("Commands contain values that aren't F, L or R", () => {
    const input = "(0, 0, n) Ffq1";

    try {
      const rover = new Rover(input, 10, 10);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("The rover's input is invalid");
    }
  });

  test("No commas within parentheses", () => {
    const input = "(0 0 n) Ff";

    try {
      const rover = new Rover(input, 10, 10);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("The rover's input is invalid");
    }
  });

  test("Rover position has negative values", () => {
    const input = "(-1, 0, n) Ff";

    try {
      const rover = new Rover(input, 10, 10);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("The rover's input is invalid");
    }
  });

  test("Rover lacks orientation", () => {
    const input = "(0, 0) Ff";

    try {
      const rover = new Rover(input, 10, 10);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("The rover's input is invalid");
    }
  });

  test("Rover has no commands", () => {
    const input = "(0, 0, N)";

    try {
      const rover = new Rover(input, 10, 10);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("The rover's input is invalid");
    }
  });

  test("Rover is created outside the grid", () => {
    const input = "(100, 100, N) FF";

    try {
      const rover = new Rover(input, 10, 10);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("The rover can't be placed outside the grid");
    }
  });
});

describe("Move Rover forward in every orientation", () => {
  test("Move rover forward North", () => {
    rover = new Rover("(5, 5, N) F", 10, 10)
    rover.move("F", 10, 10);

    expect(rover.x).toBe(5);
    expect(rover.y).toBe(6);
    expect(rover.orientation).toBe("N");
  });

  test("Move rover forward South", () => {
    rover = new Rover("(5, 5, S) F", 10, 10)
    rover.move("F", 10, 10);

    expect(rover.x).toBe(5);
    expect(rover.y).toBe(4);
    expect(rover.orientation).toBe("S");
  });

  test("Move rover forward East", () => {
    rover = new Rover("(5, 5, E) F", 10, 10)
    rover.move("F", 10, 10);

    expect(rover.x).toBe(6);
    expect(rover.y).toBe(5);
    expect(rover.orientation).toBe("E");
  });

  test("Move rover forward West", () => {
    rover = new Rover("(5, 5, W) F", 10, 10)
    rover.move("F", 10, 10);

    expect(rover.x).toBe(4);
    expect(rover.y).toBe(5);
    expect(rover.orientation).toBe("W");
  });

  test("Move rover into lost territory", () => {
    rover = new Rover("(0, 0, W) F", 10, 10)
    rover.move("F", 0, 0);

    // Mark lost as true; position remains at the last non-lost position
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("W");
    expect(rover.lost).toBe(true);
  });

  test("Mark as lost if starting outside grid", () => {
    rover = new Rover("(1, 1, E) F", 10, 10)
    rover.move("F", 0, 0);

    // If starting from outside grid, mark as lost and don't move
    expect(rover.x).toBe(1);
    expect(rover.y).toBe(1);
    expect(rover.orientation).toBe("E");
    expect(rover.lost).toBe(true);
  });
});

describe("Rotate rover left and right if it's inside the grid", () => {
  test("Start N rotate left to W", () => {
    rover = new Rover("(0, 0, N) L", 10, 10)
    rover.move("L", 0, 0);

    // If starting from outside grid, mark as lost and don't move
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("W");
    expect(rover.lost).toBe(false);
  });

  test("Start W rotate left to S", () => {
    rover = new Rover("(0, 0, W) L", 10, 10)
    rover.move("L", 0, 0);

    // If starting from outside grid, mark as lost and don't move
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("S");
    expect(rover.lost).toBe(false);
  });

  test("Start S rotate left to E", () => {
    rover = new Rover("(0, 0, S) L", 10, 10)
    rover.move("L", 0, 0);

    // If starting from outside grid, mark as lost and don't move
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("E");
    expect(rover.lost).toBe(false);
  });

  test("Start E rotate left to N", () => {
    rover = new Rover("(0, 0, E) L", 10, 10)
    rover.move("L", 0, 0);

    // If starting from outside grid, mark as lost and don't move
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("N");
    expect(rover.lost).toBe(false);
  });

  test("Start N rotate right to E", () => {
    rover = new Rover("(0, 0, N) R", 10, 10)
    rover.move("R", 0, 0);

    // If starting from outside grid, mark as lost and don't move
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("E");
    expect(rover.lost).toBe(false);
  });

  test("Start E rotate right to S", () => {
    rover = new Rover("(0, 0, E) R", 10, 10)
    rover.move("R", 0, 0);

    // If starting from outside grid, mark as lost and don't move
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("S");
    expect(rover.lost).toBe(false);
  });

  test("Start S rotate right to W", () => {
    rover = new Rover("(0, 0, S) R", 10, 10)
    rover.move("R", 0, 0);

    // If starting from outside grid, mark as lost and don't move
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("W");
    expect(rover.lost).toBe(false);
  });

  test("Start W rotate right to N", () => {
    rover = new Rover("(0, 0, W) R", 10, 10)
    rover.move("R", 0, 0);

    // If starting from outside grid, mark as lost and don't move
    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("N");
    expect(rover.lost).toBe(false);
  });
});

describe("Execute commands until lost or none left", () => {
  test("Execute commands until lost", () => {
    rover = new Rover("(0, 0, N) FFFFRLR", 0, 0)
    rover.executeCommands(0, 0);

    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("N");
    expect(rover.commands.join("")).toBe("FFFRLR");
    expect(rover.lost).toBe(true);
  });

  test("Go around in a circle and finish in same position and orientation", () => {
    rover = new Rover("(0, 0, N) FRFRFRFR", 1, 1)
    rover.executeCommands(1, 1);

    expect(rover.x).toBe(0);
    expect(rover.y).toBe(0);
    expect(rover.orientation).toBe("N");
    expect(rover.commands.join("")).toBe("");
    expect(rover.lost).toBe(false);
  })
});