import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../../interfaces/enums/Gender';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-profile-nutritionist',
  templateUrl: './profile-nutritionist.component.html',
  styleUrl: './profile-nutritionist.component.css'
})
export class ProfileNutritionistComponent {
  profileNutritionistForm: FormGroup;
  isEditMode: boolean = false;
  initialUserData: any;
  user: User = {} as User;


  genderOptions = Object.values(Gender);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.profileNutritionistForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
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
      this.userService.getUserById(userId).subscribe({
        next: user => {
          this.user = user;
          this.initialUserData = {
            name: user.name,
            email: user.email,
            password: user.password, // Leave password empty for security reasons
            phoneNumber: user.phoneNumber,
            birthDate: user.birthDate,
            gender: user.gender,
            description: user.description,
            cfn: user.cfn,
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
    const updatedUserData = this.profileNutritionistForm.value;
    const updatedUser: User = {
      ...this.user,
      name: updatedUserData.name,
      email: updatedUserData.email,
      phoneNumber: updatedUserData.phoneNumber,
      birthDate: updatedUserData.birthDate,
      gender: updatedUserData.gender,
      description: updatedUserData.description,
      cfn: updatedUserData.cfn,
    };

    this.userService.update(updatedUser).subscribe({
      next: () => {
        // Aqui você pode adicionar qualquer lógica adicional após salvar os dados do usuário
        console.log('User data saved successfully:', updatedUser);
        this.initialUserData = this.profileNutritionistForm.value;
        this.isEditMode = false;
        this.setFormReadonly(true);
      },
      error: err => console.error('Failed to update user data', err)
    });
  }

  onCancel(): void {
    this.profileNutritionistForm.patchValue(this.initialUserData);
    this.isEditMode = false;
    this.setFormReadonly(true);
  }

}
