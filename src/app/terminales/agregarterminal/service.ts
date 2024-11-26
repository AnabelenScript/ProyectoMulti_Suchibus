import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerminalService2 {
  private apiUrl = 'http://127.0.0.1:5000/terminales'; 
  private apiRutas = 'http://localhost:3000/mapasRuta';

  constructor(private http: HttpClient) {}

  agregarTerminal(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers });
  }

  private apiUrl2 = 'http://127.0.0.1:5000/colonias';

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
