import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignupRequestDto } from '../interfaces/SignupRequestDto';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
      })
    );
  }

  register(signupRequest: SignupRequestDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, signupRequest);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken ? decodedToken.user.role : null;
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken ? decodedToken.user.id : null;
  }

  getClientId(): number | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken && decodedToken.user && decodedToken.user.client ? decodedToken.user.client.id : null;
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }
}
