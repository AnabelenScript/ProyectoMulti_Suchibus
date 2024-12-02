import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrador, Chofer } from '../userModel';

@Injectable({
  providedIn: 'root'
})
export class ChoferService {
  private baseUrl = 'https://suchibusapi2.integrador.xyz';

  constructor(private http: HttpClient) {}

  registrarUsuario(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, formData);
  }

  obtenerChoferesPorTermminal(terminalId: number): Observable<Chofer[]> {
    return this.http.get<Chofer[]>(`${this.baseUrl}/choferes/${terminalId}`);
  }
  
  obtenerTodosUsuariosAdmin(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(`${this.baseUrl}/users`);
  }

  obtenerUsuarioPorIdAdmin(id: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.baseUrl}/users/${id}`);
  }
  obtenerUsuarioPorId(id: number): Observable<Chofer> {
    return this.http.get<Chofer>(`${this.baseUrl}/users/${id}`);
  }

  actualizarChofer(chofer: Chofer): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${chofer.id}`, chofer);
  }
  asignarUnidad(unidadId: number, choferId: number) {
    return this.http.post(this.baseUrl, { unidad_id: unidadId, chofer_id: choferId });
  }
}
