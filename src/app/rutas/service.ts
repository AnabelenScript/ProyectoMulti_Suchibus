import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutaService {
  private apiRutas = 'http://localhost:3000/mapasRuta';

  constructor(private http: HttpClient) {}

  obtenerRutas(): Observable<any> {
    return this.http.get(`${this.apiRutas}`);
  }
  obtenerRutasById(id: String): Observable<any> {
    return this.http.get(`${this.apiRutas}/${id}`);
  }
}
