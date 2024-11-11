import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Terminal {
  id: number;
  nombre: string;
  direccion: any;
  horarioApertura: string;
  horarioCierre: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private apiUrl = 'http://suchibusapi.integrador.xyz/terminales'; 

  constructor(private http: HttpClient) {}

  obtenerTerminales(): Observable<Terminal[]> {
    return this.http.get<Terminal[]>(this.apiUrl);
  }

  obtenerTerminalPorId(id: number): Observable<Terminal> {
    return this.http.get<Terminal>(`${this.apiUrl}/${id}`);
  }

  actualizarTerminal(id: number, data: any): Observable<Terminal> {
    return this.http.put<Terminal>(`${this.apiUrl}/${id}`, data);
  }

  eliminarTerminal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
