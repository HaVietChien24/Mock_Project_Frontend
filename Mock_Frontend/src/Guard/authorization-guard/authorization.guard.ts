import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../service/user-service/user.service';
import { UserFullInfoDTO } from '../../models/UserModels';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const currentUser: UserFullInfoDTO = userService.loadUserFromStorage();

  if (!currentUser.isAdmin) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
