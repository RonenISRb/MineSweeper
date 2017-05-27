import {Component, Input, OnChanges} from '@angular/core';
import {partition} from './gameutils';
import {handleFlagToggled, isWon, isGameOver, handleOpenCell, toggleSuperMan, isOpened, isFlagged} from './gamelogic';
@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html'
})
export class MinesweeperComponent implements OnChanges {
  @Input() gameManager;
  superManMode: boolean;
  gameRows;
  previouslyFlagged = [];

  superMan() {
    this.previouslyFlagged = toggleSuperMan(this.getCells(), this.superManMode, this.previouslyFlagged);
  }

  cellClicked(eventData) {
    const cellNumber = this.getCellNumberClicked(eventData);
    if (isWon(this.gameManager) || isGameOver(this.gameManager)) {
      alert('Game is over.\nPlease start a new game.');
      return;
    }
    if (this.isFlagEvent(eventData)) {
      this.handleFlagAction(cellNumber);
    } else {
      handleOpenCell(this.gameManager, cellNumber);
    }
    if (isGameOver(this.gameManager)) {
      alert('Game over.\nYou loose, clicked on a mine !');
    }
  }

  handleFlagAction(cellNumber) {
    if (isOpened(this.getCells(), cellNumber) && !isFlagged(this.getCells(), cellNumber)) {
      alert('Cell was previously revealed.\nA flag can\'t be placed on such cell.');
      return;
    }
    if (this.getFlagsLeft() === 0 && !isFlagged(this.getCells(), cellNumber)) {
      alert('No more remaining flags.');
      return;
    }
    this.gameManager.flagsLeft = handleFlagToggled(this.gameManager, this.getFlagsLeft(), cellNumber);
    if (isWon(this.gameManager)) {
      alert('Congratulations !\nYou win !');
    }
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('gameManager')) {
      this.updateGame();
    }
  }

  updateGame() {
    this.gameRows = partition(Number(this.gameManager.cols), this.getCells());
  }

  getCellNumberClicked(event) {
    return event.cell.cellNumber;
  }

  getCells() {
    return this.gameManager.cells;
  }

  getFlagsLeft(): number {
    return this.gameManager.flagsLeft;
  }

  isFlagEvent(eventData) {
    return eventData.event.shiftKey;
  }
}
