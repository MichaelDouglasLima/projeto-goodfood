import { Component, OnInit, ViewChild } from '@angular/core';
import { RealMeal } from '../../interfaces/RealMeal';
import { RealMealService } from '../../services/real-meal.service';
import { Diet } from '../../interfaces/Diet';
import { User } from '../../interfaces/User';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { DietService } from '../../services/diet.service';
import { HistoryFormComponent } from '../history-form/history-form.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {

  @ViewChild(HistoryFormComponent) historyFormComponent!: HistoryFormComponent;

  realMeals: RealMeal[] = [];
  realMeal: RealMeal = {} as RealMeal;
  clientByDiet: Diet = {} as Diet;
  client: User = {} as User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dietService: DietService,
    private realMealService: RealMealService
  ) {}

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(): void {
    const clientId = this.authService.getUserId();
    if (clientId) {
      this.userService.getUserById(clientId).subscribe({
        next: client => {
          this.client = client;
          console.log('Client loaded:', this.client); // Log de Depuração
          this.loadDietByClientId(clientId);
        },
        error: err => console.error('Failed to load user', err)
      });
    }
  }

  loadDietByClientId(clientId: number): void {
    this.dietService.getDiets().subscribe({
      next: diets => {
        const clientDiet = diets.find(diet => diet.client.id === +clientId);
        if (clientDiet) {
          this.clientByDiet = clientDiet;
          console.log('Client Diet loaded:', this.clientByDiet);
          this.loadRealMeals();
        } else {
          console.error('Client Diet not found for client ID:', clientId);
        }
      },
      error: err => {
        console.error('Failed to load diets', err);
      }
    });
  }

  loadRealMeals(): void {
    if (this.clientByDiet.id) {
      this.realMealService.getRealMeals().subscribe({
        next: data => {
          this.realMeals = data.filter(realMeal => realMeal.diet.id === this.clientByDiet.id);
          console.log('RealMeal loaded:', this.realMeals); // Log de Depuração
        },
        error: err => console.error('Failed to load realMeals', err)
      });
    } else {
      console.error('ClientByDiet ID not available');
    }
  }

  saveRealMeal(realMeal: RealMeal | false): void {
    if (realMeal) {
        this.realMealService.save(realMeal).subscribe({
          next: realMeal => {
            this.realMeals.push(realMeal);
            this.resetForm();
            this.loadRealMeals();
          },
          error: err => console.error('Failed to save realMeal', err)
        });
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.realMeal = {} as RealMeal;
    if (this.historyFormComponent) {
      this.historyFormComponent.resetForm();
    }
  }

}
