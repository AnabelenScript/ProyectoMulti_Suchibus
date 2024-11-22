import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  crearUsuarioBase(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users_base`, data);
  }

  loginUsuario(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
}