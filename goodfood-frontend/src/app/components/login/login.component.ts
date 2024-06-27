import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../interfaces/enums/Role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password)
      .subscribe(response => {
        this.errorMessage = '';

        this.router.navigateByUrl(
          this.authService.getUserRole() === Role.CLIENT ?
            'home-client' : 'home-nutritionist');
      }, error => {
        this.errorMessage = 'Usuário ou senha incorretos. Por favor, tente novamente.';
      });
  }
}
