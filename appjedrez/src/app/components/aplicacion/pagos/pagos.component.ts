import { Component, OnInit } from '@angular/core';
import { InscripcionOrganizador } from 'src/app/models/inscripcion-organizador';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { MercadoPagoService } from 'src/app/services/mercado-pago.service';
import { UserStoreService } from 'src/app/services/user-store.service';

declare var MercadoPago: any;
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css'],
})
export class PagosComponent implements OnInit {
  mp: any;
  bricksBuilder: any;
  preference: any;
  idUser: string = '';
  inscripcion: InscripcionOrganizador = {} as InscripcionOrganizador;
  existe: boolean = false;

  constructor(
    private mercadoPagoService: MercadoPagoService,
    private inscripcionService: InscripcionService,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });

    this.inscripcionService.getInscripcion(this.idUser).subscribe({
      next: (res) => {
        this.inscripcion = res;
        this.existe = true;
      },
    });

    this.mp = new MercadoPago(***REMOVED***, {
      locale: 'es-AR',
    });
    this.bricksBuilder = this.mp.bricks();

    this.mercadoPagoService.getPreferencia().subscribe({
      next: async (res) => {
        this.preference = res;

        this.mp.bricks().create('wallet', 'wallet_container', {
          initialization: {
            preferenceId: this.preference.id,
            redirectMode: 'self',
          },
        });
      },
    });
  }
}
