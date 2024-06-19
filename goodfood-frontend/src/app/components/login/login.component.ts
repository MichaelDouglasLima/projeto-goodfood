import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(response => {
      const role = this.authService.getUserRole();
      if (role === 'CLIENT') {
        this.router.navigateByUrl('home-client');
      } else if (role === 'NUTRITIONIST') {
        this.router.navigateByUrl('home-nutritionist');
      }
    }, error => {
      this.errorMessage = 'Usuário ou senha incorretos. Por favor, tente novamente.';
    });
  }
}
