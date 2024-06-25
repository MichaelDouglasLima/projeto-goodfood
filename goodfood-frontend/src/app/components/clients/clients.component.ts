import { Component, OnInit } from '@angular/core';
import { Gender } from '../../interfaces/enums/Gender';
import { Role } from '../../interfaces/enums/Role';
import { Client } from '../../interfaces/Client';
import { User } from '../../interfaces/User';
import { RequestService } from '../../services/request.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { DietService } from '../../services/diet.service';
import { Diet } from '../../interfaces/Diet';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{
  
  // clients: Client[] = [];

  clientsByDiet: Diet[] = [];
  clients: User[] = [];
  nutritionist: User = {} as User;

  constructor(
    private requestService: RequestService,
    private userService: UserService,
    private authService: AuthService,
    private dietService: DietService
  ) {}

  ngOnInit(): void {
    this.loadNutritionist();
  }

  loadNutritionist(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: nutritionist => {
          this.nutritionist = nutritionist;
          console.log('Nutritionist loaded:', this.nutritionist); // Log de Depuração
          // this.loadClientsByDiet();
        },
        error: err => console.error('Failed to load nutritionist', err)
      });
    }
  }

  // loadClientsByDiet() {
  //   if (this.nutritionist.id) {
  //     this.dietService.getDiets().subscribe({
  //       next: data => {
  //         this.clientsByDiet = data.filter(diet => diet.nutritionist.id === this.nutritionist.id);
  //         console.log('ClientsByDiet loaded:', this.clientsByDiet); // Log de Depuração
  //       },
  //       error: err => console.error('Failed to load ClientByDiet', err)
  //     });
  //   } else {
  //     console.error('Nutritionist ID not available');
  //   }
  // }
}
