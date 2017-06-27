import {duplicateItem, setValueRandomly} from './gameutils';

export function initGame(gameSettings) {
  return {
    rows: Number(gameSettings.rows),
    cols: Number(gameSettings.cols),
    mines: Number(gameSettings.mines),
    cells: initCells(Number(gameSettings.rows), Number(gameSettings.cols), Number(gameSettings.mines)),
    flagsLeft: gameSettings.mines
  };
}

function initCells(rows, cols, mines) {
   let minesPlaces;
   const cells = duplicateItem(rows * cols, {openedCell: false, mineCell: false, flaggedCell: false, threatCount: 0});
   minesPlaces = setValueRandomly(mines, cells, 'mineCell', true);
   minesPlaces.forEach(function (cell) {
     getNeighborsCellNumbers(cell, cols, rows * cols).forEach(function (index) {
       setThreatCount(cells, index, Number(cells[index].threatCount + 1));
     });
   });
   return cells.map(function (cell, cellNumber) {
     cell.cellNumber = cellNumber;
     return cell;
   });
}

function getNumberOfMineFlaggedCells(gameCells): number {
  return gameCells.filter(function (item) {
    return item.mineCell && item.flaggedCell;
  }).length;
}

export function handleFlagToggled(game, flagsLeft, cellNumber): number {
 if (isFlagged(game.cells, cellNumber)) {
  setFlagged(game.cells, cellNumber, false);
  flagsLeft++;
 } else {
   setFlagged(game.cells, cellNumber, true);
   flagsLeft--;
 }
 return flagsLeft;
}

export function handleOpenCell(game, cellNumber): void {
  if (isMineCell(game.cells, cellNumber)) {
     setOpened(game.cells, cellNumber, true);
     game.gameOver = true;
  } else {
    openCurrentCellAndNearPossible(game, cellNumber);
  }
}

function openCurrentCellAndNearPossible(game, cellNumber): void {
  const toCheck = [];
  if (checkBaseCase(game, cellNumber)) {
    return;
  }

  setOpened(game.cells, cellNumber, true);
  if (!hasMinesAround(game.cells, cellNumber)) {
    getNeighborsCellNumbers(cellNumber, game.cols, game.cells.length).forEach(function (cell) {
      toCheck.push(cell);
    });
  } else {
    return;
  }

  while (toCheck.length > 0) {
    const curr = toCheck.pop();
    if (!checkBaseCase(game, curr) && !hasMinesAround(game.cells, curr)) {
      getNeighborsCellNumbers(curr, game.cols, game.cells.length).forEach(function (cell) {
        toCheck.push(cell);
      });
    }
    setOpened(game.cells, curr, true);
  }
}

function hasMinesAround(cells, cellNumber): boolean {
  return cells[cellNumber].threatCount > 0;
}

function checkBaseCase(game, cellNumber): boolean {
  return isMineCell(game.cells, cellNumber) || isOpened(game.cells, cellNumber);
}

export function toggleSuperMan(cells, activate, flaggedPreviously) {
  const flaggedCurrently = [];
  cells.forEach(function (cell) {
    const cellNum = cell.cellNumber;
    if (isMineCell(cells, cellNum)) {
      if (!isFlagged(cells, cellNum) && flaggedPreviously.indexOf(cellNum) === -1) {
        setOpened(cells, cellNum, activate);
      } else if (activate) {
        setFlagged(cells, cellNum, false);
        setOpened(cells, cellNum, true);
        flaggedCurrently.push(cellNum);
      } else if (flaggedPreviously.indexOf(cellNum) > -1 ) {
        setFlagged(cells, cellNum, true);
      }
    }
  });
  if (!activate) {
    return flaggedPreviously;
  } else {
    return flaggedCurrently;
  }
}

function getNeighborsCellNumbers(cellNumber, colsNum, boardSize): number[] {
  const res = [];

  if (isUpSafe(cellNumber, colsNum, boardSize)) {
    res.push(cellNumber - colsNum);
  }
  if (isUpLeftSafe(cellNumber, colsNum, boardSize)) {
    res.push(cellNumber - colsNum - 1);
  }
  if (isUpRightSafe(cellNumber, colsNum, boardSize)) {
    res.push(cellNumber - colsNum + 1);
  }
  if (isLeftSafe(cellNumber, colsNum)) {
    res.push(cellNumber - 1);
  }
  if (isRightSafe(cellNumber, colsNum)) {
    res.push(cellNumber + 1);
  }
  if (isDownSafe(cellNumber, colsNum, boardSize)) {
    res.push(cellNumber + colsNum);
  }
  if (isDownLeftSafe(cellNumber, colsNum, boardSize)) {
    res.push(cellNumber + colsNum - 1);
  }
  if (isDownRightSafe(cellNumber, colsNum, boardSize)) {
    res.push(cellNumber + colsNum + 1);
  }
  return res;
}

function isUpSafe(cellNumber, colsNum, boardSize): boolean {
  return inBoardRange(cellNumber - colsNum, boardSize);
}

function isUpLeftSafe(cellNumber, colsNum, boardSize): boolean {
  return !onLeftEdge(cellNumber, colsNum) && (inBoardRange(cellNumber - colsNum - 1, boardSize));
}

function isUpRightSafe(cellNumber, colsNum, boardSize): boolean {
  return !onRightEdge(cellNumber, colsNum) && inBoardRange(cellNumber - colsNum + 1, boardSize);
}

function isLeftSafe(cellNumber, colsNum): boolean {
  return !onLeftEdge(cellNumber, colsNum);
}

function isRightSafe(cellNumber, colsNum): boolean {
  return !onRightEdge(cellNumber, colsNum);
}

function isDownSafe(cellNumber, colsNum, boardSize): boolean {
  return inBoardRange(cellNumber + colsNum, boardSize);
}

function isDownLeftSafe(cellNumber, colsNum, boardSize): boolean {
  return !onLeftEdge(cellNumber, colsNum) && inBoardRange(cellNumber + colsNum - 1, boardSize);
}

function isDownRightSafe(cellNumber, colsNum, boardSize): boolean {
  return !onRightEdge(cellNumber, colsNum) && inBoardRange(cellNumber + colsNum + 1, boardSize);
}

export function isFlagged(board, cellNumber): boolean {
  return board[cellNumber].flaggedCell;
}

export function isWon(gameBoard): boolean {
  return getNumberOfMineFlaggedCells(gameBoard.cells) === gameBoard.mines;
}

export function isGameOver(gameBoard): boolean {
  return gameBoard.gameOver === true;
}

export function isOpened(cells, cellNumber): boolean {
  return cells[cellNumber].openedCell;
}

function isMineCell(cells, cellNumber): boolean {
  return cells[cellNumber].mineCell;
}

function setFlagged(cells, cellNumber, selection): void {
  cells[cellNumber].flaggedCell = selection;
  setOpened(cells, cellNumber, selection);
}

function setOpened(cells, cellNumber, selection): void {
  cells[cellNumber].openedCell = selection;
}

function inBoardRange(cellIndex, boardSize): boolean {
  return cellIndex >= 0 && cellIndex <= boardSize - 1;
}

function onLeftEdge(cellIndex, colsNum): boolean {
  return cellIndex % colsNum === 0;
}

function onRightEdge(cellIndex, colsNum): boolean {
  return cellIndex % colsNum === colsNum - 1;
}

function setThreatCount(cells, cellNumber, amount): void {
  cells[cellNumber].threatCount = amount;
}
