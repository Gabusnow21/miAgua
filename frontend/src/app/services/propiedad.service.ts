import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Propiedad } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  private apiUrl = `${environment.apiUrl}/propiedades`;

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.apiUrl}/${id}`);
  }

  crear(propiedad: Propiedad): Observable<Propiedad> {
    return this.http.post<Propiedad>(this.apiUrl, propiedad);
  }

  actualizar(id: number, propiedad: Propiedad): Observable<Propiedad> {
    return this.http.put<Propiedad>(`${this.apiUrl}/${id}`, propiedad);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listarPorPropietario(usuarioId: number): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(`${this.apiUrl}/propietario/${usuarioId}`);
  }
}
