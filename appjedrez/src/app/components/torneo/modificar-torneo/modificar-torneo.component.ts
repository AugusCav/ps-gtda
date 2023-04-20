import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import ValidateForm from 'src/app/helpers/validate-form.helper';
import { TipoTorneo } from 'src/app/models/tipo-torneo';
import { Torneo } from 'src/app/models/torneo';
import { TorneoService } from 'src/app/services/torneo.service';

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

  constructor(
    private fb: FormBuilder,
    private torneoService: TorneoService,
    private router: Router,
    private calendar: NgbCalendar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('torneoId');

    this.torneoForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFinal: ['', Validators.required],
      descripcion: ['', Validators.required],
      localidad: ['', Validators.required],
      idTipoTorneo: [1, Validators.required],
      cantidadParticipantes: [0, Validators.required],
      idOrganizador: [''],
      eloMinimo: [0, Validators.required],
      eloMaximo: [0, Validators.required],
    });

    if (this.id !== null) {
      this.torneoService.getById(this.id).subscribe({
        next: (res) => {
          this.torneoForm.patchValue(res);
          this.torneoForm.controls['fechaInicio'].setValue(
            this.formatearStringFecha(res.fechaInicio)
          );
          this.torneoForm.controls['fechaFinal'].setValue(
            this.formatearStringFecha(res.fechaFinal)
          );
          this.horaInicio = this.formatearStringHora(res.horaInicio);
          this.horaFinal = this.formatearStringHora(res.horaFinal);
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
    console.table(this.torneoForm.value);
    this.torneoForm.controls['horaInicio'].setValue(
      this.formatearHora(this.horaInicio)
    );
    this.torneoForm.controls['horaFinal'].setValue(
      this.formatearHora(this.horaFinal)
    );
    if (this.torneoForm.valid) {
      // logica para el registro
      var torneo = this.torneoForm.value;
      torneo.fechaInicio = this.formatearFecha(torneo.fechaInicio);
      torneo.fechaFinal = this.formatearFecha(torneo.fechaFinal);

      this.torneoService.updateTorneo(torneo).subscribe({
        next: (res) => {
          alert(res.message);
          this.torneoForm.reset();
          this.router.navigate(['torneo/detalles', this.id]);
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

  formatearFecha(model: NgbDate): string {
    const day = model.day.toString().padStart(2, '0');
    const month = model.month.toString().padStart(2, '0');
    const year = model.year;

    return `${year}-${month}-${day}`;
  }

  formatearHora(model: NgbTime): string {
    const hours = model.hour.toString().padStart(2, '0');
    const minutes = model.minute.toString().padStart(2, '0');
    const seconds = model.second.toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  formatearStringFecha(fecha: string) {
    const PARTES = fecha.split('-').map((parte) => parseInt(parte));
    return { year: PARTES[0], month: PARTES[1], day: PARTES[2] };
  }

  formatearStringHora(hora: string): NgbTime {
    const PARTES = hora.split(':').map((parte) => parseInt(parte));
    return { hour: PARTES[0], minute: PARTES[1], second: PARTES[2] } as NgbTime;
  }
}
