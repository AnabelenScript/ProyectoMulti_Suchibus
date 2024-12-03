import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TerminalServiceagg {
  private apiUrl = 'http://98.83.89.37/terminales';
  private apiUrl2 = 'http://98.83.89.37/colonias';
  private apiRutas = 'https://suchibusapi.integrador.xyz/mapasRuta';

  constructor(private http: HttpClient) {}

  agregarTerminal(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers });
  }

  obtenerColoniasPorCp(cp: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}?cp=${cp}`);
  }

  obtenerRutas(): Observable<any> {
    return this.http.get(`${this.apiRutas}`);
  }

  obtenerRutasById(id: string): Observable<any> {
    return this.http.get(`${this.apiRutas}/${id}`);
  }
}
