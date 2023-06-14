import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { Partida } from 'src/app/models/partida';
import { PartidaReportResponse } from 'src/app/models/responses/partidaReportResponse';
import { AuthService } from 'src/app/services/auth.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css'],
})
export class PartidasComponent implements OnInit {
  partidas: Partida[] = [];
  idUser: string = '';
  loaded: boolean = false;
  partidaReport: PartidaReportResponse = {} as PartidaReportResponse;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  public pieChartData1: ChartConfiguration<'pie'>['data'] = {
    labels: ['Jugadas', 'Ganadas', 'Perdidas', 'Empatadas'],
    datasets: [
      {
        data: [],
      },
    ],
  };

  public pieChartData2: ChartConfiguration<'pie'>['data'] = {
    labels: ['%Ganadas', '%Perdidas', '%Empatadas'],
    datasets: [
      {
        data: [],
      },
    ],
  };

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
        data: [],
        label: 'Jugadas',
        fill: false,
      },
      {
        data: [],
        label: 'Ganadas',
        fill: false,
      },
      {
        data: [],
        label: 'Perdidas',
        fill: false,
      },
      {
        data: [],
        label: 'Empatadas',
        fill: false,
      },
    ],
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  constructor(
    private torneoService: TorneoService,
    private userStore: UserStoreService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDatos();

    if (this.idUser !== '') {
      this.torneoService.getPartidasJugador(this.idUser).subscribe({
        next: (res) => {
          this.partidas = res;
          this.torneoService.reportePartidasUser(this.idUser).subscribe({
            next: (res) => {
              this.partidaReport = res;

              const pieChartData1 = [
                this.partidaReport.jugadas,
                this.partidaReport.ganadas,
                this.partidaReport.perdidas,
                this.partidaReport.empatadas,
              ];

              this.pieChartData1.datasets[0].data = pieChartData1;

              const pieChartData2 = [
                this.partidaReport.porcentajeGanadas,
                this.partidaReport.porcentajePerdidas,
                this.partidaReport.porcentajeEmpatadas,
              ];

              this.pieChartData2.datasets[0].data = pieChartData2;

              this.lineChartData.datasets[0].data =
                this.partidaReport.jugadasPorMes.map((item) => item);
              this.lineChartData.datasets[1].data =
                this.partidaReport.ganadasPorMes.map((item) => item);
              this.lineChartData.datasets[2].data =
                this.partidaReport.perdidasPorMes.map((item) => item);
              this.lineChartData.datasets[3].data =
                this.partidaReport.empatadasPorMes.map((item) => item);

              this.loaded = true;
            },
            error: (err) => {
              this.loaded = true;
            },
          });
        },
        error: (err) => {
          this.toastr.error('Error al obtener las partidas', 'Error');
          this.loaded = true;
        },
      });
    }
  }

  getDatos() {
    this.userStore.getIdFromStore().subscribe((val) => {
      let idFromToken = this.auth.getIdFromToken();
      this.idUser = val || idFromToken;
    });
  }

  irGame(partidaId: string) {
    this.router.navigate(['/app/game', partidaId]);
  }
}
