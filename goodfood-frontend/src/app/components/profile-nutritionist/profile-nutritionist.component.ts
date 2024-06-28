import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NutritionistPutDto } from '../../interfaces/dtos/NutritionistPutDto';
import { UserPutDto } from '../../interfaces/dtos/UserPutDto';
import { Gender } from '../../interfaces/enums/Gender';
import { Nutritionist } from '../../interfaces/Nutritionist';
import { User } from '../../interfaces/User';
import { AuthService } from '../../services/auth.service';
import { NutritionistService } from '../../services/nutritionist.service';

@Component({
  selector: 'app-profile-nutritionist',
  templateUrl: './profile-nutritionist.component.html',
  styleUrl: './profile-nutritionist.component.css'
})
export class ProfileNutritionistComponent {

  profileNutritionistForm: FormGroup;
  isEditMode: boolean = false;
  initialUserData: any;
  genderOptions = Object.values(Gender);
  user: User = {} as User;
  nutritionist: Nutritionist = {} as Nutritionist;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private nutritionistService: NutritionistService
  ) {
    this.profileNutritionistForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phoneNumber: [''],
      birthDate: [''],
      gender: [''],
      description: [''],
      cfn: ['']
    });
  }

  ngOnInit(): void {
    this.loadUser();
    this.setFormReadonly(true);
  }

  loadUser(): void {
    const userId = this.authService.getUserId();

    if (userId) {
      this.nutritionistService.getByUserId(userId).subscribe({
        next: (nutritionist: Nutritionist) => {
          this.user = nutritionist.user;
          this.nutritionist = nutritionist;

          this.initialUserData = {
            name: this.user.name,
            email: this.user.email,
            phoneNumber: this.user.phoneNumber,
            birthDate: this.user.birthDate,
            gender: this.user.gender,
            description: this.user.description,
            cfn: this.nutritionist.cfn,
          };

          this.profileNutritionistForm.patchValue(this.initialUserData);
        },
        error: err => console.error('Failed to load user', err)
      });
    }
  }

  setFormReadonly(readonly: boolean): void {
    if (readonly) {
      this.profileNutritionistForm.disable();
    } else {
      this.profileNutritionistForm.enable();
    }
  }

  onEdit(): void {
    this.isEditMode = true;
    this.setFormReadonly(false);
  }

  onSave(): void {
    const formData = this.profileNutritionistForm.value;

    const updatedUser: UserPutDto = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      birthDate: formData.birthDate,
      gender: formData.gender,
      description: formData.description,
    };

    const updatedNutritionist: NutritionistPutDto = {
      cfn: formData.cfn,
      user: updatedUser,
    };

    this.nutritionistService.update(this.nutritionist.id, updatedNutritionist).subscribe({
      next: () => {
        console.log('Nutritionist data saved successfully:', updatedUser);
        this.initialUserData = this.profileNutritionistForm.value;
        this.isEditMode = false;
        this.setFormReadonly(true);
      },
      error: err => console.error('Failed to update nutritionist data', err)
    });
  }

  onCancel(): void {
    this.profileNutritionistForm.patchValue(this.initialUserData);
    this.isEditMode = false;
    this.setFormReadonly(true);
  }

}
