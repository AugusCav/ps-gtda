import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import ValidateForm from 'src/app/helpers/validate-form.helper';
import { TipoTorneo } from 'src/app/models/tipo-torneo';
import { AuthService } from 'src/app/services/auth.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-registro-torneo',
  templateUrl: './registro-torneo.component.html',
  styleUrls: ['./registro-torneo.component.css'],
})
export class RegistroTorneoComponent implements OnInit {
  torneoForm!: FormGroup;
  tipos: TipoTorneo[] = [];
  horaInicio: NgbTime = { hour: 12, minute: 0, second: 0 } as NgbTime;
  horaFinal: NgbTime = { hour: 12, minute: 0, second: 0 } as NgbTime;
  organizadorId: string = '';

  constructor(
    private fb: FormBuilder,
    private torneoService: TorneoService,
    private router: Router,
    private calendar: NgbCalendar,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.organizadorId = val || idFromToken;
    });


    this.torneoForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaInicio: [
        this.formatearFecha(this.calendar.getToday()),
        Validators.required,
      ],
      fechaFinal: [
        this.formatearFecha(this.calendar.getToday()),
        Validators.required,
      ],
      horaInicio: [this.formatearHora(this.horaInicio), Validators.required],
      horaFinal: [this.formatearHora(this.horaFinal), Validators.required],
      descripcion: ['', Validators.required],
      localidad: ['', Validators.required],
      idTipoTorneo: [1, Validators.required],
      cantidadParticipantes: [0, Validators.required],
      idOrganizador: [this.organizadorId],
      eloMinimo: [0, Validators.required],
      eloMaximo: [0, Validators.required],
    });

    this.torneoService.getTiposTorneo().subscribe({
      next: (res) => {
        this.tipos = res;
      },
    });
  }

  registrar() {
    console.log(this.organizadorId);
    if (this.torneoForm.valid) {
      // logica para el registro
      this.torneoForm.controls['horaInicio'].setValue(
        this.formatearHora(this.horaInicio)
      );
      this.torneoForm.controls['horaFinal'].setValue(
        this.formatearHora(this.horaFinal)
      );
      var torneo = this.torneoForm.value;
      torneo.fechaInicio = this.formatearFecha(torneo.fechaInicio);
      torneo.fechaFinal = this.formatearFecha(torneo.fechaFinal);

      this.torneoService.registerTorneo(torneo).subscribe({
        next: (res) => {
          alert(res.message);
          this.torneoForm.reset();
          this.router.navigate(['/app/torneo/listado']);
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
}
