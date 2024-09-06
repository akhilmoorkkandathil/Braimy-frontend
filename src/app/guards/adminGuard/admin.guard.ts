import { CanActivateFn,Router } from '@angular/router';
import { UserLoginService } from '../../services/userLogin/user-login.service';
import { inject } from '@angular/core';


export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserLoginService);
  const router = inject(Router);
  if (authService.isAdminLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
