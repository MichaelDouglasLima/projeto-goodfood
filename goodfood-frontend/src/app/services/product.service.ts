import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {
  }

  save(product: Product) {
    return this.http.post<Product>(this.apiUrl, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  update(product: Product) {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  delete(product: Product) {
    return this.http.delete<void>(`${this.apiUrl}/${product.id}`);
  }
}
