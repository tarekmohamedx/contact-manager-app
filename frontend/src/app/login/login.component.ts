import { CommonModule, JsonPipe } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private auth : AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }


    user: UserLogin = {
      username: '',
        password: ''
    }
    onSubmit(ngForm: NgForm, event: Event): void {
        if (ngForm.invalid) {
          console.log('Form is invalid');
          return;
          }
          console.log('Form submitted successfully: ', this.user);
          this.login();
          
    }
    login (): void {
        this.auth.login(this.user).subscribe({
            next: (response : any) => {
                console.log('Login successful', response.token);
                this.toastr.success('Login successful', 'Success');
                this.saveToSessionStorage(response.token);
                this.router.navigate(['/contact']);
            },
            error: (error) => {
                const msg = error.error.message || 'An error occurred during login';
                this.toastr.error(msg, 'Login Failed');
                console.log('Login failed', msg);
            }
        });
    }

    saveToSessionStorage(token: string): void {
      sessionStorage.setItem('token', token);
        console.log('Token saved to session storage:', token);
      }
    
}
