import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: string | null = null;
  private adminIdKey = 'adminId'; // Clave para almacenar el id del admin

  setRole(role: string) {
    this.userRole = role;
    localStorage.setItem('userRole', role);
  }

  getRole(): string | null {
    return this.userRole || localStorage.getItem('userRole');
  }

  clearRole() {
    this.userRole = null;
    localStorage.removeItem('userRole');
    localStorage.removeItem(this.adminIdKey); // Limpiar también el id del admin
  }

  setAdminId(adminId: number) {
    localStorage.setItem(this.adminIdKey, adminId.toString());
  }

  getAdminId(): number | null {
    const id = localStorage.getItem(this.adminIdKey);
    return id ? parseInt(id, 10) : null;
  }
}
