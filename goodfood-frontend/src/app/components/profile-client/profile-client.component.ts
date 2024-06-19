import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrl: './profile-client.component.css'
})
export class ProfileClientComponent {
  profileClientForm: FormGroup;
  imc: number = 0;
  isEditMode: boolean = false;
  initialClientData: any;

  constructor(private formBuilder: FormBuilder) {
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
    })
  }

  ngOnInit(): void {
    // Simula a busca dos dados do cliente
    this.getClientData();

    // Calcula o IMC sempre que altura ou peso forem alterados
    this.profileClientForm.get('height')?.valueChanges.subscribe(() => this.calculateIMC());
    this.profileClientForm.get('weight')?.valueChanges.subscribe(() => this.calculateIMC());

    this.setFormReadonly(true);
  }

  getClientData(): void {
    // Aqui você substituiria por uma chamada de serviço para obter os dados reais do cliente
    const clientData = {
      name: 'João Silva',
      email: 'joao.silva@example.com',
      password: '123456',
      phoneNumber: '999999999',
      height: 1.75,
      weight: 70,
      birthDate: '1990-01-01',
      gender: '1',
      description: 'Desejo controlar minha alimentação para melhorar minha saúde.'
    };

    this.profileClientForm.patchValue(clientData);
    this.initialClientData = this.profileClientForm.value;
    this.calculateIMC();
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
    this.initialClientData = this.profileClientForm.value;
    this.isEditMode = false;
    this.setFormReadonly(true);
    // Adicione aqui a lógica para salvar os dados atualizados do cliente
  }

  onCancel(): void {
    this.profileClientForm.patchValue(this.initialClientData);
    this.isEditMode = false;
    this.setFormReadonly(true);
  }

}
