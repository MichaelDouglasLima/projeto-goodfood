import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-nutritionist',
  templateUrl: './profile-nutritionist.component.html',
  styleUrl: './profile-nutritionist.component.css'
})
export class ProfileNutritionistComponent {
  profileNutritionistForm: FormGroup;
  isEditMode: boolean = false;
  initialNutritionistData: any;

  constructor(private formBuilder: FormBuilder) {
    this.profileNutritionistForm = this.formBuilder.group({
      name: ['',],
      email: ['',],
      password: ['',],
      phoneNumber: ['',],
      cfm: ['',],
      birthDate: ['',],
      gender: ['',],
      description: ['']
    });

    this.profileNutritionistForm.disable();
  }


  ngOnInit(): void {
    //Inicializando os valores do formulário.
    this.getNutritionistData();
    this.setFormReadonly(true);
  }

  getNutritionistData(): void {
    // Simula a carga de dados do perfil do nutricionista
    const nutritionistData = {
      name: 'Dr. Gabriel',
      email: 'dr.gabriel@example.com',
      password: 'password123',
      phoneNumber: '999999999',
      cfm: 'CFM12345',
      birthDate: '1980-01-01',
      gender: '1',
      description: 'Nutricionista experiente com foco em dietas personalizadas.'
    };

    this.profileNutritionistForm.setValue(nutritionistData);
    this.initialNutritionistData = this.profileNutritionistForm.value;
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
    this.initialNutritionistData = this.profileNutritionistForm.value;
    this.isEditMode = false;
    this.setFormReadonly(true);
  }

  onCancel(): void {
    this.profileNutritionistForm.patchValue(this.initialNutritionistData);
    this.isEditMode = false;
    this.setFormReadonly(true);
  }

}
