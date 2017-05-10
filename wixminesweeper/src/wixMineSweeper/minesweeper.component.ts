import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-minesweeper',
  template: `
    <div class="board">
       <app-game-row *ngFor="let row of gameRows"></app-game-row>
    </div>
  `
})
export class MinesweeperComponent {
  @Input() gameManager;
  gameRows;

}
