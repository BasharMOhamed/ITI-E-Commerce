import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productsService } from '../../app/services/products.service';
import { CartService } from '../../app/services/cart.service';
import { response } from 'express';
import { BehaviorSubject } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product!: any;
  id!: number ;
  quantity: number = 0;
  rating! :number ;


  constructor(private productServ: productsService,private route: ActivatedRoute, private cartServ :CartService) {}


  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);
    this.productServ.getProductById(this.id).subscribe((response) => {
      this.product = response;
      this.rating = this.product.rating;
    });
  }


  addToCart()
  {
    this.cartServ.addToCart(String(this.id) , this.quantity).subscribe((response)=>
    {
      console.log(response);
    }) ;
  }

  addRating()
  {
    this.rating =Math.round(this.rating);
    this.productServ.updateRating(this.id,this.rating).subscribe((response)=>
    {
      console.log(response);
    })
  }

  add()
  {
    if(this.quantity<this.product.stock)
    this.quantity++;
  }

  remove()
  {
    if(this.quantity > 0)
    {
    this.quantity--;
    }
  }

  rate(newRating:number)
  {
    this.rating = this.product.rating;
    if((<HTMLElement>document.getElementById(`${newRating}`)).className == "bi bi-star-fill text-warning fs-5")
    {
      for(let i =newRating ; i<=5;i++)
        {
      (<HTMLElement>document.getElementById(`${i}`)).className = "bi bi-star-fill text-secondary fs-5";
        }
      this.rating = (this.rating + (newRating-1))/2;
      return;
    }
    for(let i =1 ; i<=5;i++)
    {
      if(i<=newRating)
      {
        (<HTMLElement>document.getElementById(`${i}`)).className = "bi bi-star-fill text-warning fs-5";
      }
    }

    this.rating = (this.rating + newRating)/2;
  }

}
