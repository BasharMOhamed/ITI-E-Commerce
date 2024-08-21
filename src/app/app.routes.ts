import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: LoginComponent },
];
