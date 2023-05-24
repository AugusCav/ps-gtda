import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import ValidateForm from 'src/app/helpers/validate-form.helper';
import { TipoTorneo } from 'src/app/models/tipo-torneo';
import { Torneo } from 'src/app/models/torneo';
import { AuthService } from 'src/app/services/auth.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-modificar-torneo',
  templateUrl: './modificar-torneo.component.html',
  styleUrls: ['./modificar-torneo.component.css'],
})
export class ModificarTorneoComponent {
  torneoForm!: FormGroup;
  torneo: Torneo = {} as Torneo;
  tipos: TipoTorneo[] = [];
  horaInicio: NgbTime = { hour: 12, minute: 0, second: 0 } as NgbTime;
  horaFinal: NgbTime = { hour: 12, minute: 0, second: 0 } as NgbTime;
  id: string | null = '';
  organizadorId: string = '';

  constructor(
    private fb: FormBuilder,
    private torneoService: TorneoService,
    private router: Router,
    private calendar: NgbCalendar,
    private route: ActivatedRoute,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('torneoId');

    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.organizadorId = val || idFromToken;
    });

    this.torneoForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      horaInicio: ['', Validators.required],
      descripcion: ['', Validators.required],
      localidad: ['', Validators.required],
      idTipoTorneo: [1, Validators.required],
      cantidadParticipantes: [0, Validators.required],
      idOrganizador: [this.organizadorId],
      eloMinimo: [0, Validators.required],
      eloMaximo: [0, Validators.required],
    });

    if (this.id !== null) {
      this.torneoService.getById(this.id).subscribe({
        next: (res) => {
          if (this.organizadorId !== res.idOrganizador) {
            this.router.navigate(['/app/torneo/listado']);
          }
          this.torneoForm.patchValue(res);
        },
        error: () => {
          alert('Error al intentar cargar el torneo');
        },
      });
    } else {
      alert('Ningún torneo seleccionado');
    }

    this.torneoService.getTiposTorneo().subscribe({
      next: (res) => {
        this.tipos = res;
      },
    });
  }

  actualizar() {
    if (this.torneoForm.valid) {
      if (
        this.torneoForm.get('horaInicio')?.touched ||
        this.torneoForm.get('horaInicio')?.dirty
      ) {
        const time = this.torneoForm.get('horaInicio')?.value;
        const formattedTime = time + ':00';
        this.torneoForm.controls['horaInicio'].setValue(formattedTime);
      }

      var torneo = this.torneoForm.value;

      this.torneoService.updateTorneo(torneo).subscribe({
        next: (res) => {
          alert(res.message);
          this.torneoForm.reset();
          this.router.navigate(['/app/torneo/detalles', this.id]);
        },
        error: (err) => {
          alert(err.message);
        },
      });
    } else {
      console.log('El form no es válido');

      //tirar error
      ValidateForm.validateAllFormFields(this.torneoForm);
      alert('Tu form es inválido');
    }
  }
}
