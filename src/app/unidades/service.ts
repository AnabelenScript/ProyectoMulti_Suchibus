import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unidad } from './unidadModel';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private apiUrl = 'http://127.0.0.1:5000/unidades';

  constructor(private http: HttpClient) {}

  obtenerUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.apiUrl}`);
  }

  obtenerUnidadesPorTerminal(terminalId: number): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.apiUrl}/terminal/${terminalId}`);
  }

  obtenerUnidad(id: number): Observable<Unidad> {
    return this.http.get<Unidad>(`${this.apiUrl}/${id}`);
  }

  crearUnidad(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  actualizarUnidad(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarUnidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
