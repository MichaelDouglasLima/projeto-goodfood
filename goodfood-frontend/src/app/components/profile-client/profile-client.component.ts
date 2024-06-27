import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Gender } from '../../interfaces/enums/Gender';
import { User } from '../../interfaces/User';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { UserService } from '../../services/user.service';
import { Client } from '../../interfaces/Client';
import { ClientPutDto } from '../../interfaces/dtos/ClientPutDto';
import { UserPutDto } from '../../interfaces/dtos/UserPutDto';

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
  client: Client = {} as Client;
  genderOptions = Object.values(Gender);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private clientService: ClientService
  ) {
    this.profileClientForm = this.formBuilder.group({
      name: [''],
      email: [''],
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
      this.clientService.getByUserId(userId).subscribe({
        next: (client: Client) => {
          this.user = client.user;
          this.client = client;

          this.initialUserData = {
            name: this.user.name,
            email: this.user.email,
            phoneNumber: this.user.phoneNumber,
            birthDate: this.user.birthDate,
            gender: this.user.gender,
            description: this.user.description,
            height: this.client.height,
            weight: this.client.weight
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

    const updatedUser: UserPutDto = {
      name: updatedUserData.name,
      email: updatedUserData.email,
      phoneNumber: updatedUserData.phoneNumber,
      birthDate: updatedUserData.birthDate,
      gender: updatedUserData.gender,
      description: updatedUserData.description,
    };

    const updatedClient: ClientPutDto = {
      weight: updatedUserData.weight,
      height: updatedUserData.height,
      user: updatedUser,
    };

    this.clientService.update(this.client.id, updatedClient).subscribe({
      next: () => {
        console.log('User data saved successfully:', updatedClient);
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
