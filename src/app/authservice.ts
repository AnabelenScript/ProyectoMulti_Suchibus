// auth.service.ts
import { Injectable } from '@angular/core';
import { TipoUsuario } from './users/administradores/agg-administradores/agg-administradores.component';
TipoUsuario
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = {
    role: TipoUsuario.Administrador, // Esto debería establecerse dinámicamente
  };

  constructor() {}

  getUserRole(): TipoUsuario {
    return this.currentUser.role;
  }

  isAdmin(): boolean {
    return this.currentUser.role === TipoUsuario.Administrador;
  }

  isChofer(): boolean {
    return this.currentUser.role === TipoUsuario.Chofer;
  }

  isPasajero(): boolean {
    return this.currentUser.role === TipoUsuario.Pasajero;
  }
}
