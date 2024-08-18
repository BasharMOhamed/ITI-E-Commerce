import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { productsService } from './services/products.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [productsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-commerce';
}
