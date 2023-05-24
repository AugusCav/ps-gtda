import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Partida } from 'src/app/models/partida';
import { AuthService } from 'src/app/services/auth.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css'],
})
export class PartidasComponent implements OnInit {
  partidas: Partida[] = [];
  idUser: string = '';

  constructor(
    private torneoService: TorneoService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDatos();

    if (this.idUser !== '') {
      this.torneoService.getPartidasJugador(this.idUser).subscribe({
        next: (res) => {
          this.partidas = res;
        },
        error: (err) => {
          this.toastr.error('Error al obtener las partidas', 'Error');
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

  irGame(partidaId: string) {
    this.router.navigate(['/app/game', partidaId]);
  }
}
