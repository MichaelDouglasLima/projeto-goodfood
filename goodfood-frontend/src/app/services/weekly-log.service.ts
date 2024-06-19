import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeeklyLog } from '../interfaces/WeeklyLog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeeklyLogService {

  private apiUrl = 'http://localhost:8080/api/weekly-logs';

  constructor(private http: HttpClient) {
  }

  save(weeklyLog: WeeklyLog) {
    return this.http.post<WeeklyLog>(this.apiUrl, weeklyLog);
  }

  getWeeklyLogs(): Observable<WeeklyLog[]> {
    return this.http.get<WeeklyLog[]>(this.apiUrl);
  }

  update(weeklyLog: WeeklyLog) {
    return this.http.put<WeeklyLog>(`${this.apiUrl}/${weeklyLog.id}`, weeklyLog);
  }

  delete(weeklyLog: WeeklyLog) {
    return this.http.delete<void>(`${this.apiUrl}/${weeklyLog.id}`);
  }
}
