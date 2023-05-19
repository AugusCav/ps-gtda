import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Torneo } from 'src/app/models/torneo';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
})
export class ResumenComponent implements OnInit {
  torneos: Inscripcion[] = [];
  idUser: string = '';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartDatasets = [
    {
      data: [2, 8],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private inscripcionService: InscripcionService,
    private userStore: UserStoreService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getDatos();
    this.getTorneos();
  }

  getDatos() {
    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });
  }

  getTorneos() {
    this.inscripcionService.getInscripciones(this.idUser).subscribe({
      next: (res) => {
        this.torneos = res;
      },
      error: () => {
        console.log('Hubo un error en el get de torneos');
      },
    });
  }
}
