import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessGameComponent } from './chess-game/chess-game.component';
import { GameComponent } from './game/game.component';
import { GameRoutingModule } from './game-routing.module';
import { PgnViewerComponent } from './pgn-viewer/pgn-viewer.component';
import { FormsModule } from '@angular/forms';
import { DetallesGameComponent } from './detalles-game/detalles-game.component';
import { VerComponent } from './ver/ver.component';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';

@NgModule({
  declarations: [
    ChessGameComponent,
    GameComponent,
    PgnViewerComponent,
    DetallesGameComponent,
    VerComponent,
  ],
  imports: [CommonModule, GameRoutingModule, FormsModule, SharedModule],
})
export class GameModule {}
