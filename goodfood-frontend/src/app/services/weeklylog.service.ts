import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeeklyLog } from '../interfaces/WeeklyLog';
import { Observable } from 'rxjs';
import { Diet } from '../interfaces/Diet';

@Injectable({
  providedIn: 'root'
})
export class WeeklylogService {

  // Serviço utilzado para testes

  // private apiUrl = 'http://localhost:8080/api/weeklylogs';

  weeklyLogs: WeeklyLog[] = [
    {
      id: 1,
      rating: 10,
      weight: 70,
      endDate: '2024-05-18',
      description: 'Exagerei na paçoquinha, mas deu tudo certo.',
      diet: { /* Diet details */ } as Diet
    },
    {
      id: 2,
      rating: 9,
      weight: 71,
      endDate: '2024-05-11',
      description: 'Exagerei no amendoim, ainda bem que não sou alérgico.',
      diet: { /* Diet details */ } as Diet
    }
  ];

  constructor(private http: HttpClient) { }

  save(weeklyLog: WeeklyLog) {
    weeklyLog.id = this.getWeeklyLogs.length + 1;
    this.weeklyLogs.push(weeklyLog);
  }

  getWeeklyLogs() {
    return this.weeklyLogs;
  }

  // save(weeklyLog: WeeklyLog) {
  //   return this.http.post<WeeklyLog>(this.apiUrl, weeklyLog);
  // }

  // getAllByDiet(dietId: number): Observable<WeeklyLog[]> {
  //   return this.http.get<WeeklyLog[]>(`${this.apiUrl}?dietId=${dietId}`);
  // }
  
}
