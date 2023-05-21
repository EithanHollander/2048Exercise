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
    console.log("move right!");
    //shift cells
    for (let row = 0; row < MATRIX_SIZE; row++) {
      // get this row's values
      const nettoRowValues = this.board[row].filter(
        (_cell, index) => !this.isCellEmpty(row, index)
      );
      // put all values at the right
      this.board[row].fill(0);
      for (
        let insertCounter = 0;
        insertCounter < nettoRowValues.length;
        insertCounter++
      ) {
        this.board[row][MATRIX_SIZE - insertCounter - 1] =
          nettoRowValues[nettoRowValues.length - insertCounter - 1];
      }
    }

    //join cells
    this.dropAnotherNumber();
  }

  moveLeft() {
    console.log("move left!");

    //shift cells
    for (let row = 0; row < MATRIX_SIZE; row++) {
      // get this row's values
      const nettoRowValues = this.board[row].filter(
        (_cell, index) => !this.isCellEmpty(row, index)
      );
      // put all values at the left
      this.board[row].fill(0);
      for (
        let insertCounter = 0;
        insertCounter < nettoRowValues.length;
        insertCounter++
      ) {
        this.board[row][insertCounter] = nettoRowValues[insertCounter];
      }
    }

    //join cells
    this.dropAnotherNumber();
  }

  moveDown() {
    console.log("move down!");

    //shift cells
    for (let column = 0; column < MATRIX_SIZE; column++) {
      let nettoColumnValues: number[] = [];
      for (let row = 0; row < MATRIX_SIZE; row++) {
        if (!this.isCellEmpty(row, column)) {
          nettoColumnValues.push(this.board[row][column]);
        }
      }
      for (let row = 0; row < MATRIX_SIZE; row++) {
        this.board[row][column] = 0;
      }

      for (
        let insertCounter = 0;
        insertCounter < nettoColumnValues.length;
        insertCounter++
      ) {
        this.board[MATRIX_SIZE - insertCounter - 1][column] =
          nettoColumnValues[nettoColumnValues.length - insertCounter - 1];
      }
    }

    //join cells
    this.dropAnotherNumber();
  }

  moveUp() {
    console.log("move up!");
    //shift cells
    for (let column = 0; column < MATRIX_SIZE; column++) {
      let nettoColumnValues: number[] = [];
      for (let row = 0; row < MATRIX_SIZE; row++) {
        if (!this.isCellEmpty(row, column)) {
          nettoColumnValues.push(this.board[row][column]);
        }
      }
      for (let row = 0; row < MATRIX_SIZE; row++) {
        this.board[row][column] = 0;
      }

      for (
        let insertCounter = 0;
        insertCounter < nettoColumnValues.length;
        insertCounter++
      ) {
        this.board[insertCounter][column] = nettoColumnValues[insertCounter];
      }
    }

    //join cells
    this.dropAnotherNumber();
  }
}

const matrixStore = new MatrixStore();
export default matrixStore;
