import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { ProductDetailsComponent } from '../Components/home/product-details/product-details.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
];
