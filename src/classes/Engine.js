const rs = require("readline-sync");

const Rover = require("./rover");
const Grid = require("./grid");

const Display = require("../modules/display");

class Engine {
  constructor() {
    // Engine asks user for inputs, which the grid processes
    const gridSizeInput = Engine.getGridInputs();
    this.grid = new Grid(gridSizeInput);
  }

  static getGridInputs() {
    Display.welcomeMessage()
    return rs.question(Display.askGridSize);
  }

  execute() {
    console.log(Display.howToUseRovers);

    while (true) {
      const roverInput = rs.question(Display.askRoverInputs);
      const rover = new Rover(roverInput, this.grid.length, this.grid.width);
      rover.executeCommands(this.grid.length, this.grid.width);
    }
  }
}

module.exports = Engine;