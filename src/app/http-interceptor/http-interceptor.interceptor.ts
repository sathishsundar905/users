import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWTTokenService } from '../services/jwttoken.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private jWTTokenService:JWTTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.jWTTokenService.jwtToken;
    request = request.clone({
      url:  request.url,
      setHeaders: {
        "x-access-token": token
      }
    });
    return next.handle(request);
  }
}
