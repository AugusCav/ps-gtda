import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  cargarPgnFlag = true;
  pgn: string = '';
  move: string = '';
  cargado: string = '';

  constructor(private gameService: GameService) {}

  moveChange(move: string) {
    this.move = move;
  }

  cargar() {
    this.cargarPgnFlag = false;
  }

  cargarPgn() {
    this.gameService.cargarPgn(this.pgn);
    this.cargarPgnFlag = true;
    this.cargado = this.gameService.game.fen();
  }
}
