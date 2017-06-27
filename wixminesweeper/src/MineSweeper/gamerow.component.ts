import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-game-row',
  template: `
    <div class="flexRow">
      <app-game-cell *ngFor="let cell of gameRow" [gameCell]="cell" (click)="gameCellClicked(cell,$event)"></app-game-cell>
    </div>
  `
})
export class GameRowComponent {
@Input() gameRow;
@Output() cellClick: EventEmitter<any> = new EventEmitter<any>();
  gameCellClicked(cell, event) {
    this.cellClick.next({cell, event});
  }
}
