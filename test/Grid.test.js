const Grid = require("../src/classes/Grid");

describe("Correctly instantiate when it's given valid inputs", () => {
  // Valid inputs: string of 2 space-separated positive whole numbers
  test("Two positive whole numbers", () => {
    const input = "5 10";
    const grid = new Grid(input);

    expect(grid.length).toBe(5);
    expect(grid.width).toBe(10);
  });

  test("Two 0s", () => {
    const input = "0 0";
    const grid = new Grid(input);

    expect(grid.length).toBe(0);
    expect(grid.width).toBe(0);
  });

  test("Two valid integers separated by many types of whitespaces", () => {
    const input = "0\t\n0";
    const grid = new Grid(input);

    expect(grid.length).toBe(0);
    expect(grid.width).toBe(0);
  });

  test("Two valid integers surrounded by whitespaces", () => {
    const input = "\n0\t\n0\t";
    const grid = new Grid(input);

    expect(grid.length).toBe(0);
    expect(grid.width).toBe(0);
  });
});

describe("Raise an error when it's given incorrect inputs", () => {
  test("One input is a negative integer", () => {
    const input = "-0 0";
    try {
      const grid = new Grid(input);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Invalid input: the grid's size must be 2 non-negative integers")
    }
  });

  test("One input is not an integer", () => {
    const input = "S 0";
    try {
      const grid = new Grid(input);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Invalid input: the grid's size must be 2 non-negative integers")
    }
  });

  test("Only one argument is given to CLI", () => {
    const input = "0";
    try {
      const grid = new Grid(input);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Invalid input: the grid's size must be 2 non-negative integers")
    }
  });

  test("Empty string (i.e. no arguments passed to CLI)", () => {
    const input = "";
    try {
      const grid = new Grid(input);
    } catch(err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("Invalid input: the grid's size must be 2 non-negative integers")
    }
  });
})