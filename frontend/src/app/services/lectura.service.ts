import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Lectura } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {
  private apiUrl = `${environment.apiUrl}/lecturas`;

  constructor(private http: HttpClient) { }

  registrar(lectura: Partial<Lectura>): Observable<Lectura> {
    return this.http.post<Lectura>(this.apiUrl, lectura);
  }

  listarPorPropiedad(propiedadId: number): Observable<Lectura[]> {
    return this.http.get<Lectura[]>(`${this.apiUrl}/propiedad/${propiedadId}`);
  }

  listarPorPeriodo(mes: number, anio: number): Observable<Lectura[]> {
    const params = new HttpParams()
      .set('mes', mes.toString())
      .set('anio', anio.toString());
    return this.http.get<Lectura[]>(`${this.apiUrl}/periodo`, { params });
  }
}
