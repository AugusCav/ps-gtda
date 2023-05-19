import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Torneo } from '../models/torneo';
import { TipoTorneo } from '../models/tipo-torneo';
import { Ronda } from '../models/ronda';
import { Partida } from '../models/partida';

@Injectable({
  providedIn: 'root',
})
export class TorneoService {
  private baseUrl: string = 'https://localhost:7274/api/Torneo/';
  torneoId: string = '';
  partidas: Partida[] = [];

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

  updateTorneo(torneo: Torneo) {
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

  getPartidasJugador(idUsuario: string) {
    return this.http.get<Partida[]>(`${this.baseUrl}getPartidas/${idUsuario}`);
  }
}
