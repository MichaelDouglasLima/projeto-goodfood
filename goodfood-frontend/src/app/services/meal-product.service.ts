import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MealProduct } from '../interfaces/MealProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealsProductService {

  private apiUrl = 'http://localhost:8080/api/meal-products';

  constructor(private http: HttpClient) {
  }

  save(mealProduct: MealProduct) {
    return this.http.post<MealProduct>(this.apiUrl, mealProduct);
  }

  getMealProducts(): Observable<MealProduct[]> {
    return this.http.get<MealProduct[]>(this.apiUrl);
  }

  update(mealProduct: MealProduct) {
    return this.http.put<MealProduct>(`${this.apiUrl}/${mealProduct.id}`, mealProduct);
  }

  delete(mealProduct: MealProduct) {
    return this.http.delete<void>(`${this.apiUrl}/${mealProduct.id}`);
  }
}
