import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tarifa } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {
  private apiUrl = `${environment.apiUrl}/tarifas`;

  constructor(private http: HttpClient) { }

  crear(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.post<Tarifa>(this.apiUrl, tarifa);
  }

  obtenerActiva(): Observable<Tarifa> {
    return this.http.get<Tarifa>(`${this.apiUrl}/activa`);
  }

  listarTodas(): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(this.apiUrl);
  }

  activar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/activar`, null);
  }
}
