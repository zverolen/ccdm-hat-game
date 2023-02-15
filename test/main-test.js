const assert = require('assert');
const Game = require('../game.js');
const field2 = [
  ['░', '░', 'O'],
  ['O', '*', '░'],
  ['░', '^', '░'],
];
const field3 = [
  ['░', '*', 'O'],
  ['O', '░', '░'],
  ['░', '^', '░'],
];
const newGame1 = new Game([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
], false);

const newGame2 = new Game(field2, false);
const newGame3 = new Game(field3, false);

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const moveResult = 'move';
const rightMove = 'R';
const leftMove = 'L';
const upMove = 'U';
const downMove = 'D';

describe('Game.findStart', () => {

  it('finds start / position of the path character', () => {
    // Setup
    const expectedPosition = [1, 1];
    
    //Execute
    const result = newGame2.findStart();

    // Verify
    assert.deepEqual(result, expectedPosition);
  });

  it('updates the value of the property for the path char row', () => {
    // Setup
    const expectedRow = 1;
    
    //Execute
   const result =  newGame2._row;

    // Verify
    assert.strictEqual(result, expectedRow);
  });


  it('updates the value of the property for the path char column', () => {
    // Setup
    const expectedColumn = 1;
    
    //Execute
   const result =  newGame2._column;

    // Verify
    assert.strictEqual(result, expectedColumn);
  });

});

describe('Game._findNextPosition', () => {
  it('Updates position if input is r / right move', () => {
    //Setup
    const move = 'r';
    const expectedPosition = { nextRow: 1, nextColumn: 2 };

    //Execute
    const result = newGame2._findNextPosition(move);

    //Verify
    assert.deepEqual(result, expectedPosition);
  });

  it('Updates position if input is l / left move', () => {
    //Setup
    const move = 'l';
    const expectedPosition = { nextRow: 1, nextColumn: 0 };

    //Execute
    const result = newGame2._findNextPosition(move);

    //Verify
    assert.deepEqual(result, expectedPosition);
  });

  it('Updates position if input is u / up move', () => {
    //Setup
    const move = 'u';
    const expectedPosition = { nextRow: 0, nextColumn: 1 };

    //Execute
    const result = newGame2._findNextPosition(move);

    //Verify
    assert.deepEqual(result, expectedPosition);
  });

  it('Updates position if input is d / up move', () => {
    //Setup
    const move = 'd';
    const expectedPosition = { nextRow: 2, nextColumn: 1 };

    //Execute
    const result = newGame2._findNextPosition(move);

    //Verify
    assert.deepEqual(result, expectedPosition);
  });
});

describe('Game._findChar', () => {
  it('Returns the character with valid nextRow and nextColumn attributes', () => {
    //Setup
    const nextRow = 1;
    const nextColumn = 2;
    const expectedResult = fieldCharacter;

    //Execute
    const result = newGame2._findChar(nextRow, nextColumn);

    //Verify
    assert.strictEqual(result, expectedResult);
  });

  it('Returns undefined when moving off the field to the left', () => {
    //Setup
    const nextRow = 1;
    const nextColumn = -1;
    const expectedResult = undefined;

    //Execute
    const result = newGame2._findChar(nextRow, nextColumn);

    //Verify
    assert.strictEqual(result, expectedResult);
  });

  it('Returns undefined when moving off the field upwards', () => {
    //Setup
    const nextRow = -1;
    const nextColumn = 2;
    const expectedResult = undefined;

    //Execute
    const result = newGame2._findChar(nextRow, nextColumn);

    //Verify
    assert.strictEqual(result, expectedResult);
  });

  it('Returns undefined when moving off the field to the right', () => {
    //Setup
    const nextRow = 2;
    const nextColumn = 3;
    const expectedResult = undefined;

    //Execute
    const result = newGame2._findChar(nextRow, nextColumn);

    //Verify
    assert.strictEqual(result, expectedResult);
  });

  it('Returns undefined when moving off the field downwards', () => {
    //Setup
    const nextRow = 3;
    const nextColumn = 2;
    const expectedResult = undefined;

    //Execute
    const result = newGame2._findChar(nextRow, nextColumn);

    //Verify
    assert.strictEqual(result, expectedResult);
  });
});

