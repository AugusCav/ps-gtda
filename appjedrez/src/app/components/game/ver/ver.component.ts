import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Analisis } from 'src/app/models/analisis';
import { Movimiento } from 'src/app/models/movimiento';
import { GameService } from 'src/app/services/game.service';
import { TorneoService } from 'src/app/services/torneo.service';

declare var Chessboard: any;
@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css'],
})
export class VerComponent implements OnInit {
  pgn: string = '';
  cargado: string = '';
  idPartida: string | null = '';
  analisis: Analisis = {} as Analisis;
  analisisExiste: boolean = false;
  analizado: boolean = false;
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
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
