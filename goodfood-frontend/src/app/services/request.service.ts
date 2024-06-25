import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../interfaces/Request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) {
  }

  save(request: Request) {
    return this.http.post<Request>(this.apiUrl, request);
  }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.apiUrl);
  }

  getRequestById(requestId: number): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrl}/${requestId}`);
  }

  update(request: Request) {
    return this.http.put<Request>(`${this.apiUrl}/${request.id}`, request);
  }

  delete(request: Request) {
    return this.http.delete<void>(`${this.apiUrl}/${request.id}`);
  }
}
