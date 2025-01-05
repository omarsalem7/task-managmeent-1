import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = this.handleValidationError(error.error);
              break;
            case 401:
              this.router.navigate(['/auth/login']);
              errorMessage = 'Please log in to continue';
              break;
            case 403:
              errorMessage = "You don't have permission to perform this action";
              break;
            case 404:
              errorMessage = 'Resource not found';
              break;
            case 422:
              errorMessage = this.handleValidationError(error.error);
              break;
            case 500:
              errorMessage = 'Server error. Please try again later';
              break;
            default:
              errorMessage = `Error: ${error.message}`;
          }
        }

        this.errorService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }

  private handleValidationError(error: any): string {
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
}
