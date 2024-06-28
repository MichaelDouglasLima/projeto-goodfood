import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../interfaces/enums/Role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated())
      this.navigate();
  }

  login() {
    this.authService.login(this.email, this.password)
      .subscribe(response => {
        this.errorMessage = '';
        this.navigate();
      }, error => {
        this.errorMessage = 'Usuário ou senha incorretos. Por favor, tente novamente.';
        console.log(error);
      });
  }

  navigate() {
    this.router.navigateByUrl(
      this.authService.getUserRole() === Role.CLIENT ?
        'home-client' : 'home-nutritionist');
  }
}
