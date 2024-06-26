function getEmptyHeatMap(rows, cols) {
  const heatMap = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    heatMap.push(row);
  }

  return heatMap;
}

export default (board, cols, rows, maxShipLength = 5, factor = 0.5) => {
  const heatMap = getEmptyHeatMap(rows, cols);

  function hitedShipsSquares() {
    return board.reduce((acc, row, rowIdx) => {
      row.forEach((square, colIdx) => {
        if (square.isHit && square.ship) {
          acc.push({ row: rowIdx, col: colIdx });
        }
      });

      return acc;
    }, []);
  }

  function getAllHitedSquares() {
    return board.reduce((acc, row, rowIdx) => {
      row.forEach((square, colIdx) => {
        if (square.isHit) {
          acc.push({ row: rowIdx, col: colIdx });
        }
      });

      return acc;
    }, []);
  }

  function markHorizontalHeat(row, col, factor) {
    function left() {
      for (let i = 1; i < maxShipLength; i++) {
        if (col - i < 0) {
          break;
        }

        heatMap[row][col - i] += factor;
      }

      if (col - 1 >= 0) {
        heatMap[row][col - 1] += factor * 2;
      }
    }

    function right() {
      for (let i = 1; i < maxShipLength; i++) {
        if (col + i > cols - 1) {
          break;
        }

        heatMap[row][col + i] += factor;
      }

      if (col + 1 < cols) {
        heatMap[row][col + 1] += factor * 2;
      }
    }

    left();
    right();
  }

  function markVerticalHeat(row, col, factor) {
    function up() {
      for (let i = 1; i < maxShipLength; i++) {
        if (row - i < 0) {
          break;
        }

        heatMap[row - i][col] += factor;
      }

      if (row - 1 >= 0) {
        heatMap[row - 1][col] += factor * 2;
      }
    }

    function down() {
      for (let i = 1; i < maxShipLength; i++) {
        if (row + i > rows - 1) {
          break;
        }

        heatMap[row + i][col] += factor;
      }

      if (row + 1 < rows) {
        heatMap[row + 1][col] += factor * 2;
      }
    }

    up();
    down();
  }

  function hasHorizontalAdjecentShip(row, col) {
    let left = false;
    let right = false;
    //Make sure the square exists, and that the bot knows about the square.
    if (col - 1 >= 0 && board[row][col - 1].ship && board[row][col - 1].isHit) {
      left = true;
    }

    if (
      col + 1 < cols &&
      board[row][col + 1].ship &&
      board[row][col + 1].isHit
    ) {
      right = true;
    }

    return left || right;
  }

  function hasVerticalAdjecentShip(row, col) {
    let up = false;
    let down = false;
    //Make sure the square exists, and that the bot knows about the square.
    if (row - 1 >= 0 && board[row - 1][col].ship && board[row - 1][col].isHit) {
      up = true;
    }

    if (
      row + 1 < rows &&
      board[row + 1][col].ship &&
      board[row + 1][col].isHit
    ) {
      down = true;
    }

    return up || down;
  }

  function markHitedSquares(squares) {
    squares.forEach((square) => {
      heatMap[square.row][square.col] = null;
    });
  }

  function generateHeatMap() {
    const hitedSquares = hitedShipsSquares();
    const completeHitedSquares = getAllHitedSquares();

    hitedSquares.forEach((square) => {
      if (hasHorizontalAdjecentShip(square.row, square.col)) {
        markHorizontalHeat(square.row, square.col, factor);
      } else if (hasVerticalAdjecentShip(square.row, square.col)) {
        markVerticalHeat(square.row, square.col, factor);
      } else {
        markHorizontalHeat(square.row, square.col, factor);
        markVerticalHeat(square.row, square.col, factor);
      }
    });

    //Mark all hits as null
    markHitedSquares(completeHitedSquares);
  }

  generateHeatMap();

  return heatMap;
};
