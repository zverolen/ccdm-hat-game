const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this._field = field;
  }

  print() {
    return '*░O\n░O░\n░^░';
  }

  static generateField(height, width) {

  }

}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);


//The "chunk" argument must be of type string or an instance of Buffer or Uint8Array. Received an instance of Array
// process.stdout.write(myField._field); 

//GAME - output the formated game state
process.stdout.write(myField.print());

// console.log(myField._field);
// console.table(myField._field);

// let userInput = process.argv[2];
// console.log(userInput);

