import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { OrgReportResponse } from 'src/app/models/responses/orgReportResponse';
import { TorneoReportResponse } from 'src/app/models/responses/torneoReportResponse';
import { Torneo } from 'src/app/models/torneo';
import { AuthService } from 'src/app/services/auth.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-torneos-organizador',
  templateUrl: './torneos-organizador.component.html',
  styleUrls: ['./torneos-organizador.component.css'],
})
export class TorneosOrganizadorComponent {
  torneos: Torneo[] = [];
  idUser: string | null = '';
  torneoReport: OrgReportResponse = {} as OrgReportResponse;
  loaded: boolean = false;
  torneosPorMes: number[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Terminados', 'Disputandose', 'Eliminados'],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private inscripcionService: InscripcionService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private torneoService: TorneoService
  ) {}

  ngOnInit(): void {
    this.getDatos();
    this.getTorneos();

    this.torneoService.reporteTorneoOrg(this.idUser).subscribe({
      next: (res) => {
        this.torneoReport = res;
        this.pieChartData.datasets[0].data = [
          res.torneosTerminados,
          res.torneosDisputandose,
          res.torneosEliminados,
        ];

        this.loaded = true;
      },
    });
  }

  getDatos() {
    this.idUser = this.auth.id;
  }

  getTorneos() {
    this.torneoService.getTorneoOrganizador(this.idUser).subscribe({
      next: (res) => {
        this.torneos = res;
      },
      error: () => {
        console.log('Hubo un error en el get de torneos');
      },
    });
  }
}
