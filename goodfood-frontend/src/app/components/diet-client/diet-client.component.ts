import { Component, OnInit } from '@angular/core';
import { Diet } from '../../interfaces/Diet';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DietStatus } from '../../interfaces/enums/DietStatus';
import { DietService } from '../../services/diet.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/User';
import { Meal } from '../../interfaces/Meal';
import { MealService } from '../../services/meal.service';

@Component({
  selector: 'app-diet-client',
  templateUrl: './diet-client.component.html',
  styleUrl: './diet-client.component.css'
})
export class DietClientComponent implements OnInit{

  clientByDiet: Diet | null = null;
  dietForm: FormGroup;
  client: User = {} as User;
  meals: Meal[] = [];

  statusOptions = Object.values(DietStatus);

  constructor(
    private dietService: DietService,
    private userService: UserService,
    private authService: AuthService,
    private mealService: MealService,
    private formBuilder: FormBuilder
  ) {
    this.dietForm = this.formBuilder.group({
      dietType: [''],
      startDate: [''],
      endDate: [''],
      status: [''],
      totalMeals: [''],
      observation: ['']
    });
  }

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
          this.dietForm.patchValue({
            dietType: this.clientByDiet.dietType,
            startDate: this.clientByDiet.startDate,
            endDate: this.clientByDiet.endDate,
            status: this.clientByDiet.status,
            totalMeals: this.clientByDiet.totalMeals,
            observation: this.clientByDiet.observation
          });
          console.log('Form values after patchValue:', this.dietForm.value);
          this.loadMealsByClientDietId();
        } else {
          console.error('Client Diet not found for client ID:', clientId);
        }
      },
      error: err => {
        console.error('Failed to load diets', err);
      }
    });
  }

  loadMealsByClientDietId() {
    if (this.clientByDiet?.id) {
      this.mealService.getMeals().subscribe({
        next: data => {
          this.meals = data.filter(meal => meal.diet.id === this.clientByDiet?.id);
          console.log('Foods loaded:', this.meals); // Log de Depuração
        },
        error: err => console.error('Failed to load meals', err)
      });
    } else {
      console.error('ClientById ID not available');
    }
  }

}
