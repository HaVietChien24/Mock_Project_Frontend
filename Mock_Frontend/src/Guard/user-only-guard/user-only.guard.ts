import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserFullInfoDTO } from '../../models/UserModels';
import { UserService } from '../../service/user-service/user.service';

export const userOnlyGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const currentUser: UserFullInfoDTO = userService.loadUserFromStorage();

  if (currentUser.isAdmin === 'True') {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
