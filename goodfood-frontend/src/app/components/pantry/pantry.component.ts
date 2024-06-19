import { Component, OnInit, ViewChild } from '@angular/core';
import { Food } from '../../interfaces/Food';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoodService } from '../../services/food.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/Category';
import { AuthService } from '../../services/auth.service';
import { Client } from '../../interfaces/Client';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { PantryFormComponent } from '../pantry-form/pantry-form.component';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrl: './pantry.component.css'
})
export class PantryComponent implements OnInit {

  @ViewChild(PantryFormComponent) pantryFormComponent!: PantryFormComponent;

  categories: Category[] = [];
  foods: Food[] = [];
  food: Food = {} as Food;
  deleteFood: Food = {} as Food;
  user: User = {} as User;
  isEditing: boolean = false;

  constructor(
    private foodService: FoodService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadUser();
  }

  loadUser(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: user => {
          this.user = user;
          console.log('User loaded:', this.user); // Log de Depuração
          this.loadFoods();
        },
        error: err => console.error('Failed to load user', err)
      });
    }
  }

  loadAllFoods(): void {
    this.foodService.getFoods().subscribe({
      next: data => {
        this.foods = data;
        console.log('Foods loaded:', this.foods); // Log de Depuração
      },
      error: err => console.error('Failed to load foods', err)
    });
  }

  loadFoods(): void {
    if (this.user.id) {
      this.foodService.getFoods().subscribe({
        next: data => {
          this.foods = data.filter(food => food.user.id === this.user.id);
          console.log('Foods loaded:', this.foods); // Log de Depuração
        },
        error: err => console.error('Failed to load foods', err)
      });
    } else {
      console.error('User ID not available');
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: data => {
        console.log('Categories loaded:', data); // Log de Depuração
        this.categories = data;
      },
      error: err => console.error('Failed to load categories', err)
    });
  }

  saveFood(food: Food | false): void {
    if (food) {
      if (this.isEditing) {
        this.foodService.update(food).subscribe({
          next: () => {
            this.loadFoods();
            this.resetForm();
          },
          error: err => console.error('Failed to update food', err)
        });
      } else {
        this.foodService.save(food).subscribe({
          next: savedFood => {
            this.foods.push(savedFood);
            this.resetForm();
            this.loadFoods();
          },
          error: err => console.error('Failed to save food', err)
        });
      }
    } else {
      this.resetForm();
    }
  }

  edit(food: Food): void {
    this.food = { ...food };
    this.isEditing = true;
  }

  delete(modal: any, food: Food): void {
    this.deleteFood = food;
    this.modalService.open(modal).result.then(
      (confirm) => {
        if (confirm) {
          this.foodService.delete(food).subscribe({
            next: () => {
              // Remove o alimento da lista
              this.foods = this.foods.filter(f => f.id !== food.id);

              // Verifica se o alimento excluído é o mesmo que está sendo editado
              if (food.id === this.food.id) {
                this.resetForm();
              }
            },
            error: err => console.error('Failed to delete food', err)
          });
        }
      },
      () => {
        // Handle modal dismiss without confirmation
      }
    );
  }

  resetForm(): void {
    this.food = {} as Food;
    this.isEditing = false;
    if (this.pantryFormComponent) {
      this.pantryFormComponent.resetForm();
    }
  }

}
