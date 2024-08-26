import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../Services/register.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-registeration',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent {

  userRegisterObj: any = {
    username:'',
    password: '',
    email:''
  }
  constructor(private registerService:RegisterService){}
  onSubmit() {
      // Validate user input
      console.log(this.userRegisterObj); // Debugging line to check values

        // Validate user input
        if (!this.userRegisterObj.username|| !this.userRegisterObj.password|| !this.userRegisterObj.email) {
          alert("Please fill in all fields.");
          return; // Exit if validation fails
        }
    
        // Validate username (e.g., minimum 3 characters)
        if (this.userRegisterObj.username.length < 3) {
          alert("Username must be at least 3 characters long.");
          return; // Exit if username is invalid
        }
    
        // Validate password (e.g., minimum 6 characters)
        if (this.userRegisterObj.password.length < 6) {
          alert("Password must be at least 6 characters long.");
          return; // Exit if password is invalid
        }
    
        // Simple email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.userRegisterObj.email)) {
          alert("Please enter a valid email address.");
          return; // Exit if email is invalid
        }
        this.registerService.createUser(this.userRegisterObj).subscribe((response)=>{
          console.log(response)
          if(response){
            window.location.href = '/api/users/auth';
          }
        })
        
  }
}