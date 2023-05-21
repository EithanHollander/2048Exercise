import { makeAutoObservable } from "mobx";

const MATRIX_SIZE = 4;

const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const getRandomNumberForMatrix = (
  max: number,
  exclude: number = -1
): number => {
  let result: number = -1;
  while (result === -1) {
    const generatedNumber = getRandomNumber(max);
    if (generatedNumber !== exclude) {
      result = generatedNumber;
    }
  }
  return result;
};

type Coordinate = {
  row: number;
  column: number;
};

class MatrixStore {
  board: number[][];

  constructor() {
    makeAutoObservable(this);
    this.board = Array(MATRIX_SIZE)
      .fill(0)
      .map((_row) => new Array(MATRIX_SIZE).fill(0));
  }

  init() {
    this.board = Array(MATRIX_SIZE)
      .fill(0)
      .map((_row) => new Array(MATRIX_SIZE).fill(0));

    let randomRow = getRandomNumberForMatrix(MATRIX_SIZE);
    let randomColumn = getRandomNumberForMatrix(MATRIX_SIZE);
    this.board[randomRow][randomColumn] = 2;

    let anotherRandomRow = getRandomNumberForMatrix(MATRIX_SIZE, randomRow);
    let anotherRandomColumn = getRandomNumberForMatrix(
      MATRIX_SIZE,
      randomColumn
    );
    this.board[anotherRandomRow][anotherRandomColumn] = 2;
  }

  isCellEmpty(row: number, column: number) {
    return this.board[row][column] === 0;
  }

  chooseRandomEmptyCell() {
    const emptyCells: Coordinate[] = [];
    for (let i = 0; i < MATRIX_SIZE; i++) {
      for (let j = 0; j < MATRIX_SIZE; j++) {
        if (this.isCellEmpty(i, j)) {
          emptyCells.push({ row: i, column: j });
        }
      }
    }
    if (emptyCells.length === 0) {
      return { row: -1, column: -1 };
    }
    const chosenCoordinate: Coordinate =
      emptyCells[getRandomNumber(emptyCells.length)];

    return chosenCoordinate;
  }

  dropAnotherNumber() {
    const { row, column } = this.chooseRandomEmptyCell();
    if (row === -1 && column === -1) {
      alert("NO MORE SPACE!");
    } else {
      this.board[row][column] = 2;
    }
  }

  moveRight() {
    //logic
    console.log("move right!");
    this.dropAnotherNumber();
  }

  moveLeft() {
    //logic
    console.log("move left!");
    this.dropAnotherNumber();
  }

  moveDown() {
    //logic
    console.log("move down!");
    this.dropAnotherNumber();
  }

  moveUp() {
    //logic
    console.log("move up!");
    this.dropAnotherNumber();
  }
}

const matrixStore = new MatrixStore();
export default matrixStore;
