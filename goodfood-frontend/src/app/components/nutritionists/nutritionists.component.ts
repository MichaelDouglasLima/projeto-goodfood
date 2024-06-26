import { Component, OnInit } from '@angular/core';
import { Nutritionist } from '../../interfaces/Nutritionist';
import { Gender } from '../../interfaces/enums/Gender';
import { Role } from '../../interfaces/enums/Role';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../../services/request.service';
import { Request } from '../../interfaces/Request';
import { Diet } from '../../interfaces/Diet';
import { DietService } from '../../services/diet.service';

@Component({
  selector: 'app-nutritionists',
  templateUrl: './nutritionists.component.html',
  styleUrl: './nutritionists.component.css'
})
export class NutritionistsComponent implements OnInit {

  nutritionists: User[] = [];
  client: User = {} as User;
  clientDiet: Diet | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal,
    private requestService: RequestService,
    private dietService: DietService
  ) { }

  // open(content: any) {
  //   this.modalService.open(content, { size: 'lg' });
  // }

  ngOnInit() {
    this.loadNutritionists();
    this.loadClient();
  }

  loadNutritionists() {
    this.userService.getUsers().subscribe({
      next: data => {
        this.nutritionists = data.filter(nutritionist => nutritionist.role === Role.NUTRITIONIST);
        console.log('Nutritionists loaded:', this.nutritionists); // Log de Depuração
      },
      error: err => console.error('Failed to load foods', err)
    });
  }

  loadClient(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: client => {
          this.client = client;
          console.log('Client loaded:', this.client); // Log de Depuração
          //this.loadNutritionists();
          this.loadClientDiet();
        },
        error: err => console.error('Failed to load client', err)
      });
    }
  }

  loadClientDiet(): void {
    // Verifica se o cliente tem uma dieta associada
    this.dietService.getDiets().subscribe(diets => {
      this.clientDiet = diets.find(diet => diet.client.id === this.client.id) || null;
      console.log('Client diet loaded:', this.clientDiet);
    });
  }

  callNutri(phoneNumber: string) {
    const whatsappUrl = `https://wa.me/55${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }

}
