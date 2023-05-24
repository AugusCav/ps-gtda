import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css'],
})
export class VerComponent implements OnInit {
  cargarPgnFlag = true;
  pgn: string = '';
  move: string = '';
  cargado: string = '';
  idPartida: string | null = '';
  pgnCargado: boolean = false;

  constructor(
    private gameService: GameService,
    private torneoService: TorneoService
  ) {}
  ngOnInit(): void {
    this.idPartida = this.torneoService.idPartida;
    console.log(this.idPartida);

    this.torneoService.getPartida(this.idPartida!).subscribe({
      next: (res) => {
        if (res.pgn !== null) {
          this.pgn = res.pgn;
          this.gameService.cargarPgn(this.pgn);
          this.cargarPgnFlag = true;
          this.cargado = this.gameService.game.fen();
        }
      },
    });
  }

  moveChange(move: string) {
    this.move = move;
  }

  cargar() {
    this.cargarPgnFlag = false;
  }

  cargarPgn() {
    this.torneoService.cargarPgn(this.idPartida, this.pgn).subscribe({
      next: (res) => {
        this.gameService.cargarPgn(this.pgn);
        this.cargarPgnFlag = true;
        this.cargado = this.gameService.game.fen();
      },
    });
  }
}
