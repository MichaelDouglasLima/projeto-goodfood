import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nutritionist } from '../interfaces/Nutritionist';
import { Observable } from 'rxjs';
import { NutritionistPutDto } from '../interfaces/dtos/NutritionistPutDto';

@Injectable({
  providedIn: 'root'
})
export class NutritionistService {

  private apiUrl = 'http://localhost:8080/api/nutritionists';

  constructor(private http: HttpClient) { }

  save(nutritionist: Nutritionist) {
    return this.http.post<Nutritionist>(this.apiUrl, nutritionist);
  }

  getNutritionists(): Observable<Nutritionist[]> {
    return this.http.get<Nutritionist[]>(this.apiUrl);
  }

  update(id: number, putDto: NutritionistPutDto) {
    return this.http.put<NutritionistPutDto>(`${this.apiUrl}/${id}`, putDto);
  }

  delete(nutritionist: Nutritionist) {
    return this.http.delete<void>(`${this.apiUrl}/${nutritionist.id}`);
  }

  getByUserId(userId: number): Observable<Nutritionist> {
    return this.http.get<Nutritionist>(`${this.apiUrl}/user/${userId}`);
  }
}
