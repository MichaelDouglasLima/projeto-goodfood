import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../interfaces/Client';
import { User } from '../../interfaces/User';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Gender } from '../../interfaces/enums/Gender';
import { Role } from '../../interfaces/enums/Role';
import { Diet } from '../../interfaces/Diet';
import { FoodService } from '../../services/food.service';
import { Food } from '../../interfaces/Food';
import { Router } from '@angular/router'; // Certifique-se de importar o Router

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent  implements OnInit {

  // @Input()
  // client!: Client;

  @Input()
  clientByDiet!: Diet;

  foods: Food[] = [];

  // @Input()
  // client!: User;

  constructor(
    private modalService: NgbModal,
    private foodService: FoodService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClientFoods();
  }

  open(content: any) {
    if (content === 'despensaModal') {
      this.loadClientFoods();
    }
    this.modalService.open(content, { size: 'lg' });
  }

  loadClientFoods() {
    const clientId = this.clientByDiet?.client?.id;
    if (clientId) {
      this.foodService.getFoods().subscribe({
        next: (foods) => {
          this.foods = foods.filter(food => food.user.id === clientId);
          console.log('Foods loaded:', this.foods); // Log de depuração
        },
        error: (err) => console.error('Failed to load foods', err)
      });
    } else {
      console.error('Client ID not available');
    }
  }

  callClient(phoneNumber: string) {
    const whatsappUrl = `https://wa.me/55${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }

  navigateToClientDiet() {
    if (this.clientByDiet && this.clientByDiet.client) {
      const clientId = this.clientByDiet.client.id;
      this.router.navigate(['/diet-nutritionist', clientId]);
    }
  }
}
