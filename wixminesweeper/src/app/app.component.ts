import {Component, OnInit} from '@angular/core';
import {initGame} from '../wixMineSweeper/gamelogic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public gameManager;
  gameSettings: GameSettings = {
    rows: 10,
    cols: 10,
    mines: 5
  };

  ngOnInit(): void {
    this.startGame();
  }

  startGame(): void {
    this.gameManager = initGame(this.gameSettings);
  }

  getMessage(): string {
    if (this.gameSettings.rows == null || this.gameSettings.cols == null || this.gameSettings.mines == null) {
      return ' * Please fill all game settings.';
    } else if (this.gameSettings.rows < 0 || this.gameSettings.cols < 0  || this.gameSettings.rows > 300 || this.gameSettings.cols > 300) {
      return ' * Rows and columns  should be in range of [1 , 300].';
    }else if (this.gameSettings.mines < 0 || this.gameSettings.mines > 90000 ) {
      return ' * Mines amount should be in range of  [1 , 90000].';
    } else if (this.gameSettings.mines > this.gameSettings.rows * this.gameSettings.cols) {
      return ' * Amount of mines is more than the board size.';
    }
    return '';
  }
}

interface GameSettings {
  rows: number;
  cols: number;
  mines: number;
}
