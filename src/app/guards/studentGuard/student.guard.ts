import { CanActivateFn,Router } from '@angular/router';
import { UserLoginService } from '../../services/userLogin/user-login.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const studentGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserLoginService);
  const router = inject(Router);
  return of(authService.isStudentLoggedIn()).pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true; // Allow access if logged in
      } else {
        router.navigate(['/login']);
        return false; // Deny access if not logged in
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false); // Handle error by denying access
    })
  );
};


