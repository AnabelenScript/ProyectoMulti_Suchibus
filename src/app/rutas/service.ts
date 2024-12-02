import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruta } from './rutasModel';

@Injectable({
  providedIn: 'root'
})
export class RutaService {
    private apiRutas = 'http://localhost:3000/mapasRuta';

  constructor(private http: HttpClient) {}

  obtenerRutasById(id: string): Observable<any> {
    return this.http.get(`${this.apiRutas}/${id}`);
  }
}