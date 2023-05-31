import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Analisis } from 'src/app/models/analisis';
import { GameService } from 'src/app/services/game.service';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css'],
})
export class VerComponent implements OnInit {
  pgn: string = '';
  move: string = '';
  cargado: string = '';
  idPartida: string | null = '';
  analisis: Analisis = {} as Analisis;

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
          this.cargado = this.gameService.game.fen();

          this.torneoService.getAnalisis(this.idPartida!).subscribe({
            next: (res) => {
              this.analisis = res;
            },
            error: (err) => {
              this.toastr.error(err.error.message);
              var analisis: Analisis = {
                idPartida: this.idPartida,
              } as Analisis;

              this.torneoService.registrarAnalisis(analisis).subscribe({
                next: (res) => {
                  this.torneoService.getAnalisis(this.idPartida!).subscribe({
                    next: (res) => {
                      this.gameService.generarMoves(res.id);
                    },
                  });
                },
                error: (err) => {
                  this.toastr.error(err.error.message, 'Error');
                },
              });
            },
          });
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }

  moveChange(move: string) {
    this.move = move;
  }
}
