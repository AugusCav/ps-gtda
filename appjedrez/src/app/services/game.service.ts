import { Injectable } from '@angular/core';
import { Chess } from 'chess.js';
import { Movimiento } from '../models/movimiento';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game: Chess = {} as Chess;
  status: string = '';
  fen: string = '';
  pgn: string = '';
  moves: Array<string> = new Array();
  indexMoves: Array<number> = [-1, -1, -1];
  idPartida: string | null = '';
  movimientos: any[] = [];

  constructor() {}

  iniciar() {
    this.game = new Chess();
  }

  updateStatus() {
    var status = '';

    var moveColor = 'White';
    if (this.game.turn() === 'b') {
      moveColor = 'Black';
    }

    // checkmate?
    if (this.game.isCheckmate()) {
      status = 'Game over, ' + moveColor + ' is in checkmate.';
    }

    // draw?
    else if (this.game.isDraw()) {
      status = 'Game over, drawn position';
    }

    // game still on
    else {
      status = moveColor + ' to move';

      // check?
      if (this.game.inCheck()) {
        status += ', ' + moveColor + ' is in check';
      }
    }

    this.status = status;
    this.fen = this.game.fen();
  }

  position() {
    return this.game.fen();
  }

  getNextMove() {
    var nextMove = null;
    if (this.moves[this.indexMoves[2]] !== undefined) {
      nextMove = this.moves[this.indexMoves[2]];
      this.setIndexMoves(
        this.indexMoves[1],
        this.indexMoves[2],
        this.indexMoves[2] + 1
      );
      this.game.load(nextMove);
      this.updateStatus();
    }
  }

  getPrevMove() {
    var prevMove = null;
    if (this.moves[this.indexMoves[0]] !== undefined) {
      prevMove = this.moves[this.indexMoves[0]];
      this.setIndexMoves(
        this.indexMoves[0] - 1,
        this.indexMoves[0],
        this.indexMoves[1]
      );
      this.game.load(prevMove);
      this.updateStatus();
    }
  }

  private setIndexMoves(prev: number, actual: number, next: number) {
    this.indexMoves[0] = prev;
    this.indexMoves[1] = actual;
    this.indexMoves[2] = next;
  }

  cargarPgn(pgn: string) {
    this.game.loadPgn(pgn);
    this.movimientos = this.game.history({ verbose: true });
    
    do {
      this.moves.push(this.game.fen());
    } while (this.game.undo() != null);
    this.moves.reverse();
    this.game.load(this.moves[this.moves.length - 1]);

    this.setIndexMoves(this.moves.length - 2, this.moves.length - 1, -1);
    this.updateStatus();
  }

  generarMoves(idAnalisis: number) {
    var currentMoves: Movimiento[] = [];

    this.movimientos.forEach((currentMove) => {
      var move = {
        idAnalisis: idAnalisis,
        color: currentMove.color,
        moveFrom: currentMove.from,
        moveTo: currentMove.to,
        pieza: currentMove.piece,
      } as Movimiento;
      currentMoves.push(move);
    });

    return currentMoves;
  }
}
