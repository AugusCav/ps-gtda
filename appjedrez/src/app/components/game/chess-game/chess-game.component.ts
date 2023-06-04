import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Analisis } from 'src/app/models/analisis';
import { Movimiento } from 'src/app/models/movimiento';
import { TorneoService } from 'src/app/services/torneo.service';
import { ToastrService } from 'ngx-toastr';

declare var Chessboard: any;
@Component({
  selector: 'app-chess-game',
  templateUrl: './chess-game.component.html',
  styleUrls: ['./chess-game.component.css'],
})
export class ChessGameComponent implements OnInit {
  idPartida: string | null = '';
  analizado: boolean = false;
  pgn: string = '';
  analisis: Analisis = {} as Analisis;
  analisisExiste: boolean = false;
  board: any = null;

  constructor(
    private gameService: GameService,
    private torneoService: TorneoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.gameService.iniciar();
    this.idPartida = this.torneoService.idPartida;

    this.torneoService.getPartida(this.idPartida!).subscribe({
      next: (res) => {
        if (res.pgn !== null) {
          this.pgn = res.pgn;
          this.gameService.cargarPgn(this.pgn);

          var config = {
            pieceTheme:
              '../../../../assets/img/chesspieces/wikipedia/{piece}.png',
            position: this.position(),
          };

          this.board = Chessboard('board', config);
          this.updateStatus();

          this.torneoService.getAnalisis(this.idPartida!).subscribe({
            next: (res) => {
              this.analisis = res;
              this.analisisExiste = true;
            },
            error: (err) => {
              this.analisisExiste = false;
            },
          });
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }

  get status() {
    return this.gameService.status;
  }
  get fen() {
    return this.gameService.fen;
  }

  nextMove() {
    this.gameService.getNextMove();
    this.moveChange(this.fen);
  }

  prevMove() {
    this.gameService.getPrevMove();
    this.moveChange(this.fen);
  }

  analizar() {
    var analisis: Analisis = {
      idPartida: this.idPartida,
    } as Analisis;

    this.torneoService.registrarAnalisis(analisis).subscribe({
      next: (res) => {
        var movimientos: Movimiento[] = this.gameService.generarMoves(res);
        this.analizado = true;

        this.torneoService.registrarMovimientos(movimientos, res).subscribe({
          next: (res) => {
            this.toastr.success('Movimientos registrados');
          },
          error: (err) => {
            this.toastr.error(err.error.message, 'Error');
          },
        });
      },
    });
  }

  position() {
    return this.gameService.position();
  }

  updateStatus() {
    this.gameService.updateStatus();
  }

  moveChange(move: string) {
    this.board.position(move);
  }
}
