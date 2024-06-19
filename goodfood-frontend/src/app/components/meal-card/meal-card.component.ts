import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Period } from '../../interfaces/enums/Period';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrl: './meal-card.component.css'
})
export class MealCardComponent {

  formGroupMealCard: FormGroup;

  constructor (private formBuilder: FormBuilder) {
    this.formGroupMealCard = this.formBuilder.group({
      estimatedTime: [''],
      comment: [''],
      period: ['']
    })
  }
}