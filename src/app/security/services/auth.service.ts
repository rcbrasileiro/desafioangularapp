import { NotificationService } from 'src/app/services/notification.service';
import { UserAuth } from './../../interfaces/user-auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../interfaces/auth-request';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { setToken } from '../store/states/auth.actions';
import { UserMe } from '../interfaces/user-me';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private router: Router, private http: HttpClient, private store: Store) { }

  login(authRequest: AuthRequest): Observable<UserAuth> {
    const url = `${this.apiUrl}signin`;
    return this.http.post<UserAuth>(url, authRequest).pipe(
      tap((userAuth) => {
        this.store.dispatch(setToken(userAuth.token));
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getUserMe(): Observable<UserMe> {
    return this.http.get<UserMe>(`${this.apiUrl}me`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  navigateToForbiddenPage(): void {
    this.router.navigate(['/forbidden']);
  }
}
