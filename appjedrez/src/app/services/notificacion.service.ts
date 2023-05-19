import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notificacion } from '../models/notificacion';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private baseUrl: string = 'https://localhost:7274/api/Notificacion/';
  public notificaciones: Notificacion[] = [];
  public cantidadNotif: number = 0;

  constructor(private http: HttpClient) {}

  getAll(idUser: string) {
    return this.http.get<Notificacion[]>(`${this.baseUrl}getAll/${idUser}`);
  }

  register(notificacion: Notificacion) {
    return this.http.post<Notificacion[]>(
      `${this.baseUrl}registrar`,
      notificacion
    );
  }

  actualizar(notificacion: Notificacion) {
    return this.http.put(`${this.baseUrl}actualizar`, notificacion);
  }
}
