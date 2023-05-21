import { makeAutoObservable } from "mobx";

const MATRIX_SIZE = 4;

const getRandomNumberForMatrix = (
  max: number,
  exclude: number = -1
): number => {
  let result: number = -1;
  while (result === -1) {
    const generatedNumber = Math.floor(Math.random() * max);
    if (generatedNumber !== exclude) {
      result = generatedNumber;
    }
  }
  return result;
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
}

const matrixStore = new MatrixStore();
export default matrixStore;
