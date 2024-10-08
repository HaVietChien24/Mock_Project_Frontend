import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../service/user-service/user.service';
import { UserFullInfoDTO } from '../../models/UserModels';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const url = state.url; // Get the current URL

  const currentUser: any =
    typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;

  if (currentUser !== null) {
    // If authenticated and trying to access login or register, redirect to dashboard
    if (url === '/login' || url === '/register') {
      router.navigate(['/']);

      return false;
    }
    // Otherwise allow access to the protected page

    return true;
  } else {
    if (typeof window !== 'undefined') {
      // If not authenticated and trying to access a protected page, redirect to login
      if (url !== '/login' && url !== '/register') {
        router.navigate(['/login']);

        return false;
      }
      // Allow access to login and register pages
      return true;
    }

    return false;
  }
};
