import { Component, Inject, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Inscripcion } from 'src/app/models/inscripcion';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
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
    private toastr: ToastrService
  ) {}

  borrar() {
    this.inscripcionService.deleteInscripcion(this.data.id).subscribe({
      next: () => {
        this.modal.close('Ok click');
        window.location.reload();
        this.toastr.success('Inscripción eliminada con éxito');
      },
      error: () => {
        this.modal.close('Ok click');
      },
    });
  }
}

// COMPONENTE PRINCIPAL
@Component({
  selector: 'app-listado-participantes',
  templateUrl: './listado-participantes.component.html',
  styleUrls: ['./listado-participantes.component.css'],
})
export class ListadoParticipantesComponent implements OnInit {
  inscripciones: Inscripcion[] = [];
  esOrganizador: boolean = false;
  id: any = '';
  idUser: any = '';

  constructor(
    private inscripcionService: InscripcionService,
    private torneoService: TorneoService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private router: Router,
    private _modalService: NgbModal
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

      this.inscripcionService.getAll(this.id).subscribe({
        next: (res) => {
          this.inscripciones = res;
        },
        error: () => {
          alert('Error al intentar cargar los inscriptos');
        },
      });
    }
  }

  abrirParticipante(idParticipante: string) {
    this.router.navigate(['/user/perfil', idParticipante]);
  }

  openBorrar(inscripcion: any) {
    const data = inscripcion;
    const injector = Injector.create({
      providers: [{ provide: 'DATA', useValue: data }],
    });
    this._modalService.open(NgbModalInscripcion, { injector });
  }
}
