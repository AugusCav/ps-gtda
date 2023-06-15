import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Notificacion } from 'src/app/models/notificacion';
import { Torneo } from 'src/app/models/torneo';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

//MODAL BORRAR TORNEO
@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Eliminar torneo</h4>
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
          >¿Estás seguro que deseas borrar el torneo "<span
            class="text-primary"
            >{{ data.nombre }}</span
          >"?</strong
        >
      </p>
      <p>
        Toda la información asociada a este torneo será eliminada.
        <span class="text-danger">Esta operación no se puede deshacer.</span>
      </p>
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
export class NgbdModalConfirmAutofocus {
  constructor(
    public modal: NgbActiveModal,
    @Inject('DATA') public data: any,
    private router: Router,
    private torneoService: TorneoService
  ) {}

  borrar() {
    this.torneoService.deleteTorneo(this.data.id).subscribe({
      next: () => {
        alert('Torneo eliminado con éxito');
        this.modal.close('Ok click');
        this.router.navigate(['torneo/listado']);
      },
      error: () => {
        console.log('error');
        this.modal.close('Ok click');
      },
    });
  }
}

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
          >¿Estás seguro que deseas eliminar tu inscripción a este torneo?
        </strong>
      </p>
      <p class="text-danger">No podrás participar del mismo.</p>
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
    private toastr: ToastrService
  ) {}

  borrar() {
    this.inscripcionService.deleteInscripto(this.data).subscribe({
      next: () => {
        this.toastr.success('Torneo eliminado con éxito');
        this.modal.close('Ok click');
        window.location.reload();
      },
      error: () => {
        console.log('error');
        this.modal.close('Ok click');
      },
    });
  }
}

//COMPONENTE PRINCIPAL
@Component({
  selector: 'app-detalles-torneo',
  templateUrl: './detalles-torneo.component.html',
  styleUrls: ['./detalles-torneo.component.css'],
  providers: [DatePipe],
})
export class DetallesTorneoComponent implements OnInit {
  torneo: Torneo = {} as Torneo;
  id: string | null = '';
  imgUrl: string = 'url("https://via.placeholder.com/1450x500")';
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;
  esOrganizador: boolean = false;
  idUser: string = '';
  usuario: Usuario = {} as Usuario;
  inscripto: boolean = false;
  estado: string = '';
  eloUsuario: number | null = 0;

  constructor(
    private route: ActivatedRoute,
    private torneoService: TorneoService,
    private router: Router,
    private _modalService: NgbModal,
    private datePipe: DatePipe,
    private inscripcionService: InscripcionService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('torneoId');
    this.torneoService.torneoId = this.id!;

    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });

    if (this.id !== null) {
      this.torneoService.getById(this.id).subscribe({
        next: (res) => {
          this.torneo = res;
          this.estado = res.estado;
          if (this.torneo.idOrganizador === this.idUser) {
            this.esOrganizador = true;
          } else {
            this.esOrganizador = false;
          }

          this.auth.getById(this.idUser).subscribe({
            next: (res) => {
              this.eloUsuario = res.elo;
            },
          });

          this.torneoService.getPortada(this.id).subscribe({
            next: (res) => {
              this.imgUrl = res;
            },
            error: (err) => {
              console.error('Error al obtener la foto de perfil');
            },
          });
        },
        error: () => {
          alert('Error al intentar cargar el torneo');
        },
      });

      this.inscripcionService.isInscripto(this.idUser, this.id).subscribe({
        next: (res) => {
          this.inscripto = res.inscripto;
        },
        error: (res) => {},
      });
    }
  }

  openBorrar() {
    const data = this.torneo;
    const injector = Injector.create({
      providers: [{ provide: 'DATA', useValue: data }],
    });
    this._modalService.open(NgbdModalConfirmAutofocus, { injector });
  }

  borrarInscripcion() {
    console.log(this.idUser);
    const data = this.idUser;
    const injector = Injector.create({
      providers: [{ provide: 'DATA', useValue: data }],
    });
    this._modalService.open(NgbModalInscripcion, { injector });
  }

  editar() {
    this.router.navigate(['/app/torneo/modificar', this.id]);
  }

  inscribirse() {
    if (this.checkElo(this.idUser)) {
      var inscripcion: Inscripcion = {} as Inscripcion;
      inscripcion.idParticipante = this.idUser;
      inscripcion.horaInscripcion = this.datePipe.transform(
        new Date(),
        'HH:mm:ss'
      )!;
      inscripcion.fecha = this.datePipe.transform(new Date(), 'yyyy/MM/dd')!;
      inscripcion.idTorneo = this.id!;

      this.inscripcionService.registerInscripcion(inscripcion).subscribe({
        next: () => {
          var notificacion = {
            usuarioId: this.torneo.idOrganizador,
            mensaje: `${this.torneo.nombre}: Nueva solicitud de inscripción`,
          } as Notificacion;
          this.notificacionService.register(notificacion).subscribe({
            next: (res) => {
              window.location.reload();
              this.toastr.success('Inscripción realizada con éxito');
            },
            error: (err) => {
              this.toastr.error(err.error.message, 'Error');
            },
          });
        },
        error: () => {
          this.toastr.error('Ocurrió un error inesperado');
        },
      });
    }
  }

  checkElo(idUser: string) {
    if (this.eloUsuario != 0 && this.eloUsuario != null) {
      if (
        this.eloUsuario >= this.torneo.eloMinimo &&
        this.eloUsuario <= this.torneo.eloMaximo
      ) {
        return true;
      } else {
        this.toastr.warning('Elo fuera de los límites del torneo');
        return false;
      }
    } else {
      this.toastr.warning('Elo no definido');
      return false;
    }
  }

  iniciar() {
    this.inscripcionService.getByTorneo(this.id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.length > 0) {
          if (res.some((inscripto) => inscripto.estado == 'aprobado')) {
            var torneo = { id: this.id } as Torneo;
            this.torneoService.empezarTorneo(torneo).subscribe({
              next: () => {
                window.location.reload();
              },
            });
          } else {
            this.toastr.warning(
              'El torneo debe tener al menos un participante'
            );
          }
        } else {
          this.toastr.warning('El torneo debe tener al menos un participante');
        }
      },
    });
  }

  terminar() {
    var torneo = { id: this.id } as Torneo;
    this.torneoService.terminarTorneo(torneo).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }
}
