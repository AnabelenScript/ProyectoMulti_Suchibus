import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: string | null = null;

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
  }
}
