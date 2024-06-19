import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nutritionist } from '../interfaces/Nutritionist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionistService {

  private apiUrl = 'http://localhost:8080/api/nutritionists';

  constructor(private http: HttpClient) {
  }

  save(nutritionist: Nutritionist) {
    return this.http.post<Nutritionist>(this.apiUrl, nutritionist);
  }

  getNutritionists(): Observable<Nutritionist[]> {
    return this.http.get<Nutritionist[]>(this.apiUrl);
  }

  update(nutritionist: Nutritionist) {
    return this.http.put<Nutritionist>(`${this.apiUrl}/${nutritionist.id}`, nutritionist);
  }

  delete(nutritionist: Nutritionist) {
    return this.http.delete<void>(`${this.apiUrl}/${nutritionist.id}`);
  }
}
