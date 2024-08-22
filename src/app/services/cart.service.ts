import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../types/cartItem';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: CartItem[] = [];
  constructor(private http: HttpClient) { }

  init(){
    this.getCart().subscribe((result) => {
      this.items = result;
    }
    )
  }
  getCart(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(
      `https://localhost:4200/cart`
    );
  }

  addToCart(productId: string, quantity: number): Observable<any>{
    return this.http.post(
      `https://localhost:4200/cart/${productId}`,
      { quantity }
    );
  }

  removeFromCart(productId: string): Observable<any>{
    return this.http.delete(
      `https://localhost:4200/cart/${productId}`
    );
  }

}