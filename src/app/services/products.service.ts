import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class productsService {
  constructor(private http: HttpClient) {}

  getAllProducts(page:number =1): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products?skip=${(page-1)*30}`);
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products/${productId}`);
  }

  searchForProduct(productSearch: string): Observable<any> {
    return this.http.get<any>(`https://dummyjson.com/products/search?q=${productSearch}`);
  }

  updateRating(productId:number,newrating:number)
  {
    return this.http.put<any>(`https://localhost:4100/api/product/${productId}`, {"rating":newrating});
  }
}

