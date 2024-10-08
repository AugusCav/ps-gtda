import { DatePipe } from '@angular/common';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Notificacion } from 'src/app/models/notificacion';
import { Torneo } from 'src/app/models/torneo';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

//MODAL BORRAR INSCRIPCION

@Component({
  selector: 'ngbd-modal-inscripcion',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Eliminar inscripción</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <p>
        <strong
          >¿Está seguro que desea eliminar la inscripción de
          <span class="text-info">
            {{ data.participante.nombres }}
            {{ data.participante.apellido }}</span
          >?
        </strong>
      </p>
      <p class="text-danger">No podrá participar del torneo.</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancelar
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-danger text-white"
        (click)="borrar()"
      >
        Borrar
      </button>
    </div>
  `,
})
export class NgbModalInscripcion {
  constructor(
    public modal: NgbActiveModal,
    @Inject('DATA') public data: any,
    private router: Router,
    private inscripcionService: InscripcionService,
    private toastr: ToastrService,
    private notificacionService: NotificacionService
  ) {}

  borrar() {
    this.inscripcionService
      .deleteInscripcion(this.data.inscripcion.id)
      .subscribe({
        next: () => {
          var notificacion = {
            usuarioId: this.data.inscripcion.participante.id,
            mensaje: `Su solicitud de inscripción a ${this.data.torneo.nombre} ha sido rechazada`,
            torneoId: this.data.torneo.id,
          } as Notificacion;

          this.notificacionService.register(notificacion).subscribe({
            next: (res) => {
              this.modal.close('Ok click');
              this.toastr.success('Inscripción eliminada con éxito');
              window.location.reload();
            },
          });
        },
        error: () => {
          this.modal.close('Ok click');
        },
      });
  }
}

// COMPONENTE PRINCIPAL
@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.css'],
  providers: [DatePipe],
})
export class ListadoInscripcionesComponent implements OnInit {
  inscripciones: Inscripcion[] = [];
  esOrganizador: boolean = false;
  id: any = '';
  idUser: any = '';
  torneo: Torneo = {} as Torneo;

  constructor(
    private inscripcionService: InscripcionService,
    private router: Router,
    private _modalService: NgbModal,
    private torneoService: TorneoService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService,
    private notificacionService: NotificacionService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.id = this.torneoService.torneoId;

    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });

    if (this.id !== null) {
      this.inscripcionService.getAllNoParticipantes(this.id).subscribe({
        next: (res) => {
          this.inscripciones = res;
        },
        error: () => {
          this.toastr.error('Error al intentar cargar los inscriptos');
        },
      });

      this.torneoService.getById(this.id).subscribe({
        next: (res) => {
          this.torneo = res;
        },
        error: (err) => {
          this.toastr.error('error');
        },
      });
    }
  }

  abrirParticipante(idParticipante: string) {
    this.router.navigate(['/user/perfil', idParticipante]);
  }

  openRechazar(inscripcion: any) {
    const data = { inscripcion: inscripcion, torneo: this.torneo };
    const injector = Injector.create({
      providers: [{ provide: 'DATA', useValue: data }],
    });
    this._modalService.open(NgbModalInscripcion, { injector });
  }

  aprobar(inscripcion: any) {
    this.inscripcionService.aprobar(inscripcion).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'Éxito');
        const mensaje = `Su solicitud de inscripción al torneo ${this.torneo.nombre} ha sido aprobada`;

        const inscripcionEmailRequest = {
          nombreTorneo: this.torneo.nombre,
          email: inscripcion.participante.email,
        };

        const notificacion = {
          usuarioId: inscripcion.idParticipante,
          mensaje: mensaje,
          fecha: this.datePipe.transform(new Date(), 'yyyy:MM:dd')!,
          torneoId: this.id,
        } as Notificacion;

        this.toastr.success('Inscripción aceptada');
        window.location.reload();

        // this.inscripcionService
        //   .sendInscripcionEmail(inscripcionEmailRequest)
        //   .subscribe({
        //     next: (res) => {
        //       this.toastr.success(
        //         'Comprobacion de inscripcion enviada',
        //         'Éxito'
        //       );
        //       window.location.reload();
        //     },
        //     error: () => {
        //       console.log('error inesperado');
        //     },
        //   });
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error');
      },
    });
  }
}
