import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parada } from './paradaModel';

@Injectable({
  providedIn: 'root'
})
export class PuntosParadaService {
  private readonly apiUrl = 'http://localhost:3000/paradas';

  constructor(private http: HttpClient) {}
  getParadaByIdRuta(id: string): Observable<Parada[]> {
    return this.http.get<Parada[]>(`${this.apiUrl}/ruta/${id}/paradas`);
  }

  getParadaById(id: string): Observable<Parada> {
    return this.http.get<Parada>(`${this.apiUrl}/${id}`);
  }
}