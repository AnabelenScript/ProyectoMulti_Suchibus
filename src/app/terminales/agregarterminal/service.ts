import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  private apiUrl = 'http://127.0.0.1:5000/terminales';
  private apiUrl2 = 'http://127.0.0.1:5000/colonias';
  private adminApiUrl = 'http://127.0.0.1:5000/admin';

  constructor(private http: HttpClient) {}

  agregarTerminal(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, data, { headers });
  }

  obtenerColoniasPorCp(cp: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}?cp=${cp}`);
  }

  asignarTerminalAdmin(adminId: number, terminalId: number): Observable<any> {
    return this.http.put(`${this.adminApiUrl}/${adminId}/assign-terminal`, {
      terminal_id: terminalId,
    });
  }
}
