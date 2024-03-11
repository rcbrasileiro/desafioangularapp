import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { selectToken } from '../store/selectors/auth.selectors';
import { AppState } from '../store/states';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly tokenRequiredUrls = ['/api/cars', '/api/me'];

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.requiresToken(request.url)) {
      return this.store.select(selectToken).pipe(
        switchMap(token => {
          if (token) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
          }
          return next.handle(request);
        })
      );
    } else {
      return next.handle(request);
    }
  }

  private requiresToken(url: string): boolean {
    return this.tokenRequiredUrls.some(requiredUrl => url.includes(requiredUrl));
  }
}
