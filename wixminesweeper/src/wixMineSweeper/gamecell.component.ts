import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-game-cell',
  template: `
    <div class="opened" [class.mine]="gameCell.mineCell" [class.flagged]="gameCell.flaggedCell">
      <div class="closed" *ngIf="!gameCell.openedCell"></div>
      <div *ngIf="gameCell.openedCell && !gameCell.mineCell && !gameCell.flaggedCell" [style.color]="getCellColor(gameCell.threatCount)">
        {{ gameCell.threatCount > 0 ? gameCell.threatCount : '' }}
      </div>
    </div>
  `
})
export class GameCellComponent  {
  @Input() gameCell;

  getCellColor(threatCount) {
    if (threatCount === 1) {
      return 'blue';
    } else if (threatCount === 2) {
      return 'OldLace';
    } else if (threatCount === 3) {
      return 'red';
    }else if (threatCount === 4) {
      return 'orange';
    }else if (threatCount === 5) {
      return 'yellow';
    }else {
      return 'LightSteelBlue';
    }
  }
}
