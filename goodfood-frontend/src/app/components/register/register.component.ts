import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formGroupRegister: FormGroup;
  confirmPassword: string = '';
  emailInUse: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.formGroupRegister = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formGroupRegister.valid) {
      if (this.formGroupRegister.value.password !== this.confirmPassword) {
        console.warn('As senhas não coincidem!');
        return;
      }

      const { name, email, password, role } = this.formGroupRegister.value;
      this.authService.register({ name, email, password, role }).subscribe({
        next: (response) => {
          console.log('Usuário registrado com sucesso', response);
          alert('Conta cadastrada com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erro ao registrar usuário', error);
          if (error.status === 400 && error.error.message.includes('Email is already in use')) {
            this.emailInUse = true;
          }
        }
      });
    }
  }

  get pfgName() { return this.formGroupRegister.get("name") }

  get pfgEmail() { return this.formGroupRegister.get("email") }

  get pfgPassword() { return this.formGroupRegister.get("password") }

  get pfgRole() { return this.formGroupRegister.get("role") }

}
