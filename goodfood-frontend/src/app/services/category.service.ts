import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {
  }

  save(category: Category) {
    return this.http.post<Category>(this.apiUrl, category);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  update(category: Category) {
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category);
  }

  delete(category: Category) {
    return this.http.delete<void>(`${this.apiUrl}/${category.id}`);
  }
}
