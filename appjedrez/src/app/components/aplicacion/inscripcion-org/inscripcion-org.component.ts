import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InscripcionOrganizador } from 'src/app/models/inscripcion-organizador';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-inscripcion-org',
  templateUrl: './inscripcion-org.component.html',
  styleUrls: ['./inscripcion-org.component.css'],
})
export class InscripcionOrgComponent implements OnInit {
  idUser: string = '';

  constructor(
    private inscripcionService: InscripcionService,
    private toastr: ToastrService,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });
  }

  inscribir() {
    var inscripcion: InscripcionOrganizador = {
      idUsuario: this.idUser,
    } as InscripcionOrganizador;
    this.inscripcionService.inscribirOrg(inscripcion).subscribe({
      next: () => {
        this.toastr.success('Inscripción agregada', 'Éxito');
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
