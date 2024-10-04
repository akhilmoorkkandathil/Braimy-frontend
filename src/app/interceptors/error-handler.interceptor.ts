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
    console.log("Error in the error handle middleware", error);
    
    let errorMessage = 'An unexpected error occurred.';
  
    // Check if error message is available
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
  
    switch (error.status) {
      case HttpStatusCode.Unauthorized:
        console.log("Hitting the Unauthorized interceptor");
        this.router.navigate(['/login']); // Redirect to login page
        this.toast.showError(errorMessage || "Unauthorized access. Please log in.", 'Error');
        break;
        
      case HttpStatusCode.Forbidden:
        console.log('User is blocked, redirecting to login...');
        this.router.navigate(['/login']);  // Redirect to login page
        this.toast.showError(errorMessage || "Access denied. You are blocked.", 'Error');
        break;
        
      case HttpStatusCode.NotFound:
        this.router.navigate(['/login']);  // Redirect to login page
        this.toast.showError(errorMessage || "Requested resource not found.", 'Error');
        break;
        
      case HttpStatusCode.InternalServerError:
        this.router.navigate(['/error'], { 
          queryParams: { statusCode: error.status, message: 'Internal Server Error: The server encountered an unexpected condition' }
        });
        //this.toast.showError(errorMessage || "Internal Server Error. Please try again later.", 'Error');
        break;
        
      case HttpStatusCode.ServiceUnavailable:
        this.router.navigate(['/error'], { 
          queryParams: { statusCode: error.status, message: 'No internet connection. Please check your network and try again.' }
        });
        //this.toast.showError(errorMessage || "Service is currently unavailable. Please check your connection.", 'Error');
        break;
        
      default:
        //this.toast.showError(errorMessage || 'Oops! Server down... Please try again later.', 'Error');
    }
  }
}



