import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../types/cartItem';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private backendUrl = 'http://localhost:4100/api/cart';
  items: CartItem[] = [];
  constructor(private http: HttpClient) { }

  init(){
    this.getCart().subscribe((result) => {
      this.items = result;
    }
    )
  }
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.backendUrl}`);
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.backendUrl}/${productId}`, { quantity });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.backendUrl}/${productId}`);
  }

}