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
    if (this.nullElementsExist()) {
      return ' * Please fill all game settings.';
    } else if (!this.inRange(this.gameSettings.rows, 1, 300) || !this.inRange(this.gameSettings.cols, 1, 300)) {
      return ' * Rows and columns  should be in range of [1 , 300].';
    }else if (!this.inRange(this.gameSettings.mines, 1, 90000)) {
      return ' * Mines amount should be in range of  [1 , 90000].';
    } else if (!this.correctMinesAmount()) {
      return ' * Amount of mines is more than the board size.';
    }
    return '';
  }

  nullElementsExist(): boolean {
    return this.gameSettings.rows == null || this.gameSettings.cols == null || this.gameSettings.mines == null;
  }

  inRange(setting, min, max): boolean {
    return setting >= min && setting <= max;
  }

  correctMinesAmount() {
    return this.gameSettings.mines <= this.gameSettings.rows * this.gameSettings.cols;
  }
}

interface GameSettings {
  rows: number;
  cols: number;
  mines: number;
}
