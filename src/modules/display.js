/*
This display module stores variables and functions that display information to the user
*/

function welcomeMessage() {
  console.clear();
  console.log("Welcome! You've started NASA's program to move rovers on Mars\n");
}

const askGridSize = "Before placing and moving rovers, please say what's the size of the grid you're operating in\nInsert the grid's size as 2 space-separated integers, like '5 10'\n\n";

const howToUseRovers = "\n\nNow insert a rover's starting location and its commands to move\nEnter the location in the format '([x], [y], [orientation]) [commands]'\n- x and y should be whole numbers and represents the rover's position in the grid\n- orientation should be 'N', 'E', 'S', or 'W' and is the direction the rover's facing\n - Commands should be 'F' (move forward), or 'L' (turn left) or 'R' (turn right) to change orientation\n\nThe rover changes position only when it moves forward ('F'); the direction it moves towards depends on its orientation\n"

const askRoverInputs = "\nWhere will the rover start and how should it move?\n";

module.exports = {
  welcomeMessage,
  askGridSize,
  howToUseRovers,
  askRoverInputs,
}