import { Routes } from '@angular/router';

import { LoginComponent } from '../Components/login/login.component';
import { HomeComponent } from '../Components/home/home.component';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';


export const routes: Routes = [
  { path: '', redirectTo: 'api/users/auth', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'api/users/auth', component: LoginComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
];
