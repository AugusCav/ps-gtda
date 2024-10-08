import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Torneo } from '../models/torneo';
import { TipoTorneo } from '../models/tipo-torneo';
import { Ronda } from '../models/ronda';
import { Partida } from '../models/partida';
import { Analisis } from '../models/analisis';
import { Movimiento } from '../models/movimiento';
import { TorneoReportResponse } from '../models/responses/torneoReportResponse';
import { PartidaReportResponse } from '../models/responses/partidaReportResponse';
import { OrgReportResponse } from '../models/responses/orgReportResponse';

@Injectable({
  providedIn: 'root',
})
export class TorneoService {
  private baseUrl: string = 'https://localhost:7274/api/Torneo/';
  private chessUrl: string = 'https://localhost:7274/api/Chess/';
  torneoId: string = '';
  partidas: Partida[] = [];
  idPartida: string | null = '';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(`${this.baseUrl}get`);
  }

  getById(id: string) {
    return this.http.get<Torneo>(`${this.baseUrl}${id}`);
  }

  getTiposTorneo(): Observable<TipoTorneo[]> {
    return this.http.get<TipoTorneo[]>(`${this.baseUrl}getTipos`);
  }

  deleteTorneo(id: string): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}delete/${id}`);
  }

  registerTorneo(torneo: Torneo) {
    return this.http.post<any>(`${this.baseUrl}registrar`, torneo);
  }

  updateTorneo(torneo: any) {
    return this.http.put<any>(`${this.baseUrl}actualizar`, torneo);
  }

  getRondas(idTorneo: string) {
    return this.http.get<Ronda[]>(`${this.baseUrl}getRondas/${idTorneo}`);
  }

  registrarPartidas(ronda: Ronda, partidas: Partida[]) {
    return this.http.post(`${this.baseUrl}registerPartidas`, {
      rondaObj: ronda,
      partidas: partidas,
    });
  }

  getPartidasJugador(idUsuario: string | null) {
    return this.http.get<Partida[]>(`${this.baseUrl}getPartidas/${idUsuario}`);
  }

  getPartida(idPartida: string) {
    return this.http.get<Partida>(`${this.baseUrl}getPartida/${idPartida}`);
  }

  cargarPgn(idPartida: string | null, pgn: string, resultado: number) {
    return this.http.put(`${this.baseUrl}cargarPgn`, {
      pgn: pgn,
      idPartida: idPartida,
      resultado: resultado,
    });
  }

  getAnalisis(idPartida: string | null) {
    return this.http.get<Analisis>(`${this.baseUrl}getAnalisis/${idPartida}`);
  }

  registrarAnalisis(analisis: Analisis) {
    return this.http.post<number>(`${this.baseUrl}registrarAnalisis`, analisis);
  }

  registrarMovimientos(movimientos: Movimiento[], idAnalisis: number) {
    return this.http.patch(`${this.chessUrl}RegistrarMovimientos`, {
      idAnalisis: idAnalisis,
      movimientos: movimientos,
    });
  }

  empezarTorneo(torneo: Torneo) {
    return this.http.put(`${this.baseUrl}empezar`, torneo);
  }

  terminarTorneo(torneo: Torneo) {
    return this.http.put(`${this.baseUrl}terminar`, torneo);
  }

  reporteTorneoUser(idUser: string | null) {
    return this.http.get<TorneoReportResponse>(
      `${this.baseUrl}reporteTorneoUser/${idUser}`
    );
  }

  reportePartidasUser(idUser: string | null) {
    return this.http.get<PartidaReportResponse>(
      `${this.baseUrl}reportePartidasUser/${idUser}`
    );
  }

  getTorneoOrganizador(idUser: string | null) {
    return this.http.get<Torneo[]>(
      `${this.baseUrl}GetTorneoOrganizador/${idUser}`
    );
  }

  reporteTorneoOrg(idUser: string | null) {
    return this.http.get<OrgReportResponse>(
      `${this.baseUrl}reporteTorneoOrg/${idUser}`
    );
  }

  getPortada(id: string | null) {
    return this.http.get<string>(`${this.baseUrl}getPortada/${id}`);
  }
}
