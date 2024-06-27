import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Diet } from '../../interfaces/Diet';
import { DietService } from '../../services/diet.service';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { DietStatus } from '../../interfaces/enums/DietStatus';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-diet-nutritionist',
  templateUrl: './diet-nutritionist.component.html',
  styleUrl: './diet-nutritionist.component.css'
})
export class DietNutritionistComponent implements OnInit{

  clientByDiet: Diet | null = null; 

  // clientByDiet: Diet = {} as Diet;

  
  dietForm: FormGroup;
  isEditMode: boolean = false;
  initialDietData: any;
  nutritionist: User = {} as User;

  statusOptions = Object.values(DietStatus);

  constructor(
    private route: ActivatedRoute,
    private dietService: DietService,
    private userService: UserService,
    private authService: AuthService,
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
        } else {
          console.error('Client Diet not found for client ID:', clientId);
          // Handle scenario where diet for client is not found
        }
      },
      error: err => {
        console.error('Failed to load diets', err);
        // Handle error scenario as needed
      }
    });
  }

  // loadClientByDietId(clientId: string): void {
  //   this.dietService.getDiets().subscribe({
  //     next: diets => {
  //       const clientDiet = diets.find(diet => diet.client.id === +clientId);
  //       if (clientDiet) {
  //         this.clientByDiet = clientDiet;
  //         this.initialDietData = {
  //           dietType: clientDiet.dietType,
  //           startDate: clientDiet.startDate,
  //           endDate: clientDiet.endDate,
  //           dietStatus: clientDiet.dietStatus,
  //           totalMeals: clientDiet.totalMeals,
  //           observation: clientDiet.observation,
  //         };
  //         this.dietForm.patchValue(this.initialDietData);
  //         console.log('Client Diet loaded:', this.clientByDiet); // For debugging purposes
  //       } else {
  //         console.error('Client Diet not found for client ID:', clientId);
  //         // Handle scenario where diet for client is not found
  //       }
  //     },
  //     error: err => {
  //       console.error('Failed to load diets', err);
  //       // Handle error scenario as needed
  //     }
  //   });
  // }

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

  // onSave(): void {
  //   if (this.clientByDiet) {
  //     const updatedDietData = this.dietForm.value;
  //     const updatedDiet: Diet = {
  //       ...this.clientByDiet,
  //       ...updatedDietData
  //     };

  //     // imprimir a dieta atualizada aqui
  //     this.dietService.update(updatedDiet).subscribe({
  //       next: () => {
  //         console.log('Diet data saved successfully:', updatedDiet);
  //         this.initialDietData = this.dietForm.value;
  //         this.isEditMode = false;
  //         this.setFormReadonly(true);
  //       },
  //       error: err => console.error('Failed to update diet data', err)
  //     });
  //   }
  // }

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
}
