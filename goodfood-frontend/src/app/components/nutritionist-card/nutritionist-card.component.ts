import { Component, Input } from '@angular/core';
import { Nutritionist } from '../../interfaces/Nutritionist';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-nutritionist-card',
  templateUrl: './nutritionist-card.component.html',
  styleUrl: './nutritionist-card.component.css'
})
export class NutritionistCardComponent {

  @Input()
  nutritionist!: Nutritionist;

}
