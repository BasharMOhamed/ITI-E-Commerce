import { Routes } from '@angular/router';

import { LoginComponent } from '../Components/login/login.component';
import { HomeComponent } from '../Components/home/home.component';
import { ShoppingCartComponent } from '../Components/shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';
import { LandingComponent } from '../Components/landing/landing.component';
import { RegisterationComponent } from '../Components/registeration/registeration.component';


export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'api/users/auth', component: LoginComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
  { path: 'api/users/register',component:RegisterationComponent},
  { path: '**', redirectTo: 'welcome' }
];
