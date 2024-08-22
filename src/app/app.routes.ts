import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { ShoppingCartComponent } from '../Components/shopping-cart/shopping-cart.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: ShoppingCartComponent },
];
