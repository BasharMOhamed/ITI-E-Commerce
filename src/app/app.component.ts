import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { productsService } from './services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './services/cart.service';
import { ShoppingCartComponent } from '../Components/shopping-cart/shopping-cart.component';
import { RegisterService } from '../Services/register.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, productsService,RegisterService, CartService, ShoppingCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'e-commerce';
}