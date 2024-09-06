import { CanActivateFn,Router } from '@angular/router';
import { UserLoginService } from '../../services/userLogin/user-login.service';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

export const coordinatorGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserLoginService);
  const router = inject(Router);

  return of(authService.isCoordinatorLoggedIn()).pipe(
    switchMap(isLoggedIn => {
      if (isLoggedIn) {
        return authService.isCoordinatorBlocked().pipe(
          map(isBlocked => {
            if (isBlocked) {
              authService.coordinatorLogout();
              router.navigate(['/login']);
              return false;
            }
            return true;
          }),
          catchError(() => {
            authService.coordinatorLogout();
            router.navigate(['/login']);
            return of(false);
          })
        );
      } else {
        router.navigate(['/login']);
        return of(false);
      }
    })
  );
};



