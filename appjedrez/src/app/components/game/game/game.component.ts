import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Partida } from 'src/app/models/partida';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  idUser: string = '';
  partida: Partida = {} as Partida;
  idPartida: string | null = '';

  constructor(
    private gameService: GameService,
    private torneoService: TorneoService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idPartida = this.route.snapshot.paramMap.get('idPartida');
    this.torneoService.idPartida = this.idPartida;

    this.getDatos();

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

  getDatos() {
    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });
  }
}
