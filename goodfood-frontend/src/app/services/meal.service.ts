import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../interfaces/Meal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private apiUrl = 'http://localhost:8080/api/meals';

  constructor(private http: HttpClient) {
  }

  save(meal: Meal) {
    return this.http.post<Meal>(this.apiUrl, meal);
  }

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.apiUrl);
  }

  update(meal: Meal) {
    return this.http.put<Meal>(`${this.apiUrl}/${meal.id}`, meal);
  }

  delete(meal: Meal) {
    return this.http.delete<void>(`${this.apiUrl}/${meal.id}`);
  }
}
