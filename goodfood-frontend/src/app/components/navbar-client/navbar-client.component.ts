import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrl: './navbar-client.component.css'
})
export class NavbarClientComponent {
  collapsed = true;

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
