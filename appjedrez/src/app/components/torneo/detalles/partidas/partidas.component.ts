import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Partida } from 'src/app/models/partida';
import { Ronda } from 'src/app/models/ronda';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css'],
})
export class PartidasComponent implements OnInit {
  esOrganizador: boolean = false;
  id: string = '';
  idUser: string = '';
  rondas: Ronda[] = [];

  constructor(
    private torneoService: TorneoService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.torneoService.torneoId;

    this.getDatos();

    if (this.id !== null) {
      this.torneoService.getById(this.id).subscribe({
        next: (res) => {
          if (res.idOrganizador === this.idUser) {
            this.esOrganizador = true;
          } else {
            this.esOrganizador = false;
          }
        },
        error: () => {
          alert('Error al intentar cargar el torneo');
        },
      });

      this.torneoService.getRondas(this.id).subscribe({
        next: (res) => {
          this.rondas = res;
        },
        error: (err) => {
          console.log('error');
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

  verPartidas(partidas: Partida[]) {
    this.torneoService.partidas = partidas;
    this.router.navigate(['/app/torneo/detalles', this.id, 'listado-partidas']);
  }
}
