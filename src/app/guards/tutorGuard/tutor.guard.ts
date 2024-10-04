import { CanActivateFn,Router } from '@angular/router';
import { UserLoginService } from '../../services/userLogin/user-login.service';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';


export const tutorGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserLoginService);
  const router = inject(Router);

  return of(authService.isTutorLoggedIn()).pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true; // Allow access if logged in
      } else {
        router.navigate(['/login']);
        return false; // Deny access if not logged in
      }
    }),
    catchError(() => {
      authService.tutorLogout();
      router.navigate(['/login']);
      return of(false); // Handle error by denying access
    })
  );
};


