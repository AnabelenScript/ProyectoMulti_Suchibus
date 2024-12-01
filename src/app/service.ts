import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: string | null = null;
  private adminIdKey = 'adminId'; 

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
    localStorage.removeItem(this.adminIdKey); 
  }

  setAdminId(adminId: number) {
    localStorage.setItem(this.adminIdKey, adminId.toString());
  }

  getAdminId(): number | null {
    const id = localStorage.getItem(this.adminIdKey);
    console.log('Admin ID desde localStorage:', id); // Verifica que el adminId esté bien almacenado
    return id ? parseInt(id, 10) : null;
  }
  
}
