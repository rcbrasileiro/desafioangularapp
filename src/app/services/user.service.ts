import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResult } from '../interfaces/user-result';
import { environment } from 'src/environments/environment';
import { UserForm } from '../interfaces/user-form';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) { }

  list(): Observable<{ content: UserResult[] }> {
    return this.http.get<{ content: UserResult[] }>(this.apiUrl);
  }

  save(userForm: UserForm): Observable<UserResult> {
    return this.http.post<UserResult>(this.apiUrl, userForm);
  }

  update(userForm: UserForm, userId: number): Observable<UserResult> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<UserResult>(url, userForm);
  }

  delete(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url);
  }

  getUserById(userId: number): Observable<UserResult> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<UserResult>(url);
  }
}
