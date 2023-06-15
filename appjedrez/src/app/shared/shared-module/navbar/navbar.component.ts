import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { InscripcionOrganizador } from 'src/app/models/inscripcion-organizador';
import { Notificacion } from 'src/app/models/notificacion';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cantidadNotif: number = 0;
  idUser: string = '';
  notificaciones: Notificacion[] = [];
  existe: boolean = false;
  inscripcion: InscripcionOrganizador = {} as InscripcionOrganizador;

  constructor(
    private notificacionService: NotificacionService,
    private toastr: ToastrService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private inscripcionService: InscripcionService
  ) {}

  ngOnInit(): void {
    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });

    this.getAllNotificaciones();

    this.inscripcionService.getInscripcion(this.idUser).subscribe({
      next: (res) => {
        this.inscripcion = res;
        this.existe = true;
      },
    });
  }

  marcarLeida(notificacion: Notificacion) {
    console.log(notificacion);
    this.notificacionService.actualizar(notificacion).subscribe({
      next: () => {
        this.notificacionService.getAll(this.idUser).subscribe({
          next: (res) => {
            this.getAllNotificaciones();
          },
          error: (err) => {
            this.toastr.error(err.error.message, 'Error');
          },
        });
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }

  getAllNotificaciones() {
    this.notificacionService.getAll(this.idUser).subscribe({
      next: (res) => {
        this.notificacionService.notificaciones = res;
        this.cantidadNotif = res.length;
        this.notificaciones = res;
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
