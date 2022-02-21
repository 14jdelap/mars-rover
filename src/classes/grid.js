// Supports basic input validation

class Grid {
  constructor(inputs) {
    const [length, width] = Grid.processInputs(inputs);
    this.length = length;
    this.width = width;
  }

  static processInputs(inputs) {
    // Trim input and validate with regex
    // Trimming and whitespace regex handle badly-formed inputs with 2 valid numbers
    const trimmedInput = inputs.trim();
    const validInput = /^\d+\s+\d+$/.test(trimmedInput);

    if (validInput) {
      // Split by one or more whitespaces to handle 2 valid inputs
      const splitInputs = inputs.split(/\s+/);
      // Return inputs as numbers
      return [ Number(splitInputs[0]), Number(splitInputs[1]) ]
    } else {
        throw new Error("Invalid input: the grid's size must be 2 non-negative integers");
    }

  }
}

module.exports = Grid;
