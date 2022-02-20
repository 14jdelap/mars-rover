class Rover {
  constructor(inputs, gridLength, gridWidth) {
    const [x, y, orientation, commands] = Rover.processInputs(inputs);

    if (Rover.invalidPosition(x, y, gridLength, gridWidth)) {
      throw new Error ("The rover can't be placed outside the grid");
    }

    // x and y are its position in the grid
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.commands = commands;
    this.lost = false;
  }

  static processInputs(inputs) {
    // Regex covers inputs with 0 or more whitespaces
    // This gives some leniency to the user in terms of how he inputs data
    // What's enforced: parentheses, commas, and commands in a continuous string
    const trimmedInput = inputs.trim();
    const validInputs = /^\(\s*[0-9]+\s*,\s*[0-9]+\s*,\s*[NSWE]\s*\)\s*[FRL]+?$/i.test(trimmedInput);

    if (!validInputs) {
      throw new Error("The rover's input was formatted incorrectly");
    }

    // Split by the closing parentheses
    const splitString = trimmedInput.split(/\s*\)\s*/);

    // Ensure string inputs are in upper case and split to array
    const commands = splitString[1].toUpperCase().split("");

    // Split the rover's inputs for easier variable assignments
    const splitRoverInputs = splitString[0].split(/\s*,\s*/);

    // Set the rover's position in the grid and orientation

    // Separate starting parentheses from x input
    const x = Number(splitRoverInputs[0].split(/\(\s*/)[1]);
    const y = Number(splitRoverInputs[1]);
    const orientation = splitRoverInputs[2].toUpperCase();

    return [x, y, orientation, commands];
  }

  executeCommands(gridLength, gridWidth) {
    while (this.commands.length > 0 && !this.lost) {
      const command = this.commands.shift();
      this.move(command, gridLength, gridWidth);
    }

    console.log(`(${this.x}, ${this.y}, ${this.orientation})${this.lost ? " LOST" : ""}`);
  }

  move(command, gridLength, gridWidth) {
    // Move forward, right, or left
    if (command === "F") {
      // If moving forward means the rover is lost, mark it as lost
      const isLost = this.checkIfLost(gridLength, gridWidth);

      if (isLost) {
        this.lost = true;
        return
      }

      // Else, move rover forward if it'll go to a valid location in the grid
      this.moveForward();
    } else if (command === "R") {
      this.moveRight();
    } else {
      this.moveLeft();
    }
  }

  checkIfLost(gridLength, gridWidth) {
    // Find the rover's position if it were to move forward
    // Check if that move position would be out of grid
    // If so, return true; else, false

    let x = this.x;
    let y = this.y;

    switch(this.orientation) {
      case "N":
        y += 1;
        break;
      case "S":
        y -= 1;
        break;
      case "E":
        x += 1;
        break;
      case "W":
        x -= 1;
        break;
    }

    // If it's in an invalid position, return true
    return Rover.invalidPosition(x, y, gridLength, gridWidth);
  }

  static invalidPosition(x, y, gridLength, gridWidth) {
    // Check if the rover is between 0 and the grid's length/width values
    const validXPosition = x >= 0 && x <= gridLength;
    const validYPosition = y >= 0 && y <= gridWidth;

    return !(validXPosition && validYPosition);
  }

  moveForward() {
    // If N, increase y by 1
    // If S, decrease y by 1
    // If E, increase x by 1
    // If W, decrease x by 1

    switch(this.orientation) {
      case "N":
        this.y += 1;
        break;
      case "S":
        this.y -= 1;
        break;
      case "E":
        this.x += 1;
        break;
      case "W":
        this.x -= 1;
        break;
    }
  }

  moveRight() {
    // If orientation is N, change to E
    // If orientation is E, change to S
    // If orientation is S, change to W
    // If orientation is W, change to N

    switch(this.orientation) {
      case "N":
        this.orientation = "E";
        break;
        case "E":
          this.orientation = "S";
          break;
      case "S":
        this.orientation = "W";
        break;
      case "W":
        this.orientation = "N";
        break;
    }
  }

  moveLeft() {
    // If orientation is N, change to W
    // If orientation is W, change to S
    // If orientation is S, change to E
    // If orientation is E, change to N

    switch(this.orientation) {
      case "N":
        this.orientation = "W";
        break;
      case "W":
        this.orientation = "S";
        break;
      case "S":
        this.orientation = "E";
        break;
      case "E":
        this.orientation = "N";
        break;
    }
  }
}

module.exports = Rover;