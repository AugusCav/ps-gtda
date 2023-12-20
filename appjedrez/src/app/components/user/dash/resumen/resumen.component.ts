import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Inscripcion } from 'src/app/models/inscripcion';
import { TorneoReportResponse } from 'src/app/models/responses/torneoReportResponse';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
})
export class ResumenComponent implements OnInit {
  torneos: Inscripcion[] = [];
  idUser: string | null = '';
  torneoReport: TorneoReportResponse = {} as TorneoReportResponse;
  loaded: boolean = false;
  torneosPorMes: number[] = [];
  page: number = 1;
  pageSize: number = 5;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Line
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Ocubre',
      'Noviembre',
      'Diciembre',
    ],
    datasets: [
      {
        data: [0, 25, 12, 35, 20],
        label: 'Torneos jugados',
        fill: true,
        tension: 0.4,
      },
    ],
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  constructor(
    private inscripcionService: InscripcionService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private torneoService: TorneoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDatos();
    this.getTorneos();

    this.torneoService.reporteTorneoUser(this.idUser).subscribe({
      next: (res) => {
        this.torneoReport = res;
        this.lineChartData.datasets[0].data =
          this.torneoReport.torneosParticipadosMes.map((item) => item);

        this.loaded = true;
      },
    });
  }

  getDatos() {
    this.idUser = this.auth.id;
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

  changeList(page: number) {
    this.page = page;
  }

  irPerfil(idOrganizador: any) {
    window.location.href = `/user/perfil/${idOrganizador}`;
  }
}
