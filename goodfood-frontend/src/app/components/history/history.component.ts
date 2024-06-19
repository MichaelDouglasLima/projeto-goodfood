import { Component } from '@angular/core';
import { RealMeal } from '../../interfaces/RealMeal';
import { RealMealService } from '../../services/real-meal.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  realMeal: RealMeal = {} as RealMeal;

  realMeals: RealMeal[] = [];

  constructor (private realMealService: RealMealService) {}


}
