import { Component, EventEmitter, Output } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css'],
})
export class ChessGameComponent {
  constructor(private gameService: GameService) {}
  @Output() moveChange: EventEmitter<string> = new EventEmitter<string>();

  get status() {
    return this.gameService.status;
  }
  get fen() {
    return this.gameService.fen;
  }
  get pgn() {
    return this.gameService.pgn;
  }

  nextMove() {
    this.gameService.getNextMove();
    this.moveChange.emit(this.fen);
  }

  prevMove() {
    this.gameService.getPrevMove();
    this.moveChange.emit(this.fen);
  }
}
