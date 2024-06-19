import { Component } from '@angular/core';
import { Nutritionist } from '../../interfaces/Nutritionist';
import { Gender } from '../../interfaces/enums/Gender';
import { Role } from '../../interfaces/enums/Role';

@Component({
  selector: 'app-nutritionists',
  templateUrl: './nutritionists.component.html',
  styleUrl: './nutritionists.component.css'
})
export class NutritionistsComponent {
  
  nutritionists: Nutritionist[] = [];

  constructor() {
    this.loadNutritionists();
  }

  loadNutritionists() {
    // Simulando dados de nutricionistas do backend
    const fakeNutritionistsData = [
      {
        id: 1,
        cfm: 'CFM123',
        user: {
          id: 1,
          name: 'Gabriel',
          email: 'gabriel@example.com',
          username: 'gabriel123',
          password: 'senha123',
          phoneNumber: '(15) 98800-8800',
          description: 'Trabalho na GoodFood desde 2024',
          birthDate: '1990-01-01',
          gender: Gender.MALE,
          role: Role.NUTRITIONIST
        }
      },
      {
        id: 2,
        cfm: 'CFM456',
        user: {
          id: 2,
          name: 'Felipe',
          email: 'felipe@example.com',
          username: 'felipe456',
          password: 'senha456',
          phoneNumber: '(15) 98800-8801',
          description: 'Especialista em alimentação para treinos',
          birthDate: '1985-05-15',
          gender: Gender.MALE,
          role: Role.NUTRITIONIST
        }
      },
      {
        id: 3,
        cfm: 'CFM789',
        user: {
          id: 3,
          name: 'Levi',
          email: 'levi@example.com',
          username: 'levi789',
          password: 'senha789',
          phoneNumber: '(15) 98800-8802',
          description: 'Profissional em artes marciais desde 2020',
          birthDate: '1992-12-10',
          gender: Gender.MALE,
          role: Role.NUTRITIONIST
        }
      }
    ];

    // Atualizando a lista de nutricionistas
    this.nutritionists = fakeNutritionistsData.map(nutritionistData => ({
      id: nutritionistData.id,
      cfm: nutritionistData.cfm,
      user: {
        id: nutritionistData.user.id,
        name: nutritionistData.user.name,
        email: nutritionistData.user.email,
        username: nutritionistData.user.username,
        password: nutritionistData.user.password,
        phoneNumber: nutritionistData.user.phoneNumber,
        description: nutritionistData.user.description,
        birthDate: nutritionistData.user.birthDate,
        gender: nutritionistData.user.gender as Gender,
        role: nutritionistData.user.role as Role
      }
    }));
  }

}
