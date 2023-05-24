import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Partida } from 'src/app/models/partida';
import { GameService } from 'src/app/services/game.service';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-detalles-game',
  templateUrl: './detalles-game.component.html',
  styleUrls: ['./detalles-game.component.css'],
})
export class DetallesGameComponent implements OnInit {
  idPartida: string | null = '';
  partida: Partida = {} as Partida;

  constructor(
    private gameService: GameService,
    private torneoService: TorneoService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idPartida = this.torneoService.idPartida;
    console.log(this.idPartida);
    if (this.idPartida !== '') {
      this.torneoService.getPartida(this.idPartida!).subscribe({
        next: (res) => {
          this.partida = res;
        },
        error: (err) => {
          this.toastr.error('Error al obtener la partida', 'Error');
        },
      });
    }
  }
}
