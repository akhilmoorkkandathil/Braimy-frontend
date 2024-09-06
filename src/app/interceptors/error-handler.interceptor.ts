import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpStatusCode } from '../interfaces/statusCode';
import { ToastService } from '../services/toastService/toast.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toast: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error); // Re-throw the error for further handling if needed
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    
    switch (error.status) {
      case HttpStatusCode.Unauthorized:
        this.router.navigate(['/login']); // Redirect to login page
        break;
      case HttpStatusCode.Forbidden:
        this.router.navigate(['/error'], { 
          queryParams: { statusCode: error.status, message: 'Forbidden: The server refused to respond to the request' }
        });
        break;
      case HttpStatusCode.NotFound:
        this.router.navigate(['/login']);
        break;
      case HttpStatusCode.InternalServerError:
        this.router.navigate(['/error'], { 
          queryParams: { statusCode: error.status, message: 'Internal Server Error: The server encountered an unexpected condition' }
        });
        break;
      case HttpStatusCode.ServiceUnavailable:
       this.router.navigate(['/error'], { 
            queryParams: { statusCode: error.status, message: 'No internet connection. Please check your network and try again.' }
          });
        break;
      default:
        this.router.navigate(['/error'], { 
          queryParams: { statusCode: error.status, message: 'Oops! Something went wrong...' }
        });
    }
  }
}



