import { Component, OnInit } from '@angular/core';
import { CartService } from '../../app/services/cart.service';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NgClass, CommonModule, NavbarComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.init();
  }

  get cartItems() {
    return this.cartService.items;
  }

  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(() => {
      this.cartService.init();
    });
  }


}
