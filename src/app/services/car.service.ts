import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarForm } from '../interfaces/car-form';
import { CarResult } from '../interfaces/car-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private readonly apiUrl: string = `${environment.apiUrl}cars`;

  constructor(private http: HttpClient) { }

  list(): Observable<{ content: CarResult[] }> {
    return this.http.get<{ content: CarResult[] }>(this.apiUrl);
  }

  save(carForm: CarForm): Observable<CarResult> {
    return this.http.post<CarResult>(this.apiUrl, carForm);
  }

  update(carForm: CarForm, userId: number): Observable<CarResult> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<CarResult>(url, carForm);
  }

  delete(carId: number): Observable<void> {
    const url = `${this.apiUrl}/${carId}`;
    return this.http.delete<void>(url);
  }

  getUserById(carId: number): Observable<CarResult> {
    const url = `${this.apiUrl}/${carId}`;
    return this.http.get<CarResult>(url);
  }
}
