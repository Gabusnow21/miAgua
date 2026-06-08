import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pago } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = `${environment.apiUrl}/pagos`;

  constructor(private http: HttpClient) { }

  registrar(pago: Partial<Pago>): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, pago);
  }

  verificar(id: number, aprobado: boolean): Observable<void> {
    const params = new HttpParams().set('aprobado', aprobado.toString());
    return this.http.patch<void>(`${this.apiUrl}/${id}/verificar`, null, { params });
  }

  listarPorRecibo(reciboId: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/recibo/${reciboId}`);
  }
}
