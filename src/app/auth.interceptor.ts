import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    if (this.authService.isAuthenticated()) {
      const jwtToken = localStorage.getItem('ACCESS_TOKEN');
      headers = headers.append('Authorization', `Token ${jwtToken}`);
      const authRequest = request.clone({ headers });
      return next.handle(authRequest);
    }
    return next.handle(request.clone({ headers }));
  }
}
