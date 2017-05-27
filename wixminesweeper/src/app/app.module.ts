import { BrowserModule } from '@angular/platform-browser';
import {enableProdMode, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MinesweeperComponent } from '../wixMineSweeper/minesweeper.component';
import { GameRowComponent } from '../wixMineSweeper/gamerow.component';
import { GameCellComponent } from '../wixMineSweeper/gamecell.component';
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
