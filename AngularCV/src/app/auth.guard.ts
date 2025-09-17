import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Login } from './services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const login = inject(Login);
  const router = inject(Router);
  if (!login.isLoggedIn()) {
    alert("You must be logged in to access this page.");
    router.navigate(['']);
    return false;
  }
  return true;
};
