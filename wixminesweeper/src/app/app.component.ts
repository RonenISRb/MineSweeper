import {Component, OnInit} from '@angular/core';
import {initGame} from '../wixMineSweeper/gamelogic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  public gameManager;
  superManMode: boolean;
  gameSettings: GameSettings = {
    rows: 15,
    cols: 15,
    mines: 15
  };

  ngOnInit(): void {
    this.startGame(this.gameSettings);
  }

  startGame(gameSettings): void {
    const ROWS = gameSettings.rows;
    const COLS = gameSettings.cols;
    const MINES = gameSettings.mines;
    if (MINES > ROWS * COLS) {
      alert('Number of mines can\'t be more than rows*cols size.');
    } else {
      this.gameManager = initGame(gameSettings);
    }
  }

  canStart(): boolean {
    return this.gameSettings.mines <= this.gameSettings.rows * this.gameSettings.cols;
  }

  toggleSuperMan() {
    if (this.superManMode === true) {
      alert('true');
    } else {
      alert('false');
    }
  }
}

interface GameSettings {
  rows: number;
  cols: number;
  mines: number;
}
