import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { selectToken } from '../store/selectors/auth.selectors';
import { AppState } from '../store/states';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(selectToken),
      map(token => !!token),
      tap(hasToken => {
        if (!hasToken) {
          this.router.navigate(['/forbidden']);
        }
      })
    );
  }
}
