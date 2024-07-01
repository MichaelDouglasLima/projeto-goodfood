import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Diet } from '../../interfaces/Diet';
import { DietService } from '../../services/diet.service';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { DietStatus } from '../../interfaces/enums/DietStatus';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Meal } from '../../interfaces/Meal';
import { MealService } from '../../services/meal.service';
import { MealFormComponent } from '../meal-form/meal-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-diet-nutritionist',
  templateUrl: './diet-nutritionist.component.html',
  styleUrl: './diet-nutritionist.component.css'
})
export class DietNutritionistComponent implements OnInit {

  @ViewChild(MealFormComponent) mealFormComponent!: MealFormComponent;
  @ViewChild('confirmModal') confirmModal!: TemplateRef<any>;

  // clientByDiet: Diet | null = null; 
  clientByDiet: Diet = {} as Diet;
  dietForm: FormGroup;
  isEditMode: boolean = false;
  initialDietData: any;
  nutritionist: User = {} as User;

  meals: Meal[] = [];
  meal: Meal = {} as Meal;

  statusOptions = Object.values(DietStatus);

  constructor(
    private route: ActivatedRoute,
    private dietService: DietService,
    private userService: UserService,
    private authService: AuthService,
    private mealService: MealService,
    private modalService: NgbModal,
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
    this.route.paramMap.subscribe(params => {
      const clientId = params.get('id');
      if (clientId) {
        this.loadClientByDietId(clientId);
      }
    });
    this.loadNutritionist();
    this.setFormReadonly(true);
  }

  loadNutritionist(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: nutritionist => {
          this.nutritionist = nutritionist;
          console.log('Nutritionist loaded:', this.nutritionist); // Log de Depuração
        },
        error: err => console.error('Failed to load nutritionist', err)
      });
    }
  }

  loadClientByDietId(clientId: string): void {
    this.dietService.getDiets().subscribe({
      next: diets => {
        const clientDiet = diets.find(diet => diet.client.id === +clientId);
        if (clientDiet) {
          this.clientByDiet = clientDiet;
          this.initialDietData = {
            dietType: clientDiet.dietType,
            startDate: clientDiet.startDate,
            endDate: clientDiet.endDate,
            status: clientDiet.status, // Verifique se dietStatus está sendo carregado corretamente
            totalMeals: clientDiet.totalMeals,
            observation: clientDiet.observation,
          };

          console.log('Client Diet loaded:', this.clientByDiet);
          console.log('Initial Diet Data:', this.initialDietData);

          this.dietForm.patchValue(this.initialDietData); // Certifique-se de que dietStatus está sendo patchado corretamente
          console.log('Form values after patchValue:', this.dietForm.value);

          this.loadMeals();
        } else {
          console.error('Client Diet not found for client ID:', clientId);
          // Handle scenario where diet for client is not found
        }
      },
      error: err => {
        console.error('Failed to load diets', err);
      }
    });
  }

  setFormReadonly(readonly: boolean): void {
    if (readonly) {
      this.dietForm.disable();
    } else {
      this.dietForm.enable();
    }
  }

  onEdit(): void {
    this.isEditMode = true;
    this.setFormReadonly(false);
  }

  onSave(): void {
    if (this.clientByDiet) {
      const updatedDietData = this.dietForm.value;
      const updatedDiet: Diet = {
        ...this.clientByDiet,
        dietType: updatedDietData.dietType,
        startDate: updatedDietData.startDate,
        endDate: updatedDietData.endDate,
        status: updatedDietData.status,
        totalMeals: updatedDietData.totalMeals,
        observation: updatedDietData.observation,
      };

      console.log('Diet data before saving:', updatedDiet); // Log data before saving

      this.dietService.update(updatedDiet).subscribe({
        next: () => {
          console.log('Diet data saved successfully:', updatedDiet);
          this.initialDietData = this.dietForm.value;
          this.isEditMode = false;
          this.setFormReadonly(true);
        },
        error: err => console.error('Failed to update diet data', err)
      });
    }
  }

  onCancel(): void {
    this.dietForm.patchValue(this.initialDietData);
    this.isEditMode = false;
    this.setFormReadonly(true);
  }

  loadMeals(): void {
    if (this.clientByDiet && this.clientByDiet.id) {
      this.mealService.getMeals().subscribe({
        next: meals => {
          this.meals = meals.filter(meal => meal.diet && meal.diet.id === this.clientByDiet!.id);
        },
        error: err => console.error('Failed to load meals', err)
      });
    } else {
      console.error('ClientByDiet or clientByDiet.id is null or undefined');
    }
  }

  saveMeal(meal: Meal | false): void {
    if (meal) {
      this.mealService.save(meal).subscribe({
        next: meal => {
          this.meals.push(meal);
          this.resetForm();
          this.loadMeals();
        },
        error: err => console.error('Failed to save meal', err)
      });
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.meal = {} as Meal;
    if (this.mealFormComponent) {
      this.mealFormComponent.resetForm();
    }
  }

  resetMealForm(): void {
    this.meal = {} as Meal;
    if (this.mealFormComponent) {
      this.mealFormComponent.resetForm();
    }
  }

  editMeal(meal: Meal): void {
    this.meal = { ...meal };
  }

  deleteMeal(meal: Meal): void {
    this.mealService.delete(meal).subscribe({
      next: () => {
        this.meals = this.meals.filter(m => m.id !== meal.id);
        if (meal.id === this.meal.id) {
          this.resetMealForm();
        }
      },
      error: err => console.error('Failed to delete meal', err)
    });
  }

  openDeleteConfirmModal(): void {
    const modalRef = this.modalService.open(this.confirmModal);
    modalRef.result.then((result) => {
      if (result) {
        this.deleteDiet();
      }
    }, (reason) => {
      // Modal dismissed without confirmation
    });
  }

  deleteDiet(): void {
    if (this.clientByDiet) {
      const currentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

      const updatedDiet: Diet = {
        ...this.clientByDiet,
        dietType: '',
        startDate: currentDate, // Data atual
        endDate: '',
        status: 'INTERRUPTED' as DietStatus,
        totalMeals: 0,
        observation: ''
      };

      this.dietService.update(updatedDiet).subscribe({
        next: () => {
          // Diet successfully "deleted" (re-written)
          this.initialDietData = this.dietForm.value;
          this.dietForm.reset();
          this.dietForm.patchValue({ startDate: currentDate, status: 'INTERRUPTED' as DietStatus });
        },
        error: err => console.error('Failed to delete diet', err)
      });
    }
  }

}
