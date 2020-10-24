import { ISession } from '@Service/interfaces/session.interfaces';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = req.url.split('/?');
    const vupload = url[0].includes('uploads');
    if (vupload === false) {
      const token = JSON.parse(localStorage.getItem('session')) as ISession;
      if (!token) {
        return next.handle(req);
      }
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
      });
      return next.handle(req);
    } else {
      return next.handle(req);
    }
  }
}
