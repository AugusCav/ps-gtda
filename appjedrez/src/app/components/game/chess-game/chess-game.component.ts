import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Analisis } from 'src/app/models/analisis';
import { Movimiento } from 'src/app/models/movimiento';
import { TorneoService } from 'src/app/services/torneo.service';
import { ToastrService } from 'ngx-toastr';
import { ChartConfiguration, ChartOptions } from 'chart.js';

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
  movimientosAnalizados: Movimiento[] = [];
  moves: any[] = [];
  loaded: boolean = false;
  menu: boolean = false;

  @ViewChild('botones', { static: true }) botones!: ElementRef;
  @ViewChild('resumen', { static: true }) resumen!: ElementRef;

  // Line
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: '#f8f9fa',
        },
      },
      x: {
        display: false,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function () {
            return '';
          },
        },
      },
    },
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        fill: {
          target: 'origin',
          above: 'white',
          below: 'black',
        },
        backgroundColor: 'gray',
        borderColor: 'gray',
        pointBackgroundColor: 'white',
        pointBorderColor: 'gray',
        tension: 0.4,
      },
    ],
  };
  public lineChartLegend = false;
  public lineChartPlugins = [];

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

          var i = 0;
          this.gameService.movimientos.forEach((move) => {
            this.moves.push({ n: i, move: move });
            i++;
          });

          this.torneoService.getAnalisis(this.idPartida!).subscribe({
            next: (res) => {
              this.analisis = res;
              this.movimientosAnalizados = res.movimientos;
              this.lineChartData.datasets[0].data =
                this.movimientosAnalizados.map((item) => item.evaluacion);
              var i = 0;
              this.lineChartData.labels = this.movimientosAnalizados.map(
                (item) => i++
              );
              this.analisisExiste = true;
              this.loaded = true;
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

  get bestMove() {
    if (
      this.movimientosAnalizados[this.gameService.indexMoves[1]] != undefined
    ) {
      return this.movimientosAnalizados[this.gameService.indexMoves[1]];
    } else {
      return { bestMove: '' };
    }
  }

  get eval() {
    if (
      this.movimientosAnalizados[this.gameService.indexMoves[1]] != undefined
    ) {
      return this.movimientosAnalizados[this.gameService.indexMoves[1]];
    } else {
      return { evaluacion: 0 };
    }
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
          next: (res) => {},
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

  menuMov() {
    this.menu = false;
    this.botones.nativeElement.classList.add('active');
    this.botones.nativeElement.classList.remove('link-light');
    this.resumen.nativeElement.classList.remove('active');
    this.resumen.nativeElement.classList.add('link-light');
  }
  menuAnalisis() {
    this.menu = true;
    this.resumen.nativeElement.classList.add('active');
    this.resumen.nativeElement.classList.remove('link-light');
    this.botones.nativeElement.classList.remove('active');
    this.botones.nativeElement.classList.add('link-light');
  }

  mover(n: number) {
    this.gameService.mover(n);
    this.moveChange(this.fen);
  }
}
