import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './userModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiurl = 'https://suchibusapi2.integrador.xyz';

  constructor(private http: HttpClient) {}

  obtenerUsuarioActual(): Observable<User> {
    return this.http.get<User>(`${this.apiurl}/usuarios/me`);
  }

  obtenerUsuarioPoId(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiurl}/users/${id}`);
  }

  actualizarUsuarioBase(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiurl}/users_base/${id}`, userData);
  }
  
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiurl}/users/${id}`);
  }

}
