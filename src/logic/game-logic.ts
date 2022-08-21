export enum Moves {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

export class The2048Game {
  private _matrix: number[][];

  constructor(private _rows: number, private _columns: number) {
    this._matrix = [];
    for (let i = 0; i < _rows; i++) {
      this._matrix[i] = [];
      for (let j = 0; j < _columns; j++) {
        this._matrix[i][j] = 0;
      }
    }

    // for (let i = 0; i < 2; i++) {
    //   const randomNumber = Math.random() * _rows * _columns;
    //   let row = Math.floor(randomNumber / 4);
    //   let col = Math.floor(randomNumber % 4);
    //   if (this._matrix[row][col] !== 2) {
    //     this._matrix[row][col] = 2;
    //   } else {
    //     i--;
    //     continue;
    //   }
    // }

    this._matrix[0][0] = 2;
    this._matrix[1][0] = 2;

    this._matrix[2][2] = 2;
    this._matrix[3][2] = 2;
    this._matrix[0][2] = 4;
  }

  public get matrix(): number[][] {
    const newMatrix: number[][] = [];
    for (let i = 0; i < this._rows; i++) {
      newMatrix.push([...this._matrix[i]]);
    }
    return newMatrix;
  }

  public moveUp = () => {
    this.mergeElements(Moves.TOP);
    for (let i = 1; i < this._rows; i++) {
      for (let j = 0; j < this._columns; j++) {
        if (this._matrix[i][j] === 0) continue;

        let k = i;
        while (k > 0 && this._matrix[k - 1][j] === 0) k--;
        if (k === i) continue;

        this._matrix[k][j] = this._matrix[i][j];
        this._matrix[i][j] = 0;
      }
    }

    this.generateRandom2();
  };

  public moveRight = () => {
    this.mergeElements(Moves.RIGHT);
    for (let i = 0; i < +this._rows; i++) {
      for (let j = this._columns - 2; j >= 0; j--) {
        if (this._matrix[i][j] === 0) continue;

        let k = j;
        while (k < 3 && this._matrix[i][k + 1] === 0) k++;
        if (k === j) continue;

        this._matrix[i][k] = this._matrix[i][j];
        this._matrix[i][j] = 0;
      }
    }

    this.generateRandom2();
  };

  public moveDown = () => {
    this.mergeElements(Moves.BOTTOM);
    for (let i = this._rows - 2; i >= 0; i--) {
      for (let j = 0; j < this._columns; j++) {
        if (this._matrix[i][j] === 0) continue;

        let k = i;
        while (k < 3 && this._matrix[k + 1][j] === 0) k++;
        if (k === i) continue;

        this._matrix[k][j] = this._matrix[i][j];
        this._matrix[i][j] = 0;
      }
    }

    this.generateRandom2();
  };

  public moveLeft = () => {
    this.mergeElements(Moves.LEFT);
    for (let i = 0; i < +this._rows; i++) {
      for (let j = 1; j < this._columns; j++) {
        if (this._matrix[i][j] === 0) continue;

        let k = j;
        while (k > 0 && this._matrix[i][k - 1] === 0) k--;
        if (k === j) continue;

        this._matrix[i][k] = this._matrix[i][j];
        this._matrix[i][j] = 0;
      }
    }

    this.generateRandom2();
  };

  private mergeElements = (dir: Moves) => {
    let rowStart = 0;
    let rowEnd = this._rows;
    let colStart = 0;
    let colEnd = this._columns;

    switch (dir) {
      case Moves.TOP:
        rowEnd--;
        break;
      case Moves.BOTTOM:
        rowStart++;
        break;
      case Moves.LEFT:
        colEnd--;
        break;
      case Moves.RIGHT:
        colStart++;
        break;
      default:
        break;
    }

    let mergeFunc = this.mergeUp;
    if (dir === Moves.BOTTOM) {
      mergeFunc = this.mergeDown;
    } else if (dir === Moves.LEFT) {
      mergeFunc = this.mergeLeft;
    } else if (dir === Moves.RIGHT) {
      mergeFunc = this.mergeRight;
    }

    for (let i = rowStart; i < rowEnd; i++) {
      for (let j = colStart; j < colEnd; j++) {
        mergeFunc(i, j);
      }
    }
  };

  private mergeLeft = (i: number, j: number) => {
    if (this._matrix[i][j] === this._matrix[i][j + 1]) {
      this._matrix[i][j] *= 2;
      this._matrix[i][j + 1] = 0;
    }
  };

  private mergeRight = (i: number, j: number) => {
    if (this._matrix[i][j] === this._matrix[i][j - 1]) {
      this._matrix[i][j] *= 2;
      this._matrix[i][j - 1] = 0;
    }
  };

  private mergeDown = (i: number, j: number) => {
    if (this._matrix[i][j] === this._matrix[i - 1][j]) {
      this._matrix[i][j] *= 2;
      this._matrix[i - 1][j] = 0;
    }
  };

  private mergeUp = (i: number, j: number) => {
    if (this._matrix[i][j] === this._matrix[i + 1][j]) {
      this._matrix[i][j] *= 2;
      this._matrix[i + 1][j] = 0;
    }
  };

  private generateRandom2 = () => {
    const zerosIndexes: [number, number][] = [];
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._columns; j++) {
        if (this._matrix[i][j] === 0) {
          zerosIndexes.push([i, j]);
        }
      }
    }

    if (zerosIndexes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * zerosIndexes.length);
    const [i, j] = zerosIndexes[randomIndex];
    this._matrix[i][j] = 2;
  };
}
