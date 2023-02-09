const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Game {

  constructor(field) {
    this._field = field;
    this._formattedField = '';
    this._row = 0;
    this._column = 0;
    this._fieldWidthLimit = this._field[0].length - 1;
    this._fieldHeightLimit = this._field.length - 1;
    this._moveRight = 'r';
    this._moveLeft = 'l';
    this._moveUp = 'u';
    this._moveDown = 'd';
    this._loseMessage = 'Game over';
    this._winMessage = 'You won';
    this._helpMessage = 'Press R to move right, L to move left, U to move up, D to move down. You can use lower case.'
  }

  print() {
    return this._formatField();
  }

  handleMove(input) {
    const formattedInput = input.toLowerCase();

    if ([this._moveRight, this._moveLeft, this._moveUp, this._moveDown].includes(formattedInput)) {

      // Find new position after player moves
      const { nextRow, nextColumn} = this._findNextPosition(formattedInput);

      // Find next character
      const nextChar = this._findChar(nextRow, nextColumn);

      // Find corresponding character
      const moveResult = this._checkMoveResult(nextChar);

      // Update state
      if (moveResult == 'move') {
        this._field[nextRow][nextColumn] = pathCharacter;
        this._row = nextRow;
        this._column = nextColumn;
        process.stdout.write(`${this._formatField()}What direction will you move?`);
      } else {
        process.stdout.write(moveResult);
        process.exit();
      }
    } else {
      // if wrong letter is hit
      process.stdout.write(this._helpMessage);
    }

  }

  _formatField() {
    let formattedField = '';
    this._field.forEach(line => {
      formattedField = formattedField + line.join('') + '\n';
    });
    this._formattedField = formattedField;
    return formattedField;
  }

  _findNextPosition(input) {
  
    const positions = {
      nextRow: this._row, 
      nextColumn: this._column
    }

    switch(input) {
      case this._moveRight:
        positions.nextColumn++;
        break;
      case this._moveLeft:
        positions.nextColumn--;
        break;
      case this._moveDown:
        positions.nextRow++;
        break;
      case this._moveUp:
        positions.nextRow--;
        break;
    }

    return positions;
  }

  _findChar(nextRow, nextColumn) {

    if (nextRow >= 0 && 
      nextRow <= this._fieldHeightLimit && 
      nextColumn >= 0 &&
      nextColumn <= this._fieldWidthLimit) {

        return this._field[nextRow][nextColumn];
    }

  }

  _checkMoveResult(char) {
    let result;
      switch(char) {
        case fieldCharacter:
        case pathCharacter:
          result = 'move';
          break;
        case hat: 
          result = this._winMessage;
          break;
          case hole:
          default:
          result = this._loseMessage;
      }
    return result;
  }

  static generateField(height, width, difficultyPercent) {
    const numberOfElements = height * width;
    const numberOfHoles = Math.round(numberOfElements * difficultyPercent / 100);
    
  }


}

const newGame = new Game([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

// 1. Prompt user to make a move as the app runs
process.stdout.write(`${newGame.print()}What direction will you move?`);
// process.stdout.write('What direction will you move?');

// 2. Accept the input and print FIELD STATUS

const playGame = (userInput) => {
  const input = userInput.toString().trim();
  // process.stdout.write(newGame.print());
  newGame.handleMove(input);
}

process.stdin.on('data', playGame);

// 3. Change the field according to the move 

// 4. Fix the field to the same position (output doesn't go down)

// 5. Handle errors

