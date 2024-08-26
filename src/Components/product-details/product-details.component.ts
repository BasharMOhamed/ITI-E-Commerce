import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productsService } from '../../app/services/products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product!: any;
  id!: number ;


  constructor(private productServ: productsService,private route: ActivatedRoute) {}


  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);
    this.productServ.getProductById(this.id).subscribe((response) => {
      this.product = response;
    });
  }


  addToCart()
  {
    
  }

  addReview()
  {
    let rating = (<HTMLInputElement>document.getElementById("rating")).value;
    let comment = (<HTMLInputElement>document.getElementById("comment")).value;

  }

}
