import { Component, OnInit } from '@angular/core';
import { Nutritionist } from '../../interfaces/Nutritionist';
import { Gender } from '../../interfaces/enums/Gender';
import { Role } from '../../interfaces/enums/Role';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-nutritionists',
  templateUrl: './nutritionists.component.html',
  styleUrl: './nutritionists.component.css'
})
export class NutritionistsComponent implements OnInit {

  nutritionists: User[] = [];
  user: User = {} as User;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadNutritionists();
  }

  loadNutritionists() {
    this.userService.getUsers().subscribe({
      next: data => {
        this.nutritionists = data.filter(nutritionist => nutritionist.role === Role.NUTRITIONIST);
        console.log('Nutritionists loaded:', this.nutritionists); // Log de Depuração
      },
      error: err => console.error('Failed to load foods', err)
    });
  }

  loadUser(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: user => {
          this.user = user;
          console.log('User loaded:', this.user); // Log de Depuração
          this.loadNutritionists();
        },
        error: err => console.error('Failed to load user', err)
      });
    }
  }

}
