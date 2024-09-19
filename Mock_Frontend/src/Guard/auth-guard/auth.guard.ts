import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const url = state.url; // Get the current URL

  if (localStorage.getItem('userToken')) {
    // If authenticated and trying to access login or register, redirect to dashboard
    if (url === '/login' || url === '/register') {
      router.navigate(['/']);
      return false;
    }
    // Otherwise allow access to the protected page
    return true;
  } else {
    // If not authenticated and trying to access a protected page, redirect to login
    if (url !== '/login' && url !== '/register') {
      router.navigate(['/login']);
      return false;
    }
    // Allow access to login and register pages
    return true;
  }
};
