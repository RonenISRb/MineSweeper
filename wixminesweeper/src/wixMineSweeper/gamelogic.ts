export function initGame(gameSettings) {
  return {
    rows: gameSettings.rows,
    cols: gameSettings.cols,
    cells: initCells(gameSettings.rows, gameSettings.cols, gameSettings.mines)
  };
}

function initCells(rows, cols, mines) {

}


