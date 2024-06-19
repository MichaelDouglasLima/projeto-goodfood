import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../interfaces/Client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {
  }

  save(client: Client) {
    return this.http.post<Client>(this.apiUrl, client);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  update(client: Client) {
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
  }

  delete(client: Client) {
    return this.http.delete<void>(`${this.apiUrl}/${client.id}`);
  }
}
