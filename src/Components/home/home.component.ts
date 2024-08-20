import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {Component, OnInit } from '@angular/core';
import { productsService } from '../../app/services/products.service';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe, MatIconModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: any[] = [];
  currentPage:number = 1;
  page!: BehaviorSubject<number>;
  totalPages!: number;

  searchProduct!:string;
  constructor(private productServ: productsService) {
    this.page = new BehaviorSubject<number>(this.currentPage);
  }
  // hook
  ngOnInit() {
    this.page.subscribe((newPage)=> {
      this.productServ.getAllProducts(newPage).subscribe((response) => {
      this.products=response.products;
    });
    })

  }
  prevPage(){
    if (this.currentPage > 1)
      this.page.next(--this.currentPage);
  }
  nextPage(){
    if (this.products[this.products.length-1].id != 194)
      this.page.next(++this.currentPage);
  }

  searchForProducts() {
    this.productServ.searchForProduct(this.searchProduct).subscribe((response) => {
      this.products=response.products;
    });
  }
}
