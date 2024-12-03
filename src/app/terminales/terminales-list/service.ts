import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Terminal {
  id: number;
  nombre: string;
  direccion: any;
  horarioApertura: string;
  horarioCierre: string;
  telefono: string;
  ruta_id : String;
}

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  private apiUrl = 'http://98.83.89.37/terminales'; 

  constructor(private http: HttpClient) {}

  obtenerTerminales(): Observable<Terminal[]> {
    return this.http.get<Terminal[]>(this.apiUrl).pipe(
      map(terminales => terminales.map(terminal => ({
        ...terminal,
        direccion: terminal.direccion ? JSON.parse(terminal.direccion) : null
      })))
    );
  }

  obtenerTerminalPorId(id: number): Observable<Terminal> {
    return this.http.get<Terminal>(`${this.apiUrl}/${id}`).pipe(
      map(terminal => ({
        ...terminal,
        direccion: terminal.direccion ? JSON.parse(terminal.direccion) : null
      }))
    );
  }


  actualizarTerminal(id: number, data: any): Observable<Terminal> {
    return this.http.put<Terminal>(`${this.apiUrl}/${id}`, data);
  }

  eliminarTerminal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
