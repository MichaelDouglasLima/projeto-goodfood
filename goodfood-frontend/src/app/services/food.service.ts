import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../interfaces/Food';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = 'http://localhost:8080/api/foods';

  constructor(private http: HttpClient) {
  }

  save(food: Food) {
    return this.http.post<Food>(this.apiUrl, food);
  }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }

  update(food: Food) {
    return this.http.put<Food>(`${this.apiUrl}/${food.id}`, food);
  }

  delete(food: Food) {
    return this.http.delete<void>(`${this.apiUrl}/${food.id}`);
  }
}
