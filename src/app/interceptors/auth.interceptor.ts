import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token: string | null = null;
    
    if (window.location.href.includes("/user/")) {  
      token = localStorage.getItem(`student_auth_token`);
      
    } else if (window.location.href.includes("/admin/")) {
      token = localStorage.getItem(`admin_auth_token`);
    } else if (window.location.href.includes("/coordinator/")) {
      token = localStorage.getItem(`coordinator_auth_token`);
    } else if (window.location.href.includes("/tutor/")) {
      token = localStorage.getItem(`tutor_auth_token`);
    } else {
      console.log("URL does not contain nothing");
    }

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}