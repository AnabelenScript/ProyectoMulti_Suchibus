import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');

  if (token) {
    return true;
  }

  const router = new Router();
  router.navigate(['/']);
  return false;
};
