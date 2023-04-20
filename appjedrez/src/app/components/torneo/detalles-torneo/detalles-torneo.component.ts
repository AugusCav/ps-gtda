import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Torneo } from 'src/app/models/torneo';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { TorneoService } from 'src/app/services/torneo.service';

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

@Component({
  selector: 'app-detalles-torneo',
  templateUrl: './detalles-torneo.component.html',
  styleUrls: ['./detalles-torneo.component.css'],
  providers: [DatePipe],
})
export class DetallesTorneoComponent implements OnInit {
  torneo: Torneo = {} as Torneo;
  id: string | null = '';
  imgUrl: string = 'https://via.placeholder.com/1450x500';
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;
  inscripciones: Inscripcion[] = [];

  constructor(
    private route: ActivatedRoute,
    private torneoService: TorneoService,
    private router: Router,
    private _modalService: NgbModal,
    private datePipe: DatePipe,
    private inscripcionService: InscripcionService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('torneoId');

    if (this.id !== null) {
      this.torneoService.getById(this.id).subscribe({
        next: (res) => {
          this.torneo = res;
          console.table(this.torneo);
        },
        error: () => {
          alert('Error al intentar cargar el torneo');
        },
      });

      this.inscripcionService.getAll().subscribe({
        next: (res) => {
          this.inscripciones = res;
        },
        error: () => {
          alert('Error al intentar cargar los inscriptos');
        },
      });
    } else {
      alert('Ningún torneo seleccionado');
    }
  }

  openBorrar() {
    const data = this.torneo;
    const injector = Injector.create({
      providers: [{ provide: 'DATA', useValue: data }],
    });
    this._modalService.open(NgbdModalConfirmAutofocus, { injector });
  }

  borrar() {
    this.torneoService.deleteTorneo(this.torneo.id).subscribe({
      next: () => {
        alert('Torneo eliminado con éxito');
        this.router.navigate(['torneo/listado']);
      },
      error: () => {
        console.log('error');
      },
    });
  }

  editar() {
    this.router.navigate(['/torneo/modificar', this.id]);
  }

  inscribirse() {
    var inscripcion: Inscripcion = {} as Inscripcion;
    inscripcion.idParticipante = '35C21397-A33D-4FE5-85D5-DEBF641F596B';
    inscripcion.horaInscripcion = this.datePipe.transform(
      new Date(),
      'HH:mm:ss'
    )!;
    inscripcion.idTorneo = this.id!;
    this.inscripcionService.registerInscripcion(inscripcion).subscribe({
      next: () => {
        alert('Inscripción realizada con éxito');
      },
      error: () => {
        alert('Ocurrió un error inesperado');
      },
    });
  }

  eliminar(id: string) {
    this.inscripcionService.deleteTorneo(id).subscribe({
      next: () => {
        alert('Inscripción eliminada con éxito');
        this.inscripciones = this.inscripciones.filter((i) => i.id !== id);
      },
    });
  }
}
