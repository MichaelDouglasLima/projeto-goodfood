import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-nutritionist',
  templateUrl: './navbar-nutritionist.component.html',
  styleUrl: './navbar-nutritionist.component.css'
})
export class NavbarNutritionistComponent {
  collapsed = true;

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
