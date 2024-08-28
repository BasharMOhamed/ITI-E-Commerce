import { Component, OnInit } from '@angular/core';
import { CartService } from '../../app/services/cart.service';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartItem } from '../../app/types/cartItem';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgClass, CommonModule, NavbarComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  constructor(private cartService: CartService) {}
  items: CartItem[] = [];
  ngOnInit() {
    this.cartService.getCart().subscribe((result) => {
      this.items = result;
      console.log(this.items);
    });
  }


  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(() => {
      this.cartService.init();
    });
  }

 get total() {
    return Math.round(this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
  }
}
