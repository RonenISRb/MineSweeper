import { BrowserModule } from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MinesweeperComponent } from '../MineSweeper/minesweeper.component';
import { GameRowComponent } from '../MineSweeper/gamerow.component';
import { GameCellComponent } from '../MineSweeper/gamecell.component';
enableProdMode()
@NgModule({
  declarations: [
    AppComponent,
    MinesweeperComponent,
    GameRowComponent,
    GameCellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
