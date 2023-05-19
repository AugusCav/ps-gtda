import { Component, OnInit } from '@angular/core';
import { Partida } from 'src/app/models/partida';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-listado-partidas',
  templateUrl: './listado-partidas.component.html',
  styleUrls: ['./listado-partidas.component.css'],
})
export class ListadoPartidasComponent implements OnInit {
  partidas: Partida[] = [];

  constructor(private torneoService: TorneoService) {}

  ngOnInit(): void {
    this.partidas = this.torneoService.partidas;
  }
}
