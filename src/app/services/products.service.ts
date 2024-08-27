import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class productsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`http://localhost:4100/api/product/allProducts`, {
      withCredentials: true,
    });
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:4100/api/product/${productId}`,
      { withCredentials: true }
    );
  }

  searchForProduct(productSearch: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:4100/api/product/search/${productSearch}`,
      { withCredentials: true }
    );
  }

  updateRating(productId: number, newrating: number) {
    return this.http.put<any>(
      `http://localhost:4100/api/product/${productId}`,
      { rating: newrating },
      { withCredentials: true }
    );
  }
}
