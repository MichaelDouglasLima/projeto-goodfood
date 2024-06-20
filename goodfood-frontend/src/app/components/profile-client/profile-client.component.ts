import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../interfaces/User';
import { Client } from '../../interfaces/Client';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ClientService } from '../../services/client.service';
import { ProductService } from '../../services/product.service';
import { Gender } from '../../interfaces/enums/Gender';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrl: './profile-client.component.css'
})
export class ProfileClientComponent {
  profileClientForm: FormGroup;
  imc: number = 0;
  isEditMode: boolean = false;
  initialUserData: any;
  user: User = {} as User;

  genderOptions = Object.values(Gender);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.profileClientForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      phoneNumber: [''],
      height: [''],
      weight: [''],
      birthDate: [''],
      gender: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadUser();
    this.profileClientForm.get('height')?.valueChanges.subscribe(() => this.calculateIMC());
    this.profileClientForm.get('weight')?.valueChanges.subscribe(() => this.calculateIMC());
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
            height: user.height,
            weight: user.weight 
          };
          this.profileClientForm.patchValue(this.initialUserData);
          this.calculateIMC();
        },
        error: err => console.error('Failed to load user', err)
      });
    }
  }

  calculateIMC(): void {
    const height = this.profileClientForm.get('height')?.value;
    const weight = this.profileClientForm.get('weight')?.value;

    if (height && weight) {
      this.imc = weight / (height * height);
    }
  }

  setFormReadonly(readonly: boolean): void {
    if (readonly) {
      this.profileClientForm.disable();
    } else {
      this.profileClientForm.enable();
      this.profileClientForm.get('imc')?.disable();
    }
  }

  onEdit(): void {
    this.isEditMode = true;
    this.setFormReadonly(false);
  }

  onSave(): void {
    const updatedUserData = this.profileClientForm.value;
    const updatedUser: User = {
      ...this.user,
      name: updatedUserData.name,
      email: updatedUserData.email,
      phoneNumber: updatedUserData.phoneNumber,
      birthDate: updatedUserData.birthDate,
      gender: updatedUserData.gender,
      description: updatedUserData.description,
      height: updatedUserData.height, // Altura comentada
      weight: updatedUserData.weight, // Peso comentado
    };

    this.userService.update(updatedUser).subscribe({
      next: () => {
        // Aqui você pode adicionar qualquer lógica adicional após salvar os dados do usuário
        console.log('User data saved successfully:', updatedUser);
        this.initialUserData = this.profileClientForm.value;
        this.isEditMode = false;
        this.setFormReadonly(true);
      },
      error: err => console.error('Failed to update user data', err)
    });
  }

  onCancel(): void {
    this.profileClientForm.patchValue(this.initialUserData);
    this.isEditMode = false;
    this.setFormReadonly(true);
  }
}
