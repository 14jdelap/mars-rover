const rs = require("readline-sync");

const Rover = require("./Rover");
const Grid = require("./Grid");

const {
  welcomeMessage,
  askGridSize,
  howToUseRovers,
  askRoverInputs,
} = require("../modules/display");

class Engine {
  constructor() {
    // Engine asks user for inputs, which the grid processes
    const gridSizeInput = Engine.getGridInputs();
    this.grid = new Grid(gridSizeInput);
  }

  static getGridInputs() {
    welcomeMessage()
    return rs.question(askGridSize);
  }

  execute() {
    console.log(howToUseRovers);

    while (true) {
      const roverInput = rs.question(askRoverInputs);
      const rover = new Rover(roverInput);
      rover.executeCommands(this.grid.length, this.grid.width);
    }
  }
}

module.exports = Engine;