import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  save(user: User) {
    return this.http.post<User>(this.apiUrl, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  update(user: User) {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  delete(user: User) {
    return this.http.delete<void>(`${this.apiUrl}/${user.id}`);
  }
}
