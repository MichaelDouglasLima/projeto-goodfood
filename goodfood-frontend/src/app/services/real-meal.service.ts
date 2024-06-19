import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RealMeal } from '../interfaces/RealMeal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealMealService {

  private apiUrl = 'http://localhost:8080/api/real-meals';

  constructor(private http: HttpClient) {
  }

  save(realMeal: RealMeal) {
    return this.http.post<RealMeal>(this.apiUrl, realMeal);
  }

  getRealMeals(): Observable<RealMeal[]> {
    return this.http.get<RealMeal[]>(this.apiUrl);
  }

  update(realMeal: RealMeal) {
    return this.http.put<RealMeal>(`${this.apiUrl}/${realMeal.id}`, realMeal);
  }

  delete(realMeal: RealMeal) {
    return this.http.delete<void>(`${this.apiUrl}/${realMeal.id}`);
  }
}
