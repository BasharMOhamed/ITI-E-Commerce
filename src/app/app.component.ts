import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { productsService } from './services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './services/cart.service';
import { ShoppingCartComponent } from '../Components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [productsService, CartService, ShoppingCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-commerce';
}
