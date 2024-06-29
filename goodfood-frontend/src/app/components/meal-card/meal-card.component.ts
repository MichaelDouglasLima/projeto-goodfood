import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Period } from '../../interfaces/enums/Period';
import { Meal } from '../../interfaces/Meal';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.css'
})
export class MealCardComponent {

  @Input()
  meal!: Meal;
  
}