describe('Game._checkMoveResult', () => {
  it('Returns move when char at next position is fieldCharacter', () => {
    //Setup
    
    //Execute
    const result = newGame2._checkMoveResult(fieldCharacter);

    //Assert
    assert.strictEqual(result, moveResult);
  });

  it('Returns move when char at next position is pathCharacter', () => {
    //Execute
    const result = newGame2._checkMoveResult(pathCharacter);

    //Assert
    assert.strictEqual(result, moveResult);
  });

  it('Returns winning message when char at next position is hat', () => {
    //Setup
    const winMessage = newGame2._winMessage;
    //Execute
    const result = newGame2._checkMoveResult(hat);

    //Assert
    assert.strictEqual(result, winMessage);
  });

  it('Returns game over message when char at next position is hole', () => {
    //Setup
    const loseMessage = newGame2._loseMessage;
    //Execute
    const result = newGame2._checkMoveResult(hole);

    //Assert
    assert.strictEqual(result, loseMessage);
  });

  it('Returns game over message when char at next position is undefined / move is out of field', () => {
    //Setup
    const loseMessage = newGame2._loseMessage;
    //Execute
    const result = newGame2._checkMoveResult(undefined);
    //Assert
    assert.strictEqual(result, loseMessage);
  });
});

describe('Game._saveAllFieldChars', () => {
  it('Returns array of positions for all field chars for Game2', () => {
    //Setup
    const expectedResult = [[0,0], [0,1], [1, 2], [2,0], [2,2]];
    //Execute
    const result = newGame2._saveAllFieldChars();
    //Assert
    assert.deepStrictEqual(result, expectedResult);
  });
  it('Returns array of positions for all field chars for Game3', () => {
    //Setup
    const expectedResult = [[0,0], [1,1], [1, 2], [2,0], [2,2]];
    //Execute
    const result = newGame3._saveAllFieldChars();
    //Assert
    assert.deepStrictEqual(result, expectedResult);
  });
});

describe('Game._findRandomFieldPosition', () => {
  it('Returns an array with two values', () => {
    //Setup
    const elementNumber = 2;
    const positions = [[0,0], [0,1], [1, 2], [2,0], [2,2]];
    //Execution
    const result = newGame2._findRandomFieldPosition(positions);
    const resultElementNumber = result.length;
    // Assertion
    assert.strictEqual(resultElementNumber, elementNumber);
  });
  it('Returns the position of one of field characters', () => {
    //Setup
    const positions = [[0,0], [0,1], [1,2], [2,0], [2,2]];
    let isPositionFound = false;
    // Execute
    const result = newGame2._findRandomFieldPosition(positions);
    positions.forEach(el => {
      if (el[0] == result[0] && el[1] == result[1]) {
        isPositionFound = true;
      }
    });
    //Assert
    assert.ok(isPositionFound);
  });
});


describe('Game._updateForHardMode', () => {
  after(() => {
    newGame2._field = field2;
  });
  it('Adds new hole to the field', () => {
    // Setup
    const startingNumberOfHoles = 2;
    const expectedNumberOfHoles = startingNumberOfHoles + 1;
    let resultNumberOfHoles = 0;
    // Execution
    newGame2._updateFieldForHardMode();
    const resultField = newGame2._field;

    resultField.forEach((el) => {
      if(el.includes(hole)) {
        el.forEach((char) => {
          console.log(char);
          if (char == hole) {
            resultNumberOfHoles+=1;
            
          }
        });
      }
    });
    // Assertion
    assert.strictEqual(resultNumberOfHoles, expectedNumberOfHoles);
  });
});

