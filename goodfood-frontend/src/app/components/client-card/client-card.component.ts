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
import { WeeklyLogService } from '../../services/weekly-log.service';
import { WeeklyLog } from '../../interfaces/WeeklyLog';
import { RealMealService } from '../../services/real-meal.service';
import { RealMeal } from '../../interfaces/RealMeal';

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
  weeklyLogs: WeeklyLog[] = [];
  realMeals: RealMeal[] = [];

  // @Input()
  // client!: User;

  constructor(
    private modalService: NgbModal,
    private foodService: FoodService,
    private weeklyLogService: WeeklyLogService,
    private realMealService: RealMealService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClientFoods();
    this.loadClientWeeklyLogs();
    this.loadClientRealMeals();
  }

  open(content: any) {
    if (content === 'despensaModal') {
      this.loadClientFoods();
    } else if (content === 'experienciaModal') {
      this.loadClientWeeklyLogs();
    } else if (content === 'historicoModal') {
      this.loadClientRealMeals();
  }
    this.modalService.open(content, { size: 'xl' });
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

  loadClientRealMeals() {
    const clientId = this.clientByDiet?.client?.id;
    if (clientId) {
      this.realMealService.getRealMeals().subscribe({
        next: (logs) => {
          this.realMeals = logs.filter(log => log.diet.client.id === clientId);
          console.log('RealMeals Logs loaded:', this.realMeals); // Log de depuração
        },
        error: (err) => console.error('Failed to load realMeals logs', err)
      });
    } else {
      console.error('Client ID not available');
    }
  }

  loadClientWeeklyLogs() {
    const clientId = this.clientByDiet?.client?.id;
    if (clientId) {
      this.weeklyLogService.getWeeklyLogs().subscribe({
        next: (logs) => {
          this.weeklyLogs = logs.filter(log => log.diet.client.id === clientId);
          console.log('Weekly Logs loaded:', this.weeklyLogs); // Log de depuração
        },
        error: (err) => console.error('Failed to load weekly logs', err)
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
