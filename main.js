const Game = require('./game.js');

const newField = Game.generateField(6,8,30);

const newGame = new Game(newField, true);

// 1. Prompt user to make a move as the app runs

process.stdout.write(`${newGame.print()}What direction will you move?`);

// Find where the start char is located
// 
newGame.findStart();
// 2. Accept the input and print FIELD STATUS

const playGame = (userInput) => {
  const input = userInput.toString().trim();
  newGame.handleMove(input);
}

process.stdin.on('data', playGame);

// 3. Change the field according to the move 

// 4. Fix the field to the same position (output doesn't go down)

// 5. Handle errors

