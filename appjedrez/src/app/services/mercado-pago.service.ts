import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService {
  private baseUrl: string = 'https://localhost:7274/api/MercadoPago/';

  constructor(private http: HttpClient) {}

  getPreferencia() {
    return this.http.get(`${this.baseUrl}getPreferencia`);
  }
}
