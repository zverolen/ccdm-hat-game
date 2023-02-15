const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Game {

  constructor(field, hardMode = false) {
    this._field = field;
    this._hardMode = hardMode;
    this._hardModeStart = 3;
    this._moveCounter = 0;
    this._formattedField = '';
    this._row = 0;
    this._column = 0;
    this._fieldWidthLimit = this._field[0].length - 1;
    this._fieldHeightLimit = this._field.length - 1;
    this._numberOfElements = this._field[0].length * this._field.length;
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
    this._moveCounter++;
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
        if (this._hardMode && this._moveCounter > 4) {
          this._updateFieldForHardMode();
        }
        process.stdout.write(`${this._formatField()}What direction will you move?`);
      } else {
        process.stdout.write(moveResult);
        process.exit();
      }
      return moveResult;
    } else {
      // if wrong letter is hit
      process.stdout.write(this._helpMessage);
      return this._helpMessage;
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

  //Tested
  findStart() {
    let startRow = 0;
    let startColumn = 0;

    this._field.forEach((el, index) => {
      if (el.includes(pathCharacter)) {
        startRow = index;
        startColumn = el.indexOf(pathCharacter);
      }
    });
    this._row = startRow;
    this._column = startColumn;
    return [startRow, startColumn];
  }

  // Tested
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

  //Tested
  _findChar(nextRow, nextColumn) {

    if (nextRow >= 0 && 
      nextRow <= this._fieldHeightLimit && 
      nextColumn >= 0 &&
      nextColumn <= this._fieldWidthLimit) {

        return this._field[nextRow][nextColumn];
    }

  }

  //Tested
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

  _updateFieldForHardMode() {
    const allNewPositions = this._saveAllFieldChars();
    const newPosition = this._findRandomFieldPosition(allNewPositions);
    const newRow = newPosition[0];
    const newColumn = newPosition[1];
    this._field[newRow][newColumn] = hole;
  }

  _saveAllFieldChars() {
    const result = [];
    this._field.forEach((el, index) => {
      if (el.includes(fieldCharacter)) {
        let row = index;
        el.forEach((char, charIndex) => {
          if (char === fieldCharacter) {
            result.push([row, charIndex]);
          }
        });
      }
    });
    return result;
  }

  _findRandomFieldPosition(positions) {
    const result = [];
    const randomPosition = Math.floor(Math.random() * positions.length);
    result.push(positions[randomPosition]);
    return result.flat();
  }

  static generateField(height, width, difficultyPercent) {
    //Find parameters for the field
    const numberOfElements = height * width;
    const limitOfElements = numberOfElements - 1;
    const numberOfHoles = Math.round(numberOfElements * difficultyPercent / 100);
    const numberOfFieldChars = numberOfElements - numberOfHoles - 2;
    
    //Prepare arrays for field generation

    const addNewElements = (el, num, arr) => {
      if (typeof el != 'number') {
        for (let i = 1; i <= num; i++) {
          arr.push(el);
        }
      } else {
        for (let i = 0; i <= num - 1; i++) {
          arr.push(i);
        }
      }
    }

    const startingFieldArray = [pathCharacter, hat];
    const numberArray = [];
    const randomNumArray = [];
    const randomElementArray = [];
    const result = [];
    addNewElements(hole, numberOfHoles, startingFieldArray);
    addNewElements(fieldCharacter, numberOfFieldChars, startingFieldArray);
    addNewElements(0, numberOfElements, numberArray);
    // addNewElements([], height, result);

    while (numberArray.length > 0) {
      randomNumArray.push(numberArray.splice(Math.floor(Math.random() * (numberArray.length - 1)), 1));
    }
    const randomPositions = randomNumArray.flat();

    for (let i = 0; i <= limitOfElements; i++) {
      randomElementArray[randomPositions[i]] = startingFieldArray[i];
    }

    for (let i = 0; i <= height - 1; i++) {
      let newArr = [];
      for (let j = 0; j <= width - 1; j++) {
        newArr.push(randomElementArray[0]);
        randomElementArray.shift();
      }
      result.push(newArr);
    }
    return result;
  }

}

module.exports = Game;


