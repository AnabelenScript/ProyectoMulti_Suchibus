import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parada } from './paradaModel';

@Injectable({
  providedIn: 'root'
})
export class PuntosParadaService {
  private readonly apiUrl = 'http://localhost:3000/paradas'; // Cambia esto según tu configuración de backend

  constructor(private http: HttpClient) {}

  getPuntosParada(): Observable<Parada[]> {
    return this.http.get<Parada[]>(this.apiUrl);
  }

  createParada(data: { location: string; zoom: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  getParadaById(id: string): Observable<Parada> {
    return this.http.get<Parada>(`${this.apiUrl}/${id}`);
  }

  updateParada(id: string, data: { location: string; zoom: number }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar un punto de parada por ID
  deleteParada(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
 }
}