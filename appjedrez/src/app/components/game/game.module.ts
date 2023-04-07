import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessGameComponent } from './chess-game/chess-game.component';
import { GameComponent } from './game/game.component';
import { GameRoutingModule } from './game-routing.module';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { PgnViewerComponent } from './pgn-viewer/pgn-viewer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChessGameComponent, GameComponent, ChessBoardComponent, PgnViewerComponent],
  imports: [CommonModule, GameRoutingModule, FormsModule],
})
export class GameModule {}
