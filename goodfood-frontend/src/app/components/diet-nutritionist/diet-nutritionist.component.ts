import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Diet } from '../../interfaces/Diet';
import { DietService } from '../../services/diet.service';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-diet-nutritionist',
  templateUrl: './diet-nutritionist.component.html',
  styleUrl: './diet-nutritionist.component.css'
})
export class DietNutritionistComponent implements OnInit{

  clientByDiet: Diet | null = null; // Inicializa como null ou um valor vazio, dependendo da sua necessidade

  constructor(
    private route: ActivatedRoute,
    private dietService: DietService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const clientId = params.get('id');
      if (clientId) {
        this.loadClientByDietId(clientId);
      }
    });
  }

  loadClientByDietId(clientId: string): void {
    this.dietService.getDiets().subscribe({
      next: diets => {
        const clientDiet = diets.find(diet => diet.client.id === +clientId);
        if (clientDiet) {
          this.clientByDiet = clientDiet;
          console.log('Client Diet loaded:', this.clientByDiet); // For debugging purposes
        } else {
          console.error('Client Diet not found for client ID:', clientId);
          // Handle scenario where diet for client is not found
        }
      },
      error: err => {
        console.error('Failed to load diets', err);
        // Handle error scenario as needed
      }
    });
  }
}
