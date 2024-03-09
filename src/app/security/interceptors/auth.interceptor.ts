import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { selectToken } from '../store/selectors/auth.selectors';
import { AppState } from '../store/states';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      switchMap(token => {
        if (token) {
          // Verifica se a solicitação já foi autenticada adicionando um cabeçalho personalizado
          if (!request.headers.has('X-Auth-Processed')) {
            // Clona o objeto HttpRequest e adiciona o token aos cabeçalhos
            const authRequest = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
                'X-Auth-Processed': 'true' // Adiciona o cabeçalho personalizado
              }
            });
            // Retorna a requisição clonada
            return next.handle(authRequest);
          }
        }
        // Se não houver token disponível ou a solicitação já foi autenticada, deixa a requisição seguir normalmente
        return next.handle(request);
      })
    );
  }
}
