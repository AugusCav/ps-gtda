import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inscripcion } from '../models/inscripcion';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { InscripcionOrganizador } from '../models/inscripcion-organizador';

@Injectable({
  providedIn: 'root',
})
export class InscripcionService {
  private baseUrl: string = 'https://localhost:7274/api/Inscripcion/';
  idParticipante: string = '';

  constructor(private http: HttpClient) {}

  getAll(idTorneo: string): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.baseUrl}get/${idTorneo}`);
  }

  getAllNoParticipantes(idTorneo: string): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(
      `${this.baseUrl}getNoParticipantes/${idTorneo}`
    );
  }

  // getById(id: string) {
  //   return this.http.get<Torneo>(`${this.baseUrl}${id}`);
  // }

  // getTiposTorneo(): Observable<TipoTorneo[]> {
  //   return this.http.get<TipoTorneo[]>(`${this.baseUrl}getTipos`);
  // }

  getParticipante(idParticipante: string) {
    return this.http.get<Usuario>(
      `${this.baseUrl}getParticipante/${idParticipante}`
    );
  }

  deleteInscripcion(id: string): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}delete/${id}`);
  }

  deleteInscripto(id: string) {
    return this.http.delete<number>(`${this.baseUrl}deleteInscripto/${id}`);
  }

  registerInscripcion(inscripcion: Inscripcion) {
    return this.http.post<any>(`${this.baseUrl}registrar`, inscripcion);
  }

  // updateTorneo(torneo: Torneo) {
  //   return this.http.put<any>(`${this.baseUrl}actualizar`, torneo);
  // }

  isInscripto(idParticipante: string, idTorneo: string) {
    const params = new HttpParams()
      .set('idParticipante', idParticipante)
      .set('idTorneo', idTorneo);
    return this.http.get<any>(`${this.baseUrl}inscripto`, { params });
  }

  aprobar(inscripcion: any) {
    return this.http.put<any>(`${this.baseUrl}aprobar`, inscripcion);
  }

  getInscripciones(idUser: string | null) {
    return this.http.get<any>(`${this.baseUrl}getInscripciones/${idUser}`);
  }

  inscribirOrg(inscripcion: InscripcionOrganizador) {
    return this.http.post(`${this.baseUrl}inscribirOrg`, inscripcion);
  }

  aprobarInscripcionOrg(inscripcion: InscripcionOrganizador) {
    return this.http.put(`${this.baseUrl}aprobarInscripcionOrg`, inscripcion);
  }

  rechazarInscripcionOrg(inscripcion: InscripcionOrganizador) {
    return this.http.put(`${this.baseUrl}rechazarInscripcionOrg`, inscripcion);
  }

  getInscripcionesOrg() {
    return this.http.get<any>(`${this.baseUrl}getInscripcionesOrg`);
  }

  aprobarOrg(usuario: Usuario) {
    return this.http.put(`${this.baseUrl}aprobarOrg`, usuario);
  }

  getByTorneo(idTorneo: string | null) {
    return this.http.get<Inscripcion[]>(`${this.baseUrl}get/${idTorneo}`);
  }

  getInscripcion(idUser: string) {
    return this.http.get<InscripcionOrganizador>(
      `${this.baseUrl}getInscripcion/${idUser}`
    );
  }

  getInscripto(idUser: string, idTorneo: string | null) {
    return this.http.get<Inscripcion>(
      `${this.baseUrl}getInscripto/${idUser}/${idTorneo}`
    );
  }

  sendInscripcionEmail(request: any) {
    return this.http.post<any>(
      `${this.baseUrl}send-inscripcion-email`,
      request
    );
  }
}
