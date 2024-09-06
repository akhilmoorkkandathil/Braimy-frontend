import { CanActivateFn,Router } from '@angular/router';
import { UserLoginService } from '../../services/userLogin/user-login.service';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap, } from 'rxjs';

export const studentGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserLoginService);
  const router = inject(Router);
  return of(authService.isStudentLoggedIn()).pipe(
    switchMap(isLoggedIn => {
      if (isLoggedIn) {
        return authService.isStudentBlocked().pipe(
          map(isBlocked => {
            
            if (isBlocked) {
              authService.studentLogout();
              router.navigate(['/login']);
              return false;
            }
            return true;
          }),
          catchError(() => {
            authService.studentLogout();
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


