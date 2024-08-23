import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {Component, OnInit } from '@angular/core';
import { productsService } from '../../app/services/products.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, TitleCasePipe, MatIconModule, FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: any[] = [];
  searchProduct!:string;
  constructor(private productServ: productsService) {}
  // hook
  ngOnInit() {
    this.productServ.getAllProducts().subscribe((response) => {
      this.products=response.products;
    });
  }

  searchForProducts() {
    this.productServ.searchForProduct(this.searchProduct).subscribe((response) => {
      this.products=response.products;
    });
  }
}
