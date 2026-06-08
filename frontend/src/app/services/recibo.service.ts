import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Recibo, PaymentStatus } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReciboService {
  private apiUrl = `${environment.apiUrl}/recibos`;

  constructor(private http: HttpClient) { }

  obtenerPorId(id: number): Observable<Recibo> {
    return this.http.get<Recibo>(`${this.apiUrl}/${id}`);
  }

  listarPorPropiedad(propiedadId: number): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(`${this.apiUrl}/propiedad/${propiedadId}`);
  }

  listarPorPropietario(usuarioId: number): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(`${this.apiUrl}/propietario/${usuarioId}`);
  }

  listarPorEstado(estado: PaymentStatus): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(`${this.apiUrl}/estado/${estado}`);
  }
}
