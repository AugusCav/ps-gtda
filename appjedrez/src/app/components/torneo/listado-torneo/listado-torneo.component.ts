import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoTorneo } from 'src/app/models/tipo-torneo';
import { Torneo } from 'src/app/models/torneo';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-listado-torneo',
  templateUrl: './listado-torneo.component.html',
  styleUrls: ['./listado-torneo.component.css'],
})
export class ListadoTorneoComponent implements OnInit {
  torneos: Torneo[] = [];
  tipos: TipoTorneo[] = [];

  constructor(private torneoService: TorneoService, private router: Router) {}

  ngOnInit(): void {
    this.torneoService.getAll().subscribe({
      next: (res) => {
        this.torneos = res;
        console.table(res);
      },
      error: () => {
        alert('Ocurrió un error al cargar los torneos');
      },
    });
  }

  goToTorneo(torneoId: string) {
    this.router.navigate(['/torneo/detalles', torneoId]);
  }
}
