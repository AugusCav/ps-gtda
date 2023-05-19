import { Component, OnInit } from '@angular/core';
import { Torneo } from 'src/app/models/torneo';
import { AuthService } from 'src/app/services/auth.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  torneo: Torneo = {} as Torneo;
  id: any = '';
  idUser: string = '';
  esOrganizador: boolean = false;

  constructor(
    private torneoService: TorneoService,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.torneoService.torneoId;

    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });

    if (this.id !== null) {
      this.torneoService.getById(this.id).subscribe({
        next: (res) => {
          this.torneo = res;
          if (this.torneo.idOrganizador === this.idUser) {
            this.esOrganizador = true;
          } else {
            this.esOrganizador = false;
          }
        },
        error: () => {
          alert('Error al intentar cargar el torneo');
        },
      });
    } else {
      alert('Ningún torneo seleccionado');
    }
  }
}
