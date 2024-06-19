import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diet } from '../interfaces/Diet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  private apiUrl = 'http://localhost:8080/api/diets';

  constructor(private http: HttpClient) {
  }

  save(diet: Diet) {
    return this.http.post<Diet>(this.apiUrl, diet);
  }

  getDiets(): Observable<Diet[]> {
    return this.http.get<Diet[]>(this.apiUrl);
  }

  update(diet: Diet) {
    return this.http.put<Diet>(`${this.apiUrl}/${diet.id}`, diet);
  }

  delete(diet: Diet) {
    return this.http.delete<void>(`${this.apiUrl}/${diet.id}`);
  }
}
