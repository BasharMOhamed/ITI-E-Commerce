import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class productsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products`);
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products/${productId}`);
  }

  searchForProduct(productSearch: string): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products/search?q=${productSearch}`);
  }
}

