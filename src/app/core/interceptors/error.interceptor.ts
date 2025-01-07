import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = error.error.message;
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            errorMessage = handleValidationError(error.error);
            break;
          case 401:
            authService.logout();
            router.navigate(['/auth/login']);
            errorMessage = 'Please log in to continue';
            break;
          case 403:
            errorMessage = "You don't have permission to perform this action";
            break;
          case 404:
            errorMessage = 'Resource not found';
            break;
          case 422:
            errorMessage = handleValidationError(error.error);
            break;
          case 500:
            errorMessage = 'Server error. Please try again later';
            break;
          default:
            errorMessage = `Error: ${error.message}`;
        }
      }

      errorService.showError(errorMessage);
      return throwError(() => error);
    })
  );
};

function handleValidationError(error: any): string {
  if (error.details) {
    const errors = Object.entries(error.details)
      .map(
        ([field, messages]: [string, any]) =>
          `${field}: ${
            Array.isArray(messages) ? messages.join(', ') : messages
          }`
      )
      .join('\n');
    return `Validation Error:\n${errors}`;
  }
  return error.message || 'Validation failed';
}
