import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { productsService } from '../../app/services/products.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../app/services/cart.service';
import { Product } from '../../app/types/product';
import e from 'cors';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe, MatIconModule, FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  searchProduct!:string;
  currentPage: number = 1;
  page!: BehaviorSubject<number>;
  totalPages!: number;

  constructor(private productServ: productsService, private cartService: CartService) {
    this.page = new BehaviorSubject<number>(this.currentPage);
  }
  // hook
  ngOnInit() {
    this.page.subscribe((newPage) => {
      this.productServ.getAllProducts(newPage).subscribe((response) => {
        this.products = response.products;
      });
    });

    this.cartService.init();
  }
  prevPage() {
    if (this.currentPage > 1) this.page.next(--this.currentPage);
  }
  nextPage() {
    if (this.products[this.products.length - 1].id != 194)
      this.page.next(++this.currentPage);
  }

  searchForProducts() {
    this.productServ
      .searchForProduct(this.searchProduct)
      .subscribe((response) => {
        this.products = response.products;
      });
  }
  addToCart(product: Product){
    if (!this.isProductInCart(product.id)){
      this.cartService.addToCart(product.id, 1).subscribe(() => {
        this.cartService.init();
      });
    } else {
      this.cartService.removeFromCart(product.id).subscribe(() => {
        this.cartService.init();
      });
  }
}

  isProductInCart(productId: string){
    if (this.cartService.items.find(item => item.product.id == productId)){
      return true;
    } else {
      return false;
    }
  }
}