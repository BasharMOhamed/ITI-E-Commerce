import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private auth: AuthService) {}

  onSubmit() {
    console.log(this.email, this.password);
    this.auth.login(this.email, this.password).subscribe((response) => {
      console.log('Login successful', response);
    });
  }
}
