import { Routes } from '@angular/router';

import { LoginComponent } from '../Components/login/login.component';
import { HomeComponent } from '../Components/home/home.component';
export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: LoginComponent },
];
