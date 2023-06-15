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
  indexMoves: Array<number> = [-1, -1, -1];
  idPartida: string | null = '';
  movimientos: any[] = [];

  constructor() {}

  iniciar() {
    this.game = new Chess();
  }

  updateStatus() {
    var status = '';

    var moveColor = 'Blancas';
    if (this.game.turn() === 'b') {
      moveColor = 'Negras';
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
      status = 'Mueven ' + moveColor;

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
    if (this.movimientos[this.indexMoves[2]] !== undefined) {
      nextMove = this.movimientos[this.indexMoves[2]].after;
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
    if (this.movimientos[this.indexMoves[0]] !== undefined) {
      prevMove = this.movimientos[this.indexMoves[0]].after;
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
    console.log(this.game.history({ verbose: true }));

    this.game.load(this.movimientos[this.movimientos.length - 1].after);

    this.setIndexMoves(
      this.movimientos.length - 2,
      this.movimientos.length - 1,
      -1
    );
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
        fen: currentMove.after,
      } as Movimiento;
      currentMoves.push(move);
    });

    return currentMoves;
  }

  mover(n: number) {
    var currentMove = this.movimientos[n].after;
    console.log(currentMove);
    var prevMove = n - 1;
    var nextMove = n + 1;
    this.setIndexMoves(prevMove, n, nextMove);
    this.game.load(currentMove);
    this.updateStatus();
  }
}
