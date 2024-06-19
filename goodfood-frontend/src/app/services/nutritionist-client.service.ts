import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NutritionistClient } from '../interfaces/NutritionistClient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionistClientService {

  private apiUrl = 'http://localhost:8080/api/nutritionist-clients';

  constructor(private http: HttpClient) {
  }

  save(nutritionistClient: NutritionistClient) {
    return this.http.post<NutritionistClient>(this.apiUrl, nutritionistClient);
  }

  getNutritionistClients(): Observable<NutritionistClient[]> {
    return this.http.get<NutritionistClient[]>(this.apiUrl);
  }

  update(nutritionistClient: NutritionistClient) {
    return this.http.put<NutritionistClient>(`${this.apiUrl}/${nutritionistClient.id}`, nutritionistClient);
  }

  delete(nutritionistClient: NutritionistClient) {
    return this.http.delete<void>(`${this.apiUrl}/${nutritionistClient.id}`);
  }
}
