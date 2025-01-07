import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const refreshTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes('refresh')) {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            switchMap((response: any) => {
              // Save the new access token
              localStorage.setItem('accessToken', response.token);

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
