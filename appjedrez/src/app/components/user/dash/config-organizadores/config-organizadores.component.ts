import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InscripcionOrganizador } from 'src/app/models/inscripcion-organizador';
import { InscripcionService } from 'src/app/services/inscripcion.service';

@Component({
  selector: 'app-config-organizadores',
  templateUrl: './config-organizadores.component.html',
  styleUrls: ['./config-organizadores.component.css'],
})
export class ConfigOrganizadoresComponent implements OnInit {
  inscripciones: InscripcionOrganizador[] = [];

  constructor(
    private inscripcionService: InscripcionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inscripcionService.getInscripcionesOrg().subscribe({
      next: (res) => {
        this.inscripciones = res;
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }

  irAPerfil(idUsuario: string) {
    this.router.navigate(['/user/perfil', idUsuario]);
  }

  aprobarInscripcion(inscripcion: InscripcionOrganizador) {
    this.inscripcionService.aprobarInscripcionOrg(inscripcion).subscribe({
      next: (res) => {
        this.toastr.success('Aprobada', 'Éxito');
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }

  rechazarInscripcion(inscripcion: InscripcionOrganizador) {
    this.inscripcionService.rechazarInscripcionOrg(inscripcion).subscribe({
      next: (res) => {
        this.toastr.warning('Rechazada');
        window.location.reload();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
    });
  }
}
