import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inscripcion } from '../models/inscripcion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  private baseUrl: string = 'https://localhost:7274/api/Inscripcion/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.baseUrl}get`);
  }

  // getById(id: string) {
  //   return this.http.get<Torneo>(`${this.baseUrl}${id}`);
  // }

  // getTiposTorneo(): Observable<TipoTorneo[]> {
  //   return this.http.get<TipoTorneo[]>(`${this.baseUrl}getTipos`);
  // }

  deleteTorneo(id: string): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}delete/${id}`);
  }

  registerInscripcion(inscripcion: Inscripcion) {
    return this.http.post<any>(`${this.baseUrl}registrar`, inscripcion);
  }

  // updateTorneo(torneo: Torneo) {
  //   return this.http.put<any>(`${this.baseUrl}actualizar`, torneo);
  // }
}
