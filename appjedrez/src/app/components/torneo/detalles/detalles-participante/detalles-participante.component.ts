import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-detalles-participante',
  templateUrl: './detalles-participante.component.html',
  styleUrls: ['./detalles-participante.component.css'],
})
export class DetallesParticipanteComponent implements OnInit {
  idParticipante: string = '';
  participante: Usuario = {} as Usuario;

  constructor(
    private inscripcionService: InscripcionService,
    private router: Router,
    private torneoService: TorneoService
  ) {}

  ngOnInit(): void {
    this.idParticipante = this.inscripcionService.idParticipante;
    this.inscripcionService.getParticipante(this.idParticipante).subscribe({
      next: (res) => {
        this.participante = res;
      },
      error: () => {
        this.router.navigate([
          '/app/torneo/detalles',
          this.torneoService.torneoId,
          'participantes',
        ]);
      },
    });
  }
}
