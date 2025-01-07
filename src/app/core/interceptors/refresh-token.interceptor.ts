import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const refreshTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      alert('refreshToken interceptor');
      if (error.status === 401 && !req.url.includes('refresh')) {
        let currentUser = localStorage.getItem('currentUser');
        const refreshToken = currentUser
          ? JSON.parse(currentUser)['refreshToken']
          : null;

        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            switchMap((response: any) => {
              // Save the new access token
              let tempUser = currentUser ? JSON.parse(currentUser) : null;
              tempUser = { ...tempUser, token: response.token };
              localStorage.setItem('currentUser', tempUser);

              // Retry the original request with the new token
              const clonedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`,
                },
              });

              return next(clonedReq);
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};
