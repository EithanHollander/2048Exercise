import { makeAutoObservable } from "mobx";

const MATRIX_SIZE = 4;
const MAX_CELL_VALUE = 2048;
const CELL_EMPTY_VALUE = 0;

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
  triedToAddToFullBoard: boolean;

  constructor() {
    makeAutoObservable(this);
    this.board = Array(MATRIX_SIZE)
      .fill(CELL_EMPTY_VALUE)
      .map((_row) => new Array(MATRIX_SIZE).fill(0));
    this.triedToAddToFullBoard = false;
  }

  init() {
    this.board = Array(MATRIX_SIZE)
      .fill(CELL_EMPTY_VALUE)
      .map((_row) => new Array(MATRIX_SIZE).fill(0));
    this.triedToAddToFullBoard = false;

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

  get isGameOver() {
    const maxNumberExists = this.board.some((row) => {
      return row.some((cell) => cell === MAX_CELL_VALUE);
    });
    return maxNumberExists || this.triedToAddToFullBoard;
  }

  isCellEmptyByCoordinate(row: number, column: number) {
    return this.board[row][column] === CELL_EMPTY_VALUE;
  }

  isCellEmptyByValue(cellValue: number) {
    return cellValue === CELL_EMPTY_VALUE;
  }

  chooseRandomEmptyCell() {
    const emptyCells: Coordinate[] = [];
    for (let i = 0; i < MATRIX_SIZE; i++) {
      for (let j = 0; j < MATRIX_SIZE; j++) {
        if (this.isCellEmptyByCoordinate(i, j)) {
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
      this.triedToAddToFullBoard = true;
    } else {
      this.board[row][column] = 2;
    }
  }

  moveRight() {
    if (this.isGameOver) return;
    for (let row = 0; row < MATRIX_SIZE; row++) {
      // get this row's values
      const nettoRowValues = this.board[row].filter(
        (cellValue) => !this.isCellEmptyByValue(cellValue)
      );
      // put all values at the right
      this.board[row].fill(0);
      this.board[row].splice(
        MATRIX_SIZE - nettoRowValues.length,
        nettoRowValues.length,
        ...nettoRowValues
      );

      // join matching cells
      let currentColumn = MATRIX_SIZE - 1;
      while (
        currentColumn > 0 &&
        !this.isCellEmptyByCoordinate(row, currentColumn - 1)
      ) {
        if (
          this.board[row][currentColumn] === this.board[row][currentColumn - 1]
        ) {
          //couple match, join them
          this.board[row][currentColumn] =
            this.board[row][currentColumn] + this.board[row][currentColumn - 1];

          // shift the rest of the numbers to the right
          for (let i = currentColumn - 1; i >= 0; i--) {
            if (i === 0) {
              this.board[row][i] = 0;
            } else {
              this.board[row][i] = this.board[row][i - 1];
            }
          }
        }
        currentColumn -= 1;
      }
    }

    this.dropAnotherNumber();
  }

  moveLeft() {
    if (this.isGameOver) return;
    for (let row = 0; row < MATRIX_SIZE; row++) {
      // get this row's values
      const nettoRowValues = this.board[row].filter(
        (cellValue) => !this.isCellEmptyByValue(cellValue)
      );
      // put all values at the left
      this.board[row].fill(0);
      this.board[row].splice(0, nettoRowValues.length, ...nettoRowValues);

      // join matching cells
      let currentColumn = 0;
      while (
        currentColumn < MATRIX_SIZE - 1 &&
        !this.isCellEmptyByCoordinate(row, currentColumn + 1)
      ) {
        if (
          this.board[row][currentColumn] === this.board[row][currentColumn + 1]
        ) {
          //couple match, join them
          this.board[row][currentColumn] =
            this.board[row][currentColumn] + this.board[row][currentColumn + 1];

          // shift the rest of the numbers to the left
          for (let i = currentColumn + 1; i <= MATRIX_SIZE - 1; i++) {
            if (i === MATRIX_SIZE - 1) {
              this.board[row][i] = 0;
            } else {
              this.board[row][i] = this.board[row][i + 1];
            }
          }
        }
        currentColumn += 1;
      }
    }
    this.dropAnotherNumber();
  }

  moveDown() {
    if (this.isGameOver) return;
    for (let column = 0; column < MATRIX_SIZE; column++) {
      // get this column's values
      const nettoColumnValues: number[] = this.board
        .map((row) => row[column])
        .filter((cellValue) => !this.isCellEmptyByValue(cellValue));
      // put all values at the bottom
      const amountOfEmptyCells = MATRIX_SIZE - nettoColumnValues.length;
      this.board.forEach((row, rowIndex) => {
        if (rowIndex < amountOfEmptyCells) {
          row[column] = CELL_EMPTY_VALUE;
        } else {
          row[column] = nettoColumnValues[rowIndex - amountOfEmptyCells];
        }
      });

      // join matching cells
      let currentRow = MATRIX_SIZE - 1;
      while (
        currentRow > 0 &&
        !this.isCellEmptyByCoordinate(currentRow - 1, column)
      ) {
        if (
          this.board[currentRow][column] === this.board[currentRow - 1][column]
        ) {
          //couple match, join them
          this.board[currentRow][column] =
            this.board[currentRow][column] + this.board[currentRow - 1][column];

          // shift the rest of the numbers down
          for (let i = currentRow - 1; i >= 0; i--) {
            if (i === 0) {
              this.board[i][column] = 0;
            } else {
              this.board[i][column] = this.board[i - 1][column];
            }
          }
        }
        currentRow -= 1;
      }
    }
    this.dropAnotherNumber();
  }

  moveUp() {
    if (this.isGameOver) return;
    for (let column = 0; column < MATRIX_SIZE; column++) {
      // get this column's values
      const nettoColumnValues: number[] = this.board
        .map((row) => row[column])
        .filter((cellValue) => !this.isCellEmptyByValue(cellValue));
      // put all values at the top
      this.board.forEach((row, rowIndex) => {
        if (rowIndex < nettoColumnValues.length) {
          row[column] = nettoColumnValues[rowIndex];
        } else {
          row[column] = CELL_EMPTY_VALUE;
        }
      });

      // join matching cells
      let currentRow = 0;
      while (
        currentRow < MATRIX_SIZE - 1 &&
        !this.isCellEmptyByCoordinate(currentRow + 1, column)
      ) {
        if (
          this.board[currentRow][column] === this.board[currentRow + 1][column]
        ) {
          //couple match, join them
          this.board[currentRow][column] =
            this.board[currentRow][column] + this.board[currentRow + 1][column];

          // shift the rest of the numbers up
          for (let i = currentRow + 1; i <= MATRIX_SIZE - 1; i++) {
            if (i === MATRIX_SIZE - 1) {
              this.board[i][column] = 0;
            } else {
              this.board[i][column] = this.board[i + 1][column];
            }
          }
        }
        currentRow += 1;
      }
    }
    this.dropAnotherNumber();
  }
}

const matrixStore = new MatrixStore();
export default matrixStore;
