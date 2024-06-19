import { Component } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { Gender } from '../../interfaces/enums/Gender';
import { Role } from '../../interfaces/enums/Role';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {

  clients: Client[] = [];

  constructor() {
    this.loadClients();
  }

  loadClients() {
    // Simulando dados de clientes do backend
    const exampleClientsData = [
      {
        id: 1,
        height: 1.79,
        weight: 85,
        user: {
          id: 1,
          name: 'Michael',
          email: 'michael@example.com',
          username: 'michaell123',
          password: 'senha123',
          phoneNumber: '(15) 98800-8800',
          description: 'Busco por uma dieta para perder peso e ganhar massa muscular',
          birthDate: '1999-04-04',
          gender: Gender.MALE,
          role: Role.CLIENT
        }
      },
      {
        id: 2,
        height: 1.89,
        weight: 85,
        user: {
          id: 2,
          name: 'Bruno',
          email: 'bruno@example.com',
          username: 'bruno456',
          password: 'senha123',
          phoneNumber: '(15) 98800-8801',
          description: 'Busco um treino para melhoria ergonâmica',
          birthDate: '1999-05-15',
          gender: Gender.MALE,
          role: Role.CLIENT
        }
      },
      {
        id: 3,
        height: 1.79,
        weight: 85,
        user: {
          id: 3,
          name: 'Luan',
          email: 'luan@example.com',
          username: 'luan789',
          password: 'senha123',
          phoneNumber: '(15) 98800-8802',
          description: 'Busco por uma dieta para me manter em forma',
          birthDate: '1992-12-10',
          gender: Gender.MALE,
          role: Role.NUTRITIONIST
        }
      }
    ];

    // Atualizando a lista de clientes
    this.clients = exampleClientsData.map(clientData => ({
      id: clientData.id,
      height: clientData.height,
      weight: clientData.weight,
      user: {
        id: clientData.user.id,
        name: clientData.user.name,
        email: clientData.user.email,
        username: clientData.user.username,
        password: clientData.user.password,
        phoneNumber: clientData.user.phoneNumber,
        description: clientData.user.description,
        birthDate: clientData.user.birthDate,
        gender: clientData.user.gender as Gender,
        role: clientData.user.role as Role
      }
    }));
  }
  
}
